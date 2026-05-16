const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { authRequired, requireRole } = require('../middleware/auth');
const ctrl = require('../controllers/eventController');

router.get('/', ctrl.list);

router.post(
  '/',
  authRequired, requireRole('admin'),
  [
    body('title').isString().isLength({ min: 1, max: 160 }),
    body('starts_at').isISO8601(),
  ],
  validate,
  ctrl.create
);

router.put('/:id', authRequired, requireRole('admin','staff'), ctrl.update);
router.delete('/:id', authRequired, requireRole('admin'), ctrl.remove);

module.exports = router;
