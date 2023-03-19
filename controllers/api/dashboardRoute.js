// const router = require('express').Router();
// const { Post, User, Comment } = require('../models');
// const withAuth = require('../../utils/auth');

// router.get('/', withAuth, (req, res) => {
//   Post.findAll({
//     where: {
//       user_id: req.session.user_id
//     },
//     attributes: [
//       'id',
//       'content',
//       'title',
//       'date_created'
//     ],
//     include: [
//       {
//         model: Comment,
//         attributes: ['id', 'content', 'post_id', 'user_id', 'date_created'],
//         include: {
//           model: User,
//           attributes: ['name']
//         }
//       },
//       {
//         model: User,
//         attributes: ['name']
//       }
//     ]
//   })
//     .then(dbPostData => {
//       const posts = dbPostData.map(post => post.get({ plain: true }));
//       res.render('dashboard', { posts, loggedIn: true, name: req.session.name });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.get('/edit/:id', withAuth, (req, res) => {
//   Post.findByPk(req.params.id, {
//     attributes: [
//       'id',
//       'content',
//       'title',
//       'date_created'
//     ],
//     include: [
//       {
//         model: Comment,
//         attributes: ['id', 'content', 'post_id', 'user_id', 'date_created'],
//         include: {
//           model: User,
//           attributes: ['name']
//         }
//       },
//       {
//         model: User,
//         attributes: ['name']
//       }
//     ]
//   })
//     .then(dbPostData => {
//       if (dbPostData) {
//         const post = dbPostData.get({ plain: true });
        
//         res.render('edit-post', {
//           post,
//           loggedIn: true,
//           username: req.session.name
//         });
//       } else {
//         res.status(404).end();
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

// module.exports = router;