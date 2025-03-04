import { Box } from '@mui/material'
import React from 'react'
import AssigneeFilterSelect from "./AssigneeFilterSelect";
import SetupFilters from './SetupFilters';
import EpicFiltersComp from './EpicFiltersComp';
import SprintFiltersComp from './SprintFiltersComp';
const IssuePageFilter = () => {
  return (
    <Box display={'flex'}>
      <AssigneeFilterSelect />
      <SetupFilters/>
      <EpicFiltersComp/>
      <SprintFiltersComp/>
    </Box>
  )
}

export default IssuePageFilter