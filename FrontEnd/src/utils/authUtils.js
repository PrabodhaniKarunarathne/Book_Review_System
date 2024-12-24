export const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.exp < Date.now() / 1000; // Check if token expiry is less than current time
  };
  