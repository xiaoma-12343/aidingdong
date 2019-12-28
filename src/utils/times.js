/**
* 格式化时间戳
*
* @param {*} timestamp “1569859200”
* @param {*} hasHour/type true “2019-10-01”
* @returns
*/
function timestampToTime(timestamp, hasHour) {
    var date = (function() {
    if (timestamp.length === 10) {
    return new Date(timestamp * 1000);
    } else if (timestamp.length === 13) {
    return new Date(Number(timestamp));
    } else {
    throw new Error("请检验传入的时间戳");
    }
    })(),
    // 补 0
    addZero = function(str) {
    return Number(str) < 10 ? "0" + str : str;
    };
    var Y = date.getFullYear() + "-",
    M = addZero(date.getMonth() + 1) + "-",
    D = addZero(date.getDate()),
    h = date.getHours() + ":",
    m = date.getMinutes() + ":",
    s = date.getSeconds();
    
    if (hasHour === true) {
    return Y + M + D + h + m + s;
    } else if (hasHour === undefined) {
    return Y + M + D;
    }
    }
export default {timestampToTime};