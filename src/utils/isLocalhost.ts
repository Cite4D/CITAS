/**
 * Checks whether the current environment is running on localhost or a private local network.
 * Also allows an intentional override via ?admin=true or #admin in the URL for remote organizer access.
 */
export function isLocalhost(): boolean {
  if (typeof window === 'undefined') return false;

  const hostname = window.location.hostname.toLowerCase();
  
  // Explicit URL query/hash override
  if (
    window.location.search.includes('admin=true') ||
    window.location.hash.toLowerCase() === '#admin'
  ) {
    return true;
  }

  // Standard localhost names and IPs
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname === '[::1]' ||
    hostname.endsWith('.local')
  ) {
    return true;
  }

  // Common private local network ranges (e.g. testing over LAN)
  if (
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.') ||
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname)
  ) {
    return true;
  }

  return false;
}
