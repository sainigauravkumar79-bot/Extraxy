import React from 'react';

export default function Settings() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 neon-glow">Settings</h1>
      <div className="glass p-6 rounded-2xl max-w-2xl">
        <p className="text-gray-400">Account management, API keys, webhook configuration, and more.</p>
        {/* Add actual settings form here */}
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-400">API Key</label>
            <input type="text" readOnly value="sk_test_xxxxxxxxxxxx" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-400">Webhook URL</label>
            <input type="text" placeholder="https://your-app.com/webhook" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-white" />
          </div>
          <button className="bg-primary hover:bg-primary/80 text-white font-semibold py-2 px-6 rounded-lg transition">Save</button>
        </div>
      </div>
    </div>
  );
}
