import jwt from 'jsonwebtoken';
import secret from '../config/auth.config.js';
import db from '../models/index.js';

const User = db.users;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
          message: "No token provided!"
        });
    }
    jwt.verify(token, secret.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
              message: "Unauthorized!"
            });
          }
          req.userId = decoded.id;
          next();
    })

}

const idAdmin = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
        res.status(403).send({
        message: "Require Admin Role!"
        });
        return;
    }catch(err){
        res.status(404).json({message:err})
    }
}
const isModerator  = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }
        res.status(403).send({
        message: "Require Moderator Role!"
        });
        return;
    }catch(err){
        res.status(404).json({message:err})
    }
}
const isModeratorOrAdmin  = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
            if (roles[i].name === "admin") {
                next();
                return;
              }
          }
        res.status(403).send({
        message: "Require Moderator or Admin Role!"
        });
        return;
    }catch(err){
        res.status(404).json({message:err})
    }
}

const authJwt = {
    verifyToken,
    idAdmin,
    isModerator,
    isModeratorOrAdmin
}

export default authJwt;
