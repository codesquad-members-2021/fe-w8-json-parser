const $ = (selector, base = document) => base.querySelector(selector)
const $All = (selector, base = document) => base.querySelectorAll(selector)
const pipe = (...fns) => arg => fns.reduce((arg, fn) => fn(arg), arg);

export { $, pipe }