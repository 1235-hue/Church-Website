const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { authRequired } = require('../middleware/auth');
const ctrl = require('../controllers/authController');

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Public self-registration (always creates role=user)
 */
router.post(
  '/register',
  [
    body('full_name').isString().isLength({ min: 2, max: 120 }),
    body('email').isEmail(),
    body('phone').isString().isLength({ min: 6, max: 40 }),
    body('password').isLength({ min: 6 }),
  ],
  validate,
  ctrl.register
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login (role determined by database, not request body)
 */
router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  validate,
  ctrl.login
);

/**
 * @openapi
 * /auth/google:
 *   post:
 *     tags: [Auth]
 *     summary: Sync a Supabase Google sign-in to our users table
 *     description: |
 *       Frontend completes Google OAuth via Supabase, then posts the user's
 *       email + full_name here. Returns our app JWT with the role from the DB.
 */
router.post(
  '/google',
  [body('email').isEmail()],
  validate,
  ctrl.googleSync
);

router.get('/me', authRequired, ctrl.me);


router.get('/profile', authRequired, ctrl.getProfile);
router.put(
  '/profile',
  authRequired,
  [
    body('full_name').optional().isString().isLength({ min: 2, max: 120 }),
    body('phone').optional({ nullable: true }).isString().isLength({ max: 40 }),
  ],
  validate,
  ctrl.updateProfile
);
router.put(
  '/password',
  authRequired,
  [
    body('current_password').isString().isLength({ min: 1 }),
    body('new_password').isLength({ min: 6 }),
  ],
  validate,
  ctrl.updatePassword
);

module.exports = router;
