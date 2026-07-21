const supabase = require('../config/supabase');
const { v4: uuidv4 } = require('uuid');

exports.createTemplate = async (req, res) => {
  const { name, fields } = req.body;
  if (!name || !fields) return res.status(400).json({ error: 'Name and fields required' });

  const id = uuidv4();
  const { data, error } = await supabase
    .from('templates')
    .insert({
      id,
      user_id: req.user.id,
      name,
      fields,
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
};

exports.getTemplates = async (req, res) => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.updateTemplate = async (req, res) => {
  const { id } = req.params;
  const { name, fields } = req.body;
  const { data, error } = await supabase
    .from('templates')
    .update({ name, fields, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', req.user.id)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.deleteTemplate = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('id', id)
    .eq('user_id', req.user.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Deleted' });
};
