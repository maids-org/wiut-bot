/**
 * JSON Down Parser
 * @name axios json parser
 * @description parses json from online API
 * @return JSON
 */
import axios, { AxiosResponse } from 'axios'

export default (link: string | URL) => {
    return axios
        .get(<string>link)
        .then((response: AxiosResponse) => {
            return response.data
        })
        .catch(() => {
            return null
        })
}
