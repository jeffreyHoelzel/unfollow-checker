/**
 * Trims whitespace and sets all alphabetic characters to lowercase for a given username.
 * 
 * @param {string} rawUsername The username to be normalized.
 * @returns {string} The normalized username.
 */
export const normalizeUsername = (rawUsername: string): string => rawUsername.trim().toLowerCase();

/**
 * Normalizes and finds only the unique usernames from an array of usernames.
 * 
 * @param {string[]} usernames Unnormalized array of usernames.
 * @returns {string[]} All the unique usernames found.
 */
export const uniqueSortedUsernames = (usernames: string[]): string[] => {
    const set = new Set(usernames.map(normalizeUsername).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
};
