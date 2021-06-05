import moment from 'moment';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { fadeInUp } from '../animations';

interface IProps {
  name: string;
  date: string;
  image?: any;
  slug: string;
  time: string;
}

const EventItem: FunctionComponent<IProps> = ({
  date,
  image,
  name,
  slug,
  time,
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col p-4 mb-4 bg-white shadow-md sm:items-center sm:justify-between sm:flex-row"
    >
      <div className="mb-2 wrapper-img">
        <Image
          src={
            image ? image.formats.thumbnail.url : '/images/event-default.png'
          }
          width={200}
          height={140}
          layout="responsive"
        />
      </div>

      <div className="wrapper-title">
        <p className="text-xs sm:text-base">
          {moment(date).format('LL')} at {time}
        </p>
        <h2 className="pr-6 mb-4 text-xl font-bold text-gray-800 sm:pr-0 sm:mb-4 sm:text-2xl">
          {name}
        </h2>
      </div>
      <Link href={`/events/${slug}`}>
        <a className="px-6 py-3 text-center text-white bg-primary hover:opacity-50 transition-duration">
          Details
        </a>
      </Link>
    </motion.div>
  );
};

export default EventItem;
