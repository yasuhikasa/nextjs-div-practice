import React, { FC, useState } from 'react';

// テキストボックスのコンポーンネントを作りたい。
//その際、何かしらエラーが出たら、errorのpropsを渡して、テキストボックスを赤くしたい。
interface TextBoxProps {
  error?: boolean;
  inputType?: 0 | 1 | 2 | 3;
  width?: string | number;
  height?: string | number;
}

//inputタグのtype属性は、propsで1ならtext,2ならnumber,3ならpassword、デフォルトは0としたい。
//widthとheightは、propsで渡せるようにしたい。
//errorは、propsで渡せるようにしたい。
const TextBox: FC<TextBoxProps> = ({
  error = false,
  inputType = 0,
  width = '200px',
  height = '30px',
}) => {
  const [isFocused, setFocused] = useState(false);

  let type: 'text' | 'number' | 'password';

  switch (inputType) {
    case 1:
      type = 'text';
      break;
    case 2:
      type = 'number';
      break;
    case 3:
      type = 'password';
      break;
    default:
      type = 'text';
      break;
  }

  const style: React.CSSProperties = {
    border: isFocused ? '2px solid blue' : error ? '2px solid red' : '2px solid transparent',
    width: width,
    height: height,
  };

  return (
    <input
      type={type}
      style={style}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

export default TextBox;