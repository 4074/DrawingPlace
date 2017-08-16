
export function jsonit(status = true, message = "操作成功", data = null) {
    if (typeof status !== "boolean") {
        data = status
        status = true
    }
    if (!data && typeof message !== "string") {
        data = message,
        message = "操作成功"
    }
    return {
        status: status,
        message: message,
        data: data
    }
}

export function pushData(source, target, keys, split = ' ') {
    keys = typeof keys === 'string' ? keys.split(split) : keys
    keys.forEach((k) => {
        target[k] = source[k]
    })
    return target
} 