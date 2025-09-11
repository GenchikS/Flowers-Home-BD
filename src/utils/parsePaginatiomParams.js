const parseNumber = (number, defaultValue) => {
    const isString = typeof number === 'string';

    if (!isString) return defaultValue;

    const parsedNumber = parseInt(number); //парсить ціле число

    if (Number.isNaN(parsedNumber)) {
      return defaultValue;
    };
    return parsedNumber;
};

const parseString = (color, defaultValue) => {
  const isString = typeof color;
  // console.log('isString', isString);
  if (!isString) return defaultValue;
  return color;
};




export const parsePaginationParams = (query) => {
  // console.log('***', query);
  const { page, perPage, color } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 2);
  const parsedColor = parseString(color);

    return {
      page: parsedPage,
      perPage: parsedPerPage,
      color: parsedColor,
    };
};
