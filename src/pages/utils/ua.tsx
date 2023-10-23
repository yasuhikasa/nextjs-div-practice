/*-------------------------------------------------------------

UIパーツ共通関数
-------------------------------------------------------------*/
// UAの固定値
const selfMonitar = "AiSEG2" // 自モニタ
const home = "HomeCTRL" // ホームナビ
const door = "DoorCTRL" // ドアホン
const cloudge = "PEWDMSHomeViewer" // クラウジュ
/**

UAを受け取って、自モニタかどうか判断する関数
@param {string} ua UserAgent
@returns {boolean} true:自モニタ false:自モニタ以外
*/
export function judgeMonitor(ua: string): boolean {
if (ua.match(selfMonitar) || ua.match(home)) {
return true
}
return false
}


/****************************************************
ユーティリティ ライブラリ（クライアント全体で使用する関数を定義）
@module clientUtil
*****************************************************/

// /**

// ローカルホスト判定
// @return {boolean} ローカルホスト判定(true/false)
// */
// export const isLocalhost = function (): boolean {
//   if (typeof window !== 'undefined') {
//   const host = window.location.hostname;
//   console.log("host",host);
//   return host === 'localhost' || host === '127.0.0.1';
// }
// return false;
// }



// /****************************************************

// クライアント用のローカルホスト判定
// *****************************************************/


// /**
// * ローカルホスト判定
// * @return {boolean} ローカルホスト判定(true/false)
// */
// export const isLocalhost = function (): boolean {
//   if (typeof window !== 'undefined') {
//       const host = window.location.hostname;

//       // IPv4のローカルホスト判定
//       if (host === 'localhost' || host === '127.0.0.1') {
//           return true;
//       }

//       // IPv6のローカルホスト判定
//       if (host === '::1') {
//           return true;
//       }
//   }

//   return false;
// }

