// We pass a function here that we want to be executed on a specific delay 
// delay is = 1000 (it means that this is the default delay)
const debounce = (func, delay = 1000) => {
    let timeoutId;
    //...args is to it take all the different arguments that is passed (because it may be on argument or more)
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args); //if there is no args it passes null
        }, delay);
    };
};