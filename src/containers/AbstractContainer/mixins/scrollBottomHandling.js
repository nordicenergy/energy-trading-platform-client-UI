const MAIN_CONTAINER_SELECTOR = 'main-container';
const PAGE_BOTTOM_OFFSET = 200; // pixels
const SCROLL_TIMEOUT = 100; // milliseconds

const scrollBottomHandlingMixin = Base =>
    class extends Base {
        constructor(props, context, breadcrumbs) {
            super(props, context, breadcrumbs);

            this.scrollHandler = f => f;
            this.scrollTimeout = null;
            this.lastScrollTop = 0;
        }

        scrollToTop() {
            const container = document.getElementById(MAIN_CONTAINER_SELECTOR);
            if (container) {
                container.scrollTop = 0;
            }
        }

        handleScroll(event, condition, callback) {
            const { target } = event;
            clearTimeout(this.scrollTimeout);

            this.scrollTimeout = setTimeout(() => {
                const { scrollTop, clientHeight, scrollHeight } = target;
                const isScrollDown = scrollTop > this.lastScrollTop;
                const delta = scrollHeight - scrollTop - clientHeight;

                if (delta <= PAGE_BOTTOM_OFFSET && isScrollDown && condition()) {
                    callback();
                }

                this.lastScrollTop = scrollTop;
            }, SCROLL_TIMEOUT);
        }

        // Do not forget remove all scroll handlers on unmount step of your container (#removeScrollHandler())
        setupScrollHandler(condition, callback) {
            this.scrollHandler = event => this.handleScroll(event, condition, callback);
            document.getElementById(MAIN_CONTAINER_SELECTOR).addEventListener('scroll', this.scrollHandler);
        }

        removeScrollHandler() {
            document.getElementById(MAIN_CONTAINER_SELECTOR).removeEventListener('scroll', this.scrollHandler);
        }
    };

export default scrollBottomHandlingMixin;
