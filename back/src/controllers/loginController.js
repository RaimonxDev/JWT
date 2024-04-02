import { getUserByEmail } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email: emailUser, password } = req.body;
  try {
    const findUser = await getUserByEmail({ email: emailUser });
      if (!findUser) {
        return res.json({ message: 'invalid Email or Password', code: 400 });
      }
    const isPasswordValid = bcrypt.compareSync(password, findUser.password);
      if (!isPasswordValid) {
          return res.json({ message: 'invalid Email or Password', code: 400 });
      }
      const { email } = findUser;
      const token = await createToken(email);-
      res.status(200).json({
          message: `Bienvenido, ${email}`,
          code: 200,
          token
      });
  
  } catch (error) {
      res.status(500).json({ error: 'Internal Error Server' });
  }
  
};

const createToken = async (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
  });
};
