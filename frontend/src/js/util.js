const _ = {
    $: (selector, target = document) => target.querySelector(selector),
    $$: (selector, target = document) => target.querySelectorAll(selector),
    AE: (node, event, callback) => node.addEventListener(event, callback),
    addClass: (node, ...className) => node.classList.add(...className),
    removeClass: (node, ...className) => node.classList.remove(...className),
    toggleClass: (node, className) => node.classList.toggle(className),
    containsClass: (node, className) => node.classList.contains(className),
};

export default _;