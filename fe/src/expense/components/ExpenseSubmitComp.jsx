import React, { useRef, useState } from 'react'
import { Alert, Backdrop, Box, Button, Checkbox, CircularProgress, MenuItem, Snackbar, TextField, Typography } from '@mui/material'
import { buttons, tabs, text } from '../../theme'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PublishIcon from '@mui/icons-material/Publish';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Grid from "@mui/material/Grid2"
import { currencies } from "../utils"
import { axiosInstance } from '../../hooks/useApiCall';
import { useNavigate } from 'react-router-dom';

const ExpenseSubmitComp = ({ data }) => {
    const user = JSON.parse(localStorage.getItem("User"));
    const fileInputRef = useRef(null);
    const [declaration, setdeclaration] = useState(false);
    const [files, setFiles] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [snackmsg, setsnackmsg] = useState('');
    const [fieldErrors, setFieldErrors] = useState({
        purpose: '',
        category: '',
        expensename: '',
        currency: '',
        amount: '',
        recieptdate: '',
        files: '',
    });
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        purpose: '',
        category: '',
        expensename: '',
        project: `${user.projid}-${user.projname}` || '',
        projid: `${user.projid}`,
        projname: `${user.projname}`,
        currency: '',
        amount: '',
        recieptdate: '',
        empid: `${user.empid}`
    });
    const uniquePurposes = [...new Set(data?.map((item) => item.purposeid))]
        .map((purposeid) => data.find((item) => item.purposeid === purposeid));

    const filteredCategories = data?.filter((item) => item.purposeid === formData.purpose);

    const fields = [
        { id: 'purpose', label: 'Purpose', type: 'select', options: uniquePurposes, optionLabel: 'purposename', optionValue: 'purposeid', size: 4 },
        { id: 'category', label: 'Category', type: 'select', options: filteredCategories, optionLabel: 'categoryname', optionValue: 'categoryid', size: 4 },
        { id: 'expensename', label: 'Expense Name', type: 'text', size: 4 },
        { id: 'project', label: 'Project', type: 'text', disabled: true, size: 4 },
        { id: 'currency', label: 'Currency', type: 'select', options: currencies, optionLabel: 'currency', optionValue: 'id', size: 2 },
        { id: 'amount', label: 'Amount', type: 'text', size: 3 },
        { id: 'recieptdate', label: 'Receipt Date', type: 'date', size: 3 },
    ];

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
        console.log(files.FileList)
    }
    

    const handleValidation = () => {
        let isValid = true;
        const errors = { ...fieldErrors };

        for (const key in errors) {
            errors[key] = '';
        }

        if (!formData.purpose) {
            isValid = false;
            errors.purpose = 'Purpose is required';
        }
        if (!formData.category) {
            isValid = false;
            errors.category = 'Category is required';
        }
        if (!formData.expensename) {
            isValid = false;
            errors.expensename = 'Expense Name is required';
        }
        if (!formData.currency) {
            isValid = false;
            errors.currency = 'Currency is required';
        }
        if (!formData.amount) {
            isValid = false;
            errors.amount = 'Amount is required';
        }
        if (!formData.recieptdate) {
            isValid = false;
            errors.recieptdate = 'Receipt Date is required';
        }

        if (files.length === 0) {
            isValid = false;
            errors.files = 'Add payment proofs in attachments'
        }

        setFieldErrors(errors);

        return isValid;
    };

    const handleSubmitExpense = async () => {
        if (!handleValidation()) {
            return;
        }
        setloading(true);
        seterror(false);
        setsnackmsg('');
        const finalFormData = new FormData();
        const row = data?.find(item => item.categoryid === formData.category && item.purposeid === formData.purpose);
        const combinationid = row?.combinationid;

        for (const key in formData) {
            finalFormData.append(key, formData[key]);
        }

        for (let i = 0; i < files.length; i++) {
            finalFormData.append('files', files[i]);
        }

        finalFormData.append('combinationid', combinationid);

        try {
            const response = await axiosInstance({
                url: '/expense/submit-expense',
                method: 'POST',
                data: finalFormData
            });
            if (response?.status === 200) {
                navigate('/expense/overview');
            }
            else {
                setsnackmsg('Error submitting expense');
            }
        } catch (error) {
            seterror(true);
            setsnackmsg(error.message);
        } finally {
            setloading(false);
        }

    }

    return (
        <>
            {fields.map((field, index) => (
                <Grid size={field.size} key={index}>
                    <TextField
                        placeholder={field.label}
                        label={field.label}
                        fullWidth
                        required
                        size="small"
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        sx={{
                            ".css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root": {
                                fontSize: "0.8rem",
                                fontFamily: "Montserrat",
                            },
                            ".css-1kfabtt-MuiFormLabel-root-MuiInputLabel-root": {
                                fontSize: "0.8rem"
                            },
                            fontSize: "0.8rem"
                        }}
                        select={field.type === 'select'}
                        disabled={field.disabled}
                        type={field.type === 'date' ? 'date' : 'text'}
                        slotProps={{ inputLabel: { shrink: field.type === 'date' ? true : undefined } }}
                        error={!!fieldErrors[field.id]}
                        helperText={fieldErrors[field.id]}
                    >
                        {field.type === 'select' &&
                            field.options?.map((option, i) => (
                                <MenuItem key={i} value={option[field.optionValue]} sx={{ fontSize: "0.8rem", fontFamily: "Montserrat" }}>
                                    {option[field.optionLabel]}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </Grid>
            ))}
            <Grid size={12}>
                <Box display={'flex'} flexDirection={'column'} bgcolor={text.secondary} height={'150px'} borderRadius={'10px'} paddingX={'10px'} sx={{ cursor: "pointer" }} onClick={() => fileInputRef.current.click()}>
                    <Typography sx={{ fontFamily: "Montserrat", color: text.primary, margin: "20px auto", fontWeight: "bold" }}>Upload Attachment</Typography>
                    <CloudUploadIcon sx={{ marginX: "auto", color: tabs.backgroundm, fontSize: "36px" }} />
                    <Typography sx={{ color: buttons.background, fontSize: "12px", fontWeight: "bold", margin: "10px auto", fontFamily: "Montserrat" }}>Supported formats : .xlxs, pdf, png</Typography>
                </Box>
            </Grid>
            <input type="file" multiple onChange={handleFileChange} hidden ref={fileInputRef} />
            <Grid size={12} display={'flex'}>
                {fieldErrors['files'] ? <Typography sx={{ margin: "2px 10px", fontSize: "12px", fontFamily: "Montserrat", color: 'red', fontWeight: "bold" }}> {fieldErrors['files']} </Typography> : <Typography sx={{ margin: "2px 10px", fontSize: "12px", fontFamily: "Montserrat", color: 'gray', fontWeight: "bold" }}>Uploaded Attachments : </Typography>}
                {files?.FileList?.map((file, index) => (
                    <Typography sx={{ margin: "2px 10px", fontSize: "12px", fontFamily: "Montserrat", color: 'gray', fontWeight: "bold" }} key={index}>{file?.File?.name}</Typography>
                ))}
            </Grid>
            <Grid size={12} display={'flex'}>
                <Checkbox checkedIcon={<DoneAllIcon />} onChange={() => setdeclaration(!declaration)} />
                <Typography sx={{ margin: "auto 10px", fontFamily: "Montserrat", color: text.primary }}>I hereby declare that the provided information is true !</Typography>
            </Grid>
            <Grid size={12} display={'flex'}>
                <Box display={'flex'} marginLeft={"auto"}>
                    <Button variant='contained' sx={{ textTransform: "none", margin: "10px 10px 0px 10px", borderRadius: "8px", bgcolor: buttons.background, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }} startIcon={<BookmarkIcon />}>Save</Button>
                    <Button variant='contained' sx={{ textTransform: "none", margin: "10px 10px 0px 10px", borderRadius: "8px", bgcolor: buttons.background, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }} startIcon={<PublishIcon />} disabled={!declaration} onClick={handleSubmitExpense}>Submit</Button>
                </Box>
            </Grid>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={error} autoHideDuration={6000} onClose={() => seterror('')}>
                <Alert
                    onClose={() => seterror(false)}
                    severity={"error"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackmsg}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ExpenseSubmitComp