import jwt from "jsonwebtoken";

const auth =(req,res,next)=>{
  try {
    
  let { id } = req.params;
  
  let token = req.cookies?.token;
  !token && res.status(401).json({ massage: "please login first" });
  let decoded = jwt.verify(token, "trellotoken");

  if (decoded.id == id) {
    next();
  } else {
    res
      .status(401)
      .json({
        masssage:
          "there is not that user ,login first 'make sure token is the user's token '  ",
      });
  }
  } catch (error) {
    res.json({massage:"error",error})
  }
  
}
export default auth;