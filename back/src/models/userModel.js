import pool from '../../config/databases/db.js';
import bcrypt from 'bcryptjs';

export const createUser = async ({email, password, rol, lenguage}) =>{
    const hashedPass = bcrypt.hashSync(password)
    const sqlQuery = {
        text : 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
        values : [email, hashedPass, rol, lenguage],
    };
    const response = await pool.query(sqlQuery);
    return response.rows[0];
}

export const getUserByEmail = async ({email}) =>{
    const sqlQuery = {
        text : 'SELECT * FROM usuarios where email = $1',
        values : [email],
    };
    const response = await pool.query(sqlQuery);
    return response.rows[0];
}

export const getAllUser = async() => {
    try {
        const sqlQuery = {
            text: "SELECT id, email, rol, lenguage FROM usuarios",
        };
        const users = await pool.query(sqlQuery);
        return users.rows;
    }
    catch (error) {
        console.log(error);
    }
};


