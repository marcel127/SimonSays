import { Actions } from './actions'

type State = {
   currentScore : number 
}


const initialState:State = {
    currentScore : 0
}

const AppReducer = (state: State = initialState, action:Actions) => {

    switch(action.type) {

        case 'INCREMENT':

            return {
                currentScore : state.currentScore + 1
            }
        case 'RESET' : 
            return initialState            

        default:
            return state
    }
}

export default AppReducer
