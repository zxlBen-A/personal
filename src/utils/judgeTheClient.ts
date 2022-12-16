//判断pc端或移动端
const ISMOBILE = function () {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )

  return !!flag
}
let isShow = ISMOBILE()

export default isShow
