/** Explicit preference wins; otherwise follow the device's color scheme. */
export function resolveTheme(saved, prefersDark = false) {
  return saved === "dark" || saved === "light" ? saved : (prefersDark ? "dark" : "light");
}

/** User-triggered action always results in an explicit preference. */
export function nextTheme(current) {
  return current === "dark" ? "light" : "dark";
}
