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
let selectedApp = "";

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

	if (group.startsWith("dialog_create_iap_type")){
		let host = document.getElementById(group);
		let form = document.getElementById(group.replace("dialog_create_iap_type_", "dialog_create_"));

		let s = form.querySelectorAll(".rsonly");
		let c = form.querySelectorAll(".conly");
		switch(selected){
			case("rs"):
				for (let el of s){
					el.style = "display: block";
				}
				for (let el of c){
					el.style = "display: none";
				}

				break;
			case("c"):
			case("nc"):

				for (let el of c){
					el.style = "display: block";
				}
				for (let el of s){
					el.style = "display: none";
				}
				break;
		}
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
		option.onclick = () => {selectApp(a.bundle, a.id);};
		appSelector.appendChild(option);
	}
	appSelector.style.display = "inline-block";
}

function createCreationForm(parent, appBundle, formId){

	function createRadio(id, options){
		let host = document.createElement("div");
		host.className = "xradio_host";
		host.id = id;

		for (let o of options){
			let option = document.createElement("div");
			option.className = "xradio";
			option.id = o.id;
			option.textContent = o.name;
			host.appendChild(option);
		}

		return host;
	}

	let item = document.createElement("div");
	item.className = "subgroup";
	item.id = "dialog_create_" + formId;

	let typeGroup = document.createElement("div");
	typeGroup.className = "subgroup";

	let typeTitle = document.createElement("div");
	typeTitle.textContent = "IAP type";
	typeGroup.appendChild(typeTitle);

	let typeRadio = createRadio("dialog_create_iap_type_" + formId, [
		{
			id: "rs",
			name: "RS"
		},{
			id: "c",
			name: "C"
		},{
			id: "nc",
			name: "NC"
		}
	]);
	typeGroup.appendChild(typeRadio);

	item.appendChild(typeGroup);


	let nameGroup = document.createElement("div");
	nameGroup.className = "subgroup";

	let refnameTitle = document.createElement("div");
	refnameTitle.textContent = "Reference name";
	nameGroup.appendChild(refnameTitle);

	let refnameInput = document.createElement("input");
	refnameInput.type = "text";
	refnameInput.id = "dialog_create_iap_refname";
	refnameInput.class = "longinput";
	refnameInput.placeholder = "1 month gold";
	nameGroup.appendChild(refnameInput);

	let bundleTitle = document.createElement("div");
	bundleTitle.textContent = "IAP bundle name";
	bundleTitle.style = "margin-top: 10px";

	nameGroup.appendChild(bundleTitle);

	let bundlePrefix = document.createElement("div");
	bundlePrefix.textContent = appBundle + ".";
	nameGroup.appendChild(bundlePrefix);

	let bundleInput = document.createElement("input");
	bundleInput.type = "text";
	bundleInput.id = "dialog_create_iap_bundle";
	bundleInput.class = "longinput";
	bundleInput.placeholder = "silver.1m";
	bundlePrefix.appendChild(bundleInput);

	item.appendChild(nameGroup);
	

	let durGroup = document.createElement("div");
	durGroup.className = "subgroup rsonly";

	let durTitle = document.createElement("div");
	durTitle.textContent = "IAP duration";
	durGroup.appendChild(durTitle);

	let durRadio = createRadio("dialog_create_iap_duration_" + formId, [
		{
			id: "1w",
			name: "1w"
		},
		{
			id: "1m",
			name: "1m"
		},
		{
			id: "2m",
			name: "2m"
		},
		{
			id: "3m",
			name: "3m"
		},
		{
			id: "6m",
			name: "6m"
		},
		{
			id: "1y",
			name: "1y"
		}
	]);
	durGroup.appendChild(durRadio);

	item.appendChild(durGroup);
	

	let trialGroup = document.createElement("div");
	trialGroup.className = "subgroup rsonly";

	let trialTitle = document.createElement("div");
	trialTitle.textContent = "IAP trial";
	trialGroup.appendChild(trialTitle);

	let trialRadio = createRadio("dialog_create_iap_trial_" + formId, [
		{
			id: "off",
			name: "off"
		},
		{
			id: "3d",
			name: "3d"
		},
		{
			id: "1w",
			name: "1w"
		},
		{
			id: "1m",
			name: "1m"
		},
		{
			id: "2m",
			name: "2m"
		},
		{
			id: "3m",
			name: "3m"
		},
		{
			id: "6m",
			name: "6m"
		},
		{
			id: "1y",
			name: "1y"
		}
	]);
	trialGroup.appendChild(trialRadio);

	item.appendChild(trialGroup);

	
	let rsPriceGroup = document.createElement("div");
	rsPriceGroup.className = "subgroup rsonly";

	let rsPricePrefix = document.createElement("div");
	rsPricePrefix.textContent = "Price: ";

	let rsPriceInput = document.createElement("input");
	rsPriceInput.type = "text";
	rsPriceInput.id = "dialog_create_iap_rsPrice";
	rsPriceInput.className = "shortinput";
	rsPriceInput.setAttribute('list', "rsdatalist");
	rsPricePrefix.appendChild(rsPriceInput);
	
	rsPriceGroup.appendChild(rsPricePrefix);

	item.appendChild(rsPriceGroup);

	
	let cPriceGroup = document.createElement("div");
	cPriceGroup.className = "subgroup conly";

	let cPricePrefix = document.createElement("div");
	cPricePrefix.textContent = "Price: ";

	let cPriceInput = document.createElement("input");
	cPriceInput.type = "text";
	cPriceInput.id = "dialog_create_iap_cPrice";
	cPriceInput.className = "shortinput";
	cPriceInput.setAttribute('list', "cdatalist")
	cPricePrefix.appendChild(cPriceInput);
	
	cPriceGroup.appendChild(cPricePrefix);

	item.appendChild(cPriceGroup);


	let versionGroup = document.createElement("div");
	versionGroup.className = "subgroup";

	let versionTitle = document.createElement("div");
	versionTitle.textContent = "en-US";
	versionGroup.appendChild(versionTitle);

	let nameInput = document.createElement("input");
	nameInput.type = "text";
	nameInput.id = "dialog_create_iap_name";
	nameInput.className = "longinput";
	nameInput.placeholder = "Name";
	versionGroup.appendChild(nameInput);

	let descInput = document.createElement("input");
	descInput.type = "text";
	descInput.id = "dialog_create_iap_desc";
	descInput.className = "longinput";
	descInput.placeholder = "Description";
	versionGroup.appendChild(descInput);


	item.appendChild(versionGroup);

	parent.appendChild(item);

	initRadio(typeRadio);
	initRadio(durRadio);
	initRadio(trialRadio);
}

function radioSelected(id){
	return document.getElementById(id).querySelector(".xradio_selected").id;
}

/*
data = {
	all strings

	type:    rs | nc | c
	refname: 1 month gold
	bundle:  com.pom.bum

	//rs-specific
	data.duration = 1y
	data.trial    = 3d
	data.price    = 0.99
	
	//c-specific
	data.price    = 0.99
	version: {
		name: IAP Name
		desc: IAP Description
	}
}
*/

function collectData(appBundle, formId){
	let form = document.getElementById("dialog_create_" + formId);
	let data = {
		type:    radioSelected("dialog_create_iap_type_" + formId),
		refname: form.querySelector("#dialog_create_iap_refname").value,
		bundle:  appBundle + "." + form.querySelector("#dialog_create_iap_bundle").value,

		version: {
			name: form.querySelector("#dialog_create_iap_name").value,
			desc: form.querySelector("#dialog_create_iap_desc").value
		}
	};
	if (data.type == "rs"){
		data.duration = radioSelected("dialog_create_iap_duration_" + formId);
		data.trial    = radioSelected("dialog_create_iap_trial_" + formId);
		data.price    = form.querySelector("#dialog_create_iap_rsPrice").value;
	} else {
		data.price    = form.querySelector("#dialog_create_iap_cPrice").value;
	}
	return data;
}

function setData(data, formId){
	let form = document.getElementById("dialog_create_" + formId);

	onRadioChange("dialog_create_iap_type_" + formId, data.type);
	form.querySelector("#dialog_create_iap_refname").value = data.refname;
	form.querySelector("#dialog_create_iap_bundle").value = data.bundle

	form.querySelector("#dialog_create_iap_name").value = data.version.name;
	form.querySelector("#dialog_create_iap_desc").value = data.version.desc;

	if (data.type == "rs"){
		onRadioChange("dialog_create_iap_duration_" + formId, data.duration);
		onRadioChange("dialog_create_iap_trial_" + formId, data.trial);
		form.querySelector("#dialog_create_iap_rsPrice").value = data.price;
	} else {
		form.querySelector("#dialog_create_iap_cPrice").value = data.price;
	}
}

function isValid(data){
	if (!["rs", "nc", "c"].includes(data.type))
		return false;
	
	if (data.refname.length < 2)
		return false;
	
	if (data.bundle.length < 2)
		return false;

	if (data.version.name.length < 2)
		return false;

	if (data.version.desc.length < 2)
		return false;

	if (data.type == "rs"){
		if (!["1w", "1m", "2m", "3m", "6m", "1y"].includes(data.duration))
			return false;

		if (!["off", "3d", "1w", "1m", "2m", "3m", "6m", "1y"].includes(data.trial))
			return false;
	}

	return true;
}

let creationDialogItemCount = 0;
function startCreationDialog(cMatrix, rsMatrix, appBundle, appId){
	status(appBundle);
	hideAllDialogs();
	let dialog = document.getElementById("dialog_create");
	dialog.innerHTML = "";

	if (!document.getElementById("cdatalist")){
		let cDatalist = document.createElement("datalist");
		cDatalist.id = "cdatalist";
		for (let c of cMatrix){
			let cOption = document.createElement("option");
			cOption.value = c.price;
			cDatalist.appendChild(cOption);
		}
		dialog.appendChild(cDatalist);
	}
	if (!document.getElementById("rsdatalist")){
		let rsDatalist = document.createElement("datalist");
		rsDatalist.id = "rsdatalist";
		for (let rs of rsMatrix){
			let rsOption = document.createElement("option");
			rsOption.value = rs.price;
			rsDatalist.appendChild(rsOption);
		}
		dialog.appendChild(rsDatalist);
	}
	
	let back = document.createElement("div");
	back.className = "xbutton";
	back.textContent = "Back to app list";
	back.onclick = () => {
		listApps();
	}
	dialog.appendChild(back);

	let start = document.createElement("div");
	start.className = "xbutton";
	start.textContent = "Start IAP creation";
	start.onclick = () => {
		start.onclick = null;
		back.remove();
		start.remove();
		let order = [];
		for (let i = 0; i < creationDialogItemCount; ++i){
			order.push(collectData(appBundle, i));
		}
		createIAP(order, appId);
	}
	dialog.appendChild(start);

	let picker = document.createElement("input");
	picker.type = "file";
	picker.id = "filePicker";
	picker.setAttribute("for", "filePicker");
	dialog.appendChild(picker);

	let pickerButton = document.createElement("label");
	pickerButton.className = "xbutton";
	pickerButton.textContent = "Load from file";
	pickerButton.setAttribute("for", "filePicker");
	dialog.appendChild(pickerButton);
	
	let addItem = document.createElement("div");
	addItem.className = "xbutton";
	addItem.textContent = "Add order";
	addItem.onclick = () => {
		createCreationForm(dialog, appBundle, "" + creationDialogItemCount);
		creationDialogItemCount += 1;
	}
	dialog.appendChild(addItem);
	
	let remItem = document.createElement("div");
	remItem.className = "xbutton";
	remItem.textContent = "Remove last order";
	remItem.onclick = () => {
		if (creationDialogItemCount > 0){
			document.getElementById("dialog_create_" + (creationDialogItemCount - 1)).remove();
			creationDialogItemCount -= 1;
		}
	}
	dialog.appendChild(remItem);

	function processCSV(rawData){
		let ignoreRows = [];
		for (let e of rawData.errors){
			ignoreRows.push("" + e.row);
		}
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

			if (isValid(data)){
				addItem.onclick();
				setData(data, creationDialogItemCount - 1);
			} else {
				console.log("Invalid entry at row " + i);
				console.log(data);
			}
		}
	}

	picker.addEventListener('change', function(){
		Papa.parse(picker.files[0], {
			header: true,
			complete: function(results) {
				processCSV(results);
			}
		});
	});

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

function selectApp(bundle, id){
	status("");
	selectedApp = id;

	let message = COMMANDS.selectApp;
	message.options.appId = id;

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.OK):
				startCreationDialog(r.cMatrix, r.rsMatrix, bundle, id);
				break;
			default:
				status(r);
		}
	})

	return false;
}

function createIAP(orders, appId){
	status("IAP creation process is initiated. You can observe progress using console.");
	
	let message = COMMANDS.create;
	message.options.appId = appId;
	message.options.orders = orders;

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.OK):
				status("OK");
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