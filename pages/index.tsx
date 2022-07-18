/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Header } from '../components/header';
// @ts-ignore
import GasketEmblem from '@gasket/assets/react/gasket-emblem';

const logoStyle = { width: '250px', height: '250px' };

export const IndexPage = () => (
    <div>
        <Header />
        <GasketEmblem style={ logoStyle }/>
        <h1>Welcome to Gasket!</h1>
        <p>To get started, edit <code>pages/index.js</code> and save to reload.</p>
        <p><a href='https://gasket.dev'>Learn Gasket</a></p>
    </div>
);

export default IndexPage;
