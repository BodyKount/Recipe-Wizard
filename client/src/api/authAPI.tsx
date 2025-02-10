import type { UserLogin } from '../interfaces/UserLogin';

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    // First check if response is ok before trying to parse JSON
    if (!response.ok) {
      // Try to get error message from response
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      } catch (e) {
        // If JSON parsing fails, use status text
        throw new Error(`Login failed: ${response.status} ${response.statusText}`);
      }
    }

    // Only try to parse JSON if response was ok
    try {
      const data = await response.json();
      return data;
    } catch (e) {
      throw new Error('Invalid response format from server');
    }
  } catch (err) {
    console.error('Error from user login: ', err);
    // Throw the actual error instead of a generic message
    throw err instanceof Error ? err : new Error('Could not fetch user info');
  }
};

export { login };
