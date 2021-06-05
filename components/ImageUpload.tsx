import { ChangeEvent, useState } from 'react';
import { API_URL } from '../config';
import Button from './atoms/Button';

interface IProps {
  evtId: string | Blob;
  imageUploaded: () => void;
  token: string;
}

const ImageUpload = ({ evtId, imageUploaded, token }: IProps) => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'events');
    formData.append('refId', evtId);
    formData.append('field', 'image');

    const res = await fetch(`https://rpeventsserver.herokuapp.com/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files[0]);
  };
  return (
    <div className="mt-6">
      <h1 className="text-xl font-bold text-black sm:text-2xl">
        Upload Event Image
      </h1>
      <form className="mt-2 sm:mt-6" onSubmit={handleSubmit}>
        <div className="p-4 mb-4 bg-gray-200 border border-gray-400">
          <input type="file" onChange={handleFileChange} className="w-full" />
        </div>
        <Button type="submit" className="bg-primary">
          Upload
        </Button>
      </form>
    </div>
  );
};

export default ImageUpload;
