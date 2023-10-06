const jwt = require("jsonwebtoken")
const dotenv=require('dotenv').config()
const jwtKey=process.env.JWTKEY;


const jwt_token_Generate=async (data)=>{
// param must be in object
    const dataObj={data}
console.log(jwtKey)
const response=await jwt.sign(dataObj,jwtKey);
console.log(response,data)
return response;
}

const jwt_token_verify=async (token)=>{
    // param must be in token
        try {
            
        const resp=await jwt.verify(token,jwtKey)
        console.log(resp)
        return resp;

        } catch (error) {
            console.log(error)
            return error;
        }

    }
    







module.exports={
jwt_token_Generate,
jwt_token_verify
}

