import React from 'react'
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { homeCards } from './data.js';
import { useNavigate } from 'react-router-dom';
const Userlayout = () => {
    const navigate = useNavigate();
    return (
        <>
            <div style={{margin:"20px"}}><h1>Hi, thereby select module card to go forward!</h1></div>
            <Box display="flex" sx={{ width: "100%",marginTop:"20px" }}>
                {homeCards?.map((item, index) =>
                (<Card sx={{ width: "20rem", padding: "16px", margin: "8px", display: "flex" }} key={index} onClick={() => navigate(item.path)}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            sx={{ height: "12rem", width: "10rem", margin: "auto" }}
                            image={`/images/${item.label}.svg`}
                            alt="green iguana"
                        />
                        <CardContent >
                            <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center",fontFamily:"montserrat" }}>
                                {item.label}
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                </Card>)
                )}

            </Box>
             {/* <Box display="flex" justifyContent="start">
                <Typography sx={{ textAlign: "center",fontFamily:"montserrat",paddingTop:"15rem" ,fontSize:"14px",marginLeft:"10px"}}>

                This is an all in one application which helps in kickstarting the delivery of an organization.
                </Typography>
                </Box> */}
                </> 
    )
}

export default Userlayout