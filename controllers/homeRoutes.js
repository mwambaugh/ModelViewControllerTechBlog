const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
console.log("here");
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
          },
        ],
      });

    // Serialize data so the template can read it
    const post = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    // res.render('homepage', { 
    //   post, 
    //   logged_in: req.session.logged_in 
    // });
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;