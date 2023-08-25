export function toDayTime (timestamp) {
  let dateFormat = new Date(timestamp*1000)
  let hour = dateFormat.getHours() 
  if(hour < 10) {
    hour = "0" + hour
  }
  let minute = dateFormat.getMinutes() 
  if(minute < 10) {
    minute = "0" + minute
  }
  let second = dateFormat.getSeconds()
  if(second < 10) {
    second = "0" + second
  }
  let day = dateFormat.getDate()
  if(day < 10) {
    day = "0" + day
  }
  let month = dateFormat.getMonth() + 1
  if(month < 10) {
    month = "0" + month
  }

  return hour+":"+minute+":"+second+" "+day+"/"+month+"/"+dateFormat.getFullYear()
}

