# Kinet
Animate stuff with kinetic force. Kinet let's you animate values and use them wherever you need to.

## Installation
Include Kinet with scripts tag

```html
<script src="./dist/kinet.min.js"></script>
```
or with *npm* and *import*
```shell
npm install kinet --save
```
```javascript
// import needed modules from npm
import Kinet from 'kinet';
```

## Options
Kinet accepts several options defined as follows.
```javascript
var options = { option: "value" }
var kinet = new Kinet(options);
```

### friction
Recommended value 0-1. Default value is `0.3`.

### acceleration
Recommended value 0-1. Default value is `0.04`.

### initialValue
Sets the initial value of `current` and `target` variables in animated instances.

### names
Array of names (strings). Kinet creates animated instance for each name. Defaults to single `x` value in array.

## Methods
```javascript
var kinet = new Kinet({name: ["x", "y"]});
```

### set
Sets value of current and target of animated instance to required value without animating. 
```javascript
    var kinet = new Kinet();
    kinet.set("x", 10); // sets to number 10
```

### animate
Animates value of current variable of animated instance to target value without animating. 
```javascript
    var kinet = new Kinet();
    kinet.animate("x", 10); // animates to number 10
```

### on
Sets handler for event. Available events are `start` (called at start of animation), `end` (called at the end of animation) and `tick` (called for every tick of animation).
Tick is called with `requestAnimationFrame` as the `current` value progresses to `target` value.
```javascript
// init
var kinet = new Kinet();

// set handler
kinet.on('tick', function () {
    // do something on animating values
});

kinet.target = 15;
```


### off
Removes handler.
```javascript
kinet.off('tick', handler); // removes single handler
kinet.off('tick'); // removes all handlers for 'tick' event
kinet.off(); // removes all handlers
```
