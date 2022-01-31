export const validateRegister = (
  email: string,
  username: string,
  password: string
) => {
  if (!email.includes('@') || !email.includes('.')) {
    return [{ field: 'email', message: 'invalid email' }];
  }
  if (username.includes('@')) {
    return [{ field: 'username', message: 'cannot include @ sign' }];
  }
  if (username.length <= 2) {
    return [{ field: 'username', message: 'length must be greater than two' }];
  }
  if (password.length <= 3) {
    return [
      { field: 'password', message: 'length must be greater than three' },
    ];
  }
  return false;
};
