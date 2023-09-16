import jwt from "jsonwebtoken";
import taskModel from "../db/models/task.model.js";
const authTask =async (req, res, next) => {
  try {
    
  let { id } = req.params;
  let foundTask = await taskModel.findById(id);
  if (foundTask) {
    let token = req.cookies?.token;
    !token && res.status(401).json({ massage: "please login first" });
    let decoded = jwt.verify(token, "trellotoken");
    if (decoded.id == foundTask.userId) {
      next();
    } else {
      res.status(401).json({ masssage: " you'r not the creator ,login first" });
    }
  } else {
    res.status(404).json({ masssage: " this task not found" });
  }
} catch (error) {
      
  res.status(500).json({ masssage: " error",error });
  }
  
}

;
export default authTask;
