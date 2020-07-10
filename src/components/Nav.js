import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

export default function Nav (props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
            <Toolbar>
                    <li style={{marginRight: 10}}>
                        <NavLink to='/' exact activeClassName='active' style={{color: 'white', marginLeft: 20}}>
                            Home
                        </NavLink>
                    </li>
                    <li style={{marginRight: 10}}> 
                        <NavLink to='/new' activeClassName='active' style={{color: 'white'}}>
                            Add Question
                        </NavLink>
                    </li>
                    <li style={{marginRight: 10}}> 
                        <NavLink to='/leaderboard' activeClassName='active' style={{color: 'white'}}>
                            Leaderboard
                        </NavLink>
                    </li>
                    <h3 style={{marginLeft: 1300}}>Logged in as: </h3>
            </Toolbar>
            </AppBar>
        </div>
    )
} 