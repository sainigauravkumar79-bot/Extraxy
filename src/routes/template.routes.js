const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const templateController = require('../controllers/template.controller');

router.post('/', auth, templateController.createTemplate);
router.get('/', auth, templateController.getTemplates);
router.put('/:id', auth, templateController.updateTemplate);
router.delete('/:id', auth, templateController.deleteTemplate);

module.exports = router;
