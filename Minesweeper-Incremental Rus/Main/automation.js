
let m = STATS.plr.main,
	o = STATS.plr.other,
	upgs = STATS.upgs;

setInterval(function auto_second() {
	
	if (upgs['bb_upg'][21].lvl > 0 && o.score > 0 && o.lose == 0) AUTO.coins();
	if (upgs['bb_upg'][22].lvl > 0 && o.lose == 1) AUTO.rage();
	
},1000)

setInterval(function auto_minute() {
	
	let math_shards = MATH.plr.shards()[0];
	
	if (upgs['bb_upg'][23].lvl > 0 && math_shards > 0) AUTO.shards();
	
}, 60000)



var AUTO = {
	
	coins() {
		let eff_1 = upgs['bb_upg'][21].eff[0],
			math_score = MATH.plr.score();
		
		m.coins += Math.floor(math_score * eff_1);
	},
	
	rage() {
		let eff_1 = upgs['bb_upg'][22].eff[0],
			math_rage = MATH.plr.rage();
		
		m.rage += Math.floor(math_rage * eff_1);
	},
	
	shards() {
		let eff_1 = upgs['bb_upg'][23].eff[0],
			math_shards = MATH.plr.shards()[0];
		
		m.shards += Math.floor(math_shards * eff_1);
	}
	
}