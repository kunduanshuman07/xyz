import Express from "express";
import { getActiveSprintProgress, getAllEpics, getAllIssuePriorities, getAllIssues, getAllIssueStatuses, getAllSprints, getAssigneeVSIssues } from "../controllers/taskboardoverview.controller.js";

const router = Express.Router();

router.get('/issues-count', getAllIssues);
router.get('/epics-count', getAllEpics);
router.get('/sprints-count', getAllSprints);
router.get('/issue-statuses', getAllIssueStatuses);
router.get('/issue-priorities', getAllIssuePriorities);
router.get('/active-sprint', getActiveSprintProgress);
router.get('/assignee-issues', getAssigneeVSIssues);

export default router;