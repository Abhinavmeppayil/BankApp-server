//import JWT
const jwt =require('jsonwebtoken');

//import db
const db=require('./db')

//database
userDetails = {
    1000: { acno: 1000, username: 'Abhinav', password: 1000, balance: 1000, transaction: [] },
    1001: { acno: 1001, username: 'Soorya', password: 1001, balance: 1000, transaction: [] },
    1002: { acno: 1002, username: 'Anujith', password: 1000, balance: 1000, transaction: [] }
}

 const  register = (acno, username, password) => {
  return db.User.findOne({acno})
  .then(user=>{
    if(user){
      return {
        status:'false',
        statuscode:400,
        message:'user already registered'
    }
    }
  


    // if (acno in userDetails) {
    //     return {
    //         status:'false',
    //         statuscode:400,
    //         message:'user already registered'
    //     }
    // }
    else {
        const newUser =new db.User({
            acno:acno,
            username:username,
            password:password,
            
            balance: 0,
            transaction: []

        }
        )

        newUser.save();
        return {
            status:'true',
            statuscode:200,
            message:'Register Succesful'
        }

    }
  })
    
}



const login=(acno, pswd)=> {
  return db.User.findOne({acno,password:pswd})//data
  .then(user=>{
    if(user){
      currentuser=user.username
      currentAcno=acno
      const token=jwt.sign({currentAcno:acno},'superkey2022')//to generate a token
    
  

    
    // if (acno in userDetails) {
    //   if (pswd == userDetails[acno]['password']) {
    //     currentuser = userDetails[acno]['username']
    //     currentAcno= acno;
    //     const token=jwt.sign({
    //       currentAcno:acno
    //     },
        // 'superkey2022')//to generate token
        //it wil generate a number and assign to a token

        return{
        status:'true',
            statuscode:200,
            message:'Login  Succesful',
            token:token,
            currentuser:currentuser,
            currentAcno:currentAcno
            
        }
      }
      else {
        return{
        status:'false',
            statuscode:400,
            message:'Invalid Userdetails'
        }
      }
    })
  }
  
  //   else {
  //     return {
  //     status:'false',
  //     statuscode:400,
  //     message:'Invalid userdetails'
  // }
  //   }
  

    




const deposit=(acno, pswd, amt) =>{
    var amount = parseInt(amt)
   

   return db.User.findOne({acno,pswd})//data
   .then(user=>{
    if(user){
      user.balance +=amount;
      user.transaction.push({
        Type:'credit',
        Amount:amount
      })
      user.save();
      return{
        status:true,
        statuscode:200,
        message:`${amount} is credited and balance is ${user.balance}`
    }
   }
      
else{
  return{
    status:false,
    statuscode:400,
    message:`Incorrect Userdetails`
}

      
      
        // console.log(userDetails);
        

        // return userDetails[acno]['balance']
      }
      
      })

    }
   
  


  const withdraw=(acno, pswd, amt)=> {
    var amount = parseInt(amt)
   

    return db.User.findOne({acno,pswd})//data
   .then(user=>{
    if(user){
      if(user.balance>amount){
      user.balance -=amount;
      user.transaction.push({
        Type:'debit',
        Amount:amount
      })
      user.save();

      return{
        status:true,
        statuscode:200,
        message:`${amount} is debited and balance is ${user.balance}`
    }
   }
       
      
      else {
        // alert('password missmatch')
        return {
            status:false,
          statuscode:400,
          message:'userdetails'
            }
      }
    }

    })

    }
    
  
   const  getTransaction=(acno)=> {
    return db.User.findOne({acno})
    .then(user=>{
      if(user){
    return {
      status:'true',
      statuscode:200,
      Transaction: user.transaction
    }
     
    }else{
      return{
      status:'false',
      statuscode:400,
      message:'User not found'
    }

    }

    })
  
  }
  


module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction
}
