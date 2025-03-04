import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "./useApiCall"; 

const useTaskboardData = () => {
    const [sprintArray, setsprintArray] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [issues, setIssues] = useState([]);
    const [sprints, setSprints] = useState([]);
    const [sprintLabels, setSprintLabels] = useState({});
    const [epics, setEpics] = useState([]);
    const [epicLabels, setEpicLabels] = useState({});
    const [assignees, setAssignees] = useState([]);
    const [assigneeLabels, setAssigneeLabels] = useState({});
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const fetchActiveSprintTasks = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance({
                url: "/taskboard/active-sprint-tasks",
                method: "GET",
            })
            setTasks(response?.data?.results);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    // Fetch Issues
    const fetchIssues = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/taskboard/get-issues");
            setIssues(response?.data?.results || []);
        } catch (error) {
            console.error("Error fetching issues:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch Epics
    const fetchEpics = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/taskboard/get-epics");
            const formattedData = response?.data?.results?.reduce((acc, result) => {
                acc[result.id] = result.epicname;
                return acc;
            }, {});
            const epicData = response?.data?.results?.map(result => ({
                id: result.id,
                label: result.epicname
            }));
            setEpicLabels(formattedData);
            setEpics(epicData);
        } catch (error) {
            console.error("Error fetching epics:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch Assignees
    const fetchAssignees = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/taskboard/get-assignees");
            const formattedData = response?.data?.results?.reduce((acc, result) => {
                acc[result.empid] = result.empname;
                return acc;
            }, {});
            const assigneeData = response?.data?.results?.map(result => ({
                id: result.empid,
                label: result.empname
            }));
            setAssigneeLabels(formattedData);
            setAssignees(assigneeData);
        } catch (error) {
            console.error("Error fetching assignees:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch Sprints
    const fetchSprints = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/taskboard/get-sprints");
            const formattedData = response?.data?.results?.reduce((acc, result) => {
                acc[result.id] = result.sprintname;
                return acc;
            }, {});
            const sprintData = response?.data?.results?.map(result => ({
                id: result.id,
                label: result.sprintname
            }));
            setSprintLabels(formattedData);
            setSprints(response?.data?.results);
            setsprintArray(sprintData);
        } catch (error) {
            console.error("Error fetching sprints:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch All Data at Once
    const fetchAllData = useCallback(async () => {
        setLoading(true);
        await Promise.all([fetchActiveSprintTasks(), fetchIssues(), fetchEpics(), fetchAssignees(), fetchSprints()]);
        setLoading(false);
    }, [fetchIssues, fetchEpics, fetchAssignees, fetchSprints]);

    // Update Issue
    const updateIssue = async ({ key, value, issueid }) => {
        setLoading(true);
        try {
            await axiosInstance.post("/taskboard/update-issue", { key, value, issueid });
            await fetchIssues();
            await fetchActiveSprintTasks();
        } catch (error) {
            console.error("Error updating issue:", error);
        } finally {
            setLoading(false);
        }
    };

    // Create Issue
    const createIssue = async ({ issuename, relversion, priority, sprintid }) => {
        setLoading(true);
        try {
            await axiosInstance.post("/taskboard/create-issue-wsprint", {
                issuename,
                relversion,
                priority,
                sprintid,
            });
            await fetchIssues();
        } catch (error) {
            console.error("Error creating issue:", error);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    return {
        tasks,
        issues,
        sprints,
        setSprints,
        sprintLabels,
        sprintArray,
        epics,
        epicLabels,
        assignees,
        assigneeLabels,
        loading,
        setLoading,
        open,
        setOpen,
        fetchActiveSprintTasks,
        fetchIssues,
        fetchEpics,
        fetchAssignees,
        fetchSprints,
        fetchAllData,
        updateIssue,
        createIssue,
    };
};

export default useTaskboardData;
