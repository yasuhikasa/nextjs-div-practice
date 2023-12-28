
## 6. Webアプリ起動処理
### 6.1. Webアプリコンテナ起動
* AiSEG3起動時、ホストのコンテナ管理が各コンテナの起動を順次実施する。
* 各コンテナはコンテナ起動完了時にホストのコンテナ管理に起動完了通知を行う。
  各コンテナはAPIサーバーのAPI経由、APIサーバー自身は直接通知する。
* 所定のコンテナが全て起動完了した場合、ホストのコンテナ管理からシステム起動完了が通知される。
* システム起動完了通知はredis経由となるため、APIサーバーにてシステム起動完了を受け取り、各コンテナにAPIサーバーから通知を行う(コンテナの中でredisに接続しているのはAPIサーバーだけのSW構成となっているため)。そのため、各コンテナは自身の起動完了通知を行う前に、APIサーバーにシステム起動完了通知を受け取るためのtcpソケットのコネクションを確立しておく必要がある(システム起動完了通知が不要な場合は不要)。
* 各コンテナへのシステム起動完了通知についてtcpソケットを採用した理由は以下。
  - PDPv2クラアイアントとAPIサーバー間はWebSocketを使用して通信しているが、WebSocketを必要としないコンテナもある。各コンテナ毎に異なるプロトコルで通知を上げるとAPIサーバーの処理が煩雑化するため、汎用的なtcpソケットに統一する。
  - また、システム起動完了後にWebSocketを開通するという起動シーケンスの要件にも対応可能となる。
  - tcpソケットのコネクション確立を各コンテナの起動完了のひとつの条件にできる。(udpソケットはコネクションという概念がなく、送信してみないと経路が確立しているか分からないので不採用)。

#### 6.1.1. Webアプリコンテナ起動シーケンス(本体モニタ有りモデル)
* APIサーバー、認証サーバーについては、各ポートのオープン処理後に起動完了扱いとしている。
* 認証サーバー起動後は、コンテンツアクセス(8443)ポート、WebAPI(443)ポートにアクセス可能となるが、認証サーバーにシステム起動完了が通知されるまで、外部からのリクエストについては受付不可（エラーレスポンス503が返る）。localhostからのリクエストについては受付可。
* コンテンツサーバーについては、Next.js自体の仕組みでサーバー起動に関係するアプリケーションロジックを実装できる機構がないため、同サーバー内にNext.jsの起動を監視する別プロセスを起動し、Next.jsのコンテンツにアクセスできたら起動完了扱いとしている。

```mermaid
sequenceDiagram
  participant コンテナ管理 as コンテナ管理(Host)
  participant ブラウザAPI as ブラウザAPI(Host)
  participant redis
  participant APIサーバー
  participant コンテンツサーバー
  participant PDPv2クライアントサーバー
  participant 認証サーバー
  participant ブラウザ
  autonumber
  コンテナ管理 ->> APIサーバー: コンテナ起動 docker run
  Note over APIサーバー: 起動完了
  APIサーバー ->> redis: コンテナ起動完了 rpush
  redis ->> コンテナ管理: コンテナ起動完了 blpop
  コンテナ管理 ->> コンテンツサーバー: コンテナ起動 docker run
　Note over コンテンツサーバー: 起動完了
  コンテンツサーバー ->> APIサーバー: システム起動完了通知<br>ポート接続　tcp 6000
  コンテンツサーバー ->> APIサーバー: CSRFトークン取得<br>internal CSRF免除(URL)
  APIサーバー ->> コンテンツサーバー: CSRFトークン取得 res
  コンテンツサーバー ->> APIサーバー: ブラウザ起動要求<br>internal CSRF
  APIサーバー ->> redis: ブラウザ起動要求 rpush
  redis ->> ブラウザAPI: ブラウザ起動要求 blpop
  ブラウザAPI ->> redis: ブラウザ起動応答 rpush
  redis ->> APIサーバー: ブラウザ起動応答 blpop
  APIサーバー ->> コンテンツサーバー: ブラウザ起動応答 res
  コンテンツサーバー ->> APIサーバー: ブラウザ状態取得要求<br>internal CSRF
  APIサーバー ->> redis: ブラウザ状態取得要求 rpush
  redis ->> ブラウザAPI: ブラウザ状態取得要求 blpop
  ブラウザAPI ->> redis: ブラウザ状態取得応答 rpush
  redis ->> APIサーバー: ブラウザ状態取得応答 blpop
  APIサーバー ->> コンテンツサーバー: ブラウザ状態取得応答 res
　Note over コンテンツサーバー: 起動完了であれば次の処理へ。<br>起動完了でなければ再度ブラウザ状態取得要求(13)へ。
  コンテンツサーバー ->> APIサーバー: URL通知(warmup)<br>internal CSRF
  APIサーバー ->> redis: URL通知(warmup) rpush
  redis ->> ブラウザAPI: URL通知(warmup) blpop
  ブラウザAPI -->> ブラウザ: URL切替(warmup用html)
  ブラウザAPI ->> redis: URL通知(warmup)応答 rpush
  redis ->> APIサーバー: URL通知(warmup)応答 blpop
  APIサーバー ->> コンテンツサーバー: URL通知(warmup)応答 res
　Note over ブラウザ: warmup処理開始
  ブラウザ ->> 認証サーバー: ページ要求(所定ページをクローリング)
  認証サーバー ->> コンテンツサーバー: ページ要求
  コンテンツサーバー ->> 認証サーバー: ページ応答
  認証サーバー ->> ブラウザ: ページ応答
　Note over ブラウザ: warmup対象全ページ描画完了であれば次の処理へ。<br>未完了であれば次ページ取得(27)へ。
  ブラウザ ->> コンテンツサーバー: コンテナ起動完了通知<br>コンテンツAPI
  コンテンツサーバー ->> APIサーバー: コンテナ起動完了通知<br>internal CSRF
  APIサーバー ->> redis: コンテナ起動完了 rpush
  APIサーバー ->> コンテンツサーバー: コンテナ起動完了 res
  コンテンツサーバー ->> ブラウザ: コンテナ起動完了 res
  redis ->> コンテナ管理: コンテナ起動完了 blpop
  コンテナ管理 ->> PDPv2クライアントサーバー: コンテナ起動 docker run
　Note over PDPv2クライアントサーバー: 起動完了
  PDPv2クライアントサーバー ->> APIサーバー: システム起動完了通知<br>ポート接続　tcp 6000
  PDPv2クライアントサーバー ->> APIサーバー: コンテナ起動完了通知<br>internal CSRF免除(コンテナ名)
  APIサーバー ->> redis: コンテナ起動完了 rpush
  APIサーバー ->> PDPv2クライアントサーバー: コンテナ起動完了 res
  redis ->> コンテナ管理: コンテナ起動完了 blpop
  コンテナ管理 ->> 認証サーバー: コンテナ起動 docker run
　Note over 認証サーバー: 起動完了
  認証サーバー ->> APIサーバー: システム起動完了通知<br>ポート接続　tcp 6000
  認証サーバー ->> APIサーバー: コンテナ起動完了通知<br>internal CSRF免除(コンテナ名)
  APIサーバー ->> redis: コンテナ起動完了 rpush
  APIサーバー ->> 認証サーバー: コンテナ起動完了 res
  redis ->> コンテナ管理: コンテナ起動完了 blpop
  コンテナ管理 ->> redis: システム起動完了通知 rpush
  redis ->> APIサーバー: システム起動完了通知 blpop
  APIサーバー ->> コンテンツサーバー: システム起動完了通知
  APIサーバー ->> PDPv2クライアントサーバー: システム起動完了通知
  APIサーバー ->> 認証サーバー: システム起動完了通知
  コンテンツサーバー ->> APIサーバー: URL通知(初期画面)<br>internal CSRF
  APIサーバー ->> redis: URL通知(初期画面) rpush
  redis ->> ブラウザAPI: URL通知(初期画面) blpop
  ブラウザAPI -->> ブラウザ: URL切替(初期画面)
  ブラウザAPI ->> redis: URL通知(初期画面)応答 rpush
  redis ->> APIサーバー: URL通知(初期画面)応答 blpop
  APIサーバー ->> コンテンツサーバー: URL通知(初期画面)応答 res
  ブラウザ ->> 認証サーバー: ページ要求(初期画面)
  認証サーバー ->> コンテンツサーバー: ページ要求
  コンテンツサーバー ->> 認証サーバー: ページ応答
  認証サーバー ->> ブラウザ: ページ応答
　Note over ブラウザ: 初期画面表示
```
#### 6.1.2. Webアプリコンテナ起動シーケンス(本体モニタ無しモデル)
* 本体モニタ有りモデルのシーケンスから本体内ブラウザ制御に関する部分を削除したシーケンスとなる。それ以外は、本体モニタ有りモデルのシーケンスと同様。
  
```mermaid
sequenceDiagram
  participant コンテナ管理 as コンテナ管理(Host)
  participant redis
  participant APIサーバー
  participant コンテンツサーバー
  participant PDPv2クライアントサーバー
  participant 認証サーバー
  autonumber
  コンテナ管理 ->> APIサーバー: コンテナ起動 docker run
  Note over APIサーバー: 起動完了
  APIサーバー ->> redis: コンテナ起動完了 rpush
  redis ->> コンテナ管理: コンテナ起動完了 blpop
  コンテナ管理 ->> コンテンツサーバー: コンテナ起動 docker run
　Note over コンテンツサーバー: 起動完了
  コンテンツサーバー ->> APIサーバー: CSRFトークン取得<br>internal CSRF免除(URL)
  APIサーバー ->> コンテンツサーバー: CSRFトークン取得 res
   コンテンツサーバー ->> APIサーバー: コンテナ起動完了通知<br>internal CSRF
  APIサーバー ->> redis: コンテナ起動完了 rpush
  APIサーバー ->> コンテンツサーバー: コンテナ起動完了 res
  redis ->> コンテナ管理: コンテナ起動完了 blpop
  コンテナ管理 ->> PDPv2クライアントサーバー: コンテナ起動 docker run
　Note over PDPv2クライアントサーバー: 起動完了
  PDPv2クライアントサーバー ->> APIサーバー: システム起動完了通知<br>ポート接続　tcp 6000
  PDPv2クライアントサーバー ->> APIサーバー: コンテナ起動完了通知<br>internal CSRF免除(コンテナ名)
  APIサーバー ->> redis: コンテナ起動完了 rpush
  APIサーバー ->> PDPv2クライアントサーバー: コンテナ起動完了 res
  redis ->> コンテナ管理: コンテナ起動完了 blpop
  コンテナ管理 ->> 認証サーバー: コンテナ起動 docker run
　Note over 認証サーバー: 起動完了
  認証サーバー ->> APIサーバー: システム起動完了通知<br>ポート接続　tcp 6000
  認証サーバー ->> APIサーバー: コンテナ起動完了通知<br>internal CSRF免除(コンテナ名)
  APIサーバー ->> redis: コンテナ起動完了 rpush
  APIサーバー ->> 認証サーバー: コンテナ起動完了 res
  redis ->> コンテナ管理: コンテナ起動完了 blpop
  コンテナ管理 ->> redis: システム起動完了通知 rpush
  redis ->> APIサーバー: システム起動完了通知 blpop
  APIサーバー ->> PDPv2クライアントサーバー: システム起動完了通知
  APIサーバー ->> 認証サーバー: システム起動完了通知
```

### 6.2. ウォームアップ機能(初回アクセス高速化)
コンテンツサーバ起動直後は、ブラウザ側のキャッシュ(画像、css等)がないため、初回アクセス時の応答が2回目以降に比べると遅い。
この問題を回避するため、ユーザが最初にアクセスする前に、コンテンツサーバでウォームアップ処理を行う。
本体起動後の画面表示前にあらかじめキャッシュを溜めておき、ユーザからの初回アクセスに対する応答速度を向上させる。
具体的には以下の処理を行う。

#### 6.2.1. モニタ付きAiSEG3ブラウザ起動時
* ブラウザ起動後、ナビゲーションから遷移できる各画面に順次アクセスする。（クローリング）
  * １つのページのロードが終わると、100ms後に次のページをロードする。
  * クローリングが完了後は待機画面（/general/g-01）に遷移する。
* クローリング対象ページは以下
  | カテゴリ     | URL                |
  | ------------ | ------------------ |
  | お気に入り   | /bookmark/b-01     |
  | コントロール | /control/c-01      |
  | エネルギー   | /energy/e-01       |
  | お知らせ     | /notification/n-01 |

* **※1：**/html/warmup.htmlと/warmupTriggerは親フレームと子フレーム（iframe）の関係。
  /html/warmup.htmlが読み込まれると、最初に/warmupTriggerがiframeで読み込まれる。
* **※2：**/warmupTriggerの読み込みに成功したかを表すloadedフラグが/html/warmup.htmlに存在する。
  デフォルトではfalseになっており/warmupTriggerが読み込まれると、/html/warmup.htmlにloadedというメッセージが送信され、/html/warmup.htmがこれを受け取るとloadedフラグがtrueになり/warmupTriggerの読み込みが成功したことになる。
  この判定によりブラウザが確実に起動していることを担保する。
* **※3：** loadedフラグがtrueになると、次に/warmupTriggerは待機画面（/general/g-01）へリクエストを送り、待機画面の起動確認を行う。
  レスポンスが200の場合、/warmupTriggerはstart crawlingメッセージを/html/warmup.htmlへ送る。
  /html/warmup.htmlはそれを起点にクローリングを開始する。
  レスポンスがエラーの場合、/warmupTriggerは再度待機画面へリクエストを送る。

```mermaid
sequenceDiagram
    participant コンテンツサーバー
    participant 認証サーバー
    participant APIサーバー
    participant ブラウザAPI
    participant ブラウザ

    コンテンツサーバー->>+APIサーバー: URL通知(/html/warmup.html)
    APIサーバー->>+ブラウザAPI:URL通知
    ブラウザAPI-)ブラウザ:URL通知
    Note over ブラウザ: warmup処理開始 
    activate ブラウザ
    ブラウザAPI-->>-APIサーバー: URL通知応答
    APIサーバー-->>-コンテンツサーバー:URL通知応答

    ブラウザ->>+認証サーバー:ページ要求（/html/warmup.html）
    認証サーバー->>+コンテンツサーバー:ページ要求
    コンテンツサーバー-->>-認証サーバー: ページ応答
    認証サーバー-->>-ブラウザ: ページ応答
    ブラウザ ->> ブラウザ:warmup.htmlからwarmupTriggerを呼び出す(※1)
    ブラウザ->>+認証サーバー:ページ要求（/warmupTrigger）
    認証サーバー->>+コンテンツサーバー:ページ要求
    ブラウザ ->> ブラウザ:/warmupTriggerの読み込みに失敗すると、<br>500msごとに再度読み込みを行う。
    コンテンツサーバー-->>-認証サーバー: ページ応答
    認証サーバー-->>-ブラウザ: ページ応答
    ブラウザ->>ブラウザ: loadedメッセージをiframe（/warmupTrigger）から<br>親フレーム（/html/warmup.html）へ送信(※2)

    ブラウザ->>ブラウザ: start crawlingメッセージをiframe（/warmupTrigger）から<br>親フレーム（/html/warmup.html）へ送信(※3)

      loop ウォームアップ対象ページの読み込み
        ブラウザ->>+認証サーバー:ページ要求(所定ページを100msごとにクローリング)
        認証サーバー->>+コンテンツサーバー:ページ要求
        コンテンツサーバー-->>-認証サーバー:ページ応答
        認証サーバー-->>-ブラウザ:ページ応答
      end
    Note over ブラウザ: warmup処理終了
    ブラウザ->>+認証サーバー: ページ要求（/general/g-01へリダイレクト）
    認証サーバー->>+コンテンツサーバー: ページ要求
    コンテンツサーバー-->>-認証サーバー: ページ応答
    認証サーバー-->>-ブラウザ: ページ応答
    deactivate ブラウザ
```