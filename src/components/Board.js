import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';

import '../styles/leaderboard.css'

class Board extends Component {
    render (){
        const { user, answeredScore, createdScore, authedUser, place } = this.props

        return (
            <div className='board-container'>
                <Paper className='board-paper' elevation={5}>
                    <div className='paper-content-container'>
                        <div className='board-avatar-container'>
                            <img 
                                src={'https://tylermcginnis.com/would-you-rather/dan.jpg'}
                                alt={`Avatar of ${user.name}`}
                                className='board-avatar'
                            />
                        </div>
                        <div>
                            <h2 className='board-username'>{`${place + 1}.  ${user.name}`}</h2>
                        </div>
                        <div className='board-info'>
                            <h4>Answered Questions:</h4>
                            <h3>{answeredScore}</h3>
                            <hr/>
                            <h4>Created Questions:</h4>
                            <h3>{createdScore}</h3>
                        </div>
                        <div className='board-total-container'>
                            <div className='board-total'>
                                <h4>Score</h4>
                                <span>
                                    <h2>{(answeredScore + createdScore)}</h2>
                                </span>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users}, {id, place}){
    const user = users[id]
    const answersLength = user ? Object.keys(user.answers).length : null
    const questionsLength = user ? user.questions.length : null

    const answeredScore = answersLength
    const createdScore = questionsLength
    
    return {
        user,
        answeredScore,
        createdScore,
        authedUser,
        place
    }
}

export default connect(mapStateToProps)(Board)