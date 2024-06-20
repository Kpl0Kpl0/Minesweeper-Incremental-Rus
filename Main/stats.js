var STATS = {
	counts: {
		tile() {
			// Кол-во тайлов в ширину и длину (xy), общее кол-во тайлов
			let xy = 5, total = 25;
			return [xy, total];
		},
		mine() {
			// Кол-во мин
			let x = 10 - STATS.upgs["upg"][1].lvl;
			return x;
		},
		// 0 - empty, 1 - mine
		map: [
			0, 0, 0, 0, 0,
			0, 0, 0, 0, 0,
			0, 0, 0, 0, 0,
			0, 0, 0, 0, 0,
			0, 0, 0, 0, 0
		]
	},
	plr: {
		main: {
			coins:0,
			rage:0,
			shards:0
		},
		other: {
			best_coins: 0,
			
			progress: 6,
			version: 1,
			
			storage: 'false',
			
			task: 1,
			
			score: 0,
			lose: 0,
			
			bb_screen: 'power',
			bb_upg: 0,
			
			boost: 1
		},
		sett: {
			click: 'one',
			reset: 1
		}
	},
	upgs: {
		upg: [
			/* coins_1 */{
				lvl: 0,
				eff: [1, 2, "c*", 1],
				cost: [2, 4, "c*", 2, 'coins'],
				/* Объяснение:
					1 - текущая цена, 2 - коэф. роста текущей цены,
					3 - тип роста, 4 - стартовая текущая цена,
					5 - требуемый ресурс, 6 - коэфициент цены (1 - 100%, 0.5 - 50% и т.д.) */
				max: [10, 10],
				resettable: 1,
				visible: 1,
				// Пояснение: отвечает за то, открыто улучшение или нет (если не открыто, то оно невидимое)
				code: "upg2.style.display = 'block';",
				// Пояснение: код, который выполняется при покупке улучшения
				name: ["УМ1", "Улучшение Монет 1"],
				// Пояснение: название улучшения. 1 - аббревиатура, 2 - полное название
				desc: "удваивает получение монет",
				// Пояснение: описание для улучшения, которое видит игрок
				clr: ["D2D280", "93935A", "8C8C4B", "626234"]
				// Пояснение: 1-ый - светлый для задника, 2-ой - темный для задника
				// 3-ий - светлый для букв и краёв, 4-ый - темный для букв и краёв
				// Цвет изменяется в зависимости от того, хватает денег или нет
				// Темный цвет делишь на 100 и умножаешь на 70
			},
			/* coins_2 */{
				lvl: 0, 
				eff: [1, 2, "c*", 1], 
				cost: [100, 100, "c*", 100, "coins"], 
				max: [9, 9], 
				resettable: 1,
				visible: 1,
				code: "upg3.style.display = 'block';",
				name: ["УМ2", "Улучшение Монет 2"],
				desc: "уменьшает количество мин на поле", 
				clr: ["D2D280", "93935A", "8C8C4B", "626234"]
			},
			/* coins_3 */{
				lvl: 0, 
				eff: [1, 3, "l*", 1], 
				cost: [300, 10, "c*", 300, "coins"], 
				max: [10, 10],
				resettable: 1,
				visible: 1,
				code: "upg4.style.display = 'block';",
				name: ["УМ3", "Улучшение Монет 3"],
				desc: "получение монет умножено на 3", 
				clr: ["D2D280", "93935A", "8C8C4B", "626234"]
			},
			/* coins_4 */{
				lvl: 0, 
				eff: [0, 1, "c+", 0], 
				cost: [5000, 10, "c*", 5000, "coins"], 
				max: [10, 10],
				resettable: 1,
				visible: 1,
				code:  "upg5.style.display = 'block';",
				name: ["УМ4", "Улучшение Монет 4"],
				desc: "уменьшает процент штрафа от перезапуска на X% (X = уровень)", 
				//when you open a mine adds X% of the coins you were supposed to get (X - level)
				clr: ["D2D280", "93935A", "8C8C4B", "626234"]
			},
			/* coins_5 */{
				lvl: 1, 
				eff: [1, 0.01, "c+", 1], 
				cost: [3e4, 100, "c*", 3e4, "coins"], 
				max: [5, 5],
				resettable: 1,
				visible: 1,
				code:  "upg6.style.display = 'block';" +
					"info_rage.style.display = 'block';",
				name: ["УМ5", "Улучшение Монет 5"],
				desc: "^X к получению монет (X = 1 + уровень * 0.01), разблокирует ярость", 
				clr: ["D2D280", "93935A", "8C8C4B", "626234"]
			},
			/* rage_1 */{
				lvl: 0, 
				eff: [1, 3, "l*", 1], 
				cost: [5, 2, "c*", 5, "rage"], 
				max:[1000, 1000],
				resettable: 1,
				visible: 1,
				code: "upg7.style.display = 'block'",
				name: ["УЯ1", "Улучшение Ярости 1"],
				desc: "получение монет умножено на 3", 
				clr: ["D29880", "936A5A", "A05D4B", "704134"]
			},
			/* rage_2 */{
				lvl: 0, 
				eff: [1, 0, "c+", 1], 
				cost: [15, 2, "c*", 15, "rage"], 
				max: [1, 1],
				resettable: 1,
				visible: 1,
				code: "upg8.style.display = 'block'",
				name: ["УЯ2", "Улучшение Ярости 2"],
				desc: "удваивает получение ярости за каждый уровень УМ2", 
				clr: ["D29880", "936A5A", "A05D4B", "704134"]
			},
			/* rage_3 */{
				lvl: 0,
				eff: [0, 2, "c+", 0],
				cost: [300, 2.75, "c*", 300, "rage"],
				max: [6, 6],
				resettable: 1,
				visible: 1,
				code: "upg9.style.display = 'block';" +
					"STATS.upgs['upg'][0].max[0] += STATS.upgs['upg'][7].eff[1]",
				name: ["УЯ3", "Улучшение Ярости 3"],
				desc: "увеличивает максимальный уровень УМ1 на 2",
				clr: ["D29880", "936A5A", "A05D4B", "704134"]
			},
			/* rage_4 */{
				lvl: 0,
				eff: [0, 0.1, "l+", 0],
				cost: [800, 8, "c*", 800, "rage"],
				max: [3, 3],
				resettable: 1,
				visible: 1,
				code: "upg10.style.display = 'block'",
				name: ["УЯ4", "Улучшение Ярости 4"],
				desc: "^X к получению монет за каждый текущий открытый тайл (X = 1 + уровень * 0.1)", 
				clr: ["D29880", "936A5A", "A05D4B", "704134"]
			},
			/* rage_5 */{
				lvl: 0, 
				eff: [1, 1, "l+", 1], 
				cost: [1500, 2, "c*", 1500, "rage"], 
				max: [1, 1],
				resettable: 1,
				visible: 1,
				code: "bt_big_bang.style.display = 'block'",
				name: ["УЯ5", "Улучшение Ярости 5"],
				desc: "получение ярости увеличивается от OoMs монет (OoM - Order of Magnitude)", 
				clr: ["D29880", "936A5A", "A05D4B", "704134"]
			}
		],
		bb_upg: [
			/* бм1 (0) */{
				lvl: 0, 
				eff: [1, 2, "l*", 1], 
				cost: [1, 2, "c*", 1, "shards"], 
				max: [10, 10], 
				resettable: 1,
				visible: 1,
				code: "",
				name: ["БМ1", "Больше Монет 1"], 
				desc: "получение монет умножено на 2", 
				type: "power", 
				cords: [2, 22]
			},
			/* бя1 (1) */{
				lvl: 0, 
				eff: [1, 1.5, "l*", 1], 
				cost: [1, 2, "c*", 1, "shards"], 
				max: [10, 10], 
				resettable: 1,
				visible: 1,
				code: "",
				name: ["БЯ1", "Больше Ярости 1"],
				desc: "получение ярости умножено на 1.5", 
				type: "power", 
				cords: [2, 28]
			},
			/* бо1 (2) */{
				lvl: 0, 
				eff: [1, 2, "l*", 1], 
				cost: [2, 2, "c*", 2, "shards"], 
				max: [10, 10], 
				resettable: 1,
				visible: 1,
				code: "STATS.upgs['bb_upg'][3].visible = 1;" +
					"STATS.upgs['bb_upg'][4].visible = 1;" +
					"STATS.upgs['bb_upg'][5].visible = 1",
				name: ["БО1", "Больше Осколков 1"],
				desc: "получение осколков умножено на 2, разблокирует больше улучшений",
				type: "power", 
				cords: [2, 34]
			},
			/* бм2 (3) */{
				lvl: 0, 
				eff: [1, 3, "c*", 1], 
				cost: [25, 2, "c*", 25, "shards"], 
				max: [1, 1], 
				resettable: 1,
				visible: 0,
				code: "",
				name: ["БМ2", "Больше Монет 2"], 
				desc: "утраивает получение монет", 
				type: "power", 
				cords: [11.4, 22]
			},
			/* бя2 (4) */{
				lvl: 0, 
				eff: [1, 3, "c*", 1], 
				cost: [25, 2, "c*", 25, "shards"], 
				max: [1, 1], 
				resettable: 1,
				visible: 0,
				code: "",
				name: ["БЯ2", "Больше Ярости 2"], 
				desc: "утраивает получение ярости", 
				type: "power", 
				cords: [11.4, 28]
			},
			/* бо2 (5) */{
				lvl: 0, 
				eff: [1, 3, "c*", 1], 
				cost: [50, 2, "c*", 50, "shards"], 
				max: [1, 1], 
				resettable: 1,
				visible: 0,
				code: "",
				name: ["БО2", "Больше Осколков 2"], 
				desc: "утраивает получение осколков", 
				type: "power", 
				cords: [11.4, 34]
			},
			/* су1 (6) */{
				lvl: 0,
				eff: [0, 1, "l*", 0], 
				cost: [5, 1, "c*", 5, "shards"], 
				max: [1, 1],
				resettable: 1,
				visible: 1,
				code: "STATS.upgs['upg'][6].resettable = 0;" +
					"STATS.upgs['bb_upg'][8].visible = 1;",
				name: ["СУ1", "Сохранение Улучшений 1"],
				desc: "Большой взрыв не сбрасывает УЯ2, разблокирует новое улучшение",
				type: "comfort", 
				cords: [2, 22]
			},
			/* cc1 (7) */{
				lvl: 0,
				eff: [0, 1, "l*", 0], 
				cost: [1, 10, "c*", 1, "shards"], 
				max: [3, 3], 
				resettable: 1,
				visible: 1,
				code: "STATS.upgs['bb_upg'][6].visible = 1;" +
					"STATS.upgs['bb_upg'][10].visible = 1;" +
					"STATS.upgs['bb_upg'][12].visible = 1;" +
					"STATS.upgs['bb_upg'][21].visible = 1;" +
					"STATS.upgs['bb_upg'][22].visible = 1;" +
					"STATS.upgs['bb_upg'][23].visible = 1",
				name: ["КС1", "Комфортная Стоимость 1"], 
				desc: "уменьшает требования к Большому Взрыву в 10 раз, разблокирует больше улучшений автоматизации и комфорта",
				type: "comfort", 
				cords: [2, 28],
				ver: 0, m_ver: 1
			},
			/* су2 (8) */{
				lvl: 0,
				eff: [0, 1, "l*", 0], 
				cost: [35, 1, "c*", 35, "shards"], 
				max: [1, 1],
				resettable: 1,
				visible: 0,
				code: "STATS.upgs['upg'][3].resettable = 0;" +
					"STATS.upgs['bb_upg'][9].visible = 1;",
				name: ["СУ2", "Сохранение Улучшений 2"],
				desc: "Большой взрыв не сбрасывает УМ4, разблокирует новое улучшение",
				type: "comfort",
				cords: [11.4, 22]
			},
			/* су3 (9) */{
				lvl: 0,
				eff: [0, 1, "l*", 0], 
				cost: [80, 1, "c*", 80, "shards"], 
				max: [1, 1],
				resettable: 1,
				visible: 0,
				code: "STATS.upgs['upg'][9].resettable = 0;",
				name: ["СУ3", "Сохранение Улучшений 3"],
				desc: "Большой взрыв не сбрасывает УЯ5",
				type: "comfort", 
				cords: [17.4, 22]
			},
			/* cl1 (10) */{
				lvl: 0,
				eff: [0, 1, "l*", 0], 
				cost: [10, 1, "c*", 10, "shards"], 
				max: [1, 1],
				resettable: 1,
				visible: 1,
				code: "STATS.upgs['upg'][2].max[0] += 10;" +
					"STATS.upgs['upg'][2].max[1] += 10;" +
					"STATS.upgs['bb_upg'][11].visible = 1;" +
					"STATS.upgs['bb_upg'][13].visible = 1",
				name: ["КУ1", "Комфортный Уровень 1"],
				desc: "увеличивает лимит уровня УМ3 на 10",
				type: "comfort", 
				cords: [2, 34]
			},
			/* cr1 (11) */{
				lvl: 0,
				eff: [0, 1, "c*", 0], 
				cost: [9, 1, "c*", 9, "shards"], 
				max: [1, 1],
				resettable: 1,
				visible: 1,
				code: "STATS.upgs['bb_upg'][14].visible = 1",
				name: ["КП1", "Комфортные Правила 1"], 
				desc: "вы можете получать ярость после Большого Взрыва",
				type: "comfort", 
				cords: [2, 40]
			},
			/* cc2 (12) */{
				lvl: 0,
				eff: [0, 1, "c*", 0], 
				cost: [20, 2, "l**", 20, "shards"], 
				max: [3, 3],
				resettable: 1,
				visible: 0,
				code: "STATS.upgs['upg'][5].cost[0] *= 0.9;" +
					"STATS.upgs['upg'][5].cost[3] *= 0.9;" +
					"STATS.upgs['upg'][5].cost[5] *= 0.9;" +
					"STATS.upgs['bb_upg'][15].visible = 1;",
				name: ["КС2", "Комфортная Стоимоть 2"], 
				desc: "УЯ1 дешевле на 10%",
				type: "comfort", 
				cords: [11.4, 28]
			},
			/* cl2 (13) */{
				lvl: 0,
				eff: [0, 1, "l*", 0], 
				cost: [25, 1, "c*", 25, "shards"], 
				max: [1, 1],
				resettable: 1,
				visible: 0,
				code: "STATS.upgs['upg'][3].max[0]+=15;" +
					"STATS.upgs['upg'][3].max[1]+=15;" +
					"STATS.upgs['bb_upg'][16].visible = 1;",
				name: ["КУ2", "Комфортный Уровень 2"], 
				desc: "увеличивает лимит уровня УМ4 на 15, разблокирует больше улучшений",
				type: "comfort", 
				cords: [11.4, 34]
			},
			/* cr2 (14) */{
				lvl: 0,
				eff: [0, 1, "c*", 0], 
				cost: [99, 1, "c*", 99, "shards"], 
				max: [1, 1],
				resettable: 1,
				visible: 0,
				code: "STATS.upgs['bb_upg'][17].visible = 1;",
				name: ["КП2", "Комфортные Правила 2"], 
				desc: "получение осколков зависит от количества всех монет, заработанных с момента последнего Большого Взрыва",
				type: "comfort", 
				cords: [11.4, 40]
			},
			/* cc3 (15) */{
				lvl: 0,
				eff: [1, 0.9, "c*", 1], 
				cost: [150, 1, "c*", 150, "shards"], 
				max: [1, 1],
				resettable: 1,
				visible: 0,
				code: "for (i=0;i<STATS.upgs['upg'].length;i++) {" +
					"STATS.upgs['upg'][i].cost[0] *= 0.95;" +
					"STATS.upgs['upg'][i].cost[3] *= 0.95;" +
					"STATS.upgs['upg'][i].cost[5] *= 0.95" +
					"}",
				name: ["КС3", "Комфортная Стоимость 3"], 
				desc: "все улучшения монет и ярости на 5% дешевле",
				type: "comfort", 
				cords: [17.4, 28]
			},
			/* cl3 (16) */{
				lvl: 0,
				eff: [0, 1, "l*", 0], 
				cost: [50, 1, "c*", 50, "shards"], 
				max: [3, 3],
				resettable: 1,
				visible: 0,
				code: "STATS.upgs['upg'][8].max[0]+=1;" +
					"STATS.upgs['upg'][8].max[1]+=1;",
				name: ["КУ3", "Комфортный Уровень 3"], 
				desc: "увеличивает лимит уровня УЯ4 на 1, разблокирует больше улучшений",
				type: "comfort", 
				cords: [17.4, 34]
			},
			/* cr3 (17) */{
				lvl: 0,
				eff: [0, 1, "c*", 0], 
				cost: [999, 1, "c*", 999, "shards"], 
				max: [1, 1],
				resettable: 1,
				visible: 0,
				code: "",
				name: ["КП3", "Комфортные Правила 3"], 
				desc: "выйгрыш не сбрасывается при проигрыше",
				type: "comfort", 
				cords: [17.4, 40]
			},
			/* ce1 (18) */{
				lvl: 0,
				eff: [1, 1, "c+", 1], 
				cost: [10, 2, "l*", 10, "shards"], 
				max: [4, 4],
				resettable: 1,
				visible: 1,
				code: "STATS.upgs['upg'][2].desc = 'получение монет умножено на ' + (3*STATS.upgs['bb_upg'][18].eff[0]);" +
					"STATS.upgs['bb_upg'][19].visible = 1;",
				name: ["КЭ1", "Комфортная Эффективность 1"], 
				desc: "увеличивает эффективность УМ3 на 3",
				type: "comfort", 
				cords: [2, 16]
			},
			/* ce2 (19) */{
				lvl: 0,
				eff: [0, 5, "c+", 0], 
				cost: [40, 2, "l*", 40, "shards"], 
				max: [1, 1],
				resettable: 1,
				visible: 0,
				code: "STATS.upgs['upg'][0].max[0] = 15 + (3 * STATS.upgs['upg'][7].lvl);" +
					"STATS.upgs['upg'][7].eff[1] += 3;" +
					"STATS.upgs['upg'][7].desc = 'увеличивает лимит уровня УМ1 до 3';" +
					"STATS.upgs['bb_upg'][20].visible = 1;",
				name: ["КЭ2", "Комфортная Эффективность 2"], 
				desc: "увеличивает эффективность УЯ3 до 3",
				type: "comfort",
				cords: [11.4, 16]
			},
			/* ce3 (20) */{
				lvl: 0,
				eff: [1, 0.1, "c+", 1],
				cost: [160, 2, "l*", 160, "shards"],
				max: [1, 1],
				resettable: 1,
				visible: 0,
				code: "",
				name: ["КЭ3", "Комфортная Эффективность 3"],
				desc: "увеличивает эффективность УЯ5 на 10%",
				type: "comfort",
				cords: [17.4, 16]
			},
			/* ac1 (21) */{
				lvl: 0,
				eff: [0, 0.01, "c+", 0],
				cost: [1, 2, "c*", 1, "shards"],
				max: [10, 10],
				resettable: 1,
				visible: 0,
				code: "",
				name: ["ac1", "Automation Coins 1"], 
				desc: "gives X% of the coins per second of the coins you should get (X - level)",
				type: "automation",
				cords: [2, 22]
			},
			/* ar1 (22) */{
				lvl: 0,
				eff: [0, 0.01, "c+", 0],
				cost: [1, 2, "c*", 1, "shards"],
				max: [10, 10],
				resettable: 1,
				visible: 0,
				code: "",
				name: ["ar1", "Automation Rage 1"],
				desc: "gives X% rage per second of the rage you should get (only works after losing, X - level)",
				type: "automation",
				cords: [2, 28]
			},
			/* as1 (23) */{
				lvl: 0,
				eff: [0, 0.01, "c+", 0],
				cost: [2, 2, "c*", 2, "shards"],
				max: [10, 10],
				resettable: 1,
				visible: 0,
				code: "",
				name: ["as1", "Automation Shards 1"],
				desc: "gives X% of the shards per minute of the shards you should get (X - level)",
				type: "automation",
				cords: [2, 34]
			}
		]
	},
	reb: {
		bb: {
			cost: 1,
			coef: 16,
			cur: "coins",
			count: 0
		}
	}
};

var tile_style = {
	class_name: "tile",
	id: "tile" ,
	onclick_name: "MATH.field.open_tile",
	width: 6,
	height: 11.16,
	top: 11.16,
	left: 6,
	position: "absolute",
	
	bckgrnd_clr: "#C0C0C0",
	bckgrnd_clr_mine: "#FF0000",
	bckgrnd_clr_mine2: "#DEC0C0",
	bckgrnd_clr_safe: "#00FF00",
	bckgrnd_clr_safe2: "#C0DEC0",
	
	border: "2px solid #FFFFFF"
};