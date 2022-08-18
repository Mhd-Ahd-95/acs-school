import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@material-ui/core'

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .06)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(2),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        padding: theme.spacing(2, 3, 1)
    },
    [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0)
    },
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export function AccordionApply(props) {
    const { summary, titles, schedule, classes, Exam, expand } = props
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Accordion expanded={expanded === expand} onChange={handleChange(expand)}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography variant='h5' className={classes.title3} style={{fontFamily: 'Palatino Linotype'}}>{summary}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {Exam ?
                    <Grid container spacing={3}>
                        <Grid item component={Box} sm={12}>
                            <Grid container component={Box} py={2} direction='row' spacing={1} className={classes.tableTitle}>
                                {titles.map((title, index) => (
                                    <Grid item md={4} sm={4} xs={4} key={index}>
                                        <Typography variant='h5' className={classes.names} style={{fontFamily: 'Palatino Linotype'}}>
                                            {title}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item component={Box} sm={12} xs={12}>
                            {schedule.map((item, index) => (
                                <Grid container component={Box} direction='row' className={classes.tableTitle1} key={index}>
                                    <Grid item md={4} sm={4} xs={4} className={classes.subject}>
                                        <Typography variant='h5' className={classes.name1} style={{fontFamily: 'Palatino Linotype'}}>
                                            {item.course}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={4} sm={4} xs={4} className={classes.nbD}>
                                        <Typography variant='h5' className={classes.name1} style={{fontFamily: 'Palatino Linotype'}}>
                                            {item.row1}
                                        </Typography>

                                    </Grid>
                                    <Grid item md={4} sm={4} xs={4} className={classes.nbD}>
                                        <Typography variant='h5' className={classes.name1} style={{fontFamily: 'Palatino Linotype'}}>
                                            {item.row2}
                                        </Typography>

                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    :
                    <Grid container component={Box} py={2} direction='column' spacing={1}>
                        <Grid item sm={12} xs={12}>
                            <Typography variant='h5' className={classes.title4} style={{fontFamily: 'Palatino Linotype'}}>
                                What to bring to the exam ?
                            </Typography>
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <Typography component='p' className={classes.title5} style={{fontFamily: 'Palatino Linotype'}}>
                                Your child should bring these items to the examination:
                            </Typography>
                            <ul style={{ listStyle: 'square' }}>
                                <li>
                                    <Typography component='p' className={classes.items} style={{fontFamily: 'Palatino Linotype'}}>
                                        The exam ID number
                                    </Typography>
                                </li>
                                <li>
                                    <Typography component='p' className={classes.items} style={{fontFamily: 'Palatino Linotype'}}>
                                        Photo ID
                                    </Typography>
                                </li>
                                <li>
                                    <Typography component='p' className={classes.items} style={{fontFamily: 'Palatino Linotype'}}>
                                        Two 2B or 4B pencils, a sharpener and an eraser. A blue or black biro is optional for the writing tasks.
                                    </Typography>
                                </li>
                            </ul>
                        </Grid>
                        <Grid item >
                            <Typography component='p' className={classes.title5} style={{fontFamily: 'Palatino Linotype'}}>
                                Your child is not allowed to bring these items to the exam:
                            </Typography>
                            <ul style={{ listStyle: 'square' }}>
                                <li>
                                    <Typography component='p' className={classes.items} style={{fontFamily: 'Palatino Linotype'}}>
                                        Mobile phones
                                    </Typography>
                                </li>
                                <li>
                                    <Typography component='p' className={classes.items} style={{fontFamily: 'Palatino Linotype'}}>
                                        Digital Watches
                                    </Typography>
                                </li>
                                <li>
                                    <Typography component='p' className={classes.items} style={{fontFamily: 'Palatino Linotype'}}>
                                        Calculators
                                    </Typography>
                                </li>
                                <li>
                                    <Typography component='p' className={classes.items} style={{fontFamily: 'Palatino Linotype'}}>
                                        Dictionaries
                                    </Typography>
                                </li>
                            </ul>
                        </Grid>
                        <Grid item >
                            <Typography component='p' className={classes.title5} style={{fontFamily: 'Palatino Linotype'}}>
                                Exam results and offers
                            </Typography>
                            <ul style={{ listStyle: 'square' }}>
                                <li>
                                    <Typography component='p' className={classes.items} style={{fontFamily: 'Palatino Linotype'}}>
                                        Exam results will be published on the website and an informative e-mail will be sent to parents.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography component='p' className={classes.items} style={{fontFamily: 'Palatino Linotype'}}>
                                        Eligible students are offered places based on their exam results.
                                    </Typography>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                }

            </AccordionDetails>
        </Accordion>
    );
}

