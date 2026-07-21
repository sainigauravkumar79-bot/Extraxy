const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const documentController = require('../controllers/document.controller');

router.post('/upload', auth, upload.single('file'), documentController.uploadDocument);
router.get('/', auth, documentController.getDocuments);
router.get('/:id', auth, documentController.getDocumentById);
router.delete('/:id', auth, documentController.deleteDocument);

module.exports = router;
