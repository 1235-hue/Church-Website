const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { authRequired, requireRole } = require('../middleware/auth');
const ctrl = require('../controllers/contributionController');

/**
 * @openapi
 * /contributions:
 *   get:
 *     tags: [Contributions]
 *     summary: List recent contributions (public)
 *     responses: { 200: { description: OK } }
 */
router.get('/', authRequired, ctrl.listContributions);

/**
 * @openapi
 * /contributions/summary:
 *   get:
 *     tags: [Contributions]
 *     summary: Goal vs total raised (public)
 *     responses: { 200: { description: OK } }
 */
router.get('/summary', ctrl.summary);

/**
 * @openapi
 * /contributions:
 *   post:
 *     tags: [Contributions]
 *     summary: Record a contribution (admin/staff)
 *     security: [{ bearerAuth: [] }]
 */
router.post(
  '/',
  authRequired,
  requireRole('admin', 'staff'),
  [
    body('contributor').isString().trim().isLength({ min: 1, max: 160 }),
    body('amount').isFloat({ gt: 0 }),
    body('method').optional().isIn(['cash','bank','mobile_money','card','other']),
  ],
  validate,
  ctrl.createContribution
);

router.delete('/:id', authRequired, requireRole('admin'), ctrl.deleteContribution);

/**
 * @openapi
 * /contributions/goal:
 *   put:
 *     tags: [Contributions]
 *     summary: Update fundraiser goal (admin)
 *     security: [{ bearerAuth: [] }]
 */
router.put(
  '/goal',
  authRequired,
  requireRole('admin'),
  [
    body('title').isString().isLength({ min: 1, max: 160 }),
    body('goal_amount').isFloat({ gt: 0 }),
    body('event_date').isISO8601(),
  ],
  validate,
  ctrl.updateGoal
);

module.exports = router;
