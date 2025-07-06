import { api } from '@/services/api';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export function AxiosAuthInterceptor() {
  const [tokenCookie] = useCookies(['AccessToken']);

  useEffect(() => {
    if (tokenCookie) {
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenCookie}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, []);

  return null;
}
