import React, {Component} from 'react'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import { FormControl } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import '../styles/sign-in.css'

class SignIn extends Component {
    state = {
        userId : ''
    }

    handleChange = (e) => {
        e.preventDefault()
        const userId = e.target
        console.log('USERID', userId)
        this.setState(() => ({
            state: userId
        }))
    }

    render (){
        const { users } = this.props

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
                                value={this.state.userId}
                                onChange={this.handleChange}
                                label="choose-user"
                            >
                                {Object.keys(users).map(uId => (  
                                    <div key={uId}className='select-menu'>
                                        <img 
                                            src={'https://tylermcginnis.com/would-you-rather/dan.jpg'}
                                            alt={`Avatar of me`}
                                            className='signin-avatar'
                                        />                                              
                                        <MenuItem value={30}>{users[uId].name}</MenuItem>
                                    </div>             
                                ))}
                                <MenuItem value={20}>Hello</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <p>{this.state.userId}</p>
                    <br></br>
                </Paper>
            </div>
        )
    }
}

function mapStateToProps ({ users }){
    return {
        users
    }
}

export default connect(mapStateToProps)(SignIn)