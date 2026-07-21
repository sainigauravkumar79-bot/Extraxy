const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');
const { extractWithRegex } = require('../utils/regex.patterns');

class ExtractionService {
  // Extract text from file buffer using OCR or PDF parsing
  async extractText(fileBuffer, mimeType) {
    if (mimeType === 'application/pdf') {
      const data = await pdfParse(fileBuffer);
      return data.text;
    } else if (mimeType.startsWith('image/')) {
      const { data: { text } } = await Tesseract.recognize(fileBuffer, 'eng+hin', {
        logger: m => console.log(m)
      });
      return text;
    } else {
      throw new Error('Unsupported file type');
    }
  }

  // Apply rule-based + regex extraction based on template
  async extractFields(text, template) {
    const fields = {};
    for (const field of template.fields) {
      if (field.type === 'regex') {
        const regex = new RegExp(field.pattern, 'gi');
        const match = text.match(regex);
        fields[field.name] = match ? match.join(', ') : '';
      } else if (field.type === 'rule') {
        // Custom rule: e.g., find after a keyword
        const lines = text.split('\n');
        let value = '';
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(field.keyword)) {
            value = lines[i].replace(field.keyword, '').trim();
            break;
          }
        }
        fields[field.name] = value;
      } else if (field.type === 'position') {
        // Extract based on line/column positions (simplified)
        const lines = text.split('\n');
        if (lines[field.line]) {
          fields[field.name] = lines[field.line].slice(field.start, field.end).trim();
        }
      }
    }
    return fields;
  }

  // Main entry
  async processDocument(fileBuffer, mimeType, template) {
    const rawText = await this.extractText(fileBuffer, mimeType);
    const extracted = await this.extractFields(rawText, template);
    return { rawText, extracted };
  }
}

module.exports = new ExtractionService();
