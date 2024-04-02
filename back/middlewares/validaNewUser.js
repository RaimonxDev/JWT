export const validateNewUser = (req, res, next) => {
    const { email, password, rol, lenguage } = req.body;
    if (!email || !password || !rol || !lenguage) {
        return res.status(400).json({ error: "Debe llenar todos los campos" });
    }
    next();
}
