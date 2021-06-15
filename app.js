const  express= require("express")
const data = require ("./data")
const app = express();


//methode
//route path
app.get(
    "/products",
    (req,res)=> {
    res.json(data)
    }
)

const PORT = 8000
app.listen(8000,()=> 
console.log(`The app-location runs on localhost:${PORT}`)
);

