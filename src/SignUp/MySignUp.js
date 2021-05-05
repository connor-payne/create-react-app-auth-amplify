import React , { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Title from '../Components/Title';

import { Auth } from 'aws-amplify';
import { Modal } from '@material-ui/core';
import VerificationCode from '../VerificationCode/VerificationCode';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        Onsite Analytics
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: '16px',
    borderRadius: '.7rem',
    backgroundColor: '#637FFD',
    fontWeight: 'bold'
  },
  hero: {
    marginTop: '20vh',
  },
  welcomeText: {
    fontSize: '36px',
    fontWeight: '700'
  },
  signInText: {
    fontSize: '76px',
    paddingBottom: '30px',
    fontWeight: '900'
  },
  infoText: {
    paddingBottom: '50px'
  },
  paperModal: {
    position: 'absolute',
    width: 600,
    border: '2px solid #637FFD',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '.7rem',
    backgroundColor: '#363553',
  },
  formModal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '.7rem',
  }
}));

function getModalStyle() {
  
  return {
    margin: 'auto',
    position: 'relative',
    top: '20%',
    width: '35%',
  };
}

export default function MySignUp(props) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({})
  const {authState, onStateChange} = props;
  const [currentState, changeState] = useState('signUp');
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(props)


  const updateForm = (event)  => {
    let newData = formData
    switch (event.target.name) {
        case "email":
          newData.email = event.target.value 
          break
        case "password":
          newData.password = event.target.value 
          break
        case "companyName":
          newData.companyName = event.target.value 
          break
        case "code":
          newData.code = event.target.value 
          break
        default:
            throw Error(`Unknown key is tying to be updated: ${event.target.name}`)
    }
    setFormData(newData)
    console.log(formData)
  }

  // const body = (
  //   <div style={modalStyle} className={classes.paperModal}>
  //     <Title>Verification Code</Title>
  //     <Grid container className={classes.formModal}>
  //       <Grid item xs={12}>
  //         You should recieve a verification code to your  email within the next seconds.
  //         <TextField 
  //         id="code" 
  //         label="Verification Code" 
  //         name="code"
  //         defaultValue=""
  //         onChange={updateForm}
  //         style={{width:'50%'}}
  //         />
  //       </Grid>
        
  //       </Grid>
  //       <Grid item xs={12} style={{marginTop:'20px'}}>
  //         <Button
  //               type="submit"
  //               fullWidth
  //               variant="contained"
  //               color="primary"
  //               className={classes.submit}
  //               onClick={confirmSignUp}
  //             >
  //             Submit
  //         </Button>
  //       </Grid>
  //   </div>
  // );



  


    const signUp = async (event) => {
      event.preventDefault();
      const email = formData.email
      const password = formData.password
      const companyName = formData.companyName
      // try {
      //     await createUser(email, "Manager", companyName)  
      // } catch (error) {
      //     console.log('error signing up:', error);
      // } 

      try {
        const { user } = await Auth.signUp({
          username: email,
          password,
          attributes: {
            email: email,          // optional
            // other custom attributes 
        }
      })
      console.log(user);
      changeState('verification')
    } catch (error) {
        console.log('error signing up:', error);
    } 

    }

  return (
    (authState === 'signUp' && currentState !== 'verification') ? (
    <Grid container component="main" className={classes.root}>
        {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
          {body}
      </Modal> */}
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.hero}>
        <Grid 
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={5}>
          <Grid item className={classes.welcomeText} xs={12}>
            Welcome to Onsite Analytics,
          </Grid>
          <Grid item className={classes.signInText} xs={12}>
            Sign UP!
          </Grid>
          <Grid item xs={12} className={classes.infoText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore 
          magna aliqua. 
          </Grid>
          <Grid item xs={12}>
          Don’t have an account? <span style={{color:'#637FFD'}}>Create an account</span>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <img src='/OALogo.png' alt='Onsite Analytics Logo' style={{ height: '8rem', float:'left'}}></img>

          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Grid item xs={8}>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={updateForm}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={updateForm}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="companyName"
              label="Company Name"
              type="companyName"
              id="companyName"
              autoComplete="current-password"
              onChange={updateForm}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={signUp}
              >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/"  variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Button onClick={() => onStateChange("signIn")}>
                  {"Already have an account? Sign In"}
                </Button>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
          </Grid>
        </div>
      </Grid>
    </Grid>
  ) : currentState === "verification" ? <VerificationCode email={formData.email} companyName={formData.companyName} /> : null)
}