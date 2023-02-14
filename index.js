//server creation 


//1. import express

const express = require('express')

//import dataservice
const dataservices=require('./services/data.service')

//import cors 
const cors = require('cors')



//import jwt
const jwt = require('jsonwebtoken')


///2.create an application using the express

const app = express()

//To parse json fro request body

app.use(express.json())



//Give command to share data via cors
app.use(cors({
    origin:'http://localhost:4200'
}))


//3.create a port number
app.listen(3000,() =>{
    console.log('listening on the port 3000');
})


//Application specific middleware

const appMiddleware =(req,res,next)=>{
    console.log('Application specific midddleware');
    next();
}
app.use(appMiddleware)


//Rpouter Specific Middleware

const jwtMiddleware = (req, res, next)=>{
  
    console.log('Router specific Middleware');
    try{
    const token =req.headers['x-access-token'];
    const data = jwt.verify(token,'superkey2022')
    console.log(data);
    next();
    }
    catch{
        res.status(422).json({
            statuscode:422,
            status:false,
            message:'please login first'
        })
    }

}



//4.Resolving HTTP Requst
//get, post , put , patch , delete


//Resolving get Request

// app.get('/',(req,res)=>{
//     res.send('Get request')
// })


// //Resolving post request
// app.post('/',(req,res)=>{
//     res.send('Post request')
// })



// //Resolving put Request
// app.put('/',(req,res)=>{
//     res.send('put request')
// })


// //Resolving patch request
// app.patch('/',(req,res)=>{
//     res.send('Patch request')
// })


// //Resolving dlete Request
// app.delete('/',(req,res)=>{
//     res.send('Delete Request')
// })


//API request
//registration.request
app.post('/register',(req,res)=>{
    console.log(req.body);
    dataservices.register(req.body.acno,req.body.username,req.body.pswd)//data
    .then(result=>{
    res.status(result.statuscode) .json(result);
    // res.send('Register successful')
})
})

//login.request

app.post('/login',(req,res)=>{
    console.log(req.body);
    dataservices.login(req.body.acno,req.body.password)
    .then(result=>{
        res.status(result.statuscode) .json(result);
    })
   
    // res.send('Register successful')
})
//deposite.request

app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataservices.deposit(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statuscode) .json(result);
    } )

    
   
})

//withdraw.request
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
dataservices.withdraw(req.body.acno,req.body.password,req.body.amount)
.then(result=>{
    res.status(result.statuscode) .json(result);
})
    
})


//transactiohistory.request
app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataservices.getTransaction(req.body.acno)
    .then(result=>{
        res.status(result.statuscode) .json(result);
    })
   
})

//delete.request


