import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { stagger } from '../animations';
import EventItem from '../components/EventItem';
import Layout from '../components/Layout';
import { API_URL } from '../config';

export default function Home({ events }) {
  return (
    <Layout>
      <h1 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl text-primary">
        Upcoming <br className="sm:hidden" /> Events
      </h1>
      <motion.div
        className="mb-6"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        {events.length > 0 ? (
          events.map((evt) => (
            <EventItem
              name={evt.name}
              time={evt.time}
              slug={evt.slug}
              image={evt.image}
              key={evt.id}
              date={evt.date}
            />
          ))
        ) : (
          <h1>Tidak ada events</h1>
        )}
      </motion.div>

      <Link href="/events">
        <a className="p-2 text-sm text-white bg-primary transition-duration hover:opacity-50">
          View All Events
        </a>
      </Link>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: {
      events,
    },
    revalidate: 1,
  };
};
