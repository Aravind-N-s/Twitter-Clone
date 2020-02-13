import Axios from 'axios'

import {AUTH_SERVICES} from './urls'

const authAxios = Axios.create({
    baseURL: AUTH_SERVICES
    // baseURL:'/'
})

export {authAxios}