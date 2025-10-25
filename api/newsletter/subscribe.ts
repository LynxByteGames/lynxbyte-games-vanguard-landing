export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  try {
    const body = typeof req.body === 'object' && req.body !== null ? req.body : JSON.parse(req.body || '{}');
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const groupIdFromBody = typeof body.groupId === 'string' ? body.groupId.trim() : '';
    const groupIdFromEnv = typeof process.env.MAILERLITE_GROUP_ID === 'string' ? process.env.MAILERLITE_GROUP_ID.trim() : '';
    const groupId = groupIdFromBody || groupIdFromEnv;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        fields: name ? { name } : undefined,
        groups: groupId ? [groupId] : undefined,
      }),
    });

    // 200/201: created/ok, 409: already subscribed – treat as success for UX
    if (response.ok || response.status === 200 || response.status === 201) {
      return res.status(200).json({ ok: true });
    }
    if (response.status === 409) {
      return res.status(200).json({ ok: true, alreadySubscribed: true });
    }

    let details: unknown = undefined;
    try {
      details = await response.json();
    } catch {
      try {
        details = await response.text();
      } catch {
        details = undefined;
      }
    }
    return res.status(response.status || 500).json({ error: 'MailerLite API error', details });
  } catch (err: any) {
    return res.status(500).json({ error: 'Unexpected server error', details: err?.message || 'Unknown error' });
  }
}


