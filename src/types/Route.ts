
export type Route = {
  page: string;
  name: string;
  analyticsId: string;
  path: string;
};

export type RouteParam =
  | string
  | string[]
  | boolean
  | number
  | Record<string, string | number>
  | Record<string, string | number>[]
  | undefined
  | null;

export type RouteParams = Record<string, RouteParam>;
