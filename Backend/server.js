const app = require('./app')

const port = 4000;

app.listen(port,()=>{
    console.log(`Server is running at port: ${port}`)
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
    console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
})