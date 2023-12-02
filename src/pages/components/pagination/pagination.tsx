import React from 'react';
import styles from '../../../styles/components/pagination.module.css';
import { NextPage } from 'next';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: NextPage<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  const previousPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  const pages = Array.from({length: totalPages}, (_, index) => index + 1);


  return (
    <div className={styles.pagination}>
      <button onClick={previousPage} disabled={page === 1}>前へ</button>
      {pages.map((pageNum) =>
        Math.abs(page - pageNum) <= 2 ? (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            disabled={pageNum === page}
            className={pageNum === page ? 'active' : ''}
          >
            {pageNum}
          </button>
        ) : null
      )}
      <button onClick={nextPage} disabled={page === totalPages}>次へ</button>
    </div>
  );
}

export default Pagination;
