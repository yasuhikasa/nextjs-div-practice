import React, { useState, useEffect,ReactNode } from 'react';
import { ContactUs } from '../types/contactUs';

interface FormDataContextProps {
  formData: any;
  setFormData: (data: ContactUs) => void;
}

const defaultContextValue: FormDataContextProps = {
  formData: {},
  setFormData: () => {},
};

export const FormDataContext = React.createContext<FormDataContextProps>(defaultContextValue);

interface FormDataProviderProps {
  children?: ReactNode;
}

export const FormDataProvider: React.FC<FormDataProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<any>({});

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};


// // ContactUs型を定義している外部ファイルをインポートします。
// import { ContactUs } from '../types/contactUs';

// // FormDataContextで使用するプロパティの型を定義します。
// // formDataは任意の型で、setFormDataはContactUs型のデータを引数に取る関数です。
// interface FormDataContextProps {
//   formData: any;
//   setFormData: (data: ContactUs) => void;
// }

// // デフォルトのコンテキスト値を定義します。
// // formDataは空のオブジェクトで、setFormDataは何もしない関数です。
// // これは、FormDataContextが使用される前に初期値として提供されます。
// const defaultContextValue: FormDataContextProps = {
//   formData: {},
//   setFormData: () => {},
// };

// // React.createContextを使用して新しいコンテキストを作成します。
// // デフォルトのコンテキスト値として上で定義したdefaultContextValueを使用します。
// export const FormDataContext = React.createContext<FormDataContextProps>(defaultContextValue);

// // childrenを任意に持つことができるFormDataProviderPropsという型を定義します。
// // これは、FormDataProviderコンポーネントが子要素を受け取ることができるようにするためです。
// interface FormDataProviderProps {
//   children?: ReactNode;
// }

// // FormDataProviderコンポーネントを定義します。
// // このコンポーネントは、子要素に対してformDataとsetFormDataを提供します。
// export const FormDataProvider: React.FC<FormDataProviderProps> = ({ children }) => {
//   // formDataの状態を管理するためのReactのuseStateフックを使用します。
//   const [formData, setFormData] = useState<any>();

//   // FormDataContext.Providerコンポーネントを返します。
//   // これにより、子要素はformDataとsetFormDataにアクセスできます。
//   return (
//     <FormDataContext.Provider value={{ formData, setFormData }}>
//       {children}
//     </FormDataContext.Provider>
//   );
// };

