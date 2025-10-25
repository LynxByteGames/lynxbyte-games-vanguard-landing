import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Props = {
  className?: string;
};

const NewsletterForm: React.FC<Props> = ({ className }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [already, setAlready] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const apiMsg = typeof data?.error === 'string' ? data.error : 'Subscription failed';
        throw new Error(apiMsg);
      }
      setAlready(!!data?.alreadySubscribed);
      setSuccess(true);
      setEmail('');
      setName('');
    } catch (err: any) {
      setError(err?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            className="bg-white text-gray-900"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            required
            className="bg-white text-gray-900"
            placeholder="you@studio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading} className="bg-lynx-pink hover:bg-lynx-pink-hover text-white">
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
      {success && !already && <p className="mt-2 text-green-400 text-sm">Thanks! Please check your inbox to confirm subscription.</p>}
      {success && already && <p className="mt-2 text-green-400 text-sm">You are already subscribed. Thank you!</p>}
      {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
    </div>
  );
};

export default NewsletterForm;


