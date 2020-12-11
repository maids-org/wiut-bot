/**
 * @name Process Env Shortener & Loader
 * @description Shorten all env structures and load up .env file if exists
 * @module {process}
 */

import * as dotenv from 'dotenv'

if (process.env.ENVIRONMENT === 'local')
    dotenv.config()

export default process.env
