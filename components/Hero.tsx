import { motion } from 'framer-motion';
import { FunctionComponent } from 'react';

const Hero: FunctionComponent = () => {
  return (
    <div className="px-8 text-white hero">
      <motion.h1
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="text-3xl font-bold text-center sm:text-4xl"
      >
        Welcome To The Party!{' '}
      </motion.h1>
      <motion.p
        initial={{ x: '100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120, delay: 0.5 }}
        className="mt-2 text-xl font-bold sm:text-2xl"
      >
        Find the hottest events from around the world
      </motion.p>
    </div>
  );
};

export default Hero;
