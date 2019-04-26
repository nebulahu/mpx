const view = require('./view')
const scrollView = require('./scroll-view')
const swiper = require('./swiper')
const movableView = require('./movable-view')
const movableArea = require('./movable-area')
const coverView = require('./cover-view')
const coverImage = require('./cover-image')
const text = require('./text')
const richText = require('./rich-text')
const progress = require('./progress')
const button = require('./button')
const checkboxGroup = require('./checkbox-group')
const form = require('./form')
const input = require('./input')
const picker = require('./picker')
const pickerView = require('./picker-view')
const slider = require('./slider')
const switchComponent = require('./switch')
const textarea = require('./textarea')
const navigator = require('./navigator')
const image = require('./image')
const map = require('./map')
const canvas = require('./canvas')
const wxs = require('./wxs')
const aliNonsupport = require('./aliunsupport')

module.exports = function getComponentConfigs ({ warn, error }) {
  /**
   * universal print for detail component warn or error
   * @param {string} platform
   * @param {string} tagName
   * @param {boolean} isTagLevel 是否是标签级别的log
   * @return {function(*): Function}
   */
  const print = (platform, tagName, isTagLevel = false) => (isError = 0, { property } = {}) => (arg) => {
    if (isTagLevel) return error(`<${tagName}> is not supported in ${platform} environment!`)
    const name = typeof arg === 'string' ? `bind${arg}` : arg.name
    const type = typeof arg === 'string' ? 'event' : 'property'
    const msg1 = `<${tagName}> does not support [${name}] ${type} in ${platform} environment!`
    const msg2 = `<${tagName}>'s property '${name}' does not support '[${arg.value}]' value in ali environment!`
    const msg = property ? msg2 : msg1
    isError ? error(msg) : warn(msg)
  }

  // 转换规则只需以微信为基准配置微信和支付宝的差异部分，比如微信和支付宝都支持但是写法不一致，或者微信支持而支付宝不支持的部分(抛出错误或警告)
  return [
    aliNonsupport({ print }),
    view({ print }),
    scrollView({ print }),
    swiper({ print }),
    movableView({ print }),
    movableArea({ print }),
    coverView({ print }),
    coverImage({ print }),
    text({ print }),
    richText({ print }),
    progress({ print }),
    button({ print }),
    checkboxGroup({ print }),
    form({ print }),
    input({ print }),
    picker({ print }),
    pickerView({ print }),
    slider({ print }),
    switchComponent({ print }),
    textarea({ print }),
    navigator({ print }),
    image({ print }),
    map({ print }),
    canvas({ print }),
    wxs()
  ]
}