import moment from 'moment';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { FaArrowLeft } from 'react-icons/fa';
import Layout from '../../components/Layout';
import { API_URL } from '../../config';

const EventDetail = ({ evt }) => {
  console.log(evt);
  return (
    <Layout title={evt.slug}>
      <div className="px-8 py-4 bg-white rounded-lg">
        <p>
          {moment(evt.date).format('LL') ?? 'date'} at {evt.time ?? 'time'}
        </p>
        <h2 className="mb-4 text-3xl font-bold">{evt.name ?? 'Event name'}</h2>
        <div className="ml-[-2rem] mr-[-2rem] mb-6 ">
          <Image
            src={
              evt.image
                ? evt.image.formats.thumbnail.url
                : '/images/event-default.png'
            }
            height={600}
            width={960}
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Performers</h3>
          <p>{evt.performers ?? '-'}</p>
          <h3 className="mt-2 text-2xl font-bold">Description</h3>
          <p>{evt.description ?? '-'}</p>
          <h3 className="mt-2 text-2xl font-bold">Venue</h3>
          <p>{evt.vanue ?? '-'}</p>
          <Link href="/events">
            <a className="flex items-center mt-4 text-blue-500 cursor-pointer hover:text-blue-300">
              <FaArrowLeft className="mr-2" /> Go Back
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { slug },
}) => {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: { evt: events[0] },
  };
};
export default EventDetail;
