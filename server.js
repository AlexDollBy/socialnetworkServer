var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
var port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}))

var Users = require("./routes/Users")
var Groups = require("./routes/Groups")
var Posts = require("./routes/Posts")
app.use("/users", Users)
app.use("/groups", Groups)
app.use("/posts", Posts)

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})  