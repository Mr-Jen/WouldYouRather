import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import '../styles/q-page.css'
import { handleSaveAnswer } from '../actions/questions';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 20,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderWidth: 3,
      borderRadius: 5,
      backgroundColor: 'green',
    },
}))(LinearProgress);
  

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
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const answer = this.state.answer
        const { dispatch, authedUser, question } = this.props

        dispatch(handleSaveAnswer({
            qid: question.id,
            answer,
            authedUser
        }))
    }

    render (){
        const { question, user, author, answer } = this.props
        const isValid = question && user && author ? true : false
        console.log('ISVALID: ', isValid)
        
        const optionOne = question && question.optionOne
        const optionTwo = question && question.optionTwo
        const totalVotes = (optionOne && optionTwo) && (optionOne.votes.length + optionTwo.votes.length)
        const style_1 = answer === 'optionOne' ? 'q-page-answer-container' : 'q-page-not-answer-container'
        const style_2 = answer === 'optionTwo' ? 'q-page-answer-container' : 'q-page-not-answer-container'

        const style_avatar = answer ? 'q-page-answer-avatar-container' : 'q-page-question-avatar-container'

        const optionOne_Perc = optionOne && Math.round(((optionOne.votes.length/totalVotes)*100) * 100) / 100 
        const optionTwo_Perc = optionTwo && Math.round(((optionTwo.votes.length/totalVotes)*100) * 100) / 100


        return (
            <div>
                {isValid
                ?  <div className='q-page-container'>
                        <Paper className='q-page-question-preview' elevation={5}>
                            <div className='q-page-caption'>
                                <h3>{`${author.name} asks:`}</h3>
                            </div>
                            <div className={style_avatar}>
                                <img 
                                    src={author.avatarURL}
                                    alt={`Avatar of ${author.name}`}
                                    className='q-page-question-avatar'
                                />
                            </div>
                            { !answer 
                            ?   <div className='q-page-question-info'>
                                    <h2>Would you rather...</h2>
                                    <div className='q-page-radio-form'>
                                        <FormControl className='radio-control' component="fieldset">
                                            <RadioGroup aria-label="gender" name="gender1" value={this.state.answer} onChange={!answer && this.handleChange}>
                                                <FormControlLabel className='q-page-single-radio' value="optionOne" control={<Radio />} label={optionOne.text} />
                                                <FormControlLabel className='q-page-single-radio' value="optionTwo" control={<Radio />} label={optionTwo.text} />
                                            </RadioGroup>
                                            { !answer &&
                                                <Button onClick={this.handleSubmit} variant="contained" color="primary">
                                                    Submit
                                                </Button> 
                                            }
                                        </FormControl>
                                    </div>
                                </div>
                            :   <div className='q-page-answer'>
                                    <div className='q-page-results-container'>
                                        <FormControl component="fieldset">
                                            <h2>Results:</h2>
                                            <div className={style_1}>
                                                <div className='q-page-result'>
                                                    <h4>Would you rather {optionOne.text}</h4>
                                                    <BorderLinearProgress className='linear-progress' variant="determinate" value={optionOne_Perc} />
                                                    <h4>{optionOne_Perc}%</h4>
                                                    <h3 style={{color:'black'}}>{`${optionOne.votes.length} out of ${totalVotes} votes`}</h3>
                                                </div>                                        
                                            </div>
                                            <div className={style_2}>                                       
                                                <div className='q-page-result'>
                                                    <h4>Would you rather {optionTwo.text}</h4>
                                                    <BorderLinearProgress className='linear-progress' variant="determinate" value={optionTwo_Perc} />
                                                    <h4>{optionTwo_Perc}%</h4>
                                                    <h3 style={{color:'black'}}>{`${optionTwo.votes.length} out of ${totalVotes} votes`}</h3>
                                                </div>                                        
                                            </div>
                                        </FormControl>
                                    </div>
                                </div>
                            }
                        </Paper>
                    </div> 
                :   <h1 style={{color: 'red', textAlign: 'center', marginTop: 40}}>The ID you were trying to access doesn't exist</h1>
                }
            </div>
        )
    }
}

function mapStateToProps ({authedUser, questions, users}, props){
    const { id } = props.match.params
    const question = questions[id]
    const user = users[authedUser]
    const answer = (user && question) && id in user.answers ? user.answers[id] : null
    const author = (user && question) ? users[question.author] : null

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