import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

const SearchComp: FunctionComponent = () => {
  const [term, setTerm] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (e): void => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm('');
  };
  const selectWrapper = useRef(null);

  const clickOutside = (e) => {
    if (selectWrapper && !selectWrapper?.current?.contains(e.target)) {
      setTerm('');
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', clickOutside);
    return () => {
      window.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} ref={selectWrapper}>
      <input
        type="text"
        placeholder="Search Events..."
        className="p-2 border border-gray-800 focus:outline-none focus:ring ring-primary ring-opacity-50 transition-duration focus:border-primary"
        onChange={(e) => setTerm(e.target.value)}
      />
    </form>
  );
};

export default SearchComp;
