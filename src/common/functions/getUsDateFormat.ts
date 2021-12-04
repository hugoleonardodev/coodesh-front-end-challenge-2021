const getUsDateFormat = (date: Date | string): string => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getUTCFullYear()}`
}

export default getUsDateFormat
