export let scrollToTop = (topOffset = 50) => {
    requestAnimationFrame(() => window.scrollTo(0,topOffset));
}