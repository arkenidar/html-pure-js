// they are global helper functions for selecting DOM elements
// $$one: selects a single element
// $$all: selects all elements matching the selector
// $$array: selects all elements and converts the NodeList to an array
// so they are global on purpose, and it's not an overlooking mistake.
window.$$one = (selector, parent = document) => parent.querySelector(selector);
window.$$all = (selector, parent = document) => parent.querySelectorAll(selector);
window.$$array = (selector, parent = document) => Array.from($$all(selector, parent));