const router = require('express').Router();
// Webhook endpoints (e.g., for Stripe)
router.post('/stripe', (req, res) => {
  // handle stripe webhook
  res.sendStatus(200);
});

module.exports = router;
