import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import DashboardTile from './DashboardTile';
import { currencies } from '../utils';

const DashboardTilesGrid = ({ data }) => {
  const [approved, setapproved] = useState(0);
  const [inprogress, setinprogress] = useState(0);
  const [rejected, setrejected] = useState(0);
  const [claimed, setclaimed] = useState(0);
  const [drafts, setdrafts] = useState(0);

  useEffect(() => {
    setapproved(data?.reduce((sum, item) => {
      if (item?.action === 1) {
        return sum + 1;
      }
      return sum;
    }, 0));
    setinprogress(data?.reduce((sum, item) => {
      if (item?.action === 0) {
        return sum + 1;
      }
      return sum;
    }, 0));
    setrejected(data?.reduce((sum, item) => {
      if (item?.action === 2) {
        return sum + 1;
      }
      return sum;
    }, 0));
    setclaimed(data?.reduce((sum, item) => {
      if (item?.approvalstageid === 2) {
        return sum + item?.amount * currencies.find(i => i.id === item?.currencyid)?.exchangeRate
      }
      return sum;
    }, 0));
    setdrafts(data?.reduce((sum, item) => {
      if (item?.action === 3) {
        return sum + 1
      }
      return sum;
    }, 0));
  }, [data])

  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <DashboardTile type={1} data={approved} />
      </Grid>
      <Grid size={4}>
        <DashboardTile type={2} data={inprogress} />
      </Grid>
      <Grid size={4}>
        <DashboardTile type={3} data={rejected} />
      </Grid>
      <Grid size={5}>
        <DashboardTile type={4} data={claimed} currency={'INR'} />
      </Grid>
      <Grid size={3}>
        <DashboardTile type={5} data={drafts} />
      </Grid>
      <Grid size={4}>
        <DashboardTile type={6} data={96} />
      </Grid>
    </Grid>
  )
}

export default DashboardTilesGrid