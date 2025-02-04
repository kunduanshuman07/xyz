import { logger } from "../logger.js"
import db from "../config/db.js"

export const getAllEpics = async (req, res) => {
    try {
        const sqlQuery = `
            Select * from epics where projid = ?
        `;
        const values = [
            'P001'
        ]

        db.query(sqlQuery, values, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to fetch Epic" });
            }

            logger.success();
            res.status(200).send({ message: "Epics fetched successfully", results });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}

export const createEpic = async (req, res) => {
    const { epicname } = req.body;
    try {
        const sqlQuery = `
            INSERT into epics (projid, epicname, created)
            VALUES (?, ?, ?)
        `;
        const values = [
            'P001',
            epicname,
            new Date().toISOString().split('T')[0]
        ]

        db.query(sqlQuery, values, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to create Epic" });
            }

            logger.success();
            res.status(200).send({ message: "Epic created successfully" });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}