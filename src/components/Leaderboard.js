import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import '../styles/dashboard.css'
import { Redirect } from 'react-router-dom'

import Board from './Board';

class Leaderboard extends Component {
    render (){
        const { authedUser } = this.props
        if (!authedUser){
            return <Redirect to='/sign-in'/>
        }
        return (
            <div>
                <Paper className='container-paper' square elevation={3}>
                    <h1>Leaderboard</h1>
                    <div className='paper-content'>
                        <ul className='dashboard-list'>
                            {this.props.userIds.map((id, index) => (
                                <li key={id}>
                                    <Board id={id} place={index}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Paper>    
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, users }){
    const uIds = Object.keys(users)
    const userIds = uIds.sort((a,b) => 
        (users[b].questions.length + Object.keys(users[b].answers).length) - 
        (users[a].questions.length + Object.keys(users[a].answers).length))

    return {
        userIds: userIds,
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(Leaderboard)