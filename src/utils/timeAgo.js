export function timeAgo(inputDate) {
  if (!inputDate) return 'N/A';

  const date =
    typeof inputDate === 'string' && !inputDate.endsWith('Z')
      ? new Date(inputDate + 'Z')
      : new Date(inputDate);

  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  const timeWithAmPm = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true, // 👈 force AM / PM
  });

  if (diffSeconds < 60) return 'Just now';

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
  }

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  }

  if (diffDays === 1) {
    return `Yesterday at ${timeWithAmPm}`;
  }

  if (diffDays < 7) {
    return `${date.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
    })} at ${timeWithAmPm}`;
  }

  return date.toLocaleDateString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
