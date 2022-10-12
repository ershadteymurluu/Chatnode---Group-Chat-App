const time = require('moment');
function formatMessage(username,text){
    return {
        username,
        text,
        time:time().format('h:mm A')
    }
}

module.exports = formatMessage;