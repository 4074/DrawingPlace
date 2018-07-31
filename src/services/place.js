import { Place, Point, Action } from '../models'

export function findPoints(params = {}) {
    return Point.find(params).select('-_id -create_at -update_at')
}

export function createAction(params) {
    const { point, user } = params
    return Action.create({
        point: point,
        user: user,
        create_at: new Date()
    })
}

export function savePoint(params) {
    const { x, y, w, h, c, user } = params
    return Point.findOne({
        x, y
    }).then((data) => {
        if (data) {
            data.w = w
            data.h = h,
            data.c = c,
            data.user = user
            data.update_at = new Date()
            
            return data.save()
        } else {
            return Point.create({
                x,
                y,
                w,
                h,
                c,
                user: user,
                create_at: new Date(),
                update_at: new Date()
            })
        }
    })
}