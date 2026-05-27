import { ONE_DAY } from "../constants/index.js";
import { HistoryDataCollection } from "../db/models/historyData.js";
import { loginUser, logoutUser, registerUser, userDataController } from "../services/auth.js";

import geoip from 'geoip-lite';
import * as parser from 'ua-parser-js';


export const createUserController = async (req, res) => {
    // console.log('req.body', req.body);
    const user = await registerUser(req.body);
    res.status(201).json({
        status: 201,
        message: "Реєстрація успішна!",
        data: user
    });
};


// export const loginUserController = async (req, res, next) => {
//   try {
//     const rawIp = req.ip;
//     const rawUserAgent = req.get('User-Agent'); // доставем браузер или мобайл ос
//     // console.log('rawUserAgent:', rawUserAgent);
//     const { UAParser } = parser;
//     const ua = UAParser(rawUserAgent);
//     console.log('Parser ua:', ua);

// const geo = geoip.lookup(rawIp);

// await LoginHistoryStatsCollection.create({
//   userId: updatedUser._id,
//   userNickname: updatedUser.userNickname,
//   ip: rawIp,
//   range: geo?.range || [],
//   ll: geo?.range || [],
//   country: geo?.country || 'Unknown',
//   city: geo?.city || 'Unknown',
//   area: geo?.area || 'Unknown',
//   deviceType: ua.device.type || 'Unknown',
//   os: ua.os.name || 'Unknown',
//   browser: ua.browser.name || 'Unknown',
// });



export const loginUserController = async (req, res) => {
  // console.log('req.body', req.body);
  const session = await loginUser(req.body);
  // console.log('session', session);
  const user = await userDataController(session.userId);
  // console.log('user', user);

  const rawIp = req.ip;
  const rawUserAgent = req.get('User-Agent');
  console.log('rawUserAgent:', rawUserAgent);
  const { UAParser } = parser;
  const ua = UAParser(rawUserAgent);
  console.log('Parser ua:', ua);

  const geo = geoip.lookup(rawIp);

  await HistoryDataCollection.create({
    userId: session.userId,
    // userNickname: updatedUser.userNickname,
    ip: rawIp,
    range: geo?.range || [],
    ll: geo?.range || [],
    country: geo?.country || 'Unknown',
    city: geo?.city || 'Unknown',
    area: geo?.area || 'Unknown',
    deviceType: ua.device.type || 'Unknown',
    os: ua.os.name || 'Unknown',
    browser: ua.browser.name || 'Unknown',
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  // console.log('user', user);
  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      role: user.role,
      name: user.name,
      email: user.email,
      userId: user._id,
      sessionId: session._id,
      accessToken: session.accessToken,
    },
  });
};


export const logoutUserController = async (req, res) => {
  // console.log('req', req.body);
  if (req.body.sessionId) {
    await logoutUser(req.body.sessionId);
  };

  res.clearCookie(`sessionId`);
  res.clearCookie(`refreshToken`);

  res.status(204).send();
};
