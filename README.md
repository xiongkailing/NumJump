### Number Jump

#### Description

A Jquery Plugin For Number Jump Effect

#### Config

example:

			var config = {
				st: 10,//start number
				ed: 1,//end number
				sp: -1,//number change interval
				tsp: 800,//time interval
				ele: $('.number'),//jquery object
				isloop: true,//loop or not
				animateEnbale: true,//add animate?
				animateType: 'slide'//animate support fade&slide temporary 
			};
			var nj = new NumJump(config);//init
			nj.start();//start
			setTimeout(function(){
				nj.stop();//stop
			},2000);
			setTimeout(function(){
				nj.goOn();//when stop, it can go on
			},4000);`
