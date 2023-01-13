const accountSID = process.env.AMSATT_TWILIO_ACCOUNT_SID;
const authToken = process.env.AMSATT_TWILIO_AUTHTOKEN;
const twilioNumber = process.env.AMSATT_TWILIO_NUMBER;

module.exports = {
    accountSID,
    authToken,
    twilioNumber
};