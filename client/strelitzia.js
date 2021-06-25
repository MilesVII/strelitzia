const SERVER = "http://127.0.0.1:7071/";
const COMMANDS = {
	start: {
		command: "START",
		options: {
		}
	},
	login: {
		command: "LOGIN",
		options: {
			login: "",
			password: ""
		}
	},
	code: {
		command: "CODE",
		options: {
			code: "000000"
		}
	},
	selectTeam: {
		command: "SEL_TEAM",
		options: {
			teamName: "",
			teamId: "0"
		}
	},
	apps: {
		command: "APPS",
		options: {
		}
	},
	selectApp: {
		command: "SEL_APP",
		options: {
			appId: "0"
		}
	},
	create: {
		command: "CREATE_IAP",
		options: {
			appId: "0",
			defaultFamilyName: "Subscriptions",
			orders: []
		}
	},
	recreate: {
		command: "RECREATE",
		options: {
			appId: "0",
			orders: []
		}
	},
	service: {
		command: "SERVICE",
		options: {
			message: ""
		}
	}
};
const RESPONSE_CODES = {
	ERROR: 0,
	AUTH: 1,
	CODE: 2,
	OK:   3,
	SELECT_TEAM: 4
};
let selectedApp = null;

let radios = [];

function status(message){
	document.getElementById("status").textContent = message;
}

function hideAllDialogs(){
	let ds = document.getElementsByClassName("dialog");
	for (let d of ds){
		d.style.display = "none";
	}
}

function onRadioChange(group, selected){
	for (let option of radios[group]){
		if (option.id == selected)
			option.className = "xradio xradio_selected";
		else
			option.className = "xradio";
	}
}

function initRadio(host){
	let first = null;
	
	//if (radios[host.id]) return;

	radios[host.id] = [];
	for (let option of host.children){
		if (option.className == "xradio"){
			if (!first){
				first = option;
			}
			option.onclick = ()=>{
				onRadioChange(host.id, option.id);
			};
			radios[host.id].push(option);
		}
	}
	if (first){
		onRadioChange(host.id, first.id);
	}
}

const IAP_TYPES  = ["rs", "nc", "c"];
const IAP_DURS   = ["1w", "1m", "2m", "3m", "6m", "1y"];
const IAP_TRIALS = ["off", "3d"];//, "1w", "1m", "2m", "3m", "6m", "1y"];

let table = null;
function initSheet(rsMatrix, cMatrix){
	if (table) {
		table.destroy(); 
	}

	let rsPrices = [];
	for (let rsPrice of rsMatrix){
		rsPrices.push(rsPrice.price);
	}
	let сPrices = [];
	for (let сPrice of cMatrix){
		сPrices.push(сPrice.price);
	}
	let container = document.getElementById("spreadsheet");
	table = new Handsontable(container, {
		data: [],
		rowHeaders: true,
		colHeaders: ["Type", "Reference Name", "Bundle Suffix", "Price (RS)", "Price (C/NC)", "Duration", "Trial", "Name (en-US)", "Description (en-US)"],
		columns: [
			{
				type: "dropdown",
				source: IAP_TYPES
			},
			{},
			{},
			{
				type: "dropdown",
				source: rsPrices
			},
			{
				type: "dropdown",
				source: сPrices
			},
			{
				type: "dropdown",
				source: IAP_DURS
			},
			{
				type: "dropdown",
				source: IAP_TRIALS
			},
			{},
			{}
		],
		minSpareRows: 1,
		licenseKey: "non-commercial-and-evaluation"
	});

	return table;
}

function start(){
	let subs = [
		"Because launching Spaceship is called rocket science",
		"[eq",
		"Ракеты нет, скачем на батуте"
	]
	document.getElementById("headerSub").textContent = subs[Math.floor(Math.random() * subs.length)];
	sendStart();
}

function startLogin(){
	status("");
	hideAllDialogs();
	document.getElementById("dialog_login").style.display = "block";
}
function relogin(){
	startLogin();
}

function startCodeRequest(){
	status("");
	hideAllDialogs();
	document.getElementById("dialog_code").style.display = "block";
}

function startTeamSelect(teams){
	status("Select team:");
	hideAllDialogs();
	let teamSelector = document.getElementById("dialog_team");
	teamSelector.innerHTML = "";
	for (let t of teams){
		let option = document.createElement("div");
		option.className = "xbutton";
		option.textContent = t.name + " : " + t.id;
		option.onclick = () => {selectTeam(t.id);};
		teamSelector.appendChild(option);
	}
	teamSelector.style.display = "inline-block";
}

function startAppSelect(apps){
	status("Select app:");
	hideAllDialogs();
	let appSelector = document.getElementById("dialog_apps");
	appSelector.innerHTML = "";
	for (let a of apps){
		let option = document.createElement("div");
		option.className = "xbutton";
		option.textContent = a.name + " : " + a.bundle;
		option.onclick = () => {selectApp(a);};
		appSelector.appendChild(option);
	}
	appSelector.style.display = "inline-block";
}

function isValid(order){
	if (!["rs", "nc", "c"].includes(order.type))
		return false;
	
	if (order.refname.length < 2)
		return false;
	
	if (order.bundle.length < 2)
		return false;

	if (order.version.name.length < 2)
		return false;

	if (order.version.desc.length < 2)
		return false;

	if (order.type == "rs"){
		if (!["1w", "1m", "2m", "3m", "6m", "1y"].includes(order.duration))
			return false;

		if (!["off", "3d", "1w", "1m", "2m", "3m", "6m", "1y"].includes(order.trial))
			return false;
	}

	return true;
}

function collectOrders(sheet, appBundle){
	let source = sheet.getData();
	let harvested = [];
	for (let row of source){
		if (!row[0]) continue;
		let productId = row[2];
		if (!productId.startsWith(appBundle)){
			if (productId.startsWith("."))
				productId = appBundle + productId;
			else
				productId = appBundle + "." + productId;
		}

		let entry = {
			type:    row[0],
			refname: row[1],
			bundle:  productId,
	
			version: {
				name: row[7],
				desc: row[8]
			}
		};
		if (entry.type == "rs"){
			entry.duration = row[5];
			entry.trial    = row[6];
			entry.price    = row[3];
		} else {
			entry.price    = row[4];
		}
		if (isValid(entry))
			harvested.push(entry);
		else {
			showModal("INVALID ENTRIES DETECTED");
			return [];
		}
	}
	return harvested;
}

function addOrders(sheet, data){
	let row = sheet.countRows() - 1;
	let newCells = [];
	for (let entry of data){
		newCells.push([row, 0, entry.type]);
		newCells.push([row, 1, entry.refname]);
		newCells.push([row, 2, entry.bundle]);
		newCells.push([row, 7, entry.version.name]);
		newCells.push([row, 8, entry.version.desc]);
		if (entry.type == "rs"){
			newCells.push([row, 3, entry.price]);
			newCells.push([row, 5, entry.duration]);
			newCells.push([row, 6, entry.trial]);
		} else {
			newCells.push([row, 4, entry.price]);
		}
		row += 1;
	}
	sheet.setDataAtCell(newCells);
}
function addFromFile(file){
	function processCSV(rawData){
		let ignoreRows = [];
		for (let e of rawData.errors){
			ignoreRows.push("" + e.row);
		}
		let processed = [];
		for (let i in rawData.data){
			if (ignoreRows.includes(i)) continue;

			let row = rawData.data[i];
			let data = {
				type:    row["Type"].toLowerCase(),
				refname: row["Reference Name"],
				bundle:  row["Bundle Suffix"],
				price:   row["Price (USD)"],

				version: {
					name: row["Name (en-US)"],
					desc: row["Desc (en-US)"]
				}
			};
			if (data.type == "rs"){
				data.duration = row["Duration"];
				data.trial    = row["Trial"] == "" ? "off" : row["Trial"];
			}
			processed.push(data);
		}
		addOrders(table, processed);
	}

	Papa.parse(file, {
		header: true,
		complete: function(results) {
			processCSV(results);
		}
	});
}
function startMainDialog(cMatrix, rsMatrix, appBundle, appId){
	status(appBundle);
	hideAllDialogs();
	let dialogSheet = document.getElementById("dialog_sheet");
	dialogSheet.style.display = "block";
	initSheet(rsMatrix, cMatrix);
	let dialog = document.getElementById("dialog_main");
	dialog.style.display = "block";
}

function loginComplete(){
	listApps();
}



function processCommonResponses(response){
	switch(response.code){
	case(RESPONSE_CODES.AUTH):
		startLogin();
		return true;
	case(RESPONSE_CODES.ERROR):
		status("E: " + response.message);
		return true;
	default:
		return false;
	}
}

function showModal(message){
	let back = document.createElement("div");
	back.className = "modal";

	let box = document.createElement("div");
	box.className = "modal-content";

	let text = document.createElement("div");
	text.textContent = message;

	let close = document.createElement("div");
	close.className = "xbutton";
	close.textContent = "close";
	let closer = ()=>{
		back.remove();
	};
	back.onclick = closer;
	close.onclick = closer;

	box.appendChild(text);
	box.appendChild(close);
	back.appendChild(box);

	document.documentElement.appendChild(back);
}

function servicePrices(){
	let c = COMMANDS.service;
	c.options.message = "PRICES";
	sendCommand(c, (r)=>{
		if (r.error)
			showModal(r.error);
		else {
			let result = "Subscription prices: \n";
			for (let item of r.rs){
				result += item.price + "$\n";
			}
			result += "\n Consumable and Non-Consumable prices: \n"
			for (let item of r.c){
				result += item.price + "$\n";
			}
			showModal(result);
		}
	});
}

function serviceSignout(){
	let c = COMMANDS.service;
	c.options.message = "SIGNOUT";
	sendCommand(c, (r)=>{
		start();
	});
}

function serviceReset(){
	let c = COMMANDS.service;
	c.options.message = "RESET";
	sendCommand(c, (r)=>{
		showModal("Settings cleared");
		start();
	});
}

function sendStart(){
	status("Fetching available sessions...");
	let message = COMMANDS.start;

	sendCommand(message, (r)=>{
		switch(r.code){
		/*case(RESPONSE_CODES.AUTH):
			//Overriden by common responses
			startLogin();
			break;*/
		case(RESPONSE_CODES.OK):
			loginComplete();
			break;
		case(RESPONSE_CODES.SELECT_TEAM):
			startTeamSelect(r.teams);
			break;
		default:
			status(r);
		}
	});

	return false;
}

function sendLogin(){
	status("Signing in...");
	let l = document.getElementById("dialog_login_login").value;
	let p = document.getElementById("dialog_login_password").value;
	let message = COMMANDS.login;
	message.options.login = l;
	message.options.password = p;

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.CODE):
				startCodeRequest();
				break;
			case(RESPONSE_CODES.OK):
				status("Signed in without code");
				loginComplete();
				break;
			default:
				status(r);
		}
	});

	return false;
}

function sendCode(){
	status("Sending code...");
	let c = document.getElementById("dialog_code_code").value;
	let message = COMMANDS.code;
	message.options.code = c;

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.CODE):
				status("Wrong Code");
				break;
			case(RESPONSE_CODES.SELECT_TEAM):
				startTeamSelect(r.teams);
				break;
			case(RESPONSE_CODES.OK):
				loginComplete();
				break;
			default:
				status(r);
		}
	});
	
	return false;
}

function selectTeam(id){
	status("");
	let message = COMMANDS.selectTeam;
	message.options.name = "unset";
	message.options.id = id;

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.OK):
				loginComplete();
				break;
			default:
				status(r);
		}
	});

	return false;
}

function listApps(){
	status("");
	hideAllDialogs();
	let message = COMMANDS.apps;

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.OK):
				startAppSelect(r.apps);
				break;
			default:
				status(r);
		}
	});
	
	return false;
}

function selectApp(app){
	status("");
	selectedApp = app;

	let message = COMMANDS.selectApp;
	message.options.appId = app.id;

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.OK):
				startMainDialog(r.cMatrix, r.rsMatrix, app.bundle, app.id);
				break;
			default:
				status(r);
		}
	})

	return false;
}

let defaultButtonColor;
let buttonsLocked = false;
function createIAPs(){
	if (buttonsLocked) return;
	buttonsLocked = true;
	status("IAP creation process is initiated. You can observe progress using console.");
	
	let message = COMMANDS.create;
	message.options.appId = selectedApp.id;
	message.options.orders = collectOrders(table, selectedApp.bundle);

	let button = document.getElementById("dialog_main_button_create");
	defaultButtonColor = button.style.backgroundColor;
	button.style.backgroundColor = "#FDD";

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.OK):
				status("Finished, check console");
				button.style.backgroundColor = defaultButtonColor;
				buttonsLocked = false;
				break;
			case(RESPONSE_CODES.ERROR):
				status(r.message);
				break;
			default:
				status(r);
		}
	})

	return false;
}

function recreateIAPs(){
	if (buttonsLocked) return;
	buttonsLocked = true;
	status("IAP creation process is initiated. You can observe progress using console.");

	let message = COMMANDS.recreate;
	message.options.appId = selectedApp.id;

	let button = document.getElementById("dialog_main_button_recreate");
	defaultButtonColor = button.style.backgroundColor;
	button.style.backgroundColor = "#FDD";

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.OK):
				status("Finished, check console");
				button.style.backgroundColor = defaultButtonColor;
				buttonsLocked = false;
				break;
			case(RESPONSE_CODES.ERROR):
				status(r.message);
				break;
			default:
				status(r);
		}
	})

	return false;
}

function sendCommand(command, callback){
	fetch(SERVER, {
		method: 'POST', 
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', 
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(command)
	}).then(res => res.text().then(res => {

		let response = JSON.parse(res);

		if (!processCommonResponses(response)){
			callback(response);
		}
	}));
	
	return false;
}