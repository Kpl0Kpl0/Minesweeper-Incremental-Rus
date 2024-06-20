
bt_hard_reset.onclick = function() {
	
	localStorage.clear();
	location.reload();
	console.log("Hard reset completed!");
	
}

bt_sett_click.onclick = function() {
	
	let st = STATS.plr.sett;
	
	if (st.click == 'one') {st.click = 'all'}
	else {st.click = 'one'}
	
}