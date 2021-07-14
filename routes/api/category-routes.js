const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include:[{model:Product}]
    });
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include:[{model:Product}]
    });

    if(!categoryData){
      res.status(404).json({message:'No category with this id!'});
      return;
    }

    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});
router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category)=>{
      res.status(200).json(category);
    })
    .catch((err)=>{
      res.status(500).json(err);
    })
});
router.put('/:id', async (req, res) => {
  console.log("We HIT here ID",req.params.id);
  // update a category by its `id` value
  Category.update(req.body,{
    where:{
      id:req.params.id
    }
  })
  .then((category)=>{
    res.status(200).json(category);
  })
  .catch((err)=>{
    res.status(500).json(err);
  })
});
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if(!categoryData){
      res.status(404).json({message:'No category with this id!'});
      return;
    }
    res.status(200).json({"message":"Category with ID:${req.params.id} has been delete",categoryData});
  } catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
