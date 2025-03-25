const formatDate = (timestamp, useCase) => {
  const date = new Date(timestamp);

  let year;
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const timeMatch = timestamp?.match(/T(\d{2}:\d{2})/);
  const time = timeMatch ? timeMatch[1] : '';

  switch (useCase) {
    case 1:
      year = String(date.getFullYear()).slice(-2);
      return `${year}.${month}.${day} ${time}`;

    case 2:
      year = String(date.getFullYear());
      return `${year}.${month}.${day} ${time}`;

    case 3:
      year = String(date.getFullYear()).slice(-2);
      return `${year}.${month}.${day}`;

    case 4:
      year = String(date.getFullYear());
      return `${year}.${month}.${day}`;

    default:
      return 0;
  }
};

export default formatDate;
