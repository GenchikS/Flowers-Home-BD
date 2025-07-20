// 35. Створення мідлвари помилки errorHandler
export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
};

// 34. Попереднє в файлі server.js
// 36. Наступне в файлі server.js

