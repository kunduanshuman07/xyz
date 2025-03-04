import { createContext, useContext, useState } from "react"


const AssigneeFilterContext = createContext();

export const AssigneeFilterProvider = ({ children }) => {
    const [personName, setPersonName] = useState([]);
    const [search, setSearch] = useState();
    const [statusFilters, setStatusFilters] = useState([]);
    const [epicFilters, setEpicFilters] = useState([]);
    const [sprintFilters, setSprintFilters] = useState([]);
    return (
        <AssigneeFilterContext.Provider value={{ personName, search, setPersonName, setSearch, epicFilters, setEpicFilters, sprintFilters, setSprintFilters, statusFilters, setStatusFilters }}>
           {children}
        </AssigneeFilterContext.Provider>
    )
}

export const useAssigneeFilter = () => {
    const context = useContext(AssigneeFilterContext);
    return context;
}