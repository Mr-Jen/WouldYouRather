import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import { FormControl } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import '../styles/sign-in.css'
import { setAuthedUser } from '../actions/authedUser';

class SignIn extends Component {

    handleChange = (e) => {
        e.preventDefault()
        const id = e.target.value
        const { dispatch} = this.props

        dispatch(setAuthedUser(id))
    }


    render (){
        const { users, authedUser } = this.props

        return (
            <div className='signin-main-container'>
                <Paper className='signin-paper' elevation={5}>
                    <div className='caption'>
                        <h3>{`Log In`}</h3>
                    </div>
                    <h4>Welcome to the WouldYourRather game. Please login first.</h4>
                    <div className='select-user'>
                        <FormControl className='select-form'>
                            <InputLabel id="demo-simple-select-outlined-label">Choose User</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={this.handleChange}
                                label="choose-user"
                            >
                                {Object.keys(users).map(uId => (                             
                                    <MenuItem key={uId} value={uId}>
                                        <img 
                                            src={users[uId].avatarURL}
                                            alt={`Avatar of ${users[uId].name}`}
                                            className='signin-avatar'
                                        /> 
                                        <h4 className='select-name'>{users[uId].name}</h4>
                                    </MenuItem>           
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <br></br>
                </Paper>
            </div>
        )
    }
}

function mapStateToProps ({ users, authedUser }){
    return {
        users,
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(SignIn))