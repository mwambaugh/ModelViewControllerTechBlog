const router = require('express').Router();
const { where } = require('sequelize');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'content', 'date_created'],
        order: [["date_created", "DESC"]
        ],
        include: [{
            model: User,
            attributes: ["username"],
        },
        {
            model: Comment,
            attributes: ["id", "comment_text", "post_id", "user_id", "date_created"],
            include: {
                model: User,
                attributes: ["username"], 
            },
        },
        ],
    })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
            },
            attributes: ['id', 'title', 'date_created'],
            include: [{
                model: User,
                attributes: ["username"],
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "date_created"],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
            ],
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "no post"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
        res.status(500).json(err);
    });
    });

router.post("/", withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.post_content,
        user_id: req.session.user_id
    })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.put("/:id", withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        content: req.body.post_content,
    }, {
        where: {
            id: req.params.id,
        },
    })
        .then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({
                message: "no post with id"
            });
            return;
        }
        res.json(dbPostData);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "no post id"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
        res.status(500).json(err);
    });
});

module.exports = router;
