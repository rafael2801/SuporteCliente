import express from 'express'
import './database'

import { createServer } from 'http'
import {Server,Socket } from 'socket.io'
import { routes } from './routes'
import path from 'path'

const app = express()
const http = createServer(app) 
const io = new Server(http)

io.on("connection",(socket:Socket)=>{
})

app.use(express.json())
app.use(express.static(path.join(__dirname,"..","public")))
app.set("views",path.join(__dirname,"..","public"))
app.engine("html",require("ejs").renderFile)
app.set("view engine","html")

app.get("/",(req,res)=>{
    return res.render("html/client.html")
})
app.get("/adm",(req,res)=>{
    return res.render("html/admin.html")
})

app.use(routes)


export { http,io }