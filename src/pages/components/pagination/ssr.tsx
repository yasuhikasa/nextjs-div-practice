import React from 'react';
import styles from '../../../styles/components/pagination.module.css';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getUsers, getTotalUsers } from '../../api/user'; // Replace with actual path to API

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface ServerSideProps {
  page: number;
  totalPages: number;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  const page = context.query.page ? Number(context.query.page) : 1;
  const usersPerPage = 10;  // as defined in server side code
  const data = await getUsers(page); 
  const totalUsers = await getTotalUsers();

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return {
    props: {
      page: page,
      totalPages: totalPages,
    }
  }
}

const SsrPagination: NextPage<PaginationProps> = ({ page, totalPages }) => {
  const router = useRouter();

  const onPageChange = (pageNum: number) => {
    router.push(`?page=${pageNum}`);  // assuming you are using query parameters to handle pagination
  };

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

export default SsrPagination;
