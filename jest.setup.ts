import "@testing-library/jest-dom";
import { webcrypto } from "node:crypto";
import { TextEncoder } from "node:util";

// jsdom não expõe crypto.subtle; o Node 20+ expõe via node:crypto.
Object.defineProperty(globalThis, "crypto", { value: webcrypto, configurable: true });
if (!globalThis.TextEncoder) {
  Object.defineProperty(globalThis, "TextEncoder", { value: TextEncoder });
}

// jsdom não implementa estes recursos, usados nas animações e carrosséis.
window.matchMedia =
  window.matchMedia ||
  ((query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList);

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
Object.defineProperty(window, "IntersectionObserver", { value: IntersectionObserverMock });

Element.prototype.scrollTo = Element.prototype.scrollTo || (() => {});
Element.prototype.animate =
  Element.prototype.animate ||
  (() => ({ finished: Promise.resolve(), cancel() {}, onfinish: null }) as unknown as Animation);

beforeEach(() => {
  window.localStorage.clear();
});
