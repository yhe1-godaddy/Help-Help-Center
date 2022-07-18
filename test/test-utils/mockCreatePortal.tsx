import React from 'react';

const ReactDOMPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: jest.fn((element, node) => {
    return <ReactDOMPortal>{element}</ReactDOMPortal>;
  })
}));

const createPortal = jest.spyOn(require('react-dom'), 'createPortal');

export const mockCreatePortal = () => {
  const createPortalMock = jest.fn((element, node) => {
    return <ReactDOMPortal>{element}</ReactDOMPortal>;
  });

  createPortal.mockImplementation(createPortalMock);
  return { createPortalMock };
};
