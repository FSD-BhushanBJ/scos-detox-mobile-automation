const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const login = async (email, password) => {
  await delay(1000);

  if (email === 'admin@test.com' && password === '1234') {
    return { token: 'dummy-token' };
  }

  throw new Error('Invalid credentials');
};

export const getInstitutes = async () => {
  await delay(1000);
  return [
    { id: 1, name: 'ABC Institute' },
    { id: 2, name: 'XYZ Academy' },
  ];
};

export const getRoles = async () => {
  await delay(1000);
  return [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
  ];
};