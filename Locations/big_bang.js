bb_upg_close.onclick = function() {
	STATS.plr.other.bb_upg = 0;
}

bb_upg_buy.onclick = function() {
	let o = STATS.plr.other,
		math_buy = MATH.upg.buy;
	math_buy.one(o.bb_upg-1, 'bb_upg')
}

function change_screen(name) {
	
	let o = STATS.plr.other;
	
	STATS.plr.other.bb_screen =name;
	
	if (STATS.upgs['bb_upg'][o.bb_upg].type != name) {
		o.bb_upg = 0;
	}
	
}

bt_bb_upg_power.onclick = function() {change_screen('power')};
bt_bb_upg_comfort.onclick = function() {change_screen('comfort')};
bt_bb_upg_automation.onclick = function() {change_screen('automation')};