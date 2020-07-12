import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';

import '../styles/question-preview.css'

class QuestionPreview extends Component {
    render (){
        const { authedUser, question, user } = this.props
        const id = question.id
        const { optionOne, optionTwo } = question
        const { avatarURL, name } = user

        return (
            <Link to={`/question/${id}`}>
                <Paper className='question-preview' elevation={5}>
                    <div className='caption'>
                        <h3>{`${name} asks:`}</h3>
                    </div>
                    <img 
                        src={'https://tylermcginnis.com/would-you-rather/dan.jpg'}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                    <div className='question-info'>
                        <h2>Would you rather...</h2>
                        <h5>...{optionOne.text}...</h5>
                    </div>
                </Paper>
            </Link>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, {id}){
    const question = questions[id]
    const user = users[question.author]

    return {
        authedUser,
        question,
        user
    }
}

export default withRouter(connect(mapStateToProps)(QuestionPreview))