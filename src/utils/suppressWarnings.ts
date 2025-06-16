// Suppress specific React warnings for third-party libraries
export const suppressReactWarnings = () => {
  if (typeof window !== "undefined") {
    const originalWarn = console.warn;

    console.warn = (...args) => {
      // Suppress defaultProps warnings from Recharts
      if (
        args[0]?.includes?.(
          "Support for defaultProps will be removed from function components",
        ) ||
        args[0]?.includes?.("XAxis") ||
        args[0]?.includes?.("YAxis")
      ) {
        return; // Skip this warning
      }

      // Allow all other warnings
      originalWarn.apply(console, args);
    };
  }
};
