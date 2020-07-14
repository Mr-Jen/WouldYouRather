import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION } from '../actions/questions'

export default function users (state= {}, action){
    switch(action.type){
        case RECEIVE_USERS: 
            return {
                ...state,
                ...action.users
            }
        case ADD_QUESTION:
            const { question } = action
            const id = question.id
            const authedUser = question.author
            return {
                ...state,
                [question.author]: 
                  {
                    ...state[authedUser],
                    questions: state[authedUser].questions.concat([id])
                  }
            }
            
        default:
            return state
    }
}