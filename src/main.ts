

window.onload = () => {

    var canvas = document.getElementById("app") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");
    var DEG = Math.PI / 180;


    var stage = new DisplayObjectContainer();

    var img = new Bitmap();
    img.src = "image.JPG";
    img.scaleX = 0.5;
    img.transY = 10;
    img.alpha = 0.5;
    img.rotation = 45;

    let tf1 = new TextField();
    tf1.text = "Hello";
    tf1.transX = 0;
    tf1.alpha = 0.5;

    let tf2 = new TextField();
    tf2.text = "World";
    tf2.transX = 100;
    tf2.transY = 20;

    stage.addChild(img);
    stage.addChild(tf1);
    stage.addChild(tf2);


    setInterval(() => {



       context2D.setTransform(1, 0, 0, 1, 0, 0);

        context2D.clearRect(0, 0, canvas.width, canvas.height);

        tf1.transY++;
        img.transX++;

          stage.draw(context2D);

    }, 60)

    console.log(canvas);

};

interface Drawable {

    draw(context2D: CanvasRenderingContext2D);

}

class DisplayObject implements Drawable {

    transX: number = 0;

    transY: number = 0;

    alpha: number = 1;

    globalAppha: number = 1;

    scaleX: number = 1;

    scaleY: number = 1;

    rotation: number = 0;

    parent: DisplayObjectContainer;

    globalMatrix: math.Matrix;

    localMatrix: math.Matrix;

    draw(context2D: CanvasRenderingContext2D) {  

         context2D.save();

        if (this.parent) {

            this.globalAppha = this.parent.globalAppha * this.alpha;
        }
        else {
            this.globalAppha = this.alpha;
        }

        context2D.globalAlpha = this.globalAppha;

        this.setMatrix();

        context2D.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);

        this.render(context2D);
    }

    render(context2D: CanvasRenderingContext2D) {   

    }

    setMatrix() {

        this.localMatrix = new math.Matrix();

        this.localMatrix.updateFromDisplayObject(this.transX, this.transY, this.scaleX, this.scaleY, this.rotation);

        if (this.parent) {

            this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);

        } else {
            this.globalMatrix = new math.Matrix(1, 0, 0, 1, 0, 0);
        }

    }
}

class Bitmap extends DisplayObject {

    image: HTMLImageElement;



    private _src = "";

    private isLoaded = false;

    constructor() {

        super();
        this.image = document.createElement('img');

     

    }

    set src(value: string) {
        this._src = value;
        this.isLoaded = false;
    }

    render(context2D: CanvasRenderingContext2D) {

        context2D.globalAlpha = this.alpha;

        if (this.isLoaded) {

            context2D.drawImage(this.image, 0, 0);
        }

        else {

            this.image.src = this._src;

            this.image.onload = () => {

                context2D.drawImage(this.image, 0, 0);

                this.isLoaded = true;

            }
        }

    }
}



class TextField extends DisplayObject {

    text: string = "";

    font: string = "Arial";

    size: string = "40";

    render(context2D: CanvasRenderingContext2D) {


        context2D.font = this.size + "px " + this.font;

        context2D.fillText(this.text, 0, 20);

    }

}





class DisplayObjectContainer extends DisplayObject implements Drawable {

    array: Drawable[] = [];

    render(context2D) {

        for (let Drawable of this.array) {

            Drawable.draw(context2D);
        }
    }

    addChild(child: DisplayObject) {

        if (this.array.indexOf(child) == -1) {

            this.array.push(child);

            child.parent = this;
        }

    }

    removechild(child: DisplayObject) {

        var index = this.array.indexOf(child);

        if (index > -1) {

            this.array.splice(index, 1);

        }

    }

    removeall() {

        this.array = [];

    }

}

class Graphics {

}

class Shape extends DisplayObject {

    graphics: Graphics;

    draw(context2D: CanvasRenderingContext2D) {

        context2D.fillRect(0, 0, 0, 0);
    }
}