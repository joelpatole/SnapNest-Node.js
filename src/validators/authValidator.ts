import { check } from 'express-validator';

export const signupValidator = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  check('name', 'Name is required').not().isEmpty(),
  check('mobile', 'Mobile No is required').not().isEmpty()
];
