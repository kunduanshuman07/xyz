import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
    accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AccordianContent from './AccordianContent';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '10px',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.5rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .02)',
    flexDirection: 'row-reverse',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
        transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function AccordianComponent() {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div style={{marginTop: "20px"}}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography component="span" sx={{fontSize: "12px", fontWeight: "bold", fontFamily: "montserrat"}}>SP91</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AccordianContent/>
                    <AccordianContent/>
                    <AccordianContent/>
                    <AccordianContent/>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography component="span" sx={{fontSize: "12px", fontWeight: "bold", fontFamily: "montserrat"}}>SP90</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <AccordianContent/>
                    <AccordianContent/>
                    <AccordianContent/>
                    <AccordianContent/>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography component="span" sx={{fontSize: "12px", fontWeight: "bold", fontFamily: "montserrat"}}>SP89</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <AccordianContent/>
                    <AccordianContent/>
                    <AccordianContent/>
                    <AccordianContent/>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
