import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/user.js';
// npm i bcrypt хешування пароля
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { SessionsCollection } from '../db/models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

export const registerUser = async (payload) => {
    // console.log("payload", payload);

    const encryptedPasssword = await bcrypt.hash(payload.password, 10);
    const addUser = await UserCollection.create({...payload, password: encryptedPasssword});
    return addUser;
};




export const loginUser = async (payload) => {

  // console.log('payload', payload.email);

  const loginUser = await UserCollection.findOne({ email: payload.email });
  if (!loginUser) {
    throw createHttpError(401, 'User not found');
  }

  // console.log('loginUser', loginUser);
  // console.log('loginUser.password', loginUser.password);


  const isPasssword = await bcrypt.compare(
    payload.password,
    loginUser.password,
  );
  // console.log('payload', payload.password);
  // console.log('isPasssword', isPasssword);
  if (!isPasssword) {
    throw createHttpError(401, 'Unauthorized');
  }

await SessionsCollection.deleteOne({ userId: loginUser._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');


  return await SessionsCollection.create({
    userId: loginUser._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};


export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};
