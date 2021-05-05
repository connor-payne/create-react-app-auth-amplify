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
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { NavLink} from 'react-router-dom';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import { createTag } from '../services/service';
import QRCode from './QRCode';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  form: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '.7rem',
  },
  paper: {
    position: 'absolute',
    width: 600,
    border: '2px solid #637FFD',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '.7rem',
    backgroundColor: '#363553',
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable(props) {
  const classes = useStyles();
  console.log(props.tags)

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({})

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const  addNewTag = async () => { 
    const res = await createTag(formData.make, formData.model, formData.description, props.propertyId)
    if (res.id != null) {
      props.refresh()
      handleClose()
    }
  }
  

  // updateActiveData takes the name attribute of a column in "edit mode" and updates the value for POST and PATCH requests later
  const updateForm = (event)  => {
    let newData = formData
    switch (event.target.name) {
        case "description":
          newData.description= event.target.value 
          break
        case "make":
          newData.make = event.target.value 
          break
        case "model":
          newData.model = event.target.value 
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
    <QRCode />
    <Grid container className={classes.form}>
      <Grid item xs={12}>
        <TextField 
        id="description" 
        label="Description" 
        name="description"
        defaultValue=""
        style={{width:'50%'}}
        onChange={updateForm}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
        id="make" 
        label="Make" 
        name="make"
        defaultValue=""
        style={{width:'50%'}}
        onChange={updateForm}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
        id="model" 
        label="Model" 
        name="model"
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
              onClick={()=>{addNewTag(formData)}}
            >
            Submit
        </Button>
      </Grid>
    </Grid>
  </div>
);

  return (
    <React.Fragment>
      <Grid container style={{padding: '8px'}}>
        <Grid item xs={11}>
          <Grid item xs={12} style={{fontWeight: 'bold', fontSize: '18px', color: '#4F4F4F'}}>
            {props.propertyData.propertyAddress}
          </Grid>
          <Grid item  xs={12} style={{ fontSize: '12px', color: '#4F4F4F'}}>
            {props.propertyData.propertyCity + ", " + props.propertyData.propertyState + " " + props.propertyData.propertyZip}
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <div style={{textAlign: "center"}}>
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
        </Grid>
        
      </Grid>
 
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>TAG ID</StyledTableCell>
            <StyledTableCell align="center">UNIT DESCRIPTION</StyledTableCell>
            <StyledTableCell align="center">MAKE</StyledTableCell>
            <StyledTableCell align="center">MODEL</StyledTableCell>
            <StyledTableCell align="center">LAST SERVICE DATE</StyledTableCell>
            <StyledTableCell align="center">REPORT</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tags.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.unitMake}</TableCell>
              <TableCell align="center">{row.unitModel}</TableCell>
              <TableCell align="center">{row.lastServiceDate === "0" ? "Unitialized" : row.lastServiceDate}</TableCell>
              <TableCell align="center">
                <NavLink style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'white', textDecoration: 'none'}} to={"/tags/" +row.id} > 
                      <AssignmentIcon style={{color: "#828282"}} />
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
}