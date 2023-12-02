import { NextPage } from 'next';
import React, { FC } from 'react';

interface RadioButtonOption {
  value: string;
  label: string;
}

interface RadioButtonProps {
  name: string;
  options: RadioButtonOption[];
}

// ラジオボタンのコンポーネントを作りたい。
// その際、オブジェクトでラジオボタンの種類の配列を用意して、mapで回したい
const RadioButton: NextPage<RadioButtonProps> = ({ name, options }) => {
  return (
    <div>
      {options.map((option, index) => (
        <label key={index}>
          <input type="radio" name={name} value={option.value} />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButton;

// 使用例

// import React from 'react';
// import RadioButton from './RadioButton';

// const App: React.FC = () => {
//   const options = [
//     { value: 'apple', label: 'Apple' },
//     { value: 'banana', label: 'Banana' },
//     { value: 'cherry', label: 'Cherry' },
//   ];

//   return (
//     <div>
//       <RadioButton name="fruit" options={options} />
//     </div>
//   );
// };

// export default App;
