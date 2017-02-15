var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var context2D = canvas.getContext("2d");
    var bitmap = new Bitmap();
    bitmap.image.src = "src/plant.jpg";
    bitmap.x = 0;
    bitmap.y = 0;
    bitmap.draw(context2D);
    var textfield = new TextField();
    textfield.x = 0;
    textfield.y = 450;
    textfield.text = "plant";
    textfield.draw(context2D);
};
var DisplayObject = (function () {
    function DisplayObject() {
    }
    DisplayObject.prototype.draw = function (context2D) {
    };
    return DisplayObject;
}());
var DisplayObjectContainer = (function () {
    function DisplayObjectContainer() {
        this.array = [];
    }
    DisplayObjectContainer.prototype.draw = function (context2D) {
        for (var _i = 0, _a = this.array; _i < _a.length; _i++) {
            var drawable = _a[_i];
            drawable.draw(context2D);
        }
    };
    return DisplayObjectContainer;
}());
var TextField = (function () {
    function TextField() {
        this.text = "";
    }
    TextField.prototype.draw = function (context2D) {
        context2D.fillText(this.text, this.x, 10);
    };
    return TextField;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
        this.image = new Image();
    }
    Bitmap.prototype.draw = function (context2D) {
        var _this = this;
        this.image.onload = function () {
            context2D.clearRect(0, 0, 500, 500);
            context2D.drawImage(_this.image, _this.x, _this.y);
        };
    };
    return Bitmap;
}(DisplayObject));
//# sourceMappingURL=main.js.map