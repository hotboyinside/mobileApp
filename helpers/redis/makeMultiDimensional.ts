import { isPlainObject } from "./isPlainObject";

export const makeMultiDimensional = (object: object) => {
  const returnObject: any = {};

  Object.entries(object).forEach(([key, value]) => {
    if (!key.indexOf(".")) {
      returnObject[key] = value;
      return;
    }

    const keyChain = key.split(".");
    let linkObject = returnObject;
    for (let keyIndex = 0; keyIndex < keyChain.length; keyIndex++) {
      if (keyIndex !== keyChain.length - 1) {
        if (!isPlainObject(linkObject[keyChain[keyIndex]])) {
          linkObject[keyChain[keyIndex]] = {};
        }

        linkObject = linkObject[keyChain[keyIndex]];
        continue;
      }

      linkObject[keyChain[keyIndex]] = value;
    }
  });

  return returnObject;
};
