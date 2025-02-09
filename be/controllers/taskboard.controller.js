import { logger } from "../logger.js"
import db from "../config/db.js"


export const getAllAssignees = async (req, res) => {
    try {
        const sqlQuery = `
            Select * from employeemaster where projid = ?
        `;
        const values = [
            'P001'
        ]

        db.query(sqlQuery, values, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to fetch Assignees" });
            }

            logger.success();
            res.status(200).send({ message: "Assignees fetched successfully", results });
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

export const getAllIssues = async (req, res) => {
    try {
        const sqlQuery = `
            select a.*, e.empname, ep.epicname, sp.sprintname
            from issues a 
            left join employeemaster e on a.empid = e.empid
            left join epics ep on a.epicid = ep.id
            left join sprints sp on a.sprintid = sp.id
            where a.projid = ?;
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

export const createNewIssue = async (req, res) => {
    const { issuename, relversion, priority } = req.body;
    try {
        const sqlQuery = `
            INSERT into issues (projid, issuename, created, relversion, priority, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [
            'P001',
            issuename,
            new Date().toISOString().split('T')[0],
            relversion,
            priority,
            0
        ]

        db.query(sqlQuery, values, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to create Issue" });
            }
            logger.success();
            res.status(200).send({ message: "Issue created successfully" });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}

export const createNewIssueWithSprint = async (req, res) => {
    const { issuename, relversion, priority, sprintid } = req.body;
    try {
        const sqlQuery = `
            INSERT into issues (projid, issuename, created, relversion, priority, status, sprintid)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            'P001',
            issuename,
            new Date().toISOString().split('T')[0],
            relversion,
            priority,
            0,
            sprintid
        ]

        db.query(sqlQuery, values, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to create Issue" });
            }
            logger.success();
            res.status(200).send({ message: "Issue created successfully" });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}

export const updateIssue = async (req, res) => {
    const { key, value, issueid } = req.body;
    try {
        const sqlQuery = `
           UPDATE issues set ?? = ? where id = ?
        `;
        const values = [
            key,
            value,
            issueid
        ]

        db.query(sqlQuery, values, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to update Issue" });
            }

            logger.success();
            res.status(200).send({ message: "Issue updated successfully" });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}


export const createNewSprint = async (req, res) => {
    const { sprintname, startdate, enddate, issuelist } = req.body;
    const issueIds = issuelist?.map((issue, index) => {
        return issue.id;
    })
    try {
        const insertSprintQuery = `
        INSERT INTO sprints (projid, sprintname, startdate, enddate, status)
        VALUES (?, ?, ?, ?, ?)
      `;
        const sprintValues = ['P001', sprintname, startdate, enddate, 2];

        db.query(insertSprintQuery, sprintValues, (insertError, insertResults) => {
            if (insertError) {
                logger.error("Database error: " + insertError.message);
                return res.status(500).send({ error: "Failed to create Sprint" });
            }

            const newSprintId = insertResults.insertId;

            if (issuelist && issuelist.length > 0) {
                const updateIssuesQuery = `
            UPDATE issues
            SET sprintid = ?
            WHERE id IN (?)
          `;

                db.query(updateIssuesQuery, [newSprintId, issueIds], (updateError, updateResults) => {
                    if (updateError) {
                        logger.error("Error updating issues: " + updateError.message);
                        return res.status(500).send({ error: "Failed to update issues" });
                    }

                    logger.success("Sprint and related issues updated successfully.");
                    res.status(200).send({
                        message: "Sprint created and issues updated successfully",
                        sprintId: newSprintId,
                    });
                });
            } else {
                logger.success("Sprint created without issue updates.");
                res.status(200).send({
                    message: "Sprint created successfully without any issue updates",
                    sprintId: newSprintId,
                });
            }
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
};

export const getAllSprints = async (req, res) => {
    try {
        const sqlQuery = `
            select * from sprints where projid = ? order by field(status, 1, 2, 0)
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

export const updateIssuesBulk = async (req, res) => {
    const { updates, issueids } = req.body;

    if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).send({ error: "No updates provided" });
    }

    try {
        const setClause = Object.keys(updates)
            .map((key) => `${key} = ?`)
            .join(", ");

        const values = [...Object.values(updates), issueids];

        const sqlQuery = `
        UPDATE issues
        SET ${setClause}
        WHERE id IN (?)
      `;

        db.query(sqlQuery, values, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to update Issues" });
            }

            logger.success();
            res.status(200).send({ message: "Issues updated successfully" });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
};


export const fetchRunningSprintTasks = async (req, res) => {
    try {
        const sqlQuery = `
            select a.*, e.empname, ep.epicname
            from (select b.* 
            from sprints a
            join issues b
            on a.id = b.sprintid
            where a.status=1) a 
            left join employeemaster e on a.empid = e.empid
            left join epics ep on a.epicid = ep.id
            where a.projid = 'P001'
        `;

        db.query(sqlQuery, (error, results) => {
            if (error) {
                logger.error("Database error: " + error.message);
                return res.status(500).send({ error: "Failed to fetch tasks" });
            }

            logger.success();
            res.status(200).send({ message: "Tasks fetched successfully", results });
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send(error.message);
    }
}

export const addComment = async (req, res) => {
    const { empid, empname, comment, issueid } = req.body;
    const date = new Date().toISOString();
    const newComment = { empid, empname, comment, date };

    try {
        const selectQuery = `SELECT comments FROM issues WHERE id = ?`;
        db.query(selectQuery, [issueid], (selectError, results) => {
            if (selectError) {
                return res.status(500).send({ error: "Failed to fetch comments" });
            }

            let comments = [];
            const dbComments = results[0]?.comments;

            // Handle different types of storage (string vs JSON object)
            if (dbComments) {
                try {
                    comments = typeof dbComments === "string" ? JSON.parse(dbComments) : dbComments;
                } catch (parseError) {
                    return res.status(500).send({ error: "Corrupted comment data" });
                }
            }

            comments.push(newComment);

            const updateQuery = `UPDATE issues SET comments = ? WHERE id = ?`;
            db.query(updateQuery, [JSON.stringify(comments), issueid], (updateError) => {
                if (updateError) {
                    return res.status(500).send({ error: "Failed to update comments" });
                }
                res.status(200).send({ message: "Comment added successfully" });
            });
        });
    } catch (error) {
        console.error("Unexpected Error:", error);
        res.status(500).send({ error: "An error occurred" });
    }
};





export const fetchComments = async (req, res) => {
    const { issueid } = req.body;

    try {
        const sqlQuery = `SELECT comments FROM issues WHERE id = ?`;
        db.query(sqlQuery, [issueid], (error, results) => {
            if (error) {
                return res.status(500).send({ error: "Failed to fetch comments" });
            }

            let comments = [];
            const dbComments = results[0]?.comments;

            // Handle string or object JSON storage
            if (dbComments) {
                try {
                    comments = typeof dbComments === "string" ? JSON.parse(dbComments) : dbComments;
                } catch (parseError) {
                    return res.status(500).send({ error: "Corrupted comments data" });
                }
            }

            res.status(200).send(comments);
        });
    } catch (error) {
        console.error("Unexpected Error:", error);
        res.status(500).send({ error: "An unexpected error occurred" });
    }
};
