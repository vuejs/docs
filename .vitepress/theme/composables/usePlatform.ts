export default function usePlatform() {
  const isMac = /(Mac OS X)/i.test(globalThis.navigator?.userAgent)
  const altKey = isMac ? 'Option' : 'Alt';

  return {
    isMac,
    altKey
  }
}