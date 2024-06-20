
console.log('Player version: ' + o.version)

function update_version() {
	
	let o = STATS.plr.other;
	
	function re_upgrade(id, type) {
		
		// Достаем сейвы
		function get_item(name) {
			
			if (localStorage.getItem(String(type) + "_" + name + String(id)) != null) {
				return JSON.parse(localStorage.getItem(String(type) + "_" + name + String(id)));
			} else {
				return 0;
			}
			
		}
		
		let lvl = get_item('lvl'),
			comp = 0,
			cur_type =  get_item('cost')[4];
		
		// Получаем компенсацию
		if (lvl > 0) {
			
			let grow = get_item('cost')[1],
				grow_type = get_item('cost')[2],
				starter_cost = get_item('cost')[3];
			
			comp += Number(starter_cost);
			
			for (i = 0; i < lvl-1; i++) {
				
				if (grow_type == "c*") {
					starter_cost *= grow;
					comp += starter_cost;
				} else if (grow_type == "c**") {comp **= grow}
				else if (grow_type == "l*") {comp = starter_cost * grow * (lvl+1)}
				else if (grow_type == "l**") {comp = starter_cost * grow ** (lvl+1)}
				
			}
			
		}
		
		// Улучшаем улучшение до максимума за компенсацию
		while (true) {
			
			function func_max() {
				
				let max = get_item('max')[0];
				
				if (lvl == max || max > lvl) {return 1}
				else {return 0}
				
			}
			
			let upgr = STATS.upgs[type][id],
				cost = upgr.cost[0],
				cur = upgr.cost[4],
				math_cost = MATH.upg.cost(id, type), 
				math_eff = MATH.upg.eff(id, type),
				math_max = func_max(),
				m = STATS.plr.main;
			
			if (comp >= cost && math_max == 1 && upgr.lvl < lvl) {
				
				comp -= cost;
				upgr.lvl++;
				upgr.cost[0] = math_cost;
				upgr.eff[0] = math_eff;
				eval(upgr.code);
				
			} else {
				
				comp = Math.floor(comp);
				
				if (comp > 0) console.log("Compensation: " + comp + " " + cur + " for " + type + " " + id);
				
				comp += Number(localStorage.getItem(cur));
				
				localStorage.removeItem(cur);
				localStorage.setItem(cur, comp);

				comp = 0;
				
				break;
				
			}
			
		}
		
		function set_item(name) {
			localStorage.setItem(String(type) + '_' + name + String(id), JSON.stringify(eval('upgr.' + name)));
		}
		
		// Обновляем видимость улучшения
		if (upgr.visible == 1) {
			localStorage.setItem(String(type) + '_visible' + String(id), JSON.stringify(upgr.visible));
		}
		
	}
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
update_version();

function call_update() {
	update_version();
}
timer = setInterval(call_update,50000);

LOAD.load_progress();