import qs from 'qs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { API_URL } from '../../config';
import EventItem from '../../components/EventItem';
import { motion } from 'framer-motion';
import { stagger } from '../../animations';

const Search = ({ events }) => {
  const router = useRouter();

  return (
    <Layout>
      <Link href="/events">
        <a className="text-blue-500">Go Back</a>
      </Link>
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl text-primary">
        Searh Result for "{router.query.term}"
      </h1>
      <motion.div variants={stagger} initial="initial" animate="animate">
        {events.length > 0 ? (
          events.map((evt) => (
            <EventItem
              key={evt.id}
              name={evt.name}
              time={evt.time}
              slug={evt.slug}
              image={evt.image}
              date={evt.date}
            />
          ))
        ) : (
          <h3>Tidak ada events dengan keyword "{router.query.term}"</h3>
        )}
      </motion.div>
    </Layout>
  );
};

export default Search;

export const getServerSideProps = async ({ query: { term } }) => {
  const query: string = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { vanue_contains: term },
      ],
    },
  });
  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: {
      events,
    },
  };
};
