import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Documents() {
  const [docs, setDocs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const res = await api.get('/documents');
      setDocs(res.data);
    } catch (err) {
      toast.error('Failed to load documents');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this document?')) return;
    try {
      await api.delete(`/documents/${id}`);
      toast.success('Deleted');
      fetchDocs();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const filtered = docs.filter(d => d.filename.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 neon-glow">Documents</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by filename..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
        />
      </div>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-white/10">
            <tr>
              <th className="p-4">Filename</th>
              <th className="p-4">Template</th>
              <th className="p-4">Status</th>
              <th className="p-4">Extracted</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(doc => (
              <tr key={doc.id} className="border-b border-white/5">
                <td className="p-4">{doc.filename}</td>
                <td className="p-4">{doc.template_id}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${doc.status === 'processed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {doc.status}
                  </span>
                </td>
                <td className="p-4">
                  {doc.extracted_data ? Object.keys(doc.extracted_data).join(', ') : '—'}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-400 hover:text-red-600 text-sm"
                  >
                    Delete
                  </button>
                  {doc.extracted_data && (
                    <Link
                      to={`/api/export/${doc.id}/json`}
                      target="_blank"
                      className="ml-2 text-primary hover:underline text-sm"
                    >
                      Export
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
