
export default class Utils {

    /**
     * 获取随机头像
     * @param {String} source 
     * @param {String} username 
     */
    static getAvatar(source, username = '') {
        // 有头像直接返回
        if (source) return source;
        const imageCount = 36
        let n = 0
        for (const s of username.split('')) {
            n += s.charCodeAt(0)
        }

        const index = parseInt((n / imageCount * 10000)) % imageCount

        return require('../static/avatar/' + index + '.jpg')
    }

    /**
     * 判断是否为数字
     * @param {Any} value 
     * @return {Boolean}
     */
    static isNumber(value) {
        return typeof value === 'number' && !isNaN(value)
    }

    /**
     * 数字 or
     * @return {Number} 返回参数中的第一个数字，无数字返回 null
     */
    static numberOr() {
        for (const item of Array.from(arguments)) {
            if (Utils.isNumber(item)) {
                return item
            }
        }
        return arguments.length ? arguments[arguments.length - 1] : null
    }

    /**
     * Dom 触发事件
     * @param {String} type 
     * @param {Element} element 
     */
    static triggerElementEvent(type, element) {
        if (!type || !element) return;

        let event
        if (document.createEvent) {
            event = document.createEvent("HTMLEvents")
            event.initEvent(type, true, true)
        } else {
            event = document.createEventObject()
            event.eventType = type
        }
        event.eventName = type

        if (document.createEvent) {
            element.dispatchEvent(event)
        } else {
            element.fireEvent("on" + event.eventType, event)
        }
    }

    /**
     * 获取本月月份
     * @return {Number} e.g 201704
     */
    static getThisMonth() {
        const date = new Date()
        return date.getFullYear() * 100 + date.getMonth() + 1
    }

    /**
     * 获取上个月月份
     * @param {Number} month 月份 e.g 201703
     * @return {Number} 
     */
    static getLastMonth(month, prefix = 1) {
        if (!month) return null;
        month += ''
        let date = new Date(month.substr(0, 4) + '-' + month.substr(4, 2) + '-15')
        date = new Date(date.getTime() - 1000 * 3600 * 24 * 30 * prefix)
        return date.getFullYear() * 100 + date.getMonth() + 1
    }

    /**
     * 获取数字的小数位数
     * @param {Number} source
     * @return {Number} 
     */
    static getDecimalPlaces(source) {
        if (!this.isNumber(source)) return 0;

        source = Math.abs(source)
        // TODO 处理精度丢失问题
        const diff = source - Math.floor(source)

        if (diff) {
            return (diff + '').length - 2
        }

        return 0
    }

    static getOffsetLeft(element){
        let result = 0
        do {
            if (!isNaN(element.offsetLeft)){
                result += element.offsetLeft
            }
        } while( element = element.offsetParent )

        return result
    }

    static getOffsetTop(element){
        let result = 0
        do {
            if (!isNaN(element.offsetTop)){
                result += element.offsetTop
            }
        } while( element = element.offsetParent )

        return result
    }
}