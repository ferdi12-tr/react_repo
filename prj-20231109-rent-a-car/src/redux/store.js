import { createContext } from 'react'
import reducer from './reducer'

const store = createContext(reducer);

export default store;