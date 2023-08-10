const app = require("./app")
const dotenv = require("dotenv")
const connectDatabase = require("./config/database")

//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to Uncaught Exception")
    process.exit(1)
});


//Config
dotenv.config({ path: "backend/config/config.env" });


const server=app.listen(process.env.PORT, async () => {
    await connectDatabase()
    console.log(`server is listening on http://localhost:${process.env.PORT}`)
})

//unhandled promise rejection

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to handled promise rejection")
    server.close(()=>{
        process.send(1)
    })
})