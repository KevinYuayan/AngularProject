export const environment = {
  production: true
};

export const headersConfig = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`
};
