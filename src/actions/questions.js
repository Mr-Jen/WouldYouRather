import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SUBMIT__ANSWER = 'SUBMIT_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion (question){
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion (optionOne, optionTwo){
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser
        })
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()))
    }
}

export function receiveQuestions (questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function saveAnswer ({users, questions}){
    return {
        type: SUBMIT__ANSWER,
        users,
        questions,
    }
}

export function handleSaveAnswer (qId, answer){
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveQuestionAnswer({
            qId,
            answer,
            author: authedUser
        })
            .then((res) => dispatch(saveAnswer(res.users, res.questions)))
            .then(() => dispatch(hideLoading()))
    }
}