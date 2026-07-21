const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const subscriptionController = require('../controllers/subscription.controller');

router.get('/plans', subscriptionController.getPlans);
router.post('/subscribe', auth, subscriptionController.subscribe);
router.get('/my', auth, subscriptionController.getSubscription);

module.exports = router;
