const express=require('express')
const connectDB = require('./config/db')
const cors=require('cors')
const app=express()
const router = require('./router/router')
app.use(express.json())
app.use(cors());

app.use('/', router)
connectDB()
const PORT=5000 
app.listen(PORT,()=>console.log(`server is running on ${PORT}`))