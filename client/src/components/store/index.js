import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../views/GetStarted/redux/reducer'
import urlReducer from '../views/Homepage/redux/reducer'
const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        url: urlReducer
    }),applyMiddleware(thunk))
    return store
}
export default configureStore