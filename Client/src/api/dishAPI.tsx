import Auth from '../utils/auth';

const addFavorites = async (recipe:string) => {
    try {
        const response = await fetch('/api/dishes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
            body: JSON.stringify({ recipe:recipe, userId: Auth.getProfile().id }),
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error('invalid user API response, check network tab!');
        }

        return data;
    } catch (err) {
        console.log('Error from data retrieval:', err);
        return [];
    }
};

export { addFavorites };