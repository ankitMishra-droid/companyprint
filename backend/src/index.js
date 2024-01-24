import app from "./app.js"
import connectToMongo from "./config/db.js"

const port = process.env.PORT || 5000

connectToMongo()
.then(() => {
    app.on("error", (errror) => {
        console.log("Error while app listing", errror)
    })
    app.listen(port, (req, res) => {
        console.log(`Server Runnig On Port : ${process.env.PORT}`)
    })
}).catch((error) => {
    console.log('Mongoose Connection Failed', error)
})
