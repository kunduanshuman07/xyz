import React, { useEffect, useState } from 'react'
import { Box, Button, Card, IconButton, TextareaAutosize, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { buttons, tabs, text } from '../../theme';
import DownloadIcon from '@mui/icons-material/Download';
import { axiosInstance } from '../../hooks/useApiCall';
import { action, approvalstages, currencies } from '../utils';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EditIcon from "@mui/icons-material/EditAttributes"
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useNavigate, useParams } from 'react-router-dom';
import LeftArrowIcon from "@mui/icons-material/ArrowBackIos";

const ExpenseViewDialog = () => {
  const baseURL = process.env.REACT_APP_ATTACHMENT_URL;
  const { id } = useParams();
  const [a, b, c] = id.split('+');
  const [data, setdata] = useState([]);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);
  const [comment, setcomment] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchExpenseDetails = async () => {
      setloading(true);
      try {
        const response = await axiosInstance({
          url: '/expense/fetch-expense-details',
          method: 'POST',
          data: { expenseid: a }
        });
        setdata(response?.data?.results);
      } catch (err) {
        seterror(err);
      } finally {
        setloading(false);
      }
    }

    fetchExpenseDetails();

  }, [a]);
  const handleApprove = async () => {
    setloading(true);
    try {
      await axiosInstance({
        url: '/expense/approve-expense',
        method: 'POST',
        data: { expenseid: a, type: parseInt(c), comment: comment }
      });
      navigate('/expense/approvals')
    } catch (err) {
      seterror(err);
    } finally {
      setloading(false);
    }
  }
  const handleReject = async () => {
    if (comment === '') {
      alert('Add some comments before rejection!');
      return;
    }
    setloading(true);
    try {
      await axiosInstance({
        url: '/expense/reject-expense',
        method: 'POST',
        data: { expenseid: a, type: 1, comment: comment }
      });
      navigate('/expense/approvals')
    } catch (err) {
      seterror(err);
    } finally {
      setloading(false);
    }
  }

  const handleEditExpense = () => {
    const serializedItem = encodeURIComponent(JSON.stringify(data));
    navigate(`/expense/create?data=${serializedItem}`);
  }

  return (
    <Box display={'flex'} flexDirection={'column'} sx={{
      boxShadow: "0 0px 8px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
      padding: "10px 20px 20px 20px",
      marginTop: "10px"
    }}>
      <Box display={'flex'} flexDirection={'column'}>
        <IconButton size='small' sx={{ marginRight: "auto" }} onClick={() => navigate(`/expense/${b}`)}>
          <LeftArrowIcon sx={{ fontSize: "16px", color: buttons.background }} />
        </IconButton>
        <Typography sx={{ fontFamily: "Montserrat", fontSize: "15px", margin: b === 'overview' ? "30px 0px 10px 0px" : "10px 0px 10px 0px", fontWeight: "bold", color: text.primary }}>Details</Typography>
        <Grid container spacing={2} sx={{ paddingX: "10px" }}>
          <Grid size={3} display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", fontWeight: "bold", color: 'gray' }}>Employee Id</Typography>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: text.primary }}>{data?.empid}</Typography>
          </Grid>
          <Grid size={3} display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", fontWeight: "bold", color: 'gray' }}>Employee Name</Typography>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: text.primary }}>Anshuman Kundu</Typography>
          </Grid>
          <Grid size={3} display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", fontWeight: "bold", color: 'gray' }}>Project</Typography>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: text.primary }}>{data?.projid}-{data?.projname}</Typography>
          </Grid>
          <Grid size={3} display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", fontWeight: "bold", color: 'gray' }}>Expense Name</Typography>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: text.primary }}>{data?.expensename}</Typography>
          </Grid>
          <Grid size={3} display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", fontWeight: "bold", color: 'gray' }}>Expense Date</Typography>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: text.primary }}>{new Date(data?.raisedate).toLocaleDateString()}</Typography>
          </Grid>
          <Grid size={3} display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", fontWeight: "bold", color: 'gray' }}>Purpose</Typography>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: text.primary }}>Anshuman Kundu</Typography>
          </Grid>
          <Grid size={3} display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", fontWeight: "bold", color: 'gray' }}>Category</Typography>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: text.primary }}>Anshuman Kundu</Typography>
          </Grid>
          <Grid size={3} display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", fontWeight: "bold", color: 'gray' }}>Reciept Date</Typography>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: text.primary }}>{new Date(data?.recieptdate).toLocaleDateString()}</Typography>
          </Grid>
          <Grid size={3} display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", fontWeight: "bold", color: 'gray' }}>Amount</Typography>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: text.primary }}>{`${currencies?.find(i => i.id === data?.currencyid)?.currency} ${data?.amount}`}</Typography>
          </Grid>
          <Grid size={3} display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", fontWeight: "bold", color: 'gray' }}>Status</Typography>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: text.primary }}>{`${action?.find(i => i.id === data?.action)?.label}`}</Typography>
          </Grid>
          <Grid size={3} display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", fontWeight: "bold", color: 'gray' }}>Last action Comments</Typography>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: text.primary }}>{data?.comment}</Typography>
          </Grid>
          <Grid size={3} display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "12px", fontWeight: "bold", color: 'gray' }}>Approval Stage</Typography>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: text.primary }}>{`${approvalstages.find(i => i.id === data?.approvalstageid)?.label}`}</Typography>
          </Grid>
        </Grid>
        <Typography sx={{ fontFamily: "Montserrat", fontSize: "15px", marginTop: "20px", fontWeight: "bold", color: text.primary }}>Attachments (click to download)</Typography>
        <Grid container spacing={2} sx={{ marginTop: "10px" }}>
          {data?.attachmentid?.map((url, index) => (
            <Grid size={1} key={index} display={'flex'}>
              <Card
                sx={{
                  position: "relative",
                  width: 100,
                  display: "flex",
                  height: 100,
                  margin: "auto",
                  borderRadius: "10px",
                  overflow: "hidden",
                  cursor: "pointer",
                  "&:hover .overlay": {
                    opacity: 1,
                  },
                }}
              >
                <Box
                  component="img"
                  src={`${baseURL}${url}`}
                  sx={{
                    width: "90%",
                    height: "90%",
                    objectFit: "cover",
                    margin: "auto",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      filter: "brightness(50%)",
                    },
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "10px",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <DownloadIcon
                    sx={{
                      color: "white",
                      fontSize: 30,
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        {b === 'approvals' ?
          <>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: "15px", marginTop: "20px", fontWeight: "bold", color: text.primary }}>Actions</Typography>
            <Grid container spacing={2} sx={{ marginTop: "10px" }}>
              <Grid size={6} display={'flex'}>
                <TextareaAutosize
                  placeholder="Add Comments"
                  value={comment}
                  onChange={(e) => setcomment(e.target.value)}
                  style={{
                    width: "600px",
                    height: "70px",
                    border: `1px solid ${text.secondary}`,
                    padding: "10px",
                    fontFamily: "Montserrat",
                    marginY: "auto",
                    borderRadius: "5px",
                    boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </Grid>
              <Grid size={4} sx={{ display: "flex", flexDirection: "column" }}>
                <Button variant='contained' sx={{ textTransform: "none", borderRadius: "8px", bgcolor: '#01c37b', boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", margin: "auto 0px", width: "140px" }} startIcon={<DoneAllIcon />} onClick={handleApprove}>
                  Approve
                </Button>
                <Button variant='contained' sx={{ textTransform: "none", borderRadius: "8px", bgcolor: '#cd0502', boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", margin: "auto 0px", width: "140px" }} startIcon={<ThumbDownAltIcon />} onClick={handleReject}>
                  Reject
                </Button>
              </Grid>
            </Grid>
          </>
          :
          data?.approvalstageid !== 2 && <Grid container spacing={2} sx={{ margin: "30px 0px" }}>
            <Grid size={4} sx={{ display: "flex", flexDirection: "column" }}>
              <Button variant='contained' sx={{ textTransform: "none", borderRadius: "8px", bgcolor: tabs.active, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", margin: "auto 0px", width: "200px" }} startIcon={<EditIcon />} onClick={handleEditExpense}>
                Edit Expense
              </Button>
            </Grid>
          </Grid>
        }
      </Box>
    </Box>
  )
}

export default ExpenseViewDialog