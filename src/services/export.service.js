const { Parser } = require('json2csv');
const XLSX = require('xlsx');
const xml2js = require('xml2js');
const { google } = require('googleapis');

exports.toCSV = async (data) => {
  const parser = new Parser({ header: true });
  return parser.parse([data]); // single row
};

exports.toExcel = async (data) => {
  const ws = XLSX.utils.json_to_sheet([data]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Extracted');
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
};

exports.toXML = async (data) => {
  const builder = new xml2js.Builder();
  return builder.buildObject({ root: data });
};

exports.toGoogleSheets = async (data, user) => {
  // Would require OAuth2 setup – simplified placeholder
  // In real, use refresh token to append to a sheet
  return 'https://docs.google.com/spreadsheets/d/your-sheet-id';
};
