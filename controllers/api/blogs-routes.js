const router = require('express').Router();
const { User, Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postsData = await Blog.findAll();
        res.status(200).json(postsData);
    } catch (error) {
        res.status(400).json(error);
    }
});
/*
router.get('/user/:id', withAuth, async (req, res) => {
    try {
        const postsData = await Blog.findAll({
            where: {user_id: req.params.id},
            include: [{all: true, nested: true}],
        });

        res.status(200).json(postsData);
    } catch (error) {
        res.status(400).json(error);
    }
});*/

router.get('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Blog.findByPk(req.params.id, {
            include: [{ all: true, nested: true }],
        });

        const post = postData.get({ plain: true });
        res.status(200).json(postData);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newPostData = await Blog.create({
            user_id: req.session.user_id,
            title: req.body.title,
            description: req.body.description,
        });
        res.status(200).json(newPostData);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Blog.update(req.body,
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;