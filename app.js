const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static("public"));

const routerHome = require('./routes/home-routes.js')
const routerUser = require('./routes/user-route.js')
const routerLogin = require('./routes/login-route.js')

app.use('/', routerHome)
app.use('/users', routerUser)
app.use('/register', routerUser)
app.use('/login', routerLogin)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))