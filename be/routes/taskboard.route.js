import Express from "express";
import { addComment, createEpic, createNewIssue, createNewIssueWithSprint, createNewSprint, fetchComments, fetchRunningSprintTasks, getAllAssignees, getAllEpics, getAllIssues, getAllSprints, updateIssue, updateIssuesBulk } from "../controllers/taskboard.controller.js";

const router = Express.Router();

router.post('/create-epic', createEpic);
router.get('/get-epics', getAllEpics);
router.post('/create-issue', createNewIssue);
router.post('/create-issue-wsprint', createNewIssueWithSprint);
router.get('/get-issues', getAllIssues);
router.get('/get-assignees', getAllAssignees);
router.get('/get-sprints', getAllSprints);
router.post('/fetch-comments', fetchComments);
router.post('/update-issue', updateIssue);
router.post('/update-issues-bulk', updateIssuesBulk);
router.post('/create-sprint', createNewSprint);
router.post('/add-comment', addComment);
router.get('/active-sprint-tasks', fetchRunningSprintTasks);


export default router;