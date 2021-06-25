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

function initRadios(){
	let radiohosts = document.getElementsByClassName("xradio_host");
	
	for (let host of radiohosts){
		let first = null;
		
		if (radios[host.id]) continue;

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
	
}


function start(){
	sendStart();
	initRadios();
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
	for (let a of apps){
		let option = document.createElement("div");
		option.className = "xbutton";
		option.textContent = a.name + " : " + a.bundle;
		option.onclick = () => {selectApp(a.bundle, a.id);};
		appSelector.appendChild(option);
	}
	appSelector.style.display = "inline-block";
}

function startIAPSelect(iaps){
	status("Select IAP:");
	hideAllDialogs();
	let appSelector = document.getElementById("dialog_iaps");
	for (let i of iaps){
		let option = document.createElement("div");
		option.className = "xbutton";
		option.textContent = i.refname;
		//option.onclick = () => {selectApp(i.refname);};
		appSelector.appendChild(option);
	}
	appSelector.style.display = "inline-block";
}

function createCreationForm(appBundle, formId){

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

	return item;
}

function radioSelected(id){
	return document.getElementById(id).querySelector(".xradio_selected").id;
}

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

function startCreationDialog(cMatrix, rsMatrix, appBundle, appId){
	status(appBundle);
	hideAllDialogs();
	let dialog = document.getElementById("dialog_create");

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

	let item = createCreationForm(appBundle, "x");
	let boom = document.createElement("div");
	boom.className = "xbutton";
	boom.textContent = "do porn";
	boom.onclick = () => {
		order = collectData(appBundle, "x");
		createIAP([order], appId);
	}
	item.appendChild(boom);

	dialog.appendChild(item);
	dialog.style.display = "block";
	initRadios();
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
	status("");
	
	let message = COMMANDS.create;
	message.options.appId = appId;
	message.options.orders = orders;

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.OK):
				status("OK");
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