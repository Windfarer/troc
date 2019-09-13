
import { formatTime } from './common'
// eslint-disable-next-line
export const logError = (name: string, action: string, info?: string | object) => {
    if (!info) {
        info = 'empty'
    }
    let time = formatTime(new Date())
    console.error(time, name, action, info)
    if (typeof info === 'object') {
        info = JSON.stringify(info)
    }
}
