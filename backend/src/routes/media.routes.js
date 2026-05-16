const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { authRequired, requireRole } = require('../middleware/auth');
const ctrl = require('../controllers/mediaController');

router.get('/', ctrl.list);

router.post(
  '/',
  authRequired, requireRole('admin','staff'),
  [body('image_url').isURL()],
  validate,
  ctrl.create
);

router.delete('/:id', authRequired, requireRole('admin'), ctrl.remove);

module.exports = router;
