const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const exportController = require('../controllers/export.controller');

router.get('/:documentId/:format', auth, exportController.exportDocument);

module.exports = router;
