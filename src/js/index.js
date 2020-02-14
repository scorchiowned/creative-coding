import "../styles/index.scss";
import p5 from "p5";

class Circle {
  constructor(x, y, p) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.show = this.show.bind(this);
    this.grow = this.grow.bind(this);
    this.r = 0;
    this.growing = true;
  }

  edges() {
    const smallerThanWidth = this.x + this.r < this.p.width;
    const smallerThanHeight = this.y + this.r < this.p.height;
    const widthLargerThanZero = this.x - this.r > 0;
    const HeigthlargerThanZero = this.y - this.r > 0;

    return (
      smallerThanWidth &&
      smallerThanHeight &&
      widthLargerThanZero &&
      HeigthlargerThanZero
    );
  }

  grow() {
    if (!!this.growing) {
      this.r = this.r + 2;
    }
  }

  show() {
    this.p.stroke(255);
    this.p.noFill();
    this.p.ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}

class Sketch extends p5 {
  constructor(sketch = () => {}, node = false, sync = false) {
    super(sketch, node, sync);

    this.setup = this.setup.bind(this);
    this.draw = this.draw.bind(this);
    this.windowResized = this.windowResized.bind(this);
    this.calculateSize = this.calculateSize.bind(this);
    this.circleArray = [];
  }

  /* UTILS */
  calculateSize(scaleFactor) {
    const sideSize =
      (this.windowWidth < this.windowHeight
        ? this.windowWidth
        : this.windowHeight) * scaleFactor;
    return {
      width: sideSize,
      height: sideSize
    };
  }

  /* p5 LIFECYCLE FUNCTIONS */
  setup() {
    const { width, height } = this.calculateSize(0.75);
    const canvas = this.createCanvas(width, height);

    canvas.parent("frame");
    this.background(0);
  }

  draw() {
    this.background(0);
    let total = 10;
    let count = 0;
    let attempts = 0;

    while (count <= total) {
      this.newCircle();
      ++count;
      ++attempts;
      if (attempts >= 1000) {
        return;
      }
    }

    this.circleArray.forEach(prevCircle => {
      if (!prevCircle.growing) {
        prevCircle.show();
        return;
      }
      this.circleArray.forEach(otherCircle => {
        if (otherCircle !== prevCircle) {
          const d = this.dist(
            prevCircle.x,
            prevCircle.y,
            otherCircle.x,
            otherCircle.y
          );
          if (d < otherCircle.r + prevCircle.r) {
            prevCircle.growing = false;
            return;
          }
        }
      });
      prevCircle.grow();
      prevCircle.show();
    });
  }

  newCircle() {
    let x = Math.random() * 1000;
    let y = Math.random() * 1000;
    let valid = true;

    const newCircle = new Circle(x, y, this);

    this.circleArray.forEach(prevCircle => {
      const d = this.dist(newCircle.x, newCircle.y, prevCircle.x, prevCircle.y);

      if (d < prevCircle.r) {
        valid = false;
      }
    });

    if (!!valid) {
      this.circleArray.push(newCircle);
    }
  }

  /* EVENTS */
  windowResized() {
    const { width, height } = this.calculateSize(0.75);
    this.resizeCanvas(width, height);
  }
}

// eslint-disable-next-line no-new
new Sketch();
