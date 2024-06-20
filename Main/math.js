const MATH = {
	field: {
		generate() {
			let xy = STATS.counts.tile()[0], total = STATS.counts.tile()[1];
			return [xy, total];
		},
		mines() {
			for (let i = 0; i <STATS.counts.mine(); i++) {
				
				let tile_id = Math.floor(Math.random() * (24 - 0) + 0),
					map = STATS.counts.map;
				
				if (map[tile_id] == 0) {
					map[tile_id] = 1;
				} else { 
					i--;
				}
				
			}
		},
		restart() {
			
			let count_tile = STATS.counts.tile(),
				o = STATS.plr.other,
				map = STATS.counts.map;
				
			for (i = 0; i < count_tile[1]; i++) {
				let tile = document.getElementById("tile"+i);
				map[i] = 0;
				tile.style.backgroundColor = tile_style.bckgrnd_clr;
			}
			
			o.lose = 0;
			o.score = 0;
			this.mines();
			
		},
		open_tile(id) {
			
			let m = STATS.plr.main,
				o = STATS.plr.other
				math_score = MATH.plr.score(),
				math_rage = MATH.plr.rage(),
				lvl_1 = STATS.upgs['bb_upg'][17].lvl,
				tile = document.getElementById("tile"+id),
				map = STATS.counts.map;
				
			if (o.lose == 0) {
				
				// Пустая клетка
				if (map[id] == 0) {
					tile.style.backgroundColor = tile_style.bckgrnd_clr_safe;
					
					map[id] = 2;

					o.score++;
					
				// Мина (проигрыш)
				} else if (map[id] ==  1) {
					tile.style.backgroundColor = tile_style.bckgrnd_clr_mine;
					
					map[id] = 2;
				
					o.lose = 1;
					
					if (lvl_1 == 0) {o.score = 0}
					
					this.show();
				}
				
				// Сохранение того, проиграли вы или нет (защита от f5)
				localStorage.setItem('lose', o.lose);
				
			}
			
		},
		show() {
			
			let count_tile = STATS.counts.tile(),
				map = STATS.counts.map;
			
			for (i = 0; i < count_tile[1]; i++) {
				let tile = document.getElementById("tile"+i);
				
				if (map[i] == 0) {tile.style.backgroundColor = tile_style.bckgrnd_clr_safe2}
				else if (map[i] == 1) {tile.style.backgroundColor = tile_style.bckgrnd_clr_mine2}
			}
			
		}
	},
	upg: {
		buy: {
			one(id, type) {
				
				if (STATS.plr.sett.click == 'one') {
					let upgr = STATS.upgs[type][id],
						cost = upgr.cost[0],
						cur = upgr.cost[4],
						math_cost = MATH.upg.cost(id, type), 
						math_eff = MATH.upg.eff(id, type),
						math_max = MATH.upg.max(id, type),
						m = STATS.plr.main;
					
					if (m[cur] >= cost && math_max == 1) {
						
						// Повышает прогресс
						if (type == 'upg') MATH.plr.progress(id+2);
						
						m[cur] -= cost;
						upgr.lvl++;
						upgr.cost[0] = math_cost;
						upgr.eff[0] = math_eff;
						eval(upgr.code);
					}
				} else {
					MATH.upg.buy.all(id, type);
				}
				
			},
			all(id, type) {
				while (true) {
					
					let upgr = STATS.upgs[type][id],
						cost = upgr.cost[0],
						cur = upgr.cost[4],
						math_cost = MATH.upg.cost(id, type), 
						math_eff = MATH.upg.eff(id, type),
						math_max = MATH.upg.max(id, type),
						m = STATS.plr.main;
					
					if (m[cur] >= cost && math_max == 1) {
						
						// Повышает прогресс
						if (type == 'upg') MATH.plr.progress(id+2);
						
						m[cur] -= cost;
						upgr.lvl++;
						upgr.cost[0] = math_cost;
						upgr.eff[0] = math_eff;
						eval(upgr.code);
					}
					else {break}
					
				}
			}
		},
		max(id, type) {
			let upgr = STATS.upgs[type][id],
				max = upgr.max[0], 
				lvl = upgr.lvl;
			if (max == 0 || max > lvl) {return 1}
			else {return 0}
		},
		cost(id, type) {
			let upgr = STATS.upgs[type][id],
				cur = upgr.cost[0],
				coef = upgr.cost[1],
				mode = upgr.cost[2],
				starter = upgr.cost[3],
				lvl = upgr.lvl;
			
			if (mode == "c*") {cur *= coef}
			else if (mode == "c**") {cur **= coef}
			else if (mode == "l*") {cur = starter * coef * (lvl+1)}
			else if (mode == "l**") {cur = starter * coef ** (lvl+1)}
			
			return Math.floor(cur);
		},
		eff(id, type) {
			let upgr = STATS.upgs[type][id],
				cur = upgr.eff[0], 
				coef = upgr.eff[1], 
				mode = upgr.eff[2]
				lvl = upgr.lvl;
			
			if (mode == "c+") {cur += coef}
			else if (mode == "c*") {cur *= coef}
			else if (mode == "l+") {cur = (lvl + 1)  + coef}
			else if (mode == "l*") {cur = (lvl + 1) * coef}
			
			return cur;
		},
		rebirth(name) {
			let reb = STATS.reb[name],
				cost = reb.cost,
				coef = reb.coef,
				cur = reb.cur,
				count = reb.count,
				math_cost = cost*10**coef
			if (STATS.plr.main[cur] >= math_cost) {
				STATS.plr.main[cur] -= math_cost;
				count++;
				coef++;
			}
		}
	},
	plr: {
		penalty() {
			
			let m = STATS.plr.main,
				lvl_1 = STATS.upgs['upg'][3].lvl,
				list = ['coins'];
			
			for (i = 0; i <list.length; i++) {
				
				m[list[i]] = Math.floor(m[list[i]] * 0.7 - (lvl_1 / 100));
				
				if (m[list[i]] < 0) m[list[i]] = 0;
				
			}
			
		},
		coins() {
			
			let x =  this.score();
			
			return x;
			
		},
		score() {
			
			let o = STATS.plr.other,
				upgr = STATS.upgs['upg'],
				bb_upgr = STATS.upgs['bb_upg'],
				eff_1 = upgr[0].eff[0],
				eff_2 = upgr[2].eff[0],
				eff_3 = upgr[4].eff[0],
				eff_4 = upgr[5].eff[0],
				eff_5 = upgr[8].eff[0],
				eff_6 = bb_upgr[0].eff[0],
				eff_7 = bb_upgr[3].eff[0],
				eff_8 = bb_upgr[18].eff[0],
				boost = o.boost,
				score = o.score,
				mult = score ** (2 + eff_5);
			
			return (mult * eff_1 * (eff_2 * eff_8 )) ** eff_3 * eff_4 * eff_6 * eff_7 * boost;
			
		},
		rage() {
			
			let o = STATS.plr.other,
				upgr = STATS.upgs['upg'],
				bb_upgr = STATS.upgs['bb_upg'],
				lvl_1 = upgr[4].lvl,
				lvl_2 = upgr[6].lvl,
				lvl_3 = upgr[9].lvl,
				lvl_4 = bb_upgr[11].lvl,
				eff_1 = 0,
				eff_2 = 0,
				eff_3 = upgr[1].eff[0],
				eff_4 = bb_upgr[1].eff[0],
				eff_5 = bb_upgr[4].eff[0],
				eff_6 = bb_upgr[20].eff[0],
				coin_length = String(Math.floor(STATS.plr.main.coins)).length,
				boost = o.boost;
			
			if (lvl_1 > 0 || lvl_4 > 0) {
				
				if (lvl_2 == 1) {eff_1 = eff_3}
				else {eff_1 = 1}
				
				if (lvl_3 == 1) {eff_2 = Math.floor(coin_length * eff_6)}
				else {eff_2 = 1}
				
			}
			
			return eff_1 * eff_2 * eff_4 * eff_5 * boost;
			
		},
		shards() {
			
			let m = STATS.plr.main,
				o = STATS.plr.other,
				coins = m.coins,
				best_coins = o.best_coins,
				
				reb = STATS.reb["bb"],
				cost = reb.cost,
				coef = reb.coef,
				
				bb_upgr = STATS.upgs['bb_upg'],
				lvl_1 = bb_upgr[14].lvl,
				eff_1 = bb_upgr[2].eff[0],
				eff_2 = bb_upgr[5].eff[0],
				cost_1 = bb_upgr[7].eff[0],
				boost = o.boost / o.boost,
				
				final_boost = eff_1 * eff_2 * boost; // Counting boost
				
				count = 0,
				gain = 0,
				one = 1,
				math_cost = cost*10**coef;
			
			if (lvl_1 == 0) {
				for (i = 0; coins >= cost * 10 **(coef + i - cost_1); i++) {
					count++; 
				}
			} else {
				for (i = 0; best_coins >= cost * 10 **(coef + i - cost_1); i++) {
					count++; 
				}
			}
			math_cost = cost*10**(coef + count - cost_1);
			gain = count * final_boost;
			one = 1 * final_boost;
			
			return [gain, math_cost, one];
			
		},
		progress(num) {
			let o = STATS.plr.other;
			if (num > o.progress) {
				o.progress = num;
				console.log("Progress updated: " + num);
			}
		}
	},
	reset: {
		upg() {
			let upgr = STATS.upgs['upg'];
			for (i = 0; i < upgr.length; i++) {
				if (upgr[i].resettable == 1) {
					upgr[i].cost[0] = upgr[i].cost[3];
					upgr[i].eff[0] = upgr[i].eff[3];
					upgr[i].max[0] = upgr[i].max[1];
					upgr[i].lvl = 0;
				}
			}
		},
		cur1() {
			STATS.plr.main.coins = 0;
			STATS.plr.main.rage = 0;
			STATS.plr.other.score = 0;
			STATS.plr.other.best_coins = 0;
		}
	}
};

function abbrNum(number) {
	// 2 decimal places => 100, 3 => 1000, etc
	decPlaces = Math.pow(10,2);

	// Enumerate number abbreviations
	var abbrev = [ "K", "M", "B", "T", "Qa", "Qt" , "Sx", "Sp", "Oc", "No", "Dc", "UDc", "DDc", "TDc", "QaDc", "QtDc", "SxDc", 
				"SpDc", "ODc", "NDc", "Vg", "UVg", "DVg", "TVg", "QaVg", "QtVg", "SxVg", "SpVg", "OVg", "NVg", "Tg", "UTg",
				"DTg", "TTg", "QaTg", "QtTg", "SxTg", "SpTg", "OTg", "NTg", "Qd", "UQd"];

	// Go through the array backwards, so we do the largest first
	for (var i=abbrev.length-1; i>=0; i--) {

		// Convert array index to "1000", "1000000", etc
		var size = Math.pow(10,(i+1)*3);

		// If the number is bigger or equal do the abbreviation
		if(size <= number) {
			// Here, we multiply by decPlaces, round, and then divide by decPlaces.
			// This gives us nice rounding to a particular decimal place.
			number = Math.round(number*decPlaces/size)/decPlaces;

			// Handle special case where we round up to the next abbreviation
			if((number == 1000) && (i < abbrev.length - 1)) {
				number = 1;
				i++;
			}

			// Add the letter for the abbreviation
			number += " " + abbrev[i];

			// We are done... stop
			break;
		}
	}
	return number;
}