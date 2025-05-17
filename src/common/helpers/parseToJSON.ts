/**
 * Safely parses a JSON string into a typed object
 * @param jsonString - The JSON string to parse
 * @returns The parsed object of type T
 * @throws Error if the JSON string is invalid
 */
export function parseToJSON<T>(jsonString: string): T {
    return JSON.parse(jsonString) as T;
}
