import { createUser, getAllUser as modelGetAllUser } from '../models/userModel.js';

export const createNewUserController = async (req, res) => {
    try {
        const { email, lenguage, password, rol } = req.body;
        const newUser = await createUser({
            email,
            lenguage,
            password,
            rol
        })
        res.status(201).json({ user: newUser })
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ message: 'User already exists' })
        }
        res.status(400).json({ error: error.message });
    }
}

export const getAllUserController = async (req, res) => {
    try {
        const users = await modelGetAllUser();
        if (!users) {
            return res.status(204).send({ "users": users });
        }
        return res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
