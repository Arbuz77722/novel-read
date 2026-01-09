export const displayRole = (role) => {
  if (role === 'user') return 'Reader';
  if (role === 'mod') return 'Moderator';
  if (role === 'admin') return 'Admin';
  return role;
};
