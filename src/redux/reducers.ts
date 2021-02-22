import { SimonColor } from './actions'

type UserDetailsState = {
   color : number | undefined
}


const initialState:UserDetailsState = {
    color : undefined
}

const SimonColor = (state: UserDetailsState = initialState, action:SimonColor) => {

    // console.log('SimonColor reducer with type ' + action.type + ' userDetails ' + action.userDetails)

    switch(action.type) {

        case 'COLOR':

            return action.payload

        default:
            return state
    }
}

export default SimonColor
