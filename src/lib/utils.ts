import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
type Props = {
    date: string
}

export const formatDate = (date: string) => {
    const parsedDate = new Date(date)
    const now = new Date()
    const diff = now.getTime() - parsedDate.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) {
        return 'Just now'
    } else if (minutes < 60) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
    } else if (hours < 24) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
    } else if (days < 7) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`
    } else {
        return parsedDate.toLocaleDateString() // Return the full date if it's older than a week
    }
}
