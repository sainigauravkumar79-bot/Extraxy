import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState([]);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    fetchPlans();
    fetchCurrent();
  }, []);

  const fetchPlans = async () => {
    const res = await api.get('/subscription/plans');
    setPlans(Object.entries(res.data).map(([key, val]) => ({ key, ...val })));
  };

  const fetchCurrent = async () => {
    try {
      const res = await api.get('/subscription/my');
      setCurrent(res.data);
    } catch {}
  };

  const handleSubscribe = async (planKey) => {
    try {
      await api.post('/subscription/subscribe', { planKey });
      toast.success('Subscribed successfully!');
      fetchCurrent();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Subscription failed');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {plans.map(plan => (
        <div key={plan.key} className="glass p-6 rounded-2xl text-center border border-white/10 hover:border-primary transition">
          <h3 className="text-xl font-bold">{plan.key} credits</h3>
          <p className="text-3xl font-bold text-primary mt-2">${plan.price}</p>
          <p className="text-sm text-gray-400">per month</p>
          <button
            onClick={() => handleSubscribe(plan.key)}
            className="mt-4 w-full bg-primary hover:bg-primary/80 text-white font-semibold py-2 rounded-lg transition"
          >
            {current?.plan === plan.key ? 'Active' : 'Subscribe'}
          </button>
        </div>
      ))}
    </div>
  );
}
