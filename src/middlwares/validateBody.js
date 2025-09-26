import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
    console.log('req.body', req.body);
  try {
    await schema.validate(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    next(error);
  }
};
