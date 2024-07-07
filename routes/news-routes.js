const express = require('express')
const checkAuth = require('../middleware/check-auth')

const newsController = require('../controllers/news-controller')

const router = express.Router();

router.get('/', newsController.getAllNews);

router.get('/:news_id', newsController.getNewsById);

router.use(checkAuth)

// Only the admin can post news, but you need to add functionality first for checking if the user is an admin or not

router.delete('/deleteNews', newsController.deleteNews)

router.patch('/updateNews', newsController.updateNews)

router.post('/submitNews', newsController.postNews)



module.exports = router;