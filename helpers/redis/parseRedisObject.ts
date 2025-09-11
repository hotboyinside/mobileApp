import { makeMultiDimensional } from "./makeMultiDimensional";

export const parseRedisObject = (symbol: object) => {
  const dataFromSymbol = makeMultiDimensional(symbol);

  Object.entries(dataFromSymbol).forEach(([key, value]) => {
    if (value === "false") {
      dataFromSymbol[key] = false;
    } else if (value === "true") {
      dataFromSymbol[key] = true;
    } else if (!isNaN(Number(value))) {
      dataFromSymbol[key] = Number(value);
    }
  });

  return dataFromSymbol;
};
