// Utility function to convert snake_case to camelCase
export const toCamelCase = <T>(obj: any): T => {
    if (Array.isArray(obj)) {
        return obj.map((item) => toCamelCase(item)) as unknown as T;
    } else if (obj && typeof obj === "object") {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
            acc[camelKey] = toCamelCase(value);
            return acc;
        }, {} as any);
    }
    return obj;
};

// Utility function to convert camelCase to snake_case
export const toSnakeCase = <T>(obj: any): T => {
    if (Array.isArray(obj)) {
        return obj.map((item) => toSnakeCase(item)) as unknown as T;
    } else if (obj && typeof obj === "object") {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            const snakeKey = key.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);
            acc[snakeKey] = toSnakeCase(value);
            return acc;
        }, {} as any);
    }
    return obj;
};
