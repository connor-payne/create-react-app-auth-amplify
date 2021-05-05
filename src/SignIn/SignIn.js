import React from 'react';
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
import { createCompany } from '../services/service';

import { Auth } from 'aws-amplify';

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
  }
}));

export default function SignInSide(props) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({})
  const {authState, onStateChange} = props;
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
        default:
            throw Error(`Unknown key is tying to be updated: ${event.target.name}`)
    }
    setFormData(newData)
    console.log(formData)
}


  async function signIn(event ) {
    event.preventDefault();
    try {
        const user = await Auth.signIn(formData.email, formData.password);
        console.log(user);
        if (user.username) {
          try {
            await createCompany(formData.email, "Manager", formData.companyName);
        } catch (error) {
            console.log('error signing up:', error);
        } 
        }
    } catch (error) {
        if(error.code === "UserNotConfirmedException") {
          console.log("SHOULD PROMPT CODE VERIFICATION")
        }
        console.log('error signing in', error);
    }
  }

  return (
    authState === 'signIn' ? (
      <Grid container component="main" className={classes.root}>
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
            Welcome Back,
          </Grid>
          <Grid item className={classes.signInText} xs={12}>
            Sign In!
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
                onClick={signIn}
              >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/"  variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Button onClick={() => onStateChange("signUp")}>
                  {"Don't have an account? Sign Up"}
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
  ): null
  )   
}