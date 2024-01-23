```mermaid
%%{init:{'theme':'default','flowchart':{'rankSpacing':100}}}%%
flowchart TD
  start(APIリクエスト受信) -->p1[機器登録情報取得]
    p1 --> p2[リクエストヘッダーで指定された機器識別IDをレスポンスヘッダーに設定]
  p2 --> p3[登録機器一覧取得をできているか判定]
  p3 --> if1{ }
  if1 --> |取得できていない| res9002(9002エラー<br>No regDevList)
  if1 --> |取得できている| p4[対象のdeviceIdに<br>該当する機器があるか判定]
  p4 --> if2{ }
  if2 --> |該当する機器がない| p5[アドバンス親機配下の単機能照明か判定]
  p5 --> if3{ }
   if3 --> |No| res3001(3001エラー<br>Invalid deviceID)
  if3 --> |Yes| p6[機器クラス名を取得する際<br>URL指定の機器クラス（type）とdeviceIdに紐付いた登録機器の機器クラスが一致しているか判定]
  if2 --> |該当する機器がある| p6[機器クラス名を返す際<br>URL指定の機器クラスと登録機器の機器クラスが<br>一致しているか判定]
  p6 --> if4{ }
  if4 --> |一致している| p7[機器クラスがELSEEVの場合かつ、<br>計測UTのev設定がないか判定]
  if4 --> |一致していない| p8[アドバンス配下の照明制御時かどうか判定]
  p7 --> if5{ }
  if5 --> |機器クラスがELSEEVかつ<br>計測UTのev設定がない| res3011(3011エラー<br>Invalid evCharger Settings)
  if5 --> |機器クラスがELSEEVではない、または<br>機器クラスがELSEEVで、計測UTのev設定が存在する場合| p9[指定されたdeviceIDの機器が状態取得対応の機器であるか判定]
  p8 --> if6{ }
  if6 --> |Yes| p9
  if6 --> |No| res2001(2001エラー<br>Invalid type)
  p9 --> if7{ }
  if7 --> |対象外| res3004(3004エラー<br>Not supported type)
  if7 --> |対象内| p10[アドバンス親機（配下の照明は除く）か判定]
  p10 --> if8{ }
  if8 --> |No| p13[制御機器情報を作成<br>※1]
  if8 --> |Yes| p11[シーン番号は1-8または0:一括消灯か判定]
  p11 --> if9{ }
  if9 --> |シーン番号が範囲外、または指定されていない| res3009(3009エラー<br>Invalid properties)
  if9 --> |シーン番号が範囲外、または指定されている| p12[アドバンス照明シーン制御実行と<br>100msごとにアドバンス照明シーン制御実行状態取得を行う。<br>タイムアウトは20秒]
  p12 --> if10{ }
  if10 --> |成功| 202レスポンス
  if10 --> |失敗| res3005(3005エラー<br>Can't set advanceScene)
  p13 --> p14[指定機器の制御要求実行と<br>100msごとに指定機器の制御状態取得を行う。<br>タイムアウトは20秒]
  p14 --> if12{ }
  if12 --> |制御要求時にシャッター窓サッシで<br>障害物挟み込みエラー| res3006(3006エラー<br>Something is blocking)
  if12 --> |制御要求時のその他のエラー| res3002(3002エラー<br>Can't set devControl)
  if12 --> |制御状態取得時のエラー| res3002(3002エラー<br>Can't set devControl)
  if12 --> |成功| 202レスポンス
  ```