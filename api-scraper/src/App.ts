import express from 'express'
import {router} from './server'
const app = express()
const port = process.env.PORT || 4567

app.use(router)

app.listen(port, () =>{
    console.log('App is live on port: ', port);
})