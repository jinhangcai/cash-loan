// unix转年月日
export function timeconversion(time) {
  let unixtime = time
  let unixTimestamp = new Date(unixtime * 1000)
  let Y = unixTimestamp.getFullYear()
  let M = ((unixTimestamp.getMonth() + 1) >= 10 ? (unixTimestamp.getMonth() + 1) : '0' + (unixTimestamp.getMonth() + 1))
  let D = (unixTimestamp.getDate() >= 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate())
  let toDay = Y + '年' + M + '月' + D + '日'
  return toDay
}

// 提现记录时间，到分钟
export function cashTime(time) {
  let unixtime = time
  let unixTimestamp = new Date(unixtime * 1000)
  let Y = unixTimestamp.getFullYear()
  let M = ((unixTimestamp.getMonth() + 1) >= 10 ? (unixTimestamp.getMonth() + 1) : '0' + (unixTimestamp.getMonth() + 1))
  let D = (unixTimestamp.getDate() >= 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate())
  let H = (unixTimestamp.getHours() >= 10 ? unixTimestamp.getHours() : '0' + unixTimestamp.getHours())
  let MIN = (unixTimestamp.getMinutes() >= 10 ? unixTimestamp.getMinutes() : '0' + unixTimestamp.getMinutes())

  let toDay = Y + '年' + M + '月' + D + '日' + ' ' + H + ':' + MIN;

  return toDay
}

// 当前时间转unix
export function timeUnix(time) {
  const unixtime = time * 1000 + (1000 * 60 * 60 * 24);
  const dateTime = new Date().getTime();
  // const timestamp = Math.floor(dateTime / 1000);
  const normalTime = dateTime - unixtime;
  if (normalTime >= 0) {
    // let unixTimestamp = new Date(normalTime * 1000)
    // let D = unixTimestamp.getDate();
    // console.log(D);
    // timeconversion(unixtime);
    // timeconversion(dateTime);
    return '已逾期' + (Math.ceil(normalTime / 1000 / 60 / 60 / 24)) + '天';
  } else {
    const normalTimes = unixtime - dateTime;
    // const unixTimestamp = new Date(normalTime * 1000)
    // const D = unixTimestamp.getDate();
    const days = Math.floor(normalTimes / 1000 / 60 / 60 / 24)
    return days > 0 ? days + '天到期' : '今天到期';
  }
}
export function lately(time) {
  let unixtime = time
  let unixTimestamp = new Date(unixtime * 1000)
  let Y = unixTimestamp.getFullYear()
  let M = ((unixTimestamp.getMonth() + 1) >= 10 ? (unixTimestamp.getMonth() + 1) : '0' + (unixTimestamp.getMonth() + 1))
  let D = (unixTimestamp.getDate() >= 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate())
  let toDay = Y + '-' + M + '-' + D
  return toDay
}
// module.exports = {
//   timeUnix,
//   timeconversion
// };

