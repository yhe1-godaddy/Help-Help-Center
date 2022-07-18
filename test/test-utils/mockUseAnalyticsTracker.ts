// Mocks useAnalyticsTracker

jest.mock('../../src/hooks/useAnalyticsTracker', () => ({
  useAnalyticsTracker: () => ({
    track: jest.fn()
  })
}));

const useAnalyticsTracker = jest.spyOn(
  require('../../src/hooks/useAnalyticsTracker'),
  'useAnalyticsTracker'
);

/**
 * mockNextUseRouter
 * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
 */

export const mockUseAnalyticsTracker = () => {
  const mockTracker = jest.fn().mockResolvedValue(Promise.resolve());
  useAnalyticsTracker.mockImplementation(() => ({
    track: mockTracker
  }));
  return { mockTracker };
};
