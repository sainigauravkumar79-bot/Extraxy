import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function DocumentUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await api.get('/templates');
      setTemplates(res.data);
      if (res.data.length > 0) setSelectedTemplate(res.data[0].id);
    } catch (err) {
      toast.error('Failed to load templates');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !selectedTemplate) {
      toast.error('Please select a file and template');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('templateId', selectedTemplate);

    setLoading(true);
    try {
      const res = await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Document processed successfully!');
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
      // Show extracted data
      console.log(res.data.extracted);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-6 rounded-2xl">
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Select Template</label>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
          >
            {templates.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Choose File (PDF, JPG, PNG, TIFF)</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.tiff"
            onChange={handleFileChange}
            className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-white hover:file:bg-primary/80"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !file}
          className="w-full bg-primary hover:bg-primary/80 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Upload & Extract'}
        </button>
      </form>
    </div>
  );
}
