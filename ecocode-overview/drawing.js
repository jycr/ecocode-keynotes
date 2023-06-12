function Drawing() {
    this.lines = [];
}
Drawing.prototype = {
    prop: function (x, y) {
        return { x, y, p: x + "," + y }
    },

    locate: function (element) {
        const x = element.offsetLeft, y = element.offsetTop, w = element.offsetWidth, h = element.offsetHeight;
        return {
            w, h,
            // top-left
            tl: this.prop(x, y),
            // bottom-right
            br: this.prop(x + w, y + h),
            // center
            c: this.prop(x + (w / 2), y + (h / 2))
        };
    },

    addLine: function (sourceLocation, targetLocation, style) {
        this.lines.push(new Line([sourceLocation, targetLocation], style));
    },

    addLineFor: function (source) {
        const sourceLocation = this.locate(source);
        document.body.querySelectorAll(source.dataset.connectTo).forEach(target => {
            const targetLocation = this.locate(target);
            this.addLine(sourceLocation, targetLocation, source.dataset.connectStyle);
        });
    },
    toSvg: function (element) {
        const w = (element?.offsetWidth || document.documentElement.scrollWidth);
        const h = (element?.offsetHeight || document.documentElement.scrollHeight);
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '">' +
            this.lines.map(l => l.toSvg()).join('') +
            '</svg>';
    },
    toCssImg: function (element) {
    console.log(this.toSvg(element));
        element.style.backgroundImage = 'url(data:image/svg+xml;base64,' + btoa(this.toSvg(element)) + ')';
    }
}
function Line(points, style) {
    this.points = points;
    this.style = style || 'stroke:#000;stroke-width:1px;fill:none';
}
Line.prototype = {
    toSvg: function () {
        return '<path d="M' + this.points.map(p => p.c.x + ',' + p.c.y).join(' ') + '" style="' + this.style + '"/>';
    }
}
