const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  // Check if user exists
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();
  if (existing) return res.status(400).json({ error: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const { data: user, error } = await supabase
    .from('users')
    .insert({ email, password: hashed, role: 'user', credits: 0 })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role, credits: user.credits } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role, credits: user.credits } });
};

exports.me = async (req, res) => {
  res.json(req.user);
};
