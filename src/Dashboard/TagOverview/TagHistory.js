import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Title from '../../Components/Title';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';


const useStyles = makeStyles((theme) => ({
    header : {
        fontSize: '20px',
        paddingBottom: '3px',
        color: '#828282',
    },
    section: {
        padding: '10px',
    },
    date: {
        fontSize: '15px',
        color: '#4F4F4F',
    },
    user: {
        fontSize: '10px',
        color: '#BDBDBD'
    },
    maintananceType: {
        fontSize: '20px'
    },
    maintanceNotes: {

    },
  }));

export default function TagDetails(props) {
    const classes = useStyles();
    return (
        <Container>
            <Title>History & Notes</Title>
            <Grid container>
                <Grid item xs={1}>
                    {/* FILLER COLUMN */}
                </Grid>
                    <Grid item xs={11} >
                    {props.reports.map((report)=>(
                    <Grid container className={classes.section} key={report.id}>
                        <Grid container>
                            <Grid item xs={3}>
                                <Grid item className={classes.date} xs={12}>
                                    {report.serviceDate}
                                </Grid>
                                <Grid item className={classes.user} xs={12}>
                                    {"User: "  +report.servicerName}
                                </Grid>
                            </Grid>
                            <Grid item xs={9}>
                                <Grid item className={classes.maintananceType} xs={12}>
                                <FiberManualRecord style={{color: report.serviceType.toUpperCase() === "SERVICE" ? "#DADADA": "#637FFD" , fontSize:"11px"}}/> 
                                {report.serviceType.toUpperCase()}
                                </Grid>
                                <Grid item xs={12}>
                                    {report.serviceNotes}
                                </Grid>
                            </Grid>
                        </Grid>     
                    </Grid>
                ))}
                </Grid>
                
            </Grid>
        </Container>  
    )

}