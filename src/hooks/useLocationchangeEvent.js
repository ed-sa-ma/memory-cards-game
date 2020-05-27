import { useEffect } from "react";

// Hook inspired by this answer in stackoverflow: https://stackoverflow.com/a/52809105

// The idea is to modify the methods of history API to manually dispatch an artificial event that
// we will call "locationchange" to be able to listen for it. Additionally we also need to dispatch
// the original events that those methods dispatch normaly.
export default function useLocationChangeEvent() {
  useEffect(() => {
    // Modify pushState.
    window.history.pushState = (function generatePushState(originalCb) {
      return function pushState() {
        let returnValue = originalCb.apply(this, arguments);
        window.dispatchEvent(new Event("pushstate"));
        window.dispatchEvent(new CustomEvent("locationchange"));

        return returnValue;
      };
    })(window.history.pushState);

    // Modify replaceState.
    window.history.replaceState = (function generateReplaceState(originalCb) {
      return function replaceState() {
        let returnValue = originalCb.apply(this, arguments);
        window.dispatchEvent(new Event("replacestate"));
        window.dispatchEvent(new CustomEvent("locationchange"));

        return returnValue;
      };
    })(window.history.replaceState);

    // Event triggered when uses uses browser forward and backward navigation arrows.
    window.addEventListener("popstate", () => {
      window.dispatchEvent(new Event("locationchange"));
    });
  }, []);
}
