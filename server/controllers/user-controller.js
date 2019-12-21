const User = require('../models/user-model');

exports.signin = (req, res) => {};

exports.signup = (req, res) => {
  const {
    username,
    email,
    password,
    passwordConfirmation
  } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      errors: [{
        title: 'Missing data',
        detail: 'The email and password fields are required.'
      }]
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(400).send({
      errors: [{
        title: 'Invalid password',
        detail: 'Both password must be equal.'
      }]
    });
  }

  if (username && username.length < 4) {
    return res.status(400).send({
      errors: [{
        title: 'Username is too short',
        detail: 'The username must have at least 4 characters.'
      }]
    });
  }

  User.findOne({
    email
  }, (err, data) => {
    if (err) {
      return res.status(422).send({
        // TODO: Handle Mongoose error
      });
    }

    if (data) {
      return res.status(422).send({
        errors: [{
          title: 'Invalid email.',
          detail: 'There\'s already an account with email.'
        }]
      });
    }

    const user = new User({
      username,
      email,
      password
    });

    user.save((err) => {
      if (err) {
        // TODO: Handle Mongoose error
      }

      res.json({
        registered: true
      });
    })
  });
}
