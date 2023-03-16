const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/', (req, res) => {
    User.findone({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: ['id', 'title', 'conetent', 'date_created'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'no user, try again'
                });
                return;
            } res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbuserData.id;
                req.session.username = dbUserData.username;
                req.session.logged_in = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

//from mini project 
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({
                    message: 'wrong username'
                });
                return;
            }

            req.session.save(() => {
                req.session.user_id = dbuserData.id;
                req.session.username - dbUserData.username;
                req.session.logged_in = true;

                res.json({ user: dbuserData, message: 'You are now logged in!' });
            });
        });

    const validPassword = dbuserData.checkPassword(req.body.password);

    if (!validPassword) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
        return;
    }

    req.session.save(() => {
        req.session.user_id = dbuserData.id;
        req.session.username - dbUserData.username;
        req.session.logged_in = true;

        res.json({ user: dbuserData, message: 'You are now logged in!' });
    });
});



router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;