import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { PER_PAGE } from '../config';

const Pagination: FunctionComponent<{ page: number; total: number }> = ({
  page,
  total,
}) => {
  const lastPage = Math.ceil(total / PER_PAGE);
  const router = useRouter();
  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        className="px-4 py-2 text-sm text-white disabled:opacity-50 focus:outline-none hover:opacity-70"
        style={{ backgroundColor: '#000' }}
        onClick={() => router.push(`/events?page=${page - 1}`)}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>
        {page} / {lastPage}
      </span>
      <button
        className="px-4 py-2 text-sm text-white disabled:opacity-50 focus:outline-none hover:opacity-70"
        style={{ backgroundColor: '#000' }}
        onClick={() => router.push(`/events?page=${page + 1}`)}
        disabled={page === lastPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
