export const cookieToJson = str => {
  console.log(str)
  str = str.replace(/ */g, "");
  console.log(str)
  let cookieArr = str.split(";");
  let obj = {} 
  cookieArr.forEach((i) => {
      let arr = i.split("=");
      obj[arr[0]] =arr[1];
  });
  return obj
}
export const writeCookie = (name, value, hours) => {
  var expire = "";
  if (hours != null) {
    expire = new Date((new Date()).getTime() + hours * 3600000);
    expire = "; expires=" + expire.toGMTString();
  }
  document.cookie = name + "=" + value + expire;
}