const express = require("express")
const app = express();
const config = require("./config")
const loaders = require("./loaders")
const events = require("./scripts/events")
const {UserRoutes} = require("./routes")

config();
loaders();
events();

app.use(express.json())

app.use("/",UserRoutes)

app.listen(process.env.APP_PORT,() => {
    console.log(`Server başlatıldı. PORT : ${process.env.APP_PORT} `)
})