import { useEffect, useState } from 'react';
import { getContent } from '../services/api.js';

export function useContent(type) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    getContent(type)
      .then((data) => { if (active) setItems(data); })
      .catch((cause) => { if (active) setError(cause.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [type]);

  return { items, loading, error };
}
