const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { authRequired, requireRole } = require('../middleware/auth');
const ctrl = require('../controllers/itemController');

/**
 * @openapi
 * /items:
 *   get: { tags: [Items], summary: List items, responses: { 200: { description: OK } } }
 */
router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);

router.post(
  '/',
  authRequired, requireRole('admin'),
  [
    body('name').isString().isLength({ min: 1, max: 160 }),
    body('target_cost').isFloat({ gt: 0 }),
  ],
  validate,
  ctrl.create
);

router.put('/:id', authRequired, requireRole('admin','staff'), ctrl.update);
router.delete('/:id', authRequired, requireRole('admin'), ctrl.remove);

module.exports = router;
