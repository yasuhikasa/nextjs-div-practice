```mermaid
sequenceDiagram
    participant コンテンツサーバー
    participant APIサーバー
    participant ブラウザAPI
    participant ブラウザ

    コンテンツサーバー->>APIサーバー: リクエスト
    APIサーバー->>+ブラウザAPI: ブラウザ起動リクエスト
    ブラウザAPI-)ブラウザ: ブラウザ起動
    activate ブラウザ
    ブラウザAPI-->>-APIサーバー: レスポンス
    APIサーバー->>+ブラウザAPI:ブラウザURL通知リクエスト
    ブラウザAPI-)ブラウザ:ジャンプ先 URL 通知
    ブラウザAPI-->>-APIサーバー: レスポンス
    ブラウザ->>+コンテンツサーバー:/html/warmup.htmlの読み込み指示
    コンテンツサーバー-->>-ブラウザ: /html/warmup.htmlを返す
    ブラウザ->>+コンテンツサーバー:/warmupTriggerの読み込み指示
    コンテンツサーバー-->>-ブラウザ: /warmupTriggerを返す
    ブラウザ->>ブラウザ: loadedメッセージを/warmupTriggerから<br>/html/warmup.htmlへ送信。
      alt loadedフラグがtrue
        ブラウザ->>ブラウザ: start crawlingメッセージを/warmupTriggerから<br>/html/warmup.htmlへ送信
        loop ウォームアップ対象ページの読み込み
          ブラウザ->>+コンテンツサーバー:ウォームアップ対象ページの読み込み指示
          コンテンツサーバー-->>-ブラウザ: ウォームアップ対象ページを返す
        end
      else loadedフラグがfalse
        ブラウザ->>コンテンツサーバー:/warmupTriggerの読み込みリトライ
    end
    Note left of ブラウザ: クローリング終了
    ブラウザ->>+コンテンツサーバー: /standbyへのリダイレクト指示
    コンテンツサーバー-->>-ブラウザ: /standbyへリダイレクト
    deactivate ブラウザ