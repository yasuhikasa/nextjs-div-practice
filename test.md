```mermaid
sequenceDiagram
    participant コンテンツサーバー
    participant ブラウザAPI
    participant publichtml/warmup.html
    participant warmupTrigger.tsx
    participant warmup.tsx

    コンテンツサーバー->>ブラウザAPI: 起動
    ブラウザAPI->>publichtml/warmup.html: 各種起動プロセス
    publichtml/warmup.html->>warmupTrigger.tsx: iframeでレンダリング
    loop loadedメッセージの確認
        warmupTrigger.tsx->>publichtml/warmup.html: loadedメッセージ送信
        alt loadedメッセージを確認
            publichtml/warmup.html->>warmupTrigger.tsx: HTTPリクエストを送る
            warmupTrigger.tsx->>warmup.tsx: HTTPリクエストを送る
            alt HTTPリクエストが200
                warmupTrigger.tsx->>publichtml/warmup.html: start crawlingメッセージ送信
                publichtml/warmup.html->>publichtml/warmup.html: ダッシュボードページをiframeでレンダリング
            else HTTPリクエストがエラー
                warmupTrigger.tsx->>warmup.tsx: HTTPリクエストを再送
            end
        else loadedメッセージを確認できない
            publichtml/warmup.html->>warmupTrigger.tsx: 0.5秒ごとに再レンダリング
        end
    end
    publichtml/warmup.html->>warmup.tsx: 画面遷移


```