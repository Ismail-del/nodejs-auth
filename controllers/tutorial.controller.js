import db from "../models/index.js";


const Tutorial = db.tutorials;

const Op = db.Sequelize.Op;

export const create = async (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      // Create a Tutorial
      const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
      };

      // Save Tutorial in the database
      try{
        const createTutorial = await Tutorial.create(tutorial);
        res.status(200).json(createTutorial);
      }catch(err){
        res.status(404).json({message:err.message})
      }
      
}

export const findAll = async (req, res) => {
  // const title = req.query.title;
  // console.log("title = ", title);
  // let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  try{
  const findAllTutorial = await Tutorial.findAll();
    // console.log("findAllTutorial = ", findAllTutorial);
    res.status(200).json(findAllTutorial);
  }catch(err){
    res.status(404).json({message:err});
  }

}
export const findOne = async (req, res) => {
  const { id } = req.params;
  if(!id){
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  try{
    const findById = await Tutorial.findAll({
        where:{
          id
        }
      });
    res.status(200).json(findById);
  }catch(err){
    res.status(404).json({message:err})
  }
  
}
export const update = async (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  if(!id){
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  try{
    const updateTutorial = await Tutorial.update({title},{
        where:{
          id
        }
      });
    res.status(200).json({message:"updated"});
  }catch(err){
    res.status(404).json({message:err})
  }
}
export const deleteTutorial = async (req, res) => {
  const { id } = req.params;
  if(!id){
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  try{
    const destroyTutorial = await Tutorial.destroy({
        where:{
          id
        }
      });
    res.status(200).json({message:"deleted success"});
  }catch(err){
    res.status(404).json({message:err})
  }
}
export const findAllPublished = (req, res) => {}