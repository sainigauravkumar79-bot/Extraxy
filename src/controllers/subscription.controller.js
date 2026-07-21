const supabase = require('../config/supabase');

const PLANS = {
  '100': { credits: 100, price: 17 },
  '1000': { credits: 1000, price: 59 },
  '10000': { credits: 10000, price: 139 }
};

exports.getPlans = (req, res) => {
  res.json(PLANS);
};

exports.subscribe = async (req, res) => {
  const { planKey } = req.body; // '100', '1000', '10000'
  const plan = PLANS[planKey];
  if (!plan) return res.status(400).json({ error: 'Invalid plan' });

  // In real app, integrate Stripe/PayPal here
  // For demo, we just create a subscription record
  const { data, error } = await supabase
    .from('subscriptions')
    .insert({
      user_id: req.user.id,
      plan: planKey,
      credits: plan.credits,
      status: 'active',
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 30*24*60*60*1000).toISOString()
    })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  // Update user's credits
  await supabase
    .from('users')
    .update({ credits: plan.credits })
    .eq('id', req.user.id);

  res.json({ subscription: data });
};

exports.getSubscription = async (req, res) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  if (error && error.code !== 'PGRST116') return res.status(500).json({ error: error.message });
  res.json(data || {});
};
