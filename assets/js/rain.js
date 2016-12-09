// Only compatible with ES 6.0+

var canvasWindow = document.getElementById("rain");
var canvasContext = canvasWindow.getContext("2d");

// Color class
class Color
{
   constructor(r, g, b)
   {
     this.r = r;
     this.g = g;
     this.b = b;
   }

   Lerp(c, t)
   {
      return new Color(
        this.r + t * (c.r - this.r),
        this.g + t * (c.g - this.g),
        this.b + t * (c.b - this.b)
      );
   }

   ToHex()
   {
      return "#" +
      ("0" + parseInt(this.r,10).toString(16)).slice(-2) +
      ("0" + parseInt(this.g,10).toString(16)).slice(-2) +
      ("0" + parseInt(this.b,10).toString(16)).slice(-2);
   }
}

// Raindrop class
class Raindrop
{
    constructor(x, y, z)
    {
      this.x = x;
      this.y = y;
      this.z = z;
      this.length = 100;
      this.yvel = 10;
    }

    Update()
    {
      this.y += this.yvel * this.z;

      if(this.y > window.innerHeight)
      {
        this.y = -10;
      }
    }

    Draw()
    {
      canvasContext.fillStyle = rainColor.Lerp(bgColor, this.z).ToHex();
      canvasContext.fillRect(this.x, this.y, 10 * this.z, 40 * this.z);
    }
}

var bgColor = new Color(0, 0, 0);
var rainColor = new Color(125,249,255);

canvasContext.canvas.width  = window.innerWidth;
canvasContext.canvas.height = window.innerHeight;

var drops = [];
var dropAmount = 2500;

for(var i = 0; i < dropAmount; i++)
{
  drops.push(
    new Raindrop(
      Random(0, canvasWindow.width),
      Random(-100, -450),
      i / dropAmount
    )
  );
}

setInterval(Tick, 1);

function Tick()
{
  console.log("ping");
  canvasContext.clearRect(0, 0, canvasWindow.width, canvasWindow.height);
  canvasContext.fillStyle = bgColor.ToHex();
  canvasContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
  for(var i = 0; i < dropAmount; i++)
  {
    drops[i].Update();
    drops[i].Draw();
  }
}

function Random(min, max) {
  return Math.random() * (max - min) + min;
}
