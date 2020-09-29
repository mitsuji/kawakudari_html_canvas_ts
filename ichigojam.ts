const CHAR_W = 8;
const CHAR_H = 8;

class Std15 {
    context: CanvasRenderingContext2D;
    screenW: number;
    screenH: number;
    buffW: number;
    buffH: number;
    dotW: number;
    dotH: number;
    buff: Array<number>;
    cursorX: number;
    cursorY: number;

    constructor (context: CanvasRenderingContext2D,
                 screenW: number, screenH: number,
                 buffW: number, buffH:number ) {
        this.context = context;
        this.screenW = screenW;
        this.screenH = screenH;
        this.buffW = buffW;
        this.buffH = buffH;
        this.dotW = screenW / buffW / CHAR_W;
        this.dotH = screenH / buffH / CHAR_H;
        this.buff = new Array<number>(buffW * buffH);
        this.cursorX = 0;
        this.cursorY = 0;
        this.cls();
    }

    public locate (x:number, y:number) {
      this.cursorX = x;
      this.cursorY = y;
    }

    public putc (c:number) {
      this.setChar(this.cursorX,this.cursorY,c);
      if (this.cursorX < this.buffW-1) {
        this.cursorX ++;
      } else {
        if (this.cursorY < this.buffH-1) {
          this.cursorX = 0;
          this.cursorY ++;
        }
      }
    }

    public putstr (s:string) {
      for (var i = 0; i < s.length; i++) {
        this.putc(s.charCodeAt(i));
      }
    }

    public putnum (n:number) {
      this.putstr(n.toString());
    }

    public scr (x:number, y:number): number {
      return this.buff [y*this.buffW+x];
    }

    public cls () {
      for (var y = 0; y < this.buffH; y++) {
        for (var x = 0; x < this.buffW; x++) {
          this.setChar(x,y,0);
        }
      }
    }

    public scroll () {
      for (var y = 0; y < this.buffH; y++) {
        for (var x = 0; x < this.buffW; x++) {
          if (y == this.buffH-1) {
            this.setChar(x,y,0);
      	  } else {
            this.setChar(x,y,this.scr(x,(y+1)));
      	  }
        }
      }
    }

    private setChar (x:number, y:number, c:number) {
      this.buff [y*this.buffW+x] = c;
    }

    private drawChar (cx:number, cy:number, c:number) {
      const glyph = ICHIGOJAM_FONT[c];
      const hiBits = parseInt(glyph.substring(0,8),16);
      const loBits = parseInt(glyph.substring(8),  16);
      for (var y = 0; y < CHAR_H; y++) {
        var line;
        if(y < 4) {
          line = (hiBits >> (CHAR_W*(CHAR_H-y-1-4))) & 0xff;
        } else {
          line = (loBits >> (CHAR_W*(CHAR_H-y-1))) & 0xff;
        }
        for (var x = 0; x < CHAR_W; x++) {
          if(((line >> (CHAR_W-x-1)) & 0x1) == 0x1){
            const x0 = (cx*CHAR_W+x)*this.dotW;
            const y0 = (cy*CHAR_H+y)*this.dotH;
            this.context.fillStyle = "rgb(255,255,255)";
            this.context.fillRect(x0,y0,this.dotW,this.dotH);
          }
        }
      }
    }

    public drawScreen () {
      this.context.fillStyle = "rgb(0,0,0)";
      this.context.fillRect(0,0,this.screenW,this.screenH);
      for (var y = 0; y < this.buffH; y++) {
        for (var x = 0; x < this.buffW; x++) {
          this.drawChar(x, y, this.scr(x,y));
        }
      }  
    }

}


/**
 *
 *  CC BY IchigoJam & mitsuji.org
 *  https://mitsuji.github.io/ichigojam-font.json/
 *
 */
const ICHIGOJAM_FONT = [
    "0000000000000000", 
    "ffffffffffffffff", 
    "ffaaff55ffaaff55", 
    "55aa55aa55aa55aa", 
    "005500aa005500aa", 
    "995a3c5a5a242466", 
    "fbfbfb00dfdfdf00", 
    "24182424183c6624", 
    "0a042a40fe402000", 
    "000000000000ee00", 
    "00042464fc602000", 
    "eebaee447c447c44", 
    "1042008001004208", 
    "007e7e7e7e7e7e00", 
    "007e424242427e00", 
    "007e5e5e5e427e00", 
    "007e7a7a6a427e00", 
    "003c242424243c00", 
    "c0c0c0c0c0c0c0c0", 
    "ffff000000000000", 
    "000000000000ffff", 
    "003c3c4242423c00", 
    "003c665e5e663c00", 
    "0303030303030303", 
    "0000ff0000ff0000", 
    "03070e1c3870e0c0", 
    "c0e070381c0e0703", 
    "606c34f018284e40", 
    "102040fe40201000", 
    "100804fe04081000", 
    "1038549210101000", 
    "1010109254381000", 
    "0000000000000000", 
    "1010101010001000", 
    "2828000000000000", 
    "28287c287c282800", 
    "103c503814781000", 
    "60640810204c0c00", 
    "2050502054483400", 
    "0810200000000000", 
    "0810202020100800", 
    "2010080808102000", 
    "1054381038541000", 
    "0010107c10100000", 
    "0000000010102000", 
    "0000007c00000000", 
    "0000000000303000", 
    "0000040810204000", 
    "38444c5464443800", 
    "1030501010107c00", 
    "3844040418607c00", 
    "3844041804443800", 
    "18284848487c0800", 
    "7c40780404443800", 
    "3840784444443800", 
    "7c44040808101000", 
    "3844443844443800", 
    "384444443c043800", 
    "0000100000100000", 
    "0000100010102000", 
    "0810204020100800", 
    "00007c007c000000", 
    "2010080408102000", 
    "3844440810001000", 
    "3844043454543800", 
    "384444447c444400", 
    "7824243824247800", 
    "3844404040443800", 
    "7824242424247800", 
    "7c40407c40407c00", 
    "7c40407c40404000", 
    "384440404c443c00", 
    "4444447c44444400", 
    "3810101010103800", 
    "1c08080808483000", 
    "4448506050484400", 
    "4040404040407c00", 
    "446c6c5454544400", 
    "446464544c4c4400", 
    "3844444444443800", 
    "7844444478404000", 
    "3844444454483400", 
    "7844444478484400", 
    "3844403804443800", 
    "7c10101010101000", 
    "4444444444443800", 
    "4444282828101000", 
    "4444545454282800", 
    "4444281028444400", 
    "4444281010101000", 
    "7c04081020407c00", 
    "3820202020203800", 
    "0000402010080400", 
    "3808080808083800", 
    "1028440000000000", 
    "0000000000007c00", 
    "2010080000000000", 
    "000038043c443a00", 
    "4040586444447800", 
    "0000384440443800", 
    "0404344c44443c00", 
    "000038447c403800", 
    "1820207c20202000", 
    "00003a44443c0438", 
    "4040586444444400", 
    "1000301010101000", 
    "0800180808080830", 
    "2020242830282400", 
    "3010101010101800", 
    "0000785454545400", 
    "0000784444444400", 
    "0000384444443800", 
    "0000384444784040", 
    "00003844443c0404", 
    "0000586440404000", 
    "00003c4038047800", 
    "20207c2020201800", 
    "0000484848483400", 
    "0000444428281000", 
    "0000445454282800", 
    "0000442810284400", 
    "0000444428281060", 
    "00007c0810207c00", 
    "0c10102010100c00", 
    "1010101010101000", 
    "6010100810106000", 
    "0000205408000000", 
    "a040a804fe040800", 
    "0000000000000000", 
    "f0f0f0f000000000", 
    "0f0f0f0f00000000", 
    "ffffffff00000000", 
    "00000000f0f0f0f0", 
    "f0f0f0f0f0f0f0f0", 
    "0f0f0f0ff0f0f0f0", 
    "fffffffff0f0f0f0", 
    "000000000f0f0f0f", 
    "f0f0f0f00f0f0f0f", 
    "0f0f0f0f0f0f0f0f", 
    "ffffffff0f0f0f0f", 
    "00000000ffffffff", 
    "f0f0f0f0ffffffff", 
    "0f0f0f0fffffffff", 
    "ffffffffffffffff", 
    "0000001818000000", 
    "000000ffff000000", 
    "1818181818181818", 
    "181818ffff181818", 
    "181818f8f8181818", 
    "1818181f1f181818", 
    "181818ffff000000", 
    "000000ffff181818", 
    "0000000f1f181818", 
    "000000f0f8181818", 
    "1818181f0f000000", 
    "181818f8f0000000", 
    "fffefcf8f0e0c080", 
    "ff7f3f1f0f070301", 
    "80c0e0f0f8fcfeff", 
    "0103070f1f3f7fff", 
    "44287c107c101000", 
    "0000000070507000", 
    "0e08080000000000", 
    "0000000010107000", 
    "0000000040201000", 
    "0000001818000000", 
    "007e027e02041800", 
    "0000007c14102000", 
    "0000000c70101000", 
    "0000107c44041800", 
    "0000007c10107c00", 
    "0000087c18284800", 
    "0000207c24202000", 
    "0000003808087c00", 
    "00003c043c043c00", 
    "0000005454040800", 
    "000000007e000000", 
    "00fe021410106000", 
    "0006186808080800", 
    "107e424202041800", 
    "007c10101010fe00", 
    "04047e0c14244400", 
    "10107e1212224600", 
    "10107e107e101000", 
    "003e224202043800", 
    "20203e4404043800", 
    "00007e0202027e00", 
    "0044fe4444043800", 
    "0070027202047800", 
    "007e020408146200", 
    "0040fe4448403e00", 
    "0042422404081000", 
    "003e22520a043800", 
    "043808fe08083000", 
    "0052525202041800", 
    "007c00fe08087000", 
    "404040704c404000", 
    "0008fe0808087000", 
    "00007c000000fe00", 
    "007e023408146200", 
    "107e020418761000", 
    "0002020202047800", 
    "0028284444828200", 
    "00404e7040403e00", 
    "007e020202043800", 
    "0000205088040200", 
    "0010fe1054549200", 
    "00fe024428100800", 
    "00700e700e700e00", 
    "001010202442fe00", 
    "0002221408146200", 
    "007c20fe20201e00", 
    "2020fe2224202000", 
    "00003c0404047e00", 
    "007c047c04047c00", 
    "007e007e02043800", 
    "0044444404083000", 
    "0050505052949800", 
    "0020202224283000", 
    "007e424242427e00", 
    "007e424202043800", 
    "0040220202047800", 
    "1048200000000000", 
    "7050700000000000", 
    "183878ffff783818", 
    "181c1effff1e1c18", 
    "183c7effff181818", 
    "181818ffff7e3c18", 
    "10387cfefe387c00", 
    "006cfefe7c381000", 
    "3838d6fed6103800", 
    "10387cfe7c381000", 
    "3c66c38181c3663c", 
    "3c7effffffff7e3c", 
    "246a2a2a2a2a2400", 
    "18244281bdbdbd7e", 
    "245a4281a581423c", 
    "3c4281a5817e2466", 
    "0c0a0a0878f87000", 
    "3c4299a5ada1924c", 
    "181824247eff3c7e", 
    "00182442ff540000", 
    "1010080810100808", 
    "7c101eb9ff9f107e", 
    "085a6cfe3c7e4a11", 
    "1c363a3a3a3e1c00", 
    "003c427e5a427e00", 
    "0006061e1e7e7e00", 
    "007c446464447c00", 
    "18183c5a5a242466", 
    "00187e99183c2466", 
    "00181a7e501c1466", 
    "1818101010101018", 
    "0018587e0a182e62", 
    "1818080808080818", 
    "043e2f566ad6acf0"
  ];
