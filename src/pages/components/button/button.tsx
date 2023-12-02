import { NextPage } from 'next';
import React from 'react';

interface ButtonProps {
  title: string;
  buttonType?: 'submit' | 'button' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;

}

const Button:NextPage<ButtonProps> =({ title ,buttonType, onClick, className })=> {
  return (
    <div>
      <button type={buttonType} className={className} onClick={onClick}>{title}</button>
    </div>
  );
}

export default Button;