const MOVES = {
	move(id){
		let menus = [menu_mf, menu_tsk, menu_bb, menu_sett];
		for (i = 0; i < menus.length; i++) {
			if (i == id) {menus[i].style.display = "block"}
			else {menus[i].style.display = "none";}
		}
	}
}

mv_menu_mf.onclick = function() { MOVES.move(0)}
mv_menu_tsk.onclick = function() { MOVES.move(1)}
mv_menu_bb.onclick = function() { MOVES.move(2)}
mv_menu_sett.onclick = function() { MOVES.move(3)}

function update() {
	
	// Дополнительные переменные
	
	let o = STATS.plr.other,
		m = STATS.plr.main;
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// Обновление кнопки большого взрыва
	
	let shards_gain = abbrNum(MATH.plr.shards()[0]),
		shards_cost = abbrNum(MATH.plr.shards()[1]),
		shards_one = abbrNum(MATH.plr.shards()[2]),
		gain = '';
	
	if (shards_gain == 0 || shards_gain > 4) {gain = 'осколков'}
	else if (shards_gain == 1) {gain = 'осколок'}
	else if (shards_gain < 5) {gain = 'осколка'}
		
	bt_big_bang.innerHTML = "Сбрасывает весь прогресс взамен на <b>" + shards_gain + 
	"</b> " + gain + " (<b>+" + shards_one + "</b> после <b>" + shards_cost + "</b> монет)";
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// Обновление настройки режима покупки
	
	if (STATS.plr.sett.click == 'one') {bt_sett_click.innerHTML = '<b>Single click:</b> upgrade 1 time'}
	else {bt_sett_click.innerHTML = '<b>Single click:</b> upgrade to the maximum'}
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// Обновление всех показателей статов
	
	info_coins.textContent = "Монеты: " + abbrNum(STATS.plr.main.coins);
	info_rage.textContent = "Ярость: " + abbrNum(STATS.plr.main.rage);
	info_shards.textContent = "Осколки: " + abbrNum(STATS.plr.main.shards);
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// Обновление кнопки получения монет
	
	bt_get_coins.innerHTML = "Получить " + abbrNum(MATH.plr.score()) + " монет";
	if (STATS.plr.other.score == 0) {
		// Выйгрыша нет
		bt_get_coins.style.backgroundColor = "#808080";
		bt_get_coins.style.color = "#141414";
		bt_get_coins.style.border = "2px solid #141414";
	} else {
		// Выйграш есть
		bt_get_coins.style.backgroundColor = "#FCF697";
		bt_get_coins.style.color = "#B4A900";
		bt_get_coins.style.border = "2px solid #B4A900";
	}
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// Обновление кнопки рестарта
	
	if (STATS.plr.other.lose == 0) {
		// Не проиграл
		bt_restart.style.backgroundColor = "#808080";
		bt_restart.style.color = "#141414";
		bt_restart.style.border = "2px solid #141414";
		
		restart_penalty.style.display = 'none';
	} else {
		// Проиграл
		bt_restart.style.backgroundColor = "#FA8072";
		bt_restart.style.color = "#C8143C";
		bt_restart.style.border = "2px solid #C8143C";
		
		restart_penalty.style.display = 'block';
	}
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// Обновление приписки о штрафе
	
	if (MATH.plr.rage() == 0) {
		
		restart_penalty.innerHTML = 
		'Штраф от перезапуска: ' + (30 - STATS.upgs['upg'][3].lvl) + '% от ваших монет.';
		
	} else {
		
		let rage_text = '';
		if (MATH.plr.rage() > 1) { rage_text =  'взамен на ' + MATH.plr.rage() + ' ярости.'}
		else { rage_text =  'взамен на ' + MATH.plr.rage() + ' ярость.'}
		
		restart_penalty.innerHTML = 'Штраф от перезапуска: ' + (30 - STATS.upgs['upg'][3].lvl) + '% от ваших монет ' + rage_text;
	}
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// Обновление кнопки большого взрыва
	
	if (MATH.plr.shards()[0] == 0) {
		// Получаешь 0 кристаллов
		bt_big_bang.style.backgroundColor = "#808080";
		bt_big_bang.style.color = "#141414";
		bt_big_bang.style.border = "2px solid #141414";
	} else {
		// Получаешь больше 0 кристаллов
		bt_big_bang.style.backgroundColor = "#6D5DFD";
		bt_big_bang.style.color = "#140A64";
		bt_big_bang.style.border = "2px solid #140A64";
	}
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// Обновление улучшений
	
	for (i = 0; i < STATS.upgs['upg'].length; i++) {
		let num = eval("upg" + (i+1)),
			upgr = STATS.upgs['upg'][i], 
			name = upgr.name[0],
			cur = upgr.cost[4],
			cost =  upgr.cost[0],
			desc = upgr.desc,
			clr = upgr.clr,
			lvl = upgr.lvl,
			max = upgr.max[0],
			desc_cost = "",
			plr = STATS.plr,
			translated_cost = '';
		
		if (cur == 'coins') translated_cost = 'монет';
		if (cur == 'rage') translated_cost = 'ярость';
		if (cur == 'shards') translated_cost = 'осколов';
		
		if (lvl != max || max == 0) {
			desc_cost = "\n<b>Стоимость:</b> " + abbrNum(cost) + " " + translated_cost
		}
		
		// Изменение цвета в зависимости от того, хватает валюты или нет
		if (lvl == max && max != 0) {
			num.style.backgroundColor = "#80D284";
			num.style.color =  "#5D935A";
			num.style.border =  "2px solid #5D935A";
		} else if (cost <= plr.main[cur] && (max  != lvl || max == 0)) {
			num.style.backgroundColor = "#" + clr[0];
			num.style.color =  "#" + clr[2];
			num.style.border =  "2px solid #" + clr[2];
		} else {
			num.style.backgroundColor = "#" + clr[1]
			num.style.color =  "#" + clr[3];
			num.style.border =  "2px solid #" + clr[3];
		}
		
		if (max > 0) {
			num.innerHTML = "[" + name + "] <b>Уровень " + lvl + " / " + max + 
			"</b>\n<b>Эффект</b>: " + desc  +  desc_cost;
		} else {
			num.innerHTML = "[" + name + "] <b>Уровень " + lvl + 
			"</b>\n<b>Эффектt</b>: " + desc +  desc_cost;
		}
	}
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// Кнопки улучшений в big bang'е яркие если их можно купить (хватает кристаллов)
	
	let bb_upgr2 = STATS.upgs['bb_upg'];
	
	// Просматриваем все bb улучшения
	for (i = 0; i < bb_upgr2.length; i++) {
		
		// Находим имя улучшения
		let bb_upgr2_id = document.getElementById(bb_upgr2[i].name[0]);
		
		// Если шардов на улучшение хватает, то...
		if (bb_upgr2[i].lvl == bb_upgr2[i].max[0]) {
			
			// Кнопка голубая
			bb_upgr2_id.style.backgroundColor = '#2F8CB4';
			bb_upgr2_id.style.border = "2px solid #0F394A";
			bb_upgr2_id.style.color = '#0F394A';
			
		} else if (bb_upgr2[i].cost[0] <= m.shards) {
			
			// Кнопка светлая
			bb_upgr2_id.style.backgroundColor = '#2F30B4';
			bb_upgr2_id.style.border = "2px solid #0F104B";
			bb_upgr2_id.style.color = '#0F104B';
			
		} else {
			
			// Кнопка темная
			bb_upgr2_id.style.backgroundColor = '#22237F';
			bb_upgr2_id.style.border = "2px solid #0B0B35";
			bb_upgr2_id.style.color = '#0B0B35';
			
		}
	}
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// Обновление описания bb улучшений
	
	if (o.bb_upg > 0) {
		
		let upgr = STATS.upgs['bb_upg'][o.bb_upg-1],
			cost =  upgr.cost[0],
			desc = upgr.desc,
			lvl = upgr.lvl,
			max = upgr.max[0],
			name1 = upgr.name[0],
			name2 = upgr.name[1],
			desc_cost = "",
			upg_id = document.getElementById(name1);
		
		// Показывает кнопки описания и само описание
		bb_upg_desc.style.display = "block";
		bb_upg_close.style.display = "block";
		// Если кристаллов хватает, то показывает кнопку покупки
		if (upgr.cost[0] <= m.shards) {
			bb_upg_buy.style.display = "block";
		} else {
			bb_upg_buy.style.display = "none";
		}
		
		if (lvl == max && max > 0) {
			desc_cost = "\n<b>Цена:</b> МАКС"
		} else {
			if (cost == 1) desc_cost = "\n<b>Цена:</b> " + abbrNum(cost) + " осколок"
			else if (cost <= 4 ) desc_cost = "\n<b>Цена:</b> " + abbrNum(cost) + " осколка"
			else desc_cost = "\n<b>Цена:</b> " + abbrNum(cost) + " осколков"
		}
		
		bb_upg_desc.innerHTML = "[" + name1 + "] <b>" + name2 + "</b>\n<b>Уровень " + lvl + " / " + max + "</b>\n<b> Эффект</b>: " + desc  +  desc_cost;
		
	} else {
		
		// Скрывает кнопки описания и само описание
		bb_upg_desc.style.display = "none";
		bb_upg_close.style.display = "none";
		bb_upg_buy.style.display = "none";
		
	}
	
	// Обновление экрана описания bb улучшений
	let bb_upgr = STATS.upgs['bb_upg'],
		bb_screen = STATS.plr.other.bb_screen;
	for (i = 0; i < bb_upgr.length; i++) {
		// Скрывает улучшение в зависимости от показателя visible
		let upg = document.getElementById(bb_upgr[i].name[0]);
		
		if (bb_upgr[i].type == bb_screen && bb_upgr[i].visible == 1) {
			upg.style.display = "block";
		} else {
			upg.style.display = "none";
		}
		
	}
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// Обновление позиции кнопки настроек
	
	if (STATS.plr.other.progress >= 12) {
		mv_menu_sett.style.top = "15.6vh";
	}
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// Обновление миссий //
	
	let tasks = TASKS[STATS.plr.other.task-1];
	
	if (STATS.plr.other.task < TASKS.length+1) {
		// Название
		tsk_name.innerHTML = '<b>' + tasks.name + '</b>';
		// Описание
		tsk_desc_p.innerHTML = tasks.desc;
		// Рекомендации
		tsk_rec.innerHTML = '<b>Рекомендации:</b> ' + tasks.rec;
		// Требование
		if  (tasks.req[2] == 'cur') {
			
			tsk_req.innerHTML = '<b>Цель:</b> получить ' + abbrNum(tasks.req[0]) + ' ' + tasks.req[1] + '.';
			
			// Выполнение
			if (STATS.plr.main[tasks.req[4]] >= tasks.req[0] && tasks.req[0] != -1) {
				tsk_bt_comp.style.display = 'block';
				wrn_tsk.style.display = 'block';
			} else {
				tsk_bt_comp.style.display = 'none';
				wrn_tsk.style.display = 'none';
			}
			
		} else if (tasks.req[2] == 'upg') {
			
			tsk_req.innerHTML = '<b>Цель: </b> улучшить ' + tasks.req[1] + ' до ' + tasks.req[0] + ' уровня.';
			
			// Выполнение
			if (STATS.upgs[tasks.req[4]][tasks.req[3]].lvl >= tasks.req[0] && tasks.req[0] != -1) {
				tsk_bt_comp.style.display = 'block';
				wrn_tsk.style.display = 'block';
			} else {
				tsk_bt_comp.style.display = 'none';
				wrn_tsk.style.display = 'none';
			}
			
		}
		// Стоимость
		if (tasks.rwrd[2] == 'none') {
			tsk_rwrd.innerHTML = '<b>Награда:</b> нет.';
		} else if (tasks.rwrd[2] == 'cur') {
			tsk_rwrd.innerHTML = '<b>Награда:</b> ' + abbrNum(tasks.rwrd[0]) + ' ' + tasks.rwrd[1] + '.';
		} else if (tasks.rwrd[2] == 'upg') {
			tsk_rwrd.innerHTML = '<b>Награда:</b> улучшить ' + tasks.rwrd[1] + ' до ' + tasks.rwrd[0] + ' уровня.';
		}
	}
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
timer = setInterval(update,25);