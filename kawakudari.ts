window.onload = (e) => {

    const canvas = <HTMLCanvasElement> document.getElementById("main");
    const context = canvas.getContext('2d');
    if (!context) {
        alert("HTML canvas 2d context is not supported in your environment...");
        return;
    }

    const std15 = new Std15(context,512,384,32,24);
    var frame = 0;
    var x = 15;
    var running = true;

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft")  --x;
        if (e.key === "ArrowRight") ++x;
    });

    setInterval(() => {
        if (!running) return;
        if (frame % 5 == 0) {
            std15.locate(x,5);
            std15.putc('0'.charCodeAt(0));
            std15.locate(Math.floor(Math.random() * 32.0),23);
            std15.putc('*'.charCodeAt(0));
            std15.scroll();
            if (std15.scr(x,5) != 0) running = false;
        }
        std15.draw();
        ++frame;
    },16);

};
