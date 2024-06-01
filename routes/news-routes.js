const express = require('express')

const newsController = require('../controllers/news-controller')

const router = express.Router();

router.post('/submitNews', newsController.postNews)

router.get('/', newsController.getAllNews);

router.get('/:news_id', newsController.getNewsById);

module.exports = router;