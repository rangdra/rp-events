import { useRouter } from 'next/router';
import { createContext, useState, useEffect } from 'react';
import { NEXT_URL } from '../config';

interface IContext {
  user: null;
  error: null;
  login: Function;
  logout: Function;
  register: Function;
}

const defaultValueContext: IContext = {
  user: null,
  error: null,
  login: () => {},
  logout: () => {},
  register: () => {},
};
const AuthContext = createContext<IContext>(defaultValueContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  //Register
  const register = async (user) => {
    const res = await fetch(`https://rpevents.vercel.app/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/auth/dashboard');
    } else {
      setError(data.message);
      setError(null);
    }
  };

  //Login
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`https://rpevents.vercel.app/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/auth/dashboard');
    } else {
      setError(data.message);
      setError(null);
    }
  };

  //Check if user login
  const checkUserLoggedIn = async () => {
    const res = await fetch(`https://rpevents.vercel.app/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  //Logout
  const logout = async () => {
    const res = await fetch(`https://rpevents.vercel.app/api/logout`, {
      method: 'POST',
    });

    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
