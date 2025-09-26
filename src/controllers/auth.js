import { registerUser } from "../services/auth.js";


export const createUserController = async (req, res) => {
    console.log('req.body', req.body);
    const user = await registerUser(req.body);
    res.status(201).json({
        status: 201,
        message: "Succefully register a user",
        data: user
    });
};
