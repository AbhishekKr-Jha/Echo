import {configureStore} from '@reduxjs/toolkit'
import darkMode from './Reducer'
const store=configureStore({
    reducer:{
        darkMode:darkMode
    }
})

export default store