import { logger } from "../logger.js";
import db from "../config/db.js";
import path from "path";
import fs from "fs";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const publicDir = path.join(process.cwd(), "public");
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, publicDir);
    },
    filename: (req, file, cb) => {
        const { empid } = req.body;
        const uniqueId = uuidv4();
        cb(null, `${empid}_${uniqueId}_${file.originalname}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
}).array("files", 10);

export const submitExpense = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            logger.error("File upload error: " + err.message);
            return res.status(500).send({ error: "File upload failed" });
        }

        const { expensename, projid, projname, empid, currency, amount, recieptdate, combinationid } = req.body;
        const expenseid = uuidv4();
        const action = 0;
        const comment = 'In progress';
        const approvalstageid = 0;

        if (!req.files || req.files.length === 0) {
            return res.status(400).send({ error: "No files uploaded" });
        }

        const fileNames = req.files.map(file => file.filename);
        const filePaths = fileNames.map(name => `/${name}`);

        try {
            const sqlQuery = `
                INSERT INTO expense (expenseid, expensename, projid, projname, combinationid, empid, recieptdate, amount, currencyid, attachmentid, action, comment, approvalstageid)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                expenseid,
                expensename,
                projid,
                projname,
                combinationid,
                empid,
                recieptdate,
                amount,
                parseInt(currency),
                JSON.stringify(filePaths),
                action,
                comment,
                approvalstageid
            ];

            db.query(sqlQuery, values, (error, results) => {
                if (error) {
                    logger.error("Database error: " + error.message);
                    return res.status(500).send({ error: "Failed to save expense data" });
                }

                logger.success();
                res.status(200).send({ message: "Expense submitted successfully" });
            });
        } catch (error) {
            logger.error(error.message);
            res.status(500).send({ error: error.message });
        }
    });
};


export const getExpenseTaxonomy = async (req, res) => {
    try {
        db.query('Select * from expensetaxonomy', (err, results) => {
            if (err) {
                logger.error('Error executing query: ', err.message);
                return res.status(500).send({ errormsg: 'Internal Server Error' });
            }
            logger.success();
            return res.status(200).send({ results });
        })
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}

export const fetchExpenses = async (req, res) => {
    const { empid } = req.body;
    try {
        db.query('Select * from expense where empid = ?', [empid], (err, results) => {
            if (err) {
                logger.error('Error executing query: ', err.message);
                return res.status(500).send({ errormsg: 'Internal Server Error' });
            }
            logger.success();
            return res.status(200).send({ message: 'Fetched expenses succesfully', results });
        })
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}