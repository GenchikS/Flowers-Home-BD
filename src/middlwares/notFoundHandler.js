// 33. Створення помилки notFoundHandler

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
};


// 32. Попереднє в файлі server.js
// 34. Наступне в файлі server.js
