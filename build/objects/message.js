/* Generated by Babel */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RainbowText = (function (_Phaser$Text) {
		_inherits(RainbowText, _Phaser$Text);

		function RainbowText(game, x, y, text) {
				_classCallCheck(this, RainbowText);

				_get(Object.getPrototypeOf(RainbowText.prototype), "constructor", this).call(this, game, x, y, text, { font: "45px Arial", fill: "#ff0044", align: "center" });

				this._speed = 125; //ms
				this._colorIndex = 0;
				this._colors = ['#ee4035', '#f37736', '#fdf498', '#7bc043', '#0392cf'];

				this.colorize();
				this.startTimer();

				this.game.stage.addChild(this);
		}

		_createClass(RainbowText, [{
				key: "startTimer",
				value: function startTimer() {
						this.game.time.events.loop(this._speed, this.colorize, this).timer.start();
				}
		}, {
				key: "colorize",
				value: function colorize() {

						for (var i = 0; i < this.text.length; i++) {

								if (this._colorIndex === this._colors.length) {
										this._colorIndex = 0;
								}

								this.addColor(this._colors[this._colorIndex], i);
								this._colorIndex++;
						}
				}
		}]);

		return RainbowText;
})(Phaser.Text);