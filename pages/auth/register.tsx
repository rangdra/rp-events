import Link from 'next/link';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import AuthContext from '../../context/AuthContext';

interface IRegister {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register = () => {
  const [newUser, setNewUser] = useState<IRegister>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { register, error } = useContext(AuthContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newUser.password !== newUser.passwordConfirm) {
      toast.error('Password do not match');
      return;
    }

    register(newUser);
  };
  return (
    <Layout title="Register User">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full p-4 bg-white shadow-lg md:w-1/2 lg:w-1/3">
          <h3 className="mb-4 text-3xl font-bold tracking-wide text-center text-primary">
            Register
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={newUser.username}
                onChange={handleChange}
                className="block w-full p-2 mt-1 border border-gray-800 focus:outline-none focus:ring ring-primary ring-opacity-50 transition-duration focus:border-primary"
                placeholder="Your username"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email Adress</label>
              <input
                type="email"
                value={newUser.email}
                onChange={handleChange}
                name="email"
                id="email"
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
                value={newUser.password}
                onChange={handleChange}
                className="block w-full p-2 mt-1 border border-gray-800 focus:outline-none focus:ring ring-primary ring-opacity-50 transition-duration focus:border-primary"
                placeholder="Your Password..."
              />
            </div>
            <div className="mb-4">
              <label htmlFor="passwordConfirm">Password Confirmation</label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                value={newUser.passwordConfirm}
                onChange={handleChange}
                className="block w-full p-2 mt-1 border border-gray-800 focus:outline-none focus:ring ring-primary ring-opacity-50 transition-duration focus:border-primary"
                placeholder="Your Password Confirmation"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 my-2 text-white bg-primary transition-duration hover:opacity-70"
            >
              Register
            </button>
          </form>
          <p className="mt-4">
            Already have an account?{' '}
            <Link href="/auth/login">
              <a className="text-blue-500 underline hover:text-blue-400">
                Login
              </a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
