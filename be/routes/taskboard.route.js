import Express from "express";
import { addComment, createEpic, createNewIssue, createNewIssueWithSprint, createNewSprint, deleteComment, editComment, endSprint, fetchComments, fetchRunningSprintTasks, getAllAssignees, getAllEpics, getAllIssues, getAllSprints, startSprint, updateIssue, updateIssuesBulk } from "../controllers/taskboard.controller.js";

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
router.post('/delete-comment', deleteComment);
router.post('/edit-comment', editComment);
router.get('/active-sprint-tasks', fetchRunningSprintTasks);
router.post('/start-sprint', startSprint);
router.post('/end-sprint', endSprint);


export default router;