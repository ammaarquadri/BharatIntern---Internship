const express = require('express');
const path = require('path');
const articleRouter = require("./routes/articles");
const Article = require('./models/article');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/bharatInternDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles });
});

app.use('/articles', articleRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
