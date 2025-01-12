import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { tabs } from '../../theme.js';
import { expenseTabs } from '../utils.js';
import { useNavigate } from 'react-router-dom';

const AppbarComponent = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      width="97.2%"
      height="50px"
      bgcolor={tabs.background}
      paddingX="20px"
      position="fixed"
      top={0}
      zIndex={1000}
    >
      <Typography color="white" fontFamily="Montserrat" margin="auto 20px" fontSize="18px">
        Expense
      </Typography>
      <Box display="flex" marginLeft="auto">
        {expenseTabs.map((item, index) => (
          <Typography
            key={index}
            color={tabs.text}
            fontSize="12px"
            marginY="auto"
            marginX="20px"
            padding="5px 10px"
            borderRadius="8px"
            fontFamily="Montserrat"
            sx={{ cursor: 'pointer' }}
            bgcolor={item.path === window.location.pathname ? tabs.active : ''}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </Typography>
        ))}
      </Box>
      <Avatar
        sx={{
          marginY: 'auto',
          height: 30,
          width: 30,
          marginLeft: 'auto',
          cursor: 'pointer',
          fontFamily: 'Montserrat',
        }}
      >
        A
      </Avatar>
    </Box>
  );
};

export default AppbarComponent;
