import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState({ name: '', fields: [{ name: '', type: 'regex', pattern: '', keyword: '', line: 0, start: 0, end: 0 }] });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const res = await api.get('/templates');
    setTemplates(res.data);
  };

  const handleFieldChange = (index, key, value) => {
    const newFields = [...form.fields];
    newFields[index][key] = value;
    setForm({ ...form, fields: newFields });
  };

  const addField = () => {
    setForm({
      ...form,
      fields: [...form.fields, { name: '', type: 'regex', pattern: '', keyword: '', line: 0, start: 0, end: 0 }]
    });
  };

  const removeField = (index) => {
    const newFields = form.fields.filter((_, i) => i !== index);
    setForm({ ...form, fields: newFields });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || form.fields.some(f => !f.name)) {
      toast.error('Name and all field names are required');
      return;
    }
    try {
      if (editingId) {
        await api.put(`/templates/${editingId}`, form);
        toast.success('Template updated');
      } else {
        await api.post('/templates', form);
        toast.success('Template created');
      }
      fetchTemplates();
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Operation failed');
    }
  };

  const resetForm = () => {
    setForm({ name: '', fields: [{ name: '', type: 'regex', pattern: '', keyword: '', line: 0, start: 0, end: 0 }] });
    setEditingId(null);
  };

  const editTemplate = (t) => {
    setForm({ name: t.name, fields: t.fields });
    setEditingId(t.id);
  };

  const deleteTemplate = async (id) => {
    if (!confirm('Delete template?')) return;
    await api.delete(`/templates/${id}`);
    toast.success('Deleted');
    fetchTemplates();
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 neon-glow">Templates</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-4">{editingId ? 'Edit' : 'Create'} Template</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Template Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white"
              required
            />
            <div className="space-y-2">
              {form.fields.map((field, idx) => (
                <div key={idx} className="bg-dark/50 p-3 rounded-lg border border-white/5 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Field Name"
                      value={field.name}
                      onChange={(e) => handleFieldChange(idx, 'name', e.target.value)}
                      className="flex-1 bg-dark border border-white/10 rounded px-2 py-1 text-white text-sm"
                    />
                    <select
                      value={field.type}
                      onChange={(e) => handleFieldChange(idx, 'type', e.target.value)}
                      className="bg-dark border border-white/10 rounded px-2 py-1 text-white text-sm"
                    >
                      <option value="regex">Regex</option>
                      <option value="rule">Rule (keyword)</option>
                      <option value="position">Position</option>
                    </select>
                    <button type="button" onClick={() => removeField(idx)} className="text-red-400">✕</button>
                  </div>
                  {field.type === 'regex' && (
                    <input
                      type="text"
                      placeholder="Regex pattern"
                      value={field.pattern}
                      onChange={(e) => handleFieldChange(idx, 'pattern', e.target.value)}
                      className="w-full bg-dark border border-white/10 rounded px-2 py-1 text-white text-sm"
                    />
                  )}
                  {field.type === 'rule' && (
                    <input
                      type="text"
                      placeholder="Keyword (e.g., 'Invoice Number:')"
                      value={field.keyword}
                      onChange={(e) => handleFieldChange(idx, 'keyword', e.target.value)}
                      className="w-full bg-dark border border-white/10 rounded px-2 py-1 text-white text-sm"
                    />
                  )}
                  {field.type === 'position' && (
                    <div className="flex gap-2">
                      <input type="number" placeholder="Line" value={field.line} onChange={(e) => handleFieldChange(idx, 'line', Number(e.target.value))} className="w-20 bg-dark border border-white/10 rounded px-2 py-1 text-white text-sm" />
                      <input type="number" placeholder="Start" value={field.start} onChange={(e) => handleFieldChange(idx, 'start', Number(e.target.value))} className="w-20 bg-dark border border-white/10 rounded px-2 py-1 text-white text-sm" />
                      <input type="number" placeholder="End" value={field.end} onChange={(e) => handleFieldChange(idx, 'end', Number(e.target.value))} className="w-20 bg-dark border border-white/10 rounded px-2 py-1 text-white text-sm" />
                    </div>
                  )}
                </div>
              ))}
              <button type="button" onClick={addField} className="text-primary hover:underline text-sm">+ Add Field</button>
            </div>
            <div className="flex gap-4">
              <button type="submit" className="bg-primary hover:bg-primary/80 text-white font-semibold py-2 px-6 rounded-lg transition">
                {editingId ? 'Update' : 'Create'}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Templates</h2>
          <div className="space-y-2">
            {templates.map(t => (
              <div key={t.id} className="glass p-4 rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.fields.length} fields</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => editTemplate(t)} className="text-primary hover:underline text-sm">Edit</button>
                  <button onClick={() => deleteTemplate(t.id)} className="text-red-400 hover:text-red-600 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
