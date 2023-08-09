function formatPhoneNumber(phoneNo) {
    const formattedPhoneNo = `0${phoneNo.substring(0, 2)}-${phoneNo.substring(2, 6)}-${phoneNo.substring(6, 10)}`;
    return formattedPhoneNo;
}
export default formatPhoneNumber;
