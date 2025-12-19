export default function generateRandomAvatar(userName) {
  const seed = userName || Math.random().toString(36).substring(2);
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`;
}
