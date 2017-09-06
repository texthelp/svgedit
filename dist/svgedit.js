const jquery = require('jquery'); const jQuery = jquery; const $ = jquery; (function() { var svgedit = {NS:{HTML:"http://www.w3.org/1999/xhtml", MATH:"http://www.w3.org/1998/Math/MathML", SE:"http://svg-edit.googlecode.com", SVG:"http://www.w3.org/2000/svg", XLINK:"http://www.w3.org/1999/xlink", XML:"http://www.w3.org/XML/1998/namespace", XMLNS:"http://www.w3.org/2000/xmlns/"}};
svgedit.getReverseNS = function() {
  var reverseNS = {};
  $.each(this.NS, function(name, URI) {
    reverseNS[URI] = name.toLowerCase()
  });
  return reverseNS
};(function() {
  var proxied = jQuery.fn.attr, svgns = "http://www.w3.org/2000/svg";
  jQuery.fn.attr = function(key, value) {
    var i, attr;
    var len = this.length;
    if(!len) {
      return proxied.apply(this, arguments)
    }
    for(i = 0;i < len;++i) {
      var elem = this[i];
      if(elem.namespaceURI === svgns) {
        if(value !== undefined) {
          elem.setAttribute(key, value)
        }else {
          if($.isArray(key)) {
            var j = key.length, obj = {};
            while(j--) {
              var aname = key[j];
              attr = elem.getAttribute(aname);
              if(attr || attr === "0") {
                attr = isNaN(attr) ? attr : attr - 0
              }
              obj[aname] = attr
            }
            return obj
          }
        }
        if(typeof key === "object") {
          var v;
          for(v in key) {
            elem.setAttribute(v, key[v])
          }
        }else {
          attr = elem.getAttribute(key);
          if(attr || attr === "0") {
            attr = isNaN(attr) ? attr : attr - 0
          }
          return attr
        }
      }else {
        return proxied.apply(this, arguments)
      }
    }
    return this
  }
})();(function() {
  if(!window.SVGPathSeg) {
    window.SVGPathSeg = function(type, typeAsLetter, owningPathSegList) {
      this.pathSegType = type;
      this.pathSegTypeAsLetter = typeAsLetter;
      this._owningPathSegList = owningPathSegList
    };
    SVGPathSeg.PATHSEG_UNKNOWN = 0;
    SVGPathSeg.PATHSEG_CLOSEPATH = 1;
    SVGPathSeg.PATHSEG_MOVETO_ABS = 2;
    SVGPathSeg.PATHSEG_MOVETO_REL = 3;
    SVGPathSeg.PATHSEG_LINETO_ABS = 4;
    SVGPathSeg.PATHSEG_LINETO_REL = 5;
    SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6;
    SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7;
    SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8;
    SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9;
    SVGPathSeg.PATHSEG_ARC_ABS = 10;
    SVGPathSeg.PATHSEG_ARC_REL = 11;
    SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12;
    SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13;
    SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14;
    SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15;
    SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16;
    SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17;
    SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18;
    SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19;
    SVGPathSeg.prototype._segmentChanged = function() {
      if(this._owningPathSegList) {
        this._owningPathSegList.segmentChanged(this)
      }
    };
    window.SVGPathSegClosePath = function(owningPathSegList) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CLOSEPATH, "z", owningPathSegList)
    };
    SVGPathSegClosePath.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegClosePath.prototype.toString = function() {
      return"[object SVGPathSegClosePath]"
    };
    SVGPathSegClosePath.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter
    };
    SVGPathSegClosePath.prototype.clone = function() {
      return new SVGPathSegClosePath(undefined)
    };
    window.SVGPathSegMovetoAbs = function(owningPathSegList, x, y) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_MOVETO_ABS, "M", owningPathSegList);
      this._x = x;
      this._y = y
    };
    SVGPathSegMovetoAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegMovetoAbs.prototype.toString = function() {
      return"[object SVGPathSegMovetoAbs]"
    };
    SVGPathSegMovetoAbs.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
    };
    SVGPathSegMovetoAbs.prototype.clone = function() {
      return new SVGPathSegMovetoAbs(undefined, this._x, this._y)
    };
    Object.defineProperty(SVGPathSegMovetoAbs.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegMovetoAbs.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegMovetoRel = function(owningPathSegList, x, y) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_MOVETO_REL, "m", owningPathSegList);
      this._x = x;
      this._y = y
    };
    SVGPathSegMovetoRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegMovetoRel.prototype.toString = function() {
      return"[object SVGPathSegMovetoRel]"
    };
    SVGPathSegMovetoRel.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
    };
    SVGPathSegMovetoRel.prototype.clone = function() {
      return new SVGPathSegMovetoRel(undefined, this._x, this._y)
    };
    Object.defineProperty(SVGPathSegMovetoRel.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegMovetoRel.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegLinetoAbs = function(owningPathSegList, x, y) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_ABS, "L", owningPathSegList);
      this._x = x;
      this._y = y
    };
    SVGPathSegLinetoAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegLinetoAbs.prototype.toString = function() {
      return"[object SVGPathSegLinetoAbs]"
    };
    SVGPathSegLinetoAbs.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
    };
    SVGPathSegLinetoAbs.prototype.clone = function() {
      return new SVGPathSegLinetoAbs(undefined, this._x, this._y)
    };
    Object.defineProperty(SVGPathSegLinetoAbs.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegLinetoAbs.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegLinetoRel = function(owningPathSegList, x, y) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_REL, "l", owningPathSegList);
      this._x = x;
      this._y = y
    };
    SVGPathSegLinetoRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegLinetoRel.prototype.toString = function() {
      return"[object SVGPathSegLinetoRel]"
    };
    SVGPathSegLinetoRel.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
    };
    SVGPathSegLinetoRel.prototype.clone = function() {
      return new SVGPathSegLinetoRel(undefined, this._x, this._y)
    };
    Object.defineProperty(SVGPathSegLinetoRel.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegLinetoRel.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegCurvetoCubicAbs = function(owningPathSegList, x, y, x1, y1, x2, y2) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "C", owningPathSegList);
      this._x = x;
      this._y = y;
      this._x1 = x1;
      this._y1 = y1;
      this._x2 = x2;
      this._y2 = y2
    };
    SVGPathSegCurvetoCubicAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegCurvetoCubicAbs.prototype.toString = function() {
      return"[object SVGPathSegCurvetoCubicAbs]"
    };
    SVGPathSegCurvetoCubicAbs.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
    };
    SVGPathSegCurvetoCubicAbs.prototype.clone = function() {
      return new SVGPathSegCurvetoCubicAbs(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2)
    };
    Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "x1", {get:function() {
      return this._x1
    }, set:function(x1) {
      this._x1 = x1;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "y1", {get:function() {
      return this._y1
    }, set:function(y1) {
      this._y1 = y1;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "x2", {get:function() {
      return this._x2
    }, set:function(x2) {
      this._x2 = x2;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "y2", {get:function() {
      return this._y2
    }, set:function(y2) {
      this._y2 = y2;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegCurvetoCubicRel = function(owningPathSegList, x, y, x1, y1, x2, y2) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "c", owningPathSegList);
      this._x = x;
      this._y = y;
      this._x1 = x1;
      this._y1 = y1;
      this._x2 = x2;
      this._y2 = y2
    };
    SVGPathSegCurvetoCubicRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegCurvetoCubicRel.prototype.toString = function() {
      return"[object SVGPathSegCurvetoCubicRel]"
    };
    SVGPathSegCurvetoCubicRel.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
    };
    SVGPathSegCurvetoCubicRel.prototype.clone = function() {
      return new SVGPathSegCurvetoCubicRel(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2)
    };
    Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "x1", {get:function() {
      return this._x1
    }, set:function(x1) {
      this._x1 = x1;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "y1", {get:function() {
      return this._y1
    }, set:function(y1) {
      this._y1 = y1;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "x2", {get:function() {
      return this._x2
    }, set:function(x2) {
      this._x2 = x2;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "y2", {get:function() {
      return this._y2
    }, set:function(y2) {
      this._y2 = y2;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegCurvetoQuadraticAbs = function(owningPathSegList, x, y, x1, y1) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "Q", owningPathSegList);
      this._x = x;
      this._y = y;
      this._x1 = x1;
      this._y1 = y1
    };
    SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegCurvetoQuadraticAbs.prototype.toString = function() {
      return"[object SVGPathSegCurvetoQuadraticAbs]"
    };
    SVGPathSegCurvetoQuadraticAbs.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y
    };
    SVGPathSegCurvetoQuadraticAbs.prototype.clone = function() {
      return new SVGPathSegCurvetoQuadraticAbs(undefined, this._x, this._y, this._x1, this._y1)
    };
    Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "x1", {get:function() {
      return this._x1
    }, set:function(x1) {
      this._x1 = x1;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "y1", {get:function() {
      return this._y1
    }, set:function(y1) {
      this._y1 = y1;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegCurvetoQuadraticRel = function(owningPathSegList, x, y, x1, y1) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "q", owningPathSegList);
      this._x = x;
      this._y = y;
      this._x1 = x1;
      this._y1 = y1
    };
    SVGPathSegCurvetoQuadraticRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegCurvetoQuadraticRel.prototype.toString = function() {
      return"[object SVGPathSegCurvetoQuadraticRel]"
    };
    SVGPathSegCurvetoQuadraticRel.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y
    };
    SVGPathSegCurvetoQuadraticRel.prototype.clone = function() {
      return new SVGPathSegCurvetoQuadraticRel(undefined, this._x, this._y, this._x1, this._y1)
    };
    Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "x1", {get:function() {
      return this._x1
    }, set:function(x1) {
      this._x1 = x1;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "y1", {get:function() {
      return this._y1
    }, set:function(y1) {
      this._y1 = y1;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegArcAbs = function(owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_ARC_ABS, "A", owningPathSegList);
      this._x = x;
      this._y = y;
      this._r1 = r1;
      this._r2 = r2;
      this._angle = angle;
      this._largeArcFlag = largeArcFlag;
      this._sweepFlag = sweepFlag
    };
    SVGPathSegArcAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegArcAbs.prototype.toString = function() {
      return"[object SVGPathSegArcAbs]"
    };
    SVGPathSegArcAbs.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y
    };
    SVGPathSegArcAbs.prototype.clone = function() {
      return new SVGPathSegArcAbs(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag)
    };
    Object.defineProperty(SVGPathSegArcAbs.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegArcAbs.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegArcAbs.prototype, "r1", {get:function() {
      return this._r1
    }, set:function(r1) {
      this._r1 = r1;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegArcAbs.prototype, "r2", {get:function() {
      return this._r2
    }, set:function(r2) {
      this._r2 = r2;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegArcAbs.prototype, "angle", {get:function() {
      return this._angle
    }, set:function(angle) {
      this._angle = angle;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegArcAbs.prototype, "largeArcFlag", {get:function() {
      return this._largeArcFlag
    }, set:function(largeArcFlag) {
      this._largeArcFlag = largeArcFlag;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegArcAbs.prototype, "sweepFlag", {get:function() {
      return this._sweepFlag
    }, set:function(sweepFlag) {
      this._sweepFlag = sweepFlag;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegArcRel = function(owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_ARC_REL, "a", owningPathSegList);
      this._x = x;
      this._y = y;
      this._r1 = r1;
      this._r2 = r2;
      this._angle = angle;
      this._largeArcFlag = largeArcFlag;
      this._sweepFlag = sweepFlag
    };
    SVGPathSegArcRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegArcRel.prototype.toString = function() {
      return"[object SVGPathSegArcRel]"
    };
    SVGPathSegArcRel.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y
    };
    SVGPathSegArcRel.prototype.clone = function() {
      return new SVGPathSegArcRel(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag)
    };
    Object.defineProperty(SVGPathSegArcRel.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegArcRel.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegArcRel.prototype, "r1", {get:function() {
      return this._r1
    }, set:function(r1) {
      this._r1 = r1;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegArcRel.prototype, "r2", {get:function() {
      return this._r2
    }, set:function(r2) {
      this._r2 = r2;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegArcRel.prototype, "angle", {get:function() {
      return this._angle
    }, set:function(angle) {
      this._angle = angle;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegArcRel.prototype, "largeArcFlag", {get:function() {
      return this._largeArcFlag
    }, set:function(largeArcFlag) {
      this._largeArcFlag = largeArcFlag;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegArcRel.prototype, "sweepFlag", {get:function() {
      return this._sweepFlag
    }, set:function(sweepFlag) {
      this._sweepFlag = sweepFlag;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegLinetoHorizontalAbs = function(owningPathSegList, x) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "H", owningPathSegList);
      this._x = x
    };
    SVGPathSegLinetoHorizontalAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegLinetoHorizontalAbs.prototype.toString = function() {
      return"[object SVGPathSegLinetoHorizontalAbs]"
    };
    SVGPathSegLinetoHorizontalAbs.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._x
    };
    SVGPathSegLinetoHorizontalAbs.prototype.clone = function() {
      return new SVGPathSegLinetoHorizontalAbs(undefined, this._x)
    };
    Object.defineProperty(SVGPathSegLinetoHorizontalAbs.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegLinetoHorizontalRel = function(owningPathSegList, x) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "h", owningPathSegList);
      this._x = x
    };
    SVGPathSegLinetoHorizontalRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegLinetoHorizontalRel.prototype.toString = function() {
      return"[object SVGPathSegLinetoHorizontalRel]"
    };
    SVGPathSegLinetoHorizontalRel.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._x
    };
    SVGPathSegLinetoHorizontalRel.prototype.clone = function() {
      return new SVGPathSegLinetoHorizontalRel(undefined, this._x)
    };
    Object.defineProperty(SVGPathSegLinetoHorizontalRel.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegLinetoVerticalAbs = function(owningPathSegList, y) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "V", owningPathSegList);
      this._y = y
    };
    SVGPathSegLinetoVerticalAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegLinetoVerticalAbs.prototype.toString = function() {
      return"[object SVGPathSegLinetoVerticalAbs]"
    };
    SVGPathSegLinetoVerticalAbs.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._y
    };
    SVGPathSegLinetoVerticalAbs.prototype.clone = function() {
      return new SVGPathSegLinetoVerticalAbs(undefined, this._y)
    };
    Object.defineProperty(SVGPathSegLinetoVerticalAbs.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegLinetoVerticalRel = function(owningPathSegList, y) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "v", owningPathSegList);
      this._y = y
    };
    SVGPathSegLinetoVerticalRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegLinetoVerticalRel.prototype.toString = function() {
      return"[object SVGPathSegLinetoVerticalRel]"
    };
    SVGPathSegLinetoVerticalRel.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._y
    };
    SVGPathSegLinetoVerticalRel.prototype.clone = function() {
      return new SVGPathSegLinetoVerticalRel(undefined, this._y)
    };
    Object.defineProperty(SVGPathSegLinetoVerticalRel.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegCurvetoCubicSmoothAbs = function(owningPathSegList, x, y, x2, y2) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "S", owningPathSegList);
      this._x = x;
      this._y = y;
      this._x2 = x2;
      this._y2 = y2
    };
    SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegCurvetoCubicSmoothAbs.prototype.toString = function() {
      return"[object SVGPathSegCurvetoCubicSmoothAbs]"
    };
    SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
    };
    SVGPathSegCurvetoCubicSmoothAbs.prototype.clone = function() {
      return new SVGPathSegCurvetoCubicSmoothAbs(undefined, this._x, this._y, this._x2, this._y2)
    };
    Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "x2", {get:function() {
      return this._x2
    }, set:function(x2) {
      this._x2 = x2;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "y2", {get:function() {
      return this._y2
    }, set:function(y2) {
      this._y2 = y2;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegCurvetoCubicSmoothRel = function(owningPathSegList, x, y, x2, y2) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "s", owningPathSegList);
      this._x = x;
      this._y = y;
      this._x2 = x2;
      this._y2 = y2
    };
    SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegCurvetoCubicSmoothRel.prototype.toString = function() {
      return"[object SVGPathSegCurvetoCubicSmoothRel]"
    };
    SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
    };
    SVGPathSegCurvetoCubicSmoothRel.prototype.clone = function() {
      return new SVGPathSegCurvetoCubicSmoothRel(undefined, this._x, this._y, this._x2, this._y2)
    };
    Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "x2", {get:function() {
      return this._x2
    }, set:function(x2) {
      this._x2 = x2;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "y2", {get:function() {
      return this._y2
    }, set:function(y2) {
      this._y2 = y2;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegCurvetoQuadraticSmoothAbs = function(owningPathSegList, x, y) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "T", owningPathSegList);
      this._x = x;
      this._y = y
    };
    SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString = function() {
      return"[object SVGPathSegCurvetoQuadraticSmoothAbs]"
    };
    SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
    };
    SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone = function() {
      return new SVGPathSegCurvetoQuadraticSmoothAbs(undefined, this._x, this._y)
    };
    Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    window.SVGPathSegCurvetoQuadraticSmoothRel = function(owningPathSegList, x, y) {
      SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "t", owningPathSegList);
      this._x = x;
      this._y = y
    };
    SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString = function() {
      return"[object SVGPathSegCurvetoQuadraticSmoothRel]"
    };
    SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString = function() {
      return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
    };
    SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone = function() {
      return new SVGPathSegCurvetoQuadraticSmoothRel(undefined, this._x, this._y)
    };
    Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothRel.prototype, "x", {get:function() {
      return this._x
    }, set:function(x) {
      this._x = x;
      this._segmentChanged()
    }, enumerable:true});
    Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothRel.prototype, "y", {get:function() {
      return this._y
    }, set:function(y) {
      this._y = y;
      this._segmentChanged()
    }, enumerable:true});
    SVGPathElement.prototype.createSVGPathSegClosePath = function() {
      return new SVGPathSegClosePath(undefined)
    };
    SVGPathElement.prototype.createSVGPathSegMovetoAbs = function(x, y) {
      return new SVGPathSegMovetoAbs(undefined, x, y)
    };
    SVGPathElement.prototype.createSVGPathSegMovetoRel = function(x, y) {
      return new SVGPathSegMovetoRel(undefined, x, y)
    };
    SVGPathElement.prototype.createSVGPathSegLinetoAbs = function(x, y) {
      return new SVGPathSegLinetoAbs(undefined, x, y)
    };
    SVGPathElement.prototype.createSVGPathSegLinetoRel = function(x, y) {
      return new SVGPathSegLinetoRel(undefined, x, y)
    };
    SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function(x, y, x1, y1, x2, y2) {
      return new SVGPathSegCurvetoCubicAbs(undefined, x, y, x1, y1, x2, y2)
    };
    SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function(x, y, x1, y1, x2, y2) {
      return new SVGPathSegCurvetoCubicRel(undefined, x, y, x1, y1, x2, y2)
    };
    SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function(x, y, x1, y1) {
      return new SVGPathSegCurvetoQuadraticAbs(undefined, x, y, x1, y1)
    };
    SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function(x, y, x1, y1) {
      return new SVGPathSegCurvetoQuadraticRel(undefined, x, y, x1, y1)
    };
    SVGPathElement.prototype.createSVGPathSegArcAbs = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
      return new SVGPathSegArcAbs(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag)
    };
    SVGPathElement.prototype.createSVGPathSegArcRel = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
      return new SVGPathSegArcRel(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag)
    };
    SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function(x) {
      return new SVGPathSegLinetoHorizontalAbs(undefined, x)
    };
    SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function(x) {
      return new SVGPathSegLinetoHorizontalRel(undefined, x)
    };
    SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function(y) {
      return new SVGPathSegLinetoVerticalAbs(undefined, y)
    };
    SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function(y) {
      return new SVGPathSegLinetoVerticalRel(undefined, y)
    };
    SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function(x, y, x2, y2) {
      return new SVGPathSegCurvetoCubicSmoothAbs(undefined, x, y, x2, y2)
    };
    SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function(x, y, x2, y2) {
      return new SVGPathSegCurvetoCubicSmoothRel(undefined, x, y, x2, y2)
    };
    SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function(x, y) {
      return new SVGPathSegCurvetoQuadraticSmoothAbs(undefined, x, y)
    };
    SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function(x, y) {
      return new SVGPathSegCurvetoQuadraticSmoothRel(undefined, x, y)
    }
  }
  if(!window.SVGPathSegList) {
    window.SVGPathSegList = function(pathElement) {
      this._pathElement = pathElement;
      this._list = this._parsePath(this._pathElement.getAttribute("d"));
      this._mutationObserverConfig = {attributes:true, attributeFilter:["d"]};
      this._pathElementMutationObserver = new MutationObserver(this._updateListFromPathMutations.bind(this));
      this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig)
    };
    Object.defineProperty(SVGPathSegList.prototype, "numberOfItems", {get:function() {
      this._checkPathSynchronizedToList();
      return this._list.length
    }});
    SVGPathSegList.prototype._checkPathSynchronizedToList = function() {
      this._updateListFromPathMutations(this._pathElementMutationObserver.takeRecords())
    };
    SVGPathSegList.prototype._updateListFromPathMutations = function(mutationRecords) {
      if(!this._pathElement) {
        return
      }
      var hasPathMutations = false;
      mutationRecords.forEach(function(record) {
        if(record.attributeName == "d") {
          hasPathMutations = true
        }
      });
      if(hasPathMutations) {
        this._list = this._parsePath(this._pathElement.getAttribute("d"))
      }
    };
    SVGPathSegList.prototype._writeListToPath = function() {
      this._pathElementMutationObserver.disconnect();
      this._pathElement.setAttribute("d", SVGPathSegList._pathSegArrayAsString(this._list));
      this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig)
    };
    SVGPathSegList.prototype.segmentChanged = function(pathSeg) {
      this._writeListToPath()
    };
    SVGPathSegList.prototype.clear = function() {
      this._checkPathSynchronizedToList();
      this._list.forEach(function(pathSeg) {
        pathSeg._owningPathSegList = null
      });
      this._list = [];
      this._writeListToPath()
    };
    SVGPathSegList.prototype.initialize = function(newItem) {
      this._checkPathSynchronizedToList();
      this._list = [newItem];
      newItem._owningPathSegList = this;
      this._writeListToPath();
      return newItem
    };
    SVGPathSegList.prototype._checkValidIndex = function(index) {
      if(isNaN(index) || index < 0 || index >= this.numberOfItems) {
        throw"INDEX_SIZE_ERR";
      }
    };
    SVGPathSegList.prototype.getItem = function(index) {
      this._checkPathSynchronizedToList();
      this._checkValidIndex(index);
      return this._list[index]
    };
    SVGPathSegList.prototype.insertItemBefore = function(newItem, index) {
      this._checkPathSynchronizedToList();
      if(index > this.numberOfItems) {
        index = this.numberOfItems
      }
      if(newItem._owningPathSegList) {
        newItem = newItem.clone()
      }
      this._list.splice(index, 0, newItem);
      newItem._owningPathSegList = this;
      this._writeListToPath();
      return newItem
    };
    SVGPathSegList.prototype.replaceItem = function(newItem, index) {
      this._checkPathSynchronizedToList();
      if(newItem._owningPathSegList) {
        newItem = newItem.clone()
      }
      this._checkValidIndex(index);
      this._list[index] = newItem;
      newItem._owningPathSegList = this;
      this._writeListToPath();
      return newItem
    };
    SVGPathSegList.prototype.removeItem = function(index) {
      this._checkPathSynchronizedToList();
      this._checkValidIndex(index);
      var item = this._list[index];
      this._list.splice(index, 1);
      this._writeListToPath();
      return item
    };
    SVGPathSegList.prototype.appendItem = function(newItem) {
      this._checkPathSynchronizedToList();
      if(newItem._owningPathSegList) {
        newItem = newItem.clone()
      }
      this._list.push(newItem);
      newItem._owningPathSegList = this;
      this._writeListToPath();
      return newItem
    };
    SVGPathSegList._pathSegArrayAsString = function(pathSegArray) {
      var string = "";
      var first = true;
      pathSegArray.forEach(function(pathSeg) {
        if(first) {
          first = false;
          string += pathSeg._asPathString()
        }else {
          string += " " + pathSeg._asPathString()
        }
      });
      return string
    };
    SVGPathSegList.prototype._parsePath = function(string) {
      if(!string || string.length == 0) {
        return[]
      }
      var owningPathSegList = this;
      var Builder = function() {
        this.pathSegList = []
      };
      Builder.prototype.appendSegment = function(pathSeg) {
        this.pathSegList.push(pathSeg)
      };
      var Source = function(string) {
        this._string = string;
        this._currentIndex = 0;
        this._endIndex = this._string.length;
        this._previousCommand = SVGPathSeg.PATHSEG_UNKNOWN;
        this._skipOptionalSpaces()
      };
      Source.prototype._isCurrentSpace = function() {
        var character = this._string[this._currentIndex];
        return character <= " " && (character == " " || character == "\n" || character == "\t" || character == "\r" || character == "\u000c")
      };
      Source.prototype._skipOptionalSpaces = function() {
        while(this._currentIndex < this._endIndex && this._isCurrentSpace()) {
          this._currentIndex++
        }
        return this._currentIndex < this._endIndex
      };
      Source.prototype._skipOptionalSpacesOrDelimiter = function() {
        if(this._currentIndex < this._endIndex && !this._isCurrentSpace() && this._string.charAt(this._currentIndex) != ",") {
          return false
        }
        if(this._skipOptionalSpaces()) {
          if(this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ",") {
            this._currentIndex++;
            this._skipOptionalSpaces()
          }
        }
        return this._currentIndex < this._endIndex
      };
      Source.prototype.hasMoreData = function() {
        return this._currentIndex < this._endIndex
      };
      Source.prototype.peekSegmentType = function() {
        var lookahead = this._string[this._currentIndex];
        return this._pathSegTypeFromChar(lookahead)
      };
      Source.prototype._pathSegTypeFromChar = function(lookahead) {
        switch(lookahead) {
          case "Z":
          ;
          case "z":
            return SVGPathSeg.PATHSEG_CLOSEPATH;
          case "M":
            return SVGPathSeg.PATHSEG_MOVETO_ABS;
          case "m":
            return SVGPathSeg.PATHSEG_MOVETO_REL;
          case "L":
            return SVGPathSeg.PATHSEG_LINETO_ABS;
          case "l":
            return SVGPathSeg.PATHSEG_LINETO_REL;
          case "C":
            return SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
          case "c":
            return SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
          case "Q":
            return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
          case "q":
            return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
          case "A":
            return SVGPathSeg.PATHSEG_ARC_ABS;
          case "a":
            return SVGPathSeg.PATHSEG_ARC_REL;
          case "H":
            return SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
          case "h":
            return SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
          case "V":
            return SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
          case "v":
            return SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
          case "S":
            return SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
          case "s":
            return SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
          case "T":
            return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
          case "t":
            return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
          default:
            return SVGPathSeg.PATHSEG_UNKNOWN
        }
      };
      Source.prototype._nextCommandHelper = function(lookahead, previousCommand) {
        if((lookahead == "+" || lookahead == "-" || lookahead == "." || lookahead >= "0" && lookahead <= "9") && previousCommand != SVGPathSeg.PATHSEG_CLOSEPATH) {
          if(previousCommand == SVGPathSeg.PATHSEG_MOVETO_ABS) {
            return SVGPathSeg.PATHSEG_LINETO_ABS
          }
          if(previousCommand == SVGPathSeg.PATHSEG_MOVETO_REL) {
            return SVGPathSeg.PATHSEG_LINETO_REL
          }
          return previousCommand
        }
        return SVGPathSeg.PATHSEG_UNKNOWN
      };
      Source.prototype.initialCommandIsMoveTo = function() {
        if(!this.hasMoreData()) {
          return true
        }
        var command = this.peekSegmentType();
        return command == SVGPathSeg.PATHSEG_MOVETO_ABS || command == SVGPathSeg.PATHSEG_MOVETO_REL
      };
      Source.prototype._parseNumber = function() {
        var exponent = 0;
        var integer = 0;
        var frac = 1;
        var decimal = 0;
        var sign = 1;
        var expsign = 1;
        var startIndex = this._currentIndex;
        this._skipOptionalSpaces();
        if(this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "+") {
          this._currentIndex++
        }else {
          if(this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "-") {
            this._currentIndex++;
            sign = -1
          }
        }
        if(this._currentIndex == this._endIndex || (this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") && this._string.charAt(this._currentIndex) != ".") {
          return undefined
        }
        var startIntPartIndex = this._currentIndex;
        while(this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
          this._currentIndex++
        }
        if(this._currentIndex != startIntPartIndex) {
          var scanIntPartIndex = this._currentIndex - 1;
          var multiplier = 1;
          while(scanIntPartIndex >= startIntPartIndex) {
            integer += multiplier * (this._string.charAt(scanIntPartIndex--) - "0");
            multiplier *= 10
          }
        }
        if(this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ".") {
          this._currentIndex++;
          if(this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") {
            return undefined
          }
          while(this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
            decimal += (this._string.charAt(this._currentIndex++) - "0") * (frac *= 0.1)
          }
        }
        if(this._currentIndex != startIndex && this._currentIndex + 1 < this._endIndex && (this._string.charAt(this._currentIndex) == "e" || this._string.charAt(this._currentIndex) == "E") && this._string.charAt(this._currentIndex + 1) != "x" && this._string.charAt(this._currentIndex + 1) != "m") {
          this._currentIndex++;
          if(this._string.charAt(this._currentIndex) == "+") {
            this._currentIndex++
          }else {
            if(this._string.charAt(this._currentIndex) == "-") {
              this._currentIndex++;
              expsign = -1
            }
          }
          if(this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") {
            return undefined
          }
          while(this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
            exponent *= 10;
            exponent += this._string.charAt(this._currentIndex) - "0";
            this._currentIndex++
          }
        }
        var number = integer + decimal;
        number *= sign;
        if(exponent) {
          number *= Math.pow(10, expsign * exponent)
        }
        if(startIndex == this._currentIndex) {
          return undefined
        }
        this._skipOptionalSpacesOrDelimiter();
        return number
      };
      Source.prototype._parseArcFlag = function() {
        if(this._currentIndex >= this._endIndex) {
          return undefined
        }
        var flag = false;
        var flagChar = this._string.charAt(this._currentIndex++);
        if(flagChar == "0") {
          flag = false
        }else {
          if(flagChar == "1") {
            flag = true
          }else {
            return undefined
          }
        }
        this._skipOptionalSpacesOrDelimiter();
        return flag
      };
      Source.prototype.parseSegment = function() {
        var lookahead = this._string[this._currentIndex];
        var command = this._pathSegTypeFromChar(lookahead);
        if(command == SVGPathSeg.PATHSEG_UNKNOWN) {
          if(this._previousCommand == SVGPathSeg.PATHSEG_UNKNOWN) {
            return null
          }
          command = this._nextCommandHelper(lookahead, this._previousCommand);
          if(command == SVGPathSeg.PATHSEG_UNKNOWN) {
            return null
          }
        }else {
          this._currentIndex++
        }
        this._previousCommand = command;
        switch(command) {
          case SVGPathSeg.PATHSEG_MOVETO_REL:
            return new SVGPathSegMovetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
          case SVGPathSeg.PATHSEG_MOVETO_ABS:
            return new SVGPathSegMovetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
          case SVGPathSeg.PATHSEG_LINETO_REL:
            return new SVGPathSegLinetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
          case SVGPathSeg.PATHSEG_LINETO_ABS:
            return new SVGPathSegLinetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
          case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
            return new SVGPathSegLinetoHorizontalRel(owningPathSegList, this._parseNumber());
          case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
            return new SVGPathSegLinetoHorizontalAbs(owningPathSegList, this._parseNumber());
          case SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
            return new SVGPathSegLinetoVerticalRel(owningPathSegList, this._parseNumber());
          case SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
            return new SVGPathSegLinetoVerticalAbs(owningPathSegList, this._parseNumber());
          case SVGPathSeg.PATHSEG_CLOSEPATH:
            this._skipOptionalSpaces();
            return new SVGPathSegClosePath(owningPathSegList);
          case SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
            var points = {x1:this._parseNumber(), y1:this._parseNumber(), x2:this._parseNumber(), y2:this._parseNumber(), x:this._parseNumber(), y:this._parseNumber()};
            return new SVGPathSegCurvetoCubicRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
          case SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
            var points = {x1:this._parseNumber(), y1:this._parseNumber(), x2:this._parseNumber(), y2:this._parseNumber(), x:this._parseNumber(), y:this._parseNumber()};
            return new SVGPathSegCurvetoCubicAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
          case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
            var points = {x2:this._parseNumber(), y2:this._parseNumber(), x:this._parseNumber(), y:this._parseNumber()};
            return new SVGPathSegCurvetoCubicSmoothRel(owningPathSegList, points.x, points.y, points.x2, points.y2);
          case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
            var points = {x2:this._parseNumber(), y2:this._parseNumber(), x:this._parseNumber(), y:this._parseNumber()};
            return new SVGPathSegCurvetoCubicSmoothAbs(owningPathSegList, points.x, points.y, points.x2, points.y2);
          case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
            var points = {x1:this._parseNumber(), y1:this._parseNumber(), x:this._parseNumber(), y:this._parseNumber()};
            return new SVGPathSegCurvetoQuadraticRel(owningPathSegList, points.x, points.y, points.x1, points.y1);
          case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
            var points = {x1:this._parseNumber(), y1:this._parseNumber(), x:this._parseNumber(), y:this._parseNumber()};
            return new SVGPathSegCurvetoQuadraticAbs(owningPathSegList, points.x, points.y, points.x1, points.y1);
          case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
            return new SVGPathSegCurvetoQuadraticSmoothRel(owningPathSegList, this._parseNumber(), this._parseNumber());
          case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
            return new SVGPathSegCurvetoQuadraticSmoothAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
          case SVGPathSeg.PATHSEG_ARC_REL:
            var points = {x1:this._parseNumber(), y1:this._parseNumber(), arcAngle:this._parseNumber(), arcLarge:this._parseArcFlag(), arcSweep:this._parseArcFlag(), x:this._parseNumber(), y:this._parseNumber()};
            return new SVGPathSegArcRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
          case SVGPathSeg.PATHSEG_ARC_ABS:
            var points = {x1:this._parseNumber(), y1:this._parseNumber(), arcAngle:this._parseNumber(), arcLarge:this._parseArcFlag(), arcSweep:this._parseArcFlag(), x:this._parseNumber(), y:this._parseNumber()};
            return new SVGPathSegArcAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
          default:
            throw"Unknown path seg type.";
        }
      };
      var builder = new Builder;
      var source = new Source(string);
      if(!source.initialCommandIsMoveTo()) {
        return[]
      }
      while(source.hasMoreData()) {
        var pathSeg = source.parseSegment();
        if(!pathSeg) {
          return[]
        }
        builder.appendSegment(pathSeg)
      }
      return builder.pathSegList
    };
    Object.defineProperty(SVGPathElement.prototype, "pathSegList", {get:function() {
      if(!this._pathSegList) {
        this._pathSegList = new SVGPathSegList(this)
      }
      return this._pathSegList
    }, enumerable:true});
    Object.defineProperty(SVGPathElement.prototype, "normalizedPathSegList", {get:function() {
      return this.pathSegList
    }, enumerable:true});
    Object.defineProperty(SVGPathElement.prototype, "animatedPathSegList", {get:function() {
      return this.pathSegList
    }, enumerable:true});
    Object.defineProperty(SVGPathElement.prototype, "animatedNormalizedPathSegList", {get:function() {
      return this.pathSegList
    }, enumerable:true})
  }
})();(function() {
  if(!svgedit.browser) {
    svgedit.browser = {}
  }
  var NS = svgedit.NS;
  var supportsSvg_ = function() {
    return!!document.createElementNS && !!document.createElementNS(NS.SVG, "svg").createSVGRect
  }();
  svgedit.browser.supportsSvg = function() {
    return supportsSvg_
  };
  if(!svgedit.browser.supportsSvg()) {
    window.location = "browser-not-supported.html";
    return
  }
  var userAgent = navigator.userAgent;
  var svg = document.createElementNS(NS.SVG, "svg");
  var isOpera_ = !!window.opera;
  var isWebkit_ = userAgent.indexOf("AppleWebKit") >= 0;
  var isGecko_ = userAgent.indexOf("Gecko/") >= 0;
  var isIE_ = userAgent.indexOf("MSIE") >= 0;
  var isChrome_ = userAgent.indexOf("Chrome/") >= 0;
  var isWindows_ = userAgent.indexOf("Windows") >= 0;
  var isMac_ = userAgent.indexOf("Macintosh") >= 0;
  var isTouch_ = "ontouchstart" in window;
  var supportsSelectors_ = function() {
    return!!svg.querySelector
  }();
  var supportsXpath_ = function() {
    return!!document.evaluate
  }();
  var supportsPathReplaceItem_ = function() {
    var path = document.createElementNS(NS.SVG, "path");
    path.setAttribute("d", "M0,0 10,10");
    var seglist = path.pathSegList;
    var seg = path.createSVGPathSegLinetoAbs(5, 5);
    try {
      seglist.replaceItem(seg, 1);
      return true
    }catch(err) {
    }
    return false
  }();
  var supportsPathInsertItemBefore_ = function() {
    var path = document.createElementNS(NS.SVG, "path");
    path.setAttribute("d", "M0,0 10,10");
    var seglist = path.pathSegList;
    var seg = path.createSVGPathSegLinetoAbs(5, 5);
    try {
      seglist.insertItemBefore(seg, 1);
      return true
    }catch(err) {
    }
    return false
  }();
  var supportsGoodTextCharPos_ = function() {
    var svgroot = document.createElementNS(NS.SVG, "svg");
    var svgcontent = document.createElementNS(NS.SVG, "svg");
    document.documentElement.appendChild(svgroot);
    svgcontent.setAttribute("x", 5);
    svgroot.appendChild(svgcontent);
    var text = document.createElementNS(NS.SVG, "text");
    text.textContent = "a";
    svgcontent.appendChild(text);
    var pos = text.getStartPositionOfChar(0).x;
    document.documentElement.removeChild(svgroot);
    return pos === 0
  }();
  var supportsPathBBox_ = function() {
    var svgcontent = document.createElementNS(NS.SVG, "svg");
    document.documentElement.appendChild(svgcontent);
    var path = document.createElementNS(NS.SVG, "path");
    path.setAttribute("d", "M0,0 C0,0 10,10 10,0");
    svgcontent.appendChild(path);
    var bbox = path.getBBox();
    document.documentElement.removeChild(svgcontent);
    return bbox.height > 4 && bbox.height < 5
  }();
  var supportsHVLineContainerBBox_ = function() {
    var svgcontent = document.createElementNS(NS.SVG, "svg");
    document.documentElement.appendChild(svgcontent);
    var path = document.createElementNS(NS.SVG, "path");
    path.setAttribute("d", "M0,0 10,0");
    var path2 = document.createElementNS(NS.SVG, "path");
    path2.setAttribute("d", "M5,0 15,0");
    var g = document.createElementNS(NS.SVG, "g");
    g.appendChild(path);
    g.appendChild(path2);
    svgcontent.appendChild(g);
    var bbox = g.getBBox();
    document.documentElement.removeChild(svgcontent);
    return bbox.width == 15
  }();
  var supportsEditableText_ = function() {
    return isOpera_
  }();
  var supportsGoodDecimals_ = function() {
    var rect = document.createElementNS(NS.SVG, "rect");
    rect.setAttribute("x", 0.1);
    var crect = rect.cloneNode(false);
    var retValue = crect.getAttribute("x").indexOf(",") == -1;
    if(!retValue) {
      $.alert("NOTE: This version of Opera is known to contain bugs in SVG-edit.\n" + 'Please upgrade to the <a href="http://opera.com">latest version</a> in which the problems have been fixed.')
    }
    return retValue
  }();
  var supportsNonScalingStroke_ = function() {
    var rect = document.createElementNS(NS.SVG, "rect");
    rect.setAttribute("style", "vector-effect:non-scaling-stroke");
    return rect.style.vectorEffect === "non-scaling-stroke"
  }();
  var supportsNativeSVGTransformLists_ = function() {
    var rect = document.createElementNS(NS.SVG, "rect");
    var rxform = rect.transform.baseVal;
    var t1 = svg.createSVGTransform();
    rxform.appendItem(t1);
    return rxform.getItem(0) == t1
  }();
  svgedit.browser.isOpera = function() {
    return isOpera_
  };
  svgedit.browser.isWebkit = function() {
    return isWebkit_
  };
  svgedit.browser.isGecko = function() {
    return isGecko_
  };
  svgedit.browser.isIE = function() {
    return isIE_
  };
  svgedit.browser.isChrome = function() {
    return isChrome_
  };
  svgedit.browser.isWindows = function() {
    return isWindows_
  };
  svgedit.browser.isMac = function() {
    return isMac_
  };
  svgedit.browser.isTouch = function() {
    return isTouch_
  };
  svgedit.browser.supportsSelectors = function() {
    return supportsSelectors_
  };
  svgedit.browser.supportsXpath = function() {
    return supportsXpath_
  };
  svgedit.browser.supportsPathReplaceItem = function() {
    return supportsPathReplaceItem_
  };
  svgedit.browser.supportsPathInsertItemBefore = function() {
    return supportsPathInsertItemBefore_
  };
  svgedit.browser.supportsPathBBox = function() {
    return supportsPathBBox_
  };
  svgedit.browser.supportsHVLineContainerBBox = function() {
    return supportsHVLineContainerBBox_
  };
  svgedit.browser.supportsGoodTextCharPos = function() {
    return supportsGoodTextCharPos_
  };
  svgedit.browser.supportsEditableText = function() {
    return supportsEditableText_
  };
  svgedit.browser.supportsGoodDecimals = function() {
    return supportsGoodDecimals_
  };
  svgedit.browser.supportsNonScalingStroke = function() {
    return supportsNonScalingStroke_
  };
  svgedit.browser.supportsNativeTransformLists = function() {
    return supportsNativeSVGTransformLists_
  }
})();(function() {
  if(!svgedit.transformlist) {
    svgedit.transformlist = {}
  }
  var svgroot = document.createElementNS(svgedit.NS.SVG, "svg");
  function transformToString(xform) {
    var m = xform.matrix, text = "";
    switch(xform.type) {
      case 1:
        text = "matrix(" + [m.a, m.b, m.c, m.d, m.e, m.f].join(",") + ")";
        break;
      case 2:
        text = "translate(" + m.e + "," + m.f + ")";
        break;
      case 3:
        if(m.a == m.d) {
          text = "scale(" + m.a + ")"
        }else {
          text = "scale(" + m.a + "," + m.d + ")"
        }
        break;
      case 4:
        var cx = 0, cy = 0;
        if(xform.angle != 0) {
          var K = 1 - m.a;
          cy = (K * m.f + m.b * m.e) / (K * K + m.b * m.b);
          cx = (m.e - m.b * cy) / K
        }
        text = "rotate(" + xform.angle + " " + cx + "," + cy + ")";
        break
    }
    return text
  }
  var listMap_ = {};
  svgedit.transformlist.SVGTransformList = function(elem) {
    this._elem = elem || null;
    this._xforms = [];
    this._update = function() {
      var tstr = "";
      var concatMatrix = svgroot.createSVGMatrix();
      var i;
      for(i = 0;i < this.numberOfItems;++i) {
        var xform = this._list.getItem(i);
        tstr += transformToString(xform) + " "
      }
      this._elem.setAttribute("transform", tstr)
    };
    this._list = this;
    this._init = function() {
      var str = this._elem.getAttribute("transform");
      if(!str) {
        return
      }
      var re = /\s*((scale|matrix|rotate|translate)\s*\(.*?\))\s*,?\s*/;
      var m = true;
      while(m) {
        m = str.match(re);
        str = str.replace(re, "");
        if(m && m[1]) {
          var x = m[1];
          var bits = x.split(/\s*\(/);
          var name = bits[0];
          var val_bits = bits[1].match(/\s*(.*?)\s*\)/);
          val_bits[1] = val_bits[1].replace(/(\d)-/g, "$1 -");
          var val_arr = val_bits[1].split(/[, ]+/);
          var letters = "abcdef".split("");
          var mtx = svgroot.createSVGMatrix();
          $.each(val_arr, function(i, item) {
            val_arr[i] = parseFloat(item);
            if(name == "matrix") {
              mtx[letters[i]] = val_arr[i]
            }
          });
          var xform = svgroot.createSVGTransform();
          var fname = "set" + name.charAt(0).toUpperCase() + name.slice(1);
          var values = name == "matrix" ? [mtx] : val_arr;
          if(name == "scale" && values.length == 1) {
            values.push(values[0])
          }else {
            if(name == "translate" && values.length == 1) {
              values.push(0)
            }else {
              if(name == "rotate" && values.length == 1) {
                values.push(0, 0)
              }
            }
          }
          xform[fname].apply(xform, values);
          this._list.appendItem(xform)
        }
      }
    };
    this._removeFromOtherLists = function(item) {
      if(item) {
        var found = false;
        var id;
        for(id in listMap_) {
          var tl = listMap_[id];
          var i, len;
          for(i = 0, len = tl._xforms.length;i < len;++i) {
            if(tl._xforms[i] == item) {
              found = true;
              tl.removeItem(i);
              break
            }
          }
          if(found) {
            break
          }
        }
      }
    };
    this.numberOfItems = 0;
    this.clear = function() {
      this.numberOfItems = 0;
      this._xforms = []
    };
    this.initialize = function(newItem) {
      this.numberOfItems = 1;
      this._removeFromOtherLists(newItem);
      this._xforms = [newItem]
    };
    this.getItem = function(index) {
      if(index < this.numberOfItems && index >= 0) {
        return this._xforms[index]
      }
      throw{code:1};
    };
    this.insertItemBefore = function(newItem, index) {
      var retValue = null;
      if(index >= 0) {
        if(index < this.numberOfItems) {
          this._removeFromOtherLists(newItem);
          var newxforms = new Array(this.numberOfItems + 1);
          var i;
          for(i = 0;i < index;++i) {
            newxforms[i] = this._xforms[i]
          }
          newxforms[i] = newItem;
          var j;
          for(j = i + 1;i < this.numberOfItems;++j, ++i) {
            newxforms[j] = this._xforms[i]
          }
          this.numberOfItems++;
          this._xforms = newxforms;
          retValue = newItem;
          this._list._update()
        }else {
          retValue = this._list.appendItem(newItem)
        }
      }
      return retValue
    };
    this.replaceItem = function(newItem, index) {
      var retValue = null;
      if(index < this.numberOfItems && index >= 0) {
        this._removeFromOtherLists(newItem);
        this._xforms[index] = newItem;
        retValue = newItem;
        this._list._update()
      }
      return retValue
    };
    this.removeItem = function(index) {
      if(index < this.numberOfItems && index >= 0) {
        var retValue = this._xforms[index];
        var newxforms = new Array(this.numberOfItems - 1);
        var i, j;
        for(i = 0;i < index;++i) {
          newxforms[i] = this._xforms[i]
        }
        for(j = i;j < this.numberOfItems - 1;++j, ++i) {
          newxforms[j] = this._xforms[i + 1]
        }
        this.numberOfItems--;
        this._xforms = newxforms;
        this._list._update();
        return retValue
      }
      throw{code:1};
    };
    this.appendItem = function(newItem) {
      this._removeFromOtherLists(newItem);
      this._xforms.push(newItem);
      this.numberOfItems++;
      this._list._update();
      return newItem
    }
  };
  svgedit.transformlist.resetListMap = function() {
    listMap_ = {}
  };
  svgedit.transformlist.removeElementFromListMap = function(elem) {
    if(elem.id && listMap_[elem.id]) {
      delete listMap_[elem.id]
    }
  };
  svgedit.transformlist.getTransformList = function(elem) {
    if(!svgedit.browser.supportsNativeTransformLists()) {
      var id = elem.id || "temp";
      var t = listMap_[id];
      if(!t || id === "temp") {
        listMap_[id] = new svgedit.transformlist.SVGTransformList(elem);
        listMap_[id]._init();
        t = listMap_[id]
      }
      return t
    }
    if(elem.transform) {
      return elem.transform.baseVal
    }
    if(elem.gradientTransform) {
      return elem.gradientTransform.baseVal
    }
    if(elem.patternTransform) {
      return elem.patternTransform.baseVal
    }
    return null
  }
})();(function() {
  if(!svgedit.math) {
    svgedit.math = {}
  }
  var NEAR_ZERO = 1.0E-14;
  var svg = document.createElementNS(svgedit.NS.SVG, "svg");
  svgedit.math.transformPoint = function(x, y, m) {
    return{x:m.a * x + m.c * y + m.e, y:m.b * x + m.d * y + m.f}
  };
  svgedit.math.isIdentity = function(m) {
    return m.a === 1 && m.b === 0 && m.c === 0 && m.d === 1 && m.e === 0 && m.f === 0
  };
  svgedit.math.matrixMultiply = function(matr) {
    var args = arguments, i = args.length, m = args[i - 1];
    while(i-- > 1) {
      var m1 = args[i - 1];
      m = m1.multiply(m)
    }
    if(Math.abs(m.a) < NEAR_ZERO) {
      m.a = 0
    }
    if(Math.abs(m.b) < NEAR_ZERO) {
      m.b = 0
    }
    if(Math.abs(m.c) < NEAR_ZERO) {
      m.c = 0
    }
    if(Math.abs(m.d) < NEAR_ZERO) {
      m.d = 0
    }
    if(Math.abs(m.e) < NEAR_ZERO) {
      m.e = 0
    }
    if(Math.abs(m.f) < NEAR_ZERO) {
      m.f = 0
    }
    return m
  };
  svgedit.math.hasMatrixTransform = function(tlist) {
    if(!tlist) {
      return false
    }
    var num = tlist.numberOfItems;
    while(num--) {
      var xform = tlist.getItem(num);
      if(xform.type == 1 && !svgedit.math.isIdentity(xform.matrix)) {
        return true
      }
    }
    return false
  };
  svgedit.math.transformBox = function(l, t, w, h, m) {
    var transformPoint = svgedit.math.transformPoint, tl = transformPoint(l, t, m), tr = transformPoint(l + w, t, m), bl = transformPoint(l, t + h, m), br = transformPoint(l + w, t + h, m), minx = Math.min(tl.x, tr.x, bl.x, br.x), maxx = Math.max(tl.x, tr.x, bl.x, br.x), miny = Math.min(tl.y, tr.y, bl.y, br.y), maxy = Math.max(tl.y, tr.y, bl.y, br.y);
    return{tl:tl, tr:tr, bl:bl, br:br, aabox:{x:minx, y:miny, width:maxx - minx, height:maxy - miny}}
  };
  svgedit.math.transformListToTransform = function(tlist, min, max) {
    if(tlist == null) {
      return svg.createSVGTransformFromMatrix(svg.createSVGMatrix())
    }
    min = min || 0;
    max = max || tlist.numberOfItems - 1;
    min = parseInt(min, 10);
    max = parseInt(max, 10);
    if(min > max) {
      var temp = max;
      max = min;
      min = temp
    }
    var m = svg.createSVGMatrix();
    var i;
    for(i = min;i <= max;++i) {
      var mtom = i >= 0 && i < tlist.numberOfItems ? tlist.getItem(i).matrix : svg.createSVGMatrix();
      m = svgedit.math.matrixMultiply(m, mtom)
    }
    return svg.createSVGTransformFromMatrix(m)
  };
  svgedit.math.getMatrix = function(elem) {
    var tlist = svgedit.transformlist.getTransformList(elem);
    return svgedit.math.transformListToTransform(tlist).matrix
  };
  svgedit.math.snapToAngle = function(x1, y1, x2, y2) {
    var snap = Math.PI / 4;
    var dx = x2 - x1;
    var dy = y2 - y1;
    var angle = Math.atan2(dy, dx);
    var dist = Math.sqrt(dx * dx + dy * dy);
    var snapangle = Math.round(angle / snap) * snap;
    return{x:x1 + dist * Math.cos(snapangle), y:y1 + dist * Math.sin(snapangle), a:snapangle}
  };
  svgedit.math.rectsIntersect = function(r1, r2) {
    return r2.x < r1.x + r1.width && r2.x + r2.width > r1.x && r2.y < r1.y + r1.height && r2.y + r2.height > r1.y
  }
})();(function() {
  if(!svgedit.units) {
    svgedit.units = {}
  }
  var NS = svgedit.NS;
  var wAttrs = ["x", "x1", "cx", "rx", "width"];
  var hAttrs = ["y", "y1", "cy", "ry", "height"];
  var unitAttrs = ["r", "radius"].concat(wAttrs, hAttrs);
  var unitNumMap = {"%":2, em:3, ex:4, px:5, cm:6, mm:7, "in":8, pt:9, pc:10};
  var elementContainer_;
  var typeMap_ = {};
  svgedit.units.init = function(elementContainer) {
    elementContainer_ = elementContainer;
    var svg = document.createElementNS(NS.SVG, "svg");
    document.body.appendChild(svg);
    var rect = document.createElementNS(NS.SVG, "rect");
    rect.setAttribute("width", "1em");
    rect.setAttribute("height", "1ex");
    rect.setAttribute("x", "1in");
    svg.appendChild(rect);
    var bb = rect.getBBox();
    document.body.removeChild(svg);
    var inch = bb.x;
    typeMap_ = {em:bb.width, ex:bb.height, "in":inch, cm:inch / 2.54, mm:inch / 25.4, pt:inch / 72, pc:inch / 6, px:1, "%":0}
  };
  svgedit.units.getTypeMap = function() {
    return typeMap_
  };
  svgedit.units.shortFloat = function(val) {
    var digits = elementContainer_.getRoundDigits();
    if(!isNaN(val)) {
      return+(+val).toFixed(digits)
    }
    if($.isArray(val)) {
      return svgedit.units.shortFloat(val[0]) + "," + svgedit.units.shortFloat(val[1])
    }
    return parseFloat(val).toFixed(digits) - 0
  };
  svgedit.units.convertUnit = function(val, unit) {
    unit = unit || elementContainer_.getBaseUnit();
    return svgedit.units.shortFloat(val / typeMap_[unit])
  };
  svgedit.units.setUnitAttr = function(elem, attr, val) {
    elem.setAttribute(attr, val)
  };
  var attrsToConvert = {line:["x1", "x2", "y1", "y2"], circle:["cx", "cy", "r"], ellipse:["cx", "cy", "rx", "ry"], foreignObject:["x", "y", "width", "height"], rect:["x", "y", "width", "height"], image:["x", "y", "width", "height"], use:["x", "y", "width", "height"], text:["x", "y"]};
  svgedit.units.convertAttrs = function(element) {
    var elName = element.tagName;
    var unit = elementContainer_.getBaseUnit();
    var attrs = attrsToConvert[elName];
    if(!attrs) {
      return
    }
    var len = attrs.length;
    var i;
    for(i = 0;i < len;i++) {
      var attr = attrs[i];
      var cur = element.getAttribute(attr);
      if(cur) {
        if(!isNaN(cur)) {
          element.setAttribute(attr, cur / typeMap_[unit] + unit)
        }
      }
    }
  };
  svgedit.units.convertToNum = function(attr, val) {
    if(!isNaN(val)) {
      return val - 0
    }
    var num;
    if(val.substr(-1) === "%") {
      num = val.substr(0, val.length - 1) / 100;
      var width = elementContainer_.getWidth();
      var height = elementContainer_.getHeight();
      if(wAttrs.indexOf(attr) >= 0) {
        return num * width
      }
      if(hAttrs.indexOf(attr) >= 0) {
        return num * height
      }
      return num * Math.sqrt(width * width + height * height) / Math.sqrt(2)
    }
    var unit = val.substr(-2);
    num = val.substr(0, val.length - 2);
    return num * typeMap_[unit]
  };
  svgedit.units.isValidUnit = function(attr, val, selectedElement) {
    var valid = false;
    if(unitAttrs.indexOf(attr) >= 0) {
      if(!isNaN(val)) {
        valid = true
      }else {
        val = val.toLowerCase();
        $.each(typeMap_, function(unit) {
          if(valid) {
            return
          }
          var re = new RegExp("^-?[\\d\\.]+" + unit + "$");
          if(re.test(val)) {
            valid = true
          }
        })
      }
    }else {
      if(attr == "id") {
        var result = false;
        try {
          var elem = elementContainer_.getElement(val);
          result = elem == null || elem === selectedElement
        }catch(e) {
        }
        return result
      }
    }
    valid = true;
    return valid
  }
})();(function(undef) {
  if(!svgedit.utilities) {
    svgedit.utilities = {}
  }
  var KEYSTR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var NS = svgedit.NS;
  var visElems = "a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use";
  var visElems_arr = visElems.split(",");
  var editorContext_ = null;
  var domdoc_ = null;
  var domcontainer_ = null;
  var svgroot_ = null;
  svgedit.utilities.init = function(editorContext) {
    editorContext_ = editorContext;
    domdoc_ = editorContext.getDOMDocument();
    domcontainer_ = editorContext.getDOMContainer();
    svgroot_ = editorContext.getSVGRoot()
  };
  svgedit.utilities.toXml = function(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/, "&#x27;")
  };
  svgedit.utilities.fromXml = function(str) {
    return $("<p/>").html(str).text()
  };
  svgedit.utilities.encode64 = function(input) {
    input = svgedit.utilities.encodeUTF8(input);
    if(window.btoa) {
      return window.btoa(input)
    }
    var output = [];
    output.length = Math.floor((input.length + 2) / 3) * 4;
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0, p = 0;
    do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = (chr2 & 15) << 2 | chr3 >> 6;
      enc4 = chr3 & 63;
      if(isNaN(chr2)) {
        enc3 = enc4 = 64
      }else {
        if(isNaN(chr3)) {
          enc4 = 64
        }
      }
      output[p++] = KEYSTR.charAt(enc1);
      output[p++] = KEYSTR.charAt(enc2);
      output[p++] = KEYSTR.charAt(enc3);
      output[p++] = KEYSTR.charAt(enc4)
    }while(i < input.length);
    return output.join("")
  };
  svgedit.utilities.decode64 = function(input) {
    if(window.atob) {
      return svgedit.utilities.decodeUTF8(window.atob(input))
    }
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do {
      enc1 = KEYSTR.indexOf(input.charAt(i++));
      enc2 = KEYSTR.indexOf(input.charAt(i++));
      enc3 = KEYSTR.indexOf(input.charAt(i++));
      enc4 = KEYSTR.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output = output + String.fromCharCode(chr1);
      if(enc3 != 64) {
        output = output + String.fromCharCode(chr2)
      }
      if(enc4 != 64) {
        output = output + String.fromCharCode(chr3)
      }
      chr1 = chr2 = chr3 = "";
      enc1 = enc2 = enc3 = enc4 = ""
    }while(i < input.length);
    return svgedit.utilities.decodeUTF8(output)
  };
  svgedit.utilities.decodeUTF8 = function(argString) {
    return decodeURIComponent(escape(argString))
  };
  svgedit.utilities.encodeUTF8 = function(argString) {
    return unescape(encodeURIComponent(argString))
  };
  svgedit.utilities.convertToXMLReferences = function(input) {
    var n, output = "";
    for(n = 0;n < input.length;n++) {
      var c = input.charCodeAt(n);
      if(c < 128) {
        output += input[n]
      }else {
        if(c > 127) {
          output += "&#" + c + ";"
        }
      }
    }
    return output
  };
  svgedit.utilities.text2xml = function(sXML) {
    if(sXML.indexOf("<svg:svg") >= 0) {
      sXML = sXML.replace(/<(\/?)svg:/g, "<$1").replace("xmlns:svg", "xmlns")
    }
    var out, dXML;
    try {
      dXML = window.DOMParser ? new DOMParser : new ActiveXObject("Microsoft.XMLDOM");
      dXML.async = false
    }catch(e) {
      throw new Error("XML Parser could not be instantiated");
    }
    try {
      if(dXML.loadXML) {
        out = dXML.loadXML(sXML) ? dXML : false
      }else {
        out = dXML.parseFromString(sXML, "text/xml")
      }
    }catch(e2) {
      throw new Error("Error parsing XML string");
    }
    return out
  };
  svgedit.utilities.bboxToObj = function(bbox) {
    return{x:bbox.x, y:bbox.y, width:bbox.width, height:bbox.height}
  };
  svgedit.utilities.walkTree = function(elem, cbFn) {
    if(elem && elem.nodeType == 1) {
      cbFn(elem);
      var i = elem.childNodes.length;
      while(i--) {
        svgedit.utilities.walkTree(elem.childNodes.item(i), cbFn)
      }
    }
  };
  svgedit.utilities.walkTreePost = function(elem, cbFn) {
    if(elem && elem.nodeType == 1) {
      var i = elem.childNodes.length;
      while(i--) {
        svgedit.utilities.walkTree(elem.childNodes.item(i), cbFn)
      }
      cbFn(elem)
    }
  };
  svgedit.utilities.getUrlFromAttr = function(attrVal) {
    if(attrVal) {
      if(attrVal.indexOf('url("') === 0) {
        return attrVal.substring(5, attrVal.indexOf('"', 6))
      }
      if(attrVal.indexOf("url('") === 0) {
        return attrVal.substring(5, attrVal.indexOf("'", 6))
      }
      if(attrVal.indexOf("url(") === 0) {
        return attrVal.substring(4, attrVal.indexOf(")"))
      }
    }
    return null
  };
  svgedit.utilities.getHref = function(elem) {
    return elem.getAttributeNS(NS.XLINK, "href")
  };
  svgedit.utilities.setHref = function(elem, val) {
    elem.setAttributeNS(NS.XLINK, "xlink:href", val)
  };
  svgedit.utilities.findDefs = function() {
    var svgElement = editorContext_.getSVGContent();
    var defs = svgElement.getElementsByTagNameNS(NS.SVG, "defs");
    if(defs.length > 0) {
      defs = defs[0]
    }else {
      defs = svgElement.ownerDocument.createElementNS(NS.SVG, "defs");
      if(svgElement.firstChild) {
        svgElement.insertBefore(defs, svgElement.firstChild.nextSibling)
      }else {
        svgElement.appendChild(defs)
      }
    }
    return defs
  };
  svgedit.utilities.getPathBBox = function(path) {
    var seglist = path.pathSegList;
    var tot = seglist.numberOfItems;
    var bounds = [[], []];
    var start = seglist.getItem(0);
    var P0 = [start.x, start.y];
    var i;
    for(i = 0;i < tot;i++) {
      var seg = seglist.getItem(i);
      if(seg.x === undef) {
        continue
      }
      bounds[0].push(P0[0]);
      bounds[1].push(P0[1]);
      if(seg.x1) {
        var P1 = [seg.x1, seg.y1], P2 = [seg.x2, seg.y2], P3 = [seg.x, seg.y];
        var j;
        for(j = 0;j < 2;j++) {
          var calc = function(t) {
            return Math.pow(1 - t, 3) * P0[j] + 3 * Math.pow(1 - t, 2) * t * P1[j] + 3 * (1 - t) * Math.pow(t, 2) * P2[j] + Math.pow(t, 3) * P3[j]
          };
          var b = 6 * P0[j] - 12 * P1[j] + 6 * P2[j];
          var a = -3 * P0[j] + 9 * P1[j] - 9 * P2[j] + 3 * P3[j];
          var c = 3 * P1[j] - 3 * P0[j];
          if(a == 0) {
            if(b == 0) {
              continue
            }
            var t = -c / b;
            if(0 < t && t < 1) {
              bounds[j].push(calc(t))
            }
            continue
          }
          var b2ac = Math.pow(b, 2) - 4 * c * a;
          if(b2ac < 0) {
            continue
          }
          var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
          if(0 < t1 && t1 < 1) {
            bounds[j].push(calc(t1))
          }
          var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
          if(0 < t2 && t2 < 1) {
            bounds[j].push(calc(t2))
          }
        }
        P0 = P3
      }else {
        bounds[0].push(seg.x);
        bounds[1].push(seg.y)
      }
    }
    var x = Math.min.apply(null, bounds[0]);
    var w = Math.max.apply(null, bounds[0]) - x;
    var y = Math.min.apply(null, bounds[1]);
    var h = Math.max.apply(null, bounds[1]) - y;
    return{x:x, y:y, width:w, height:h}
  };
  function groupBBFix(selected) {
    if(svgedit.browser.supportsHVLineContainerBBox()) {
      try {
        return selected.getBBox()
      }catch(e) {
      }
    }
    var ref = $.data(selected, "ref");
    var matched = null;
    var ret, copy;
    if(ref) {
      copy = $(ref).children().clone().attr("visibility", "hidden");
      $(svgroot_).append(copy);
      matched = copy.filter("line, path")
    }else {
      matched = $(selected).find("line, path")
    }
    var issue = false;
    if(matched.length) {
      matched.each(function() {
        var bb = this.getBBox();
        if(!bb.width || !bb.height) {
          issue = true
        }
      });
      if(issue) {
        var elems = ref ? copy : $(selected).children();
        ret = getStrokedBBox(elems)
      }else {
        ret = selected.getBBox()
      }
    }else {
      ret = selected.getBBox()
    }
    if(ref) {
      copy.remove()
    }
    return ret
  }
  svgedit.utilities.getBBox = function(elem) {
    var selected = elem || editorContext_.geSelectedElements()[0];
    if(elem.nodeType != 1) {
      return null
    }
    var ret = null;
    var elname = selected.nodeName;
    switch(elname) {
      case "text":
        if(selected.textContent === "") {
          selected.textContent = "a";
          ret = selected.getBBox();
          selected.textContent = ""
        }else {
          if(selected.getBBox) {
            ret = selected.getBBox()
          }
        }
        break;
      case "path":
        if(!svgedit.browser.supportsPathBBox()) {
          ret = svgedit.utilities.getPathBBox(selected)
        }else {
          if(selected.getBBox) {
            ret = selected.getBBox()
          }
        }
        break;
      case "g":
      ;
      case "a":
        ret = groupBBFix(selected);
        break;
      default:
        if(elname === "use") {
          ret = groupBBFix(selected, true)
        }
        if(elname === "use" || elname === "foreignObject" && svgedit.browser.isWebkit()) {
          if(!ret) {
            ret = selected.getBBox()
          }
          if(!svgedit.browser.isWebkit()) {
            var bb = {};
            bb.width = ret.width;
            bb.height = ret.height;
            bb.x = ret.x + parseFloat(selected.getAttribute("x") || 0);
            bb.y = ret.y + parseFloat(selected.getAttribute("y") || 0);
            ret = bb
          }
        }else {
          if(~visElems_arr.indexOf(elname)) {
            if(selected) {
              ret = selected.getBBox()
            }else {
              var fo = $(selected).closest("foreignObject");
              if(fo.length) {
                if(fo[0].getBBox) {
                  ret = fo[0].getBBox()
                }
              }
            }
          }
        }
    }
    if(ret) {
      ret = svgedit.utilities.bboxToObj(ret)
    }
    return ret
  };
  svgedit.utilities.getPathDFromSegments = function(pathSegments) {
    var d = "";
    $.each(pathSegments, function(j, seg) {
      var i;
      var pts = seg[1];
      d += seg[0];
      for(i = 0;i < pts.length;i += 2) {
        d += pts[i] + "," + pts[i + 1] + " "
      }
    });
    return d
  };
  svgedit.utilities.getPathDFromElement = function(elem) {
    var num = 1.81;
    var d, a, rx, ry;
    switch(elem.tagName) {
      case "ellipse":
      ;
      case "circle":
        a = $(elem).attr(["rx", "ry", "cx", "cy"]);
        var cx = a.cx, cy = a.cy;
        rx = a.rx;
        ry = a.ry;
        if(elem.tagName == "circle") {
          rx = ry = $(elem).attr("r")
        }
        d = svgedit.utilities.getPathDFromSegments([["M", [cx - rx, cy]], ["C", [cx - rx, cy - ry / num, cx - rx / num, cy - ry, cx, cy - ry]], ["C", [cx + rx / num, cy - ry, cx + rx, cy - ry / num, cx + rx, cy]], ["C", [cx + rx, cy + ry / num, cx + rx / num, cy + ry, cx, cy + ry]], ["C", [cx - rx / num, cy + ry, cx - rx, cy + ry / num, cx - rx, cy]], ["Z", []]]);
        break;
      case "path":
        d = elem.getAttribute("d");
        break;
      case "line":
        a = $(elem).attr(["x1", "y1", "x2", "y2"]);
        d = "M" + a.x1 + "," + a.y1 + "L" + a.x2 + "," + a.y2;
        break;
      case "polyline":
        d = "M" + elem.getAttribute("points");
        break;
      case "polygon":
        d = "M" + elem.getAttribute("points") + " Z";
        break;
      case "rect":
        var r = $(elem).attr(["rx", "ry"]);
        rx = r.rx;
        ry = r.ry;
        var b = elem.getBBox();
        var x = b.x, y = b.y, w = b.width, h = b.height;
        num = 4 - num;
        if(!rx && !ry) {
          d = svgedit.utilities.getPathDFromSegments([["M", [x, y]], ["L", [x + w, y]], ["L", [x + w, y + h]], ["L", [x, y + h]], ["L", [x, y]], ["Z", []]])
        }else {
          d = svgedit.utilities.getPathDFromSegments([["M", [x, y + ry]], ["C", [x, y + ry / num, x + rx / num, y, x + rx, y]], ["L", [x + w - rx, y]], ["C", [x + w - rx / num, y, x + w, y + ry / num, x + w, y + ry]], ["L", [x + w, y + h - ry]], ["C", [x + w, y + h - ry / num, x + w - rx / num, y + h, x + w - rx, y + h]], ["L", [x + rx, y + h]], ["C", [x + rx / num, y + h, x, y + h - ry / num, x, y + h - ry]], ["L", [x, y + ry]], ["Z", []]])
        }
        break;
      default:
        break
    }
    return d
  };
  svgedit.utilities.getExtraAttributesForConvertToPath = function(elem) {
    var attrs = {};
    $.each(["marker-start", "marker-end", "marker-mid", "filter", "clip-path"], function() {
      var a = elem.getAttribute(this);
      if(a) {
        attrs[this] = a
      }
    });
    return attrs
  };
  svgedit.utilities.getBBoxOfElementAsPath = function(elem, addSvgElementFromJson, pathActions) {
    var path = addSvgElementFromJson({element:"path", attr:svgedit.utilities.getExtraAttributesForConvertToPath(elem)});
    var eltrans = elem.getAttribute("transform");
    if(eltrans) {
      path.setAttribute("transform", eltrans)
    }
    var parent = elem.parentNode;
    if(elem.nextSibling) {
      parent.insertBefore(path, elem)
    }else {
      parent.appendChild(path)
    }
    var d = svgedit.utilities.getPathDFromElement(elem);
    if(d) {
      path.setAttribute("d", d)
    }else {
      path.parentNode.removeChild(path)
    }
    pathActions.resetOrientation(path);
    var bb = false;
    try {
      bb = path.getBBox()
    }catch(e) {
    }
    path.parentNode.removeChild(path);
    return bb
  };
  svgedit.utilities.convertToPath = function(elem, attrs, addSvgElementFromJson, pathActions, clearSelection, addToSelection, history, addCommandToHistory) {
    var batchCmd = new history.BatchCommand("Convert element to Path");
    attrs = $.extend({}, attrs, svgedit.utilities.getExtraAttributesForConvertToPath(elem));
    var path = addSvgElementFromJson({element:"path", attr:attrs});
    var eltrans = elem.getAttribute("transform");
    if(eltrans) {
      path.setAttribute("transform", eltrans)
    }
    var id = elem.id;
    var parent = elem.parentNode;
    if(elem.nextSibling) {
      parent.insertBefore(path, elem)
    }else {
      parent.appendChild(path)
    }
    var d = svgedit.utilities.getPathDFromElement(elem);
    if(d) {
      path.setAttribute("d", d);
      if(eltrans) {
        var tlist = svgedit.transformlist.getTransformList(path);
        if(svgedit.math.hasMatrixTransform(tlist)) {
          pathActions.resetOrientation(path)
        }
      }
      var nextSibling = elem.nextSibling;
      batchCmd.addSubCommand(new history.RemoveElementCommand(elem, nextSibling, parent));
      batchCmd.addSubCommand(new history.InsertElementCommand(path));
      clearSelection();
      elem.parentNode.removeChild(elem);
      path.setAttribute("id", id);
      path.removeAttribute("visibility");
      addToSelection([path], true);
      addCommandToHistory(batchCmd);
      return path
    }else {
      path.parentNode.removeChild(path);
      return null
    }
  };
  function bBoxCanBeOptimizedOverNativeGetBBox(angle, hasMatrixTransform) {
    var angleModulo90 = angle % 90;
    var closeTo90 = angleModulo90 < -89.99 || angleModulo90 > 89.99;
    var closeTo0 = angleModulo90 > -0.001 && angleModulo90 < 0.001;
    return hasMatrixTransform || !(closeTo0 || closeTo90)
  }
  svgedit.utilities.getBBoxWithTransform = function(elem, addSvgElementFromJson, pathActions) {
    var bb = svgedit.utilities.getBBox(elem);
    if(!bb) {
      return null
    }
    var tlist = svgedit.transformlist.getTransformList(elem);
    var angle = svgedit.utilities.getRotationAngleFromTransformList(tlist);
    var hasMatrixTransform = svgedit.math.hasMatrixTransform(tlist);
    if(angle || hasMatrixTransform) {
      var good_bb = false;
      if(bBoxCanBeOptimizedOverNativeGetBBox(angle, hasMatrixTransform)) {
        var elemNames = ["ellipse", "path", "line", "polyline", "polygon"];
        if(elemNames.indexOf(elem.tagName) >= 0) {
          bb = good_bb = svgedit.utilities.getBBoxOfElementAsPath(elem, addSvgElementFromJson, pathActions)
        }else {
          if(elem.tagName == "rect") {
            var rx = elem.getAttribute("rx");
            var ry = elem.getAttribute("ry");
            if(rx || ry) {
              bb = good_bb = svgedit.utilities.getBBoxOfElementAsPath(elem, addSvgElementFromJson, pathActions)
            }
          }
        }
      }
      if(!good_bb) {
        var matrix = svgedit.math.transformListToTransform(tlist).matrix;
        bb = svgedit.math.transformBox(bb.x, bb.y, bb.width, bb.height, matrix).aabox
      }
    }
    return bb
  };
  function getStrokeOffsetForBBox(elem) {
    var sw = elem.getAttribute("stroke-width");
    return!isNaN(sw) && elem.getAttribute("stroke") != "none" ? sw / 2 : 0
  }
  svgedit.utilities.getStrokedBBox = function(elems, addSvgElementFromJson, pathActions) {
    if(!elems || !elems.length) {
      return false
    }
    var full_bb;
    $.each(elems, function() {
      if(full_bb) {
        return
      }
      if(!this.parentNode) {
        return
      }
      full_bb = svgedit.utilities.getBBoxWithTransform(this, addSvgElementFromJson, pathActions)
    });
    if(full_bb === undefined) {
      return null
    }
    var max_x = full_bb.x + full_bb.width;
    var max_y = full_bb.y + full_bb.height;
    var min_x = full_bb.x;
    var min_y = full_bb.y;
    if(elems.length === 1) {
      var offset = getStrokeOffsetForBBox(elems[0]);
      min_x -= offset;
      min_y -= offset;
      max_x += offset;
      max_y += offset
    }else {
      $.each(elems, function(i, elem) {
        var cur_bb = svgedit.utilities.getBBoxWithTransform(elem, addSvgElementFromJson, pathActions);
        if(cur_bb) {
          var offset = getStrokeOffsetForBBox(elem);
          min_x = Math.min(min_x, cur_bb.x - offset);
          min_y = Math.min(min_y, cur_bb.y - offset);
          if(elem.nodeType == 1) {
            max_x = Math.max(max_x, cur_bb.x + cur_bb.width + offset);
            max_y = Math.max(max_y, cur_bb.y + cur_bb.height + offset)
          }
        }
      })
    }
    full_bb.x = min_x;
    full_bb.y = min_y;
    full_bb.width = max_x - min_x;
    full_bb.height = max_y - min_y;
    return full_bb
  };
  svgedit.utilities.getRotationAngleFromTransformList = function(tlist, to_rad) {
    if(!tlist) {
      return 0
    }
    var N = tlist.numberOfItems;
    var i;
    for(i = 0;i < N;++i) {
      var xform = tlist.getItem(i);
      if(xform.type == 4) {
        return to_rad ? xform.angle * Math.PI / 180 : xform.angle
      }
    }
    return 0
  };
  svgedit.utilities.getRotationAngle = function(elem, to_rad) {
    var selected = elem || editorContext_.getSelectedElements()[0];
    var tlist = svgedit.transformlist.getTransformList(selected);
    return svgedit.utilities.getRotationAngleFromTransformList(tlist, to_rad)
  };
  svgedit.utilities.getRefElem = function(attrVal) {
    return svgedit.utilities.getElem(svgedit.utilities.getUrlFromAttr(attrVal).substr(1))
  };
  if(svgedit.browser.supportsSelectors()) {
    svgedit.utilities.getElem = function(id) {
      return svgroot_.querySelector("#" + id)
    }
  }else {
    if(svgedit.browser.supportsXpath()) {
      svgedit.utilities.getElem = function(id) {
        return domdoc_.evaluate('svg:svg[@id="svgroot"]//svg:*[@id="' + id + '"]', domcontainer_, function() {
          return svgedit.NS.SVG
        }, 9, null).singleNodeValue
      }
    }else {
      svgedit.utilities.getElem = function(id) {
        return $(svgroot_).find("[id=" + id + "]")[0]
      }
    }
  }
  svgedit.utilities.assignAttributes = function(node, attrs, suspendLength, unitCheck) {
    var i;
    for(i in attrs) {
      var ns = i.substr(0, 4) === "xml:" ? NS.XML : i.substr(0, 6) === "xlink:" ? NS.XLINK : null;
      if(ns) {
        node.setAttributeNS(ns, i, attrs[i])
      }else {
        if(!unitCheck) {
          node.setAttribute(i, attrs[i])
        }else {
          svgedit.units.setUnitAttr(node, i, attrs[i])
        }
      }
    }
  };
  svgedit.utilities.cleanupElement = function(element) {
    var defaults = {"fill-opacity":1, "stop-opacity":1, opacity:1, stroke:"none", "stroke-dasharray":"none", "stroke-linejoin":"miter", "stroke-linecap":"butt", "stroke-opacity":1, "stroke-width":1, rx:0, ry:0};
    if(element.nodeName === "ellipse") {
      delete defaults.rx;
      delete defaults.ry
    }
    var attr;
    for(attr in defaults) {
      var val = defaults[attr];
      if(element.getAttribute(attr) == val) {
        element.removeAttribute(attr)
      }
    }
  };
  svgedit.utilities.snapToGrid = function(value) {
    var stepSize = editorContext_.getSnappingStep();
    var unit = editorContext_.getBaseUnit();
    if(unit !== "px") {
      stepSize *= svgedit.units.getTypeMap()[unit]
    }
    value = Math.round(value / stepSize) * stepSize;
    return value
  };
  svgedit.utilities.preg_quote = function(str, delimiter) {
    return String(str).replace(new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\" + (delimiter || "") + "-]", "g"), "\\$&")
  };
  svgedit.utilities.executeAfterLoads = function(globalCheck, scripts, cb) {
    return function() {
      var args = arguments;
      function endCallback() {
        cb.apply(null, args)
      }
      if(window[globalCheck]) {
        endCallback()
      }else {
        scripts.reduceRight(function(oldFunc, script) {
          return function() {
            $.getScript(script, oldFunc)
          }
        }, endCallback)()
      }
    }
  };
  svgedit.utilities.buildCanvgCallback = function(callCanvg) {
    return svgedit.utilities.executeAfterLoads("canvg", ["canvg/rgbcolor.js", "canvg/canvg.js"], callCanvg)
  };
  svgedit.utilities.buildJSPDFCallback = function(callJSPDF) {
    return svgedit.utilities.executeAfterLoads("RGBColor", ["canvg/rgbcolor.js"], function() {
      var arr = [];
      if(!RGBColor || RGBColor.ok === undef) {
        arr.push("canvg/rgbcolor.js")
      }
      svgedit.utilities.executeAfterLoads("jsPDF", arr.concat("jspdf/underscore-min.js", "jspdf/jspdf.min.js", "jspdf/jspdf.plugin.svgToPdf.js"), callJSPDF)()
    })
  };
  svgedit.utilities.preventClickDefault = function(img) {
    $(img).click(function(e) {
      e.preventDefault()
    })
  };
  svgedit.utilities.copyElem = function(el, getNextId) {
    var new_el = document.createElementNS(el.namespaceURI, el.nodeName);
    $.each(el.attributes, function(i, attr) {
      if(attr.localName != "-moz-math-font-style") {
        new_el.setAttributeNS(attr.namespaceURI, attr.nodeName, attr.value)
      }
    });
    new_el.removeAttribute("id");
    new_el.id = getNextId();
    if(svgedit.browser.isWebkit() && el.nodeName == "path") {
      var fixed_d = svgedit.utilities.convertPath(el);
      new_el.setAttribute("d", fixed_d)
    }
    $.each(el.childNodes, function(i, child) {
      switch(child.nodeType) {
        case 1:
          new_el.appendChild(svgedit.utilities.copyElem(child, getNextId));
          break;
        case 3:
          new_el.appendChild(document.createTextNode(child.textContent));
          break;
        default:
          break
      }
    });
    if($(el).data("gsvg")) {
      $(new_el).data("gsvg", new_el.firstChild)
    }else {
      if($(el).data("symbol")) {
        var ref = $(el).data("symbol");
        $(new_el).data("ref", ref).data("symbol", ref)
      }else {
        if(new_el.tagName == "image") {
          preventClickDefault(new_el)
        }
      }
    }
    return new_el
  };
  function pathDSegment(letter, points, morePoints, lastPoint) {
    $.each(points, function(i, pnt) {
      points[i] = svgedit.units.shortFloat(pnt)
    });
    var segment = letter + points.join(" ");
    if(morePoints) {
      segment += " " + morePoints.join(" ")
    }
    if(lastPoint) {
      segment += " " + svgedit.units.shortFloat(lastPoint)
    }
    return segment
  }
  var pathMap = [0, "z", "M", "m", "L", "l", "C", "c", "Q", "q", "A", "a", "H", "h", "V", "v", "S", "s", "T", "t"];
  svgedit.utilities.convertPath = function(path, toRel) {
    var i;
    var segList = path.pathSegList;
    var len = segList.numberOfItems;
    var curx = 0, cury = 0;
    var d = "";
    var last_m = null;
    for(i = 0;i < len;++i) {
      var seg = segList.getItem(i);
      var x = seg.x || 0, y = seg.y || 0, x1 = seg.x1 || 0, y1 = seg.y1 || 0, x2 = seg.x2 || 0, y2 = seg.y2 || 0;
      var type = seg.pathSegType;
      var letter = pathMap[type]["to" + (toRel ? "Lower" : "Upper") + "Case"]();
      switch(type) {
        case 1:
          d += "z";
          break;
        case 12:
          x -= curx;
        case 13:
          if(toRel) {
            curx += x;
            letter = "l"
          }else {
            x += curx;
            curx = x;
            letter = "L"
          }
          d += pathDSegment(letter, [[x, cury]]);
          break;
        case 14:
          y -= cury;
        case 15:
          if(toRel) {
            cury += y;
            letter = "l"
          }else {
            y += cury;
            cury = y;
            letter = "L"
          }
          d += pathDSegment(letter, [[curx, y]]);
          break;
        case 2:
        ;
        case 4:
        ;
        case 18:
          x -= curx;
          y -= cury;
        case 5:
        ;
        case 3:
          if(last_m && segList.getItem(i - 1).pathSegType === 1 && !toRel) {
            curx = last_m[0];
            cury = last_m[1]
          }
        ;
        case 19:
          if(toRel) {
            curx += x;
            cury += y
          }else {
            x += curx;
            y += cury;
            curx = x;
            cury = y
          }
          if(type === 3) {
            last_m = [curx, cury]
          }
          d += pathDSegment(letter, [[x, y]]);
          break;
        case 6:
          x -= curx;
          x1 -= curx;
          x2 -= curx;
          y -= cury;
          y1 -= cury;
          y2 -= cury;
        case 7:
          if(toRel) {
            curx += x;
            cury += y
          }else {
            x += curx;
            x1 += curx;
            x2 += curx;
            y += cury;
            y1 += cury;
            y2 += cury;
            curx = x;
            cury = y
          }
          d += pathDSegment(letter, [[x1, y1], [x2, y2], [x, y]]);
          break;
        case 8:
          x -= curx;
          x1 -= curx;
          y -= cury;
          y1 -= cury;
        case 9:
          if(toRel) {
            curx += x;
            cury += y
          }else {
            x += curx;
            x1 += curx;
            y += cury;
            y1 += cury;
            curx = x;
            cury = y
          }
          d += pathDSegment(letter, [[x1, y1], [x, y]]);
          break;
        case 10:
          x -= curx;
          y -= cury;
        case 11:
          if(toRel) {
            curx += x;
            cury += y
          }else {
            x += curx;
            y += cury;
            curx = x;
            cury = y
          }
          d += pathDSegment(letter, [[seg.r1, seg.r2]], [seg.angle, seg.largeArcFlag ? 1 : 0, seg.sweepFlag ? 1 : 0], [x, y]);
          break;
        case 16:
          x -= curx;
          x2 -= curx;
          y -= cury;
          y2 -= cury;
        case 17:
          if(toRel) {
            curx += x;
            cury += y
          }else {
            x += curx;
            x2 += curx;
            y += cury;
            y2 += cury;
            curx = x;
            cury = y
          }
          d += pathDSegment(letter, [[x2, y2], [x, y]]);
          break
      }
    }
    return d
  }
})();(function() {
  if(!svgedit.sanitize) {
    svgedit.sanitize = {}
  }
  var NS = svgedit.NS, REVERSE_NS = svgedit.getReverseNS();
  var svgWhiteList_ = {a:["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "id", "mask", "opacity", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "xlink:href", "xlink:title"], circle:["class", "clip-path", "clip-rule", "cx", "cy", "fill", "fill-opacity", "fill-rule", "filter", "id", "mask", "opacity", "r", "requiredFeatures", "stroke", 
  "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"], clipPath:["class", "clipPathUnits", "id"], defs:[], style:["type"], desc:[], ellipse:["class", "clip-path", "clip-rule", "cx", "cy", "fill", "fill-opacity", "fill-rule", "filter", "id", "mask", "opacity", "requiredFeatures", "rx", "ry", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", 
  "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"], feGaussianBlur:["class", "color-interpolation-filters", "id", "requiredFeatures", "stdDeviation"], filter:["class", "color-interpolation-filters", "filterRes", "filterUnits", "height", "id", "primitiveUnits", "requiredFeatures", "width", "x", "xlink:href", "y"], foreignObject:["class", "font-size", "height", "id", "opacity", "requiredFeatures", "style", "transform", "width", "x", "y"], g:["class", "clip-path", 
  "clip-rule", "id", "display", "fill", "fill-opacity", "fill-rule", "filter", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "font-family", "font-size", "font-style", "font-weight", "text-anchor"], image:["class", "clip-path", "clip-rule", "filter", "height", "id", "mask", "opacity", "requiredFeatures", "style", "systemLanguage", 
  "transform", "width", "x", "xlink:href", "xlink:title", "y"], line:["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "id", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "x1", "x2", "y1", "y2"], linearGradient:["class", "id", "gradientTransform", 
  "gradientUnits", "requiredFeatures", "spreadMethod", "systemLanguage", "x1", "x2", "xlink:href", "y1", "y2"], marker:["id", "class", "markerHeight", "markerUnits", "markerWidth", "orient", "preserveAspectRatio", "refX", "refY", "systemLanguage", "viewBox"], mask:["class", "height", "id", "maskContentUnits", "maskUnits", "width", "x", "y"], metadata:["class", "id"], path:["class", "clip-path", "clip-rule", "d", "fill", "fill-opacity", "fill-rule", "filter", "id", "marker-end", "marker-mid", "marker-start", 
  "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"], pattern:["class", "height", "id", "patternContentUnits", "patternTransform", "patternUnits", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xlink:href", "y"], polygon:["class", "clip-path", "clip-rule", "id", "fill", "fill-opacity", "fill-rule", "filter", 
  "id", "class", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "points", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"], polyline:["class", "clip-path", "clip-rule", "id", "fill", "fill-opacity", "fill-rule", "filter", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "points", "requiredFeatures", "stroke", "stroke-dasharray", 
  "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"], radialGradient:["class", "cx", "cy", "fx", "fy", "gradientTransform", "gradientUnits", "id", "r", "requiredFeatures", "spreadMethod", "systemLanguage", "xlink:href"], rect:["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "height", "id", "mask", "opacity", "requiredFeatures", "rx", "ry", "stroke", "stroke-dasharray", 
  "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "width", "x", "y"], stop:["class", "id", "offset", "requiredFeatures", "stop-color", "stop-opacity", "style", "systemLanguage"], svg:["class", "clip-path", "clip-rule", "filter", "id", "height", "mask", "preserveAspectRatio", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xmlns", "xmlns:se", "xmlns:xlink", "y"], "switch":["class", 
  "id", "requiredFeatures", "systemLanguage"], symbol:["class", "fill", "fill-opacity", "fill-rule", "filter", "font-family", "font-size", "font-style", "font-weight", "id", "opacity", "preserveAspectRatio", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "viewBox"], text:["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", 
  "filter", "font-family", "font-size", "font-style", "font-weight", "id", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "text-anchor", "transform", "x", "xml:space", "y"], textPath:["class", "id", "method", "requiredFeatures", "spacing", "startOffset", "style", "systemLanguage", "transform", "xlink:href"], title:[], tspan:["class", "clip-path", 
  "clip-rule", "dx", "dy", "fill", "fill-opacity", "fill-rule", "filter", "font-family", "font-size", "font-style", "font-weight", "id", "mask", "opacity", "requiredFeatures", "rotate", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "text-anchor", "textLength", "transform", "x", "xml:space", "y"], use:["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", 
  "height", "id", "mask", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "transform", "width", "x", "xlink:href", "y"], annotation:["encoding"], "annotation-xml":["encoding"], maction:["actiontype", "other", "selection"], math:["class", "id", "display", "xmlns"], menclose:["notation"], merror:[], mfrac:["linethickness"], mi:["mathvariant"], mmultiscripts:[], mn:[], mo:["fence", "lspace", "maxsize", 
  "minsize", "rspace", "stretchy"], mover:[], mpadded:["lspace", "width", "height", "depth", "voffset"], mphantom:[], mprescripts:[], mroot:[], mrow:["xlink:href", "xlink:type", "xmlns:xlink"], mspace:["depth", "height", "width"], msqrt:[], mstyle:["displaystyle", "mathbackground", "mathcolor", "mathvariant", "scriptlevel"], msub:[], msubsup:[], msup:[], mtable:["align", "columnalign", "columnlines", "columnspacing", "displaystyle", "equalcolumns", "equalrows", "frame", "rowalign", "rowlines", "rowspacing", 
  "width"], mtd:["columnalign", "columnspan", "rowalign", "rowspan"], mtext:[], mtr:["columnalign", "rowalign"], munder:[], munderover:[], none:[], semantics:[]};
  var svgWhiteListNS_ = {};
  $.each(svgWhiteList_, function(elt, atts) {
    var attNS = {};
    $.each(atts, function(i, att) {
      if(att.indexOf(":") >= 0) {
        var v = att.split(":");
        attNS[v[1]] = NS[v[0].toUpperCase()]
      }else {
        attNS[att] = att == "xmlns" ? NS.XMLNS : null
      }
    });
    svgWhiteListNS_[elt] = attNS
  });
  svgedit.sanitize.sanitizeSvg = function(node) {
    if(node.nodeType == 3) {
      node.nodeValue = node.nodeValue.replace(/^\s+|\s+$/g, "");
      if(node.nodeValue.length === 0) {
        node.parentNode.removeChild(node)
      }
    }
    if(node.nodeType != 1) {
      return
    }
    var doc = node.ownerDocument;
    var parent = node.parentNode;
    if(!doc || !parent) {
      return
    }
    var allowedAttrs = svgWhiteList_[node.nodeName];
    var allowedAttrsNS = svgWhiteListNS_[node.nodeName];
    var i;
    if(typeof allowedAttrs !== "undefined") {
      var seAttrs = [];
      i = node.attributes.length;
      while(i--) {
        var attr = node.attributes.item(i);
        var attrName = attr.nodeName;
        var attrLocalName = attr.localName;
        var attrNsURI = attr.namespaceURI;
        if(!(allowedAttrsNS.hasOwnProperty(attrLocalName) && attrNsURI == allowedAttrsNS[attrLocalName] && attrNsURI != NS.XMLNS) && !(attrNsURI == NS.XMLNS && REVERSE_NS[attr.value])) {
          if(attrName.indexOf("se:") === 0) {
            seAttrs.push([attrName, attr.value])
          }
          node.removeAttributeNS(attrNsURI, attrLocalName)
        }
        if(svgedit.browser.isGecko()) {
          switch(attrName) {
            case "transform":
            ;
            case "gradientTransform":
            ;
            case "patternTransform":
              var val = attr.value.replace(/(\d)-/g, "$1 -");
              node.setAttribute(attrName, val);
              break
          }
        }
        if(attrName == "style") {
          var props = attr.value.split(";"), p = props.length;
          while(p--) {
            var nv = props[p].split(":");
            var styleAttrName = $.trim(nv[0]);
            var styleAttrVal = $.trim(nv[1]);
            if(allowedAttrs.indexOf(styleAttrName) >= 0) {
              node.setAttribute(styleAttrName, styleAttrVal)
            }
          }
          node.removeAttribute("style")
        }
      }
      $.each(seAttrs, function(i, attr) {
        node.setAttributeNS(NS.SE, attr[0], attr[1])
      });
      var href = svgedit.utilities.getHref(node);
      if(href && ["filter", "linearGradient", "pattern", "radialGradient", "textPath", "use"].indexOf(node.nodeName) >= 0) {
        if(href[0] != "#") {
          svgedit.utilities.setHref(node, "");
          node.removeAttributeNS(NS.XLINK, "href")
        }
      }
      if(node.nodeName == "use" && !svgedit.utilities.getHref(node)) {
        parent.removeChild(node);
        return
      }
      $.each(["clip-path", "fill", "filter", "marker-end", "marker-mid", "marker-start", "mask", "stroke"], function(i, attr) {
        var val = node.getAttribute(attr);
        if(val) {
          val = svgedit.utilities.getUrlFromAttr(val);
          if(val && val[0] !== "#") {
            node.setAttribute(attr, "");
            node.removeAttribute(attr)
          }
        }
      });
      i = node.childNodes.length;
      while(i--) {
        svgedit.sanitize.sanitizeSvg(node.childNodes.item(i))
      }
    }else {
      var children = [];
      while(node.hasChildNodes()) {
        children.push(parent.insertBefore(node.firstChild, node))
      }
      parent.removeChild(node);
      i = children.length;
      while(i--) {
        svgedit.sanitize.sanitizeSvg(children[i])
      }
    }
  }
})();(function() {
  if(!svgedit.history) {
    svgedit.history = {}
  }
  svgedit.history.HistoryEventTypes = {BEFORE_APPLY:"before_apply", AFTER_APPLY:"after_apply", BEFORE_UNAPPLY:"before_unapply", AFTER_UNAPPLY:"after_unapply"};
  var removedElements = {};
  svgedit.history.MoveElementCommand = function(elem, oldNextSibling, oldParent, text) {
    this.elem = elem;
    this.text = text ? "Move " + elem.tagName + " to " + text : "Move " + elem.tagName;
    this.oldNextSibling = oldNextSibling;
    this.oldParent = oldParent;
    this.newNextSibling = elem.nextSibling;
    this.newParent = elem.parentNode
  };
  svgedit.history.MoveElementCommand.type = function() {
    return"svgedit.history.MoveElementCommand"
  };
  svgedit.history.MoveElementCommand.prototype.type = svgedit.history.MoveElementCommand.type;
  svgedit.history.MoveElementCommand.prototype.getText = function() {
    return this.text
  };
  svgedit.history.MoveElementCommand.prototype.apply = function(handler) {
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this)
    }
    this.elem = this.newParent.insertBefore(this.elem, this.newNextSibling);
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this)
    }
  };
  svgedit.history.MoveElementCommand.prototype.unapply = function(handler) {
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this)
    }
    this.elem = this.oldParent.insertBefore(this.elem, this.oldNextSibling);
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this)
    }
  };
  svgedit.history.MoveElementCommand.prototype.elements = function() {
    return[this.elem]
  };
  svgedit.history.InsertElementCommand = function(elem, text) {
    this.elem = elem;
    this.text = text || "Create " + elem.tagName;
    this.parent = elem.parentNode;
    this.nextSibling = this.elem.nextSibling
  };
  svgedit.history.InsertElementCommand.type = function() {
    return"svgedit.history.InsertElementCommand"
  };
  svgedit.history.InsertElementCommand.prototype.type = svgedit.history.InsertElementCommand.type;
  svgedit.history.InsertElementCommand.prototype.getText = function() {
    return this.text
  };
  svgedit.history.InsertElementCommand.prototype.apply = function(handler) {
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this)
    }
    this.elem = this.parent.insertBefore(this.elem, this.nextSibling);
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this)
    }
  };
  svgedit.history.InsertElementCommand.prototype.unapply = function(handler) {
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this)
    }
    this.parent = this.elem.parentNode;
    this.elem = this.elem.parentNode.removeChild(this.elem);
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this)
    }
  };
  svgedit.history.InsertElementCommand.prototype.elements = function() {
    return[this.elem]
  };
  svgedit.history.RemoveElementCommand = function(elem, oldNextSibling, oldParent, text) {
    this.elem = elem;
    this.text = text || "Delete " + elem.tagName;
    this.nextSibling = oldNextSibling;
    this.parent = oldParent;
    svgedit.transformlist.removeElementFromListMap(elem)
  };
  svgedit.history.RemoveElementCommand.type = function() {
    return"svgedit.history.RemoveElementCommand"
  };
  svgedit.history.RemoveElementCommand.prototype.type = svgedit.history.RemoveElementCommand.type;
  svgedit.history.RemoveElementCommand.prototype.getText = function() {
    return this.text
  };
  svgedit.history.RemoveElementCommand.prototype.apply = function(handler) {
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this)
    }
    svgedit.transformlist.removeElementFromListMap(this.elem);
    this.parent = this.elem.parentNode;
    this.elem = this.parent.removeChild(this.elem);
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this)
    }
  };
  svgedit.history.RemoveElementCommand.prototype.unapply = function(handler) {
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this)
    }
    svgedit.transformlist.removeElementFromListMap(this.elem);
    if(this.nextSibling == null) {
      if(window.console) {
        console.log("Error: reference element was lost")
      }
    }
    this.parent.insertBefore(this.elem, this.nextSibling);
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this)
    }
  };
  svgedit.history.RemoveElementCommand.prototype.elements = function() {
    return[this.elem]
  };
  svgedit.history.ChangeElementCommand = function(elem, attrs, text) {
    this.elem = elem;
    this.text = text ? "Change " + elem.tagName + " " + text : "Change " + elem.tagName;
    this.newValues = {};
    this.oldValues = attrs;
    var attr;
    for(attr in attrs) {
      if(attr == "#text") {
        this.newValues[attr] = elem.textContent
      }else {
        if(attr == "#href") {
          this.newValues[attr] = svgedit.utilities.getHref(elem)
        }else {
          this.newValues[attr] = elem.getAttribute(attr)
        }
      }
    }
  };
  svgedit.history.ChangeElementCommand.type = function() {
    return"svgedit.history.ChangeElementCommand"
  };
  svgedit.history.ChangeElementCommand.prototype.type = svgedit.history.ChangeElementCommand.type;
  svgedit.history.ChangeElementCommand.prototype.getText = function() {
    return this.text
  };
  svgedit.history.ChangeElementCommand.prototype.apply = function(handler) {
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this)
    }
    var bChangedTransform = false;
    var attr;
    for(attr in this.newValues) {
      if(this.newValues[attr]) {
        if(attr == "#text") {
          this.elem.textContent = this.newValues[attr]
        }else {
          if(attr == "#href") {
            svgedit.utilities.setHref(this.elem, this.newValues[attr])
          }else {
            this.elem.setAttribute(attr, this.newValues[attr])
          }
        }
      }else {
        if(attr == "#text") {
          this.elem.textContent = ""
        }else {
          this.elem.setAttribute(attr, "");
          this.elem.removeAttribute(attr)
        }
      }
      if(attr == "transform") {
        bChangedTransform = true
      }
    }
    if(!bChangedTransform) {
      var angle = svgedit.utilities.getRotationAngle(this.elem);
      if(angle) {
        var bbox = elem.getBBox();
        var cx = bbox.x + bbox.width / 2, cy = bbox.y + bbox.height / 2;
        var rotate = ["rotate(", angle, " ", cx, ",", cy, ")"].join("");
        if(rotate != elem.getAttribute("transform")) {
          elem.setAttribute("transform", rotate)
        }
      }
    }
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this)
    }
    return true
  };
  svgedit.history.ChangeElementCommand.prototype.unapply = function(handler) {
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this)
    }
    var bChangedTransform = false;
    var attr;
    for(attr in this.oldValues) {
      if(this.oldValues[attr]) {
        if(attr == "#text") {
          this.elem.textContent = this.oldValues[attr]
        }else {
          if(attr == "#href") {
            svgedit.utilities.setHref(this.elem, this.oldValues[attr])
          }else {
            this.elem.setAttribute(attr, this.oldValues[attr])
          }
        }
      }else {
        if(attr == "#text") {
          this.elem.textContent = ""
        }else {
          this.elem.removeAttribute(attr)
        }
      }
      if(attr == "transform") {
        bChangedTransform = true
      }
    }
    if(!bChangedTransform) {
      var angle = svgedit.utilities.getRotationAngle(this.elem);
      if(angle) {
        var bbox = elem.getBBox();
        var cx = bbox.x + bbox.width / 2, cy = bbox.y + bbox.height / 2;
        var rotate = ["rotate(", angle, " ", cx, ",", cy, ")"].join("");
        if(rotate != elem.getAttribute("transform")) {
          elem.setAttribute("transform", rotate)
        }
      }
    }
    svgedit.transformlist.removeElementFromListMap(this.elem);
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this)
    }
    return true
  };
  svgedit.history.ChangeElementCommand.prototype.elements = function() {
    return[this.elem]
  };
  svgedit.history.BatchCommand = function(text) {
    this.text = text || "Batch Command";
    this.stack = []
  };
  svgedit.history.BatchCommand.type = function() {
    return"svgedit.history.BatchCommand"
  };
  svgedit.history.BatchCommand.prototype.type = svgedit.history.BatchCommand.type;
  svgedit.history.BatchCommand.prototype.getText = function() {
    return this.text
  };
  svgedit.history.BatchCommand.prototype.apply = function(handler) {
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this)
    }
    var i, len = this.stack.length;
    for(i = 0;i < len;++i) {
      this.stack[i].apply(handler)
    }
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this)
    }
  };
  svgedit.history.BatchCommand.prototype.unapply = function(handler) {
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this)
    }
    var i;
    for(i = this.stack.length - 1;i >= 0;i--) {
      this.stack[i].unapply(handler)
    }
    if(handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this)
    }
  };
  svgedit.history.BatchCommand.prototype.elements = function() {
    var elems = [];
    var cmd = this.stack.length;
    while(cmd--) {
      var thisElems = this.stack[cmd].elements();
      var elem = thisElems.length;
      while(elem--) {
        if(elems.indexOf(thisElems[elem]) == -1) {
          elems.push(thisElems[elem])
        }
      }
    }
    return elems
  };
  svgedit.history.BatchCommand.prototype.addSubCommand = function(cmd) {
    this.stack.push(cmd)
  };
  svgedit.history.BatchCommand.prototype.isEmpty = function() {
    return this.stack.length === 0
  };
  svgedit.history.UndoManager = function(historyEventHandler) {
    this.handler_ = historyEventHandler || null;
    this.undoStackPointer = 0;
    this.undoStack = [];
    this.undoChangeStackPointer = -1;
    this.undoableChangeStack = []
  };
  svgedit.history.UndoManager.prototype.resetUndoStack = function() {
    this.undoStack = [];
    this.undoStackPointer = 0
  };
  svgedit.history.UndoManager.prototype.getUndoStackSize = function() {
    return this.undoStackPointer
  };
  svgedit.history.UndoManager.prototype.getRedoStackSize = function() {
    return this.undoStack.length - this.undoStackPointer
  };
  svgedit.history.UndoManager.prototype.getNextUndoCommandText = function() {
    return this.undoStackPointer > 0 ? this.undoStack[this.undoStackPointer - 1].getText() : ""
  };
  svgedit.history.UndoManager.prototype.getNextRedoCommandText = function() {
    return this.undoStackPointer < this.undoStack.length ? this.undoStack[this.undoStackPointer].getText() : ""
  };
  svgedit.history.UndoManager.prototype.undo = function() {
    if(this.undoStackPointer > 0) {
      var cmd = this.undoStack[--this.undoStackPointer];
      cmd.unapply(this.handler_)
    }
  };
  svgedit.history.UndoManager.prototype.redo = function() {
    if(this.undoStackPointer < this.undoStack.length && this.undoStack.length > 0) {
      var cmd = this.undoStack[this.undoStackPointer++];
      cmd.apply(this.handler_)
    }
  };
  svgedit.history.UndoManager.prototype.addCommandToHistory = function(cmd) {
    if(this.undoStackPointer < this.undoStack.length && this.undoStack.length > 0) {
      this.undoStack = this.undoStack.splice(0, this.undoStackPointer)
    }
    this.undoStack.push(cmd);
    this.undoStackPointer = this.undoStack.length
  };
  svgedit.history.UndoManager.prototype.beginUndoableChange = function(attrName, elems) {
    var p = ++this.undoChangeStackPointer;
    var i = elems.length;
    var oldValues = new Array(i), elements = new Array(i);
    while(i--) {
      var elem = elems[i];
      if(elem == null) {
        continue
      }
      elements[i] = elem;
      oldValues[i] = elem.getAttribute(attrName)
    }
    this.undoableChangeStack[p] = {attrName:attrName, oldValues:oldValues, elements:elements}
  };
  svgedit.history.UndoManager.prototype.finishUndoableChange = function() {
    var p = this.undoChangeStackPointer--;
    var changeset = this.undoableChangeStack[p];
    var i = changeset.elements.length;
    var attrName = changeset.attrName;
    var batchCmd = new svgedit.history.BatchCommand("Change " + attrName);
    while(i--) {
      var elem = changeset.elements[i];
      if(elem == null) {
        continue
      }
      var changes = {};
      changes[attrName] = changeset.oldValues[i];
      if(changes[attrName] != elem.getAttribute(attrName)) {
        batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(elem, changes, attrName))
      }
    }
    this.undoableChangeStack[p] = null;
    return batchCmd
  }
})();(function() {
  if(!svgedit.history) {
    svgedit.history = {}
  }
  var history = svgedit.history;
  var HistoryRecordingService = history.HistoryRecordingService = function(undoManager) {
    this.undoManager_ = undoManager;
    this.currentBatchCommand_ = null;
    this.batchCommandStack_ = []
  };
  HistoryRecordingService.NO_HISTORY = new HistoryRecordingService;
  HistoryRecordingService.prototype.startBatchCommand = function(text) {
    if(!this.undoManager_) {
      return this
    }
    this.currentBatchCommand_ = new history.BatchCommand(text);
    this.batchCommandStack_.push(this.currentBatchCommand_);
    return this
  };
  HistoryRecordingService.prototype.endBatchCommand = function() {
    if(!this.undoManager_) {
      return this
    }
    if(this.currentBatchCommand_) {
      var batchCommand = this.currentBatchCommand_;
      this.batchCommandStack_.pop();
      var length = this.batchCommandStack_.length;
      this.currentBatchCommand_ = length ? this.batchCommandStack_[length - 1] : null;
      this.addCommand_(batchCommand)
    }
    return this
  };
  HistoryRecordingService.prototype.moveElement = function(elem, oldNextSibling, oldParent, text) {
    if(!this.undoManager_) {
      return this
    }
    this.addCommand_(new history.MoveElementCommand(elem, oldNextSibling, oldParent, text));
    return this
  };
  HistoryRecordingService.prototype.insertElement = function(elem, text) {
    if(!this.undoManager_) {
      return this
    }
    this.addCommand_(new history.InsertElementCommand(elem, text));
    return this
  };
  HistoryRecordingService.prototype.removeElement = function(elem, oldNextSibling, oldParent, text) {
    if(!this.undoManager_) {
      return this
    }
    this.addCommand_(new history.RemoveElementCommand(elem, oldNextSibling, oldParent, text));
    return this
  };
  HistoryRecordingService.prototype.changeElement = function(elem, attrs, text) {
    if(!this.undoManager_) {
      return this
    }
    this.addCommand_(new history.ChangeElementCommand(elem, attrs, text));
    return this
  };
  HistoryRecordingService.prototype.addCommand_ = function(cmd) {
    if(!this.undoManager_) {
      return this
    }
    if(this.currentBatchCommand_) {
      this.currentBatchCommand_.addSubCommand(cmd)
    }else {
      this.undoManager_.addCommandToHistory(cmd)
    }
  }
})();var svgedit = svgedit || {};
(function() {
  if(!svgedit.coords) {
    svgedit.coords = {}
  }
  var pathMap = [0, "z", "M", "m", "L", "l", "C", "c", "Q", "q", "A", "a", "H", "h", "V", "v", "S", "s", "T", "t"];
  var editorContext_ = null;
  svgedit.coords.init = function(editorContext) {
    editorContext_ = editorContext
  };
  svgedit.coords.remapElement = function(selected, changes, m) {
    var i, type, remap = function(x, y) {
      return svgedit.math.transformPoint(x, y, m)
    }, scalew = function(w) {
      return m.a * w
    }, scaleh = function(h) {
      return m.d * h
    }, doSnapping = editorContext_.getGridSnapping() && selected.parentNode.parentNode.localName === "svg", finishUp = function() {
      var o;
      if(doSnapping) {
        for(o in changes) {
          changes[o] = svgedit.utilities.snapToGrid(changes[o])
        }
      }
      svgedit.utilities.assignAttributes(selected, changes, 1E3, true)
    }, box = svgedit.utilities.getBBox(selected);
    for(i = 0;i < 2;i++) {
      type = i === 0 ? "fill" : "stroke";
      var attrVal = selected.getAttribute(type);
      if(attrVal && attrVal.indexOf("url(") === 0) {
        if(m.a < 0 || m.d < 0) {
          var grad = svgedit.utilities.getRefElem(attrVal);
          var newgrad = grad.cloneNode(true);
          if(m.a < 0) {
            var x1 = newgrad.getAttribute("x1");
            var x2 = newgrad.getAttribute("x2");
            newgrad.setAttribute("x1", -(x1 - 1));
            newgrad.setAttribute("x2", -(x2 - 1))
          }
          if(m.d < 0) {
            var y1 = newgrad.getAttribute("y1");
            var y2 = newgrad.getAttribute("y2");
            newgrad.setAttribute("y1", -(y1 - 1));
            newgrad.setAttribute("y2", -(y2 - 1))
          }
          newgrad.id = editorContext_.getDrawing().getNextId();
          svgedit.utilities.findDefs().appendChild(newgrad);
          selected.setAttribute(type, "url(#" + newgrad.id + ")")
        }
      }
    }
    var elName = selected.tagName;
    var chlist, mt;
    if(elName === "g" || elName === "text" || elName == "tspan" || elName === "use") {
      if(m.a == 1 && m.b == 0 && m.c == 0 && m.d == 1 && (m.e != 0 || m.f != 0)) {
        var existing = svgedit.math.transformListToTransform(selected).matrix, t_new = svgedit.math.matrixMultiply(existing.inverse(), m, existing);
        changes.x = parseFloat(changes.x) + t_new.e;
        changes.y = parseFloat(changes.y) + t_new.f
      }else {
        chlist = svgedit.transformlist.getTransformList(selected);
        mt = svgroot.createSVGTransform();
        mt.setMatrix(svgedit.math.matrixMultiply(svgedit.math.transformListToTransform(chlist).matrix, m));
        chlist.clear();
        chlist.appendItem(mt)
      }
    }
    var c, pt, pt1, pt2, len;
    switch(elName) {
      case "foreignObject":
      ;
      case "rect":
      ;
      case "image":
        if(elName === "image" && (m.a < 0 || m.d < 0)) {
          chlist = svgedit.transformlist.getTransformList(selected);
          mt = svgroot.createSVGTransform();
          mt.setMatrix(svgedit.math.matrixMultiply(svgedit.math.transformListToTransform(chlist).matrix, m));
          chlist.clear();
          chlist.appendItem(mt)
        }else {
          pt1 = remap(changes.x, changes.y);
          changes.width = scalew(changes.width);
          changes.height = scaleh(changes.height);
          changes.x = pt1.x + Math.min(0, changes.width);
          changes.y = pt1.y + Math.min(0, changes.height);
          changes.width = Math.abs(changes.width);
          changes.height = Math.abs(changes.height)
        }
        finishUp();
        break;
      case "ellipse":
        c = remap(changes.cx, changes.cy);
        changes.cx = c.x;
        changes.cy = c.y;
        changes.rx = scalew(changes.rx);
        changes.ry = scaleh(changes.ry);
        changes.rx = Math.abs(changes.rx);
        changes.ry = Math.abs(changes.ry);
        finishUp();
        break;
      case "circle":
        c = remap(changes.cx, changes.cy);
        changes.cx = c.x;
        changes.cy = c.y;
        var tbox = svgedit.math.transformBox(box.x, box.y, box.width, box.height, m);
        var w = tbox.tr.x - tbox.tl.x, h = tbox.bl.y - tbox.tl.y;
        changes.r = Math.min(w / 2, h / 2);
        if(changes.r) {
          changes.r = Math.abs(changes.r)
        }
        finishUp();
        break;
      case "line":
        pt1 = remap(changes.x1, changes.y1);
        pt2 = remap(changes.x2, changes.y2);
        changes.x1 = pt1.x;
        changes.y1 = pt1.y;
        changes.x2 = pt2.x;
        changes.y2 = pt2.y;
      case "text":
      ;
      case "tspan":
      ;
      case "use":
        finishUp();
        break;
      case "g":
        var gsvg = $(selected).data("gsvg");
        if(gsvg) {
          svgedit.utilities.assignAttributes(gsvg, changes, 1E3, true)
        }
        break;
      case "polyline":
      ;
      case "polygon":
        len = changes.points.length;
        for(i = 0;i < len;++i) {
          pt = changes.points[i];
          pt = remap(pt.x, pt.y);
          changes.points[i].x = pt.x;
          changes.points[i].y = pt.y
        }
        len = changes.points.length;
        var pstr = "";
        for(i = 0;i < len;++i) {
          pt = changes.points[i];
          pstr += pt.x + "," + pt.y + " "
        }
        selected.setAttribute("points", pstr);
        break;
      case "path":
        var seg;
        var segList = selected.pathSegList;
        len = segList.numberOfItems;
        changes.d = [];
        for(i = 0;i < len;++i) {
          seg = segList.getItem(i);
          changes.d[i] = {type:seg.pathSegType, x:seg.x, y:seg.y, x1:seg.x1, y1:seg.y1, x2:seg.x2, y2:seg.y2, r1:seg.r1, r2:seg.r2, angle:seg.angle, largeArcFlag:seg.largeArcFlag, sweepFlag:seg.sweepFlag}
        }
        len = changes.d.length;
        var firstseg = changes.d[0], currentpt = remap(firstseg.x, firstseg.y);
        changes.d[0].x = currentpt.x;
        changes.d[0].y = currentpt.y;
        for(i = 1;i < len;++i) {
          seg = changes.d[i];
          type = seg.type;
          if(type % 2 == 0) {
            var thisx = seg.x != undefined ? seg.x : currentpt.x, thisy = seg.y != undefined ? seg.y : currentpt.y;
            pt = remap(thisx, thisy);
            pt1 = remap(seg.x1, seg.y1);
            pt2 = remap(seg.x2, seg.y2);
            seg.x = pt.x;
            seg.y = pt.y;
            seg.x1 = pt1.x;
            seg.y1 = pt1.y;
            seg.x2 = pt2.x;
            seg.y2 = pt2.y;
            seg.r1 = scalew(seg.r1);
            seg.r2 = scaleh(seg.r2)
          }else {
            seg.x = scalew(seg.x);
            seg.y = scaleh(seg.y);
            seg.x1 = scalew(seg.x1);
            seg.y1 = scaleh(seg.y1);
            seg.x2 = scalew(seg.x2);
            seg.y2 = scaleh(seg.y2);
            seg.r1 = scalew(seg.r1);
            seg.r2 = scaleh(seg.r2)
          }
        }
        var dstr = "";
        len = changes.d.length;
        for(i = 0;i < len;++i) {
          seg = changes.d[i];
          type = seg.type;
          dstr += pathMap[type];
          switch(type) {
            case 13:
            ;
            case 12:
              dstr += seg.x + " ";
              break;
            case 15:
            ;
            case 14:
              dstr += seg.y + " ";
              break;
            case 3:
            ;
            case 5:
            ;
            case 19:
            ;
            case 2:
            ;
            case 4:
            ;
            case 18:
              dstr += seg.x + "," + seg.y + " ";
              break;
            case 7:
            ;
            case 6:
              dstr += seg.x1 + "," + seg.y1 + " " + seg.x2 + "," + seg.y2 + " " + seg.x + "," + seg.y + " ";
              break;
            case 9:
            ;
            case 8:
              dstr += seg.x1 + "," + seg.y1 + " " + seg.x + "," + seg.y + " ";
              break;
            case 11:
            ;
            case 10:
              dstr += seg.r1 + "," + seg.r2 + " " + seg.angle + " " + +seg.largeArcFlag + " " + +seg.sweepFlag + " " + seg.x + "," + seg.y + " ";
              break;
            case 17:
            ;
            case 16:
              dstr += seg.x2 + "," + seg.y2 + " " + seg.x + "," + seg.y + " ";
              break
          }
        }
        selected.setAttribute("d", dstr);
        break
    }
  }
})();var svgedit = svgedit || {};
(function() {
  if(!svgedit.recalculate) {
    svgedit.recalculate = {}
  }
  var NS = svgedit.NS;
  var context_;
  svgedit.recalculate.init = function(editorContext) {
    context_ = editorContext
  };
  svgedit.recalculate.updateClipPath = function(attr, tx, ty) {
    var path = getRefElem(attr).firstChild;
    var cp_xform = svgedit.transformlist.getTransformList(path);
    var newxlate = context_.getSVGRoot().createSVGTransform();
    newxlate.setTranslate(tx, ty);
    cp_xform.appendItem(newxlate);
    svgedit.recalculate.recalculateDimensions(path)
  };
  svgedit.recalculate.recalculateDimensions = function(selected) {
    if(selected == null) {
      return null
    }
    if(selected.nodeName == "svg" && navigator.userAgent.indexOf("Firefox/20") >= 0) {
      return null
    }
    var svgroot = context_.getSVGRoot();
    var tlist = svgedit.transformlist.getTransformList(selected);
    var k;
    if(tlist && tlist.numberOfItems > 0) {
      k = tlist.numberOfItems;
      while(k--) {
        var xform = tlist.getItem(k);
        if(xform.type === 0) {
          tlist.removeItem(k)
        }else {
          if(xform.type === 1) {
            if(svgedit.math.isIdentity(xform.matrix)) {
              tlist.removeItem(k)
            }
          }else {
            if(xform.type === 4) {
              if(xform.angle === 0) {
                tlist.removeItem(k)
              }
            }
          }
        }
      }
      if(tlist.numberOfItems === 1 && svgedit.utilities.getRotationAngle(selected)) {
        return null
      }
    }
    if(!tlist || tlist.numberOfItems == 0) {
      selected.setAttribute("transform", "");
      selected.removeAttribute("transform");
      return null
    }
    if(tlist) {
      k = tlist.numberOfItems;
      var mxs = [];
      while(k--) {
        var xform = tlist.getItem(k);
        if(xform.type === 1) {
          mxs.push([xform.matrix, k])
        }else {
          if(mxs.length) {
            mxs = []
          }
        }
      }
      if(mxs.length === 2) {
        var m_new = svgroot.createSVGTransformFromMatrix(svgedit.math.matrixMultiply(mxs[1][0], mxs[0][0]));
        tlist.removeItem(mxs[0][1]);
        tlist.removeItem(mxs[1][1]);
        tlist.insertItemBefore(m_new, mxs[1][1])
      }
      k = tlist.numberOfItems;
      if(k >= 2 && tlist.getItem(k - 2).type === 1 && tlist.getItem(k - 1).type === 2) {
        var mt = svgroot.createSVGTransform();
        var m = svgedit.math.matrixMultiply(tlist.getItem(k - 2).matrix, tlist.getItem(k - 1).matrix);
        mt.setMatrix(m);
        tlist.removeItem(k - 2);
        tlist.removeItem(k - 2);
        tlist.appendItem(mt)
      }
    }
    switch(selected.tagName) {
      case "line":
      ;
      case "polyline":
      ;
      case "polygon":
      ;
      case "path":
        break;
      default:
        if(tlist.numberOfItems === 1 && tlist.getItem(0).type === 1 || tlist.numberOfItems === 2 && tlist.getItem(0).type === 1 && tlist.getItem(0).type === 4) {
          return null
        }
    }
    var gsvg = $(selected).data("gsvg");
    var batchCmd = new svgedit.history.BatchCommand("Transform");
    var changes = {}, initial = null, attrs = [];
    switch(selected.tagName) {
      case "line":
        attrs = ["x1", "y1", "x2", "y2"];
        break;
      case "circle":
        attrs = ["cx", "cy", "r"];
        break;
      case "ellipse":
        attrs = ["cx", "cy", "rx", "ry"];
        break;
      case "foreignObject":
      ;
      case "rect":
      ;
      case "image":
        attrs = ["width", "height", "x", "y"];
        break;
      case "use":
      ;
      case "text":
      ;
      case "tspan":
        attrs = ["x", "y"];
        break;
      case "polygon":
      ;
      case "polyline":
        initial = {};
        initial.points = selected.getAttribute("points");
        var list = selected.points;
        var len = list.numberOfItems;
        changes.points = new Array(len);
        var i;
        for(i = 0;i < len;++i) {
          var pt = list.getItem(i);
          changes.points[i] = {x:pt.x, y:pt.y}
        }
        break;
      case "path":
        initial = {};
        initial.d = selected.getAttribute("d");
        changes.d = selected.getAttribute("d");
        break
    }
    if(attrs.length) {
      changes = $(selected).attr(attrs);
      $.each(changes, function(attr, val) {
        changes[attr] = svgedit.units.convertToNum(attr, val)
      })
    }else {
      if(gsvg) {
        changes = {x:$(gsvg).attr("x") || 0, y:$(gsvg).attr("y") || 0}
      }
    }
    if(initial == null) {
      initial = $.extend(true, {}, changes);
      $.each(initial, function(attr, val) {
        initial[attr] = svgedit.units.convertToNum(attr, val)
      })
    }
    initial.transform = context_.getStartTransform() || "";
    if(selected.tagName == "g" && !gsvg || selected.tagName == "a") {
      var box = svgedit.utilities.getBBox(selected), oldcenter = {x:box.x + box.width / 2, y:box.y + box.height / 2}, newcenter = svgedit.math.transformPoint(box.x + box.width / 2, box.y + box.height / 2, svgedit.math.transformListToTransform(tlist).matrix), m = svgroot.createSVGMatrix();
      var gangle = svgedit.utilities.getRotationAngle(selected);
      if(gangle) {
        var a = gangle * Math.PI / 180;
        if(Math.abs(a) > 1.0E-10) {
          var s = Math.sin(a) / (1 - Math.cos(a))
        }else {
          var s = 2 / a
        }
        var i;
        for(i = 0;i < tlist.numberOfItems;++i) {
          var xform = tlist.getItem(i);
          if(xform.type == 4) {
            var rm = xform.matrix;
            oldcenter.y = (s * rm.e + rm.f) / 2;
            oldcenter.x = (rm.e - s * rm.f) / 2;
            tlist.removeItem(i);
            break
          }
        }
      }
      var tx = 0, ty = 0, operation = 0, N = tlist.numberOfItems;
      if(N) {
        var first_m = tlist.getItem(0).matrix
      }
      if(N >= 3 && tlist.getItem(N - 2).type == 3 && tlist.getItem(N - 3).type == 2 && tlist.getItem(N - 1).type == 2) {
        operation = 3;
        var tm = tlist.getItem(N - 3).matrix, sm = tlist.getItem(N - 2).matrix, tmn = tlist.getItem(N - 1).matrix;
        var children = selected.childNodes;
        var c = children.length;
        while(c--) {
          var child = children.item(c);
          tx = 0;
          ty = 0;
          if(child.nodeType == 1) {
            var childTlist = svgedit.transformlist.getTransformList(child);
            if(!childTlist) {
              continue
            }
            var m = svgedit.math.transformListToTransform(childTlist).matrix;
            var angle = svgedit.utilities.getRotationAngle(child);
            var oldStartTransform = context_.getStartTransform();
            var childxforms = [];
            context_.setStartTransform(child.getAttribute("transform"));
            if(angle || svgedit.math.hasMatrixTransform(childTlist)) {
              var e2t = svgroot.createSVGTransform();
              e2t.setMatrix(svgedit.math.matrixMultiply(tm, sm, tmn, m));
              childTlist.clear();
              childTlist.appendItem(e2t);
              childxforms.push(e2t)
            }else {
              var t2n = svgedit.math.matrixMultiply(m.inverse(), tmn, m);
              var t2 = svgroot.createSVGMatrix();
              t2.e = -t2n.e;
              t2.f = -t2n.f;
              var s2 = svgedit.math.matrixMultiply(t2.inverse(), m.inverse(), tm, sm, tmn, m, t2n.inverse());
              var translateOrigin = svgroot.createSVGTransform(), scale = svgroot.createSVGTransform(), translateBack = svgroot.createSVGTransform();
              translateOrigin.setTranslate(t2n.e, t2n.f);
              scale.setScale(s2.a, s2.d);
              translateBack.setTranslate(t2.e, t2.f);
              childTlist.appendItem(translateBack);
              childTlist.appendItem(scale);
              childTlist.appendItem(translateOrigin);
              childxforms.push(translateBack);
              childxforms.push(scale);
              childxforms.push(translateOrigin)
            }
            batchCmd.addSubCommand(svgedit.recalculate.recalculateDimensions(child));
            context_.setStartTransform(oldStartTransform)
          }
        }
        tlist.removeItem(N - 1);
        tlist.removeItem(N - 2);
        tlist.removeItem(N - 3)
      }else {
        if(N >= 3 && tlist.getItem(N - 1).type == 1) {
          operation = 3;
          m = svgedit.math.transformListToTransform(tlist).matrix;
          var e2t = svgroot.createSVGTransform();
          e2t.setMatrix(m);
          tlist.clear();
          tlist.appendItem(e2t)
        }else {
          if((N == 1 || N > 1 && tlist.getItem(1).type != 3) && tlist.getItem(0).type == 2) {
            operation = 2;
            var T_M = svgedit.math.transformListToTransform(tlist).matrix;
            tlist.removeItem(0);
            var M_inv = svgedit.math.transformListToTransform(tlist).matrix.inverse();
            var M2 = svgedit.math.matrixMultiply(M_inv, T_M);
            tx = M2.e;
            ty = M2.f;
            if(tx != 0 || ty != 0) {
              var children = selected.childNodes;
              var c = children.length;
              var clipPaths_done = [];
              while(c--) {
                var child = children.item(c);
                if(child.nodeType == 1) {
                  if(child.getAttribute("clip-path")) {
                    var attr = child.getAttribute("clip-path");
                    if(clipPaths_done.indexOf(attr) === -1) {
                      svgedit.recalculate.updateClipPath(attr, tx, ty);
                      clipPaths_done.push(attr)
                    }
                  }
                  var oldStartTransform = context_.getStartTransform();
                  context_.setStartTransform(child.getAttribute("transform"));
                  var childTlist = svgedit.transformlist.getTransformList(child);
                  if(childTlist) {
                    var newxlate = svgroot.createSVGTransform();
                    newxlate.setTranslate(tx, ty);
                    if(childTlist.numberOfItems) {
                      childTlist.insertItemBefore(newxlate, 0)
                    }else {
                      childTlist.appendItem(newxlate)
                    }
                    batchCmd.addSubCommand(svgedit.recalculate.recalculateDimensions(child));
                    var uses = selected.getElementsByTagNameNS(NS.SVG, "use");
                    var href = "#" + child.id;
                    var u = uses.length;
                    while(u--) {
                      var useElem = uses.item(u);
                      if(href == svgedit.utilities.getHref(useElem)) {
                        var usexlate = svgroot.createSVGTransform();
                        usexlate.setTranslate(-tx, -ty);
                        svgedit.transformlist.getTransformList(useElem).insertItemBefore(usexlate, 0);
                        batchCmd.addSubCommand(svgedit.recalculate.recalculateDimensions(useElem))
                      }
                    }
                    context_.setStartTransform(oldStartTransform)
                  }
                }
              }
              clipPaths_done = [];
              context_.setStartTransform(oldStartTransform)
            }
          }else {
            if(N == 1 && tlist.getItem(0).type == 1 && !gangle) {
              operation = 1;
              var m = tlist.getItem(0).matrix, children = selected.childNodes, c = children.length;
              while(c--) {
                var child = children.item(c);
                if(child.nodeType == 1) {
                  var oldStartTransform = context_.getStartTransform();
                  context_.setStartTransform(child.getAttribute("transform"));
                  var childTlist = svgedit.transformlist.getTransformList(child);
                  if(!childTlist) {
                    continue
                  }
                  var em = svgedit.math.matrixMultiply(m, svgedit.math.transformListToTransform(childTlist).matrix);
                  var e2m = svgroot.createSVGTransform();
                  e2m.setMatrix(em);
                  childTlist.clear();
                  childTlist.appendItem(e2m, 0);
                  batchCmd.addSubCommand(svgedit.recalculate.recalculateDimensions(child));
                  context_.setStartTransform(oldStartTransform);
                  var sw = child.getAttribute("stroke-width");
                  if(child.getAttribute("stroke") !== "none" && !isNaN(sw)) {
                    var avg = (Math.abs(em.a) + Math.abs(em.d)) / 2;
                    child.setAttribute("stroke-width", sw * avg)
                  }
                }
              }
              tlist.clear()
            }else {
              if(gangle) {
                var newRot = svgroot.createSVGTransform();
                newRot.setRotate(gangle, newcenter.x, newcenter.y);
                if(tlist.numberOfItems) {
                  tlist.insertItemBefore(newRot, 0)
                }else {
                  tlist.appendItem(newRot)
                }
              }
              if(tlist.numberOfItems == 0) {
                selected.removeAttribute("transform")
              }
              return null
            }
          }
        }
      }
      if(operation == 2) {
        if(gangle) {
          newcenter = {x:oldcenter.x + first_m.e, y:oldcenter.y + first_m.f};
          var newRot = svgroot.createSVGTransform();
          newRot.setRotate(gangle, newcenter.x, newcenter.y);
          if(tlist.numberOfItems) {
            tlist.insertItemBefore(newRot, 0)
          }else {
            tlist.appendItem(newRot)
          }
        }
      }else {
        if(operation == 3) {
          var m = svgedit.math.transformListToTransform(tlist).matrix;
          var roldt = svgroot.createSVGTransform();
          roldt.setRotate(gangle, oldcenter.x, oldcenter.y);
          var rold = roldt.matrix;
          var rnew = svgroot.createSVGTransform();
          rnew.setRotate(gangle, newcenter.x, newcenter.y);
          var rnew_inv = rnew.matrix.inverse(), m_inv = m.inverse(), extrat = svgedit.math.matrixMultiply(m_inv, rnew_inv, rold, m);
          tx = extrat.e;
          ty = extrat.f;
          if(tx != 0 || ty != 0) {
            var children = selected.childNodes;
            var c = children.length;
            while(c--) {
              var child = children.item(c);
              if(child.nodeType == 1) {
                var oldStartTransform = context_.getStartTransform();
                context_.setStartTransform(child.getAttribute("transform"));
                var childTlist = svgedit.transformlist.getTransformList(child);
                var newxlate = svgroot.createSVGTransform();
                newxlate.setTranslate(tx, ty);
                if(childTlist.numberOfItems) {
                  childTlist.insertItemBefore(newxlate, 0)
                }else {
                  childTlist.appendItem(newxlate)
                }
                batchCmd.addSubCommand(svgedit.recalculate.recalculateDimensions(child));
                context_.setStartTransform(oldStartTransform)
              }
            }
          }
          if(gangle) {
            if(tlist.numberOfItems) {
              tlist.insertItemBefore(rnew, 0)
            }else {
              tlist.appendItem(rnew)
            }
          }
        }
      }
    }else {
      var box = svgedit.utilities.getBBox(selected);
      if(!box && selected.tagName != "path") {
        return null
      }
      var m = svgroot.createSVGMatrix(), angle = svgedit.utilities.getRotationAngle(selected);
      if(angle) {
        var oldcenter = {x:box.x + box.width / 2, y:box.y + box.height / 2}, newcenter = svgedit.math.transformPoint(box.x + box.width / 2, box.y + box.height / 2, svgedit.math.transformListToTransform(tlist).matrix);
        var a = angle * Math.PI / 180;
        if(Math.abs(a) > 1.0E-10) {
          var s = Math.sin(a) / (1 - Math.cos(a))
        }else {
          var s = 2 / a
        }
        for(var i = 0;i < tlist.numberOfItems;++i) {
          var xform = tlist.getItem(i);
          if(xform.type == 4) {
            var rm = xform.matrix;
            oldcenter.y = (s * rm.e + rm.f) / 2;
            oldcenter.x = (rm.e - s * rm.f) / 2;
            tlist.removeItem(i);
            break
          }
        }
      }
      var operation = 0;
      var N = tlist.numberOfItems;
      if(!svgedit.browser.isWebkit()) {
        var fill = selected.getAttribute("fill");
        if(fill && fill.indexOf("url(") === 0) {
          var paint = getRefElem(fill);
          var type = "pattern";
          if(paint.tagName !== type) {
            type = "gradient"
          }
          var attrVal = paint.getAttribute(type + "Units");
          if(attrVal === "userSpaceOnUse") {
            m = svgedit.math.transformListToTransform(tlist).matrix;
            var gtlist = svgedit.transformlist.getTransformList(paint);
            var gmatrix = svgedit.math.transformListToTransform(gtlist).matrix;
            m = svgedit.math.matrixMultiply(m, gmatrix);
            var m_str = "matrix(" + [m.a, m.b, m.c, m.d, m.e, m.f].join(",") + ")";
            paint.setAttribute(type + "Transform", m_str)
          }
        }
      }
      if(N >= 3 && tlist.getItem(N - 2).type == 3 && tlist.getItem(N - 3).type == 2 && tlist.getItem(N - 1).type == 2) {
        operation = 3;
        m = svgedit.math.transformListToTransform(tlist, N - 3, N - 1).matrix;
        tlist.removeItem(N - 1);
        tlist.removeItem(N - 2);
        tlist.removeItem(N - 3)
      }else {
        if(N == 4 && tlist.getItem(N - 1).type == 1) {
          operation = 3;
          m = svgedit.math.transformListToTransform(tlist).matrix;
          var e2t = svgroot.createSVGTransform();
          e2t.setMatrix(m);
          tlist.clear();
          tlist.appendItem(e2t);
          m = svgroot.createSVGMatrix()
        }else {
          if((N == 1 || N > 1 && tlist.getItem(1).type != 3) && tlist.getItem(0).type == 2) {
            operation = 2;
            var oldxlate = tlist.getItem(0).matrix, meq = svgedit.math.transformListToTransform(tlist, 1).matrix, meq_inv = meq.inverse();
            m = svgedit.math.matrixMultiply(meq_inv, oldxlate, meq);
            tlist.removeItem(0)
          }else {
            if(N == 1 && tlist.getItem(0).type == 1 && !angle) {
              m = svgedit.math.transformListToTransform(tlist).matrix;
              switch(selected.tagName) {
                case "line":
                  changes = $(selected).attr(["x1", "y1", "x2", "y2"]);
                case "polyline":
                ;
                case "polygon":
                  changes.points = selected.getAttribute("points");
                  if(changes.points) {
                    var list = selected.points;
                    var len = list.numberOfItems;
                    changes.points = new Array(len);
                    for(var i = 0;i < len;++i) {
                      var pt = list.getItem(i);
                      changes.points[i] = {x:pt.x, y:pt.y}
                    }
                  }
                ;
                case "path":
                  changes.d = selected.getAttribute("d");
                  operation = 1;
                  tlist.clear();
                  break;
                default:
                  break
              }
            }else {
              operation = 4;
              if(angle) {
                var newRot = svgroot.createSVGTransform();
                newRot.setRotate(angle, newcenter.x, newcenter.y);
                if(tlist.numberOfItems) {
                  tlist.insertItemBefore(newRot, 0)
                }else {
                  tlist.appendItem(newRot)
                }
              }
              if(tlist.numberOfItems == 0) {
                selected.removeAttribute("transform")
              }
              return null
            }
          }
        }
      }
      if(operation == 1 || operation == 2 || operation == 3) {
        svgedit.coords.remapElement(selected, changes, m)
      }
      if(operation == 2) {
        if(angle) {
          if(!svgedit.math.hasMatrixTransform(tlist)) {
            newcenter = {x:oldcenter.x + m.e, y:oldcenter.y + m.f}
          }
          var newRot = svgroot.createSVGTransform();
          newRot.setRotate(angle, newcenter.x, newcenter.y);
          if(tlist.numberOfItems) {
            tlist.insertItemBefore(newRot, 0)
          }else {
            tlist.appendItem(newRot)
          }
        }
        if(selected.tagName == "text") {
          var children = selected.childNodes;
          var c = children.length;
          while(c--) {
            var child = children.item(c);
            if(child.tagName == "tspan") {
              var tspanChanges = {x:$(child).attr("x") || 0, y:$(child).attr("y") || 0};
              svgedit.coords.remapElement(child, tspanChanges, m)
            }
          }
        }
      }else {
        if(operation == 3 && angle) {
          var m = svgedit.math.transformListToTransform(tlist).matrix;
          var roldt = svgroot.createSVGTransform();
          roldt.setRotate(angle, oldcenter.x, oldcenter.y);
          var rold = roldt.matrix;
          var rnew = svgroot.createSVGTransform();
          rnew.setRotate(angle, newcenter.x, newcenter.y);
          var rnew_inv = rnew.matrix.inverse();
          var m_inv = m.inverse();
          var extrat = svgedit.math.matrixMultiply(m_inv, rnew_inv, rold, m);
          svgedit.coords.remapElement(selected, changes, extrat);
          if(angle) {
            if(tlist.numberOfItems) {
              tlist.insertItemBefore(rnew, 0)
            }else {
              tlist.appendItem(rnew)
            }
          }
        }
      }
    }
    if(tlist.numberOfItems == 0) {
      selected.removeAttribute("transform")
    }
    batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(selected, initial));
    return batchCmd
  }
})();(function() {
  if(!svgedit.select) {
    svgedit.select = {}
  }
  var svgFactory_;
  var config_;
  var selectorManager_;
  var gripRadius = svgedit.browser.isTouch() ? 10 : 4;
  svgedit.select.Selector = function(id, elem, bbox) {
    this.id = id;
    this.selectedElement = elem;
    this.locked = true;
    this.selectorGroup = svgFactory_.createSVGElement({element:"g", attr:{id:"selectorGroup" + this.id}});
    this.selectorRect = this.selectorGroup.appendChild(svgFactory_.createSVGElement({element:"path", attr:{id:"selectedBox" + this.id, fill:"none", stroke:"#22C", "stroke-width":"1", "stroke-dasharray":"5,5", style:"pointer-events:none"}}));
    this.gripCoords = {nw:null, n:null, ne:null, e:null, se:null, s:null, sw:null, w:null};
    this.reset(this.selectedElement, bbox)
  };
  svgedit.select.Selector.prototype.reset = function(e, bbox) {
    this.locked = true;
    this.selectedElement = e;
    this.resize(bbox);
    this.selectorGroup.setAttribute("display", "inline")
  };
  svgedit.select.Selector.prototype.updateGripCursors = function(angle) {
    var dir, dir_arr = [], steps = Math.round(angle / 45);
    if(steps < 0) {
      steps += 8
    }
    for(dir in selectorManager_.selectorGrips) {
      dir_arr.push(dir)
    }
    while(steps > 0) {
      dir_arr.push(dir_arr.shift());
      steps--
    }
    var i = 0;
    for(dir in selectorManager_.selectorGrips) {
      selectorManager_.selectorGrips[dir].setAttribute("style", "cursor:" + dir_arr[i] + "-resize");
      i++
    }
  };
  svgedit.select.Selector.prototype.showGrips = function(show) {
    var bShow = show ? "inline" : "none";
    selectorManager_.selectorGripsGroup.setAttribute("display", bShow);
    var elem = this.selectedElement;
    this.hasGrips = show;
    if(elem && show) {
      this.selectorGroup.appendChild(selectorManager_.selectorGripsGroup);
      this.updateGripCursors(svgedit.utilities.getRotationAngle(elem))
    }
  };
  svgedit.select.Selector.prototype.resize = function(bbox) {
    var selectedBox = this.selectorRect, mgr = selectorManager_, selectedGrips = mgr.selectorGrips, selected = this.selectedElement, sw = selected.getAttribute("stroke-width"), current_zoom = svgFactory_.currentZoom();
    var offset = 1 / current_zoom;
    if(selected.getAttribute("stroke") !== "none" && !isNaN(sw)) {
      offset += sw / 2
    }
    var tagName = selected.tagName;
    if(tagName === "text") {
      offset += 2 / current_zoom
    }
    var tlist = svgedit.transformlist.getTransformList(selected);
    var m = svgedit.math.transformListToTransform(tlist).matrix;
    m.e *= current_zoom;
    m.f *= current_zoom;
    if(!bbox) {
      bbox = svgedit.utilities.getBBox(selected)
    }
    if(tagName === "g" && !$.data(selected, "gsvg")) {
      var stroked_bbox = svgFactory_.getStrokedBBox(selected.childNodes);
      if(stroked_bbox) {
        bbox = stroked_bbox
      }
    }
    var l = bbox.x, t = bbox.y, w = bbox.width, h = bbox.height;
    bbox = {x:l, y:t, width:w, height:h};
    offset *= current_zoom;
    var nbox = svgedit.math.transformBox(l * current_zoom, t * current_zoom, w * current_zoom, h * current_zoom, m), aabox = nbox.aabox, nbax = aabox.x - offset, nbay = aabox.y - offset, nbaw = aabox.width + offset * 2, nbah = aabox.height + offset * 2;
    var cx = nbax + nbaw / 2, cy = nbay + nbah / 2;
    var angle = svgedit.utilities.getRotationAngle(selected);
    if(angle) {
      var rot = svgFactory_.svgRoot().createSVGTransform();
      rot.setRotate(-angle, cx, cy);
      var rotm = rot.matrix;
      nbox.tl = svgedit.math.transformPoint(nbox.tl.x, nbox.tl.y, rotm);
      nbox.tr = svgedit.math.transformPoint(nbox.tr.x, nbox.tr.y, rotm);
      nbox.bl = svgedit.math.transformPoint(nbox.bl.x, nbox.bl.y, rotm);
      nbox.br = svgedit.math.transformPoint(nbox.br.x, nbox.br.y, rotm);
      var tl = nbox.tl;
      var minx = tl.x, miny = tl.y, maxx = tl.x, maxy = tl.y;
      var min = Math.min, max = Math.max;
      minx = min(minx, min(nbox.tr.x, min(nbox.bl.x, nbox.br.x))) - offset;
      miny = min(miny, min(nbox.tr.y, min(nbox.bl.y, nbox.br.y))) - offset;
      maxx = max(maxx, max(nbox.tr.x, max(nbox.bl.x, nbox.br.x))) + offset;
      maxy = max(maxy, max(nbox.tr.y, max(nbox.bl.y, nbox.br.y))) + offset;
      nbax = minx;
      nbay = miny;
      nbaw = maxx - minx;
      nbah = maxy - miny
    }
    var dstr = "M" + nbax + "," + nbay + " L" + (nbax + nbaw) + "," + nbay + " " + (nbax + nbaw) + "," + (nbay + nbah) + " " + nbax + "," + (nbay + nbah) + "z";
    selectedBox.setAttribute("d", dstr);
    var xform = angle ? "rotate(" + [angle, cx, cy].join(",") + ")" : "";
    this.selectorGroup.setAttribute("transform", xform);
    this.gripCoords = {nw:[nbax, nbay], ne:[nbax + nbaw, nbay], sw:[nbax, nbay + nbah], se:[nbax + nbaw, nbay + nbah], n:[nbax + nbaw / 2, nbay], w:[nbax, nbay + nbah / 2], e:[nbax + nbaw, nbay + nbah / 2], s:[nbax + nbaw / 2, nbay + nbah]};
    var dir;
    for(dir in this.gripCoords) {
      var coords = this.gripCoords[dir];
      selectedGrips[dir].setAttribute("cx", coords[0]);
      selectedGrips[dir].setAttribute("cy", coords[1])
    }
    mgr.rotateGripConnector.setAttribute("x1", nbax + nbaw / 2);
    mgr.rotateGripConnector.setAttribute("y1", nbay);
    mgr.rotateGripConnector.setAttribute("x2", nbax + nbaw / 2);
    mgr.rotateGripConnector.setAttribute("y2", nbay - gripRadius * 5);
    mgr.rotateGrip.setAttribute("cx", nbax + nbaw / 2);
    mgr.rotateGrip.setAttribute("cy", nbay - gripRadius * 5)
  };
  svgedit.select.SelectorManager = function() {
    this.selectorParentGroup = null;
    this.rubberBandBox = null;
    this.selectors = [];
    this.selectorMap = {};
    this.selectorGrips = {nw:null, n:null, ne:null, e:null, se:null, s:null, sw:null, w:null};
    this.selectorGripsGroup = null;
    this.rotateGripConnector = null;
    this.rotateGrip = null;
    this.initGroup()
  };
  svgedit.select.SelectorManager.prototype.initGroup = function() {
    if(this.selectorParentGroup && this.selectorParentGroup.parentNode) {
      this.selectorParentGroup.parentNode.removeChild(this.selectorParentGroup)
    }
    this.selectorParentGroup = svgFactory_.createSVGElement({element:"g", attr:{id:"selectorParentGroup"}});
    this.selectorGripsGroup = svgFactory_.createSVGElement({element:"g", attr:{display:"none"}});
    this.selectorParentGroup.appendChild(this.selectorGripsGroup);
    svgFactory_.svgRoot().appendChild(this.selectorParentGroup);
    this.selectorMap = {};
    this.selectors = [];
    this.rubberBandBox = null;
    var dir;
    for(dir in this.selectorGrips) {
      var grip = svgFactory_.createSVGElement({element:"circle", attr:{id:"selectorGrip_resize_" + dir, fill:"#22C", r:gripRadius, style:"cursor:" + dir + "-resize", "stroke-width":2, "pointer-events":"all"}});
      $.data(grip, "dir", dir);
      $.data(grip, "type", "resize");
      this.selectorGrips[dir] = this.selectorGripsGroup.appendChild(grip)
    }
    this.rotateGripConnector = this.selectorGripsGroup.appendChild(svgFactory_.createSVGElement({element:"line", attr:{id:"selectorGrip_rotateconnector", stroke:"#22C", "stroke-width":"1"}}));
    this.rotateGrip = this.selectorGripsGroup.appendChild(svgFactory_.createSVGElement({element:"circle", attr:{id:"selectorGrip_rotate", fill:"lime", r:gripRadius, stroke:"#22C", "stroke-width":2, style:"cursor:url(" + config_.imgPath + "rotate.png) 12 12, auto;"}}));
    $.data(this.rotateGrip, "type", "rotate");
    if($("#canvasBackground").length) {
      return
    }
    var dims = config_.dimensions;
    var canvasbg = svgFactory_.createSVGElement({element:"svg", attr:{id:"canvasBackground", width:dims[0], height:dims[1], x:0, y:0, overflow:svgedit.browser.isWebkit() ? "none" : "visible", style:"pointer-events:none"}});
    var rect = svgFactory_.createSVGElement({element:"rect", attr:{width:"100%", height:"100%", x:0, y:0, "stroke-width":1, stroke:"#000", fill:"#FFF", style:"pointer-events:none"}});
    canvasbg.appendChild(rect);
    svgFactory_.svgRoot().insertBefore(canvasbg, svgFactory_.svgContent())
  };
  svgedit.select.SelectorManager.prototype.requestSelector = function(elem, bbox) {
    if(elem == null) {
      return null
    }
    var i, N = this.selectors.length;
    if(typeof this.selectorMap[elem.id] == "object") {
      this.selectorMap[elem.id].locked = true;
      return this.selectorMap[elem.id]
    }
    for(i = 0;i < N;++i) {
      if(this.selectors[i] && !this.selectors[i].locked) {
        this.selectors[i].locked = true;
        this.selectors[i].reset(elem, bbox);
        this.selectorMap[elem.id] = this.selectors[i];
        return this.selectors[i]
      }
    }
    this.selectors[N] = new svgedit.select.Selector(N, elem, bbox);
    this.selectorParentGroup.appendChild(this.selectors[N].selectorGroup);
    this.selectorMap[elem.id] = this.selectors[N];
    return this.selectors[N]
  };
  svgedit.select.SelectorManager.prototype.releaseSelector = function(elem) {
    if(elem == null) {
      return
    }
    var i, N = this.selectors.length, sel = this.selectorMap[elem.id];
    if(!sel.locked) {
      console.log("WARNING! selector was released but was already unlocked")
    }
    for(i = 0;i < N;++i) {
      if(this.selectors[i] && this.selectors[i] == sel) {
        delete this.selectorMap[elem.id];
        sel.locked = false;
        sel.selectedElement = null;
        sel.showGrips(false);
        try {
          sel.selectorGroup.setAttribute("display", "none")
        }catch(e) {
        }
        break
      }
    }
  };
  svgedit.select.SelectorManager.prototype.getRubberBandBox = function() {
    if(!this.rubberBandBox) {
      this.rubberBandBox = this.selectorParentGroup.appendChild(svgFactory_.createSVGElement({element:"rect", attr:{id:"selectorRubberBand", fill:"#22C", "fill-opacity":0.15, stroke:"#22C", "stroke-width":0.5, display:"none", style:"pointer-events:none"}}))
    }
    return this.rubberBandBox
  };
  svgedit.select.init = function(config, svgFactory) {
    config_ = config;
    svgFactory_ = svgFactory;
    selectorManager_ = new svgedit.select.SelectorManager
  };
  svgedit.select.getSelectorManager = function() {
    return selectorManager_
  }
})();(function() {
  if(!svgedit.draw) {
    svgedit.draw = {}
  }
  var NS = svgedit.NS;
  var visElems = "a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use".split(",");
  var RandomizeModes = {LET_DOCUMENT_DECIDE:0, ALWAYS_RANDOMIZE:1, NEVER_RANDOMIZE:2};
  var randomize_ids = RandomizeModes.LET_DOCUMENT_DECIDE;
  svgedit.draw.randomizeIds = function(enableRandomization, currentDrawing) {
    randomize_ids = enableRandomization === false ? RandomizeModes.NEVER_RANDOMIZE : RandomizeModes.ALWAYS_RANDOMIZE;
    if(randomize_ids == RandomizeModes.ALWAYS_RANDOMIZE && !currentDrawing.getNonce()) {
      currentDrawing.setNonce(Math.floor(Math.random() * 100001))
    }else {
      if(randomize_ids == RandomizeModes.NEVER_RANDOMIZE && currentDrawing.getNonce()) {
        currentDrawing.clearNonce()
      }
    }
  };
  svgedit.draw.Drawing = function(svgElem, opt_idPrefix) {
    if(!svgElem || !svgElem.tagName || !svgElem.namespaceURI || svgElem.tagName != "svg" || svgElem.namespaceURI != NS.SVG) {
      throw"Error: svgedit.draw.Drawing instance initialized without a <svg> element";
    }
    this.svgElem_ = svgElem;
    this.obj_num = 0;
    this.idPrefix = opt_idPrefix || "svg_";
    this.releasedNums = [];
    this.all_layers = [];
    this.layer_map = {};
    this.current_layer = null;
    this.nonce_ = "";
    var n = this.svgElem_.getAttributeNS(NS.SE, "nonce");
    if(!!n && randomize_ids != RandomizeModes.NEVER_RANDOMIZE) {
      this.nonce_ = n
    }else {
      if(randomize_ids == RandomizeModes.ALWAYS_RANDOMIZE) {
        this.setNonce(Math.floor(Math.random() * 100001))
      }
    }
  };
  svgedit.draw.Drawing.prototype.getElem_ = function(id) {
    if(this.svgElem_.querySelector) {
      return this.svgElem_.querySelector("#" + id)
    }
    return $(this.svgElem_).find("[id=" + id + "]")[0]
  };
  svgedit.draw.Drawing.prototype.getSvgElem = function() {
    return this.svgElem_
  };
  svgedit.draw.Drawing.prototype.getNonce = function() {
    return this.nonce_
  };
  svgedit.draw.Drawing.prototype.setNonce = function(n) {
    this.svgElem_.setAttributeNS(NS.XMLNS, "xmlns:se", NS.SE);
    this.svgElem_.setAttributeNS(NS.SE, "se:nonce", n);
    this.nonce_ = n
  };
  svgedit.draw.Drawing.prototype.clearNonce = function() {
    this.nonce_ = ""
  };
  svgedit.draw.Drawing.prototype.getId = function() {
    return this.nonce_ ? this.idPrefix + this.nonce_ + "_" + this.obj_num : this.idPrefix + this.obj_num
  };
  svgedit.draw.Drawing.prototype.getNextId = function() {
    var oldObjNum = this.obj_num;
    var restoreOldObjNum = false;
    if(this.releasedNums.length > 0) {
      this.obj_num = this.releasedNums.pop();
      restoreOldObjNum = true
    }else {
      this.obj_num++
    }
    var id = this.getId();
    while(this.getElem_(id)) {
      if(restoreOldObjNum) {
        this.obj_num = oldObjNum;
        restoreOldObjNum = false
      }
      this.obj_num++;
      id = this.getId()
    }
    if(restoreOldObjNum) {
      this.obj_num = oldObjNum
    }
    return id
  };
  svgedit.draw.Drawing.prototype.releaseId = function(id) {
    var front = this.idPrefix + (this.nonce_ ? this.nonce_ + "_" : "");
    if(typeof id !== "string" || id.indexOf(front) !== 0) {
      return false
    }
    var num = parseInt(id.substr(front.length), 10);
    if(typeof num !== "number" || num <= 0 || this.releasedNums.indexOf(num) != -1) {
      return false
    }
    this.releasedNums.push(num);
    return true
  };
  svgedit.draw.Drawing.prototype.getNumLayers = function() {
    return this.all_layers.length
  };
  svgedit.draw.Drawing.prototype.hasLayer = function(name) {
    return this.layer_map[name] !== undefined
  };
  svgedit.draw.Drawing.prototype.getLayerName = function(i) {
    return i >= 0 && i < this.getNumLayers() ? this.all_layers[i].getName() : ""
  };
  svgedit.draw.Drawing.prototype.getCurrentLayer = function() {
    return this.current_layer ? this.current_layer.getGroup() : null
  };
  svgedit.draw.Drawing.prototype.getLayerByName = function(name) {
    var layer = this.layer_map[name];
    return layer ? layer.getGroup() : null
  };
  svgedit.draw.Drawing.prototype.getCurrentLayerName = function() {
    return this.current_layer ? this.current_layer.getName() : ""
  };
  svgedit.draw.Drawing.prototype.setCurrentLayerName = function(name, hrService) {
    var finalName = null;
    if(this.current_layer) {
      var oldName = this.current_layer.getName();
      finalName = this.current_layer.setName(name, hrService);
      if(finalName) {
        delete this.layer_map[oldName];
        this.layer_map[finalName] = this.current_layer
      }
    }
    return finalName
  };
  svgedit.draw.Drawing.prototype.setCurrentLayerPosition = function(newpos) {
    var layer_count = this.getNumLayers();
    if(!this.current_layer || newpos < 0 || newpos >= layer_count) {
      return null
    }
    var oldpos;
    for(oldpos = 0;oldpos < layer_count;++oldpos) {
      if(this.all_layers[oldpos] == this.current_layer) {
        break
      }
    }
    if(oldpos == layer_count) {
      return null
    }
    if(oldpos != newpos) {
      var refGroup = null;
      var current_group = this.current_layer.getGroup();
      var oldNextSibling = current_group.nextSibling;
      if(newpos > oldpos) {
        if(newpos < layer_count - 1) {
          refGroup = this.all_layers[newpos + 1].getGroup()
        }
      }else {
        refGroup = this.all_layers[newpos].getGroup()
      }
      this.svgElem_.insertBefore(current_group, refGroup);
      this.identifyLayers();
      this.setCurrentLayer(this.getLayerName(newpos));
      return{currentGroup:current_group, oldNextSibling:oldNextSibling}
    }
    return null
  };
  svgedit.draw.Drawing.prototype.mergeLayer = function(hrService) {
    var current_group = this.current_layer.getGroup();
    var prevGroup = $(current_group).prev()[0];
    if(!prevGroup) {
      return
    }
    hrService.startBatchCommand("Merge Layer");
    var layerNextSibling = current_group.nextSibling;
    hrService.removeElement(current_group, layerNextSibling, this.svgElem_);
    while(current_group.firstChild) {
      var child = current_group.firstChild;
      if(child.localName == "title") {
        hrService.removeElement(child, child.nextSibling, current_group);
        current_group.removeChild(child);
        continue
      }
      var oldNextSibling = child.nextSibling;
      prevGroup.appendChild(child);
      hrService.moveElement(child, oldNextSibling, current_group)
    }
    this.current_layer.removeGroup();
    var index = this.all_layers.indexOf(this.current_layer);
    if(index > 0) {
      var name = this.current_layer.getName();
      this.current_layer = this.all_layers[index - 1];
      this.all_layers.splice(index, 1);
      delete this.layer_map[name]
    }
    hrService.endBatchCommand()
  };
  svgedit.draw.Drawing.prototype.mergeAllLayers = function(hrService) {
    this.current_layer = this.all_layers[this.all_layers.length - 1];
    hrService.startBatchCommand("Merge all Layers");
    while(this.all_layers.length > 1) {
      this.mergeLayer(hrService)
    }
    hrService.endBatchCommand()
  };
  svgedit.draw.Drawing.prototype.setCurrentLayer = function(name) {
    var layer = this.layer_map[name];
    if(layer) {
      if(this.current_layer) {
        this.current_layer.deactivate()
      }
      this.current_layer = layer;
      this.current_layer.activate();
      return true
    }
    return false
  };
  svgedit.draw.Drawing.prototype.deleteCurrentLayer = function() {
    if(this.current_layer && this.getNumLayers() > 1) {
      var oldLayerGroup = this.current_layer.removeGroup();
      this.identifyLayers();
      return oldLayerGroup
    }
    return null
  };
  function findLayerNameInGroup(group) {
    var name = $("title", group).text();
    if(!name && svgedit.browser.isOpera() && group.querySelectorAll) {
      name = $(group.querySelectorAll("title")).text()
    }
    return name
  }
  function getNewLayerName(existingLayerNames) {
    var i = 1;
    while(existingLayerNames.indexOf("Layer " + i) >= 0) {
      i++
    }
    return"Layer " + i
  }
  svgedit.draw.Drawing.prototype.identifyLayers = function() {
    this.all_layers = [];
    this.layer_map = {};
    var numchildren = this.svgElem_.childNodes.length;
    var orphans = [], layernames = [];
    var layer = null;
    var childgroups = false;
    for(var i = 0;i < numchildren;++i) {
      var child = this.svgElem_.childNodes.item(i);
      if(child && child.nodeType == 1) {
        if(child.tagName == "g") {
          childgroups = true;
          var name = findLayerNameInGroup(child);
          if(name) {
            layernames.push(name);
            layer = new svgedit.draw.Layer(name, child);
            this.all_layers.push(layer);
            this.layer_map[name] = layer
          }else {
            orphans.push(child)
          }
        }else {
          if(~visElems.indexOf(child.nodeName)) {
            orphans.push(child)
          }
        }
      }
    }
    if(orphans.length > 0 || !childgroups) {
      layer = new svgedit.draw.Layer(getNewLayerName(layernames), null, this.svgElem_);
      layer.appendChildren(orphans);
      this.all_layers.push(layer);
      this.layer_map[name] = layer
    }else {
      layer.activate()
    }
    this.current_layer = layer
  };
  svgedit.draw.Drawing.prototype.createLayer = function(name, hrService) {
    if(this.current_layer) {
      this.current_layer.deactivate()
    }
    if(name === undefined || name === null || name === "" || this.layer_map[name]) {
      name = getNewLayerName(Object.keys(this.layer_map))
    }
    var layer = new svgedit.draw.Layer(name, null, this.svgElem_);
    if(hrService) {
      hrService.startBatchCommand("Create Layer");
      hrService.insertElement(layer.getGroup());
      hrService.endBatchCommand()
    }
    this.all_layers.push(layer);
    this.layer_map[name] = layer;
    this.current_layer = layer;
    return layer.getGroup()
  };
  svgedit.draw.Drawing.prototype.cloneLayer = function(name, hrService) {
    if(!this.current_layer) {
      return null
    }
    this.current_layer.deactivate();
    if(name === undefined || name === null || name === "" || this.layer_map[name]) {
      name = getNewLayerName(Object.keys(this.layer_map))
    }
    var currentGroup = this.current_layer.getGroup();
    var layer = new svgedit.draw.Layer(name, currentGroup, this.svgElem_);
    var group = layer.getGroup();
    var children = currentGroup.childNodes;
    var index;
    for(index = 0;index < children.length;index++) {
      var ch = children[index];
      if(ch.localName == "title") {
        continue
      }
      group.appendChild(this.copyElem(ch))
    }
    if(hrService) {
      hrService.startBatchCommand("Duplicate Layer");
      hrService.insertElement(group);
      hrService.endBatchCommand()
    }
    index = this.all_layers.indexOf(this.current_layer);
    if(index >= 0) {
      this.all_layers.splice(index + 1, 0, layer)
    }else {
      this.all_layers.push(layer)
    }
    this.layer_map[name] = layer;
    this.current_layer = layer;
    return group
  };
  svgedit.draw.Drawing.prototype.getLayerVisibility = function(layername) {
    var layer = this.layer_map[layername];
    return layer ? layer.isVisible() : false
  };
  svgedit.draw.Drawing.prototype.setLayerVisibility = function(layername, bVisible) {
    if(typeof bVisible !== "boolean") {
      return null
    }
    var layer = this.layer_map[layername];
    if(!layer) {
      return null
    }
    layer.setVisible(bVisible);
    return layer.getGroup()
  };
  svgedit.draw.Drawing.prototype.getLayerOpacity = function(layername) {
    var layer = this.layer_map[layername];
    if(!layer) {
      return null
    }
    return layer.getOpacity()
  };
  svgedit.draw.Drawing.prototype.setLayerOpacity = function(layername, opacity) {
    if(typeof opacity !== "number" || opacity < 0 || opacity > 1) {
      return
    }
    var layer = this.layer_map[layername];
    if(layer) {
      layer.setOpacity(opacity)
    }
  };
  svgedit.draw.Drawing.prototype.copyElem = function(el) {
    var self = this;
    var getNextIdClosure = function() {
      return self.getNextId()
    };
    return svgedit.utilities.copyElem(el, getNextIdClosure)
  }
})();(function() {
  if(!svgedit.draw) {
    svgedit.draw = {}
  }
  var NS = svgedit.NS;
  var Layer = svgedit.draw.Layer = function(name, group, svgElem) {
    this.name_ = name;
    this.group_ = svgElem ? null : group;
    if(svgElem) {
      var svgdoc = svgElem.ownerDocument;
      this.group_ = svgdoc.createElementNS(NS.SVG, "g");
      var layer_title = svgdoc.createElementNS(NS.SVG, "title");
      layer_title.textContent = name;
      this.group_.appendChild(layer_title);
      if(group) {
        $(group).after(this.group_)
      }else {
        svgElem.appendChild(this.group_)
      }
    }
    addLayerClass(this.group_);
    svgedit.utilities.walkTree(this.group_, function(e) {
      e.setAttribute("style", "pointer-events:inherit")
    });
    this.group_.setAttribute("style", svgElem ? "pointer-events:all" : "pointer-events:none")
  };
  Layer.CLASS_NAME = "layer";
  Layer.CLASS_REGEX = new RegExp("(\\s|^)" + Layer.CLASS_NAME + "(\\s|$)");
  Layer.prototype.getName = function() {
    return this.name_
  };
  Layer.prototype.getGroup = function() {
    return this.group_
  };
  Layer.prototype.activate = function() {
    this.group_.setAttribute("style", "pointer-events:all")
  };
  Layer.prototype.deactivate = function() {
    this.group_.setAttribute("style", "pointer-events:none")
  };
  Layer.prototype.setVisible = function(visible) {
    var expected = visible === undefined || visible ? "inline" : "none";
    var oldDisplay = this.group_.getAttribute("display");
    if(oldDisplay !== expected) {
      this.group_.setAttribute("display", expected)
    }
  };
  Layer.prototype.isVisible = function() {
    return this.group_.getAttribute("display") !== "none"
  };
  Layer.prototype.getOpacity = function() {
    var opacity = this.group_.getAttribute("opacity");
    if(opacity === null || opacity === undefined) {
      return 1
    }
    return parseFloat(opacity)
  };
  Layer.prototype.setOpacity = function(opacity) {
    if(typeof opacity === "number" && opacity >= 0 && opacity <= 1) {
      this.group_.setAttribute("opacity", opacity)
    }
  };
  Layer.prototype.appendChildren = function(children) {
    for(var i = 0;i < children.length;++i) {
      this.group_.appendChild(children[i])
    }
  };
  Layer.prototype.getTitleElement = function() {
    var len = this.group_.childNodes.length;
    for(var i = 0;i < len;++i) {
      var child = this.group_.childNodes.item(i);
      if(child && child.tagName === "title") {
        return child
      }
    }
    return null
  };
  Layer.prototype.setName = function(name, hrService) {
    var previousName = this.name_;
    name = svgedit.utilities.toXml(name);
    var title = this.getTitleElement();
    if(title) {
      while(title.firstChild) {
        title.removeChild(title.firstChild)
      }
      title.textContent = name;
      this.name_ = name;
      if(hrService) {
        hrService.changeElement(title, {"#text":previousName})
      }
      return this.name_
    }
    return null
  };
  Layer.prototype.removeGroup = function() {
    var parent = this.group_.parentNode;
    var group = parent.removeChild(this.group_);
    this.group_ = undefined;
    return group
  };
  function addLayerClass(elem) {
    var classes = elem.getAttribute("class");
    if(classes === null || classes === undefined || classes.length === 0) {
      elem.setAttribute("class", Layer.CLASS_NAME)
    }else {
      if(!Layer.CLASS_REGEX.test(classes)) {
        elem.setAttribute("class", classes + " " + Layer.CLASS_NAME)
      }
    }
  }
})();(function() {
  if(!svgedit.path) {
    svgedit.path = {}
  }
  var NS = svgedit.NS;
  var uiStrings = {pathNodeTooltip:"Drag node to move it. Double-click node to change segment type", pathCtrlPtTooltip:"Drag control point to adjust curve properties"};
  var segData = {2:["x", "y"], 4:["x", "y"], 6:["x", "y", "x1", "y1", "x2", "y2"], 8:["x", "y", "x1", "y1"], 10:["x", "y", "r1", "r2", "angle", "largeArcFlag", "sweepFlag"], 12:["x"], 14:["y"], 16:["x", "y", "x2", "y2"], 18:["x", "y"]};
  var pathFuncs = [];
  var link_control_pts = true;
  var pathData = {};
  svgedit.path.setLinkControlPoints = function(lcp) {
    link_control_pts = lcp
  };
  svgedit.path.path = null;
  var editorContext_ = null;
  svgedit.path.init = function(editorContext) {
    editorContext_ = editorContext;
    pathFuncs = [0, "ClosePath"];
    var pathFuncsStrs = ["Moveto", "Lineto", "CurvetoCubic", "CurvetoQuadratic", "Arc", "LinetoHorizontal", "LinetoVertical", "CurvetoCubicSmooth", "CurvetoQuadraticSmooth"];
    $.each(pathFuncsStrs, function(i, s) {
      pathFuncs.push(s + "Abs");
      pathFuncs.push(s + "Rel")
    })
  };
  svgedit.path.insertItemBefore = function(elem, newseg, index) {
    var list = elem.pathSegList;
    if(svgedit.browser.supportsPathInsertItemBefore()) {
      list.insertItemBefore(newseg, index);
      return
    }
    var len = list.numberOfItems;
    var arr = [];
    var i;
    for(i = 0;i < len;i++) {
      var cur_seg = list.getItem(i);
      arr.push(cur_seg)
    }
    list.clear();
    for(i = 0;i < len;i++) {
      if(i == index) {
        list.appendItem(newseg)
      }
      list.appendItem(arr[i])
    }
  };
  svgedit.path.ptObjToArr = function(type, seg_item) {
    var arr = segData[type], len = arr.length;
    var i, out = [];
    for(i = 0;i < len;i++) {
      out[i] = seg_item[arr[i]]
    }
    return out
  };
  svgedit.path.getGripPt = function(seg, alt_pt) {
    var out = {x:alt_pt ? alt_pt.x : seg.item.x, y:alt_pt ? alt_pt.y : seg.item.y}, path = seg.path;
    if(path.matrix) {
      var pt = svgedit.math.transformPoint(out.x, out.y, path.matrix);
      out = pt
    }
    out.x *= editorContext_.getCurrentZoom();
    out.y *= editorContext_.getCurrentZoom();
    return out
  };
  svgedit.path.getPointFromGrip = function(pt, path) {
    var out = {x:pt.x, y:pt.y};
    if(path.matrix) {
      pt = svgedit.math.transformPoint(out.x, out.y, path.imatrix);
      out.x = pt.x;
      out.y = pt.y
    }
    out.x /= editorContext_.getCurrentZoom();
    out.y /= editorContext_.getCurrentZoom();
    return out
  };
  svgedit.path.addPointGrip = function(index, x, y) {
    var pointGripContainer = svgedit.path.getGripContainer();
    var pointGrip = svgedit.utilities.getElem("pathpointgrip_" + index);
    if(!pointGrip) {
      pointGrip = document.createElementNS(NS.SVG, "circle");
      svgedit.utilities.assignAttributes(pointGrip, {id:"pathpointgrip_" + index, display:"none", r:4, fill:"#0FF", stroke:"#00F", "stroke-width":2, cursor:"move", style:"pointer-events:all", "xlink:title":uiStrings.pathNodeTooltip});
      pointGrip = pointGripContainer.appendChild(pointGrip);
      var grip = $("#pathpointgrip_" + index);
      grip.dblclick(function() {
        if(svgedit.path.path) {
          svgedit.path.path.setSegType()
        }
      })
    }
    if(x && y) {
      svgedit.utilities.assignAttributes(pointGrip, {cx:x, cy:y, display:"inline"})
    }
    return pointGrip
  };
  svgedit.path.getGripContainer = function() {
    var c = svgedit.utilities.getElem("pathpointgrip_container");
    if(!c) {
      var parent = svgedit.utilities.getElem("selectorParentGroup");
      c = parent.appendChild(document.createElementNS(NS.SVG, "g"));
      c.id = "pathpointgrip_container"
    }
    return c
  };
  svgedit.path.addCtrlGrip = function(id) {
    var pointGrip = svgedit.utilities.getElem("ctrlpointgrip_" + id);
    if(pointGrip) {
      return pointGrip
    }
    pointGrip = document.createElementNS(NS.SVG, "circle");
    svgedit.utilities.assignAttributes(pointGrip, {id:"ctrlpointgrip_" + id, display:"none", r:4, fill:"#0FF", stroke:"#55F", "stroke-width":1, cursor:"move", style:"pointer-events:all", "xlink:title":uiStrings.pathCtrlPtTooltip});
    svgedit.path.getGripContainer().appendChild(pointGrip);
    return pointGrip
  };
  svgedit.path.getCtrlLine = function(id) {
    var ctrlLine = svgedit.utilities.getElem("ctrlLine_" + id);
    if(ctrlLine) {
      return ctrlLine
    }
    ctrlLine = document.createElementNS(NS.SVG, "line");
    svgedit.utilities.assignAttributes(ctrlLine, {id:"ctrlLine_" + id, stroke:"#555", "stroke-width":1, style:"pointer-events:none"});
    svgedit.path.getGripContainer().appendChild(ctrlLine);
    return ctrlLine
  };
  svgedit.path.getPointGrip = function(seg, update) {
    var index = seg.index;
    var pointGrip = svgedit.path.addPointGrip(index);
    if(update) {
      var pt = svgedit.path.getGripPt(seg);
      svgedit.utilities.assignAttributes(pointGrip, {cx:pt.x, cy:pt.y, display:"inline"})
    }
    return pointGrip
  };
  svgedit.path.getControlPoints = function(seg) {
    var item = seg.item;
    var index = seg.index;
    if(!("x1" in item) || !("x2" in item)) {
      return null
    }
    var cpt = {};
    var pointGripContainer = svgedit.path.getGripContainer();
    var prev = svgedit.path.path.segs[index - 1].item;
    var seg_items = [prev, item];
    var i;
    for(i = 1;i < 3;i++) {
      var id = index + "c" + i;
      var ctrlLine = cpt["c" + i + "_line"] = svgedit.path.getCtrlLine(id);
      var pt = svgedit.path.getGripPt(seg, {x:item["x" + i], y:item["y" + i]});
      var gpt = svgedit.path.getGripPt(seg, {x:seg_items[i - 1].x, y:seg_items[i - 1].y});
      svgedit.utilities.assignAttributes(ctrlLine, {x1:pt.x, y1:pt.y, x2:gpt.x, y2:gpt.y, display:"inline"});
      cpt["c" + i + "_line"] = ctrlLine;
      var pointGrip = cpt["c" + i] = svgedit.path.addCtrlGrip(id);
      svgedit.utilities.assignAttributes(pointGrip, {cx:pt.x, cy:pt.y, display:"inline"});
      cpt["c" + i] = pointGrip
    }
    return cpt
  };
  svgedit.path.replacePathSeg = function(type, index, pts, elem) {
    var path = elem || svgedit.path.path.elem;
    var func = "createSVGPathSeg" + pathFuncs[type];
    var seg = path[func].apply(path, pts);
    if(svgedit.browser.supportsPathReplaceItem()) {
      path.pathSegList.replaceItem(seg, index)
    }else {
      var segList = path.pathSegList;
      var len = segList.numberOfItems;
      var arr = [];
      var i;
      for(i = 0;i < len;i++) {
        var cur_seg = segList.getItem(i);
        arr.push(cur_seg)
      }
      segList.clear();
      for(i = 0;i < len;i++) {
        if(i == index) {
          segList.appendItem(seg)
        }else {
          segList.appendItem(arr[i])
        }
      }
    }
  };
  svgedit.path.getSegSelector = function(seg, update) {
    var index = seg.index;
    var segLine = svgedit.utilities.getElem("segline_" + index);
    if(!segLine) {
      var pointGripContainer = svgedit.path.getGripContainer();
      segLine = document.createElementNS(NS.SVG, "path");
      svgedit.utilities.assignAttributes(segLine, {id:"segline_" + index, display:"none", fill:"none", stroke:"#0FF", "stroke-width":2, style:"pointer-events:none", d:"M0,0 0,0"});
      pointGripContainer.appendChild(segLine)
    }
    if(update) {
      var prev = seg.prev;
      if(!prev) {
        segLine.setAttribute("display", "none");
        return segLine
      }
      var pt = svgedit.path.getGripPt(prev);
      svgedit.path.replacePathSeg(2, 0, [pt.x, pt.y], segLine);
      var pts = svgedit.path.ptObjToArr(seg.type, seg.item, true);
      var i;
      for(i = 0;i < pts.length;i += 2) {
        pt = svgedit.path.getGripPt(seg, {x:pts[i], y:pts[i + 1]});
        pts[i] = pt.x;
        pts[i + 1] = pt.y
      }
      svgedit.path.replacePathSeg(seg.type, 1, pts, segLine)
    }
    return segLine
  };
  svgedit.path.smoothControlPoints = function(ct1, ct2, pt) {
    var x1 = ct1.x - pt.x, y1 = ct1.y - pt.y, x2 = ct2.x - pt.x, y2 = ct2.y - pt.y;
    if((x1 != 0 || y1 != 0) && (x2 != 0 || y2 != 0)) {
      var anglea = Math.atan2(y1, x1), angleb = Math.atan2(y2, x2), r1 = Math.sqrt(x1 * x1 + y1 * y1), r2 = Math.sqrt(x2 * x2 + y2 * y2), nct1 = editorContext_.getSVGRoot().createSVGPoint(), nct2 = editorContext_.getSVGRoot().createSVGPoint();
      if(anglea < 0) {
        anglea += 2 * Math.PI
      }
      if(angleb < 0) {
        angleb += 2 * Math.PI
      }
      var angleBetween = Math.abs(anglea - angleb), angleDiff = Math.abs(Math.PI - angleBetween) / 2;
      var new_anglea, new_angleb;
      if(anglea - angleb > 0) {
        new_anglea = angleBetween < Math.PI ? anglea + angleDiff : anglea - angleDiff;
        new_angleb = angleBetween < Math.PI ? angleb - angleDiff : angleb + angleDiff
      }else {
        new_anglea = angleBetween < Math.PI ? anglea - angleDiff : anglea + angleDiff;
        new_angleb = angleBetween < Math.PI ? angleb + angleDiff : angleb - angleDiff
      }
      nct1.x = r1 * Math.cos(new_anglea) + pt.x;
      nct1.y = r1 * Math.sin(new_anglea) + pt.y;
      nct2.x = r2 * Math.cos(new_angleb) + pt.x;
      nct2.y = r2 * Math.sin(new_angleb) + pt.y;
      return[nct1, nct2]
    }
    return undefined
  };
  svgedit.path.Segment = function(index, item) {
    this.selected = false;
    this.index = index;
    this.item = item;
    this.type = item.pathSegType;
    this.ctrlpts = [];
    this.ptgrip = null;
    this.segsel = null
  };
  svgedit.path.Segment.prototype.showCtrlPts = function(y) {
    var i;
    for(i in this.ctrlpts) {
      if(this.ctrlpts.hasOwnProperty(i)) {
        this.ctrlpts[i].setAttribute("display", y ? "inline" : "none")
      }
    }
  };
  svgedit.path.Segment.prototype.selectCtrls = function(y) {
    $("#ctrlpointgrip_" + this.index + "c1, #ctrlpointgrip_" + this.index + "c2").attr("fill", y ? "#0FF" : "#EEE")
  };
  svgedit.path.Segment.prototype.show = function(y) {
    if(this.ptgrip) {
      this.ptgrip.setAttribute("display", y ? "inline" : "none");
      this.segsel.setAttribute("display", y ? "inline" : "none");
      this.showCtrlPts(y)
    }
  };
  svgedit.path.Segment.prototype.select = function(y) {
    if(this.ptgrip) {
      this.ptgrip.setAttribute("stroke", y ? "#0FF" : "#00F");
      this.segsel.setAttribute("display", y ? "inline" : "none");
      if(this.ctrlpts) {
        this.selectCtrls(y)
      }
      this.selected = y
    }
  };
  svgedit.path.Segment.prototype.addGrip = function() {
    this.ptgrip = svgedit.path.getPointGrip(this, true);
    this.ctrlpts = svgedit.path.getControlPoints(this, true);
    this.segsel = svgedit.path.getSegSelector(this, true)
  };
  svgedit.path.Segment.prototype.update = function(full) {
    if(this.ptgrip) {
      var pt = svgedit.path.getGripPt(this);
      svgedit.utilities.assignAttributes(this.ptgrip, {cx:pt.x, cy:pt.y});
      svgedit.path.getSegSelector(this, true);
      if(this.ctrlpts) {
        if(full) {
          this.item = svgedit.path.path.elem.pathSegList.getItem(this.index);
          this.type = this.item.pathSegType
        }
        svgedit.path.getControlPoints(this)
      }
    }
  };
  svgedit.path.Segment.prototype.move = function(dx, dy) {
    var cur_pts, item = this.item;
    if(this.ctrlpts) {
      cur_pts = [item.x += dx, item.y += dy, item.x1, item.y1, item.x2 += dx, item.y2 += dy]
    }else {
      cur_pts = [item.x += dx, item.y += dy]
    }
    svgedit.path.replacePathSeg(this.type, this.index, cur_pts);
    if(this.next && this.next.ctrlpts) {
      var next = this.next.item;
      var next_pts = [next.x, next.y, next.x1 += dx, next.y1 += dy, next.x2, next.y2];
      svgedit.path.replacePathSeg(this.next.type, this.next.index, next_pts)
    }
    if(this.mate) {
      item = this.mate.item;
      var pts = [item.x += dx, item.y += dy];
      svgedit.path.replacePathSeg(this.mate.type, this.mate.index, pts)
    }
    this.update(true);
    if(this.next) {
      this.next.update(true)
    }
  };
  svgedit.path.Segment.prototype.setLinked = function(num) {
    var seg, anum, pt;
    if(num == 2) {
      anum = 1;
      seg = this.next;
      if(!seg) {
        return
      }
      pt = this.item
    }else {
      anum = 2;
      seg = this.prev;
      if(!seg) {
        return
      }
      pt = seg.item
    }
    var item = seg.item;
    item["x" + anum] = pt.x + (pt.x - this.item["x" + num]);
    item["y" + anum] = pt.y + (pt.y - this.item["y" + num]);
    var pts = [item.x, item.y, item.x1, item.y1, item.x2, item.y2];
    svgedit.path.replacePathSeg(seg.type, seg.index, pts);
    seg.update(true)
  };
  svgedit.path.Segment.prototype.moveCtrl = function(num, dx, dy) {
    var item = this.item;
    item["x" + num] += dx;
    item["y" + num] += dy;
    var pts = [item.x, item.y, item.x1, item.y1, item.x2, item.y2];
    svgedit.path.replacePathSeg(this.type, this.index, pts);
    this.update(true)
  };
  svgedit.path.Segment.prototype.setType = function(new_type, pts) {
    svgedit.path.replacePathSeg(new_type, this.index, pts);
    this.type = new_type;
    this.item = svgedit.path.path.elem.pathSegList.getItem(this.index);
    this.showCtrlPts(new_type === 6);
    this.ctrlpts = svgedit.path.getControlPoints(this);
    this.update(true)
  };
  svgedit.path.Path = function(elem) {
    if(!elem || elem.tagName !== "path") {
      throw"svgedit.path.Path constructed without a <path> element";
    }
    this.elem = elem;
    this.segs = [];
    this.selected_pts = [];
    svgedit.path.path = this;
    this.init()
  };
  svgedit.path.Path.prototype.init = function() {
    $(svgedit.path.getGripContainer()).find("*").each(function() {
      $(this).attr("display", "none")
    });
    var segList = this.elem.pathSegList;
    var len = segList.numberOfItems;
    this.segs = [];
    this.selected_pts = [];
    this.first_seg = null;
    var i;
    for(i = 0;i < len;i++) {
      var item = segList.getItem(i);
      var segment = new svgedit.path.Segment(i, item);
      segment.path = this;
      this.segs.push(segment)
    }
    var segs = this.segs;
    var start_i = null;
    for(i = 0;i < len;i++) {
      var seg = segs[i];
      var next_seg = i + 1 >= len ? null : segs[i + 1];
      var prev_seg = i - 1 < 0 ? null : segs[i - 1];
      var start_seg;
      if(seg.type === 2) {
        if(prev_seg && prev_seg.type !== 1) {
          start_seg = segs[start_i];
          start_seg.next = segs[start_i + 1];
          start_seg.next.prev = start_seg;
          start_seg.addGrip()
        }
        start_i = i
      }else {
        if(next_seg && next_seg.type === 1) {
          seg.next = segs[start_i + 1];
          seg.next.prev = seg;
          seg.mate = segs[start_i];
          seg.addGrip();
          if(this.first_seg == null) {
            this.first_seg = seg
          }
        }else {
          if(!next_seg) {
            if(seg.type !== 1) {
              start_seg = segs[start_i];
              start_seg.next = segs[start_i + 1];
              start_seg.next.prev = start_seg;
              start_seg.addGrip();
              seg.addGrip();
              if(!this.first_seg) {
                this.first_seg = segs[start_i]
              }
            }
          }else {
            if(seg.type !== 1) {
              seg.addGrip();
              if(next_seg && next_seg.type !== 2) {
                seg.next = next_seg;
                seg.next.prev = seg
              }
            }
          }
        }
      }
    }
    return this
  };
  svgedit.path.Path.prototype.eachSeg = function(fn) {
    var i;
    var len = this.segs.length;
    for(i = 0;i < len;i++) {
      var ret = fn.call(this.segs[i], i);
      if(ret === false) {
        break
      }
    }
  };
  svgedit.path.Path.prototype.addSeg = function(index) {
    var seg = this.segs[index];
    if(!seg.prev) {
      return
    }
    var prev = seg.prev;
    var newseg, new_x, new_y;
    switch(seg.item.pathSegType) {
      case 4:
        new_x = (seg.item.x + prev.item.x) / 2;
        new_y = (seg.item.y + prev.item.y) / 2;
        newseg = this.elem.createSVGPathSegLinetoAbs(new_x, new_y);
        break;
      case 6:
        var p0_x = (prev.item.x + seg.item.x1) / 2;
        var p1_x = (seg.item.x1 + seg.item.x2) / 2;
        var p2_x = (seg.item.x2 + seg.item.x) / 2;
        var p01_x = (p0_x + p1_x) / 2;
        var p12_x = (p1_x + p2_x) / 2;
        new_x = (p01_x + p12_x) / 2;
        var p0_y = (prev.item.y + seg.item.y1) / 2;
        var p1_y = (seg.item.y1 + seg.item.y2) / 2;
        var p2_y = (seg.item.y2 + seg.item.y) / 2;
        var p01_y = (p0_y + p1_y) / 2;
        var p12_y = (p1_y + p2_y) / 2;
        new_y = (p01_y + p12_y) / 2;
        newseg = this.elem.createSVGPathSegCurvetoCubicAbs(new_x, new_y, p0_x, p0_y, p01_x, p01_y);
        var pts = [seg.item.x, seg.item.y, p12_x, p12_y, p2_x, p2_y];
        svgedit.path.replacePathSeg(seg.type, index, pts);
        break
    }
    svgedit.path.insertItemBefore(this.elem, newseg, index)
  };
  svgedit.path.Path.prototype.deleteSeg = function(index) {
    var seg = this.segs[index];
    var list = this.elem.pathSegList;
    seg.show(false);
    var next = seg.next;
    var pt;
    if(seg.mate) {
      pt = [next.item.x, next.item.y];
      svgedit.path.replacePathSeg(2, next.index, pt);
      svgedit.path.replacePathSeg(4, seg.index, pt);
      list.removeItem(seg.mate.index)
    }else {
      if(!seg.prev) {
        var item = seg.item;
        pt = [next.item.x, next.item.y];
        svgedit.path.replacePathSeg(2, seg.next.index, pt);
        list.removeItem(index)
      }else {
        list.removeItem(index)
      }
    }
  };
  svgedit.path.Path.prototype.subpathIsClosed = function(index) {
    var closed = false;
    svgedit.path.path.eachSeg(function(i) {
      if(i <= index) {
        return true
      }
      if(this.type === 2) {
        return false
      }
      if(this.type === 1) {
        closed = true;
        return false
      }
    });
    return closed
  };
  svgedit.path.Path.prototype.removePtFromSelection = function(index) {
    var pos = this.selected_pts.indexOf(index);
    if(pos == -1) {
      return
    }
    this.segs[index].select(false);
    this.selected_pts.splice(pos, 1)
  };
  svgedit.path.Path.prototype.clearSelection = function() {
    this.eachSeg(function() {
      this.select(false)
    });
    this.selected_pts = []
  };
  svgedit.path.Path.prototype.storeD = function() {
    this.last_d = this.elem.getAttribute("d")
  };
  svgedit.path.Path.prototype.show = function(y) {
    this.eachSeg(function() {
      this.show(y)
    });
    if(y) {
      this.selectPt(this.first_seg.index)
    }
    return this
  };
  svgedit.path.Path.prototype.movePts = function(d_x, d_y) {
    var i = this.selected_pts.length;
    while(i--) {
      var seg = this.segs[this.selected_pts[i]];
      seg.move(d_x, d_y)
    }
  };
  svgedit.path.Path.prototype.moveCtrl = function(d_x, d_y) {
    var seg = this.segs[this.selected_pts[0]];
    seg.moveCtrl(this.dragctrl, d_x, d_y);
    if(link_control_pts) {
      seg.setLinked(this.dragctrl)
    }
  };
  svgedit.path.Path.prototype.setSegType = function(new_type) {
    this.storeD();
    var i = this.selected_pts.length;
    var text;
    while(i--) {
      var sel_pt = this.selected_pts[i];
      var cur = this.segs[sel_pt];
      var prev = cur.prev;
      if(!prev) {
        continue
      }
      if(!new_type) {
        text = "Toggle Path Segment Type";
        var old_type = cur.type;
        new_type = old_type == 6 ? 4 : 6
      }
      new_type = Number(new_type);
      var cur_x = cur.item.x;
      var cur_y = cur.item.y;
      var prev_x = prev.item.x;
      var prev_y = prev.item.y;
      var points;
      switch(new_type) {
        case 6:
          if(cur.olditem) {
            var old = cur.olditem;
            points = [cur_x, cur_y, old.x1, old.y1, old.x2, old.y2]
          }else {
            var diff_x = cur_x - prev_x;
            var diff_y = cur_y - prev_y;
            var ct1_x = prev_x + diff_x / 3;
            var ct1_y = prev_y + diff_y / 3;
            var ct2_x = cur_x - diff_x / 3;
            var ct2_y = cur_y - diff_y / 3;
            points = [cur_x, cur_y, ct1_x, ct1_y, ct2_x, ct2_y]
          }
          break;
        case 4:
          points = [cur_x, cur_y];
          cur.olditem = cur.item;
          break
      }
      cur.setType(new_type, points)
    }
    svgedit.path.path.endChanges(text)
  };
  svgedit.path.Path.prototype.selectPt = function(pt, ctrl_num) {
    this.clearSelection();
    if(pt == null) {
      this.eachSeg(function(i) {
        if(this.prev) {
          pt = i
        }
      })
    }
    this.addPtsToSelection(pt);
    if(ctrl_num) {
      this.dragctrl = ctrl_num;
      if(link_control_pts) {
        this.segs[pt].setLinked(ctrl_num)
      }
    }
  };
  svgedit.path.Path.prototype.update = function() {
    var elem = this.elem;
    if(svgedit.utilities.getRotationAngle(elem)) {
      this.matrix = svgedit.math.getMatrix(elem);
      this.imatrix = this.matrix.inverse()
    }else {
      this.matrix = null;
      this.imatrix = null
    }
    this.eachSeg(function(i) {
      this.item = elem.pathSegList.getItem(i);
      this.update()
    });
    return this
  };
  svgedit.path.getPath_ = function(elem) {
    var p = pathData[elem.id];
    if(!p) {
      p = pathData[elem.id] = new svgedit.path.Path(elem)
    }
    return p
  };
  svgedit.path.removePath_ = function(id) {
    if(id in pathData) {
      delete pathData[id]
    }
  };
  var newcx, newcy, oldcx, oldcy, angle;
  var getRotVals = function(x, y) {
    var dx = x - oldcx;
    var dy = y - oldcy;
    var r = Math.sqrt(dx * dx + dy * dy);
    var theta = Math.atan2(dy, dx) + angle;
    dx = r * Math.cos(theta) + oldcx;
    dy = r * Math.sin(theta) + oldcy;
    dx -= newcx;
    dy -= newcy;
    r = Math.sqrt(dx * dx + dy * dy);
    theta = Math.atan2(dy, dx) - angle;
    return{x:r * Math.cos(theta) + newcx, y:r * Math.sin(theta) + newcy}
  };
  svgedit.path.recalcRotatedPath = function() {
    var current_path = svgedit.path.path.elem;
    angle = svgedit.utilities.getRotationAngle(current_path, true);
    if(!angle) {
      return
    }
    var box = svgedit.utilities.getBBox(current_path), oldbox = svgedit.path.path.oldbbox;
    oldcx = oldbox.x + oldbox.width / 2;
    oldcy = oldbox.y + oldbox.height / 2;
    newcx = box.x + box.width / 2;
    newcy = box.y + box.height / 2;
    var dx = newcx - oldcx, dy = newcy - oldcy, r = Math.sqrt(dx * dx + dy * dy), theta = Math.atan2(dy, dx) + angle;
    newcx = r * Math.cos(theta) + oldcx;
    newcy = r * Math.sin(theta) + oldcy;
    var list = current_path.pathSegList, i = list.numberOfItems;
    while(i) {
      i -= 1;
      var seg = list.getItem(i), type = seg.pathSegType;
      if(type == 1) {
        continue
      }
      var rvals = getRotVals(seg.x, seg.y), points = [rvals.x, rvals.y];
      if(seg.x1 != null && seg.x2 != null) {
        var c_vals1 = getRotVals(seg.x1, seg.y1);
        var c_vals2 = getRotVals(seg.x2, seg.y2);
        points.splice(points.length, 0, c_vals1.x, c_vals1.y, c_vals2.x, c_vals2.y)
      }
      svgedit.path.replacePathSeg(type, i, points)
    }
    box = svgedit.utilities.getBBox(current_path);
    var R_nc = svgroot.createSVGTransform(), tlist = svgedit.transformlist.getTransformList(current_path);
    R_nc.setRotate(angle * 180 / Math.PI, newcx, newcy);
    tlist.replaceItem(R_nc, 0)
  };
  svgedit.path.clearData = function() {
    pathData = {}
  }
})();(function() {
  if(!window.console) {
    window.console = {};
    window.console.log = function(str) {
    };
    window.console.dir = function(str) {
    }
  }
  if(window.opera) {
    window.console.log = function(str) {
      opera.postError(str)
    };
    window.console.dir = function(str) {
    }
  }
})();
$.SvgCanvas = function(container, config) {
  var NS = svgedit.NS;
  var curConfig = {show_outside_canvas:true, selectNew:true, dimensions:[640, 480]};
  if(config) {
    $.extend(curConfig, config)
  }
  var dimensions = curConfig.dimensions;
  var canvas = this;
  var svgdoc = container.ownerDocument;
  var svgroot = svgdoc.importNode(svgedit.utilities.text2xml('<svg id="svgroot" xmlns="' + NS.SVG + '" xlinkns="' + NS.XLINK + '" ' + 'width="' + dimensions[0] + '" height="' + dimensions[1] + '" x="' + dimensions[0] + '" y="' + dimensions[1] + '" overflow="visible">' + "<defs>" + '<filter id="canvashadow" filterUnits="objectBoundingBox">' + '<feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>' + '<feOffset in="blur" dx="5" dy="5" result="offsetBlur"/>' + "<feMerge>" + '<feMergeNode in="offsetBlur"/>' + 
  '<feMergeNode in="SourceGraphic"/>' + "</feMerge>" + "</filter>" + "</defs>" + "</svg>").documentElement, true);
  container.appendChild(svgroot);
  var svgcontent = svgdoc.createElementNS(NS.SVG, "svg");
  var clearSvgContentElement = canvas.clearSvgContentElement = function() {
    while(svgcontent.firstChild) {
      svgcontent.removeChild(svgcontent.firstChild)
    }
    $(svgcontent).attr({id:"svgcontent", width:dimensions[0], height:dimensions[1], x:dimensions[0], y:dimensions[1], overflow:curConfig.show_outside_canvas ? "visible" : "hidden", xmlns:NS.SVG, "xmlns:se":NS.SE, "xmlns:xlink":NS.XLINK}).appendTo(svgroot);
    var comment = svgdoc.createComment(" Created with SVG-edit - https://github.com/SVG-Edit/svgedit");
    svgcontent.appendChild(comment)
  };
  clearSvgContentElement();
  var idprefix = "svg_";
  canvas.setIdPrefix = function(p) {
    idprefix = p
  };
  canvas.current_drawing_ = new svgedit.draw.Drawing(svgcontent, idprefix);
  var getCurrentDrawing = canvas.getCurrentDrawing = function() {
    return canvas.current_drawing_
  };
  var current_zoom = 1;
  var current_group = null;
  var all_properties = {shape:{fill:(curConfig.initFill.color == "none" ? "" : "#") + curConfig.initFill.color, fill_paint:null, fill_opacity:curConfig.initFill.opacity, stroke:"#" + curConfig.initStroke.color, stroke_paint:null, stroke_opacity:curConfig.initStroke.opacity, stroke_width:curConfig.initStroke.width, stroke_dasharray:"none", stroke_linejoin:"miter", stroke_linecap:"butt", opacity:curConfig.initOpacity}};
  all_properties.text = $.extend(true, {}, all_properties.shape);
  $.extend(all_properties.text, {fill:"#000000", stroke_width:curConfig.text.stroke_width, font_size:curConfig.text.font_size, font_family:curConfig.text.font_family});
  var cur_shape = all_properties.shape;
  var selectedElements = [];
  var addSvgElementFromJson = this.addSvgElementFromJson = function(data) {
    if(typeof data == "string") {
      return svgdoc.createTextNode(data)
    }
    var shape = svgedit.utilities.getElem(data.attr.id);
    var current_layer = getCurrentDrawing().getCurrentLayer();
    if(shape && data.element != shape.tagName) {
      current_layer.removeChild(shape);
      shape = null
    }
    if(!shape) {
      shape = svgdoc.createElementNS(NS.SVG, data.element);
      if(current_layer) {
        (current_group || current_layer).appendChild(shape)
      }
    }
    if(data.curStyles) {
      svgedit.utilities.assignAttributes(shape, {fill:cur_shape.fill, stroke:cur_shape.stroke, "stroke-width":cur_shape.stroke_width, "stroke-dasharray":cur_shape.stroke_dasharray, "stroke-linejoin":cur_shape.stroke_linejoin, "stroke-linecap":cur_shape.stroke_linecap, "stroke-opacity":cur_shape.stroke_opacity, "fill-opacity":cur_shape.fill_opacity, opacity:cur_shape.opacity / 2, style:"pointer-events:inherit"}, 100)
    }
    svgedit.utilities.assignAttributes(shape, data.attr, 100);
    svgedit.utilities.cleanupElement(shape);
    if(data.children) {
      data.children.forEach(function(child) {
        shape.appendChild(addSvgElementFromJson(child))
      })
    }
    return shape
  };
  var getTransformList = canvas.getTransformList = svgedit.transformlist.getTransformList;
  var transformPoint = svgedit.math.transformPoint;
  var matrixMultiply = canvas.matrixMultiply = svgedit.math.matrixMultiply;
  var hasMatrixTransform = canvas.hasMatrixTransform = svgedit.math.hasMatrixTransform;
  var transformListToTransform = canvas.transformListToTransform = svgedit.math.transformListToTransform;
  var snapToAngle = svgedit.math.snapToAngle;
  var getMatrix = svgedit.math.getMatrix;
  svgedit.units.init({getBaseUnit:function() {
    return curConfig.baseUnit
  }, getElement:svgedit.utilities.getElem, getHeight:function() {
    return svgcontent.getAttribute("height") / current_zoom
  }, getWidth:function() {
    return svgcontent.getAttribute("width") / current_zoom
  }, getRoundDigits:function() {
    return save_options.round_digits
  }});
  var convertToNum = canvas.convertToNum = svgedit.units.convertToNum;
  svgedit.utilities.init({getDOMDocument:function() {
    return svgdoc
  }, getDOMContainer:function() {
    return container
  }, getSVGRoot:function() {
    return svgroot
  }, getSelectedElements:function() {
    return selectedElements
  }, getSVGContent:function() {
    return svgcontent
  }, getBaseUnit:function() {
    return curConfig.baseUnit
  }, getSnappingStep:function() {
    return curConfig.snappingStep
  }});
  var findDefs = canvas.findDefs = svgedit.utilities.findDefs;
  var getUrlFromAttr = canvas.getUrlFromAttr = svgedit.utilities.getUrlFromAttr;
  var getHref = canvas.getHref = svgedit.utilities.getHref;
  var setHref = canvas.setHref = svgedit.utilities.setHref;
  var getPathBBox = svgedit.utilities.getPathBBox;
  var getBBox = canvas.getBBox = svgedit.utilities.getBBox;
  var getRotationAngle = canvas.getRotationAngle = svgedit.utilities.getRotationAngle;
  var getElem = canvas.getElem = svgedit.utilities.getElem;
  var getRefElem = canvas.getRefElem = svgedit.utilities.getRefElem;
  var assignAttributes = canvas.assignAttributes = svgedit.utilities.assignAttributes;
  var cleanupElement = this.cleanupElement = svgedit.utilities.cleanupElement;
  svgedit.coords.init({getDrawing:function() {
    return getCurrentDrawing()
  }, getGridSnapping:function() {
    return curConfig.gridSnapping
  }});
  var remapElement = this.remapElement = svgedit.coords.remapElement;
  svgedit.recalculate.init({getSVGRoot:function() {
    return svgroot
  }, getStartTransform:function() {
    return startTransform
  }, setStartTransform:function(transform) {
    startTransform = transform
  }});
  var recalculateDimensions = this.recalculateDimensions = svgedit.recalculate.recalculateDimensions;
  var nsMap = svgedit.getReverseNS();
  var sanitizeSvg = canvas.sanitizeSvg = svgedit.sanitize.sanitizeSvg;
  var MoveElementCommand = svgedit.history.MoveElementCommand;
  var InsertElementCommand = svgedit.history.InsertElementCommand;
  var RemoveElementCommand = svgedit.history.RemoveElementCommand;
  var ChangeElementCommand = svgedit.history.ChangeElementCommand;
  var BatchCommand = svgedit.history.BatchCommand;
  var call;
  canvas.undoMgr = new svgedit.history.UndoManager({handleHistoryEvent:function(eventType, cmd) {
    var EventTypes = svgedit.history.HistoryEventTypes;
    if(eventType == EventTypes.BEFORE_UNAPPLY || eventType == EventTypes.BEFORE_APPLY) {
      canvas.clearSelection()
    }else {
      if(eventType == EventTypes.AFTER_APPLY || eventType == EventTypes.AFTER_UNAPPLY) {
        var elems = cmd.elements();
        canvas.pathActions.clear();
        call("changed", elems);
        var cmdType = cmd.type();
        var isApply = eventType == EventTypes.AFTER_APPLY;
        if(cmdType == MoveElementCommand.type()) {
          var parent = isApply ? cmd.newParent : cmd.oldParent;
          if(parent == svgcontent) {
            canvas.identifyLayers()
          }
        }else {
          if(cmdType == InsertElementCommand.type() || cmdType == RemoveElementCommand.type()) {
            if(cmd.parent == svgcontent) {
              canvas.identifyLayers()
            }
            if(cmdType == InsertElementCommand.type()) {
              if(isApply) {
                restoreRefElems(cmd.elem)
              }
            }else {
              if(!isApply) {
                restoreRefElems(cmd.elem)
              }
            }
            if(cmd.elem.tagName === "use") {
              setUseData(cmd.elem)
            }
          }else {
            if(cmdType == ChangeElementCommand.type()) {
              if(cmd.elem.tagName == "title" && cmd.elem.parentNode.parentNode == svgcontent) {
                canvas.identifyLayers()
              }
              var values = isApply ? cmd.newValues : cmd.oldValues;
              if(values.stdDeviation) {
                canvas.setBlurOffsets(cmd.elem.parentNode, values.stdDeviation)
              }
            }
          }
        }
      }
    }
  }});
  var addCommandToHistory = function(cmd) {
    canvas.undoMgr.addCommandToHistory(cmd)
  };
  function historyRecordingService(hrService) {
    return hrService ? hrService : new svgedit.history.HistoryRecordingService(canvas.undoMgr)
  }
  svgedit.select.init(curConfig, {createSVGElement:function(jsonMap) {
    return canvas.addSvgElementFromJson(jsonMap)
  }, svgRoot:function() {
    return svgroot
  }, svgContent:function() {
    return svgcontent
  }, currentZoom:function() {
    return current_zoom
  }, getStrokedBBox:function(elems) {
    return canvas.getStrokedBBox([elems])
  }});
  var selectorManager = this.selectorManager = svgedit.select.getSelectorManager();
  svgedit.path.init({getCurrentZoom:function() {
    return current_zoom
  }, getSVGRoot:function() {
    return svgroot
  }});
  var uiStrings = {exportNoBlur:"Blurred elements will appear as un-blurred", exportNoforeignObject:"foreignObject elements will not appear", exportNoDashArray:"Strokes will appear filled", exportNoText:"Text may not appear as expected"};
  var visElems = "a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use";
  var ref_attrs = ["clip-path", "fill", "filter", "marker-end", "marker-mid", "marker-start", "mask", "stroke"];
  var elData = $.data;
  var opac_ani = document.createElementNS(NS.SVG, "animate");
  $(opac_ani).attr({attributeName:"opacity", begin:"indefinite", dur:1, fill:"freeze"}).appendTo(svgroot);
  var restoreRefElems = function(elem) {
    var o, i, l, attrs = $(elem).attr(ref_attrs);
    for(o in attrs) {
      var val = attrs[o];
      if(val && val.indexOf("url(") === 0) {
        var id = svgedit.utilities.getUrlFromAttr(val).substr(1);
        var ref = getElem(id);
        if(!ref) {
          svgedit.utilities.findDefs().appendChild(removedElements[id]);
          delete removedElements[id]
        }
      }
    }
    var childs = elem.getElementsByTagName("*");
    if(childs.length) {
      for(i = 0, l = childs.length;i < l;i++) {
        restoreRefElems(childs[i])
      }
    }
  };
  (function() {
  })();
  var encodableImages = {}, last_good_img_url = curConfig.imgPath + "logo.png", disabled_elems = [], save_options = {round_digits:5}, started = false, startTransform = null, current_mode = "select", current_resize_mode = "none", import_ids = {}, cur_text = all_properties.text, cur_properties = cur_shape, justSelected = null, rubberBox = null, curBBoxes = [], extensions = {}, lastClickPoint = null, removedElements = {};
  canvas.clipBoard = [];
  var runExtensions = this.runExtensions = function(action, vars, returnArray) {
    var result = returnArray ? [] : false;
    $.each(extensions, function(name, opts) {
      if(opts && action in opts) {
        if(returnArray) {
          result.push(opts[action](vars))
        }else {
          result = opts[action](vars)
        }
      }
    });
    return result
  };
  this.addExtension = function(name, ext_func) {
    var ext;
    if(!(name in extensions)) {
      if($.isFunction(ext_func)) {
        ext = ext_func($.extend(canvas.getPrivateMethods(), {svgroot:svgroot, svgcontent:svgcontent, nonce:getCurrentDrawing().getNonce(), selectorManager:selectorManager}))
      }else {
        ext = ext_func
      }
      extensions[name] = ext;
      call("extension_added", ext)
    }else {
      console.log('Cannot add extension "' + name + '", an extension by that name already exists.')
    }
  };
  var round = this.round = function(val) {
    return parseInt(val * current_zoom, 10) / current_zoom
  };
  var getIntersectionList = this.getIntersectionList = function(rect) {
    if(rubberBox == null) {
      return null
    }
    var parent = current_group || getCurrentDrawing().getCurrentLayer();
    var rubberBBox;
    if(!rect) {
      rubberBBox = rubberBox.getBBox();
      var o, bb = svgcontent.createSVGRect();
      for(o in rubberBBox) {
        bb[o] = rubberBBox[o] / current_zoom
      }
      rubberBBox = bb
    }else {
      rubberBBox = svgcontent.createSVGRect();
      rubberBBox.x = rect.x;
      rubberBBox.y = rect.y;
      rubberBBox.width = rect.width;
      rubberBBox.height = rect.height
    }
    var resultList = null;
    if(!svgedit.browser.isIE) {
      if(typeof svgroot.getIntersectionList == "function") {
        rubberBBox.x += parseInt(svgcontent.getAttribute("x"), 10);
        rubberBBox.y += parseInt(svgcontent.getAttribute("y"), 10);
        resultList = svgroot.getIntersectionList(rubberBBox, parent)
      }
    }
    if(resultList == null || typeof resultList.item != "function") {
      resultList = [];
      if(!curBBoxes.length) {
        curBBoxes = getVisibleElementsAndBBoxes(parent)
      }
      var i = curBBoxes.length;
      while(i--) {
        if(!rubberBBox.width) {
          continue
        }
        if(svgedit.math.rectsIntersect(rubberBBox, curBBoxes[i].bbox)) {
          resultList.push(curBBoxes[i].elem)
        }
      }
    }
    return resultList
  };
  var getStrokedBBox = this.getStrokedBBox = function(elems) {
    if(!elems) {
      elems = getVisibleElements()
    }
    return svgedit.utilities.getStrokedBBox(elems, addSvgElementFromJson, pathActions)
  };
  var getVisibleElements = this.getVisibleElements = function(parent) {
    if(!parent) {
      parent = $(svgcontent).children()
    }
    var contentElems = [];
    $(parent).children().each(function(i, elem) {
      if(elem.getBBox) {
        contentElems.push(elem)
      }
    });
    return contentElems.reverse()
  };
  var getVisibleElementsAndBBoxes = this.getVisibleElementsAndBBoxes = function(parent) {
    if(!parent) {
      parent = $(svgcontent).children()
    }
    var contentElems = [];
    $(parent).children().each(function(i, elem) {
      if(elem.getBBox) {
        contentElems.push({elem:elem, bbox:getStrokedBBox([elem])})
      }
    });
    return contentElems.reverse()
  };
  var groupSvgElem = this.groupSvgElem = function(elem) {
    var g = document.createElementNS(NS.SVG, "g");
    elem.parentNode.replaceChild(g, elem);
    $(g).append(elem).data("gsvg", elem)[0].id = getNextId()
  };
  var getId, getNextId;
  var textActions, pathActions;
  (function(c) {
    var events = {};
    getId = c.getId = function() {
      return getCurrentDrawing().getId()
    };
    getNextId = c.getNextId = function() {
      return getCurrentDrawing().getNextId()
    };
    call = c.call = function(event, arg) {
      if(events[event]) {
        return events[event](this, arg)
      }
    };
    c.bind = function(event, f) {
      var old = events[event];
      events[event] = f;
      return old
    }
  })(canvas);
  this.prepareSvg = function(newDoc) {
    this.sanitizeSvg(newDoc.documentElement);
    var i, path, len, paths = newDoc.getElementsByTagNameNS(NS.SVG, "path");
    for(i = 0, len = paths.length;i < len;++i) {
      path = paths[i];
      path.setAttribute("d", pathActions.convertPath(path));
      pathActions.fixEnd(path)
    }
  };
  var ffClone = function(elem) {
    if(!svgedit.browser.isGecko()) {
      return elem
    }
    var clone = elem.cloneNode(true);
    elem.parentNode.insertBefore(clone, elem);
    elem.parentNode.removeChild(elem);
    selectorManager.releaseSelector(elem);
    selectedElements[0] = clone;
    selectorManager.requestSelector(clone).showGrips(true);
    return clone
  };
  this.setRotationAngle = function(val, preventUndo) {
    val = parseFloat(val);
    var elem = selectedElements[0];
    var oldTransform = elem.getAttribute("transform");
    var bbox = svgedit.utilities.getBBox(elem);
    var cx = bbox.x + bbox.width / 2, cy = bbox.y + bbox.height / 2;
    var tlist = svgedit.transformlist.getTransformList(elem);
    if(tlist.numberOfItems > 0) {
      var xform = tlist.getItem(0);
      if(xform.type == 4) {
        tlist.removeItem(0)
      }
    }
    if(val != 0) {
      var center = svgedit.math.transformPoint(cx, cy, svgedit.math.transformListToTransform(tlist).matrix);
      var R_nc = svgroot.createSVGTransform();
      R_nc.setRotate(val, center.x, center.y);
      if(tlist.numberOfItems) {
        tlist.insertItemBefore(R_nc, 0)
      }else {
        tlist.appendItem(R_nc)
      }
    }else {
      if(tlist.numberOfItems == 0) {
        elem.removeAttribute("transform")
      }
    }
    if(!preventUndo) {
      var newTransform = elem.getAttribute("transform");
      elem.setAttribute("transform", oldTransform);
      changeSelectedAttribute("transform", newTransform, selectedElements);
      call("changed", selectedElements)
    }
    var pointGripContainer = svgedit.utilities.getElem("pathpointgrip_container");
    var selector = selectorManager.requestSelector(selectedElements[0]);
    selector.resize();
    selector.updateGripCursors(val)
  };
  var recalculateAllSelectedDimensions = this.recalculateAllSelectedDimensions = function() {
    var text = current_resize_mode == "none" ? "position" : "size";
    var batchCmd = new svgedit.history.BatchCommand(text);
    var i = selectedElements.length;
    while(i--) {
      var elem = selectedElements[i];
      var cmd = svgedit.recalculate.recalculateDimensions(elem);
      if(cmd) {
        batchCmd.addSubCommand(cmd)
      }
    }
    if(!batchCmd.isEmpty()) {
      addCommandToHistory(batchCmd);
      call("changed", selectedElements)
    }
  };
  var logMatrix = function(m) {
    console.log([m.a, m.b, m.c, m.d, m.e, m.f])
  };
  var root_sctm = null;
  var clearSelection = this.clearSelection = function(noCall) {
    if(selectedElements[0] != null) {
      var i, elem, len = selectedElements.length;
      for(i = 0;i < len;++i) {
        elem = selectedElements[i];
        if(elem == null) {
          break
        }
        selectorManager.releaseSelector(elem);
        selectedElements[i] = null
      }
    }
    if(!noCall) {
      call("selected", selectedElements)
    }
  };
  var addToSelection = this.addToSelection = function(elemsToAdd, showGrips) {
    if(elemsToAdd.length == 0) {
      return
    }
    var j = 0;
    while(j < selectedElements.length) {
      if(selectedElements[j] == null) {
        break
      }
      ++j
    }
    var i = elemsToAdd.length;
    while(i--) {
      var elem = elemsToAdd[i];
      if(!elem) {
        continue
      }
      var bbox = svgedit.utilities.getBBox(elem);
      if(!bbox) {
        continue
      }
      if(elem.tagName === "a" && elem.childNodes.length === 1) {
        elem = elem.firstChild
      }
      if(selectedElements.indexOf(elem) == -1) {
        selectedElements[j] = elem;
        j++;
        var sel = selectorManager.requestSelector(elem, bbox);
        if(selectedElements.length > 1) {
          sel.showGrips(false)
        }
      }
    }
    call("selected", selectedElements);
    if(showGrips || selectedElements.length == 1) {
      selectorManager.requestSelector(selectedElements[0]).showGrips(true)
    }else {
      selectorManager.requestSelector(selectedElements[0]).showGrips(false)
    }
    selectedElements.sort(function(a, b) {
      if(a && b && a.compareDocumentPosition) {
        return 3 - (b.compareDocumentPosition(a) & 6)
      }
      if(a == null) {
        return 1
      }
    });
    while(selectedElements[0] == null) {
      selectedElements.shift(0)
    }
  };
  var selectOnly = this.selectOnly = function(elems, showGrips) {
    clearSelection(true);
    addToSelection(elems, showGrips)
  };
  var removeFromSelection = this.removeFromSelection = function(elemsToRemove) {
    if(selectedElements[0] == null) {
      return
    }
    if(elemsToRemove.length == 0) {
      return
    }
    var i, j = 0, newSelectedItems = [], len = selectedElements.length;
    newSelectedItems.length = len;
    for(i = 0;i < len;++i) {
      var elem = selectedElements[i];
      if(elem) {
        if(elemsToRemove.indexOf(elem) == -1) {
          newSelectedItems[j] = elem;
          j++
        }else {
          selectorManager.releaseSelector(elem)
        }
      }
    }
    selectedElements = newSelectedItems
  };
  this.selectAllInCurrentLayer = function() {
    var current_layer = getCurrentDrawing().getCurrentLayer();
    if(current_layer) {
      current_mode = "select";
      selectOnly($(current_group || current_layer).children())
    }
  };
  var getMouseTarget = this.getMouseTarget = function(evt) {
    if(evt == null) {
      return null
    }
    var mouse_target = evt.target;
    if(mouse_target.correspondingUseElement) {
      mouse_target = mouse_target.correspondingUseElement
    }
    if([NS.MATH, NS.HTML].indexOf(mouse_target.namespaceURI) >= 0 && mouse_target.id != "svgcanvas") {
      while(mouse_target.nodeName != "foreignObject") {
        mouse_target = mouse_target.parentNode;
        if(!mouse_target) {
          return svgroot
        }
      }
    }
    var current_layer = getCurrentDrawing().getCurrentLayer();
    if([svgroot, container, svgcontent, current_layer].indexOf(mouse_target) >= 0) {
      return svgroot
    }
    var $target = $(mouse_target);
    if($target.closest("#selectorParentGroup").length) {
      return selectorManager.selectorParentGroup
    }
    while(mouse_target.parentNode !== (current_group || current_layer)) {
      mouse_target = mouse_target.parentNode
    }
    return mouse_target
  };
  (function() {
    var d_attr = null, start_x = null, start_y = null, r_start_x = null, r_start_y = null, init_bbox = {}, freehand = {minx:null, miny:null, maxx:null, maxy:null}, sumDistance = 0, controllPoint2 = {x:0, y:0}, controllPoint1 = {x:0, y:0}, start = {x:0, y:0}, end = {x:0, y:0}, parameter, nextParameter, bSpline = {x:0, y:0}, nextPos = {x:0, y:0}, THRESHOLD_DIST = 0.8, STEP_COUNT = 10;
    var getBsplinePoint = function(t) {
      var spline = {x:0, y:0}, p0 = controllPoint2, p1 = controllPoint1, p2 = start, p3 = end, S = 1 / 6, t2 = t * t, t3 = t2 * t;
      var m = [[-1, 3, -3, 1], [3, -6, 3, 0], [-3, 0, 3, 0], [1, 4, 1, 0]];
      spline.x = S * ((p0.x * m[0][0] + p1.x * m[0][1] + p2.x * m[0][2] + p3.x * m[0][3]) * t3 + (p0.x * m[1][0] + p1.x * m[1][1] + p2.x * m[1][2] + p3.x * m[1][3]) * t2 + (p0.x * m[2][0] + p1.x * m[2][1] + p2.x * m[2][2] + p3.x * m[2][3]) * t + (p0.x * m[3][0] + p1.x * m[3][1] + p2.x * m[3][2] + p3.x * m[3][3]));
      spline.y = S * ((p0.y * m[0][0] + p1.y * m[0][1] + p2.y * m[0][2] + p3.y * m[0][3]) * t3 + (p0.y * m[1][0] + p1.y * m[1][1] + p2.y * m[1][2] + p3.y * m[1][3]) * t2 + (p0.y * m[2][0] + p1.y * m[2][1] + p2.y * m[2][2] + p3.y * m[2][3]) * t + (p0.y * m[3][0] + p1.y * m[3][1] + p2.y * m[3][2] + p3.y * m[3][3]));
      return{x:spline.x, y:spline.y}
    };
    var mouseDown = function(evt) {
      if(canvas.spaceKey || evt.button === 1) {
        return
      }
      var right_click = evt.button === 2;
      if(evt.altKey) {
        svgCanvas.cloneSelectedElements(0, 0)
      }
      root_sctm = $("#svgcontent g")[0].getScreenCTM().inverse();
      var pt = svgedit.math.transformPoint(evt.pageX, evt.pageY, root_sctm), mouse_x = pt.x * current_zoom, mouse_y = pt.y * current_zoom;
      evt.preventDefault();
      if(right_click) {
        current_mode = "select";
        lastClickPoint = pt
      }
      var x = mouse_x / current_zoom, y = mouse_y / current_zoom, mouse_target = getMouseTarget(evt);
      if(mouse_target.tagName === "a" && mouse_target.childNodes.length === 1) {
        mouse_target = mouse_target.firstChild
      }
      var real_x = x;
      r_start_x = start_x = x;
      var real_y = y;
      r_start_y = start_y = y;
      if(curConfig.gridSnapping) {
        x = svgedit.utilities.snapToGrid(x);
        y = svgedit.utilities.snapToGrid(y);
        start_x = svgedit.utilities.snapToGrid(start_x);
        start_y = svgedit.utilities.snapToGrid(start_y)
      }
      if(mouse_target == selectorManager.selectorParentGroup && selectedElements[0] != null) {
        var grip = evt.target;
        var griptype = elData(grip, "type");
        if(griptype == "rotate") {
          current_mode = "rotate"
        }else {
          if(griptype == "resize") {
            current_mode = "resize";
            current_resize_mode = elData(grip, "dir")
          }
        }
        mouse_target = selectedElements[0]
      }
      startTransform = mouse_target.getAttribute("transform");
      var i, stroke_w, tlist = svgedit.transformlist.getTransformList(mouse_target);
      switch(current_mode) {
        case "select":
          started = true;
          current_resize_mode = "none";
          if(right_click) {
            started = false
          }
          if(mouse_target != svgroot) {
            if(selectedElements.indexOf(mouse_target) == -1) {
              if(!evt.shiftKey) {
                clearSelection(true)
              }
              addToSelection([mouse_target]);
              justSelected = mouse_target;
              pathActions.clear()
            }
            if(!right_click) {
              for(i = 0;i < selectedElements.length;++i) {
                if(selectedElements[i] == null) {
                  continue
                }
                var slist = svgedit.transformlist.getTransformList(selectedElements[i]);
                if(slist.numberOfItems) {
                  slist.insertItemBefore(svgroot.createSVGTransform(), 0)
                }else {
                  slist.appendItem(svgroot.createSVGTransform())
                }
              }
            }
          }else {
            if(!right_click) {
              clearSelection();
              current_mode = "multiselect";
              if(rubberBox == null) {
                rubberBox = selectorManager.getRubberBandBox()
              }
              r_start_x *= current_zoom;
              r_start_y *= current_zoom;
              svgedit.utilities.assignAttributes(rubberBox, {x:r_start_x, y:r_start_y, width:0, height:0, display:"inline"}, 100)
            }
          }
          break;
        case "zoom":
          started = true;
          if(rubberBox == null) {
            rubberBox = selectorManager.getRubberBandBox()
          }
          svgedit.utilities.assignAttributes(rubberBox, {x:real_x * current_zoom, y:real_x * current_zoom, width:0, height:0, display:"inline"}, 100);
          break;
        case "resize":
          started = true;
          start_x = x;
          start_y = y;
          init_bbox = svgedit.utilities.getBBox($("#selectedBox0")[0]);
          var bb = {};
          $.each(init_bbox, function(key, val) {
            bb[key] = val / current_zoom
          });
          init_bbox = bb;
          var pos = svgedit.utilities.getRotationAngle(mouse_target) ? 1 : 0;
          if(svgedit.math.hasMatrixTransform(tlist)) {
            tlist.insertItemBefore(svgroot.createSVGTransform(), pos);
            tlist.insertItemBefore(svgroot.createSVGTransform(), pos);
            tlist.insertItemBefore(svgroot.createSVGTransform(), pos)
          }else {
            tlist.appendItem(svgroot.createSVGTransform());
            tlist.appendItem(svgroot.createSVGTransform());
            tlist.appendItem(svgroot.createSVGTransform());
            if(svgedit.browser.supportsNonScalingStroke()) {
              var isWebkit = svgedit.browser.isWebkit();
              if(isWebkit) {
                var delayedStroke = function(ele) {
                  var _stroke = ele.getAttributeNS(null, "stroke");
                  ele.removeAttributeNS(null, "stroke");
                  if(_stroke !== null) {
                    setTimeout(function() {
                      ele.setAttributeNS(null, "stroke", _stroke)
                    }, 0)
                  }
                }
              }
              mouse_target.style.vectorEffect = "non-scaling-stroke";
              if(isWebkit) {
                delayedStroke(mouse_target)
              }
              var all = mouse_target.getElementsByTagName("*"), len = all.length;
              for(i = 0;i < len;i++) {
                all[i].style.vectorEffect = "non-scaling-stroke";
                if(isWebkit) {
                  delayedStroke(all[i])
                }
              }
            }
          }
          break;
        case "fhellipse":
        ;
        case "fhrect":
        ;
        case "fhpath":
          start.x = real_x;
          start.y = real_y;
          started = true;
          d_attr = real_x + "," + real_y + " ";
          stroke_w = cur_shape.stroke_width == 0 ? 1 : cur_shape.stroke_width;
          addSvgElementFromJson({element:"polyline", curStyles:true, attr:{points:d_attr, id:getNextId(), fill:"none", opacity:cur_shape.opacity / 2, "stroke-linecap":"round", style:"pointer-events:none"}});
          freehand.minx = real_x;
          freehand.maxx = real_x;
          freehand.miny = real_y;
          freehand.maxy = real_y;
          break;
        case "image":
          started = true;
          var newImage = addSvgElementFromJson({element:"image", attr:{x:x, y:y, width:0, height:0, id:getNextId(), opacity:cur_shape.opacity / 2, style:"pointer-events:inherit"}});
          setHref(newImage, last_good_img_url);
          svgedit.utilities.preventClickDefault(newImage);
          break;
        case "square":
        ;
        case "rect":
          started = true;
          start_x = x;
          start_y = y;
          addSvgElementFromJson({element:"rect", curStyles:true, attr:{x:x, y:y, width:0, height:0, id:getNextId(), opacity:cur_shape.opacity / 2}});
          break;
        case "line":
          started = true;
          stroke_w = cur_shape.stroke_width == 0 ? 1 : cur_shape.stroke_width;
          addSvgElementFromJson({element:"line", curStyles:true, attr:{x1:x, y1:y, x2:x, y2:y, id:getNextId(), stroke:cur_shape.stroke, "stroke-width":stroke_w, "stroke-dasharray":cur_shape.stroke_dasharray, "stroke-linejoin":cur_shape.stroke_linejoin, "stroke-linecap":cur_shape.stroke_linecap, "stroke-opacity":cur_shape.stroke_opacity, fill:"none", opacity:cur_shape.opacity / 2, style:"pointer-events:none"}});
          break;
        case "circle":
          started = true;
          addSvgElementFromJson({element:"circle", curStyles:true, attr:{cx:x, cy:y, r:0, id:getNextId(), opacity:cur_shape.opacity / 2}});
          break;
        case "ellipse":
          started = true;
          addSvgElementFromJson({element:"ellipse", curStyles:true, attr:{cx:x, cy:y, rx:0, ry:0, id:getNextId(), opacity:cur_shape.opacity / 2}});
          break;
        case "text":
          started = true;
          var newText = addSvgElementFromJson({element:"text", curStyles:true, attr:{x:x, y:y, id:getNextId(), fill:cur_text.fill, "stroke-width":cur_text.stroke_width, "font-size":cur_text.font_size, "font-family":cur_text.font_family, "text-anchor":"middle", "xml:space":"preserve", opacity:cur_shape.opacity}});
          break;
        case "path":
        ;
        case "pathedit":
          start_x *= current_zoom;
          start_y *= current_zoom;
          pathActions.mouseDown(evt, mouse_target, start_x, start_y);
          started = true;
          break;
        case "textedit":
          start_x *= current_zoom;
          start_y *= current_zoom;
          textActions.mouseDown(evt, mouse_target, start_x, start_y);
          started = true;
          break;
        case "rotate":
          started = true;
          canvas.undoMgr.beginUndoableChange("transform", selectedElements);
          break;
        default:
          break
      }
      var ext_result = runExtensions("mouseDown", {event:evt, start_x:start_x, start_y:start_y, selectedElements:selectedElements}, true);
      $.each(ext_result, function(i, r) {
        if(r && r.started) {
          started = true
        }
      })
    };
    var mouseMove = function(evt) {
      if(!started) {
        return
      }
      if(evt.button === 1 || canvas.spaceKey) {
        return
      }
      var i, xya, c, cx, cy, dx, dy, len, angle, box, selected = selectedElements[0], pt = svgedit.math.transformPoint(evt.pageX, evt.pageY, root_sctm), mouse_x = pt.x * current_zoom, mouse_y = pt.y * current_zoom, shape = svgedit.utilities.getElem(getId());
      var real_x = mouse_x / current_zoom;
      x = real_x;
      var real_y = mouse_y / current_zoom;
      y = real_y;
      if(curConfig.gridSnapping) {
        x = svgedit.utilities.snapToGrid(x);
        y = svgedit.utilities.snapToGrid(y)
      }
      evt.preventDefault();
      var tlist;
      switch(current_mode) {
        case "select":
          if(selectedElements[0] !== null) {
            dx = x - start_x;
            dy = y - start_y;
            if(curConfig.gridSnapping) {
              dx = svgedit.utilities.snapToGrid(dx);
              dy = svgedit.utilities.snapToGrid(dy)
            }
            if(evt.shiftKey) {
              xya = svgedit.math.snapToAngle(start_x, start_y, x, y);
              x = xya.x;
              y = xya.y
            }
            if(dx != 0 || dy != 0) {
              len = selectedElements.length;
              for(i = 0;i < len;++i) {
                selected = selectedElements[i];
                if(selected == null) {
                  break
                }
                var xform = svgroot.createSVGTransform();
                tlist = svgedit.transformlist.getTransformList(selected);
                xform.setTranslate(dx, dy);
                if(tlist.numberOfItems) {
                  tlist.replaceItem(xform, 0)
                }else {
                  tlist.appendItem(xform)
                }
                selectorManager.requestSelector(selected).resize()
              }
              call("transition", selectedElements)
            }
          }
          break;
        case "multiselect":
          real_x *= current_zoom;
          real_y *= current_zoom;
          svgedit.utilities.assignAttributes(rubberBox, {x:Math.min(r_start_x, real_x), y:Math.min(r_start_y, real_y), width:Math.abs(real_x - r_start_x), height:Math.abs(real_y - r_start_y)}, 100);
          var elemsToRemove = selectedElements.slice(), elemsToAdd = [], newList = getIntersectionList();
          len = newList.length;
          for(i = 0;i < len;++i) {
            var intElem = newList[i];
            if(selectedElements.indexOf(intElem) == -1) {
              elemsToAdd.push(intElem)
            }
            var foundInd = elemsToRemove.indexOf(intElem);
            if(foundInd != -1) {
              elemsToRemove.splice(foundInd, 1)
            }
          }
          if(elemsToRemove.length > 0) {
            canvas.removeFromSelection(elemsToRemove)
          }
          if(elemsToAdd.length > 0) {
            canvas.addToSelection(elemsToAdd)
          }
          break;
        case "resize":
          tlist = svgedit.transformlist.getTransformList(selected);
          var hasMatrix = svgedit.math.hasMatrixTransform(tlist);
          box = hasMatrix ? init_bbox : svgedit.utilities.getBBox(selected);
          var left = box.x, top = box.y, width = box.width, height = box.height;
          dx = x - start_x;
          dy = y - start_y;
          if(curConfig.gridSnapping) {
            dx = svgedit.utilities.snapToGrid(dx);
            dy = svgedit.utilities.snapToGrid(dy);
            height = svgedit.utilities.snapToGrid(height);
            width = svgedit.utilities.snapToGrid(width)
          }
          angle = svgedit.utilities.getRotationAngle(selected);
          if(angle) {
            var r = Math.sqrt(dx * dx + dy * dy), theta = Math.atan2(dy, dx) - angle * Math.PI / 180;
            dx = r * Math.cos(theta);
            dy = r * Math.sin(theta)
          }
          if(current_resize_mode.indexOf("n") == -1 && current_resize_mode.indexOf("s") == -1) {
            dy = 0
          }
          if(current_resize_mode.indexOf("e") == -1 && current_resize_mode.indexOf("w") == -1) {
            dx = 0
          }
          var ts = null, tx = 0, ty = 0, sy = height ? (height + dy) / height : 1, sx = width ? (width + dx) / width : 1;
          if(current_resize_mode.indexOf("n") >= 0) {
            sy = height ? (height - dy) / height : 1;
            ty = height
          }
          if(current_resize_mode.indexOf("w") >= 0) {
            sx = width ? (width - dx) / width : 1;
            tx = width
          }
          var translateOrigin = svgroot.createSVGTransform(), scale = svgroot.createSVGTransform(), translateBack = svgroot.createSVGTransform();
          if(curConfig.gridSnapping) {
            left = svgedit.utilities.snapToGrid(left);
            tx = svgedit.utilities.snapToGrid(tx);
            top = svgedit.utilities.snapToGrid(top);
            ty = svgedit.utilities.snapToGrid(ty)
          }
          translateOrigin.setTranslate(-(left + tx), -(top + ty));
          if(evt.shiftKey) {
            if(sx == 1) {
              sx = sy
            }else {
              sy = sx
            }
          }
          scale.setScale(sx, sy);
          translateBack.setTranslate(left + tx, top + ty);
          if(hasMatrix) {
            var diff = angle ? 1 : 0;
            tlist.replaceItem(translateOrigin, 2 + diff);
            tlist.replaceItem(scale, 1 + diff);
            tlist.replaceItem(translateBack, Number(diff))
          }else {
            var N = tlist.numberOfItems;
            tlist.replaceItem(translateBack, N - 3);
            tlist.replaceItem(scale, N - 2);
            tlist.replaceItem(translateOrigin, N - 1)
          }
          selectorManager.requestSelector(selected).resize();
          call("transition", selectedElements);
          break;
        case "zoom":
          real_x *= current_zoom;
          real_y *= current_zoom;
          svgedit.utilities.assignAttributes(rubberBox, {x:Math.min(r_start_x * current_zoom, real_x), y:Math.min(r_start_y * current_zoom, real_y), width:Math.abs(real_x - r_start_x * current_zoom), height:Math.abs(real_y - r_start_y * current_zoom)}, 100);
          break;
        case "text":
          svgedit.utilities.assignAttributes(shape, {x:x, y:y}, 1E3);
          break;
        case "line":
          if(curConfig.gridSnapping) {
            x = svgedit.utilities.snapToGrid(x);
            y = svgedit.utilities.snapToGrid(y)
          }
          var x2 = x;
          var y2 = y;
          if(evt.shiftKey) {
            xya = svgedit.math.snapToAngle(start_x, start_y, x2, y2);
            x2 = xya.x;
            y2 = xya.y
          }
          shape.setAttributeNS(null, "x2", x2);
          shape.setAttributeNS(null, "y2", y2);
          break;
        case "foreignObject":
        ;
        case "square":
        ;
        case "rect":
        ;
        case "image":
          var square = current_mode == "square" || evt.shiftKey, w = Math.abs(x - start_x), h = Math.abs(y - start_y), new_x, new_y;
          if(square) {
            w = h = Math.max(w, h);
            new_x = start_x < x ? start_x : start_x - w;
            new_y = start_y < y ? start_y : start_y - h
          }else {
            new_x = Math.min(start_x, x);
            new_y = Math.min(start_y, y)
          }
          if(curConfig.gridSnapping) {
            w = svgedit.utilities.snapToGrid(w);
            h = svgedit.utilities.snapToGrid(h);
            new_x = svgedit.utilities.snapToGrid(new_x);
            new_y = svgedit.utilities.snapToGrid(new_y)
          }
          svgedit.utilities.assignAttributes(shape, {width:w, height:h, x:new_x, y:new_y}, 1E3);
          break;
        case "circle":
          c = $(shape).attr(["cx", "cy"]);
          cx = c.cx;
          cy = c.cy;
          var rad = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
          if(curConfig.gridSnapping) {
            rad = svgedit.utilities.snapToGrid(rad)
          }
          shape.setAttributeNS(null, "r", rad);
          break;
        case "ellipse":
          c = $(shape).attr(["cx", "cy"]);
          cx = c.cx;
          cy = c.cy;
          if(curConfig.gridSnapping) {
            x = svgedit.utilities.snapToGrid(x);
            cx = svgedit.utilities.snapToGrid(cx);
            y = svgedit.utilities.snapToGrid(y);
            cy = svgedit.utilities.snapToGrid(cy)
          }
          shape.setAttributeNS(null, "rx", Math.abs(x - cx));
          var ry = Math.abs(evt.shiftKey ? x - cx : y - cy);
          shape.setAttributeNS(null, "ry", ry);
          break;
        case "fhellipse":
        ;
        case "fhrect":
          freehand.minx = Math.min(real_x, freehand.minx);
          freehand.maxx = Math.max(real_x, freehand.maxx);
          freehand.miny = Math.min(real_y, freehand.miny);
          freehand.maxy = Math.max(real_y, freehand.maxy);
        case "fhpath":
          end.x = real_x;
          end.y = real_y;
          if(controllPoint2.x && controllPoint2.y) {
            for(i = 0;i < STEP_COUNT - 1;i++) {
              parameter = i / STEP_COUNT;
              nextParameter = (i + 1) / STEP_COUNT;
              bSpline = getBsplinePoint(nextParameter);
              nextPos = bSpline;
              bSpline = getBsplinePoint(parameter);
              sumDistance += Math.sqrt((nextPos.x - bSpline.x) * (nextPos.x - bSpline.x) + (nextPos.y - bSpline.y) * (nextPos.y - bSpline.y));
              if(sumDistance > THRESHOLD_DIST) {
                d_attr += +bSpline.x + "," + bSpline.y + " ";
                shape.setAttributeNS(null, "points", d_attr);
                sumDistance -= THRESHOLD_DIST
              }
            }
          }
          controllPoint2 = {x:controllPoint1.x, y:controllPoint1.y};
          controllPoint1 = {x:start.x, y:start.y};
          start = {x:end.x, y:end.y};
          break;
        case "path":
        ;
        case "pathedit":
          x *= current_zoom;
          y *= current_zoom;
          if(curConfig.gridSnapping) {
            x = svgedit.utilities.snapToGrid(x);
            y = svgedit.utilities.snapToGrid(y);
            start_x = svgedit.utilities.snapToGrid(start_x);
            start_y = svgedit.utilities.snapToGrid(start_y)
          }
          if(evt.shiftKey) {
            var path = svgedit.path.path;
            var x1, y1;
            if(path) {
              x1 = path.dragging ? path.dragging[0] : start_x;
              y1 = path.dragging ? path.dragging[1] : start_y
            }else {
              x1 = start_x;
              y1 = start_y
            }
            xya = svgedit.math.snapToAngle(x1, y1, x, y);
            x = xya.x;
            y = xya.y
          }
          if(rubberBox && rubberBox.getAttribute("display") !== "none") {
            real_x *= current_zoom;
            real_y *= current_zoom;
            svgedit.utilities.assignAttributes(rubberBox, {x:Math.min(r_start_x * current_zoom, real_x), y:Math.min(r_start_y * current_zoom, real_y), width:Math.abs(real_x - r_start_x * current_zoom), height:Math.abs(real_y - r_start_y * current_zoom)}, 100)
          }
          pathActions.mouseMove(x, y);
          break;
        case "textedit":
          x *= current_zoom;
          y *= current_zoom;
          textActions.mouseMove(mouse_x, mouse_y);
          break;
        case "rotate":
          box = svgedit.utilities.getBBox(selected);
          cx = box.x + box.width / 2;
          cy = box.y + box.height / 2;
          var m = svgedit.math.getMatrix(selected), center = svgedit.math.transformPoint(cx, cy, m);
          cx = center.x;
          cy = center.y;
          angle = (Math.atan2(cy - y, cx - x) * (180 / Math.PI) - 90) % 360;
          if(curConfig.gridSnapping) {
            angle = svgedit.utilities.snapToGrid(angle)
          }
          if(evt.shiftKey) {
            var snap = 45;
            angle = Math.round(angle / snap) * snap
          }
          canvas.setRotationAngle(angle < -180 ? 360 + angle : angle, true);
          call("transition", selectedElements);
          break;
        default:
          break
      }
      runExtensions("mouseMove", {event:evt, mouse_x:mouse_x, mouse_y:mouse_y, selected:selected})
    };
    var mouseUp = function(evt) {
      if(evt.button === 2) {
        return
      }
      var tempJustSelected = justSelected;
      justSelected = null;
      if(!started) {
        return
      }
      var pt = svgedit.math.transformPoint(evt.pageX, evt.pageY, root_sctm), mouse_x = pt.x * current_zoom, mouse_y = pt.y * current_zoom, x = mouse_x / current_zoom, y = mouse_y / current_zoom, element = svgedit.utilities.getElem(getId()), keep = false;
      var real_x = x;
      var real_y = y;
      var useUnit = false;
      started = false;
      var attrs, t;
      switch(current_mode) {
        case "resize":
        ;
        case "multiselect":
          if(rubberBox != null) {
            rubberBox.setAttribute("display", "none");
            curBBoxes = []
          }
          current_mode = "select";
        case "select":
          if(selectedElements[0] != null) {
            if(selectedElements[1] == null) {
              var selected = selectedElements[0];
              switch(selected.tagName) {
                case "g":
                ;
                case "use":
                ;
                case "image":
                ;
                case "foreignObject":
                  break;
                default:
                  cur_properties.fill = selected.getAttribute("fill");
                  cur_properties.fill_opacity = selected.getAttribute("fill-opacity");
                  cur_properties.stroke = selected.getAttribute("stroke");
                  cur_properties.stroke_opacity = selected.getAttribute("stroke-opacity");
                  cur_properties.stroke_width = selected.getAttribute("stroke-width");
                  cur_properties.stroke_dasharray = selected.getAttribute("stroke-dasharray");
                  cur_properties.stroke_linejoin = selected.getAttribute("stroke-linejoin");
                  cur_properties.stroke_linecap = selected.getAttribute("stroke-linecap")
              }
              if(selected.tagName == "text") {
                cur_text.font_size = selected.getAttribute("font-size");
                cur_text.font_family = selected.getAttribute("font-family")
              }
              selectorManager.requestSelector(selected).showGrips(true)
            }
            recalculateAllSelectedDimensions();
            if(real_x != r_start_x || real_y != r_start_y) {
              var i, len = selectedElements.length;
              for(i = 0;i < len;++i) {
                if(selectedElements[i] == null) {
                  break
                }
                if(!selectedElements[i].firstChild) {
                  selectorManager.requestSelector(selectedElements[i]).resize()
                }
              }
            }else {
              t = evt.target;
              if(selectedElements[0].nodeName === "path" && selectedElements[1] == null) {
                pathActions.select(selectedElements[0])
              }else {
                if(evt.shiftKey) {
                  if(tempJustSelected != t) {
                    canvas.removeFromSelection([t])
                  }
                }
              }
            }
            if(svgedit.browser.supportsNonScalingStroke()) {
              var elem = selectedElements[0];
              if(elem) {
                elem.removeAttribute("style");
                svgedit.utilities.walkTree(elem, function(elem) {
                  elem.removeAttribute("style")
                })
              }
            }
          }
          return;
        case "zoom":
          if(rubberBox != null) {
            rubberBox.setAttribute("display", "none")
          }
          var factor = evt.shiftKey ? 0.5 : 2;
          call("zoomed", {x:Math.min(r_start_x, real_x), y:Math.min(r_start_y, real_y), width:Math.abs(real_x - r_start_x), height:Math.abs(real_y - r_start_y), factor:factor});
          return;
        case "fhpath":
          sumDistance = 0;
          controllPoint2 = {x:0, y:0};
          controllPoint1 = {x:0, y:0};
          start = {x:0, y:0};
          end = {x:0, y:0};
          var coords = element.getAttribute("points");
          var commaIndex = coords.indexOf(",");
          if(commaIndex >= 0) {
            keep = coords.indexOf(",", commaIndex + 1) >= 0
          }else {
            keep = coords.indexOf(" ", coords.indexOf(" ") + 1) >= 0
          }
          if(keep) {
            element = pathActions.smoothPolylineIntoPath(element)
          }
          break;
        case "line":
          attrs = $(element).attr(["x1", "x2", "y1", "y2"]);
          keep = attrs.x1 != attrs.x2 || attrs.y1 != attrs.y2;
          break;
        case "foreignObject":
        ;
        case "square":
        ;
        case "rect":
        ;
        case "image":
          attrs = $(element).attr(["width", "height"]);
          keep = attrs.width != 0 || attrs.height != 0 || current_mode === "image";
          break;
        case "circle":
          keep = element.getAttribute("r") != 0;
          break;
        case "ellipse":
          attrs = $(element).attr(["rx", "ry"]);
          keep = attrs.rx != null || attrs.ry != null;
          break;
        case "fhellipse":
          if(freehand.maxx - freehand.minx > 0 && freehand.maxy - freehand.miny > 0) {
            element = addSvgElementFromJson({element:"ellipse", curStyles:true, attr:{cx:(freehand.minx + freehand.maxx) / 2, cy:(freehand.miny + freehand.maxy) / 2, rx:(freehand.maxx - freehand.minx) / 2, ry:(freehand.maxy - freehand.miny) / 2, id:getId()}});
            call("changed", [element]);
            keep = true
          }
          break;
        case "fhrect":
          if(freehand.maxx - freehand.minx > 0 && freehand.maxy - freehand.miny > 0) {
            element = addSvgElementFromJson({element:"rect", curStyles:true, attr:{x:freehand.minx, y:freehand.miny, width:freehand.maxx - freehand.minx, height:freehand.maxy - freehand.miny, id:getId()}});
            call("changed", [element]);
            keep = true
          }
          break;
        case "text":
          keep = true;
          selectOnly([element]);
          textActions.start(element);
          break;
        case "path":
          element = null;
          started = true;
          var res = pathActions.mouseUp(evt, element, mouse_x, mouse_y);
          element = res.element;
          keep = res.keep;
          break;
        case "pathedit":
          keep = true;
          element = null;
          pathActions.mouseUp(evt);
          break;
        case "textedit":
          keep = false;
          element = null;
          textActions.mouseUp(evt, mouse_x, mouse_y);
          break;
        case "rotate":
          keep = true;
          element = null;
          current_mode = "select";
          var batchCmd = canvas.undoMgr.finishUndoableChange();
          if(!batchCmd.isEmpty()) {
            addCommandToHistory(batchCmd)
          }
          recalculateAllSelectedDimensions();
          call("changed", selectedElements);
          break;
        default:
          break
      }
      var ext_result = runExtensions("mouseUp", {event:evt, mouse_x:mouse_x, mouse_y:mouse_y}, true);
      $.each(ext_result, function(i, r) {
        if(r) {
          keep = r.keep || keep;
          element = r.element;
          started = r.started || started
        }
      });
      if(!keep && element != null) {
        getCurrentDrawing().releaseId(getId());
        element.parentNode.removeChild(element);
        element = null;
        t = evt.target;
        while(t.parentNode.parentNode.tagName == "g") {
          t = t.parentNode
        }
        if((current_mode != "path" || !drawn_path) && t.parentNode.id != "selectorParentGroup" && t.id != "svgcanvas" && t.id != "svgroot") {
          canvas.setMode("select");
          selectOnly([t], true)
        }
      }else {
        if(element != null) {
          canvas.addedNew = true;
          if(useUnit) {
            svgedit.units.convertAttrs(element)
          }
          var ani_dur = 0.2, c_ani;
          if(opac_ani.beginElement && element.getAttribute("opacity") != cur_shape.opacity) {
            c_ani = $(opac_ani).clone().attr({to:cur_shape.opacity, dur:ani_dur}).appendTo(element);
            try {
              c_ani[0].beginElement()
            }catch(e) {
            }
          }else {
            ani_dur = 0
          }
          setTimeout(function() {
            if(c_ani) {
              c_ani.remove()
            }
            element.setAttribute("opacity", cur_shape.opacity);
            element.setAttribute("style", "pointer-events:inherit");
            cleanupElement(element);
            if(current_mode === "path") {
              pathActions.toEditMode(element)
            }else {
              if(curConfig.selectNew) {
                selectOnly([element], true)
              }
            }
            addCommandToHistory(new svgedit.history.InsertElementCommand(element));
            call("changed", [element])
          }, ani_dur * 1E3)
        }
      }
      startTransform = null
    };
    var dblClick = function(evt) {
      var evt_target = evt.target;
      var parent = evt_target.parentNode;
      if(parent === current_group) {
        return
      }
      var mouse_target = getMouseTarget(evt);
      var tagName = mouse_target.tagName;
      if(tagName === "text" && current_mode !== "textedit") {
        var pt = svgedit.math.transformPoint(evt.pageX, evt.pageY, root_sctm);
        textActions.select(mouse_target, pt.x, pt.y)
      }
      if((tagName === "g" || tagName === "a") && svgedit.utilities.getRotationAngle(mouse_target)) {
        pushGroupProperties(mouse_target);
        mouse_target = selectedElements[0];
        clearSelection(true)
      }
      if(current_group) {
        leaveContext()
      }
      if(parent.tagName !== "g" && parent.tagName !== "a" || parent === getCurrentDrawing().getCurrentLayer() || mouse_target === selectorManager.selectorParentGroup) {
        return
      }
      setContext(mouse_target)
    };
    var handleLinkInCanvas = function(e) {
      e.preventDefault();
      return false
    };
    $(container).mousedown(mouseDown).mousemove(mouseMove).click(handleLinkInCanvas).dblclick(dblClick).mouseup(mouseUp);
    $(container).bind("mousewheel DOMMouseScroll", function(e) {
      e.preventDefault();
      var evt = e.originalEvent;
      root_sctm = $("#svgcontent g")[0].getScreenCTM().inverse();
      var pt = svgedit.math.transformPoint(evt.pageX, evt.pageY, root_sctm);
      var bbox = {x:pt.x, y:pt.y, width:0, height:0};
      var delta = evt.wheelDelta ? evt.wheelDelta : evt.detail ? -evt.detail : 0;
      if(!delta) {
        return
      }
      bbox.factor = Math.max(3 / 4, Math.min(4 / 3, delta));
      call("zoomed", bbox)
    })
  })();
  textActions = canvas.textActions = function() {
    var curtext;
    var textinput;
    var cursor;
    var selblock;
    var blinker;
    var chardata = [];
    var textbb, transbb;
    var matrix;
    var last_x, last_y;
    var allow_dbl;
    function setCursor(index) {
      var empty = textinput.value === "";
      $(textinput).focus();
      if(!arguments.length) {
        if(empty) {
          index = 0
        }else {
          if(textinput.selectionEnd !== textinput.selectionStart) {
            return
          }
          index = textinput.selectionEnd
        }
      }
      var charbb;
      charbb = chardata[index];
      if(!empty) {
        textinput.setSelectionRange(index, index)
      }
      cursor = svgedit.utilities.getElem("text_cursor");
      if(!cursor) {
        cursor = document.createElementNS(NS.SVG, "line");
        svgedit.utilities.assignAttributes(cursor, {id:"text_cursor", stroke:"#333", "stroke-width":1});
        cursor = svgedit.utilities.getElem("selectorParentGroup").appendChild(cursor)
      }
      if(!blinker) {
        blinker = setInterval(function() {
          var show = cursor.getAttribute("display") === "none";
          cursor.setAttribute("display", show ? "inline" : "none")
        }, 600)
      }
      var start_pt = ptToScreen(charbb.x, textbb.y);
      var end_pt = ptToScreen(charbb.x, textbb.y + textbb.height);
      svgedit.utilities.assignAttributes(cursor, {x1:start_pt.x, y1:start_pt.y, x2:end_pt.x, y2:end_pt.y, visibility:"visible", display:"inline"});
      if(selblock) {
        selblock.setAttribute("d", "")
      }
    }
    function setSelection(start, end, skipInput) {
      if(start === end) {
        setCursor(end);
        return
      }
      if(!skipInput) {
        textinput.setSelectionRange(start, end)
      }
      selblock = svgedit.utilities.getElem("text_selectblock");
      if(!selblock) {
        selblock = document.createElementNS(NS.SVG, "path");
        svgedit.utilities.assignAttributes(selblock, {id:"text_selectblock", fill:"green", opacity:0.5, style:"pointer-events:none"});
        svgedit.utilities.getElem("selectorParentGroup").appendChild(selblock)
      }
      var startbb = chardata[start];
      var endbb = chardata[end];
      cursor.setAttribute("visibility", "hidden");
      var tl = ptToScreen(startbb.x, textbb.y), tr = ptToScreen(startbb.x + (endbb.x - startbb.x), textbb.y), bl = ptToScreen(startbb.x, textbb.y + textbb.height), br = ptToScreen(startbb.x + (endbb.x - startbb.x), textbb.y + textbb.height);
      var dstr = "M" + tl.x + "," + tl.y + " L" + tr.x + "," + tr.y + " " + br.x + "," + br.y + " " + bl.x + "," + bl.y + "z";
      svgedit.utilities.assignAttributes(selblock, {d:dstr, display:"inline"})
    }
    function getIndexFromPoint(mouse_x, mouse_y) {
      var pt = svgroot.createSVGPoint();
      pt.x = mouse_x;
      pt.y = mouse_y;
      if(chardata.length == 1) {
        return 0
      }
      var charpos = curtext.getCharNumAtPosition(pt);
      if(charpos < 0) {
        charpos = chardata.length - 2;
        if(mouse_x <= chardata[0].x) {
          charpos = 0
        }
      }else {
        if(charpos >= chardata.length - 2) {
          charpos = chardata.length - 2
        }
      }
      var charbb = chardata[charpos];
      var mid = charbb.x + charbb.width / 2;
      if(mouse_x > mid) {
        charpos++
      }
      return charpos
    }
    function setCursorFromPoint(mouse_x, mouse_y) {
      setCursor(getIndexFromPoint(mouse_x, mouse_y))
    }
    function setEndSelectionFromPoint(x, y, apply) {
      var i1 = textinput.selectionStart;
      var i2 = getIndexFromPoint(x, y);
      var start = Math.min(i1, i2);
      var end = Math.max(i1, i2);
      setSelection(start, end, !apply)
    }
    function screenToPt(x_in, y_in) {
      var out = {x:x_in, y:y_in};
      out.x /= current_zoom;
      out.y /= current_zoom;
      if(matrix) {
        var pt = svgedit.math.transformPoint(out.x, out.y, matrix.inverse());
        out.x = pt.x;
        out.y = pt.y
      }
      return out
    }
    function ptToScreen(x_in, y_in) {
      var out = {x:x_in, y:y_in};
      if(matrix) {
        var pt = svgedit.math.transformPoint(out.x, out.y, matrix);
        out.x = pt.x;
        out.y = pt.y
      }
      out.x *= current_zoom;
      out.y *= current_zoom;
      return out
    }
    function hideCursor() {
      if(cursor) {
        cursor.setAttribute("visibility", "hidden")
      }
    }
    function selectAll(evt) {
      setSelection(0, curtext.textContent.length);
      $(this).unbind(evt)
    }
    function selectWord(evt) {
      if(!allow_dbl || !curtext) {
        return
      }
      var ept = svgedit.math.transformPoint(evt.pageX, evt.pageY, root_sctm), mouse_x = ept.x * current_zoom, mouse_y = ept.y * current_zoom;
      var pt = screenToPt(mouse_x, mouse_y);
      var index = getIndexFromPoint(pt.x, pt.y);
      var str = curtext.textContent;
      var first = str.substr(0, index).replace(/[a-z0-9]+$/i, "").length;
      var m = str.substr(index).match(/^[a-z0-9]+/i);
      var last = (m ? m[0].length : 0) + index;
      setSelection(first, last);
      $(evt.target).click(selectAll);
      setTimeout(function() {
        $(evt.target).unbind("click", selectAll)
      }, 300)
    }
    return{select:function(target, x, y) {
      curtext = target;
      textActions.toEditMode(x, y)
    }, start:function(elem) {
      curtext = elem;
      textActions.toEditMode()
    }, mouseDown:function(evt, mouse_target, start_x, start_y) {
      var pt = screenToPt(start_x, start_y);
      textinput.focus();
      setCursorFromPoint(pt.x, pt.y);
      last_x = start_x;
      last_y = start_y
    }, mouseMove:function(mouse_x, mouse_y) {
      var pt = screenToPt(mouse_x, mouse_y);
      setEndSelectionFromPoint(pt.x, pt.y)
    }, mouseUp:function(evt, mouse_x, mouse_y) {
      var pt = screenToPt(mouse_x, mouse_y);
      setEndSelectionFromPoint(pt.x, pt.y, true);
      if(evt.target !== curtext && mouse_x < last_x + 2 && mouse_x > last_x - 2 && mouse_y < last_y + 2 && mouse_y > last_y - 2) {
        textActions.toSelectMode(true)
      }
    }, setCursor:setCursor, toEditMode:function(x, y) {
      allow_dbl = false;
      current_mode = "textedit";
      selectorManager.requestSelector(curtext).showGrips(false);
      var sel = selectorManager.requestSelector(curtext).selectorRect;
      textActions.init();
      $(curtext).css("cursor", "text");
      if(!arguments.length) {
        setCursor()
      }else {
        var pt = screenToPt(x, y);
        setCursorFromPoint(pt.x, pt.y)
      }
      setTimeout(function() {
        allow_dbl = true
      }, 300)
    }, toSelectMode:function(selectElem) {
      current_mode = "select";
      clearInterval(blinker);
      blinker = null;
      if(selblock) {
        $(selblock).attr("display", "none")
      }
      if(cursor) {
        $(cursor).attr("visibility", "hidden")
      }
      $(curtext).css("cursor", "move");
      if(selectElem) {
        clearSelection();
        $(curtext).css("cursor", "move");
        call("selected", [curtext]);
        addToSelection([curtext], true)
      }
      if(curtext && !curtext.textContent.length) {
        canvas.deleteSelectedElements()
      }
      $(textinput).blur();
      curtext = false
    }, setInputElem:function(elem) {
      textinput = elem
    }, clear:function() {
      if(current_mode == "textedit") {
        textActions.toSelectMode()
      }
    }, init:function(inputElem) {
      if(!curtext) {
        return
      }
      var i, end;
      if(!curtext.parentNode) {
        curtext = selectedElements[0];
        selectorManager.requestSelector(curtext).showGrips(false)
      }
      var str = curtext.textContent;
      var len = str.length;
      var xform = curtext.getAttribute("transform");
      textbb = svgedit.utilities.getBBox(curtext);
      matrix = xform ? svgedit.math.getMatrix(curtext) : null;
      chardata = [];
      chardata.length = len;
      textinput.focus();
      $(curtext).unbind("dblclick", selectWord).dblclick(selectWord);
      if(!len) {
        end = {x:textbb.x + textbb.width / 2, width:0}
      }
      for(i = 0;i < len;i++) {
        var start = curtext.getStartPositionOfChar(i);
        end = curtext.getEndPositionOfChar(i);
        if(!svgedit.browser.supportsGoodTextCharPos()) {
          var offset = canvas.contentW * current_zoom;
          start.x -= offset;
          end.x -= offset;
          start.x /= current_zoom;
          end.x /= current_zoom
        }
        chardata[i] = {x:start.x, y:textbb.y, width:end.x - start.x, height:textbb.height}
      }
      chardata.push({x:end.x, width:0});
      setSelection(textinput.selectionStart, textinput.selectionEnd, true)
    }}
  }();
  pathActions = canvas.pathActions = function() {
    var subpath = false;
    var current_path;
    var newPoint, firstCtrl;
    function resetD(p) {
      p.setAttribute("d", pathActions.convertPath(p))
    }
    svgedit.path.Path.prototype.endChanges = function(text) {
      if(svgedit.browser.isWebkit()) {
        resetD(this.elem)
      }
      var cmd = new svgedit.history.ChangeElementCommand(this.elem, {d:this.last_d}, text);
      addCommandToHistory(cmd);
      call("changed", [this.elem])
    };
    svgedit.path.Path.prototype.addPtsToSelection = function(indexes) {
      var i, seg;
      if(!$.isArray(indexes)) {
        indexes = [indexes]
      }
      for(i = 0;i < indexes.length;i++) {
        var index = indexes[i];
        seg = this.segs[index];
        if(seg.ptgrip) {
          if(this.selected_pts.indexOf(index) == -1 && index >= 0) {
            this.selected_pts.push(index)
          }
        }
      }
      this.selected_pts.sort();
      i = this.selected_pts.length;
      var grips = [];
      grips.length = i;
      while(i--) {
        var pt = this.selected_pts[i];
        seg = this.segs[pt];
        seg.select(true);
        grips[i] = seg.ptgrip
      }
      pathActions.canDeleteNodes = true;
      pathActions.closed_subpath = this.subpathIsClosed(this.selected_pts[0]);
      call("selected", grips)
    };
    current_path = null;
    var drawn_path = null, hasMoved = false;
    var smoothPolylineIntoPath = function(element) {
      var i, points = element.points;
      var N = points.numberOfItems;
      if(N >= 4) {
        var curpos = points.getItem(0), prevCtlPt = null;
        var d = [];
        d.push(["M", curpos.x, ",", curpos.y, " C"].join(""));
        for(i = 1;i <= N - 4;i += 3) {
          var ct1 = points.getItem(i);
          var ct2 = points.getItem(i + 1);
          var end = points.getItem(i + 2);
          if(prevCtlPt) {
            var newpts = svgedit.path.smoothControlPoints(prevCtlPt, ct1, curpos);
            if(newpts && newpts.length == 2) {
              var prevArr = d[d.length - 1].split(",");
              prevArr[2] = newpts[0].x;
              prevArr[3] = newpts[0].y;
              d[d.length - 1] = prevArr.join(",");
              ct1 = newpts[1]
            }
          }
          d.push([ct1.x, ct1.y, ct2.x, ct2.y, end.x, end.y].join(","));
          curpos = end;
          prevCtlPt = ct2
        }
        d.push("L");
        while(i < N) {
          var pt = points.getItem(i);
          d.push([pt.x, pt.y].join(","));
          i++
        }
        d = d.join(" ");
        element = addSvgElementFromJson({element:"path", curStyles:true, attr:{id:getId(), d:d, fill:"none"}})
      }
      return element
    };
    return{mouseDown:function(evt, mouse_target, start_x, start_y) {
      var id;
      if(current_mode === "path") {
        mouse_x = start_x;
        mouse_y = start_y;
        var x = mouse_x / current_zoom, y = mouse_y / current_zoom, stretchy = svgedit.utilities.getElem("path_stretch_line");
        newPoint = [x, y];
        if(curConfig.gridSnapping) {
          x = svgedit.utilities.snapToGrid(x);
          y = svgedit.utilities.snapToGrid(y);
          mouse_x = svgedit.utilities.snapToGrid(mouse_x);
          mouse_y = svgedit.utilities.snapToGrid(mouse_y)
        }
        if(!stretchy) {
          stretchy = document.createElementNS(NS.SVG, "path");
          svgedit.utilities.assignAttributes(stretchy, {id:"path_stretch_line", stroke:"#22C", "stroke-width":"0.5", fill:"none"});
          stretchy = svgedit.utilities.getElem("selectorParentGroup").appendChild(stretchy)
        }
        stretchy.setAttribute("display", "inline");
        var keep = null;
        var index;
        if(!drawn_path) {
          d_attr = "M" + x + "," + y + " ";
          drawn_path = addSvgElementFromJson({element:"path", curStyles:true, attr:{d:d_attr, id:getNextId(), opacity:cur_shape.opacity / 2}});
          stretchy.setAttribute("d", ["M", mouse_x, mouse_y, mouse_x, mouse_y].join(" "));
          index = subpath ? svgedit.path.path.segs.length : 0;
          svgedit.path.addPointGrip(index, mouse_x, mouse_y)
        }else {
          var seglist = drawn_path.pathSegList;
          var i = seglist.numberOfItems;
          var FUZZ = 6 / current_zoom;
          var clickOnPoint = false;
          while(i) {
            i--;
            var item = seglist.getItem(i);
            var px = item.x, py = item.y;
            if(x >= px - FUZZ && x <= px + FUZZ && y >= py - FUZZ && y <= py + FUZZ) {
              clickOnPoint = true;
              break
            }
          }
          id = getId();
          svgedit.path.removePath_(id);
          var newpath = svgedit.utilities.getElem(id);
          var newseg;
          var s_seg;
          var len = seglist.numberOfItems;
          if(clickOnPoint) {
            if(i <= 1 && len >= 2) {
              var abs_x = seglist.getItem(0).x;
              var abs_y = seglist.getItem(0).y;
              s_seg = stretchy.pathSegList.getItem(1);
              if(s_seg.pathSegType === 4) {
                newseg = drawn_path.createSVGPathSegLinetoAbs(abs_x, abs_y)
              }else {
                newseg = drawn_path.createSVGPathSegCurvetoCubicAbs(abs_x, abs_y, s_seg.x1 / current_zoom, s_seg.y1 / current_zoom, abs_x, abs_y)
              }
              var endseg = drawn_path.createSVGPathSegClosePath();
              seglist.appendItem(newseg);
              seglist.appendItem(endseg)
            }else {
              if(len < 3) {
                keep = false;
                return keep
              }
            }
            $(stretchy).remove();
            element = newpath;
            drawn_path = null;
            started = false;
            if(subpath) {
              if(svgedit.path.path.matrix) {
                svgedit.coords.remapElement(newpath, {}, svgedit.path.path.matrix.inverse())
              }
              var new_d = newpath.getAttribute("d");
              var orig_d = $(svgedit.path.path.elem).attr("d");
              $(svgedit.path.path.elem).attr("d", orig_d + new_d);
              $(newpath).remove();
              if(svgedit.path.path.matrix) {
                svgedit.path.recalcRotatedPath()
              }
              svgedit.path.path.init();
              pathActions.toEditMode(svgedit.path.path.elem);
              svgedit.path.path.selectPt();
              return false
            }
          }else {
            if(!$.contains(container, getMouseTarget(evt))) {
              console.log("Clicked outside canvas");
              return false
            }
            var num = drawn_path.pathSegList.numberOfItems;
            var last = drawn_path.pathSegList.getItem(num - 1);
            var lastx = last.x, lasty = last.y;
            if(evt.shiftKey) {
              var xya = svgedit.math.snapToAngle(lastx, lasty, x, y);
              x = xya.x;
              y = xya.y
            }
            s_seg = stretchy.pathSegList.getItem(1);
            if(s_seg.pathSegType === 4) {
              newseg = drawn_path.createSVGPathSegLinetoAbs(round(x), round(y))
            }else {
              newseg = drawn_path.createSVGPathSegCurvetoCubicAbs(round(x), round(y), s_seg.x1 / current_zoom, s_seg.y1 / current_zoom, s_seg.x2 / current_zoom, s_seg.y2 / current_zoom)
            }
            drawn_path.pathSegList.appendItem(newseg);
            x *= current_zoom;
            y *= current_zoom;
            stretchy.setAttribute("d", ["M", x, y, x, y].join(" "));
            index = num;
            if(subpath) {
              index += svgedit.path.path.segs.length
            }
            svgedit.path.addPointGrip(index, x, y)
          }
        }
        return
      }
      if(!svgedit.path.path) {
        return
      }
      svgedit.path.path.storeD();
      id = evt.target.id;
      var cur_pt;
      if(id.substr(0, 14) == "pathpointgrip_") {
        cur_pt = svgedit.path.path.cur_pt = parseInt(id.substr(14));
        svgedit.path.path.dragging = [start_x, start_y];
        var seg = svgedit.path.path.segs[cur_pt];
        if(!evt.shiftKey) {
          if(svgedit.path.path.selected_pts.length <= 1 || !seg.selected) {
            svgedit.path.path.clearSelection()
          }
          svgedit.path.path.addPtsToSelection(cur_pt)
        }else {
          if(seg.selected) {
            svgedit.path.path.removePtFromSelection(cur_pt)
          }else {
            svgedit.path.path.addPtsToSelection(cur_pt)
          }
        }
      }else {
        if(id.indexOf("ctrlpointgrip_") == 0) {
          svgedit.path.path.dragging = [start_x, start_y];
          var parts = id.split("_")[1].split("c");
          cur_pt = Number(parts[0]);
          var ctrl_num = Number(parts[1]);
          svgedit.path.path.selectPt(cur_pt, ctrl_num)
        }
      }
      if(!svgedit.path.path.dragging) {
        if(rubberBox == null) {
          rubberBox = selectorManager.getRubberBandBox()
        }
        svgedit.utilities.assignAttributes(rubberBox, {x:start_x * current_zoom, y:start_y * current_zoom, width:0, height:0, display:"inline"}, 100)
      }
    }, mouseMove:function(mouse_x, mouse_y) {
      hasMoved = true;
      if(current_mode === "path") {
        if(!drawn_path) {
          return
        }
        var seglist = drawn_path.pathSegList;
        var index = seglist.numberOfItems - 1;
        if(newPoint) {
          var pointGrip1 = svgedit.path.addCtrlGrip("1c1");
          var pointGrip2 = svgedit.path.addCtrlGrip("0c2");
          pointGrip1.setAttribute("cx", mouse_x);
          pointGrip1.setAttribute("cy", mouse_y);
          pointGrip1.setAttribute("display", "inline");
          var pt_x = newPoint[0];
          var pt_y = newPoint[1];
          var seg = seglist.getItem(index);
          var cur_x = mouse_x / current_zoom;
          var cur_y = mouse_y / current_zoom;
          var alt_x = pt_x + (pt_x - cur_x);
          var alt_y = pt_y + (pt_y - cur_y);
          pointGrip2.setAttribute("cx", alt_x * current_zoom);
          pointGrip2.setAttribute("cy", alt_y * current_zoom);
          pointGrip2.setAttribute("display", "inline");
          var ctrlLine = svgedit.path.getCtrlLine(1);
          svgedit.utilities.assignAttributes(ctrlLine, {x1:mouse_x, y1:mouse_y, x2:alt_x * current_zoom, y2:alt_y * current_zoom, display:"inline"});
          if(index === 0) {
            firstCtrl = [mouse_x, mouse_y]
          }else {
            var last = seglist.getItem(index - 1);
            var last_x = last.x;
            var last_y = last.y;
            if(last.pathSegType === 6) {
              last_x += last_x - last.x2;
              last_y += last_y - last.y2
            }else {
              if(firstCtrl) {
                last_x = firstCtrl[0] / current_zoom;
                last_y = firstCtrl[1] / current_zoom
              }
            }
            svgedit.path.replacePathSeg(6, index, [pt_x, pt_y, last_x, last_y, alt_x, alt_y], drawn_path)
          }
        }else {
          var stretchy = svgedit.utilities.getElem("path_stretch_line");
          if(stretchy) {
            var prev = seglist.getItem(index);
            if(prev.pathSegType === 6) {
              var prev_x = prev.x + (prev.x - prev.x2);
              var prev_y = prev.y + (prev.y - prev.y2);
              svgedit.path.replacePathSeg(6, 1, [mouse_x, mouse_y, prev_x * current_zoom, prev_y * current_zoom, mouse_x, mouse_y], stretchy)
            }else {
              if(firstCtrl) {
                svgedit.path.replacePathSeg(6, 1, [mouse_x, mouse_y, firstCtrl[0], firstCtrl[1], mouse_x, mouse_y], stretchy)
              }else {
                svgedit.path.replacePathSeg(4, 1, [mouse_x, mouse_y], stretchy)
              }
            }
          }
        }
        return
      }
      if(svgedit.path.path.dragging) {
        var pt = svgedit.path.getPointFromGrip({x:svgedit.path.path.dragging[0], y:svgedit.path.path.dragging[1]}, svgedit.path.path);
        var mpt = svgedit.path.getPointFromGrip({x:mouse_x, y:mouse_y}, svgedit.path.path);
        var diff_x = mpt.x - pt.x;
        var diff_y = mpt.y - pt.y;
        svgedit.path.path.dragging = [mouse_x, mouse_y];
        if(svgedit.path.path.dragctrl) {
          svgedit.path.path.moveCtrl(diff_x, diff_y)
        }else {
          svgedit.path.path.movePts(diff_x, diff_y)
        }
      }else {
        svgedit.path.path.selected_pts = [];
        svgedit.path.path.eachSeg(function(i) {
          var seg = this;
          if(!seg.next && !seg.prev) {
            return
          }
          var item = seg.item;
          var rbb = rubberBox.getBBox();
          var pt = svgedit.path.getGripPt(seg);
          var pt_bb = {x:pt.x, y:pt.y, width:0, height:0};
          var sel = svgedit.math.rectsIntersect(rbb, pt_bb);
          this.select(sel);
          if(sel) {
            svgedit.path.path.selected_pts.push(seg.index)
          }
        })
      }
    }, mouseUp:function(evt, element, mouse_x, mouse_y) {
      if(current_mode === "path") {
        newPoint = null;
        if(!drawn_path) {
          element = svgedit.utilities.getElem(getId());
          started = false;
          firstCtrl = null
        }
        return{keep:true, element:element}
      }
      if(svgedit.path.path.dragging) {
        var last_pt = svgedit.path.path.cur_pt;
        svgedit.path.path.dragging = false;
        svgedit.path.path.dragctrl = false;
        svgedit.path.path.update();
        if(hasMoved) {
          svgedit.path.path.endChanges("Move path point(s)")
        }
        if(!evt.shiftKey && !hasMoved) {
          svgedit.path.path.selectPt(last_pt)
        }
      }else {
        if(rubberBox && rubberBox.getAttribute("display") != "none") {
          rubberBox.setAttribute("display", "none");
          if(rubberBox.getAttribute("width") <= 2 && rubberBox.getAttribute("height") <= 2) {
            pathActions.toSelectMode(evt.target)
          }
        }else {
          pathActions.toSelectMode(evt.target)
        }
      }
      hasMoved = false
    }, toEditMode:function(element) {
      svgedit.path.path = svgedit.path.getPath_(element);
      current_mode = "pathedit";
      clearSelection();
      svgedit.path.path.show(true).update();
      svgedit.path.path.oldbbox = svgedit.utilities.getBBox(svgedit.path.path.elem);
      subpath = false
    }, toSelectMode:function(elem) {
      var selPath = elem == svgedit.path.path.elem;
      current_mode = "select";
      svgedit.path.path.show(false);
      current_path = false;
      clearSelection();
      if(svgedit.path.path.matrix) {
        svgedit.path.recalcRotatedPath()
      }
      if(selPath) {
        call("selected", [elem]);
        addToSelection([elem], true)
      }
    }, addSubPath:function(on) {
      if(on) {
        current_mode = "path";
        subpath = true
      }else {
        pathActions.clear(true);
        pathActions.toEditMode(svgedit.path.path.elem)
      }
    }, select:function(target) {
      if(current_path === target) {
        pathActions.toEditMode(target);
        current_mode = "pathedit"
      }else {
        current_path = target
      }
    }, reorient:function() {
      var elem = selectedElements[0];
      if(!elem) {
        return
      }
      var angle = svgedit.utilities.getRotationAngle(elem);
      if(angle == 0) {
        return
      }
      var batchCmd = new svgedit.history.BatchCommand("Reorient path");
      var changes = {d:elem.getAttribute("d"), transform:elem.getAttribute("transform")};
      batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(elem, changes));
      clearSelection();
      this.resetOrientation(elem);
      addCommandToHistory(batchCmd);
      svgedit.path.getPath_(elem).show(false).matrix = null;
      this.clear();
      addToSelection([elem], true);
      call("changed", selectedElements)
    }, clear:function(remove) {
      current_path = null;
      if(drawn_path) {
        var elem = svgedit.utilities.getElem(getId());
        $(svgedit.utilities.getElem("path_stretch_line")).remove();
        $(elem).remove();
        $(svgedit.utilities.getElem("pathpointgrip_container")).find("*").attr("display", "none");
        drawn_path = firstCtrl = null;
        started = false
      }else {
        if(current_mode == "pathedit") {
          this.toSelectMode()
        }
      }
      if(svgedit.path.path) {
        svgedit.path.path.init().show(false)
      }
    }, resetOrientation:function(path) {
      if(path == null || path.nodeName != "path") {
        return false
      }
      var tlist = svgedit.transformlist.getTransformList(path);
      var m = svgedit.math.transformListToTransform(tlist).matrix;
      tlist.clear();
      path.removeAttribute("transform");
      var segList = path.pathSegList;
      var len = segList.numberOfItems;
      var i, last_x, last_y;
      for(i = 0;i < len;++i) {
        var seg = segList.getItem(i);
        var type = seg.pathSegType;
        if(type == 1) {
          continue
        }
        var pts = [];
        $.each(["", 1, 2], function(j, n) {
          var x = seg["x" + n], y = seg["y" + n];
          if(x !== undefined && y !== undefined) {
            var pt = svgedit.math.transformPoint(x, y, m);
            pts.splice(pts.length, 0, pt.x, pt.y)
          }
        });
        svgedit.path.replacePathSeg(type, i, pts, path)
      }
      reorientGrads(path, m)
    }, zoomChange:function() {
      if(current_mode == "pathedit") {
        svgedit.path.path.update()
      }
    }, getNodePoint:function() {
      var sel_pt = svgedit.path.path.selected_pts.length ? svgedit.path.path.selected_pts[0] : 1;
      var seg = svgedit.path.path.segs[sel_pt];
      return{x:seg.item.x, y:seg.item.y, type:seg.type}
    }, linkControlPoints:function(linkPoints) {
      svgedit.path.setLinkControlPoints(linkPoints)
    }, clonePathNode:function() {
      svgedit.path.path.storeD();
      var sel_pts = svgedit.path.path.selected_pts;
      var segs = svgedit.path.path.segs;
      var i = sel_pts.length;
      var nums = [];
      while(i--) {
        var pt = sel_pts[i];
        svgedit.path.path.addSeg(pt);
        nums.push(pt + i);
        nums.push(pt + i + 1)
      }
      svgedit.path.path.init().addPtsToSelection(nums);
      svgedit.path.path.endChanges("Clone path node(s)")
    }, opencloseSubPath:function() {
      var sel_pts = svgedit.path.path.selected_pts;
      if(sel_pts.length !== 1) {
        return
      }
      var elem = svgedit.path.path.elem;
      var list = elem.pathSegList;
      var len = list.numberOfItems;
      var index = sel_pts[0];
      var open_pt = null;
      var start_item = null;
      svgedit.path.path.eachSeg(function(i) {
        if(this.type === 2 && i <= index) {
          start_item = this.item
        }
        if(i <= index) {
          return true
        }
        if(this.type === 2) {
          open_pt = i;
          return false
        }
        if(this.type === 1) {
          open_pt = false;
          return false
        }
      });
      if(open_pt == null) {
        open_pt = svgedit.path.path.segs.length - 1
      }
      if(open_pt !== false) {
        var newseg = elem.createSVGPathSegLinetoAbs(start_item.x, start_item.y);
        var closer = elem.createSVGPathSegClosePath();
        if(open_pt == svgedit.path.path.segs.length - 1) {
          list.appendItem(newseg);
          list.appendItem(closer)
        }else {
          svgedit.path.insertItemBefore(elem, closer, open_pt);
          svgedit.path.insertItemBefore(elem, newseg, open_pt)
        }
        svgedit.path.path.init().selectPt(open_pt + 1);
        return
      }
      var seg = svgedit.path.path.segs[index];
      if(seg.mate) {
        list.removeItem(index);
        list.removeItem(index);
        svgedit.path.path.init().selectPt(index - 1);
        return
      }
      var i, last_m, z_seg;
      for(i = 0;i < list.numberOfItems;i++) {
        var item = list.getItem(i);
        if(item.pathSegType === 2) {
          last_m = i
        }else {
          if(i === index) {
            list.removeItem(last_m)
          }else {
            if(item.pathSegType === 1 && index < i) {
              z_seg = i - 1;
              list.removeItem(i);
              break
            }
          }
        }
      }
      var num = index - last_m - 1;
      while(num--) {
        svgedit.path.insertItemBefore(elem, list.getItem(last_m), z_seg)
      }
      var pt = list.getItem(last_m);
      svgedit.path.replacePathSeg(2, last_m, [pt.x, pt.y]);
      i = index;
      svgedit.path.path.init().selectPt(0)
    }, deletePathNode:function() {
      if(!pathActions.canDeleteNodes) {
        return
      }
      svgedit.path.path.storeD();
      var sel_pts = svgedit.path.path.selected_pts;
      var i = sel_pts.length;
      while(i--) {
        var pt = sel_pts[i];
        svgedit.path.path.deleteSeg(pt)
      }
      var cleanup = function() {
        var segList = svgedit.path.path.elem.pathSegList;
        var len = segList.numberOfItems;
        var remItems = function(pos, count) {
          while(count--) {
            segList.removeItem(pos)
          }
        };
        if(len <= 1) {
          return true
        }
        while(len--) {
          var item = segList.getItem(len);
          if(item.pathSegType === 1) {
            var prev = segList.getItem(len - 1);
            var nprev = segList.getItem(len - 2);
            if(prev.pathSegType === 2) {
              remItems(len - 1, 2);
              cleanup();
              break
            }else {
              if(nprev.pathSegType === 2) {
                remItems(len - 2, 3);
                cleanup();
                break
              }
            }
          }else {
            if(item.pathSegType === 2) {
              if(len > 0) {
                var prev_type = segList.getItem(len - 1).pathSegType;
                if(prev_type === 2) {
                  remItems(len - 1, 1);
                  cleanup();
                  break
                }else {
                  if(prev_type === 1 && segList.numberOfItems - 1 === len) {
                    remItems(len, 1);
                    cleanup();
                    break
                  }
                }
              }
            }
          }
        }
        return false
      };
      cleanup();
      if(svgedit.path.path.elem.pathSegList.numberOfItems <= 1) {
        pathActions.toSelectMode(svgedit.path.path.elem);
        canvas.deleteSelectedElements();
        return
      }
      svgedit.path.path.init();
      svgedit.path.path.clearSelection();
      if(window.opera) {
        var cp = $(svgedit.path.path.elem);
        cp.attr("d", cp.attr("d"))
      }
      svgedit.path.path.endChanges("Delete path node(s)")
    }, smoothPolylineIntoPath:smoothPolylineIntoPath, setSegType:function(v) {
      svgedit.path.path.setSegType(v)
    }, moveNode:function(attr, newValue) {
      var sel_pts = svgedit.path.path.selected_pts;
      if(!sel_pts.length) {
        return
      }
      svgedit.path.path.storeD();
      var seg = svgedit.path.path.segs[sel_pts[0]];
      var diff = {x:0, y:0};
      diff[attr] = newValue - seg.item[attr];
      seg.move(diff.x, diff.y);
      svgedit.path.path.endChanges("Move path point")
    }, fixEnd:function(elem) {
      var segList = elem.pathSegList;
      var len = segList.numberOfItems;
      var i, last_m;
      for(i = 0;i < len;++i) {
        var item = segList.getItem(i);
        if(item.pathSegType === 2) {
          last_m = item
        }
        if(item.pathSegType === 1) {
          var prev = segList.getItem(i - 1);
          if(prev.x != last_m.x || prev.y != last_m.y) {
            var newseg = elem.createSVGPathSegLinetoAbs(last_m.x, last_m.y);
            svgedit.path.insertItemBefore(elem, newseg, i);
            pathActions.fixEnd(elem);
            break
          }
        }
      }
      if(svgedit.browser.isWebkit()) {
        resetD(elem)
      }
    }, convertPath:svgedit.utilities.convertPath}
  }();
  var removeUnusedDefElems = this.removeUnusedDefElems = function() {
    var defs = svgcontent.getElementsByTagNameNS(NS.SVG, "defs");
    if(!defs || !defs.length) {
      return 0
    }
    var defelem_uses = [], numRemoved = 0;
    var attrs = ["fill", "stroke", "filter", "marker-start", "marker-mid", "marker-end"];
    var alen = attrs.length;
    var all_els = svgcontent.getElementsByTagNameNS(NS.SVG, "*");
    var all_len = all_els.length;
    var i, j;
    for(i = 0;i < all_len;i++) {
      var el = all_els[i];
      for(j = 0;j < alen;j++) {
        var ref = svgedit.utilities.getUrlFromAttr(el.getAttribute(attrs[j]));
        if(ref) {
          defelem_uses.push(ref.substr(1))
        }
      }
      var href = getHref(el);
      if(href && href.indexOf("#") === 0) {
        defelem_uses.push(href.substr(1))
      }
    }
    var defelems = $(defs).find("linearGradient, radialGradient, filter, marker, svg, symbol");
    i = defelems.length;
    while(i--) {
      var defelem = defelems[i];
      var id = defelem.id;
      if(defelem_uses.indexOf(id) < 0) {
        removedElements[id] = defelem;
        defelem.parentNode.removeChild(defelem);
        numRemoved++
      }
    }
    return numRemoved
  };
  this.svgCanvasToString = function() {
    while(removeUnusedDefElems() > 0) {
    }
    pathActions.clear(true);
    $.each(svgcontent.childNodes, function(i, node) {
      if(i && node.nodeType === 8 && node.data.indexOf("Created with") >= 0) {
        svgcontent.insertBefore(node, svgcontent.firstChild)
      }
    });
    if(current_group) {
      leaveContext();
      selectOnly([current_group])
    }
    var naked_svgs = [];
    $(svgcontent).find("g:data(gsvg)").each(function() {
      var attrs = this.attributes;
      var len = attrs.length;
      var i;
      for(i = 0;i < len;i++) {
        if(attrs[i].nodeName == "id" || attrs[i].nodeName == "style") {
          len--
        }
      }
      if(len <= 0) {
        var svg = this.firstChild;
        naked_svgs.push(svg);
        $(this).replaceWith(svg)
      }
    });
    var output = this.svgToString(svgcontent, 0);
    if(naked_svgs.length) {
      $(naked_svgs).each(function() {
        groupSvgElem(this)
      })
    }
    return output
  };
  this.svgToString = function(elem, indent) {
    var out = [], toXml = svgedit.utilities.toXml;
    var unit = curConfig.baseUnit;
    var unit_re = new RegExp("^-?[\\d\\.]+" + unit + "$");
    if(elem) {
      cleanupElement(elem);
      var attrs = elem.attributes, attr, i, childs = elem.childNodes;
      for(i = 0;i < indent;i++) {
        out.push(" ")
      }
      out.push("<");
      out.push(elem.nodeName);
      if(elem.id === "svgcontent") {
        var res = getResolution();
        var vb = "";
        if(unit !== "px") {
          res.w = svgedit.units.convertUnit(res.w, unit) + unit;
          res.h = svgedit.units.convertUnit(res.h, unit) + unit
        }
        out.push(' width="' + res.w + '" height="' + res.h + '"' + vb + ' xmlns="' + NS.SVG + '"');
        var nsuris = {};
        $(elem).find("*").andSelf().each(function() {
          var el = this;
          var uri = this.namespaceURI;
          if(uri && !nsuris[uri] && nsMap[uri] && nsMap[uri] !== "xmlns" && nsMap[uri] !== "xml") {
            nsuris[uri] = true;
            out.push(" xmlns:" + nsMap[uri] + '="' + uri + '"')
          }
          $.each(this.attributes, function(i, attr) {
            var uri = attr.namespaceURI;
            if(uri && !nsuris[uri] && nsMap[uri] !== "xmlns" && nsMap[uri] !== "xml") {
              nsuris[uri] = true;
              out.push(" xmlns:" + nsMap[uri] + '="' + uri + '"')
            }
          })
        });
        i = attrs.length;
        var attr_names = ["width", "height", "xmlns", "x", "y", "viewBox", "id", "overflow"];
        while(i--) {
          attr = attrs.item(i);
          var attrVal = toXml(attr.value);
          if(attr.nodeName.indexOf("xmlns:") === 0) {
            continue
          }
          if(attrVal != "" && attr_names.indexOf(attr.localName) == -1) {
            if(!attr.namespaceURI || nsMap[attr.namespaceURI]) {
              out.push(" ");
              out.push(attr.nodeName);
              out.push('="');
              out.push(attrVal);
              out.push('"')
            }
          }
        }
      }else {
        if(elem.nodeName === "defs" && !elem.firstChild) {
          return
        }
        var moz_attrs = ["-moz-math-font-style", "_moz-math-font-style"];
        for(i = attrs.length - 1;i >= 0;i--) {
          attr = attrs.item(i);
          var attrVal = toXml(attr.value);
          if(moz_attrs.indexOf(attr.localName) >= 0) {
            continue
          }
          if(attrVal != "") {
            if(attrVal.indexOf("pointer-events") === 0) {
              continue
            }
            if(attr.localName === "class" && attrVal.indexOf("se_") === 0) {
              continue
            }
            out.push(" ");
            if(attr.localName === "d") {
              attrVal = canvas.pathActions.convertPath(elem).replace(/,/g, " ").toUpperCase()
            }
            if(!isNaN(attrVal)) {
              attrVal = svgedit.units.shortFloat(attrVal)
            }else {
              if(unit_re.test(attrVal)) {
                attrVal = svgedit.units.shortFloat(attrVal) + unit
              }
            }
            if(save_options.apply && elem.nodeName === "image" && attr.localName === "href" && save_options.images && save_options.images === "embed") {
              var img = encodableImages[attrVal];
              if(img) {
                attrVal = img
              }
            }
            if(!attr.namespaceURI || attr.namespaceURI == NS.SVG || nsMap[attr.namespaceURI]) {
              out.push(attr.nodeName);
              out.push('="');
              out.push(attrVal);
              out.push('"')
            }
          }
        }
      }
      if(elem.hasChildNodes()) {
        out.push(">");
        indent++;
        var bOneLine = false;
        for(i = 0;i < childs.length;i++) {
          var child = childs.item(i);
          switch(child.nodeType) {
            case 1:
              out.push("\n");
              out.push(this.svgToString(childs.item(i), indent));
              break;
            case 3:
              var str = child.nodeValue.replace(/^\s+|\s+$/g, "");
              if(str != "") {
                bOneLine = true;
                out.push(String(toXml(str)))
              }
              break;
            case 4:
              out.push("\n");
              out.push((new Array(indent + 1)).join(" "));
              out.push("<![CDATA[");
              out.push(child.nodeValue);
              out.push("]]\>");
              break;
            case 8:
              out.push("\n");
              out.push((new Array(indent + 1)).join(" "));
              out.push("<!--");
              out.push(child.data);
              out.push("--\>");
              break
          }
        }
        indent--;
        if(!bOneLine) {
          out.push("\n");
          for(i = 0;i < indent;i++) {
            out.push(" ")
          }
        }
        out.push("</");
        out.push(elem.nodeName);
        out.push(">")
      }else {
        out.push("/>")
      }
    }
    return out.join("")
  };
  this.embedImage = function(val, callback) {
    $(new Image).load(function() {
      var canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      canvas.getContext("2d").drawImage(this, 0, 0);
      try {
        var urldata = ";svgedit_url=" + encodeURIComponent(val);
        urldata = canvas.toDataURL().replace(";base64", urldata + ";base64");
        encodableImages[val] = urldata
      }catch(e) {
        encodableImages[val] = false
      }
      last_good_img_url = val;
      if(callback) {
        callback(encodableImages[val])
      }
    }).attr("src", val)
  };
  this.setGoodImage = function(val) {
    last_good_img_url = val
  };
  this.open = function() {
  };
  this.save = function(opts) {
    clearSelection();
    if(opts) {
      $.extend(save_options, opts)
    }
    save_options.apply = true;
    var str = this.svgCanvasToString();
    call("saved", str)
  };
  function getIssues() {
    clearSelection();
    var issues = [];
    var issue_list = {feGaussianBlur:uiStrings.exportNoBlur, foreignObject:uiStrings.exportNoforeignObject, "[stroke-dasharray]":uiStrings.exportNoDashArray};
    var content = $(svgcontent);
    if(!("font" in $("<canvas>")[0].getContext("2d"))) {
      issue_list.text = uiStrings.exportNoText
    }
    $.each(issue_list, function(sel, descr) {
      if(content.find(sel).length) {
        issues.push(descr)
      }
    });
    return issues
  }
  this.rasterExport = function(imgType, quality, exportWindowName) {
    var mimeType = "image/" + imgType.toLowerCase();
    var issues = getIssues();
    var str = this.svgCanvasToString();
    svgedit.utilities.buildCanvgCallback(function() {
      var type = imgType || "PNG";
      if(!$("#export_canvas").length) {
        $("<canvas>", {id:"export_canvas"}).hide().appendTo("body")
      }
      var c = $("#export_canvas")[0];
      c.width = svgCanvas.contentW;
      c.height = svgCanvas.contentH;
      canvg(c, str, {renderCallback:function() {
        var dataURLType = (type === "ICO" ? "BMP" : type).toLowerCase();
        var datauri = quality ? c.toDataURL("image/" + dataURLType, quality) : c.toDataURL("image/" + dataURLType);
        call("exported", {datauri:datauri, svg:str, issues:issues, type:imgType, mimeType:mimeType, quality:quality, exportWindowName:exportWindowName})
      }})
    })()
  };
  this.exportPDF = function(exportWindowName, outputType) {
    var that = this;
    svgedit.utilities.buildJSPDFCallback(function() {
      var res = getResolution();
      var orientation = res.w > res.h ? "landscape" : "portrait";
      var units = "pt";
      var doc = jsPDF({orientation:orientation, unit:units, format:[res.w, res.h]});
      var docTitle = getDocumentTitle();
      doc.setProperties({title:docTitle});
      var issues = getIssues();
      var str = that.svgCanvasToString();
      doc.addSVG(str, 0, 0);
      var obj = {svg:str, issues:issues, exportWindowName:exportWindowName};
      var method = outputType || "dataurlstring";
      obj[method] = doc.output(method);
      call("exportedPDF", obj)
    })()
  };
  this.getSvgString = function() {
    save_options.apply = false;
    return this.svgCanvasToString()
  };
  this.randomizeIds = function(enableRandomization) {
    if(arguments.length > 0 && enableRandomization == false) {
      svgedit.draw.randomizeIds(false, getCurrentDrawing())
    }else {
      svgedit.draw.randomizeIds(true, getCurrentDrawing())
    }
  };
  var uniquifyElems = this.uniquifyElems = function(g) {
    var ids = {};
    var ref_elems = ["filter", "linearGradient", "pattern", "radialGradient", "symbol", "textPath", "use"];
    svgedit.utilities.walkTree(g, function(n) {
      if(n.nodeType == 1) {
        if(n.id) {
          if(!(n.id in ids)) {
            ids[n.id] = {elem:null, attrs:[], hrefs:[]}
          }
          ids[n.id].elem = n
        }
        $.each(ref_attrs, function(i, attr) {
          var attrnode = n.getAttributeNode(attr);
          if(attrnode) {
            var url = svgedit.utilities.getUrlFromAttr(attrnode.value), refid = url ? url.substr(1) : null;
            if(refid) {
              if(!(refid in ids)) {
                ids[refid] = {elem:null, attrs:[], hrefs:[]}
              }
              ids[refid].attrs.push(attrnode)
            }
          }
        });
        var href = svgedit.utilities.getHref(n);
        if(href && ref_elems.indexOf(n.nodeName) >= 0) {
          var refid = href.substr(1);
          if(refid) {
            if(!(refid in ids)) {
              ids[refid] = {elem:null, attrs:[], hrefs:[]}
            }
            ids[refid].hrefs.push(n)
          }
        }
      }
    });
    var oldid;
    for(oldid in ids) {
      if(!oldid) {
        continue
      }
      var elem = ids[oldid].elem;
      if(elem) {
        var newid = getNextId();
        elem.id = newid;
        var attrs = ids[oldid].attrs;
        var j = attrs.length;
        while(j--) {
          var attr = attrs[j];
          attr.ownerElement.setAttribute(attr.name, "url(#" + newid + ")")
        }
        var hreffers = ids[oldid].hrefs;
        var k = hreffers.length;
        while(k--) {
          var hreffer = hreffers[k];
          svgedit.utilities.setHref(hreffer, "#" + newid)
        }
      }
    }
  };
  var setUseData = this.setUseData = function(parent) {
    var elems = $(parent);
    if(parent.tagName !== "use") {
      elems = elems.find("use")
    }
    elems.each(function() {
      var id = getHref(this).substr(1);
      var ref_elem = svgedit.utilities.getElem(id);
      if(!ref_elem) {
        return
      }
      $(this).data("ref", ref_elem);
      if(ref_elem.tagName == "symbol" || ref_elem.tagName == "svg") {
        $(this).data("symbol", ref_elem).data("ref", ref_elem)
      }
    })
  };
  var convertGradients = this.convertGradients = function(elem) {
    var elems = $(elem).find("linearGradient, radialGradient");
    if(!elems.length && svgedit.browser.isWebkit()) {
      elems = $(elem).find("*").filter(function() {
        return this.tagName.indexOf("Gradient") >= 0
      })
    }
    elems.each(function() {
      var grad = this;
      if($(grad).attr("gradientUnits") === "userSpaceOnUse") {
        var elems = $(svgcontent).find('[fill="url(#' + grad.id + ')"],[stroke="url(#' + grad.id + ')"]');
        if(!elems.length) {
          return
        }
        var bb = svgedit.utilities.getBBox(elems[0]);
        if(!bb) {
          return
        }
        if(grad.tagName === "linearGradient") {
          var g_coords = $(grad).attr(["x1", "y1", "x2", "y2"]);
          var tlist = grad.gradientTransform.baseVal;
          if(tlist && tlist.numberOfItems > 0) {
            var m = svgedit.math.transformListToTransform(tlist).matrix;
            var pt1 = svgedit.math.transformPoint(g_coords.x1, g_coords.y1, m);
            var pt2 = svgedit.math.transformPoint(g_coords.x2, g_coords.y2, m);
            g_coords.x1 = pt1.x;
            g_coords.y1 = pt1.y;
            g_coords.x2 = pt2.x;
            g_coords.y2 = pt2.y;
            grad.removeAttribute("gradientTransform")
          }
          $(grad).attr({x1:(g_coords.x1 - bb.x) / bb.width, y1:(g_coords.y1 - bb.y) / bb.height, x2:(g_coords.x2 - bb.x) / bb.width, y2:(g_coords.y2 - bb.y) / bb.height});
          grad.removeAttribute("gradientUnits")
        }
      }
    })
  };
  var convertToGroup = this.convertToGroup = function(elem) {
    if(!elem) {
      elem = selectedElements[0]
    }
    var $elem = $(elem);
    var batchCmd = new svgedit.history.BatchCommand;
    var ts;
    if($elem.data("gsvg")) {
      var svg = elem.firstChild;
      var pt = $(svg).attr(["x", "y"]);
      $(elem.firstChild.firstChild).unwrap();
      $(elem).removeData("gsvg");
      var tlist = svgedit.transformlist.getTransformList(elem);
      var xform = svgroot.createSVGTransform();
      xform.setTranslate(pt.x, pt.y);
      tlist.appendItem(xform);
      svgedit.recalculate.recalculateDimensions(elem);
      call("selected", [elem])
    }else {
      if($elem.data("symbol")) {
        elem = $elem.data("symbol");
        ts = $elem.attr("transform");
        var pos = $elem.attr(["x", "y"]);
        var vb = elem.getAttribute("viewBox");
        if(vb) {
          var nums = vb.split(" ");
          pos.x -= +nums[0];
          pos.y -= +nums[1]
        }
        ts += " translate(" + (pos.x || 0) + "," + (pos.y || 0) + ")";
        var prev = $elem.prev();
        batchCmd.addSubCommand(new svgedit.history.RemoveElementCommand($elem[0], $elem[0].nextSibling, $elem[0].parentNode));
        $elem.remove();
        var has_more = $(svgcontent).find("use:data(symbol)").length;
        var g = svgdoc.createElementNS(NS.SVG, "g");
        var childs = elem.childNodes;
        var i;
        for(i = 0;i < childs.length;i++) {
          g.appendChild(childs[i].cloneNode(true))
        }
        if(svgedit.browser.isGecko()) {
          var dupeGrads = $(svgedit.utilities.findDefs()).children("linearGradient,radialGradient,pattern").clone();
          $(g).append(dupeGrads)
        }
        if(ts) {
          g.setAttribute("transform", ts)
        }
        var parent = elem.parentNode;
        uniquifyElems(g);
        if(svgedit.browser.isGecko()) {
          $(findDefs()).append($(g).find("linearGradient,radialGradient,pattern"))
        }
        g.id = getNextId();
        prev.after(g);
        if(parent) {
          if(!has_more) {
            var nextSibling = elem.nextSibling;
            parent.removeChild(elem);
            batchCmd.addSubCommand(new svgedit.history.RemoveElementCommand(elem, nextSibling, parent))
          }
          batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(g))
        }
        setUseData(g);
        if(svgedit.browser.isGecko()) {
          convertGradients(svgedit.utilities.findDefs())
        }else {
          convertGradients(g)
        }
        svgedit.utilities.walkTreePost(g, function(n) {
          try {
            svgedit.recalculate.recalculateDimensions(n)
          }catch(e) {
            console.log(e)
          }
        });
        $(g).find(visElems).each(function() {
          if(!this.id) {
            this.id = getNextId()
          }
        });
        selectOnly([g]);
        var cm = pushGroupProperties(g, true);
        if(cm) {
          batchCmd.addSubCommand(cm)
        }
        addCommandToHistory(batchCmd)
      }else {
        console.log("Unexpected element to ungroup:", elem)
      }
    }
  };
  this.setSvgString = function(xmlString) {
    try {
      var newDoc = svgedit.utilities.text2xml(xmlString);
      this.prepareSvg(newDoc);
      var batchCmd = new svgedit.history.BatchCommand("Change Source");
      var nextSibling = svgcontent.nextSibling;
      var oldzoom = svgroot.removeChild(svgcontent);
      batchCmd.addSubCommand(new svgedit.history.RemoveElementCommand(oldzoom, nextSibling, svgroot));
      if(svgdoc.adoptNode) {
        svgcontent = svgdoc.adoptNode(newDoc.documentElement)
      }else {
        svgcontent = svgdoc.importNode(newDoc.documentElement, true)
      }
      svgroot.appendChild(svgcontent);
      var content = $(svgcontent);
      canvas.current_drawing_ = new svgedit.draw.Drawing(svgcontent, idprefix);
      var nonce = getCurrentDrawing().getNonce();
      if(nonce) {
        call("setnonce", nonce)
      }else {
        call("unsetnonce")
      }
      content.find("image").each(function() {
        var image = this;
        svgedit.utilities.preventClickDefault(image);
        var val = getHref(this);
        if(val) {
          if(val.indexOf("data:") === 0) {
            var m = val.match(/svgedit_url=(.*?);/);
            if(m) {
              var url = decodeURIComponent(m[1]);
              $(new Image).load(function() {
                image.setAttributeNS(NS.XLINK, "xlink:href", url)
              }).attr("src", url)
            }
          }
          canvas.embedImage(val)
        }
      });
      content.find("svg").each(function() {
        if($(this).closest("defs").length) {
          return
        }
        uniquifyElems(this);
        var pa = this.parentNode;
        if(pa.childNodes.length === 1 && pa.nodeName === "g") {
          $(pa).data("gsvg", this);
          pa.id = pa.id || getNextId()
        }else {
          groupSvgElem(this)
        }
      });
      if(svgedit.browser.isGecko()) {
        content.find("linearGradient, radialGradient, pattern").appendTo(svgedit.utilities.findDefs())
      }
      setUseData(content);
      convertGradients(content[0]);
      var attrs = {id:"svgcontent", overflow:curConfig.show_outside_canvas ? "visible" : "hidden"};
      var percs = false;
      if(content.attr("viewBox")) {
        var vb = content.attr("viewBox").split(" ");
        attrs.width = vb[2];
        attrs.height = vb[3]
      }else {
        $.each(["width", "height"], function(i, dim) {
          var val = content.attr(dim);
          if(!val) {
            val = "100%"
          }
          if(String(val).substr(-1) === "%") {
            percs = true
          }else {
            attrs[dim] = svgedit.units.convertToNum(dim, val)
          }
        })
      }
      identifyLayers();
      content.children().find(visElems).each(function() {
        if(!this.id) {
          this.id = getNextId()
        }
      });
      if(percs) {
        var bb = getStrokedBBox();
        attrs.width = bb.width + bb.x;
        attrs.height = bb.height + bb.y
      }
      if(attrs.width <= 0) {
        attrs.width = 100
      }
      if(attrs.height <= 0) {
        attrs.height = 100
      }
      content.attr(attrs);
      this.contentW = attrs.width;
      this.contentH = attrs.height;
      batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(svgcontent));
      var changes = content.attr(["width", "height"]);
      batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(svgroot, changes));
      current_zoom = 1;
      svgedit.transformlist.resetListMap();
      clearSelection();
      svgedit.path.clearData();
      svgroot.appendChild(selectorManager.selectorParentGroup);
      addCommandToHistory(batchCmd);
      call("changed", [svgcontent])
    }catch(e) {
      console.log(e);
      return false
    }
    return true
  };
  this.importSvgString = function(xmlString) {
    var j, ts;
    try {
      var uid = svgedit.utilities.encode64(xmlString.length + xmlString).substr(0, 32);
      var useExisting = false;
      if(import_ids[uid]) {
        if($(import_ids[uid].symbol).parents("#svgroot").length) {
          useExisting = true
        }
      }
      var batchCmd = new svgedit.history.BatchCommand("Import Image");
      var symbol;
      if(useExisting) {
        symbol = import_ids[uid].symbol;
        ts = import_ids[uid].xform
      }else {
        var newDoc = svgedit.utilities.text2xml(xmlString);
        this.prepareSvg(newDoc);
        var svg;
        if(svgdoc.adoptNode) {
          svg = svgdoc.adoptNode(newDoc.documentElement)
        }else {
          svg = svgdoc.importNode(newDoc.documentElement, true)
        }
        uniquifyElems(svg);
        var innerw = svgedit.units.convertToNum("width", svg.getAttribute("width")), innerh = svgedit.units.convertToNum("height", svg.getAttribute("height")), innervb = svg.getAttribute("viewBox"), vb = innervb ? innervb.split(" ") : [0, 0, innerw, innerh];
        for(j = 0;j < 4;++j) {
          vb[j] = +vb[j]
        }
        var canvasw = +svgcontent.getAttribute("width"), canvash = +svgcontent.getAttribute("height");
        if(innerh > innerw) {
          ts = "scale(" + canvash / 3 / vb[3] + ")"
        }else {
          ts = "scale(" + canvash / 3 / vb[2] + ")"
        }
        ts = "translate(0) " + ts + " translate(0)";
        symbol = svgdoc.createElementNS(NS.SVG, "symbol");
        var defs = svgedit.utilities.findDefs();
        if(svgedit.browser.isGecko()) {
          $(svg).find("linearGradient, radialGradient, pattern").appendTo(defs)
        }
        while(svg.firstChild) {
          var first = svg.firstChild;
          symbol.appendChild(first)
        }
        var attrs = svg.attributes;
        var i;
        for(i = 0;i < attrs.length;i++) {
          var attr = attrs[i];
          symbol.setAttribute(attr.nodeName, attr.value)
        }
        symbol.id = getNextId();
        import_ids[uid] = {symbol:symbol, xform:ts};
        svgedit.utilities.findDefs().appendChild(symbol);
        batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(symbol))
      }
      var use_el = svgdoc.createElementNS(NS.SVG, "use");
      use_el.id = getNextId();
      setHref(use_el, "#" + symbol.id);
      (current_group || getCurrentDrawing().getCurrentLayer()).appendChild(use_el);
      batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(use_el));
      clearSelection();
      use_el.setAttribute("transform", ts);
      svgedit.recalculate.recalculateDimensions(use_el);
      $(use_el).data("symbol", symbol).data("ref", symbol);
      addToSelection([use_el]);
      addCommandToHistory(batchCmd);
      call("changed", [svgcontent])
    }catch(e) {
      console.log(e);
      return null
    }
    return use_el
  };
  var identifyLayers = canvas.identifyLayers = function() {
    leaveContext();
    getCurrentDrawing().identifyLayers()
  };
  this.createLayer = function(name, hrService) {
    var new_layer = getCurrentDrawing().createLayer(name, historyRecordingService(hrService));
    clearSelection();
    call("changed", [new_layer])
  };
  this.cloneLayer = function(name, hrService) {
    var new_layer = getCurrentDrawing().cloneLayer(name, historyRecordingService(hrService));
    clearSelection();
    leaveContext();
    call("changed", [new_layer])
  };
  this.deleteCurrentLayer = function() {
    var current_layer = getCurrentDrawing().getCurrentLayer();
    var nextSibling = current_layer.nextSibling;
    var parent = current_layer.parentNode;
    current_layer = getCurrentDrawing().deleteCurrentLayer();
    if(current_layer) {
      var batchCmd = new svgedit.history.BatchCommand("Delete Layer");
      batchCmd.addSubCommand(new svgedit.history.RemoveElementCommand(current_layer, nextSibling, parent));
      addCommandToHistory(batchCmd);
      clearSelection();
      call("changed", [parent]);
      return true
    }
    return false
  };
  this.setCurrentLayer = function(name) {
    var result = getCurrentDrawing().setCurrentLayer(svgedit.utilities.toXml(name));
    if(result) {
      clearSelection()
    }
    return result
  };
  this.renameCurrentLayer = function(newname) {
    var drawing = getCurrentDrawing();
    var layer = drawing.getCurrentLayer();
    if(layer) {
      var result = drawing.setCurrentLayerName(newname, historyRecordingService());
      if(result) {
        call("changed", [layer]);
        return true
      }
    }
    return false
  };
  this.setCurrentLayerPosition = function(newpos) {
    var oldpos, drawing = getCurrentDrawing();
    var result = drawing.setCurrentLayerPosition(newpos);
    if(result) {
      addCommandToHistory(new svgedit.history.MoveElementCommand(result.currentGroup, result.oldNextSibling, svgcontent));
      return true
    }
    return false
  };
  this.setLayerVisibility = function(layername, bVisible) {
    var drawing = getCurrentDrawing();
    var prevVisibility = drawing.getLayerVisibility(layername);
    var layer = drawing.setLayerVisibility(layername, bVisible);
    if(layer) {
      var oldDisplay = prevVisibility ? "inline" : "none";
      addCommandToHistory(new svgedit.history.ChangeElementCommand(layer, {display:oldDisplay}, "Layer Visibility"))
    }else {
      return false
    }
    if(layer == drawing.getCurrentLayer()) {
      clearSelection();
      pathActions.clear()
    }
    return true
  };
  this.moveSelectedToLayer = function(layername) {
    var i;
    var drawing = getCurrentDrawing();
    var layer = drawing.getLayerByName(layername);
    if(!layer) {
      return false
    }
    var batchCmd = new svgedit.history.BatchCommand("Move Elements to Layer");
    var selElems = selectedElements;
    i = selElems.length;
    while(i--) {
      var elem = selElems[i];
      if(!elem) {
        continue
      }
      var oldNextSibling = elem.nextSibling;
      var oldLayer = elem.parentNode;
      layer.appendChild(elem);
      batchCmd.addSubCommand(new svgedit.history.MoveElementCommand(elem, oldNextSibling, oldLayer))
    }
    addCommandToHistory(batchCmd);
    return true
  };
  this.mergeLayer = function(hrService) {
    getCurrentDrawing().mergeLayer(historyRecordingService(hrService));
    clearSelection();
    leaveContext();
    call("changed", [svgcontent])
  };
  this.mergeAllLayers = function(hrService) {
    getCurrentDrawing().mergeAllLayers(historyRecordingService(hrService));
    clearSelection();
    leaveContext();
    call("changed", [svgcontent])
  };
  var leaveContext = this.leaveContext = function() {
    var i, len = disabled_elems.length;
    if(len) {
      for(i = 0;i < len;i++) {
        var elem = disabled_elems[i];
        var orig = elData(elem, "orig_opac");
        if(orig !== 1) {
          elem.setAttribute("opacity", orig)
        }else {
          elem.removeAttribute("opacity")
        }
        elem.setAttribute("style", "pointer-events: inherit")
      }
      disabled_elems = [];
      clearSelection(true);
      call("contextset", null)
    }
    current_group = null
  };
  var setContext = this.setContext = function(elem) {
    leaveContext();
    if(typeof elem === "string") {
      elem = svgedit.utilities.getElem(elem)
    }
    current_group = elem;
    $(elem).parentsUntil("#svgcontent").andSelf().siblings().each(function() {
      var opac = this.getAttribute("opacity") || 1;
      elData(this, "orig_opac", opac);
      this.setAttribute("opacity", opac * 0.33);
      this.setAttribute("style", "pointer-events: none");
      disabled_elems.push(this)
    });
    clearSelection();
    call("contextset", current_group)
  };
  this.clear = function() {
    pathActions.clear();
    clearSelection();
    canvas.clearSvgContentElement();
    canvas.current_drawing_ = new svgedit.draw.Drawing(svgcontent);
    canvas.createLayer("Layer 1");
    canvas.undoMgr.resetUndoStack();
    selectorManager.initGroup();
    rubberBox = selectorManager.getRubberBandBox();
    call("cleared")
  };
  this.linkControlPoints = pathActions.linkControlPoints;
  this.getContentElem = function() {
    return svgcontent
  };
  this.getRootElem = function() {
    return svgroot
  };
  this.getSelectedElems = function() {
    return selectedElements
  };
  var getResolution = this.getResolution = function() {
    var width = svgcontent.getAttribute("width") / current_zoom;
    var height = svgcontent.getAttribute("height") / current_zoom;
    return{w:width, h:height, zoom:current_zoom}
  };
  this.getZoom = function() {
    return current_zoom
  };
  this.getSnapToGrid = function() {
    return curConfig.gridSnapping
  };
  this.getVersion = function() {
    return"svgcanvas.js ($Rev$)"
  };
  this.setUiStrings = function(strs) {
    $.extend(uiStrings, strs.notification)
  };
  this.setConfig = function(opts) {
    $.extend(curConfig, opts)
  };
  this.getTitle = function(elem) {
    var i;
    elem = elem || selectedElements[0];
    if(!elem) {
      return
    }
    elem = $(elem).data("gsvg") || $(elem).data("symbol") || elem;
    var childs = elem.childNodes;
    for(i = 0;i < childs.length;i++) {
      if(childs[i].nodeName == "title") {
        return childs[i].textContent
      }
    }
    return""
  };
  this.setGroupTitle = function(val) {
    var elem = selectedElements[0];
    elem = $(elem).data("gsvg") || elem;
    var ts = $(elem).children("title");
    var batchCmd = new svgedit.history.BatchCommand("Set Label");
    if(!val.length) {
      var tsNextSibling = ts.nextSibling;
      batchCmd.addSubCommand(new svgedit.history.RemoveElementCommand(ts[0], tsNextSibling, elem));
      ts.remove()
    }else {
      if(ts.length) {
        var title = ts[0];
        batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(title, {"#text":title.textContent}));
        title.textContent = val
      }else {
        title = svgdoc.createElementNS(NS.SVG, "title");
        title.textContent = val;
        $(elem).prepend(title);
        batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(title))
      }
    }
    addCommandToHistory(batchCmd)
  };
  var getDocumentTitle = this.getDocumentTitle = function() {
    return canvas.getTitle(svgcontent)
  };
  this.setDocumentTitle = function(newtitle) {
    var i;
    var childs = svgcontent.childNodes, doc_title = false, old_title = "";
    var batchCmd = new svgedit.history.BatchCommand("Change Image Title");
    for(i = 0;i < childs.length;i++) {
      if(childs[i].nodeName == "title") {
        doc_title = childs[i];
        old_title = doc_title.textContent;
        break
      }
    }
    if(!doc_title) {
      doc_title = svgdoc.createElementNS(NS.SVG, "title");
      svgcontent.insertBefore(doc_title, svgcontent.firstChild)
    }
    if(newtitle.length) {
      doc_title.textContent = newtitle
    }else {
      doc_title.parentNode.removeChild(doc_title)
    }
    batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(doc_title, {"#text":old_title}));
    addCommandToHistory(batchCmd)
  };
  this.getEditorNS = function(add) {
    if(add) {
      svgcontent.setAttribute("xmlns:se", NS.SE)
    }
    return NS.SE
  };
  this.setResolution = function(x, y) {
    var res = getResolution();
    var w = res.w, h = res.h;
    var batchCmd;
    if(x == "fit") {
      var bbox = getStrokedBBox();
      if(bbox) {
        batchCmd = new svgedit.history.BatchCommand("Fit Canvas to Content");
        var visEls = getVisibleElements();
        addToSelection(visEls);
        var dx = [], dy = [];
        $.each(visEls, function(i, item) {
          dx.push(bbox.x * -1);
          dy.push(bbox.y * -1)
        });
        var cmd = canvas.moveSelectedElements(dx, dy, true);
        batchCmd.addSubCommand(cmd);
        clearSelection();
        x = Math.round(bbox.width);
        y = Math.round(bbox.height)
      }else {
        return false
      }
    }
    if(x != w || y != h) {
      if(!batchCmd) {
        batchCmd = new svgedit.history.BatchCommand("Change Image Dimensions")
      }
      x = svgedit.units.convertToNum("width", x);
      y = svgedit.units.convertToNum("height", y);
      svgcontent.setAttribute("width", x);
      svgcontent.setAttribute("height", y);
      this.contentW = x;
      this.contentH = y;
      batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(svgcontent, {width:w, height:h}));
      svgcontent.setAttribute("viewBox", [0, 0, x / current_zoom, y / current_zoom].join(" "));
      batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(svgcontent, {viewBox:["0 0", w, h].join(" ")}));
      addCommandToHistory(batchCmd);
      call("changed", [svgcontent])
    }
    return true
  };
  this.getOffset = function() {
    return $(svgcontent).attr(["x", "y"])
  };
  this.setBBoxZoom = function(val, editor_w, editor_h) {
    var spacer = 0.85;
    var bb;
    var calcZoom = function(bb) {
      if(!bb) {
        return false
      }
      var w_zoom = Math.round(editor_w / bb.width * 100 * spacer) / 100;
      var h_zoom = Math.round(editor_h / bb.height * 100 * spacer) / 100;
      var zoomlevel = Math.min(w_zoom, h_zoom);
      canvas.setZoom(zoomlevel);
      return{zoom:zoomlevel, bbox:bb}
    };
    if(typeof val == "object") {
      bb = val;
      if(bb.width == 0 || bb.height == 0) {
        var newzoom = bb.zoom ? bb.zoom : current_zoom * bb.factor;
        canvas.setZoom(newzoom);
        return{zoom:current_zoom, bbox:bb}
      }
      return calcZoom(bb)
    }
    switch(val) {
      case "selection":
        if(!selectedElements[0]) {
          return
        }
        var sel_elems = $.map(selectedElements, function(n) {
          if(n) {
            return n
          }
        });
        bb = getStrokedBBox(sel_elems);
        break;
      case "canvas":
        var res = getResolution();
        spacer = 0.95;
        bb = {width:res.w, height:res.h, x:0, y:0};
        break;
      case "content":
        bb = getStrokedBBox();
        break;
      case "layer":
        bb = getStrokedBBox(getVisibleElements(getCurrentDrawing().getCurrentLayer()));
        break;
      default:
        return
    }
    return calcZoom(bb)
  };
  this.setZoom = function(zoomlevel) {
    var res = getResolution();
    svgcontent.setAttribute("viewBox", "0 0 " + res.w / zoomlevel + " " + res.h / zoomlevel);
    current_zoom = zoomlevel;
    $.each(selectedElements, function(i, elem) {
      if(!elem) {
        return
      }
      selectorManager.requestSelector(elem).resize()
    });
    pathActions.zoomChange();
    runExtensions("zoomChanged", zoomlevel)
  };
  this.getMode = function() {
    return current_mode
  };
  this.setMode = function(name) {
    pathActions.clear(true);
    textActions.clear();
    cur_properties = selectedElements[0] && selectedElements[0].nodeName == "text" ? cur_text : cur_shape;
    current_mode = name
  };
  this.getColor = function(type) {
    return cur_properties[type]
  };
  this.setColor = function(type, val, preventUndo) {
    cur_shape[type] = val;
    cur_properties[type + "_paint"] = {type:"solidColor"};
    var elems = [];
    function addNonG(e) {
      if(e.nodeName != "g") {
        elems.push(e)
      }
    }
    var i = selectedElements.length;
    while(i--) {
      var elem = selectedElements[i];
      if(elem) {
        if(elem.tagName == "g") {
          svgedit.utilities.walkTree(elem, addNonG)
        }else {
          if(type == "fill") {
            if(elem.tagName != "polyline" && elem.tagName != "line") {
              elems.push(elem)
            }
          }else {
            elems.push(elem)
          }
        }
      }
    }
    if(elems.length > 0) {
      if(!preventUndo) {
        changeSelectedAttribute(type, val, elems);
        call("changed", elems)
      }else {
        changeSelectedAttributeNoUndo(type, val, elems)
      }
    }
  };
  var setGradient = this.setGradient = function(type) {
    if(!cur_properties[type + "_paint"] || cur_properties[type + "_paint"].type == "solidColor") {
      return
    }
    var grad = canvas[type + "Grad"];
    var duplicate_grad = findDuplicateGradient(grad);
    var defs = svgedit.utilities.findDefs();
    if(!duplicate_grad) {
      var orig_grad = grad;
      grad = defs.appendChild(svgdoc.importNode(grad, true));
      grad.id = getNextId()
    }else {
      grad = duplicate_grad
    }
    canvas.setColor(type, "url(#" + grad.id + ")")
  };
  var findDuplicateGradient = function(grad) {
    var defs = svgedit.utilities.findDefs();
    var existing_grads = $(defs).find("linearGradient, radialGradient");
    var i = existing_grads.length;
    var rad_attrs = ["r", "cx", "cy", "fx", "fy"];
    while(i--) {
      var og = existing_grads[i];
      if(grad.tagName == "linearGradient") {
        if(grad.getAttribute("x1") != og.getAttribute("x1") || grad.getAttribute("y1") != og.getAttribute("y1") || grad.getAttribute("x2") != og.getAttribute("x2") || grad.getAttribute("y2") != og.getAttribute("y2")) {
          continue
        }
      }else {
        var grad_attrs = $(grad).attr(rad_attrs);
        var og_attrs = $(og).attr(rad_attrs);
        var diff = false;
        $.each(rad_attrs, function(i, attr) {
          if(grad_attrs[attr] != og_attrs[attr]) {
            diff = true
          }
        });
        if(diff) {
          continue
        }
      }
      var stops = grad.getElementsByTagNameNS(NS.SVG, "stop");
      var ostops = og.getElementsByTagNameNS(NS.SVG, "stop");
      if(stops.length != ostops.length) {
        continue
      }
      var j = stops.length;
      while(j--) {
        var stop = stops[j];
        var ostop = ostops[j];
        if(stop.getAttribute("offset") != ostop.getAttribute("offset") || stop.getAttribute("stop-opacity") != ostop.getAttribute("stop-opacity") || stop.getAttribute("stop-color") != ostop.getAttribute("stop-color")) {
          break
        }
      }
      if(j == -1) {
        return og
      }
    }
    return null
  };
  function reorientGrads(elem, m) {
    var i;
    var bb = svgedit.utilities.getBBox(elem);
    for(i = 0;i < 2;i++) {
      var type = i === 0 ? "fill" : "stroke";
      var attrVal = elem.getAttribute(type);
      if(attrVal && attrVal.indexOf("url(") === 0) {
        var grad = svgedit.utilities.getRefElem(attrVal);
        if(grad.tagName === "linearGradient") {
          var x1 = grad.getAttribute("x1") || 0;
          var y1 = grad.getAttribute("y1") || 0;
          var x2 = grad.getAttribute("x2") || 1;
          var y2 = grad.getAttribute("y2") || 0;
          x1 = bb.width * x1 + bb.x;
          y1 = bb.height * y1 + bb.y;
          x2 = bb.width * x2 + bb.x;
          y2 = bb.height * y2 + bb.y;
          var pt1 = svgedit.math.transformPoint(x1, y1, m);
          var pt2 = svgedit.math.transformPoint(x2, y2, m);
          var g_coords = {};
          g_coords.x1 = (pt1.x - bb.x) / bb.width;
          g_coords.y1 = (pt1.y - bb.y) / bb.height;
          g_coords.x2 = (pt2.x - bb.x) / bb.width;
          g_coords.y2 = (pt2.y - bb.y) / bb.height;
          var newgrad = grad.cloneNode(true);
          $(newgrad).attr(g_coords);
          newgrad.id = getNextId();
          svgedit.utilities.findDefs().appendChild(newgrad);
          elem.setAttribute(type, "url(#" + newgrad.id + ")")
        }
      }
    }
  }
  this.setPaint = function(type, paint) {
    var p = new $.jGraduate.Paint(paint);
    this.setPaintOpacity(type, p.alpha / 100, true);
    cur_properties[type + "_paint"] = p;
    switch(p.type) {
      case "solidColor":
        this.setColor(type, p.solidColor != "none" ? "#" + p.solidColor : "none");
        break;
      case "linearGradient":
      ;
      case "radialGradient":
        canvas[type + "Grad"] = p[p.type];
        setGradient(type);
        break
    }
  };
  this.setStrokePaint = function(paint) {
    this.setPaint("stroke", paint)
  };
  this.setFillPaint = function(paint) {
    this.setPaint("fill", paint)
  };
  this.getStrokeWidth = function() {
    return cur_properties.stroke_width
  };
  this.setStrokeWidth = function(val) {
    if(val == 0 && ["line", "path"].indexOf(current_mode) >= 0) {
      canvas.setStrokeWidth(1);
      return
    }
    cur_properties.stroke_width = val;
    var elems = [];
    function addNonG(e) {
      if(e.nodeName != "g") {
        elems.push(e)
      }
    }
    var i = selectedElements.length;
    while(i--) {
      var elem = selectedElements[i];
      if(elem) {
        if(elem.tagName == "g") {
          svgedit.utilities.walkTree(elem, addNonG)
        }else {
          elems.push(elem)
        }
      }
    }
    if(elems.length > 0) {
      changeSelectedAttribute("stroke-width", val, elems);
      call("changed", selectedElements)
    }
  };
  this.setStrokeAttr = function(attr, val) {
    cur_shape[attr.replace("-", "_")] = val;
    var elems = [];
    function addNonG(e) {
      if(e.nodeName != "g") {
        elems.push(e)
      }
    }
    var i = selectedElements.length;
    while(i--) {
      var elem = selectedElements[i];
      if(elem) {
        if(elem.tagName == "g") {
          svgedit.utilities.walkTree(elem, function(e) {
            if(e.nodeName != "g") {
              elems.push(e)
            }
          })
        }else {
          elems.push(elem)
        }
      }
    }
    if(elems.length > 0) {
      changeSelectedAttribute(attr, val, elems);
      call("changed", selectedElements)
    }
  };
  this.getStyle = function() {
    return cur_shape
  };
  this.getOpacity = function() {
    return cur_shape.opacity
  };
  this.setOpacity = function(val) {
    cur_shape.opacity = val;
    changeSelectedAttribute("opacity", val)
  };
  this.getFillOpacity = function() {
    return cur_shape.fill_opacity
  };
  this.getStrokeOpacity = function() {
    return cur_shape.stroke_opacity
  };
  this.setPaintOpacity = function(type, val, preventUndo) {
    cur_shape[type + "_opacity"] = val;
    if(!preventUndo) {
      changeSelectedAttribute(type + "-opacity", val)
    }else {
      changeSelectedAttributeNoUndo(type + "-opacity", val)
    }
  };
  this.getPaintOpacity = function(type) {
    return type === "fill" ? this.getFillOpacity() : this.getStrokeOpacity()
  };
  this.getBlur = function(elem) {
    var val = 0;
    if(elem) {
      var filter_url = elem.getAttribute("filter");
      if(filter_url) {
        var blur = svgedit.utilities.getElem(elem.id + "_blur");
        if(blur) {
          val = blur.firstChild.getAttribute("stdDeviation")
        }
      }
    }
    return val
  };
  (function() {
    var cur_command = null;
    var filter = null;
    var filterHidden = false;
    canvas.setBlurNoUndo = function(val) {
      if(!filter) {
        canvas.setBlur(val);
        return
      }
      if(val === 0) {
        changeSelectedAttributeNoUndo("filter", "");
        filterHidden = true
      }else {
        var elem = selectedElements[0];
        if(filterHidden) {
          changeSelectedAttributeNoUndo("filter", "url(#" + elem.id + "_blur)")
        }
        if(svgedit.browser.isWebkit()) {
          console.log("e", elem);
          elem.removeAttribute("filter");
          elem.setAttribute("filter", "url(#" + elem.id + "_blur)")
        }
        changeSelectedAttributeNoUndo("stdDeviation", val, [filter.firstChild]);
        canvas.setBlurOffsets(filter, val)
      }
    };
    function finishChange() {
      var bCmd = canvas.undoMgr.finishUndoableChange();
      cur_command.addSubCommand(bCmd);
      addCommandToHistory(cur_command);
      cur_command = null;
      filter = null
    }
    canvas.setBlurOffsets = function(filter, stdDev) {
      if(stdDev > 3) {
        svgedit.utilities.assignAttributes(filter, {x:"-50%", y:"-50%", width:"200%", height:"200%"}, 100)
      }else {
        if(!svgedit.browser.isWebkit()) {
          filter.removeAttribute("x");
          filter.removeAttribute("y");
          filter.removeAttribute("width");
          filter.removeAttribute("height")
        }
      }
    };
    canvas.setBlur = function(val, complete) {
      if(cur_command) {
        finishChange();
        return
      }
      var elem = selectedElements[0];
      var elem_id = elem.id;
      filter = svgedit.utilities.getElem(elem_id + "_blur");
      val -= 0;
      var batchCmd = new svgedit.history.BatchCommand;
      if(filter) {
        if(val === 0) {
          filter = null
        }
      }else {
        var newblur = addSvgElementFromJson({element:"feGaussianBlur", attr:{"in":"SourceGraphic", stdDeviation:val}});
        filter = addSvgElementFromJson({element:"filter", attr:{id:elem_id + "_blur"}});
        filter.appendChild(newblur);
        svgedit.utilities.findDefs().appendChild(filter);
        batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(filter))
      }
      var changes = {filter:elem.getAttribute("filter")};
      if(val === 0) {
        elem.removeAttribute("filter");
        batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(elem, changes));
        return
      }
      changeSelectedAttribute("filter", "url(#" + elem_id + "_blur)");
      batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(elem, changes));
      canvas.setBlurOffsets(filter, val);
      cur_command = batchCmd;
      canvas.undoMgr.beginUndoableChange("stdDeviation", [filter ? filter.firstChild : null]);
      if(complete) {
        canvas.setBlurNoUndo(val);
        finishChange()
      }
    }
  })();
  this.getBold = function() {
    var selected = selectedElements[0];
    if(selected != null && selected.tagName == "text" && selectedElements[1] == null) {
      return selected.getAttribute("font-weight") == "bold"
    }
    return false
  };
  this.setBold = function(b) {
    var selected = selectedElements[0];
    if(selected != null && selected.tagName == "text" && selectedElements[1] == null) {
      changeSelectedAttribute("font-weight", b ? "bold" : "normal")
    }
    if(!selectedElements[0].textContent) {
      textActions.setCursor()
    }
  };
  this.getItalic = function() {
    var selected = selectedElements[0];
    if(selected != null && selected.tagName == "text" && selectedElements[1] == null) {
      return selected.getAttribute("font-style") == "italic"
    }
    return false
  };
  this.setItalic = function(i) {
    var selected = selectedElements[0];
    if(selected != null && selected.tagName == "text" && selectedElements[1] == null) {
      changeSelectedAttribute("font-style", i ? "italic" : "normal")
    }
    if(!selectedElements[0].textContent) {
      textActions.setCursor()
    }
  };
  this.getFontFamily = function() {
    return cur_text.font_family
  };
  this.setFontFamily = function(val) {
    cur_text.font_family = val;
    changeSelectedAttribute("font-family", val);
    if(selectedElements[0] && !selectedElements[0].textContent) {
      textActions.setCursor()
    }
  };
  this.setFontColor = function(val) {
    cur_text.fill = val;
    changeSelectedAttribute("fill", val)
  };
  this.getFontColor = function() {
    return cur_text.fill
  };
  this.getFontSize = function() {
    return cur_text.font_size
  };
  this.setFontSize = function(val) {
    cur_text.font_size = val;
    changeSelectedAttribute("font-size", val);
    if(!selectedElements[0].textContent) {
      textActions.setCursor()
    }
  };
  this.getText = function() {
    var selected = selectedElements[0];
    if(selected == null) {
      return""
    }
    return selected.textContent
  };
  this.setTextContent = function(val) {
    changeSelectedAttribute("#text", val);
    textActions.init(val);
    textActions.setCursor()
  };
  this.setImageURL = function(val) {
    var elem = selectedElements[0];
    if(!elem) {
      return
    }
    var attrs = $(elem).attr(["width", "height"]);
    var setsize = !attrs.width || !attrs.height;
    var cur_href = getHref(elem);
    if(cur_href !== val) {
      setsize = true
    }else {
      if(!setsize) {
        return
      }
    }
    var batchCmd = new svgedit.history.BatchCommand("Change Image URL");
    setHref(elem, val);
    batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(elem, {"#href":cur_href}));
    if(setsize) {
      $(new Image).load(function() {
        var changes = $(elem).attr(["width", "height"]);
        $(elem).attr({width:this.width, height:this.height});
        selectorManager.requestSelector(elem).resize();
        batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(elem, changes));
        addCommandToHistory(batchCmd);
        call("changed", [elem])
      }).attr("src", val)
    }else {
      addCommandToHistory(batchCmd)
    }
  };
  this.setLinkURL = function(val) {
    var elem = selectedElements[0];
    if(!elem) {
      return
    }
    if(elem.tagName !== "a") {
      var parents_a = $(elem).parents("a");
      if(parents_a.length) {
        elem = parents_a[0]
      }else {
        return
      }
    }
    var cur_href = getHref(elem);
    if(cur_href === val) {
      return
    }
    var batchCmd = new svgedit.history.BatchCommand("Change Link URL");
    setHref(elem, val);
    batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(elem, {"#href":cur_href}));
    addCommandToHistory(batchCmd)
  };
  this.setRectRadius = function(val) {
    var selected = selectedElements[0];
    if(selected != null && selected.tagName == "rect") {
      var r = selected.getAttribute("rx");
      if(r != val) {
        selected.setAttribute("rx", val);
        selected.setAttribute("ry", val);
        addCommandToHistory(new svgedit.history.ChangeElementCommand(selected, {rx:r, ry:r}, "Radius"));
        call("changed", [selected])
      }
    }
  };
  this.makeHyperlink = function(url) {
    canvas.groupSelectedElements("a", url)
  };
  this.removeHyperlink = function() {
    canvas.ungroupSelectedElement()
  };
  this.setSegType = function(new_type) {
    pathActions.setSegType(new_type)
  };
  this.convertToPath = function(elem, getBBox) {
    if(elem == null) {
      var elems = selectedElements;
      $.each(elems, function(i, elem) {
        if(elem) {
          canvas.convertToPath(elem)
        }
      });
      return
    }
    if(getBBox) {
      return svgedit.utilities.getBBoxOfElementAsPath(elem, addSvgElementFromJson, pathActions)
    }else {
      var attrs = {fill:cur_shape.fill, "fill-opacity":cur_shape.fill_opacity, stroke:cur_shape.stroke, "stroke-width":cur_shape.stroke_width, "stroke-dasharray":cur_shape.stroke_dasharray, "stroke-linejoin":cur_shape.stroke_linejoin, "stroke-linecap":cur_shape.stroke_linecap, "stroke-opacity":cur_shape.stroke_opacity, opacity:cur_shape.opacity, visibility:"hidden"};
      return svgedit.utilities.convertToPath(elem, attrs, addSvgElementFromJson, pathActions, clearSelection, addToSelection, svgedit.history, addCommandToHistory)
    }
  };
  var changeSelectedAttributeNoUndo = function(attr, newValue, elems) {
    if(current_mode == "pathedit") {
      pathActions.moveNode(attr, newValue)
    }
    elems = elems || selectedElements;
    var i = elems.length;
    var no_xy_elems = ["g", "polyline", "path"];
    var good_g_attrs = ["transform", "opacity", "filter"];
    while(i--) {
      var elem = elems[i];
      if(elem == null) {
        continue
      }
      if((attr === "x" || attr === "y") && no_xy_elems.indexOf(elem.tagName) >= 0) {
        var bbox = getStrokedBBox([elem]);
        var diff_x = attr === "x" ? newValue - bbox.x : 0;
        var diff_y = attr === "y" ? newValue - bbox.y : 0;
        canvas.moveSelectedElements(diff_x * current_zoom, diff_y * current_zoom, true);
        continue
      }
      if(elem.tagName === "g" && good_g_attrs.indexOf(attr) >= 0) {
      }
      var oldval = attr === "#text" ? elem.textContent : elem.getAttribute(attr);
      if(oldval == null) {
        oldval = ""
      }
      if(oldval !== String(newValue)) {
        if(attr == "#text") {
          var old_w = svgedit.utilities.getBBox(elem).width;
          elem.textContent = newValue;
          if(/rotate/.test(elem.getAttribute("transform"))) {
            elem = ffClone(elem)
          }
        }else {
          if(attr == "#href") {
            setHref(elem, newValue)
          }else {
            elem.setAttribute(attr, newValue)
          }
        }
        if(current_mode === "textedit" && attr !== "#text" && elem.textContent.length) {
          textActions.toSelectMode(elem)
        }
        if(svgedit.browser.isGecko() && elem.nodeName === "text" && /rotate/.test(elem.getAttribute("transform"))) {
          if(String(newValue).indexOf("url") === 0 || ["font-size", "font-family", "x", "y"].indexOf(attr) >= 0 && elem.textContent) {
            elem = ffClone(elem)
          }
        }
        if(selectedElements.indexOf(elem) >= 0) {
          setTimeout(function() {
            if(!elem.parentNode) {
              return
            }
            selectorManager.requestSelector(elem).resize()
          }, 0)
        }
        var angle = svgedit.utilities.getRotationAngle(elem);
        if(angle != 0 && attr != "transform") {
          var tlist = svgedit.transformlist.getTransformList(elem);
          var n = tlist.numberOfItems;
          while(n--) {
            var xform = tlist.getItem(n);
            if(xform.type == 4) {
              tlist.removeItem(n);
              var box = svgedit.utilities.getBBox(elem);
              var center = svgedit.math.transformPoint(box.x + box.width / 2, box.y + box.height / 2, svgedit.math.transformListToTransform(tlist).matrix);
              var cx = center.x, cy = center.y;
              var newrot = svgroot.createSVGTransform();
              newrot.setRotate(angle, cx, cy);
              tlist.insertItemBefore(newrot, n);
              break
            }
          }
        }
      }
    }
  };
  var changeSelectedAttribute = this.changeSelectedAttribute = function(attr, val, elems) {
    elems = elems || selectedElements;
    canvas.undoMgr.beginUndoableChange(attr, elems);
    var i = elems.length;
    changeSelectedAttributeNoUndo(attr, val, elems);
    var batchCmd = canvas.undoMgr.finishUndoableChange();
    if(!batchCmd.isEmpty()) {
      addCommandToHistory(batchCmd)
    }
  };
  this.deleteSelectedElements = function() {
    var i;
    var batchCmd = new svgedit.history.BatchCommand("Delete Elements");
    var len = selectedElements.length;
    var selectedCopy = [];
    for(i = 0;i < len;++i) {
      var selected = selectedElements[i];
      if(selected == null) {
        break
      }
      var parent = selected.parentNode;
      var t = selected;
      selectorManager.releaseSelector(t);
      svgedit.path.removePath_(t.id);
      if(parent.tagName === "a" && parent.childNodes.length === 1) {
        t = parent;
        parent = parent.parentNode
      }
      var nextSibling = t.nextSibling;
      var elem = parent.removeChild(t);
      selectedCopy.push(selected);
      selectedElements[i] = null;
      batchCmd.addSubCommand(new RemoveElementCommand(elem, nextSibling, parent))
    }
    if(!batchCmd.isEmpty()) {
      addCommandToHistory(batchCmd)
    }
    call("changed", selectedCopy);
    clearSelection()
  };
  this.cutSelectedElements = function() {
    var i;
    var batchCmd = new svgedit.history.BatchCommand("Cut Elements");
    var len = selectedElements.length;
    var selectedCopy = [];
    for(i = 0;i < len;++i) {
      var selected = selectedElements[i];
      if(selected == null) {
        break
      }
      var parent = selected.parentNode;
      var t = selected;
      selectorManager.releaseSelector(t);
      svgedit.path.removePath_(t.id);
      var nextSibling = t.nextSibling;
      var elem = parent.removeChild(t);
      selectedCopy.push(selected);
      selectedElements[i] = null;
      batchCmd.addSubCommand(new RemoveElementCommand(elem, nextSibling, parent))
    }
    if(!batchCmd.isEmpty()) {
      addCommandToHistory(batchCmd)
    }
    call("changed", selectedCopy);
    clearSelection();
    canvas.clipBoard = selectedCopy
  };
  this.copySelectedElements = function() {
    canvas.clipBoard = $.merge([], selectedElements)
  };
  this.pasteElements = function(type, x, y) {
    var cb = canvas.clipBoard;
    var len = cb.length;
    if(!len) {
      return
    }
    var pasted = [];
    var batchCmd = new svgedit.history.BatchCommand("Paste elements");
    var drawing = getCurrentDrawing();
    while(len--) {
      var elem = cb[len];
      if(!elem) {
        continue
      }
      var copy = drawing.copyElem(elem);
      if(!svgedit.utilities.getElem(elem.id)) {
        copy.id = elem.id
      }
      pasted.push(copy);
      (current_group || drawing.getCurrentLayer()).appendChild(copy);
      batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(copy));
      restoreRefElems(copy)
    }
    selectOnly(pasted);
    if(type !== "in_place") {
      var ctr_x, ctr_y;
      if(!type) {
        ctr_x = lastClickPoint.x;
        ctr_y = lastClickPoint.y
      }else {
        if(type === "point") {
          ctr_x = x;
          ctr_y = y
        }
      }
      var bbox = getStrokedBBox(pasted);
      var cx = ctr_x - (bbox.x + bbox.width / 2), cy = ctr_y - (bbox.y + bbox.height / 2), dx = [], dy = [];
      $.each(pasted, function(i, item) {
        dx.push(cx);
        dy.push(cy)
      });
      var cmd = canvas.moveSelectedElements(dx, dy, false);
      batchCmd.addSubCommand(cmd)
    }
    addCommandToHistory(batchCmd);
    call("changed", pasted)
  };
  this.groupSelectedElements = function(type, urlArg) {
    if(!type) {
      type = "g"
    }
    var cmd_str = "";
    switch(type) {
      case "a":
        cmd_str = "Make hyperlink";
        var url = "";
        if(arguments.length > 1) {
          url = urlArg
        }
        break;
      default:
        type = "g";
        cmd_str = "Group Elements";
        break
    }
    var batchCmd = new svgedit.history.BatchCommand(cmd_str);
    var g = addSvgElementFromJson({element:type, attr:{id:getNextId()}});
    if(type === "a") {
      setHref(g, url)
    }
    batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(g));
    var i = selectedElements.length;
    while(i--) {
      var elem = selectedElements[i];
      if(elem == null) {
        continue
      }
      if(elem.parentNode.tagName === "a" && elem.parentNode.childNodes.length === 1) {
        elem = elem.parentNode
      }
      var oldNextSibling = elem.nextSibling;
      var oldParent = elem.parentNode;
      g.appendChild(elem);
      batchCmd.addSubCommand(new svgedit.history.MoveElementCommand(elem, oldNextSibling, oldParent))
    }
    if(!batchCmd.isEmpty()) {
      addCommandToHistory(batchCmd)
    }
    selectOnly([g], true)
  };
  var pushGroupProperties = this.pushGroupProperties = function(g, undoable) {
    var children = g.childNodes;
    var len = children.length;
    var xform = g.getAttribute("transform");
    var glist = svgedit.transformlist.getTransformList(g);
    var m = svgedit.math.transformListToTransform(glist).matrix;
    var batchCmd = new svgedit.history.BatchCommand("Push group properties");
    var i = 0;
    var gangle = svgedit.utilities.getRotationAngle(g);
    var gattrs = $(g).attr(["filter", "opacity"]);
    var gfilter, gblur, changes;
    var drawing = getCurrentDrawing();
    for(i = 0;i < len;i++) {
      var elem = children[i];
      if(elem.nodeType !== 1) {
        continue
      }
      if(gattrs.opacity !== null && gattrs.opacity !== 1) {
        var c_opac = elem.getAttribute("opacity") || 1;
        var new_opac = Math.round((elem.getAttribute("opacity") || 1) * gattrs.opacity * 100) / 100;
        changeSelectedAttribute("opacity", new_opac, [elem])
      }
      if(gattrs.filter) {
        var cblur = this.getBlur(elem);
        var orig_cblur = cblur;
        if(!gblur) {
          gblur = this.getBlur(g)
        }
        if(cblur) {
          cblur = Number(gblur) + Number(cblur)
        }else {
          if(cblur === 0) {
            cblur = gblur
          }
        }
        if(!orig_cblur) {
          if(!gfilter) {
            gfilter = svgedit.utilities.getRefElem(gattrs.filter)
          }else {
            gfilter = drawing.copyElem(gfilter);
            svgedit.utilities.findDefs().appendChild(gfilter)
          }
        }else {
          gfilter = svgedit.utilities.getRefElem(elem.getAttribute("filter"))
        }
        var suffix = gfilter.firstChild.tagName === "feGaussianBlur" ? "blur" : "filter";
        gfilter.id = elem.id + "_" + suffix;
        changeSelectedAttribute("filter", "url(#" + gfilter.id + ")", [elem]);
        if(cblur) {
          changeSelectedAttribute("stdDeviation", cblur, [gfilter.firstChild]);
          canvas.setBlurOffsets(gfilter, cblur)
        }
      }
      var chtlist = svgedit.transformlist.getTransformList(elem);
      if(~elem.tagName.indexOf("Gradient")) {
        chtlist = null
      }
      if(!chtlist) {
        continue
      }
      if(elem.tagName === "defs") {
        continue
      }
      if(glist.numberOfItems) {
        if(gangle && glist.numberOfItems == 1) {
          var rgm = glist.getItem(0).matrix;
          var rcm = svgroot.createSVGMatrix();
          var cangle = svgedit.utilities.getRotationAngle(elem);
          if(cangle) {
            rcm = chtlist.getItem(0).matrix
          }
          var cbox = svgedit.utilities.getBBox(elem);
          var ceqm = svgedit.math.transformListToTransform(chtlist).matrix;
          var coldc = svgedit.math.transformPoint(cbox.x + cbox.width / 2, cbox.y + cbox.height / 2, ceqm);
          var sangle = gangle + cangle;
          var r2 = svgroot.createSVGTransform();
          r2.setRotate(sangle, coldc.x, coldc.y);
          var trm = svgedit.math.matrixMultiply(rgm, rcm, r2.matrix.inverse());
          if(cangle) {
            chtlist.removeItem(0)
          }
          if(sangle) {
            if(chtlist.numberOfItems) {
              chtlist.insertItemBefore(r2, 0)
            }else {
              chtlist.appendItem(r2)
            }
          }
          if(trm.e || trm.f) {
            var tr = svgroot.createSVGTransform();
            tr.setTranslate(trm.e, trm.f);
            if(chtlist.numberOfItems) {
              chtlist.insertItemBefore(tr, 0)
            }else {
              chtlist.appendItem(tr)
            }
          }
        }else {
          var oldxform = elem.getAttribute("transform");
          changes = {};
          changes.transform = oldxform || "";
          var newxform = svgroot.createSVGTransform();
          var chm = svgedit.math.transformListToTransform(chtlist).matrix, chm_inv = chm.inverse();
          var gm = svgedit.math.matrixMultiply(chm_inv, m, chm);
          newxform.setMatrix(gm);
          chtlist.appendItem(newxform)
        }
        var cmd = svgedit.recalculate.recalculateDimensions(elem);
        if(cmd) {
          batchCmd.addSubCommand(cmd)
        }
      }
    }
    if(xform) {
      changes = {};
      changes.transform = xform;
      g.setAttribute("transform", "");
      g.removeAttribute("transform");
      batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(g, changes))
    }
    if(undoable && !batchCmd.isEmpty()) {
      return batchCmd
    }
  };
  this.ungroupSelectedElement = function() {
    var g = selectedElements[0];
    if(!g) {
      return
    }
    if($(g).data("gsvg") || $(g).data("symbol")) {
      convertToGroup(g);
      return
    }
    if(g.tagName === "use") {
      var symbol = svgedit.utilities.getElem(getHref(g).substr(1));
      $(g).data("symbol", symbol).data("ref", symbol);
      convertToGroup(g);
      return
    }
    var parents_a = $(g).parents("a");
    if(parents_a.length) {
      g = parents_a[0]
    }
    if(g.tagName === "g" || g.tagName === "a") {
      var batchCmd = new svgedit.history.BatchCommand("Ungroup Elements");
      var cmd = pushGroupProperties(g, true);
      if(cmd) {
        batchCmd.addSubCommand(cmd)
      }
      var parent = g.parentNode;
      var anchor = g.nextSibling;
      var children = new Array(g.childNodes.length);
      var i = 0;
      while(g.firstChild) {
        var elem = g.firstChild;
        var oldNextSibling = elem.nextSibling;
        var oldParent = elem.parentNode;
        if(elem.tagName === "title") {
          var nextSibling = elem.nextSibling;
          batchCmd.addSubCommand(new svgedit.history.RemoveElementCommand(elem, nextSibling, oldParent));
          oldParent.removeChild(elem);
          continue
        }
        children[i++] = elem = parent.insertBefore(elem, anchor);
        batchCmd.addSubCommand(new svgedit.history.MoveElementCommand(elem, oldNextSibling, oldParent))
      }
      clearSelection();
      var gNextSibling = g.nextSibling;
      g = parent.removeChild(g);
      batchCmd.addSubCommand(new svgedit.history.RemoveElementCommand(g, gNextSibling, parent));
      if(!batchCmd.isEmpty()) {
        addCommandToHistory(batchCmd)
      }
      addToSelection(children)
    }
  };
  this.moveToTopSelectedElement = function() {
    var selected = selectedElements[0];
    if(selected != null) {
      var t = selected;
      var oldParent = t.parentNode;
      var oldNextSibling = t.nextSibling;
      t = t.parentNode.appendChild(t);
      if(oldNextSibling != t.nextSibling) {
        addCommandToHistory(new svgedit.history.MoveElementCommand(t, oldNextSibling, oldParent, "top"));
        call("changed", [t])
      }
    }
  };
  this.moveToBottomSelectedElement = function() {
    var selected = selectedElements[0];
    if(selected != null) {
      var t = selected;
      var oldParent = t.parentNode;
      var oldNextSibling = t.nextSibling;
      var firstChild = t.parentNode.firstChild;
      if(firstChild.tagName == "title") {
        firstChild = firstChild.nextSibling
      }
      if(firstChild.tagName == "defs") {
        firstChild = firstChild.nextSibling
      }
      t = t.parentNode.insertBefore(t, firstChild);
      if(oldNextSibling != t.nextSibling) {
        addCommandToHistory(new svgedit.history.MoveElementCommand(t, oldNextSibling, oldParent, "bottom"));
        call("changed", [t])
      }
    }
  };
  this.moveUpDownSelected = function(dir) {
    var selected = selectedElements[0];
    if(!selected) {
      return
    }
    curBBoxes = [];
    var closest, found_cur;
    var list = $(getIntersectionList(getStrokedBBox([selected]))).toArray();
    if(dir == "Down") {
      list.reverse()
    }
    $.each(list, function() {
      if(!found_cur) {
        if(this == selected) {
          found_cur = true
        }
        return
      }
      closest = this;
      return false
    });
    if(!closest) {
      return
    }
    var t = selected;
    var oldParent = t.parentNode;
    var oldNextSibling = t.nextSibling;
    $(closest)[dir == "Down" ? "before" : "after"](t);
    if(oldNextSibling != t.nextSibling) {
      addCommandToHistory(new svgedit.history.MoveElementCommand(t, oldNextSibling, oldParent, "Move " + dir));
      call("changed", [t])
    }
  };
  this.moveSelectedElements = function(dx, dy, undoable) {
    if(dx.constructor != Array) {
      dx /= current_zoom;
      dy /= current_zoom
    }
    undoable = undoable || true;
    var batchCmd = new svgedit.history.BatchCommand("position");
    var i = selectedElements.length;
    while(i--) {
      var selected = selectedElements[i];
      if(selected != null) {
        var xform = svgroot.createSVGTransform();
        var tlist = svgedit.transformlist.getTransformList(selected);
        if(dx.constructor == Array) {
          xform.setTranslate(dx[i], dy[i])
        }else {
          xform.setTranslate(dx, dy)
        }
        if(tlist.numberOfItems) {
          tlist.insertItemBefore(xform, 0)
        }else {
          tlist.appendItem(xform)
        }
        var cmd = svgedit.recalculate.recalculateDimensions(selected);
        if(cmd) {
          batchCmd.addSubCommand(cmd)
        }
        selectorManager.requestSelector(selected).resize()
      }
    }
    if(!batchCmd.isEmpty()) {
      if(undoable) {
        addCommandToHistory(batchCmd)
      }
      call("changed", selectedElements);
      return batchCmd
    }
  };
  this.cloneSelectedElements = function(x, y) {
    var i, elem;
    var batchCmd = new svgedit.history.BatchCommand("Clone Elements");
    var len = selectedElements.length;
    function sortfunction(a, b) {
      return $(b).index() - $(a).index()
    }
    selectedElements.sort(sortfunction);
    for(i = 0;i < len;++i) {
      elem = selectedElements[i];
      if(elem == null) {
        break
      }
    }
    var copiedElements = selectedElements.slice(0, i);
    this.clearSelection(true);
    var drawing = getCurrentDrawing();
    i = copiedElements.length;
    while(i--) {
      elem = copiedElements[i] = drawing.copyElem(copiedElements[i]);
      (current_group || drawing.getCurrentLayer()).appendChild(elem);
      batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(elem))
    }
    if(!batchCmd.isEmpty()) {
      addToSelection(copiedElements.reverse());
      this.moveSelectedElements(x, y, false);
      addCommandToHistory(batchCmd)
    }
  };
  this.alignSelectedElements = function(type, relative_to) {
    var i, elem;
    var bboxes = [], angles = [];
    var minx = Number.MAX_VALUE, maxx = Number.MIN_VALUE, miny = Number.MAX_VALUE, maxy = Number.MIN_VALUE;
    var curwidth = Number.MIN_VALUE, curheight = Number.MIN_VALUE;
    var len = selectedElements.length;
    if(!len) {
      return
    }
    for(i = 0;i < len;++i) {
      if(selectedElements[i] == null) {
        break
      }
      elem = selectedElements[i];
      bboxes[i] = getStrokedBBox([elem]);
      switch(relative_to) {
        case "smallest":
          if((type == "l" || type == "c" || type == "r") && (curwidth == Number.MIN_VALUE || curwidth > bboxes[i].width) || (type == "t" || type == "m" || type == "b") && (curheight == Number.MIN_VALUE || curheight > bboxes[i].height)) {
            minx = bboxes[i].x;
            miny = bboxes[i].y;
            maxx = bboxes[i].x + bboxes[i].width;
            maxy = bboxes[i].y + bboxes[i].height;
            curwidth = bboxes[i].width;
            curheight = bboxes[i].height
          }
          break;
        case "largest":
          if((type == "l" || type == "c" || type == "r") && (curwidth == Number.MIN_VALUE || curwidth < bboxes[i].width) || (type == "t" || type == "m" || type == "b") && (curheight == Number.MIN_VALUE || curheight < bboxes[i].height)) {
            minx = bboxes[i].x;
            miny = bboxes[i].y;
            maxx = bboxes[i].x + bboxes[i].width;
            maxy = bboxes[i].y + bboxes[i].height;
            curwidth = bboxes[i].width;
            curheight = bboxes[i].height
          }
          break;
        default:
          if(bboxes[i].x < minx) {
            minx = bboxes[i].x
          }
          if(bboxes[i].y < miny) {
            miny = bboxes[i].y
          }
          if(bboxes[i].x + bboxes[i].width > maxx) {
            maxx = bboxes[i].x + bboxes[i].width
          }
          if(bboxes[i].y + bboxes[i].height > maxy) {
            maxy = bboxes[i].y + bboxes[i].height
          }
          break
      }
    }
    if(relative_to == "page") {
      minx = 0;
      miny = 0;
      maxx = canvas.contentW;
      maxy = canvas.contentH
    }
    var dx = new Array(len);
    var dy = new Array(len);
    for(i = 0;i < len;++i) {
      if(selectedElements[i] == null) {
        break
      }
      elem = selectedElements[i];
      var bbox = bboxes[i];
      dx[i] = 0;
      dy[i] = 0;
      switch(type) {
        case "l":
          dx[i] = minx - bbox.x;
          break;
        case "c":
          dx[i] = (minx + maxx) / 2 - (bbox.x + bbox.width / 2);
          break;
        case "r":
          dx[i] = maxx - (bbox.x + bbox.width);
          break;
        case "t":
          dy[i] = miny - bbox.y;
          break;
        case "m":
          dy[i] = (miny + maxy) / 2 - (bbox.y + bbox.height / 2);
          break;
        case "b":
          dy[i] = maxy - (bbox.y + bbox.height);
          break
      }
    }
    this.moveSelectedElements(dx, dy)
  };
  this.contentW = getResolution().w;
  this.contentH = getResolution().h;
  this.updateCanvas = function(w, h) {
    svgroot.setAttribute("width", w);
    svgroot.setAttribute("height", h);
    var bg = $("#canvasBackground")[0];
    var old_x = svgcontent.getAttribute("x");
    var old_y = svgcontent.getAttribute("y");
    var x = w / 2 - this.contentW * current_zoom / 2;
    var y = h / 2 - this.contentH * current_zoom / 2;
    svgedit.utilities.assignAttributes(svgcontent, {width:this.contentW * current_zoom, height:this.contentH * current_zoom, x:x, y:y, viewBox:"0 0 " + this.contentW + " " + this.contentH});
    svgedit.utilities.assignAttributes(bg, {width:svgcontent.getAttribute("width"), height:svgcontent.getAttribute("height"), x:x, y:y});
    var bg_img = svgedit.utilities.getElem("background_image");
    if(bg_img) {
      svgedit.utilities.assignAttributes(bg_img, {width:"100%", height:"100%"})
    }
    selectorManager.selectorParentGroup.setAttribute("transform", "translate(" + x + "," + y + ")");
    runExtensions("canvasUpdated", {new_x:x, new_y:y, old_x:old_x, old_y:old_y, d_x:x - old_x, d_y:y - old_y});
    return{x:x, y:y, old_x:old_x, old_y:old_y, d_x:x - old_x, d_y:y - old_y}
  };
  this.setBackground = function(color, url) {
    var bg = svgedit.utilities.getElem("canvasBackground");
    var border = $(bg).find("rect")[0];
    var bg_img = svgedit.utilities.getElem("background_image");
    border.setAttribute("fill", color);
    if(url) {
      if(!bg_img) {
        bg_img = svgdoc.createElementNS(NS.SVG, "image");
        svgedit.utilities.assignAttributes(bg_img, {id:"background_image", width:"100%", height:"100%", preserveAspectRatio:"xMinYMin", style:"pointer-events:none"})
      }
      setHref(bg_img, url);
      bg.appendChild(bg_img)
    }else {
      if(bg_img) {
        bg_img.parentNode.removeChild(bg_img)
      }
    }
  };
  this.cycleElement = function(next) {
    var num;
    var cur_elem = selectedElements[0];
    var elem = false;
    var all_elems = getVisibleElements(current_group || getCurrentDrawing().getCurrentLayer());
    if(!all_elems.length) {
      return
    }
    if(cur_elem == null) {
      num = next ? all_elems.length - 1 : 0;
      elem = all_elems[num]
    }else {
      var i = all_elems.length;
      while(i--) {
        if(all_elems[i] == cur_elem) {
          num = next ? i - 1 : i + 1;
          if(num >= all_elems.length) {
            num = 0
          }else {
            if(num < 0) {
              num = all_elems.length - 1
            }
          }
          elem = all_elems[num];
          break
        }
      }
    }
    selectOnly([elem], true);
    call("selected", selectedElements)
  };
  this.clear();
  this.getPrivateMethods = function() {
    var obj = {addCommandToHistory:addCommandToHistory, setGradient:setGradient, addSvgElementFromJson:addSvgElementFromJson, assignAttributes:assignAttributes, BatchCommand:BatchCommand, call:call, ChangeElementCommand:ChangeElementCommand, copyElem:function(elem) {
      return getCurrentDrawing().copyElem(elem)
    }, ffClone:ffClone, findDefs:findDefs, findDuplicateGradient:findDuplicateGradient, getElem:getElem, getId:getId, getIntersectionList:getIntersectionList, getMouseTarget:getMouseTarget, getNextId:getNextId, getPathBBox:getPathBBox, getUrlFromAttr:getUrlFromAttr, hasMatrixTransform:hasMatrixTransform, identifyLayers:identifyLayers, InsertElementCommand:InsertElementCommand, isIdentity:svgedit.math.isIdentity, logMatrix:logMatrix, matrixMultiply:matrixMultiply, MoveElementCommand:MoveElementCommand, 
    preventClickDefault:svgedit.utilities.preventClickDefault, recalculateAllSelectedDimensions:recalculateAllSelectedDimensions, recalculateDimensions:recalculateDimensions, remapElement:remapElement, RemoveElementCommand:RemoveElementCommand, removeUnusedDefElems:removeUnusedDefElems, round:round, runExtensions:runExtensions, sanitizeSvg:sanitizeSvg, SVGEditTransformList:svgedit.transformlist.SVGTransformList, toString:toString, transformBox:svgedit.math.transformBox, transformListToTransform:transformListToTransform, 
    transformPoint:transformPoint, walkTree:svgedit.utilities.walkTree};
    return obj
  }
};;module.exports = svgedit; }());
