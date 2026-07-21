const exportService = require('../services/export.service');

exports.exportDocument = async (req, res) => {
  const { documentId, format } = req.params; // format: csv, excel, json, xml, sheets
  // Fetch document from DB
  const supabase = require('../config/supabase');
  const { data: doc, error } = await supabase
    .from('documents')
    .select('*')
    .eq('id', documentId)
    .eq('user_id', req.user.id)
    .single();
  if (error || !doc) return res.status(404).json({ error: 'Document not found' });

  const extracted = doc.extracted_data || {};
  const filename = `${doc.filename.split('.')[0]}_export`;

  let fileContent, mimeType;
  switch (format) {
    case 'csv':
      fileContent = await exportService.toCSV(extracted);
      mimeType = 'text/csv';
      break;
    case 'excel':
      fileContent = await exportService.toExcel(extracted);
      mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      break;
    case 'json':
      fileContent = JSON.stringify(extracted, null, 2);
      mimeType = 'application/json';
      break;
    case 'xml':
      fileContent = await exportService.toXML(extracted);
      mimeType = 'application/xml';
      break;
    case 'sheets':
      // Google Sheets integration (needs OAuth) - placeholder
      const url = await exportService.toGoogleSheets(extracted, req.user);
      return res.json({ url });
    default:
      return res.status(400).json({ error: 'Unsupported format' });
  }

  res.setHeader('Content-Disposition', `attachment; filename=${filename}.${format === 'excel' ? 'xlsx' : format}`);
  res.setHeader('Content-Type', mimeType);
  res.send(fileContent);
};
