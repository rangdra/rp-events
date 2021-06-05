import { motion } from 'framer-motion';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { FaPencilAlt, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { fadeInUp } from '../animations';

interface IProps {
  name: string;
  id: string | number;
  slug: string;
  handleDelete: (id: string | number) => void;
}

const DashboardEvent: FunctionComponent<IProps> = ({
  name,
  id,
  slug,
  handleDelete,
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex items-center justify-between p-4 mb-4 bg-white shadow-md"
    >
      <h3 className="font-bold text-blue-500 text-md sm:text-lg">
        <Link href={`/events/${slug}`}>{name}</Link>
      </h3>
      <div className="flex items-center space-x-4">
        <Link href={`/events/edit/${id}`}>
          <a className="text-blue-500 hover-link">
            <FaPencilAlt className="inline" />{' '}
            <span className="hidden sm:inline">Edit Event</span>
          </a>
        </Link>
        <a
          href="#"
          className="text-red-500 hover-link"
          onClick={() => handleDelete(id)}
        >
          <FaTrashAlt className="inline" />{' '}
          <span className="hidden sm:inline">Delete Event</span>
        </a>
      </div>
    </motion.div>
  );
};

export default DashboardEvent;
