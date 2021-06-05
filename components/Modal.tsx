import { motion } from 'framer-motion';
import { useState, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';

interface IProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal = ({ show, onClose, children, title }: IProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-0 z-30 flex items-center justify-center w-full min-h-full px-4 sm:px-0 overlay"
    >
      <div className="relative z-30 w-full px-6 py-8 bg-white rounded-lg sm:w-1/2">
        <div className="absolute top-2 right-2">
          <a href="#" onClick={handleClose}>
            <FaTimes className="text-lg text-black" />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className="">{children}</div>
      </div>
    </motion.div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    );
  } else {
    return null;
  }
};

export default Modal;
