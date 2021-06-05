import { ChangeEvent, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Layout from '../../components/Layout';
import AuthContext from '../../context/AuthContext';

interface ILogin {
  email: string;
  password: string;
}

const Login = () => {
  const { login, error } = useContext(AuthContext);
  const [data, setData] = useState<ILogin>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(data);
  };
  return (
    <Layout title="Login User">
      {error && toast.error(error)}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full p-4 bg-white shadow-lg md:w-1/2 lg:w-1/3">
          <h3 className="mb-4 text-3xl font-bold tracking-wide text-center text-primary">
            Log In
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email text-primary">Email Adress</label>
              <input
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleChange}
                className="block w-full p-2 mt-1 border border-gray-800 focus:outline-none focus:ring ring-primary ring-opacity-50 transition-duration focus:border-primary"
                placeholder="Your Email Adress..."
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                className="block w-full p-2 mt-1 border border-gray-800 focus:outline-none focus:ring ring-primary ring-opacity-50 transition-duration focus:border-primary"
                placeholder="Your Password..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 my-2 text-white bg-primary transition-duration hover:opacity-50"
            >
              Log In
            </button>
          </form>
          <p className="mt-4">
            Don't have an account?{' '}
            <Link href="/auth/register">
              <a className="text-blue-500 underline hover:text-blue-400">
                Register
              </a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
