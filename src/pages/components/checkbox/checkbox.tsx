import { NextPage } from 'next';
import React, { FC, useState } from 'react';

interface CheckBoxProps {
  name: string;
  onSelectionChange?: (selectedMonths: string[]) => void;
}


//１月から１２月までを複数選択できるチェックボックス
// オブジェクトからチェックボックスの種類の配列を用意して、mapで回したい
const CheckBox: NextPage<CheckBoxProps> = ({ name, onSelectionChange }) => {
  const months = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月',
  ];

  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedMonths(prev => [...prev, value]);
    } else {
      setSelectedMonths(prev => prev.filter(month => month !== value));
    }

    onSelectionChange && onSelectionChange(selectedMonths);
  };

  return (
    <div>
      {months.map((month, index) => (
        <label key={index}>
          {month}：
          <input
            type="checkbox"
            name={name}
            value={month}
            onChange={handleCheckboxChange}
          />
        </label>
      ))}
    </div>
  );
};

export default CheckBox;


// 使用例
// import React from 'react';
// import CheckBox from './CheckBox';

// const App: React.FC = () => {
//   const handleSelectionChange = (selectedMonths: string[]) => {
//     console.log(`Selected months: ${selectedMonths.join(', ')}`);
//   };

//   return (
//     <div>
//       <CheckBox name="months" onSelectionChange={handleSelectionChange} />
//     </div>
//   );
// };

// export default App;
