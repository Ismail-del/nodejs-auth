import db from '../models/index.js'

const ROLES = db.ROLES;
const User = db.users;

const checkDuplicateUserNameOrEmail = async (req, res, next) => {
    try{
    const user = await User.findOne({
            where:{
                username:req.body.username
            }
        })
        if (user) {
            res.status(400).send({
              message: "Failed! Username is already in use!"
            });
            return;
        }
    const userEmail = await User.findOne({
        where:{
            email:req.body.email
        }
    })
    if (userEmail) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }
          
    }catch(err){
        res.status(404).json({
            message:err
        })
    }
    next();
}

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
          if (!ROLES.includes(req.body.roles[i])) {
            res.status(400).send({
              message: "Failed! Role does not exist = " + req.body.roles[i]
            });
            return;
          }
        }
      }
      
      next(); 
}

const verifySignUp = {
    checkDuplicateUserNameOrEmail,
    checkRolesExisted
  };

export default verifySignUp;