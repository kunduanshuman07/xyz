import { logger } from "../logger.js"
import db from "../config/db.js"


export const getAllIssues = async (req, res) => {
    try {
        const sqlQuery = `
            Select * from issues where projid = ?
        `;
        const values = [
            'P001'
        ]

        db.query(sqlQuery, values, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to fetch Issues" });
            }

            logger.success();
            res.status(200).send({ message: "Issues fetched successfully", results });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}

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
                return res.status(500).send({ error: "Failed to fetch Epics" });
            }

            logger.success();
            res.status(200).send({ message: "Epics fetched successfully", results });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}

export const getAllSprints = async (req, res) => {
    try {
        const sqlQuery = `
            Select * from sprints where projid = ?
        `;
        const values = [
            'P001'
        ]

        db.query(sqlQuery, values, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to fetch Sprints" });
            }

            logger.success();
            res.status(200).send({ message: "Sprints fetched successfully", results });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}

export const getAllIssueStatuses = async (req, res) => {
    try {
        const sqlQuery = `
            Select status, count(status) as count from issues where projid = ? group by status
        `;
        const values = [
            'P001'
        ]

        db.query(sqlQuery, values, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to fetch Issue statuses" });
            }

            logger.success();
            res.status(200).send({ message: "Issue statuses fetched successfully", results });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}

export const getAllIssuePriorities = async (req, res) => {
    try {
        const sqlQuery = `
            Select priority, count(priority) as count from issues where projid = ? group by priority
        `;
        const values = [
            'P001'
        ]

        db.query(sqlQuery, values, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to fetch Issue priorities" });
            }

            logger.success();
            res.status(200).send({ message: "Issue priorities fetched successfully", results });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}

export const getActiveSprintProgress = async (req, res) => {
    try {
        const sqlQuery = `
            Select status, count(status) as count from issues where sprintid = (select id from sprints where status = 1) and projid = ? group by status
        `;
        const values = [
            'P001'
        ]

        db.query(sqlQuery, values, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to fetch Active Sprint progress " });
            }

            logger.success();
            res.status(200).send({ message: "Active Sprint progress fetched successfully", results });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}

export const getAssigneeVSIssues = async (req, res) => {
    try {
        const sqlQuery = `
            Select empid, count(empid) as count from issues where projid = ? group by empid
        `;
        const values = [
            'P001'
        ]

        db.query(sqlQuery, values, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to fetch Assignee vs Issues" });
            }

            logger.success();
            res.status(200).send({ message: "Assignee vs Issues fetched successfully", results });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}