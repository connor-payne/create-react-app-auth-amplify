import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { NavLink} from 'react-router-dom';

import { Auth } from 'aws-amplify';

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}


export const mainListItems = (
  <div>
    <NavLink style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'white', textDecoration: 'none'}} visite to="/" > 
      <ListItem button className="nav-link">
        <ListItemIcon>
          <DashboardIcon style={{color: "white"}}/>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </NavLink>
    <NavLink style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'white', textDecoration: 'none'}} to="/properties" > 
      <ListItem button>
        <ListItemIcon>
          <HomeIcon style={{color: "white"}} />
        </ListItemIcon>
        <ListItemText primary="Properties" />
      </ListItem>
    </NavLink>
    <NavLink style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'white', textDecoration: 'none'}} to="/users" > 
      <ListItem button >
        <ListItemIcon>
          <PersonIcon style={{color: "white"}} />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </NavLink>
      <ListItem button onClick={()=>{signOut()}}>
        <ListItemIcon>
          <ExitToAppIcon style={{color: "white"}} />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItem>
    {/* <ListItem button>
      <ListItemIcon>
        <DescriptionIcon style={{color: "white"}} />
      </ListItemIcon>
      <ListItemText primary="View Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ContactsIcon style={{color: "white"}} />
      </ListItemIcon>
    <ListItemText primary="Contacts" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon style={{color: "white"}} />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem> */}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);