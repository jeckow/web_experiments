// set angle parameters
let angle_v = 0;  // initial angular velocity
let angle_a = 0;  // angular acceleration

let inputs;
function setup() {
  createCanvas(600, 600);

  // vector parameters
  origin = createVector(300, 0);
  bob = createVector();

  // pass parameters to class
  inputs = new mouse(origin, bob);
}

// main function
function mousePressed() {
  inputs.clicked();
}

function mouseDragged() {
  inputs.hold();
}

function mouseReleased() {
  inputs.release();
}

function draw() {
  background(0);
  inputs.display();
}

//  mouse interactions
class mouse {
  constructor(origin, bob){
    this.origin = origin;
    this.bob = bob;
    this.theta = PI/2;
    this.len = 300;
    this.mass = 30;
    this.force = 0;
    this.gravity = 1;
    this.head = 0;
    this.d = 0;
    this.grabbed = false;
  }

  display() {
    this.bob.x = this.len * sin(this.theta) + this.origin.x;
    this.bob.y = this.len * cos(this.theta) + this.origin.y;

    stroke(255);
    strokeWeight(2);
    fill(127);
    line(this.origin.x, this.origin.y, this.bob.x, this.bob.y);
    ellipseMode(RADIUS);
    fill(255);
    ellipse(this.bob.x, this.bob.y, this.mass * 0.8);

    //  F = -m*g*sin(theta) = ma --> a = -g * sin(theta)
    this.force = -this.mass * this.gravity * sin(this.theta);
    if (this.grabbed == 0) {

      // derived from equating a = -g * sin(theta) with the angular acceleration
      angle_a = -(this.gravity * sin(this.theta)) / this.len;

      // increment the value of tangential velocity: w = alpha * t where t = 1
      angle_v += angle_a;

      // add damping
      angle_v *= sqrt(298 / this.len);

      // increment ancular velocity: w = theta / t where t = 1
      this.theta += angle_v;
    }
  }

  clicked() {
    this.d = dist(mouseX, mouseY, this.bob.x, this.bob.y);
    if (this.d < this.mass * 0.9) {
      this.grabbed = true;
    }
    else {
      this.grabbed = false;
    }
  }

  release() {
    this.grabbed = false;
  }

  hold() {
    if (this.grabbed) {
      // create new reference point
      this.point = createVector( mouseX - 300, mouseY);

      // calculate new angle
      this.new_theta  = this.point.angleBetween(this.origin);

      // replace old angle
      this.theta = this.new_theta + PI/2;

      // reset parameters
      angle_a = 0;
      angle_v = 0;
      angle_v *= 0;

      console.log(this.theta);
    }
  }
}
