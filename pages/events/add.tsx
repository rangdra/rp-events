import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { toast } from 'react-toastify';
import { GetServerSideProps } from 'next';
import { parseCookies } from '../../helpers';
import { API_URL } from '../../config';
import Button from '../../components/atoms/Button';

interface IValues {
  name: string;
  performers: string;
  vanue: string;
  address: string;
  date: string;
  time: string;
  description: string;
}
const AddEvent = ({ token }) => {
  const [values, setValues] = useState<IValues>({
    name: '',
    performers: '',
    vanue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  });
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    //Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }

    const res = await fetch(`https://rpeventsserver.herokuapp.com/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('No token included');
        return;
      }
      toast.error('Something went wrong');
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };
  return (
    <Layout title="Add New Event">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <span
          className="text-blue-500 cursor-pointer hover-link"
          onClick={() => router.back()}
        >
          Go Back
        </span>
        <h1 className="text-2xl font-bold sm:mt-4 sm:text-3xl">Add Event</h1>
        <form className="mt-2 sm:mt-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name">Event Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                className="block w-full p-2 mt-1 border border-gray-800 focus:outline-none focus:ring ring-primary ring-opacity-50 transition-duration focus:border-primary"
                placeholder="Your Event Name..."
              />
            </div>
            <div>
              <label htmlFor="performers">Guest Star</label>
              <input
                type="text"
                name="performers"
                id="performers"
                value={values.performers}
                onChange={handleChange}
                className="block w-full p-2 mt-1 border border-gray-800 focus:outline-none focus:ring ring-primary ring-opacity-50 transition-duration focus:border-primary"
                placeholder="Guest Star Name..."
              />
            </div>
            <div>
              <label htmlFor="venue">Venue</label>
              <input
                type="text"
                name="vanue"
                id="venue"
                value={values.vanue}
                onChange={handleChange}
                className="block w-full p-2 mt-1 border border-gray-800 focus:outline-none focus:ring ring-primary ring-opacity-50 transition-duration focus:border-primary"
                placeholder="Venue Location..."
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={values.address}
                onChange={handleChange}
                className="block w-full p-2 mt-1 border border-gray-800 focus:outline-none focus:ring ring-primary ring-opacity-50 transition-duration focus:border-primary"
                placeholder="Address..."
              />
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={values.date}
                onChange={handleChange}
                className="block w-full p-2 mt-1 border border-gray-800 focus:outline-none focus:ring ring-primary ring-opacity-50 transition-duration focus:border-primary"
                placeholder="Date..."
              />
            </div>
            <div>
              <label htmlFor="time">Time</label>
              <input
                type="text"
                name="time"
                id="time"
                value={values.time}
                onChange={handleChange}
                className="block w-full p-2 mt-1 border border-gray-800 focus:outline-none focus:ring ring-primary ring-opacity-50 transition-duration focus:border-primary"
                placeholder="Time..."
              />
            </div>
          </div>{' '}
          <div className="mt-4">
            <label htmlFor="description">Event Description</label>
            <textarea
              typeof="text"
              name="description"
              id="description"
              value={values.description}
              onChange={handleChange}
              className="block w-full p-2 mt-1 border border-gray-800 focus:outline-none focus:ring ring-primary ring-opacity-50 transition-duration focus:border-primary"
              placeholder="Event Description..."
              rows={7}
            ></textarea>
          </div>
          <Button type="submit" className="mt-6 bg-primary">
            Add Event
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
};

export default AddEvent;
