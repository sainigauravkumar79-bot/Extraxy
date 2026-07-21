import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import DocumentUpload from '../components/DocumentUpload';
import SubscriptionPlans from '../components/SubscriptionPlans';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [stats, setStats] = useState({ total: 0, extracted: 0 });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await api.get('/documents');
      setDocuments(res.data);
      setStats({
        total: res.data.length,
        extracted: res.data.filter(d => d.status === 'processed').length
      });
    } catch (err) {
      toast.error('Failed to load documents');
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 neon-glow">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass p-6 rounded-2xl">
          <p className="text-sm text-gray-400">Total Documents</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <p className="text-sm text-gray-400">Extracted</p>
          <p className="text-3xl font-bold">{stats.extracted}</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <p className="text-sm text-gray-400">Credits Left</p>
          <p className="text-3xl font-bold">{user?.credits || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Upload Document</h2>
          <DocumentUpload onUploadSuccess={fetchDocuments} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Subscription Plans</h2>
          <SubscriptionPlans />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Documents</h2>
        <div className="glass rounded-2xl overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/10">
              <tr>
                <th className="p-4">Filename</th>
                <th className="p-4">Template</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {documents.slice(0, 5).map(doc => (
                <tr key={doc.id} className="border-b border-white/5">
                  <td className="p-4">{doc.filename}</td>
                  <td className="p-4">{doc.template_id}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${doc.status === 'processed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="p-4">{new Date(doc.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
