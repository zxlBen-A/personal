//屏蔽F12和右键
export const forbidF12 = () => {
  // @ts-ignore
  document.oncontextmenu = new Function('event.returnValue=false')
  document.onkeydown = () => {
    //禁用F12
    // @ts-ignore
    if (window.event && window.event.keyCode == 123) {
      return false
      //禁用ctrl+shift+i,
    } // @ts-ignore
    if (window.event.ctrlKey && window.event.shiftKey && window.event.keyCode == 73) {
      return false
      //屏蔽Shift+F10
    } // @ts-ignore
    if (window.event.shiftKey && window.event.keyCode == 121) {
      return false
    }
  }
}
