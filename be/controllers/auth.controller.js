import { logger } from "../logger.js"
import db from "../config/db.js"

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        db.query('Select * from employeemaster where email = ?', [email], (err, results) => {
            if (err) {
                logger.error('Error executing query: ', err.message);
                return res.status(500).send({ errormsg: 'Internal Server Error' });
            }
            if (results.length === 0) {
                logger.error('No user exists with the provided email');
                return res.status(201).send({ errormsg: 'No user exists with the provided email' });
            }
            const user = results[0];
            if (password !== "apbiak07") {
                logger.error('Invalid password');
                return res.status(201).send({ errormsg: 'Invalid password' });
            }
            logger.success();
            return res.status(200).send({ message: 'User signed in successfully', user });
        })
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}