/*==================================================
Header.js

It contains the Header component to be displayed on every page.
The header contains navigation links to every other page.
================================================== */
// Import "material" library for building UI with React components
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

// Define styling for the header
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    fontType: 'bold',
    fontFamily: 'sans-serif', 
    fontSize: '35px', 
    color: '#2c3e50'  // Darker blue-gray
  },
  appBar:{
    backgroundColor: 'rgba(255, 255, 255, 0.9)',  // Translucent white
    backdropFilter: 'blur(10px)',  // Glass effect
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',  // Subtle shadow
  },
  greeting:{
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: "50%",
    margin: "auto",
  },
  links:{
    textDecoration: 'none',
  }
}));

// Header component, displayed on every page
// Links to every other page
const Header = () => {
  const classes = useStyles();
  
  const buttonStyle = {
    backgroundColor: '#4a90e2',  // Light blue
    color: 'white',
    '&:hover': {
      backgroundColor: '#357abd'  // Darker blue on hover
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit" >
            Campus Management System
          </Typography>

          <Link className={classes.links} to={'/'} >
            <Button 
              variant="contained" 
              style={{
                ...buttonStyle,
                marginRight: '10px'
              }}
            >
              Home
            </Button>
          </Link>

          <Link className={classes.links} to={'/campuses'} >
            <Button 
              variant="contained" 
              style={{
                ...buttonStyle,
                marginRight: '10px'
              }}
            >
              All Campuses
            </Button>
          </Link>

          <Link className={classes.links} to={'/students'} >
            <Button 
              variant="contained" 
              style={buttonStyle}
            >
              All Students
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );    
}

export default Header;