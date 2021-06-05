import { FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Head>
        <title>Not Found</title>
      </Head>
      <h1 className="mb-4 text-5xl">
        <FaExclamationTriangle />
      </h1>
      <h4>Sorry, there is nothing here</h4>
      <Link href="/">Go Back Home</Link>
    </div>
  );
};

export default NotFoundPage;
