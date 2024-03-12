const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Models

// API Routes
app.get('/api/users', (req, res) => {
    User.find({})
        .populate('thoughts')
        .populate('friends')
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
});

app.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .populate('thoughts')
        .populate('friends')
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});

app.post('/api/users', (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});

app.put('/api/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});

app.delete('/api/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            // Remove user's associated thoughts
            return Thought.deleteMany({ _id: { $in: user.thoughts } });
        })
        .then(() => res.json({ message: 'User and associated thoughts deleted' }))
        .catch(err => res.status(500).json(err));
});

app.post('/api/users/:userId/friends/:friendId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true })
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});

app.delete('/api/users/:userId/friends/:friendId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true })
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});

app.get('/api/thoughts', (req, res) => {
    Thought.find({})
        .populate('reactions')
        .then(thoughts => res.json(thoughts))
        .catch(err => res.status(500).json(err));
});

app.get('/api/thoughts/:id', (req, res) => {
    Thought.findById(req.params.id)
        .populate('reactions')
        .then(thought => res.json(thought))
        .catch(err => res.status(500).json(err));
});

app.post('/api/thoughts', (req, res) => {
    Thought.create(req.body)
        .then(thought => {
            return User.findByIdAndUpdate(thought.userId, { $push: { thoughts: thought._id } }, { new: true });
        })
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});

app.put('/api/thoughts/:id', (req, res) => {
    Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(thought => res.json(thought))
        .catch(err => res.status(500).json(err));
});

app.delete('/api/thoughts/:id', (req, res) => {
    Thought.findByIdAndDelete(req.params.id)
        .then(thought => res.json(thought))
        .catch(err => res.status(500).json(err));
});

app.post('/api/thoughts/:thoughtId/reactions', (req, res) => {
    Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true })
        .then(thought => res.json(thought))
        .catch(err => res.status(500).json(err));
});

app.delete('/api/thoughts/:thoughtId/reactions/:reactionId', (req, res) => {
    Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true })
        .then(thought => res.json(thought))
        .catch(err => res.status(500).json(err));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});