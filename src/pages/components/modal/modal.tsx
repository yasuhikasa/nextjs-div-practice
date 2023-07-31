import React, { useState } from 'react';
import styles from '../../../styles/components/normalModal.module.css';

// プロップスの型定義
interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  content: string;
}

// モーダルコンポーネント
export const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, title, content }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClick={closeModal}>閉じる</button>
      </div>
    </div>
  );
}