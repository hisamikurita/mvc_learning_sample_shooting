class DomUtil {
    constructor() {
        this.canvas = document.querySelector('canvas');
    }
    get() {
        return this.canvas;
    }
}

export default new DomUtil;