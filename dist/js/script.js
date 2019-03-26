/*!
 * Lightbox v2.10.0
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright 2007, 2018 Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 *
 * @preserve
 */
! function (a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : a.lightbox = b(a.jQuery)
}(this, function (a) {
    function b(b) {
        this.album = [], this.currentImageIndex = void 0, this.init(), this.options = a.extend({}, this.constructor.defaults), this.option(b)
    }
    return b.defaults = {
        albumLabel: "Image %1 of %2",
        alwaysShowNavOnTouchDevices: !1,
        fadeDuration: 600,
        fitImagesInViewport: !0,
        imageFadeDuration: 600,
        positionFromTop: 50,
        resizeDuration: 700,
        showImageNumberLabel: !0,
        wrapAround: !1,
        disableScrolling: !1,
        sanitizeTitle: !1
    }, b.prototype.option = function (b) {
        a.extend(this.options, b)
    }, b.prototype.imageCountLabel = function (a, b) {
        return this.options.albumLabel.replace(/%1/g, a).replace(/%2/g, b)
    }, b.prototype.init = function () {
        var b = this;
        a(document).ready(function () {
            b.enable(), b.build()
        })
    }, b.prototype.enable = function () {
        var b = this;
        a("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function (c) {
            return b.start(a(c.currentTarget)), !1
        })
    }, b.prototype.build = function () {
        if (!(a("#lightbox").length > 0)) {
            var b = this;
            a('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(a("body")), this.$lightbox = a("#lightbox"), this.$overlay = a("#lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".lb-outerContainer"), this.$container = this.$lightbox.find(".lb-container"), this.$image = this.$lightbox.find(".lb-image"), this.$nav = this.$lightbox.find(".lb-nav"), this.containerPadding = {
                top: parseInt(this.$container.css("padding-top"), 10),
                right: parseInt(this.$container.css("padding-right"), 10),
                bottom: parseInt(this.$container.css("padding-bottom"), 10),
                left: parseInt(this.$container.css("padding-left"), 10)
            }, this.imageBorderWidth = {
                top: parseInt(this.$image.css("border-top-width"), 10),
                right: parseInt(this.$image.css("border-right-width"), 10),
                bottom: parseInt(this.$image.css("border-bottom-width"), 10),
                left: parseInt(this.$image.css("border-left-width"), 10)
            }, this.$overlay.hide().on("click", function () {
                return b.end(), !1
            }), this.$lightbox.hide().on("click", function (c) {
                return "lightbox" === a(c.target).attr("id") && b.end(), !1
            }), this.$outerContainer.on("click", function (c) {
                return "lightbox" === a(c.target).attr("id") && b.end(), !1
            }), this.$lightbox.find(".lb-prev").on("click", function () {
                return 0 === b.currentImageIndex ? b.changeImage(b.album.length - 1) : b.changeImage(b.currentImageIndex - 1), !1
            }), this.$lightbox.find(".lb-next").on("click", function () {
                return b.currentImageIndex === b.album.length - 1 ? b.changeImage(0) : b.changeImage(b.currentImageIndex + 1), !1
            }), this.$nav.on("mousedown", function (a) {
                3 === a.which && (b.$nav.css("pointer-events", "none"), b.$lightbox.one("contextmenu", function () {
                    setTimeout(function () {
                        this.$nav.css("pointer-events", "auto")
                    }.bind(b), 0)
                }))
            }), this.$lightbox.find(".lb-loader, .lb-close").on("click", function () {
                return b.end(), !1
            })
        }
    }, b.prototype.start = function (b) {
        function c(a) {
            d.album.push({
                alt: a.attr("data-alt"),
                link: a.attr("href"),
                title: a.attr("data-title") || a.attr("title")
            })
        }
        var d = this,
            e = a(window);
        e.on("resize", a.proxy(this.sizeOverlay, this)), a("select, object, embed").css({
            visibility: "hidden"
        }), this.sizeOverlay(), this.album = [];
        var f, g = 0,
            h = b.attr("data-lightbox");
        if (h) {
            f = a(b.prop("tagName") + '[data-lightbox="' + h + '"]');
            for (var i = 0; i < f.length; i = ++i) c(a(f[i])), f[i] === b[0] && (g = i)
        } else if ("lightbox" === b.attr("rel")) c(b);
        else {
            f = a(b.prop("tagName") + '[rel="' + b.attr("rel") + '"]');
            for (var j = 0; j < f.length; j = ++j) c(a(f[j])), f[j] === b[0] && (g = j)
        }
        var k = e.scrollTop() + this.options.positionFromTop,
            l = e.scrollLeft();
        this.$lightbox.css({
            top: k + "px",
            left: l + "px"
        }).fadeIn(this.options.fadeDuration), this.options.disableScrolling && a("html").addClass("lb-disable-scrolling"), this.changeImage(g)
    }, b.prototype.changeImage = function (b) {
        var c = this;
        this.disableKeyboardNav();
        var d = this.$lightbox.find(".lb-image");
        this.$overlay.fadeIn(this.options.fadeDuration), a(".lb-loader").fadeIn("slow"), this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(), this.$outerContainer.addClass("animating");
        var e = new Image;
        e.onload = function () {
            var f, g, h, i, j, k;
            d.attr({
                alt: c.album[b].alt,
                src: c.album[b].link
            }), a(e), d.width(e.width), d.height(e.height), c.options.fitImagesInViewport && (k = a(window).width(), j = a(window).height(), i = k - c.containerPadding.left - c.containerPadding.right - c.imageBorderWidth.left - c.imageBorderWidth.right - 20, h = j - c.containerPadding.top - c.containerPadding.bottom - c.imageBorderWidth.top - c.imageBorderWidth.bottom - 120, c.options.maxWidth && c.options.maxWidth < i && (i = c.options.maxWidth), c.options.maxHeight && c.options.maxHeight < i && (h = c.options.maxHeight), (e.width > i || e.height > h) && (e.width / i > e.height / h ? (g = i, f = parseInt(e.height / (e.width / g), 10), d.width(g), d.height(f)) : (f = h, g = parseInt(e.width / (e.height / f), 10), d.width(g), d.height(f)))), c.sizeContainer(d.width(), d.height())
        }, e.src = this.album[b].link, this.currentImageIndex = b
    }, b.prototype.sizeOverlay = function () {
        this.$overlay.width(a(document).width()).height(a(document).height())
    }, b.prototype.sizeContainer = function (a, b) {
        function c() {
            d.$lightbox.find(".lb-dataContainer").width(g), d.$lightbox.find(".lb-prevLink").height(h), d.$lightbox.find(".lb-nextLink").height(h), d.showImage()
        }
        var d = this,
            e = this.$outerContainer.outerWidth(),
            f = this.$outerContainer.outerHeight(),
            g = a + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right,
            h = b + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;
        e !== g || f !== h ? this.$outerContainer.animate({
            width: g,
            height: h
        }, this.options.resizeDuration, "swing", function () {
            c()
        }) : c()
    }, b.prototype.showImage = function () {
        this.$lightbox.find(".lb-loader").stop(!0).hide(), this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav()
    }, b.prototype.updateNav = function () {
        var a = !1;
        try {
            document.createEvent("TouchEvent"), a = !!this.options.alwaysShowNavOnTouchDevices
        } catch (a) {}
        this.$lightbox.find(".lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (a && this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"), this.$lightbox.find(".lb-prev, .lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".lb-prev").show(), a && this.$lightbox.find(".lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".lb-next").show(), a && this.$lightbox.find(".lb-next").css("opacity", "1"))))
    }, b.prototype.updateDetails = function () {
        var b = this;
        if (void 0 !== this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title) {
            var c = this.$lightbox.find(".lb-caption");
            this.options.sanitizeTitle ? c.text(this.album[this.currentImageIndex].title) : c.html(this.album[this.currentImageIndex].title), c.fadeIn("fast").find("a").on("click", function (b) {
                void 0 !== a(this).attr("target") ? window.open(a(this).attr("href"), a(this).attr("target")) : location.href = a(this).attr("href")
            })
        }
        if (this.album.length > 1 && this.options.showImageNumberLabel) {
            var d = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
            this.$lightbox.find(".lb-number").text(d).fadeIn("fast")
        } else this.$lightbox.find(".lb-number").hide();
        this.$outerContainer.removeClass("animating"), this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration, function () {
            return b.sizeOverlay()
        })
    }, b.prototype.preloadNeighboringImages = function () {
        if (this.album.length > this.currentImageIndex + 1) {
            (new Image).src = this.album[this.currentImageIndex + 1].link
        }
        if (this.currentImageIndex > 0) {
            (new Image).src = this.album[this.currentImageIndex - 1].link
        }
    }, b.prototype.enableKeyboardNav = function () {
        a(document).on("keyup.keyboard", a.proxy(this.keyboardAction, this))
    }, b.prototype.disableKeyboardNav = function () {
        a(document).off(".keyboard")
    }, b.prototype.keyboardAction = function (a) {
        var b = a.keyCode,
            c = String.fromCharCode(b).toLowerCase();
        27 === b || c.match(/x|o|c/) ? this.end() : "p" === c || 37 === b ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : "n" !== c && 39 !== b || (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0))
    }, b.prototype.end = function () {
        this.disableKeyboardNav(), a(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), a("select, object, embed").css({
            visibility: "visible"
        }), this.options.disableScrolling && a("html").removeClass("lb-disable-scrolling")
    }, new b
});
/*!
 * parallax.js v1.5.0 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */
! function (t, i, e, s) {
    function o(i, e) {
        var h = this;
        "object" == typeof e && (delete e.refresh, delete e.render, t.extend(this, e)), this.$element = t(i), !this.imageSrc && this.$element.is("img") && (this.imageSrc = this.$element.attr("src"));
        var r = (this.position + "").toLowerCase().match(/\S+/g) || [];
        if (r.length < 1 && r.push("center"), 1 == r.length && r.push(r[0]), "top" != r[0] && "bottom" != r[0] && "left" != r[1] && "right" != r[1] || (r = [r[1], r[0]]), this.positionX !== s && (r[0] = this.positionX.toLowerCase()), this.positionY !== s && (r[1] = this.positionY.toLowerCase()), h.positionX = r[0], h.positionY = r[1], "left" != this.positionX && "right" != this.positionX && (isNaN(parseInt(this.positionX)) ? this.positionX = "center" : this.positionX = parseInt(this.positionX)), "top" != this.positionY && "bottom" != this.positionY && (isNaN(parseInt(this.positionY)) ? this.positionY = "center" : this.positionY = parseInt(this.positionY)), this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px"), navigator.userAgent.match(/(iPod|iPhone|iPad)/)) return this.imageSrc && this.iosFix && !this.$element.is("img") && this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position
        }), this;
        if (navigator.userAgent.match(/(Android)/)) return this.imageSrc && this.androidFix && !this.$element.is("img") && this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position
        }), this;
        this.$mirror = t("<div />").prependTo(this.mirrorContainer);
        var a = this.$element.find(">.parallax-slider"),
            n = !1;
        0 == a.length ? this.$slider = t("<img />").prependTo(this.$mirror) : (this.$slider = a.prependTo(this.$mirror), n = !0), this.$mirror.addClass("parallax-mirror").css({
            visibility: "hidden",
            zIndex: this.zIndex,
            position: "fixed",
            top: 0,
            left: 0,
            overflow: "hidden"
        }), this.$slider.addClass("parallax-slider").one("load", function () {
            h.naturalHeight && h.naturalWidth || (h.naturalHeight = this.naturalHeight || this.height || 1, h.naturalWidth = this.naturalWidth || this.width || 1), h.aspectRatio = h.naturalWidth / h.naturalHeight, o.isSetup || o.setup(), o.sliders.push(h), o.isFresh = !1, o.requestRender()
        }), n || (this.$slider[0].src = this.imageSrc), (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || a.length > 0) && this.$slider.trigger("load")
    }! function () {
        for (var t = 0, e = ["ms", "moz", "webkit", "o"], s = 0; s < e.length && !i.requestAnimationFrame; ++s) i.requestAnimationFrame = i[e[s] + "RequestAnimationFrame"], i.cancelAnimationFrame = i[e[s] + "CancelAnimationFrame"] || i[e[s] + "CancelRequestAnimationFrame"];
        i.requestAnimationFrame || (i.requestAnimationFrame = function (e) {
            var s = (new Date).getTime(),
                o = Math.max(0, 16 - (s - t)),
                h = i.setTimeout(function () {
                    e(s + o)
                }, o);
            return t = s + o, h
        }), i.cancelAnimationFrame || (i.cancelAnimationFrame = function (t) {
            clearTimeout(t)
        })
    }(), t.extend(o.prototype, {
        speed: .2,
        bleed: 0,
        zIndex: -100,
        iosFix: !0,
        androidFix: !0,
        position: "center",
        overScrollFix: !1,
        mirrorContainer: "body",
        refresh: function () {
            this.boxWidth = this.$element.outerWidth(), this.boxHeight = this.$element.outerHeight() + 2 * this.bleed, this.boxOffsetTop = this.$element.offset().top - this.bleed, this.boxOffsetLeft = this.$element.offset().left, this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
            var t, i = o.winHeight,
                e = o.docHeight,
                s = Math.min(this.boxOffsetTop, e - i),
                h = Math.max(this.boxOffsetTop + this.boxHeight - i, 0),
                r = this.boxHeight + (s - h) * (1 - this.speed) | 0,
                a = (this.boxOffsetTop - s) * (1 - this.speed) | 0;
            r * this.aspectRatio >= this.boxWidth ? (this.imageWidth = r * this.aspectRatio | 0, this.imageHeight = r, this.offsetBaseTop = a, t = this.imageWidth - this.boxWidth, "left" == this.positionX ? this.offsetLeft = 0 : "right" == this.positionX ? this.offsetLeft = -t : isNaN(this.positionX) ? this.offsetLeft = -t / 2 | 0 : this.offsetLeft = Math.max(this.positionX, -t)) : (this.imageWidth = this.boxWidth, this.imageHeight = this.boxWidth / this.aspectRatio | 0, this.offsetLeft = 0, t = this.imageHeight - r, "top" == this.positionY ? this.offsetBaseTop = a : "bottom" == this.positionY ? this.offsetBaseTop = a - t : isNaN(this.positionY) ? this.offsetBaseTop = a - t / 2 | 0 : this.offsetBaseTop = a + Math.max(this.positionY, -t))
        },
        render: function () {
            var t = o.scrollTop,
                i = o.scrollLeft,
                e = this.overScrollFix ? o.overScroll : 0,
                s = t + o.winHeight;
            this.boxOffsetBottom > t && this.boxOffsetTop <= s ? (this.visibility = "visible", this.mirrorTop = this.boxOffsetTop - t, this.mirrorLeft = this.boxOffsetLeft - i, this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed)) : this.visibility = "hidden", this.$mirror.css({
                transform: "translate3d(" + this.mirrorLeft + "px, " + (this.mirrorTop - e) + "px, 0px)",
                visibility: this.visibility,
                height: this.boxHeight,
                width: this.boxWidth
            }), this.$slider.css({
                transform: "translate3d(" + this.offsetLeft + "px, " + this.offsetTop + "px, 0px)",
                position: "absolute",
                height: this.imageHeight,
                width: this.imageWidth,
                maxWidth: "none"
            })
        }
    }), t.extend(o, {
        scrollTop: 0,
        scrollLeft: 0,
        winHeight: 0,
        winWidth: 0,
        docHeight: 1 << 30,
        docWidth: 1 << 30,
        sliders: [],
        isReady: !1,
        isFresh: !1,
        isBusy: !1,
        setup: function () {
            function s() {
                if (p == i.pageYOffset) return i.requestAnimationFrame(s), !1;
                p = i.pageYOffset, h.render(), i.requestAnimationFrame(s)
            }
            if (!this.isReady) {
                var h = this,
                    r = t(e),
                    a = t(i),
                    n = function () {
                        o.winHeight = a.height(), o.winWidth = a.width(), o.docHeight = r.height(), o.docWidth = r.width()
                    },
                    l = function () {
                        var t = a.scrollTop(),
                            i = o.docHeight - o.winHeight,
                            e = o.docWidth - o.winWidth;
                        o.scrollTop = Math.max(0, Math.min(i, t)), o.scrollLeft = Math.max(0, Math.min(e, a.scrollLeft())), o.overScroll = Math.max(t - i, Math.min(t, 0))
                    };
                a.on("resize.px.parallax load.px.parallax", function () {
                    n(), h.refresh(), o.isFresh = !1, o.requestRender()
                }).on("scroll.px.parallax load.px.parallax", function () {
                    l(), o.requestRender()
                }), n(), l(), this.isReady = !0;
                var p = -1;
                s()
            }
        },
        configure: function (i) {
            "object" == typeof i && (delete i.refresh, delete i.render, t.extend(this.prototype, i))
        },
        refresh: function () {
            t.each(this.sliders, function () {
                this.refresh()
            }), this.isFresh = !0
        },
        render: function () {
            this.isFresh || this.refresh(), t.each(this.sliders, function () {
                this.render()
            })
        },
        requestRender: function () {
            var t = this;
            t.render(), t.isBusy = !1
        },
        destroy: function (e) {
            var s, h = t(e).data("px.parallax");
            for (h.$mirror.remove(), s = 0; s < this.sliders.length; s += 1) this.sliders[s] == h && this.sliders.splice(s, 1);
            t(e).data("px.parallax", !1), 0 === this.sliders.length && (t(i).off("scroll.px.parallax resize.px.parallax load.px.parallax"), this.isReady = !1, o.isSetup = !1)
        }
    });
    var h = t.fn.parallax;
    t.fn.parallax = function (s) {
        return this.each(function () {
            var h = t(this),
                r = "object" == typeof s && s;
            this == i || this == e || h.is("body") ? o.configure(r) : h.data("px.parallax") ? "object" == typeof s && t.extend(h.data("px.parallax"), r) : (r = t.extend({}, h.data(), r), h.data("px.parallax", new o(this, r))), "string" == typeof s && ("destroy" == s ? o.destroy(this) : o[s]())
        })
    }, t.fn.parallax.Constructor = o, t.fn.parallax.noConflict = function () {
        return t.fn.parallax = h, this
    }, t(function () {
        t('[data-parallax="scroll"]').parallax()
    })
}(jQuery, window, document);
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('nav');
const instrumentMembers = document.querySelectorAll('.band__member-instrument');

const player = new Plyr('#player', {
    controls: ['play-large', 'play', 'progress', 'current-time']
});

const scrollSmooth = function (minus) {
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - minus
            }, 1000);
        }
    });
}

if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i) ||
    window.innerWidth < 1023
) {
    scrollSmooth(0);
    window.addEventListener('scroll', () => {
        instrumentMembers.forEach(member => {
            const instrument = document.querySelector(`p[data-inst="${member.textContent}"]`);
            if (window.pageYOffset >= member.offsetTop - ((window.innerHeight + 300) / 2)) {
                instrument.classList.add('band__member-instrument--is-active');
            } else {
                instrument.classList.remove('band__member-instrument--is-active');
            }
        })
    })
} else {
    scrollSmooth(nav.offsetHeight);
}

// if (window.innerWidth >= 1023) {
//     scrollSmooth(nav.offsetHeight);
// }
const isActive = function () {
    nav.classList.toggle('header__nav--is-active')
    burger.classList.toggle('header__burger--is-active');
    burger.classList.toggle('opacity');
}

burger.addEventListener('click', () => {
    isActive();
})

nav.addEventListener('click', () => {
    isActive();
})