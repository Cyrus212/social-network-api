const moment = require('moment');

// Function to format the timestamp
const formatTimestamp = (timestamp) => {
    // Use moment.js to format the timestamp
    const formattedTimestamp = moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
    
    // Return the formatted timestamp
    return formattedTimestamp;
};

// Export the formatTimestamp function
module.exports = formatTimestamp;