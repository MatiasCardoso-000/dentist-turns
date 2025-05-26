import jwt from 'jsonwebtoken'


export const validateToken = async(req,res,next)=> {
  const {token} = req.headers.cookies
  console.log(token);
  
}