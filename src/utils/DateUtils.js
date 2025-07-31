
// Format date as YYYY-MM-DD
export const formatDate = (date) => date.toISOString().slice(0, 10);

// Format: 'YYYY-MM-DD HH:mm:ss'
export const formatDateTimeEST = (date) => {
    // Get ISO string, remove milliseconds and 'Z', replace 'T' with ' '
    return date.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
}

export const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
}
