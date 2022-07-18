export const fromEntriesObj = (arr: any[] | IterableIterator<[string, string]>) =>
  [...arr].reduce((o, [key, value]) => ({ ...o, [key]: value }), {});
