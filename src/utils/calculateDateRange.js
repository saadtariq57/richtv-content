// Utility function to calculate date range for the last N days
export const calculateDateRange = (days) => {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - days + 1);

    // Format dates as YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split('T')[0];
    return {
        from: formatDate(fromDate),
        to: formatDate(toDate)
    };
};