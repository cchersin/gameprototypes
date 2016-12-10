//////////////////////////////////
// KEYBOARD
//////////////////////////////////
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

//Capture the keyboard arrow keys
var leftArrow = keyboard(37),
    upArrow = keyboard(38),
    rightArrow = keyboard(39),
    downArrow = keyboard(40);


//////////////////////////////////
// COLLISIONS
//////////////////////////////////
function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};


//////////////////////////////////
// ANIMATION
//////////////////////////////////
var animating = false;

function animate(opts) {

  if(animating)
    return;

  animating = true;

  var start = new Date   
  
  var id = setInterval(function() {
    var timePassed = new Date - start
    var progress = timePassed / opts.duration

    if (progress > 1) progress = 1
    
    var delta = opts.delta(progress)
    opts.step(delta)
    
    if (progress == 1) {
      clearInterval(id)
      animating = false;
    }
  }, opts.delay || 10)
}

var linear = function(progress) {
    return progress;
};

var bounce = function(progress) {
    
    if(progress==1)
      return 0;
    var x = progress * Math.PI;
    var d = Math.sin(x);

    // console.log("progress " + progress + " x " + x + " d " + d);
    return d;
};

var bounce2 = function(progress) {
  console.log('bounch2');
    
    if(progress==1)
      return 0;

    var x = progress * Math.PI * 2;
    var d = Math.sin(x);

    //console.log("progress " + progress + " x " + x + " d " + d);
    return d;
};

function animation(delta,step) {
  
  animate({
    delay: 20,
    duration: 500, 
    delta: delta,
    step: step
  });

}
