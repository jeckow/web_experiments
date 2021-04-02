// set angle parameters  // angle from origin
let angle;
let angle_v = 0;  // angular velocity
let angle_a = 0;  // angular acceleration

// declare pendulum pendulum properties
let bob;
let origin;

// force and gravity variables
let force;
let len = 300;
let mass = 30;
let gravity = 1;

// grab condition
let grabbed = false;

function setup() {
  createCanvas(600, 600);
  origin = createVector(300, 0);
  bob = createVector();
  angle = PI/2;
  // initial conditions here
}


function draw() {
  background(0);

  bob.x = len * sin(angle) + origin.x;
  bob.y = len * cos(angle) + origin.y;

  stroke(255);
  strokeWeight(2);
  fill(127);
  line(origin.x, origin.y, bob.x, bob.y);
  ellipseMode(RADIUS);
  fill(255);
  ellipse(bob.x, bob.y, mass*0.9);

  //  F = -m*g*sin(theta)
  force = -mass * gravity * sin(angle);

  if (grabbed == 0) {
    // torque = I * alpha_a
    angle_a = -(gravity * sin(angle)) / len; // from parallel axis theorem

    // increment the value of tangential velocity: w = alpha * t where t = 1
    angle_v += angle_a;
    angle_v *= 0.99;

    // increment ancular velocity: w = theta / t where t = 1
    angle += angle_v;
  }
}

function mousePressed() {
  let d = dist(mouseX, mouseY, bob.x, bob.y)
  if (d < mass*0.9) {
    grabbed = true;
  }
  else {
    grabbed = false;
  }
}


function mouseReleased() {
  grabbed = false;
}

function mouseDragged() {
  if (grabbed) {
    mouse = createVector( mouseX - 300, mouseY);
    new_angle = mouse.angleBetween(origin);
    angle = new_angle + PI/2;
    console.log(new_angle, angle);

    force = -mass * gravity * sin(angle);

    // reset angular acceleration
    angle_a = 0; // from parallel axis theorem

    // reset angular veloctiy
    angle_v += 0;
    angle_v *= 0;
  }
}
