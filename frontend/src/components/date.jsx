const FormatDateTime = (isoDateTime) => {
    // Create a new Date object from the ISO 8601 date-time string\

    const dateTime = new Date(isoDateTime);

    // Extract date components
    const year = dateTime.getFullYear();
    const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
    const day = ('0' + dateTime.getDate()).slice(-2);

    // Extract time components
    const hours = ('0' + dateTime.getHours()).slice(-2);
    const minutes = ('0' + dateTime.getMinutes()).slice(-2);
    const seconds = ('0' + dateTime.getSeconds()).slice(-2);

    // Format the date and time
    const formattedDateTime = `date : ${year}-${month}-${day} , time:  ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
};


export default FormatDateTime;