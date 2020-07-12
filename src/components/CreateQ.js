import React, { Component } from 'react'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import '../styles/create-q.css'

class CreateQ extends Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }

    handleChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        const id = e.target.id
        this.setState((currentState) => ({
            optionOne : id === 'optionOne' ? value : currentState.optionOne,
            optionTwo : id === 'optionTwo' ? value : currentState.optionTwo
        }))
    }

    handleSubmit = () => {
        const { optionOne, optionTwo } = this.state
        console.log('The inputs: ', optionOne, optionTwo)
    }

    render (){
        return (
            <div className='create-question-container'>
                <Paper className='create-question' elevation={5}>
                    <div className='create-question-caption'>
                        <h3>Create New Question</h3>
                    </div>
                    <div className='create-question-info'>                                           
                        <h2>Would you rather...</h2>
                    </div>
                    <div>
                        <form className='create-question-form'>
                            <TextField
                                required
                                label="Option One"
                                id='optionOne'
                                className='text-field'
                                value={this.state.optionOne}
                                onChange={(e) => this.handleChange(e, this.id)}
                                variant="outlined"
                            />
                            <hr className='hr-left'/>                            
                            <h4>OR</h4>
                            <hr className='hr-right'/>
                            <TextField
                                required
                                label="Option Two"
                                id='optionTwo'
                                className='text-field'
                                value={this.state.optionTwo}
                                onChange={(e) => this.handleChange(e, this.id)}
                                variant="outlined"
                            />
                            <Button 
                                className='form-button'
                                variant="contained" 
                                color="primary"
                                onClick={this.handleSubmit}>
                                Create
                            </Button>
                        </form>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default connect()(CreateQ)