import userModel from "../../db/models/user.model.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";
// Sign up 
const signUp =async (req, res) =>{
    try {
        let { email } = req.body;
        let foundeduser = await userModel.findOne({ email: email });
        if (foundeduser) {
          res.status(409).json({ massage: "Already Register" });
        } else {
          let hashedPass = bcrypt.hashSync(req.body.password ,7)
          let addedUser = await userModel.insertMany({
            ...req.body,
            password: hashedPass,
            isDeleted:false
          });
          res.status(201).json({ massage: "user added", addedUser });
        }

    } catch (error) {
         res.status(400).json({ massage: "error", error });
    }
} 

// Login in 
const logIn = async(req,res)=>{
  try {
     let { email, password } = req.body;
     let foundedUser = await userModel.findOne({ email: email });
     if (foundedUser) {
       let matchedPass = bcrypt.compareSync(password, foundedUser.password);
       if (matchedPass) {
         let token = jwt.sign({ id: foundedUser.id }, "trellotoken");
         res.status(200).cookie("token",token).json({ massage: " Done", token });
       } else {
         res.status(400).json({ massage: " password wrong" });
       }
     } else {
       res
         .status(404)
         .json({ massage: " user not found , have to register first" });
     }
    
  } catch (error) {
      res.json({ massage: " error",error });
  }
 
}


// change password
const changePass = async(req,res)=>{
  try {
     let { id } = req.params;
     let foundedUser = await userModel.findById(id);
     if (foundedUser) {
      let hashedPass = bcrypt.hashSync(req.body.password, 7);
       foundedUser.password = hashedPass;
       res.status(201).json({ massage: "password changed", foundedUser });
      }else{
        res.status(400).json({ massage: "user not found" });
      }
    } catch (error) {
    res.json({ massage: "error", error });
  } 
}

// .................update User..............
const updateUser =async (req, res) => {
  let{id}=req.params
  try {
     let updatedUser = await userModel.findByIdAndUpdate(
       id,
       {
         userName: req.body.userName,
         email: req.body.email,
         gender: req.body.gender,
         phone: req.body.phone,
         age: req.body.age,
         isVerified: req.body.isVerified
       },
       { new: true }
     );
     res.json({ massage: "user-update", updatedUser });
    } catch (error) {
    res.json({ massage: "user not found", error });
    
  }
 
  
};

// ..............delet User..................
const deleteUser = async(req, res) => {
  let {id}=req.params
  let deletedUser = await userModel.findByIdAndDelete(id)
  let allusers = await userModel.find();
  if (deletedUser) {
    res.status(201).json({ massage: "user-delete", allusers });
  } else {
    res.status(400).json({ massage: "user not found" });
  }
  
};

// ............. Soft delet User..................
const softDeleteUser = async(req, res) => {
  let {id}=req.params
  let deletedUser = await userModel.findById(id)
  if (deletedUser) {
     deletedUser.isDeleted = true;
     await deletedUser.save();
     let allusers = await userModel.find();
    res.status(201).json({ massage: "user-delete", allusers });
  } else {
    res.status(400).json({ massage: "user not found" });
  }
};

// Log out 
const logout =(req,res)=>{
  res.clearCookie("token").json({ massage: "logout successfully!" });

}

export {
  signUp,
  logIn,
  changePass,
  updateUser,
  deleteUser,
  softDeleteUser,
  logout,
};