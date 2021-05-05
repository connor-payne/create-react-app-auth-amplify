import React , { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Auth } from 'aws-amplify';
import { createCompany } from '../services/service';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
      width: '100vw',
      textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    submit: {
        margin: theme.spacing(3, 0, 2),
        padding: '16px',
        borderRadius: '.7rem',
        backgroundColor: '#637FFD',
        fontWeight: 'bold'
    }
  }));



export default function VerificationCode(props) {
    const classes = useStyles();
    const [formData, setFormData] = React.useState({})
    const [success, setSucess] = React.useState(false)


    const updateForm = (event)  => {
        let newData = formData
        switch (event.target.name) {
            case "code":
              newData.code = event.target.value 
              break
            default:
                throw Error(`Unknown key is tying to be updated: ${event.target.name}`)
        }
        setFormData(newData)
        console.log(formData)
      }

      async function confirmSignUp(event) {
        event.preventDefault();
        try {
          const confirm = await Auth.confirmSignUp(props.email, formData.code);
          console.log(confirm)
          if (confirm === 'SUCCESS') {
          setSucess(true);
            try {
                await createCompany(props.email, "Manager", props.companyName);
            } catch (error) {
                console.log('error signing up:', error);
            } 
          }
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }


    return (
        <div className={classes.root}>
            <Grid container className={classes.paper}  >

                <Grid item xs={4}></Grid>
                <Grid item xs={4} >
                    <img src='/OALogo.png' alt='Onsite Analytics Logo' style={{ height: '8rem', float:'center'}}></img>
                </Grid>
                <Grid item xs={4}></Grid>

                {!success ? (
                    <React.Fragment>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={2}>
                        {"A verification code has been sent to " + props.email}
                    </Grid>
                    <Grid item xs={5}></Grid>

                    <Grid item xs={5}></Grid>
                        
                    <Grid item xs={2}>
                        <form noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="code"
                                label="Verification Code"
                                name="code"
                                autoComplete="code"
                                autoFocus
                                onChange={updateForm}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={confirmSignUp}
                                >
                                Submit
                                </Button>
                        </form> 
                    </Grid>
                    <Grid item xs={5}></Grid>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={2}>
                        {"Your account has been verified! Please refresh the page to sign in."}
                    </Grid>
                    <Grid item xs={5}></Grid>
                    </React.Fragment>
                )}
                
            </Grid>
        </div>
        
    )
    
}