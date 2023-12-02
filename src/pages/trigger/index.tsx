import { useEffect } from 'react';
import axios from 'axios';

// public・・・静的ファイル。そのままエンドポイント（.html）となる。htmlやsvgなど。

// pages直下もエンドポイントという。サーバーが起きているか？ページがロードされているか？の確認は、
// fetchでpages直下のページをエンドポイントに確認すればいい。（await fetch ・・・）
// ポストマンでも、レスポンスとしてページビューやhtmlが返ってくる。

const WarmupTrigger = () => {
  useEffect(() => {
    const lastPage = '/page/common/0g?warmup=start';

    const getPage = async () => {
      try {
        const response = await axios.get(lastPage);
        if (response.status === 200) {
          window.parent.postMessage('start crawling', '*');
        }
      } catch (error) {
        console.error('Error in getPage:', error);
        getPage(); // エラーが発生した場合、再度リクエストを試みる
      }
    };

    window.parent.postMessage('loaded', '*');
    setTimeout(getPage, 0);
  }, []);

  return (
    <div>
      <h1>ウォームアップ開始トリガ</h1>
    </div>
  );
};

export default WarmupTrigger;


// import { useEffect } from 'react';

// const WarmupTrigger = () => {
//   useEffect(() => {
//     const lastPage = '/page/common/0g?warmup=start';

//     const getPage = () => {
//       const xhr = new XMLHttpRequest();
//       xhr.open('GET', lastPage, true);

//       xhr.onload = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//           window.parent.postMessage('start crawling', '*');
//         }
//       };

//       xhr.onerror = function () {
//         getPage();
//       };

//       xhr.send(null);
//     };

//     window.parent.postMessage('loaded', '*');
//     setTimeout(getPage, 0);
//   }, []);

//   return (
//     <div>
//       <h1>ウォームアップ開始トリガ</h1>
//     </div>
//   );
// };

// export default WarmupTrigger;


// pages/api/warmup.js

// export default function handler(req, res) {
//   if (req.method === 'GET') {
//     // GETリクエストに対する処理
//     res.status(200).json({ message: 'Warmup successful' });
//   } else {
//     // 他のHTTPメソッドに対する処理
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
