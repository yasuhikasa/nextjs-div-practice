// 必要な依存関係をインポート
import { useRouter } from 'next/router';
import { useEffect } from 'react';


// 無操作タイマー
const createOperationCheck = (csrfToken) => {
  let time = 0;
  let brightnessSet = false;
  let checkTimer = null; 
  const router = useRouter();
const ClickLockManager = createClickLockManager();
 

  const check = async () => {
    time++;
    console.log(time);

    if (time >= 24) {
      ClickLockManager.lock(2000); // 2秒間クリック操作を禁止
      router.push(routersDefs.NO_OPERATION).finally(() => {
        ClickLockManager.unlock(); // 画面遷移後にロックを解除
      });
    }

    if (time >= 18 && !brightnessSet) {
      try {
        await fetcher.put(`/api/v1/controllers/gw/systemSetting/brightness`, {token: csrfToken, brightness: 0});
        brightnessSet = true;
      } catch (error) {
        console.error('Error setting brightness:', error);
      }
    }
  };

const reset = async () => {
  if (18 <= time && time <= 24) {
    try {
      await fetcher.put(`/api/v1/controllers/gw/systemSetting/brightness`, {token: csrfToken, brightness: 100});
    } catch (error) {
      console.error('Error resetting brightness:', error);
    }
  }
  time = 0;
  brightnessSet = false;
};


  const handleDocumentClick = (event) => {
    if (ClickLockManager.locked) {
      event.preventDefault();
      // 他のクリック関連処理はここに追加
    }
  };

  const start = () => {
    if (typeof window !== 'undefined') {
      checkTimer = window.setInterval(check, 1000);
      document.addEventListener('click', handleDocumentClick);
      document.addEventListener('click', reset);
    }
  };

  const stop = () => {
    if (typeof window !== 'undefined' && checkTimer !== null) {
      window.clearInterval(checkTimer);
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('click', reset);
    }
  };

  return { check, reset, start, stop };
};

export const useOperationCheck = (csrfToken) => {
  const oc = createOperationCheck(csrfToken);

  useEffect(() => {
    oc.start();
    return () => {
      oc.stop();
    };
  }, []);

  return oc;
};

// ボタン連打防止
const createClickLockManager =()=> {
    let locked = false;
    let timer = null;
  
    const lock = (period) => {
      locked = true;
      timer = setTimeout(unlock, period);
    };
  
    const unlock = () => {
      locked = false;
      clearTimeout(timer);
      timer = null;
    };
  
    return { lock, unlock,locked };
  }
  