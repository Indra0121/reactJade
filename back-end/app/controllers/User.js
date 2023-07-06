const User =require("../models/User");
exports.getAllUsers = async (req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json({
            msg:"getting all users data",
            data:users,
        })
    }catch(err){
        res.status(500).send(err.message);
    }
};

exports.getOneUser =async (req,res)=>{
    try{
        const {id}= req.params;
        const user=await User.findById(id);
        if(!user){
            return res.status(404).send("no user with this id");

        }else {
            return res.status(200).json({
                msg: "Get with success",
                data: user,
              });
        }
        } catch (error){
            res.status(500).send(error.message);
        }
}

exports.updateOneUser =async(req,res)=> {
    try{
        const {id}=req.params
        const {firstName,lastName,email,password} =req.body;
        const updated_user =await User.findOneAndUpdate(
            {_id:id},
            {
                firstName,
                lastName,
                email,
                password,          
            },
            {new :true,useFindAndModify:false}
        );
        res.status(200).json({
            msg : "Update with success",
            data : updated_user,
        })
    }catch (error){
        res.status(500).send(error.message)

    }
}
exports.deleteUser = async (req, res)=>{
    try {
        const {id} = req.params;
        const user = await User.findOne({_id:id})
        if(!user){
            return res.status(404).send("no user found Homie")
        }
        await User.deleteOne({_id:id})
        return res.status(200).send(`deleted successfully`)
    } catch (error){
        res.status(500).send(error.message)
    }
}

exports.createUser = async (req, res) => {
    try {
      const { firstName, lastName, email, password} = req.body;
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        

      });
      const savedUser = await newUser.save();
      res.status(201).json({
        msg: "User created with success",
        data: savedUser,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };