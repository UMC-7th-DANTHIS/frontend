const formatDate = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
};

const formatDateWithTime = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  }).format(date);
};

export { formatDate, formatDateWithTime };
