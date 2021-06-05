import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { stagger } from '../../animations';
import EventItem from '../../components/EventItem';
import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination';
import { API_URL, PER_PAGE } from '../../config';

export default function Events({ events, page, total }) {
  return (
    <Layout>
      <h1 className="mb-2 text-2xl font-bold sm:text-3xl sm:mb-6 text-primary">
        Events
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
        <Pagination page={page} total={total} />
      </motion.div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { page = 1 },
}) => {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  //FetchEvents
  const eventsRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventsRes.json();

  return {
    props: {
      events,
      page: +page,
      total,
    },
  };
};
