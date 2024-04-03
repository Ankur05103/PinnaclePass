const FormatDateTime = (isoDateTime) => {
  const dateTime = new Date(isoDateTime);

  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const day = ("0" + dateTime.getDate()).slice(-2);
  const monthNumber = dateTime.getMonth() + 1;
  const monthName = months[monthNumber];
  const year = dateTime.getFullYear();

  const hours = ("0" + dateTime.getHours()).slice(-2);
  const minutes = ("0" + dateTime.getMinutes()).slice(-2);

  const formattedDateTime = `${day} ${monthName} ${year}, ${hours}:${minutes}`;

  return formattedDateTime;
};

export default FormatDateTime;
