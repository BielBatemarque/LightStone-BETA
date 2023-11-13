import { useAuth } from '../hooks/useAuth';

export const useRequest = ( url, method, body ) => {
    const { state } = useAuth();

    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${state.token}`,
        },
        body: JSON.stringify(body),
    });
};