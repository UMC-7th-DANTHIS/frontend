const formatDate = (timestamp: string, useCase: number) => {
  const date: Date = new Date(timestamp);

  let year: string;
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const day: string = String(date.getDate()).padStart(2, '0');
  const timeMatch: string[] | null = timestamp?.match(/T(\d{2}:\d{2})/);
  const time: string = timeMatch ? timeMatch[1] : '';

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
