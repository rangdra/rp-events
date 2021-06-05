import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import Hero from './Hero';

const layoutDefaultProps = {
  title: 'Events | Find the hottest events from around the world',
  description: 'Find the latest events or events you are looking for',
  keywords: 'music,food,sports,dj,events',
};

type IProps = {
  children?: ReactNode;
} & typeof layoutDefaultProps;

const Layout = ({ title, keywords, description, children }: IProps) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title} | HOLAEVENTS</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />
      {router.pathname === '/' && <Hero />}

      <div className="sm:w-9/12 w-full p-4 sm:p-0 mx-auto min-h-[65vh] my-4 sm:my-[50px]">
        {children}
      </div>
      <Footer />
    </>
  );
};

Layout.defaultProps = layoutDefaultProps;

export default Layout;
