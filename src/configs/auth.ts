export const jwt = {
  secret: process.env.AUTH_SECRET || 'default',
  expiresIn: process.env.EXPIRES_IN || '1d'
};
