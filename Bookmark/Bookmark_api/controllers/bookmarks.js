const express = require('express')
const bookmarks = express.Router()
const Bookmark = require("../models/bookmark.js")


//Seed Route
bookmarks.get("/seed", (req, res) => {
    Bookmark.create({title: "wowwow"},
    (err, createdBookmark) => {
        res.json(createdBookmark)
    })
})

//INDEX
bookmarks.get('/', (req, res)=> {
    Bookmark.find({}, (err, foundBookmarks)=> {
        if(err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(foundBookmarks)
    })
})

//Delete
bookmarks.delete('/:id', (req, res)=> {
    Bookmark.findByIdAndRemove(req.params.id, (err, deletedBookmark)=> {
        if (err) {
            res.status(400).json({error: err.message})
        }
        if(deletedBookmark) {
            res.status(200).json(deletedBookmark)
        }else {
            res.status(404).json({error: "Bookmark Not Found"})
        }
    })
})

//UPDATE

bookmarks.put('/:id', (req, res)=> {
    Bookmark.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedBookmark)=> {
        if (err) {
            res.status(400).json({ error: err.message})
        }
        res.status(200).json(updatedBookmark)
    })
})

//CREATE

bookmarks.post('/', (req, res)=> {
    Bookmark.create(req.body, (error, createdBookmark)=> {
        if(error) {
            res.status(400).json({error: error.message})
        }
        res.status(200).json(createdBookmark)
    })
})

module.exports = bookmarks