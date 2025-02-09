import { Box, Typography, TextField, MenuItem, IconButton } from "@mui/material";
import { Close as CloseIcon, Done as DoneIcon, Edit as EditIcon } from "@mui/icons-material";

const EditableField = ({ label, value, options, onChange, onEditToggle, editMode, textdisplay, select, woSelect, func, keyid }) => {
  return (
    <Box display={'flex'} marginTop={"14px"}>
      {editMode ? (
        <>
          <TextField
            size="small"
            label={select ? label : ""}
            placeholder={!select ? label : ""}
            value={value}
            onChange={select ? onChange : (e) => func(e.target.value)}
            select={select}
            autoFocus
            sx={{
              backgroundColor: "whitesmoke",
              borderRadius: "10px",
              marginRight: "10px",
              ".css-quhxjy-MuiInputBase-root-MuiOutlinedInput-root": {
                fontSize: "0.6rem",
                fontFamily: "Montserrat",
                fontWeight: "bold",
              },
              ".css-1pzfmz2-MuiInputBase-input-MuiOutlinedInput-input": {
                height: "0.5rem",
              },
            }}
          >
            {select && options?.map((option, index) => (
              <MenuItem value={option?.id} key={index} sx={{ fontSize: "10px", fontFamily: "montserrat" }}>{option?.label}</MenuItem>
            ))}
          </TextField>

          <>
            <CloseIcon
              sx={{ fontSize: "12px", color: "black", bgcolor: "#f5f3f2", borderRadius: "2px", cursor: "pointer", marginY: "auto", marginLeft: "auto" }}
              onClick={onEditToggle}
            />
            {!select &&
              <IconButton sx={{ fontSize: "12px", color: "black", bgcolor: "#f5f3f2", borderRadius: "2px", cursor: "pointer", marginY: "auto", marginLeft: "10px", padding: "1px" }} onClick={()=>woSelect({ value: value, key: keyid })}>
                <DoneIcon sx={{ fontSize: "12px" }} />
              </IconButton>
            }
          </>
        </>
      ) : (
        <>
          <Typography
            sx={{ cursor: "pointer", fontSize: "12px", marginY: "auto", color: "#3293a8", fontWeight: "bold", fontFamily: "montserrat" }}
          >
            {label} :
            <span style={{ color: "black", backgroundColor: "#f5f3f2", padding: "1px 5px", fontSize: "10px", fontWeight: "bold", marginLeft: "10px" }}>{textdisplay}</span>
          </Typography>
          <EditIcon
            sx={{ fontSize: "12px", color: "black", bgcolor: "#f5f3f2", borderRadius: "2px", cursor: "pointer", marginY: "auto", marginLeft: "auto" }}
            onClick={onEditToggle}
          />
        </>
      )}
    </Box>
  );
};

export default EditableField;
