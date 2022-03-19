export function getWindowWidth() {
  if (typeof window === 'undefined') {
    return 0;
  } else {
    return window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
  }
}
