import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

import { receiveUsers } from './users'

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

export function handleSaveAnswer (info){
    return (dispatch) => {

        dispatch(showLoading())

        return saveQuestionAnswer(info)
            .then((res) => {
                dispatch(receiveQuestions(res.questions))
                dispatch(receiveUsers(res.users))
            })
            .then(() => dispatch(hideLoading()))
        
    }
}