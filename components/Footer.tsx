import Link from 'next/link';
import { FunctionComponent } from 'react';

const Footer: FunctionComponent = () => {
  return (
    <footer className="py-2 text-center bg-white shadow-lg sm:py-4">
      <p className="text-sm md:text-base">Copyright © DJ Events 2021</p>
      <Link href="/about">
        <a className="text-xs text-blue-500 md:text-sm">About This Project.</a>
      </Link>
    </footer>
  );
};

export default Footer;
