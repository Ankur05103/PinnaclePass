const FormatDateTime = (isoDateTime) => {
  const dateTime = new Date(isoDateTime);
  const showDate = dateTime;
  showDate.setHours(dateTime.getHours() - 5);
    showDate.setMinutes(dateTime.getMinutes() - 30);
  
    if (showDate.getHours() < 0) {
      showDate.setDate(showDate.getDate() - 1);
      showDate.setHours(showDate.getHours() + 24);
    }
    if (showDate.getMinutes() < 0) {
      showDate.setHours(showDate.getHours() - 1);
      showDate.setMinutes(showDate.getMinutes() + 60);
    }
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

  const hours = ("0" + showDate.getHours()).slice(-2);
  const minutes = ("0" + showDate.getMinutes()).slice(-2);

  const formattedDateTime = `${day} ${monthName} ${year}, ${hours}:${minutes}`;

  return formattedDateTime;
};

export default FormatDateTime;
