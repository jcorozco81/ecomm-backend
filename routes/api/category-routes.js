const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  router.get('/', async (req, res) => {
    try {
      const categoriesData = await Category.findAll({
        include: [{ model: Product}]});
      res.status(200).json(categoriesData);
    } catch (err) {
      res.status(500).json(err);
    }

});

// router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  router.get('/:id', async (req, res) => {
    try {
      const categoriesData = await Category.findByPk(req.params.id, {
        include: [{ model: Product}]
      });
     if (!categoriesData) {
      res.status(404).json({ message: 'No category was found with the id entered!' });
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

// router.post('/', (req, res) => {
  // create a new category
  router.post('/', async (req, res) => {
    try {
      const categoriesData = await Category.create(req.body);
      res.status(200).json(categoriesData);
    } catch (err) {
      res.status(400).json(err);
    }
});

// router.put('/:id', async (req, res) => {
  // update a category by its `id` value
// try{
//   const categoriesData = await Category.update(
//   {category_name: req.params.category_name},
//   {where: 
//     {id: req.params.id}});

//   }  catch (err) {
//       res.status(400).json(err);
//     }

// });

router.put('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoriesData[0]) {
      res.status(404).json({ message: 'No category was found with the id entered!' });
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});





router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoriesData = await Category.destroy({
      where: 
        {id: req.params.id}
    });
   if (!categoriesData) {
    res.status(404).json({ message: 'No category was found with the id entered!' });
    return;
  }
  res.status(200).json(categoriesData);
} catch (err) {
  res.status(500).json(err);
}

});






module.exports = router;
