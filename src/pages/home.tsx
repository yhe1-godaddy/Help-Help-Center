import React from 'react';
import { Header } from '../components/common/Header';
import { NextPage } from 'next';
import { withLocale } from '../utils/hoc/withLocale';

const HomePage: NextPage = () => {
  return (
    <div className='home'>
      <Header />
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default withLocale(HomePage);
