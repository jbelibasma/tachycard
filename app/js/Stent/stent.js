class Stent {
    constructor() {
        // get references to the canvas and context
        var canvas = document.getElementById("canvas");
        var overlay = document.getElementById("overlay");
        var ctx = canvas.getContext("2d");
        var ctxo = overlay.getContext("2d");
        this.ctx = this.setStyleContext(ctx);
        this.ctxo = this.setStyleContext(ctxo);


        // calculate where the canvas is on the window
        // (used to help calculate mouseX/mouseY)
        this.$canvas = $("#canvas");
        this.canvasOffset = this.$canvas.offset();
        this.offsetX = this.canvasOffset.left;
        this.offsetY = this.canvasOffset.top;
        this.scrollX = this.$canvas.scrollLeft();
        this.scrollY = this.$canvas.scrollTop();

        // this flage is true when the user is dragging the mouse
        this.isDown = false;

        // these vars will hold the starting mouse position
        this.startX;
        this.startY;

        this.prevStartX = 0;
        this.prevStartY = 0;

        this.prevWidth  = 0;
        this.prevHeight = 0;

        this.setEvent();



    }

    setStyleContext(ctx) {
        // style the context
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 3;
        return ctx;
    }
    handleMouseMove(e) {
        e.preventDefault();
        e.stopPropagation();

        // if we're not dragging, just return
        if (!this.isDown) {
            return;
        }

        // get the current mouse position
        let mouseX = parseInt(e.clientX - this.offsetX);
        let mouseY = parseInt(e.clientY - this.offsetY);

        // Put your mousemove stuff here



        // calculate the rectangle width/height based
        // on starting vs current mouse position
        var width = mouseX - this.startX;
        var height = mouseY - this.startY;

        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw a new rect from the start position
        // to the current mouse position
        ctx.strokeRect(this.startX, this.startY, width, height);

        this.prevStartX = this.startX;
        this.prevStartY = this.startY;

        this.prevWidth  = width;
        this.prevHeight = height;
    }
    handleMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();

        // save the starting x/y of the rectangle
        this.startX = parseInt(e.clientX - this.offsetX);
        this.startY = parseInt(e.clientY - this.offsetY);

        // set a flag indicating the drag has begun
        this.isDown = true;
    }

    handleMouseUp(e) {
        e.preventDefault();
        e.stopPropagation();

        // the drag is over, clear the dragging flag
        this.isDown = false;
        ctxo.strokeRect(this.prevStartX, this.prevStartY, this.prevWidth, this.prevHeight);
    }

    handleMouseOut(e) {
        e.preventDefault();
        e.stopPropagation();

        // the drag is over, clear the dragging flag
        this.isDown = false;
    }
    setEvent(){
        // listen for mouse events
        $("#canvas").mousedown(function (e) {
            this.handleMouseDown(e);
        });
        $("#canvas").mousemove(function (e) {
            this.handleMouseMove(e);
        });
        $("#canvas").mouseup(function (e) {
            this.handleMouseUp(e);
        });

        $("#canvas").mouseout(function (e) {
            this.handleMouseOut(e);
        });
    }


}
