import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import '../styles/create-q.css'
import { handleAddQuestion } from '../actions/questions';

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

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOne, optionTwo } = this.state
        const { dispatch} = this.props

        dispatch(handleAddQuestion(optionOne, optionTwo))

        this.setState(() => ({
            optionOne: '',
            optionTwo: ''
        }))

        this.props.history.push('/')
    }

    render (){        
        const { optionOne, optionTwo} = this.state
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
                                disabled={optionOne === '' || optionTwo === ''}
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

export default withRouter(connect()(CreateQ))