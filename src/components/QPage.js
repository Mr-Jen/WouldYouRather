import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import '../styles/q-page.css'

class QPage extends Component {
    state = {
        answer : ''
    }

    componentDidMount (){
        if(this.props.answer){
            this.setState(() => ({
                answer: this.props.answer
            }))
        }

    }

    handleChange = (event) => {
        const value = event.target.value

        this.setState(() => ({
            answer: value
        }))
        console.log(value)
    }

    handleSubmit = (e) => {
        const answer= this.state.answer
        console.log('The user chose: ', answer)
    }

    render (){
        const { authedUser, question, user, author, answer } = this.props
        console.log('Answer: ', answer, 'Author: ', question.author)

        return (
            <div className='q-page-container'>
                <Paper className='q-page-question-preview' elevation={5}>
                    <div className='q-page-caption'>
                        <h3>{`${author} asks:`}</h3>
                    </div>
                    <div className='q-page-avatar-container'>
                        <img 
                            src={'https://tylermcginnis.com/would-you-rather/dan.jpg'}
                            alt={`Avatar of ${user.name}`}
                            className='q-page-question-avatar'
                        />
                    </div>
                    <div className='q-page-question-info'>
                        <h2>Would you rather...</h2>
                        <div className='q-page-radio-form'>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={this.state.answer} onChange={!answer && this.handleChange}>
                                    <FormControlLabel className='q-page-single-radio' style={{fontFamily: 'bold'}} value="optionOne" control={<Radio />} label={question.optionOne.text} />
                                    <FormControlLabel value="optionTwo" control={<Radio />} label={question.optionTwo.text} />
                                </RadioGroup>
                                <Button onClick={this.handleSubmit} style={{marginTop: 10}} variant="contained" color="primary">
                                    Submit
                                </Button>
                            </FormControl>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, questions, users}, props){
    const { id } = props.match.params
    const question = questions[id]
    const user = users[authedUser]
    const answer = (user && question) && id in user.answers ? user.answers[id] : null
    const author = users[question.author].name

    return {
        id,
        authedUser,
        question,
        user,
        answer,
        author
    }
}

export default connect(mapStateToProps)(QPage)