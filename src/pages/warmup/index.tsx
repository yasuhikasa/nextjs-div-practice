// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// const Warmup = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const router = useRouter();
//   const urls = [
//     'http://localhost:3000/search/users',
//     // ... その他のURL
//   ];

//   useEffect(() => {
//     // iframe の作成と追加は useEffect 内で行う
//     const iframe = document.createElement('iframe');
//     iframe.style.position = 'absolute';
//     iframe.style.width = '800px';
//     iframe.style.height = '480px';
//     iframe.style.opacity = '0';
//     iframe.style.top = '500px';
//     iframe.style.left = '0px';
//     document.body.appendChild(iframe);
  
//     // 初回のURLのロード
//     if (urls.length > 0) {
//       iframe.src = urls[0];
//     }
  
//     iframe.onload = () => {
//       const nextIndex = currentIndex + 1;
//       if (nextIndex < urls.length) {
//         setTimeout(() => {
//           setCurrentIndex(nextIndex);
//           iframe.src = urls[nextIndex];
//         }, 100);
//       } else {
//         // ウォームアッププロセスの終了後の処理
//         // router.push('/page/common/0g?warmup=true'); (必要に応じて)
//       }
//     };
  
//     // コンポーネントのアンマウント時に iframe を削除
//     return () => {
//       iframe.remove();
//     };
//   }, []); // 依存配列を空にする
  

//   return null; // または任意の UI
// };

// export default Warmup;


import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Warmup: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const urls: string[] = [
    'http://localhost:3000/search/users',
    'http://localhost:3000/contactUs',
    // ... その他のURL
  ];

  useEffect(() => {

    const loadPage = (url: string) => {
      const iframe = document.getElementById('iframe') as HTMLIFrameElement;
      iframe.onload = () => {
        if (currentIndex < urls.length - 1) {
          setTimeout(() => setCurrentIndex(prev => prev + 1), 100);
        } else {
          // ウォームアッププロセスの終了後にページ遷移
          // router.push('/page/common/0g?warmup=true');
        }
      };
      iframe.src = url;
    };

    if (urls[currentIndex]) {
      loadPage(urls[currentIndex]);
    }
  }, [currentIndex]);

return (
  <div style={{ backgroundColor: 'black', height: '100vh', width: '100vw' }}>
    <iframe id="iframe" style={{ position: 'absolute', width: '800px', height: '480px', opacity: '0', top: '500px', left: '0px' }} />
  </div>
  );
};



export default Warmup;



// import React, { useEffect, useRef, useState } from 'react';
// import { useRouter } from 'next/router';
// import styles from './Warmup.module.scss'; // CSS モジュールのインポート

// const Warmup: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const iframeRef = useRef<HTMLIFrameElement>(null); // iframeの参照を保存
//   const router = useRouter();
//   const urls: string[] = [
//     'http://localhost:3000/search/users',
//     'http://localhost:3000/contactUs',
//     // ... その他のURL
//   ];

//   useEffect(() => {
//     const iframe = iframeRef.current; // iframeの参照を使用
//     if (iframe && urls[currentIndex]) {
//       iframe.src = urls[currentIndex];
//       iframe.onload = () => {
//         if (currentIndex < urls.length - 1) {
//           setTimeout(() => setCurrentIndex(prev => prev + 1), 100);
//         } else {
//           // ウォームアッププロセスの終了後にページ遷移
//           // router.push('/page/common/0g?warmup=true');
//         }
//       };
//     }
//   }, [currentIndex, urls]); // currentIndexとurlsを依存配列に追加

//   return (
//     <div className={styles.warmupContainer}>
//       <iframe ref={iframeRef} id="iframe" className={styles.iframeStyle} />
//     </div>
//   );
// };

// export default Warmup;
