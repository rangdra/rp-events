import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { GetServerSideProps } from 'next';
import Layout from '../../../components/Layout';
import { parseCookies } from '../../../helpers';
import { FaImage } from 'react-icons/fa';
import Modal from '../../../components/Modal';
import ImageUpload from '../../../components/ImageUpload';
import moment from 'moment';
import Button from '../../../components/atoms/Button';

interface IValues {
  name: string;
  performers: string;
  vanue: string;
  address: string;
  date: string;
  time: string;
  description: string;
}

interface IProps {
  evt: any;
  token: string;
}
const EditEvent = ({ evt, token }: IProps) => {
  const [values, setValues] = useState<IValues>({
    name: evt.name,
    performers: evt.performers,
    vanue: evt.vanue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });
  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }

    const res = await fetch(
      `https://rpeventsserver.herokuapp.com/events/${evt.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      }
    );

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('Unauthorized');
        return;
      }
      toast.error('Something went wrong');
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  const imageUploaded = async () => {
    const res = await fetch(
      `https://rpeventsserver.herokuapp.com/events/${evt.id}`
    );
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Edit Event">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <span
          className="text-blue-500 cursor-pointer hover-link"
          onClick={() => router.back()}
        >
          Go Back
        </span>
        <h1 className="text-2xl font-bold sm:mt-4 sm:text-3xl">Edit Event</h1>
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
                placeholder="Performers Name..."
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
                value={moment(values.date).format('yyyy-MM-DD')}
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
            Edit Event
          </Button>
        </form>
        <h2 className="mt-6 text-xl font-bold sm:mb-2 sm:text-2xl">
          Event Image
        </h2>
        {imagePreview ? (
          <Image src={imagePreview} height={100} width={170} />
        ) : (
          <div>
            <p>No Image uploaded</p>
          </div>
        )}

        <div className="mt-4 sm:mt-6">
          <Button
            onClick={() => setShowModal(true)}
            className="bg-gray-800"
            width="px-4"
          >
            <FaImage className="inline" /> Set Image
          </Button>
        </div>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ImageUpload
            evtId={evt.id}
            imageUploaded={imageUploaded}
            token={token}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params: { id },
  req,
}) => {
  const { token } = parseCookies(req);
  const res = await fetch(`https://rpeventsserver.herokuapp.com/events/${id}`);
  const evt = await res.json();

  return {
    props: { evt, token },
  };
};

export default EditEvent;
