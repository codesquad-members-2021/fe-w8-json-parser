const _ = {
    $: (selector, root=document) => root.querySelector(selector),
    $All : (selector, root=document) => root.querySelectorAll(selector),
    on : (selector, eventName, func, option) => selector.addEventListener(eventName, func, option),
}

export {_};