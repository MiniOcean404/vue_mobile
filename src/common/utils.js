// 防抖函数
export function debounce(fn, delay) {
  let time = null
  return function(...args) {
    if (time) clearTimeout(time)
    time = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 格式化时间
export function formatDate(data, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (data.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }

  let o = {
    'M+': data.getMonth() + 1,
    'd+': data.getDate(),
    'h+': data.getHours(),
    'm+': data.getMinutes(),
    's+': data.getSeconds()
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? str : padLeftZreo(str)
      )
    }
  }

  // 在不足两位的前面加0
  function padLeftZreo(str) {
    return ('00' + str).substr(str.length)
  }

  return fmt
}
