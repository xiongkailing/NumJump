/**
 * @param config config&style&animate
 * example
 * 	{
 * 	st:100,
 *  ed:1,
 *  sp:-1,
 *  tsp:100,
 *  ele: $('.number')
 *  isloop:false
 *  animateEnbale:false
 *  animateType:fade/slide
 *  }
 */
function NumJump(config) {
	if (isNaN(config.st))
		throw Error("param st must be a num");
	if (isNaN(config.ed))
		throw Error("param ed must be a num");
	if (isNaN(config.sp) || config.sp == 0 || (config.ed - config.st) / config.sp < 0 ||
		parseInt((config.ed - config.st) / config.sp) != (config.ed - config.st) / config.sp)
		throw Error("error param sp");
	if (isNaN(config.tsp) || config.tsp < 0 || Math.ceil(config.tsp) != config.tsp)
		throw Error("error param tsp");
	var _st = config.st;
	var _ed = config.ed;
	var _sp = config.sp;
	var _tsp = config.tsp;
	var _interval;
	var _isSt = false;
	var _isStop = false;
	var _isloop = config.isloop;
	var _isAnimate = false;
	var _animateType = 'fade';
	if (config.animateEnbale && _tsp < 800) {
		throw Error("time interval is too short,animate will be auto-disabled!");
	}
	if (_tsp >= 800) {
		_isAnimate = config.animateEnbale;
		_animateType = config.animateType;
	}
	var _ele = config.ele;
	if (_isAnimate) {
		switch (_animateType) {
			case 'fade':
				_ele.addClass("fade");
				break;
			case 'slide':
				_ele.addClass('slide');
			default:break;
		}
	}
	/*
	 * start jump
	 */
	NumJump.prototype.start = function() {
			_isSt = true;
			_ele.html(_st);
			interval = setInterval(function() {
				var n = parseFloat(_ele.html());
				n += _sp;
				if (n == (_ed + _sp)) {
					if (_isloop) {
						if (_isAnimate) {
							change(_st);
						} else {
							_ele.html(_st);
						}
					} else {
						clearInterval(interval);
						_isStop = false;
						_isSt = false;
					}
				} else {
					if (_isAnimate) {
						change(n);
					} else {
						_ele.html(n);
					}
				}
			}, _tsp);
		}
		/*
		 * stop jump
		 */
	NumJump.prototype.stop = function() {
			clearInterval(interval);
			_isStop = true;
		}
		/**
		 * jump go on
		 */
	NumJump.prototype.goOn = function() {
		if (!_isSt || !_isStop) {
			throw Error("can't go on; no interval has been initialise");
			return;
		}
		interval = setInterval(function() {
			var n = parseFloat(_ele.html());
			if ((_ed - n) / _sp < 0 || parseInt((_ed - n) / _sp) != (_ed - n) / _sp) {
				n = _st;
			}
			n += _sp;
			if (n == (_ed + _sp)) {
				if (_isloop) {
					if (_isAnimate) {
						change(_st);
					} else {
						_ele.html(_st);
					}
				} else {
					clearInterval(interval);
					_isStop = false;
					_isSt = false;
				}
			} else {
				if (_isAnimate) {
					change(n)
				} else {
					_ele.html(n);
				}
			}
		}, _tsp);
	}

	function change(to) {
		switch (_animateType) {
			case 'fade':
				_ele.css({
					'opacity': 0,
					'transition-duration': _tsp / 2 + "ms"
				});
				setTimeout(function() {
					_ele.html(to);
					_ele.css({
						'opacity': 1,
						'transition-duration': _tsp / 4 + "ms"
					});
				}, _tsp / 2);
				break;
			case 'slide':
				var height = _ele.height();
				_ele.css({
					'margin-top': "-" + height + "px",
					'transition-duration': _tsp / 2 + "ms"
				});
				setTimeout(function() {
					_ele.html(to);
					_ele.css({
						'margin-top': 0,
						'transition-duration': _tsp / 4 + "ms"
					});
				}, _tsp / 2);
				break;
			default:
				_ele.html(to);
				break;
		}
	}
}