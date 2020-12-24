import { ADD_TO_CART } from '../constants'
const initialState = {
    cardData: []
}
export default function cardItems(state = [], action) {
    switch (action.type) {
        case ADD_TO_CART:
            // console.log("reducer",action)
            return [
                ...state,
                action.data
            ]
        default:
            return state
    }


}