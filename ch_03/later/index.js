const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const Article = require('./db').Article

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/articles', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err)
        res.send(articles)
    })
})

app.post('/articles', (req, res, next) => {
    const article = { 
        title: req.body.title,
        content: req.body.content,
    }
    console.log('Creating article: ', req.body.title)
    Article.create(article, (err) => {
        if(err) return next(err)
        res.send(article)
    })

})

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id
    console.log('Fetching: ', id)
    Article.find(id, (err, article) => {
        if(err) return next(err)
        res.send(article)
    })
})

app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id
    console.log('Deleting: ', id)
    Article.delete(id, (err) => {
        if(err) return next(err)
        res.send
    })
    delete articles[id]
    res.send({ message: 'Deleted'})
})

app.listen(port, () => {
    console.log(`Express web app available at localhost: ${port}`)
})

module.exports = app
