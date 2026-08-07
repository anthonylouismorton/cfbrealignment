const getFullscreenElement = () =>
  typeof document !== 'undefined'
    ? document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement
    : null;

export function requestBrowserFullscreen(element) {
  if (typeof document === 'undefined') return;
  const target = element || document.documentElement;
  const request =
    target.requestFullscreen ||
    target.webkitRequestFullscreen ||
    target.msRequestFullscreen;

  if (!request) return;

  const result = request.call(target);
  if (result && typeof result.catch === 'function') {
    result.catch(() => {});
  }
}

export function exitBrowserFullscreen() {
  if (typeof document === 'undefined' || !getFullscreenElement()) return;
  const exit =
    document.exitFullscreen ||
    document.webkitExitFullscreen ||
    document.msExitFullscreen;

  if (!exit) return;

  const result = exit.call(document);
  if (result && typeof result.catch === 'function') {
    result.catch(() => {});
  }
}

export function isBrowserFullscreen() {
  return !!getFullscreenElement();
}

export function isTouchPrimaryDevice() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

export function isPhoneLandscape() {
  if (typeof window === 'undefined') return false;
  const { innerWidth: width, innerHeight: height } = window;
  return isTouchPrimaryDevice() && width > height && height <= 500;
}
