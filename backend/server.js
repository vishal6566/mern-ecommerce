const app=require("./app")
const dotenv=require("dotenv")
const connectDatabase=require("./config/database")
//Config
dotenv.config({path:"backend/config/config.env"});


app.listen(process.env.PORT,async()=>{
    await connectDatabase()
    console.log(`server is listening on http://localhost:${process.env.PORT}`)
})