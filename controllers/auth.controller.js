import db from '../models/index.js';
import secret from '../config/auth.config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const User = db.users;
const Role = db.roles;

const Op = db.Sequelize.Op;

export const signUp = async (req, res) => {
    try{
    const user = await User.create({
            username:req.body.username,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password, 8)
        })
    if(req.body.roles){
     const roles = await Role.findAll({
            where:{
                name:req.body.roles
            }
        }) 
        await user.setRoles(roles);
        // icis
        res.send({message:"User was registred successfully first"})
    }else{
        await user.setRoles([1])
        res.send({message:"User was registred successfully second"})
    }
    }catch(err){
        res.status(500).send({message:err})
    }
    
}

export const signIn = async (req, res) => {
    try{
        const user = await User.findOne({
            where:{
                username:req.body.username
            }
        })
        if(!user){
            return res.status(404).send({message:'user not found'});
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken:null,
                message:'Invalid password'
            })
        }
        const token = jwt.sign({id:user.id}, secret.secret, {
            expiresIn:86400
        })
        const authorities = [];
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          });

    }catch(err){
        res.status(500).send({ message: err.message });
    }
}