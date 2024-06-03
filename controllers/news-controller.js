const { v4: uuidv4 } = require('uuid');

const News = require('../models/news-model')

const HttpError = require('../models/http-error')

  const getAllNews = async (req, res, next) => {
    let news;
    try {
        news = await News.find({});
    } catch (err) {
        const error = new HttpError(
            'Fetching news failed, please try again later', 500
        );
        return next(error);
    }

    res.json({news: news.map(item => item.toObject({ getters: true }))});
};

const getNewsById = async (req, res, next) => {
    const newsId = req.params.news_id;

    let news;
    try {
        news = await News.findOne({ _id: newsId });
    } catch (err) {
        const error = new HttpError(
            'Fetching news failed, please try again later', 500
        );
        return next(error);
    }

    if (!news) {
        const error = new HttpError(
            'Could not find a news for the provided id.', 404
        );
        return next(error);
    }

    res.json({news: news.toObject({ getters: true })});
};

// Admin can post news using the admin pannel that will be the use of posting news

const postNews = async (req, res, next) => {
    const {newsTitle, shortDescription, newsDate, newsDescription, newsAuthor} = req.body;

    const newNews = new News({
        newsTitle,
        shortDescription,
        newsDate,
        newsDescription,
        newsAuthor
    })

    try{
        await newNews.save()
    } catch (err) {
        const error = new HttpError(
            "Creating blood doner failed", 500
        )
        return next(error)
    }

    res.status(201).json(newNews)

}

const updateNews = async (req, res, next) => {
    const {news_id, newsTitle, shortDescription, newsDescription} = req.body;

    let news;
    try {
        news = await News.findOneAndUpdate({ _id: news_id }, { newsTitle, shortDescription, newsDescription }, { new: true });
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not update news.", 500
        );
        return next(error);
    }

    if (!news) {
        const error = new HttpError(
            "Could not find news for this id.", 404
        );
        return next(error);
    }

    res.status(200).json({ news: news.toObject({ getters: true }) });
};

const deleteNews = async (req, res, next) => {
    const {news_id} = req.body;

    let news;
    try {
        news = await News.findOneAndRemove({ _id: news_id });
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not delete news.", 500
        );
        return next(error);
    }

    if (!news) {
        const error = new HttpError(
            "Could not find news for this id.", 404
        );
        return next(error);
    }

    res.status(200).json({ message: "News deleted." });
};

exports.getAllNews =  getAllNews
exports.getNewsById = getNewsById
exports.postNews = postNews
exports.updateNews = updateNews
exports.deleteNews = deleteNews