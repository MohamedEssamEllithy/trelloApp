
import taskModel from "../../db/models/task.model.js";
import userModel from "../../db/models/user.model.js";


const addTask =async(req,res)=>{
    let {id}=req.params;
    let foundedUser =await userModel.findById(id)
    if(foundedUser){
        let newTask = await taskModel.insertMany({...req.body ,status :"toDo" ,userId:id})
            res.status(201).json({masssage:"task added",newTask})
        }else{
        res.status(400).json({masssage:"user not found"})
    }
}


const allTasks= async(req,res)=>{
    let getallTasks =await taskModel.find().populate("userId")
    res.json({masssage:"all tasks",getallTasks})
}

const updateTask = async (req, res) => {
  let { id } = req.params;
  try {
    let updatedTask = await taskModel.findByIdAndUpdate(
      id,
      {
        tilte: req.body.tilte,
        description: req.body.description,
        status: req.body.status,
        assignTo: req.body.assignTo,
        deadline: req.body.deadline,
      },
      { new: true }
    );
    res.json({ massage: "task-update", updatedTask });
} catch (error) {
      res.json({ massage: "error",error });
    
  }
  
};

const deleteTask = async (req, res) => {
  let { id } = req.params;
  let deleted = await taskModel.findByIdAndDelete(id);
  let alltasks = await taskModel.find();
  if (deleted) {
    res.status(201).json({ massage: "task-delete", alltasks });
  } else {
    res.status(400).json({ massage: "task not found" });
  }
};


export { addTask, allTasks, updateTask, deleteTask };