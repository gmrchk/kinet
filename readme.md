# Kinet
Animate changing any value with a hint of kinetic force.

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

## Usage
First, a component needs to be created.
```javascript
var kinet = new Kinet();
```

## Example
All that needs to be done is to set a `target` value of kinet. Kinet will "animate" the `current` value to the set target automatically.
```javascript
kinet.target = 15;  // animates kinet.current form previous value (0 is initial) to 15
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
Sets the initial value of `current` and `target` variables.


## Methods

### on
Sets handler for event. Available events are `start` (called at start of animation), `end` (called at the end of animation) and `tick` (called for every tick of animation).
Tick is called with `requestAnimationFrame` as the `current` value progresses to `target` value.
```javascript
// init
var kinet = new Kinet();

// set handler
kinet.on('tick', function (current, target) {
    console.log(current, target); // will outpu
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
