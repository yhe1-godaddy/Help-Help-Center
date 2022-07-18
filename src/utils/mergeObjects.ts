export const mergeObjects = (target: Record<any, any>, source: Record<any, any>, deep = false) => {
  const newObj: Record<string, any> = { ...target };

  Object.keys(source).forEach(function (key) {
    if (deep && source[key] && typeof source[key] === 'object') {
      newObj[key] = mergeObjects(target[key] || {}, source[key], deep);
    } else {
      newObj[key] = source[key];
    }
  });

  return newObj;
};
