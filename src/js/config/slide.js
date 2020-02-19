代码如下:

const slider = (function() {
  var Slider = {};
    // the constructed function,timeManager,as such that's a manager about managing the setInterval
    class TimerManager {
        constructor() {
            this.timers = [];
            this.args = [];
            this.isTimerRun = false;
        }
        // That's order to create the method what add the timer
        add(timer, args) {
            this.timers.push(timer);
            this.args.push(args);
            this.timerRun();
        }
        // called the method is order to run the timer by ordering
        timerRun() {
            if (!this.isTimerRun) {
                var timer = this.timers.shift(), args = this.args.shift();
                if (timer && args) {
                    this.isTimerRun = true;
                    timer(args[0], args[1]);
                }
            }
        }
        // let it run the next timer
        next() {
            this.isTimerRun = false;
            this.timerRun();
        }
        // if the element can't has the property of TimerManage what represented the constructor function,repeated creating a constructed function
        static makeTimerManage(element) {
            if (!element.TimerManage ||
                element.TimerManage.constructor !== TimerManager) {
                element.TimerManage = new TimerManager();
            }
        }
    }
  function slideUp(element, time) {
    if (element.offsetHeight > 0) {
      var totalHeight = element.offsetHeight;
      var currentHeight = totalHeight;
      var reduceValue = totalHeight / (time / 10);
      element.style.transition = "height " + time + " ms";
      element.style.overflow = "hidden";
      var timer = setInterval(function() {
        currentHeight -= reduceValue;
        element.style.height = currentHeight + "px";
        if (currentHeight <= 0) {
          clearInterval(timer);
          element.style.display = "none";
          element.style.height = totalHeight + "px";
          if (
            element.TimerManage &&
            element.TimerManage.constructor === TimerManager
          ) {
            element.TimerManage.next();
          }
        }
      }, 10);
    } else {
      if (
        element.TimerManage &&
        element.TimerManage.constructor === TimerManager
      ) {
        element.TimerManage.next();
      }
    }
  }
  function slideDown(element, time) {
    if (element.offsetHeight <= 0) {
      element.style.display = "block";
      element.style.transition = "height" + time + " ms";
      element.style.overflow = "hidden";
      var totalHeight = element.offsetHeight;
      var currentHeight = 0;
      element.style.height = "0px";
      var addValue = totalHeight / (time / 10);
      var timer = setInterval(function() {
        currentHeight += addValue;
        element.style.height = currentHeight + "px";
        if (currentHeight >= totalHeight) {
          clearInterval(timer);
          element.style.height = totalHeight + "px";
          if (
            element.TimerManage &&
            element.TimerManage.constructor === TimerManager
          ) {
            element.TimerManage.next();
          }
        }
      }, 10);
    } else {
      if (
        element.TimerManage &&
        element.TimerManage.constructor === TimerManager
      ) {
        element.TimerManage.next();
      }
    }
  }
  // the interface about slideUp method
  Slider.slideUp = function(element) {
    TimerManager.makeTimerManage(element);
    element.TimerManage.add(slideUp, arguments);
    return this;
  };
  // the interface about slideDown method
  Slider.slideDown = function(element) {
    TimerManager.makeTimerManage(element);
    element.TimerManage.add(slideDown, arguments);
    return this;
  };
  return Slider;
})();