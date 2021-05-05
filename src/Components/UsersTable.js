import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Title from './Title';
import { NavLink} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createProperty } from '../services/service';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paper: {
    position: 'absolute',
    width: 600,
    border: '2px solid #637FFD',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '.7rem',
    backgroundColor: '#363553',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: '16px',
    borderRadius: '.7rem',
    backgroundColor: '#637FFD',
    fontWeight: 'bold'
  },
  form: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '.7rem',
  }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#F2F2F2',
      color: '828282',
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  

  function getModalStyle() {
  
    return {
      margin: 'auto',
      position: 'relative',
      top: '20%',
      width: '35%',
    };
  }



  

export default function BasicTable(props) {
  const classes = useStyles();
  console.log(props.tagMap)

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({})

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const  addNewProperty = async () => { 
    const res = await createProperty(formData.city, formData.address, formData.state, formData.zip)
    if (res.id != null) {
      props.refresh()
      handleClose()
    }
  }
  

  // updateActiveData takes the name attribute of a column in "edit mode" and updates the value for POST and PATCH requests later
  const updateForm = (event)  => {
    let newData = formData
    switch (event.target.name) {
        case "address":
          newData.address = event.target.value 
          break
        case "city":
          newData.city = event.target.value 
          break
        case "state":
          newData.state = event.target.value 
          break
        case "zip":
          newData.zip = event.target.value 
          break
        default:
            throw Error(`Unknown key is tying to be updated: ${event.target.name}`)
    }
    setFormData(newData)
    console.log(formData)
}

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Title>Add Property</Title>
      <Grid container className={classes.form}>
        <Grid item xs={12}>
          <TextField 
          id="address" 
          label="Address" 
          name="address"
          defaultValue=""
          onChange={updateForm}
          style={{width:'100%'}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
          id="city" 
          label="City" 
          name="city"
          defaultValue=""
          style={{width:'100%'}}
          onChange={updateForm}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
          id="state" 
          label="State" 
          name="state"
          defaultValue=""
          style={{width:'20'}}
          onChange={updateForm}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
          id="zip" 
          label="Zip Code" 
          name="zip"
          defaultValue=""
          onChange={updateForm}
          style={{width:'50%'}}
          />
        </Grid>
        <Grid item xs={12} style={{marginTop:'20px'}}>
          <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={()=>{addNewProperty(formData)}}
              >
              Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <React.Fragment>
    <Title>Users</Title>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">Created At</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((row, key) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="center">{row.userType}</TableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <TableCell align="center">{row._lastChangedAt}</TableCell>
            </TableRow>
          ))}
          <TableRow>
          <TableCell component="th" scope="row">
                <div>
                <button type="button" onClick={handleOpen}>
                  <AddIcon style={{color: '#637FFD', fontSize:"36px"}}/>
                </button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
                </div>
              </TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center" style={{color:'#637FFD', fontWeight:'bold'}}></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
}