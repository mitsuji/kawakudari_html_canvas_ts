# kawakudari-html-canvas-ts

This project implements part of the [std15.h](https://github.com/IchigoJam/c4ij/blob/master/src/std15.h) API (from [c4ij](https://github.com/IchigoJam/c4ij)) with [HTML Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API), and [Kawakudari Game](https://ichigojam.github.io/print/en/KAWAKUDARI.html) on top of it.

It will allow programming for [IchigoJam](https://ichigojam.net/index-en.html)-like targets that display [IchigoJam FONT](https://mitsuji.github.io/ichigojam-font.json/) on screen using a TypeScript programming language.
```
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
            std15.scroll(DIR_UP);
            if (std15.scr(x,5) != 0) {
              std15.locate(0,23);
              std15.putstr("Game Over...");
              std15.putnum(frame);
              running = false;
            }
        }
        std15.drawScreen();
        ++frame;
    },16);

};
```

## Prerequisite

Download and install web browser which supports HTML Canvas API.
* [Google Chrome](https://www.google.com/chrome/)
* [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/)

[Download](https://www.typescriptlang.org/download) and install TypeScript suitable for your environment.


## Preparation

* Start browser application.
* Open directory of this project in the file manager application like 'Explorer' or 'Finder'.


## How to use

To build it
```
$ npx tsc kawakudari.ts ichigojam.ts
```

To run it
```
Drug 'kawakudari.html' to the browser window.
```

To restart it
```
Reload the browser.
```


## License
[![Creative Commons License](https://i.creativecommons.org/l/by/4.0/88x31.png)](http://creativecommons.org/licenses/by/4.0/)
[CC BY](https://creativecommons.org/licenses/by/4.0/) [mitsuji.org](https://mitsuji.org)

This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).


