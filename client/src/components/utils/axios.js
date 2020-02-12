import Axios from 'axios'

import {AUTH_SERVICES , URL_SERVICES} from './urls'

const authAxios = Axios.create({
    baseURL: AUTH_SERVICES
    // baseURL:'/'
})

const urlAxios = Axios.create({
    baseURL: URL_SERVICES
    // baseURL:'/'
})

export {authAxios, urlAxios}