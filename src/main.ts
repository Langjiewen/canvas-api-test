window.onload = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
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

interface Drawable{
    draw(context2D: CanvasRenderingContext2D);
}

class DisplayObject implements Drawable{    

    x: number;
    y: number;

    draw(context2D: CanvasRenderingContext2D){

    }
}

class DisplayObjectContainer implements Drawable{

    array: Drawable [] = [];

    draw(context2D: CanvasRenderingContext2D){
        for(let drawable of this.array){
            drawable.draw(context2D);
        }
    }
}

class TextField implements Drawable{

    x: number;
    y: number;
    text: string = "";

    draw(context2D: CanvasRenderingContext2D){
        context2D.fillText(this.text, this.x, 10);
    }
}

class Bitmap extends DisplayObject{

    image = new Image();
    x: number;
    y: number;

    draw(context2D: CanvasRenderingContext2D){
        this.image.onload = () => {
            context2D.clearRect(0, 0 ,500, 500);
            context2D.drawImage(this.image, this.x, this.y);
        }
    }
}