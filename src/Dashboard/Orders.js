import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Components/Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', '441 Misty Haven Court', 'Dishwasher', "Bob's Fix.it Co.", 'In Progress'),
  createData(1, '16 Mar, 2019', 'Rosemead at Olympus Point', 'HVAC', "Bob's Fix.it Co.", 'Completed'),
  createData(2, '16 Mar, 2019', '123 Viking Street', 'Dryer', "Bob's Fix.it Co.", 'Completed'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Service Requests</Title>
      <Table size="small">
        <TableHead>
          <TableRow >
            <TableCell>DATE</TableCell>
            <TableCell>PROPERTY</TableCell>
            <TableCell>UNIT</TableCell>
            <TableCell>ASSIGNEE</TableCell>
            <TableCell >STATUS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more service requests
        </Link>
      </div>
    </React.Fragment>
  );
}