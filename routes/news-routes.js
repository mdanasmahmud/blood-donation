const express = require('express')

const router = express.Router();

const newsList = [
    {news_id: 0, newsTitle: 'Created Website', shortDescription: 'This Website will act to help people who are in need of blood', newsDate: '10-23-2021', newsDescription: 'This Website will act to help people who are in need of blood. This took me a lot of time to think of', newsAuthor: 'Anas'},
    {news_id: 1, newsTitle: 'Will Deploy', shortDescription: 'Will Deploy this website', newsDate: '10-21-2021', newsDescription: 'Lot of things need to be made for this website to work.', newsAuthor: 'Anas'},
    {news_id: 2, newsTitle: 'Website Launched', shortDescription: 'Our website is now live!', newsDate: '10-24-2021', newsDescription: 'Our website is now live! We are excited to start our journey.', newsAuthor: 'Anas'},
    {news_id: 3, newsTitle: 'First Donation', shortDescription: 'We have received our first blood donation', newsDate: '10-25-2021', newsDescription: 'We have received our first blood donation. This is a big step for us.', newsAuthor: 'Anas'},
    {news_id: 4, newsTitle: 'Partnership Announcement', shortDescription: 'We have partnered with a local hospital', newsDate: '10-26-2021', newsDescription: 'We have partnered with a local hospital to ensure the safety of our donors and recipients.', newsAuthor: 'Anas'},
    {news_id: 5, newsTitle: 'New Features', shortDescription: 'New features have been added to the website', newsDate: '10-27-2021', newsDescription: 'New features have been added to the website to improve user experience.', newsAuthor: 'Anas'},
    {news_id: 6, newsTitle: 'Success Story', shortDescription: 'Read about our latest success story', newsDate: '10-28-2021', newsDescription: 'Read about our latest success story. This is why we do what we do.', newsAuthor: 'Anas'},
    {news_id: 7, newsTitle: 'Donor Appreciation Day', shortDescription: 'Celebrating our donors', newsDate: '10-29-2021', newsDescription: 'Celebrating our donors who make this all possible. Thank you for your generosity.', newsAuthor: 'Anas'},
    {news_id: 8, newsTitle: 'Improved Search', shortDescription: 'We have improved our donor search feature', newsDate: '10-30-2021', newsDescription: 'We have improved our donor search feature to help you find a match faster.', newsAuthor: 'Anas'},
    {news_id: 9, newsTitle: 'Mobile App Launch', shortDescription: 'Our mobile app is now available', newsDate: '10-31-2021', newsDescription: 'Our mobile app is now available. Download it today to stay updated.', newsAuthor: 'Anas'},
    {news_id: 10, newsTitle: 'Year End Review', shortDescription: 'Looking back at our achievements this year', newsDate: '11-01-2021', newsDescription: 'Looking back at our achievements this year. We couldnt have done it without you.', newsAuthor: 'Anas'},
  ];

router.get('/', (req, res, next) => {
    res.json({newsList});
});

router.get('/:news_id', (req, res, next) => {
    const newsId = Number(req.params.news_id);
    const newsOneId = newsList.find(p => {
        return p.news_id === newsId;
    })
    console.log('user requested get');
    res.json({newsOneId});
});


module.exports = router;