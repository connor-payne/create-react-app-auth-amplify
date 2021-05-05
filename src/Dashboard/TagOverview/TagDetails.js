import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    header : {
        fontSize: '20px',
        paddingBottom: '3px',
        color: '#828282',
    },
    section: {
        padding: '10px'
    }

  }));

export default function TagDetails(props) {
    const classes = useStyles();
    return (
        <Container>
            <Grid container>
                <Grid container className={classes.section}>
                    <Grid className={classes.header} item xs={12}>
                        {props.property.propertyAddress}
                    </Grid>
                    <Grid item xs={12} style={{color:'#828282'}}>
                        {props.property.propertyCity + ", " + props.property.propertyState + " " + props.property.propertyZip}
                    </Grid>
                </Grid>
                <Grid container className={classes.section}>
                    <Grid className={classes.header} item xs={12}>
                        TAG ID
                    </Grid>
                    <Grid item xs={12}>
                        {props.tag.id}
                    </Grid>
                </Grid>
                <Grid container className={classes.section}>
                    <Grid className={classes.header} item xs={12}>
                        UNIT DESCRIPTION
                    </Grid>
                    <Grid item xs={12}>
                        {props.tag.description}
                    </Grid>
                </Grid>
                <Grid container className={classes.section}>
                    <Grid className={classes.header} item xs={12}>
                        MODEL
                    </Grid>
                    <Grid item xs={12}>
                        {props.tag.unitModel}
                    </Grid>
                </Grid>
                <Grid container className={classes.section}>
                    <Grid className={classes.header} item xs={12}>
                        PURCHASE DATE
                    </Grid>
                    <Grid item xs={12}>
                        May 7, 2010
                    </Grid>
                </Grid>
                <Grid container className={classes.section}>
                    <Grid className={classes.header} item xs={12}>
                        WARRANTY EXPIRATION
                    </Grid>
                    <Grid item xs={12}>
                        May 7, 2015
                    </Grid>
                </Grid>
                <Grid container className={classes.section}>
                    <Grid className={classes.header} item xs={12}>
                        LAST SERVICE DATE
                    </Grid>
                    <Grid item xs={12}>
                        {props.tag.lastServiceDate}
                    </Grid>
                </Grid>
            </Grid>
        </Container>  
    )

}