const sortByMonthAndYear = (a, b) => {
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const yearA = a.date.year;
  const yearB = b.date.year;
  const monthA = monthOrder.indexOf(a.date.month);
  const monthB = monthOrder.indexOf(b.date.month);

  if (yearA === yearB) {
    return monthA - monthB;
  } else {
    return yearA - yearB;
  }
};

export default sortByMonthAndYear;
