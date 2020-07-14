import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

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

const Nav = props => {
    const classes = useStyles();

    function handleClick (e){
        e.preventDefault()
        const { dispatch} = props

        dispatch(setAuthedUser(null))

        props.history.push('/sign-in')
    }

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
                        <NavLink to='/add' activeClassName='active' style={{color: 'white'}}>
                            Add Question
                        </NavLink>
                    </li>
                    <li style={{marginRight: 10}}> 
                        <NavLink to='/leaderboard' activeClassName='active' style={{color: 'white'}}>
                            Leaderboard
                        </NavLink>
                    </li>
                    <h3 style={{marginLeft: 1000}}>
                        {props.authedUser && `Logged in as: ${props.users[props.authedUser].name}`}
                    </h3>
                    {
                        props.authedUser 
                        ?   <li style={{marginLeft: 200}}> 
                                <NavLink to='/sign-in' onClick={handleClick} activeClassName='active' style={{color: 'white'}}>
                                    Logout
                                </NavLink>
                            </li>
                        :   <li style={{marginLeft: 200}}> 
                                <NavLink to='/sign-in' activeClassName='active' style={{color: 'white'}}>
                                    Log In
                                </NavLink>
                            </li>
                    }
            </Toolbar>
            </AppBar>
        </div>
    )
} 

function mapStateToProps ({authedUser, users}){
    return {
        authedUser,
        users
    }
}

export default withRouter(connect(mapStateToProps)(Nav))