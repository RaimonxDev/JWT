import jwt from "jsonwebtoken";

export const isLogin = async (req, res, next) => {
    try {
        validateHeaders(req, res);
        const token = req.header("Authorization").split(" ")[1];
        const tokenData = await validateToken(token);
        req.user = tokenData;
        next();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Falta email o password" });
    }
    next();
}


const validateToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        throw new Error({
            code: '400',
            message: 'Token no válido'
        });
    }
};

const validateHeaders = (req) => {
    if (!req.header("Authorization")) {
        throw new Error({
            code: '400',
            message: 'Token no encontrado en headers'
        });
    }
};