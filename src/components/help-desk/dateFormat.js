export function getTimeFormat({
    timestamp,
    timeFormat = 24,
    showAM = true,
    showTime = true,
    showSeconds = false
} = {}) {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const dateTime = timestamp.toDate();
    let finalDate;

    let dd = String(dateTime.getDate()).padStart(2, '0');
    let mm = monthNames[dateTime.getMonth()];
    let yyyy = dateTime.getFullYear();

    let hh = dateTime.getHours();
    let min = dateTime.getMinutes();
    let sec = dateTime.getSeconds();

    if (showTime) {
        if (timeFormat === 24) {
            hh = hh < 10 ? '0' + hh : hh;

            min = min < 10 ? '0' + min : min;
            sec = sec < 10 ? '0' + sec : sec;

            if (showSeconds) {
                finalDate = dd + ' ' + mm + ' ' + yyyy + ' ' + hh + ':' + min + ':' + sec;
            } else {
                finalDate = dd + ' ' + mm + ' ' + yyyy + ' ' + hh + ':' + min;
            }
        }
        else {
            let aa = hh >= 12 ? "PM" : "AM";

            hh = hh % 12;
            hh = hh ? hh : 12;
            hh = hh < 10 ? '0' + hh : hh;

            min = min < 10 ? '0' + min : min;
            sec = sec < 10 ? '0' + sec : sec;

            if (showAM && showSeconds) {
                finalDate = dd + ' ' + mm + ' ' + yyyy + ' ' + hh + ':' + min + ':' + sec + ' ' + aa;
            }
            else if (showAM && !showSeconds) {
                finalDate = dd + ' ' + mm + ' ' + yyyy + ' ' + hh + ':' + min + ' ' + aa;
            }
            else if (!showAM && showSeconds) {
                finalDate = dd + ' ' + mm + ' ' + yyyy + ' ' + hh + ':' + min + ':' + sec;
            }
            else if (!showAM && !showSeconds) {
                finalDate = dd + ' ' + mm + ' ' + yyyy + ' ' + hh + ':' + min;
            }
            else {
                finalDate = dd + ' ' + mm + ' ' + yyyy + ' ' + hh + ':' + min + ' ' + aa;
            }
        }
    }
    else {
        finalDate = dd + ' ' + mm + ' ' + yyyy;
    }

    return finalDate;
}