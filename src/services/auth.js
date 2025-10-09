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
  // console.log("payload", payload);

//   const encryptedPasssword = await bcrypt.hash(payload.password, 10);
  const addUser = await UserCollection({
    // ...payload,
    // password: encryptedPasssword,
  });
  return addUser;
};
