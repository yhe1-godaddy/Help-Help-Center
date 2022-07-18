// Mocks useDispatch

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn()
}));

const useDispatch = jest.spyOn(require('react-redux'), 'useDispatch');

/**
 * mockNextUseRouter
 * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
 */

export const mockUseDispatch = () => {
  const mockDispatch = jest.fn().mockResolvedValue(Promise.resolve());
  useDispatch.mockImplementation(() => mockDispatch);
  return { mockDispatch };
};
