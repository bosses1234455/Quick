export const checkCookies = () => {

    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('token'))
      ?.split('=')[1];
    return cookieValue;
  };