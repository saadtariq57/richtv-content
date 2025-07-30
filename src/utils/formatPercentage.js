// Utility function to format percentage with proper sign and decimal places
export const formatPercentage = (value) => {
    if (value === null || value === undefined) return null;
    const formatted = parseFloat(value).toFixed(2);
    return parseFloat(formatted);
}