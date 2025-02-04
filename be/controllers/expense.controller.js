import { logger } from "../logger.js";
import db from "../config/db.js";
import path from "path";
import fs from "fs";
import multer from "multer";
import _ from "lodash";
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
        const uniqueId = _.random(101, 99999);
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

        const { expensename, projid, projname, empid, currency, amount, recieptdate, combinationid, rmid } = req.body;
        const expenseid = `EXP-${empid}_${_.random(101, 9999)}`;
        const action = 0;
        const comment = 'In progress';
        const approvalstageid = 0;
        const raisedate = new Date().toISOString().split('T')[0];

        if (!req.files || req.files.length === 0) {
            return res.status(400).send({ error: "No files uploaded" });
        }

        const fileNames = req.files.map(file => file.filename);
        const filePaths = fileNames.map(name => `/${name}`);

        try {
            const sqlQuery = `
                INSERT INTO expense (expenseid, expensename, projid, projname, combinationid, empid, rmid, recieptdate, amount, currencyid, attachmentid, action, comment, approvalstageid, raisedate)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                expenseid,
                expensename,
                projid,
                projname,
                combinationid,
                empid,
                rmid,
                recieptdate,
                amount,
                parseInt(currency),
                JSON.stringify(filePaths),
                action,
                comment,
                approvalstageid,
                raisedate
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

export const saveExpense = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            logger.error("File upload error: " + err.message);
            return res.status(500).send({ error: "File upload failed" });
        }

        const { expensename, projid, projname, empid, currency, amount, recieptdate, combinationid, rmid } = req.body;
        const expenseid = `EXP-${empid}_${_.random(101, 9999)}`;
        const action = 3;
        const comment = 'Draft';
        const approvalstageid = 3;
        const raisedate = new Date().toISOString().split('T')[0];

        if (!req.files || req.files.length === 0) {
            return res.status(400).send({ error: "No files uploaded" });
        }

        const fileNames = req.files.map(file => file.filename);
        const filePaths = fileNames.map(name => `/${name}`);

        try {
            const sqlQuery = `
                INSERT INTO expense (expenseid, expensename, projid, projname, combinationid, empid, rmid, recieptdate, amount, currencyid, attachmentid, action, comment, approvalstageid, raisedate)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                expenseid,
                expensename,
                projid,
                projname,
                combinationid,
                empid,
                rmid,
                recieptdate,
                amount,
                parseInt(currency),
                JSON.stringify(filePaths),
                action,
                comment,
                approvalstageid,
                raisedate
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


export const updateExpense = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            logger.error("File upload error: " + err.message);
            return res.status(500).send({ error: "File upload failed" });
        }

        const { expenseid, expensename, projid, projname, combinationid, empid, rmid, recieptdate, amount, currency } = req.body;

        if (!expenseid) {
            return res.status(400).send({ error: "Expense ID is required" });
        }
        const action = 3;
        const comment = 'Draft';
        const approvalstageid = 3;
        const raisedate = new Date().toISOString().split('T')[0];
        const newFileNames = req.files?.map(file => file.filename) || [];
        const newFilePaths = newFileNames.map(name => `/${name}`);

        try {
            const updateQuery = `
                UPDATE expense 
                SET 
                    expensename = ?, 
                    projid = ?, 
                    projname = ?, 
                    combinationid = ?, 
                    empid = ?, 
                    rmid = ?, 
                    recieptdate = ?, 
                    amount = ?, 
                    currencyid = ?, 
                    attachmentid = ?, 
                    action = ?, 
                    comment = ?, 
                    approvalstageid = ?, 
                    raisedate = ?
                WHERE expenseid = ?
            `;

            const updateValues = [
                expensename,
                projid,
                projname,
                combinationid,
                empid,
                rmid,
                recieptdate,
                amount,
                parseInt(currency),
                JSON.stringify(newFilePaths),
                action,
                comment,
                approvalstageid,
                raisedate,
                expenseid,
            ];

            db.query(updateQuery, updateValues, (updateError, updateResults) => {
                if (updateError) {
                    logger.error("Database error: " + updateError.message);
                    return res.status(500).send({ error: "Failed to update expense data" });
                }

                if (updateResults.affectedRows === 0) {
                    return res.status(404).send({ error: "Expense not found" });
                }

                logger.success("Expense updated successfully");
                res.status(200).send({
                    message: "Expense updated successfully",
                    updatedAttachments: newFilePaths,
                });
            });
        } catch (error) {
            logger.error(error.message);
            res.status(500).send({ error: error.message });
        }
    });
};

export const submitSavedExpense = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            logger.error("File upload error: " + err.message);
            return res.status(500).send({ error: "File upload failed" });
        }

        const { expenseid, expensename, projid, projname, combinationid, empid, rmid, recieptdate, amount, currency } = req.body;

        if (!expenseid) {
            return res.status(400).send({ error: "Expense ID is required" });
        }
        const action = 0;
        const comment = 'In progress';
        const approvalstageid = 0;
        const raisedate = new Date().toISOString().split('T')[0];
        const newFileNames = req.files?.map(file => file.filename) || [];
        const newFilePaths = newFileNames.map(name => `/${name}`);

        try {
            const updateQuery = `
                UPDATE expense 
                SET 
                    expensename = ?, 
                    projid = ?, 
                    projname = ?, 
                    combinationid = ?, 
                    empid = ?, 
                    rmid = ?, 
                    recieptdate = ?, 
                    amount = ?, 
                    currencyid = ?, 
                    attachmentid = ?, 
                    action = ?, 
                    comment = ?, 
                    approvalstageid = ?, 
                    raisedate = ?
                WHERE expenseid = ?
            `;

            const updateValues = [
                expensename,
                projid,
                projname,
                combinationid,
                empid,
                rmid,
                recieptdate,
                amount,
                parseInt(currency),
                JSON.stringify(newFilePaths),
                action,
                comment,
                approvalstageid,
                raisedate,
                expenseid,
            ];

            db.query(updateQuery, updateValues, (updateError, updateResults) => {
                if (updateError) {
                    logger.error("Database error: " + updateError.message);
                    return res.status(500).send({ error: "Failed to update expense data" });
                }

                if (updateResults.affectedRows === 0) {
                    return res.status(404).send({ error: "Expense not found" });
                }

                logger.success("Expense updated successfully");
                res.status(200).send({
                    message: "Expense updated successfully",
                    updatedAttachments: newFilePaths,
                });
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

export const fetchDrafts = async (req, res) => {
    const { empid } = req.body;
    try {
        db.query('Select * from expense where empid = ? and action = 3', [empid], (err, results) => {
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

export const managerApprovals = async (req, res) => {
    const { empid } = req.body;
    try {
        db.query('Select * from expense where rmid = ? and approvalstageid = 0', [empid], (err, results) => {
            if (err) {
                logger.error('Error executing query: ', err.message);
                return res.status(500).send({ errormsg: 'Internal Server Error' });
            }
            logger.success();
            return res.status(200).send({ message: 'Fetched expenses approvals succesfully', results });
        })
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}

export const financeApprovals = async (req, res) => {
    try {
        db.query('Select * from expense where approvalstageid = 1', (err, results) => {
            if (err) {
                logger.error('Error executing query: ', err.message);
                return res.status(500).send({ errormsg: 'Internal Server Error' });
            }
            logger.success();
            return res.status(200).send({ message: 'Fetched expenses approvals succesfully', results });
        })
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}

export const fetchExpenseDetails = async (req, res) => {
    const { expenseid } = req.body;
    try {
        db.query('Select * from expense where expenseid = ?', [expenseid], (err, results) => {
            if (err) {
                logger.error('Error executing query: ', err.message);
                return res.status(500).send({ errormsg: 'Internal Server Error' });
            }
            logger.success();
            return res.status(200).send({ message: 'Fetched expense succesfully', results: results[0] });
        })
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}

export const approveExpense = async (req, res) => {
    const { expenseid, type, comment } = req.body;
    try {
        let approvalstageid, action;
        approvalstageid = type === 1 ? 1 : 2;
        action = type === 1 ? 0 : 1; 
        // type = 1 - by manager 
        // type = 2 - by Finance

        const query = `
                UPDATE expense 
                SET 
                    comment = ?,
                    action = ?,
                    approvalstageid = ?
                WHERE expenseid = ?
            `;

        const values = [
            comment,
            action,
            approvalstageid,
            expenseid
        ];

        db.query(query, values, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to approve expense" });
            }

            logger.success();
            res.status(200).send({
                message: "Expense approved successfully",
            });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}

export const rejectExpense = async (req, res) => {
    const { expenseid, comment } = req.body;
    try {
        const approvalstageid = -1;
        const action = 2; 
        // type = 1 - by manager 
        // type = 2 - by Finance

        const query = `
                UPDATE expense 
                SET 
                    comment = ?,
                    action = ?,
                    approvalstageid = ?
                WHERE expenseid = ?
            `;

        const values = [
            comment,
            action,
            approvalstageid,
            expenseid
        ];

        db.query(query, values, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to reject expense" });
            }

            logger.success();
            res.status(200).send({
                message: "Expense Rejected successfully",
            });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}