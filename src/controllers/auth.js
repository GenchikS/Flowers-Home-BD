import { ONE_DAY } from "../constants/index.js";
import { loginUser, logoutUser, registerUser, userDataController } from "../services/auth.js";


export const createUserController = async (req, res) => {
    // console.log('req.body', req.body);
    const user = await registerUser(req.body);
    res.status(201).json({
        status: 201,
        message: "Реєстрація успішна!",
        // data: user
    });
};


export const loginUserController = async (req, res) => {
  // console.log('req.body', req.body);
  const session = await loginUser(req.body);
  // console.log('session', session);
  const user = await userDataController(session.userId);
  // console.log('user', user);
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
      name: user.name,
      email: user.email,
      userId: user._id,
      sessionId: session._id,
      accessToken: session.accessToken,
    },
  });
};


export const logoutUserController = async (req, res) => {
  // console.log('req', req.body.sessionId);
  if (req.cookies.sessionId) {
    await logoutUser(req.body);
  };

  res.clearCookie(`sessionId`);
  res.clearCookie(`refreshToken`);

  res.status(204).send();
};
