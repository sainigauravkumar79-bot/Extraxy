const supabase = require('../config/supabase');
const extractionService = require('../services/extraction.service');
const { v4: uuidv4 } = require('uuid');

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { templateId } = req.body;
    // Get template
    const { data: template, error: tmplErr } = await supabase
      .from('templates')
      .select('*')
      .eq('id', templateId)
      .single();
    if (tmplErr || !template) return res.status(404).json({ error: 'Template not found' });

    // Process extraction
    const result = await extractionService.processDocument(
      req.file.buffer,
      req.file.mimetype,
      template
    );

    // Save document record
    const docId = uuidv4();
    const { data: doc, error: docErr } = await supabase
      .from('documents')
      .insert({
        id: docId,
        user_id: req.user.id,
        template_id: templateId,
        filename: req.file.originalname,
        raw_text: result.rawText,
        extracted_data: result.extracted,
        status: 'processed',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (docErr) throw docErr;

    // Store file in Supabase storage (optional)
    const filePath = `documents/${req.user.id}/${docId}_${req.file.originalname}`;
    const { error: storageErr } = await supabase.storage
      .from('documents')
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: '3600'
      });
    if (storageErr) console.error('Storage upload error:', storageErr);

    res.status(201).json({ document: doc, extracted: result.extracted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getDocuments = async (req, res) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getDocumentById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('id', id)
    .eq('user_id', req.user.id)
    .single();
  if (error) return res.status(404).json({ error: 'Document not found' });
  res.json(data);
};

exports.deleteDocument = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', id)
    .eq('user_id', req.user.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Deleted' });
};
