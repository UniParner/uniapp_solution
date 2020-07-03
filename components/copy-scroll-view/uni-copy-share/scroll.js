let view
let pullToRefreshStyle
let disabled
const lastAction = {}

export default function disableScrollBounce ({
  disable
}) {
  function exec () {
    if (!view) {
      
      try{
        view = plus.webview.currentWebview()  
        console.log('==== view ', view)
      }catch(e){
        //TODO handle the exception
        console.error('====view ', e)
      }
      try{
        const hh = uni.getCurrentPages().$getAppWebview()
        console.log('==== hh ', hh)
      }catch(e){
        console.error('====hh ', e)
      }
      
    }
    if (!disabled) {
      pullToRefreshStyle = (view.getStyle() || {}).pullToRefresh || {}
    }
    disabled = disable
    if (pullToRefreshStyle.support) {
      view.setPullToRefresh(Object.assign({}, pullToRefreshStyle, {
        support: !disable
      }))
    }
  }
  const time = Date.now()
  if (disable === lastAction.disable && time - lastAction.time < 20) {
    return
  }
  lastAction.disable = disable
  lastAction.time = time
  if(uni.getSystemInfoSync().platform == 'ios') {
    setTimeout(exec, 20)
  } else {
    exec()
  }
}
