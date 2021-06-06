import Layout from '../../components/Layout';
import DashboardEvent from '../../components/DashboardEvent';
import { parseCookies } from '../../helpers';
import { API_URL } from '../../config';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { stagger } from '../../animations';

interface IProps {
  events: any;
  token: string;
}

const Dashboard = ({ events, token }: IProps) => {
  const router = useRouter();
  const deleteEvent = async (id: string | number) => {
    if (confirm('Are you sure ?')) {
      const res = await fetch(
        `https://rpeventsserver.herokuapp.com/events/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };
  return (
    <Layout title="Dashboard Events">
      <h1 className="mb-2 text-2xl font-bold sm:mb-6 sm:text-3xl">Dashboard</h1>
      <h2 className="text-xl font-bold sm:text-2xl text-primary">My Events</h2>
      <motion.div
        className="mt-2 sm:mt-4"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        {events.map((evt) => (
          <DashboardEvent
            key={evt.id}
            name={evt.name}
            id={evt.id}
            slug={evt.slug}
            handleDelete={deleteEvent}
          />
        ))}
      </motion.div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { token } = parseCookies(req);
  const sendRedirectLocation = (location) => {
    res.writeHead(302, {
      Location: location,
    });
    res.end();
    return { props: {} }; // stop execution
  };

  // some auth logic here

  if (!token) {
    sendRedirectLocation('/auth/login');
  }

  const results = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await results.json();
  return {
    props: {
      events,
      token,
    },
  };
};

export default Dashboard;
