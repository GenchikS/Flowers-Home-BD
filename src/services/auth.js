import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/user.js';
// npm i bcrypt хешування пароля
import bcrypt from 'bcrypt';

export const registerUser = async (payload) => {
    // console.log("payload", payload);

    const encryptedPasssword = await bcrypt.hash(payload.password, 10);
    const addUser = await UserCollection.create({...payload, password: encryptedPasssword});
    return addUser;
};


export const loginUser = async (payload) => {

    console.log('payload', payload.email);

    const loginUser = await UserCollection.findOne({email: payload.email});
  if (!loginUser) {
    throw createHttpError(401, 'User not found');
  }

  console.log('loginUser', loginUser);

    const isPasssword = await bcrypt.compare(
      payload.password,
      loginUser.password,
    );
    if (!isPasssword) {
      throw createHttpError(401, 'Unauthorized');
    }
  return loginUser;
};
