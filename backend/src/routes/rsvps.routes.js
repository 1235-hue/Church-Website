const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { authRequired, requireRole } = require('../middleware/auth');
const ctrl = require('../controllers/rsvpController');

/**
 * @openapi
 * /rsvps:
 *   post:
 *     tags: [RSVPs]
 *     summary: Public RSVP for the event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [full_name, email]
 *             properties:
 *               full_name: { type: string }
 *               email: { type: string }
 *               phone: { type: string }
 *               guests: { type: integer, minimum: 1, maximum: 20 }
 *               message: { type: string }
 *     responses: { 201: { description: Created } }
 */
router.post(
  '/',
  [
    body('full_name').isString().trim().isLength({ min: 1, max: 160 }),
    body('email').isEmail(),
    body('guests').optional().isInt({ min: 1, max: 20 }),
  ],
  validate,
  ctrl.create
);

router.get('/stats', ctrl.stats);
router.get('/me', authRequired, ctrl.mine);
router.get('/', authRequired, requireRole('admin','staff'), ctrl.list);
router.delete('/:id', authRequired, requireRole('admin'), ctrl.remove);

module.exports = router;
