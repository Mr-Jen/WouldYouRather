import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../styles/dashboard.css'

import QuestionPreview from './QuestionPreview'

class Dashboard extends Component {
    state = {
        mode: 0
    }

    handleChange = () => {
        this.setState(() => ({
            mode: this.state.mode === 0 ? 1 : 0
        }))
    }

    render (){
        return (
            <div className='q-container'>
                <Paper className='container-paper' square elevation={3}>
                    <Tabs
                        value={this.state.mode}
                        indicatorColor="secondary"
                        textColor="primary"
                        onChange={(e) => this.handleChange(e.target.value)}
                        aria-label="disabled tabs example"
                    >
                        <Tab style={{width: 500, fontWeight: 'bold'}} label="Answered Questions" />
                        <Tab style={{width: 500, fontWeight: 'bold'}} label="Unanswered Questions" />
                    </Tabs>
                    <div className='questions'>
                        <ul className='dashboard-list'>
                            {this.props.questionIds.map((id) => (
                                <li key={id}>
                                    <QuestionPreview id={id}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Paper>    
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, users, questions }){
    const user = users[authedUser] ? users[authedUser] : null
    const answers = user ? user.answers : null
    const sortedQuestions = answers 
        ? Object.keys(questions)
            .filter(questionId => !(questionId in answers))
        : null

    console.log('Sorted Questions: ', sortedQuestions)

    if(sortedQuestions){
        return {
            questionIds: sortedQuestions.sort((a,b) => questions[b].timestamp - questions[a].timestamp)
        }
    }
    else {
        return {
            questionIds: Object.keys(questions)
                            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
        }
    }
}

export default connect(mapStateToProps)(Dashboard)