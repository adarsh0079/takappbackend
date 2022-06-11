const router = require("express").Router();
const articleController=require('../controllers/article')


router.post("/",articleController.postArticle);
router.post("/filter", articleController.filter);


module.exports = router;
