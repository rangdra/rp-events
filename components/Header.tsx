import { FaSignInAlt } from 'react-icons/fa';
import { HiMenuAlt3 } from 'react-icons/hi';
import Link from 'next/link';
import SearchComp from './SearchComp';
import { FunctionComponent, useEffect, useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Button from './atoms/Button';
import { motion } from 'framer-motion';
import { fadeInDown } from '../animations';

const Header: FunctionComponent = () => {
  const { user, logout } = useContext(AuthContext);
  const [click, setClick] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const showMobile = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    showMobile();
  }, []);

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', showMobile);
  }

  return (
    <motion.nav
      variants={fadeInDown}
      initial="initial"
      animate="animate"
      transition={{ type: 'tween' }}
      className="relative flex items-center justify-between p-5 px-6 bg-white shadow-lg"
    >
      <div className="logo">
        <Link href="/">
          <a className="text-2xl font-bold tracking-wide uppercase text-primary transition-duration hover:opacity-50">
            HolaEvents
          </a>
        </Link>
      </div>
      <div className="hidden sm:flex">
        <SearchComp />
      </div>
      {isMobile && (
        <div>
          <HiMenuAlt3
            className="text-2xl cursor-pointer hover-link"
            onClick={() => setClick(!click)}
          />
        </div>
      )}
      <ul
        className={`${
          click
            ? ' translate-x-0 opacity-100 '
            : '-translate-x-full md:translate-x-0 opacity-0 md:opacity-100 '
        } flex flex-col md:flex-row transform z-20  w-full md:w-max transition duration-300 items-center space-y-6 md:space-y-0 md:space-x-4 py-6 md:py-0 bg-primary md:bg-white md:text-black md:static text-white absolute top-[71px] left-0`}
      >
        <li className="mr-2">
          <Link href="/events">
            <a className="hover-link">Events</a>
          </Link>
        </li>
        {user ? (
          <>
            <li className="mr-2">
              <Link href="/events/add">
                <a className="hover-link">Add Event</a>
              </Link>
            </li>
            <li className="mr-2">
              <Link href="/auth/dashboard">
                <a className="hover-link">Dashboard</a>
              </Link>
            </li>
            <li>
              <Button
                onClick={() => logout()}
                className="flex items-center bg-gray-800"
                width="px-4"
              >
                <FaSignInAlt className="mr-2" /> Logout
              </Button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/auth/login">
              <a className="flex items-center px-4 py-2 text-white bg-gray-800 hover:opacity-50 transition-duration">
                <FaSignInAlt className="mr-2" /> Login
              </a>
            </Link>
          </li>
        )}
      </ul>
    </motion.nav>
  );
};

export default Header;
