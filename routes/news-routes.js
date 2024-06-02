const express = require('express')

const newsController = require('../controllers/news-controller')

const router = express.Router();

router.delete('/deleteNews', newsController.deleteNews)

router.patch('/updateNews', newsController.updateNews)

router.post('/submitNews', newsController.postNews)

router.get('/', newsController.getAllNews);

router.get('/:news_id', newsController.getNewsById);

module.exports = router;