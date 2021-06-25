const http = require('http');   //For server
const https = require('https'); //For apol
const fs = require('fs');       //For fuck's sake (storage)
const zlib = require("zlib");   //For reading apol POST responses (really)

const hostname = "127.0.0.1";
const port = 7071;

const DEBUG_MODE = false;

let storage = {};
function loadStorage(){
	try {
		let f = fs.readFileSync('storage.json');
		if (f) storage = JSON.parse(f);
	} catch (e){
		console.log("No saved storages found, will load new");
	}
}
function saveStorage(){
	let s = JSON.stringify(storage)
	fs.writeFileSync("storage.json", s);
}
loadStorage();

const server = http.createServer((req, res) => {
	// Set CORS headers
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Request-Method", "*");
	res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
	res.setHeader("Access-Control-Allow-Headers", "*");
	if (req.method === "OPTIONS") {
		res.writeHead(200);
		res.end();
		return;
	}

	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');

	let data = [];
	req.on('data', chunk => {
		data.push(chunk);
	});
	req.on('end', async () => {
		let m = Buffer.concat(data).toString();
		let r = await respondToCommand(JSON.parse(m));
		res.end(JSON.stringify(r));
	});
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);

	if (!storage["serviceKey"])
		sendServiceKeyRequest().then((key) => setServiceKey(key));
	
	let path = process.execPath;
	path = path.substring(0, path.lastIndexOf("/") + 1);
	if (DEBUG_MODE){
		console.log("RUNNING IN DEBUG MODE");
	} else {
		process.chdir(path);
		console.log("Jumped to " + path);
		let url = './client/strelitzia.html';
		let start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
		require('child_process').exec(start + ' ' + url);
	}
});

const RESPONSE_CODES = {
	ERROR: 0,
	AUTH: 1,
	CODE: 2,
	OK:   3,
	SELECT_TEAM: 4
}

const IAP_TYPE_C   = "consumable";
const IAP_TYPE_NC  = "nonConsumable";
const IAP_TYPE_RS  = "recurring";
const IAP_TYPE_NRS = "subscription";

const IAP_TYPE_NAMES = {
	"ITC.addons.type.consumable"   : IAP_TYPE_C,
	"ITC.addons.type.nonConsumable": IAP_TYPE_NC,
	"ITC.addons.type.recurring"    : IAP_TYPE_RS,
	"ITC.addons.type.subscription" : IAP_TYPE_NRS,
	"consumable"   : IAP_TYPE_C,
	"nonConsumable": IAP_TYPE_NC,
	"recurring"    : IAP_TYPE_RS,
	"subscription" : IAP_TYPE_NRS,
	"rs" : IAP_TYPE_RS,
	"c"  : IAP_TYPE_C,
	"nc" : IAP_TYPE_NC
}

const ENDPOINTS = {
	serviceKey:            "https://appstoreconnect.apple.com/olympus/v1/app/config?hostname=itunesconnect.apple.com",
	olympus:               "https://appstoreconnect.apple.com/olympus/v1/session",
	login:                 "https://idmsa.apple.com/appleauth/auth/signin",
	code:                  "https://idmsa.apple.com/appleauth/auth/verify/trusteddevice/securitycode",
	preferredCurrencies:   "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/users/itc/preferredCurrencies",
	userdetails:           "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/user/detail",
	listApps:              "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/manageyourapps/summary/v2",
	listIAPs:              "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps",                                   //appId
	listFamilies:          "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/families",                          //appId
	iapDetails:            "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/#",                                 //appId, productId
	iapTemplate:           "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/#/template",                        //appId, type
	famTemplate:           "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/family/template",                   //appId
	priceMatrixRecurring:  "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/pricing/matrix/recurring",          //appId
	priceMatrixConsumable: "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/pricing/matrix?iapType=consumable", //appId
	create:                "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps",                                   //appId
	createFamily:          "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/family/",                           //appId
	rsPriceCreate:         "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/#/pricing/subscriptions",           //appId, productId
	trialCreate:           "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/iaps/pricing/batch",
	countryCodes:          "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/users/itc/preferredCurrencies",
	countryCodesBetter:    "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/pricing/supportedCountries"
}

const METHOD_GET = "GET";
const METHOD_POST = "POST";
const METHOD_PUT = "PUT";

async function respondToCommand(command){
	let response = {
		code: RESPONSE_CODES.ERROR,
		message: "Error message unset"
	}

	switch (command.command){
	case ("SERVICE"):{
		switch (command.options.message){
		case ("PRICES"):{
			if (storage.rsMatrix){
				return {
					rs: storage.rsMatrix,
					c: storage.rsMatrix
				};
			} else {
				return {
					error: "Authorize and select any app to download pricing matrixes"
				};
			}
			break;
		}
		case ("SIGNOUT"):{
			delete storage.cookies;
			delete storage.team;
			saveStorage();
			return("OK");
			break;
		}
		case ("RESET"):{
			storage = {};
			saveStorage();
			let key = await sendServiceKeyRequest();
			setServiceKey(key);
			return("OK");
			break;
		}
		}
		break;
	}
	case ("START"):{
		let olympusResponse = await sendToOlympus();
		if (olympusResponse == "AUTH"){
			response.code = RESPONSE_CODES.AUTH;
			return response;
		} else {
			if (!storage["team"]){
				let ud = await sendUserDetails();
				if (ud == "AUTH"){
					response.code = RESPONSE_CODES.AUTH;
					return response;
				} else {
					let parsed = JSON.parse(ud);
					if (parsed.data){
						if (parsed.data.associatedAccounts.length > 1){
							let teamOptions = [];
							for (let a of parsed.data.associatedAccounts){
								let team = {
									name: a.contentProvider.name,
									id: a.contentProvider.contentProviderId
								};
								teamOptions.push(team);
							}
							response.code = RESPONSE_CODES.SELECT_TEAM;
							response.teams = teamOptions;
							return response;
						} else {
							storage["team"] = parsed.data.associatedAccounts[0].contentProvider.contentProviderId;
							response.code = RESPONSE_CODES.OK;
							return response;
						}
					} else {
						response.code = RESPONSE_CODES.ERROR;
						response.message = "Requsted teams, but can't parse response";
						return response;
					}
				}
			} else {
				response.code = RESPONSE_CODES.OK;
				return response;
			}
		}
		break;
	}
	case ("LOGIN"):{
		let loginResponse = await sendLogin(command.options.login, command.options.password);

		if (loginResponse == "CODE"){
			response.code = RESPONSE_CODES.CODE;
		} else {
			response.code = RESPONSE_CODES.ERROR;
			response.message = loginResponse;
		}
		
		return response;
	}
	case ("CODE"):{
		let codeResponse = await sendCode(command.options.code);
		if (codeResponse == "OK"){
			//Repeat start sequence in order to check teams and obtain active session
			let fakeStartCommand = {
				command: "START",
				options: {}
			}
			let final = await respondToCommand(fakeStartCommand);
			return final;
		} else if (codeResponse == "WRONG"){
			response.code = RESPONSE_CODES.CODE;
		}
		return(response);
	}
	case ("SEL_TEAM"):{
		storage["team"] = command.options.id;
		saveStorage();
		response.code = RESPONSE_CODES.OK;
		return response;
	}
	case ("APPS"):{
		let appsResponse = await sendAppsRequest();

		if (appsResponse == "AUTH"){
			response.code = RESPONSE_CODES.AUTH;
		} else {
			let data = JSON.parse(appsResponse);
			let apps = [];
			for (let app of data.data.summaries){
				let a = {
					id: app.adamId,
					name: app.name,
					bundle: app.bundleId,
					icon: app.iconUrl
				}
				apps.push(a);
			}
			response.code = RESPONSE_CODES.OK;
			response.apps = apps;
		}

		return response;
	}
	case ("SEL_APP"):{
		if (!storage.rsMatrix){
			let rsmResponse = await sendRSMatrixRequest(command.options.appId);
			if (rsmResponse == "AUTH"){
				response.code = RESPONSE_CODES.AUTH;
				return response;
			} else {
				let rawRSMatrix = JSON.parse(rsmResponse).data;
				let rsMatrix = [];
				for (let tier of rawRSMatrix.pricingTiers){
					for (let pricingInfo of tier.pricingInfo){
						if (pricingInfo.countryCode == "US"){
							let t = {
								tier: tier.tierStem,
								price: ""+pricingInfo.retailPrice
							}
							rsMatrix.push(t);
							break;
						}
					}
				}
				storage.rsMatrix = rsMatrix;
				saveStorage();
			}
		}

		if (!storage.cMatrix){
			let cmResponse = await sendCMatrixRequest(command.options.appId);
			if (cmResponse == "AUTH"){
				response.code = RESPONSE_CODES.AUTH;
				return response;
			} else {
				let rawCMatrix = JSON.parse(cmResponse).data;
				let cMatrix = [];
				for (let tier of rawCMatrix.pricingTiers){
					for (let pricingInfo of tier.pricingInfo){
						if (pricingInfo.countryCode == "US"){
							let t = {
								tier: tier.tierStem,
								price: ""+pricingInfo.retailPrice
							}
							cMatrix.push(t);
							break;
						}
					}
				}
				storage.cMatrix = cMatrix;
				saveStorage();
			}
		}

		if (!storage.countryCodes){
			let ccResponse = await sendCountriesRequest();
			let ccParsed = JSON.parse(ccResponse).data;
			let codesArray = [];
			for (let country of ccParsed)
				codesArray.push(country.code);

			storage.countryCodes = codesArray;
			saveStorage();
		}
		
		response.code = RESPONSE_CODES.OK;
		response.rsMatrix = storage.rsMatrix;
		response.cMatrix = storage.cMatrix;
		return response;
	}
	case ("CREATE_IAP"):{
		function determineTier(type, price){
			for (let t of (type == "rs") ? storage.rsMatrix : storage.cMatrix){
				if (price == t.price){
					return t.tier;
				}
			}
			return 0;
		}

		function buildSubscriptionPricing(tier){
			let data = {
				subscriptions: []
			}
			for (let code of storage.countryCodes){
				let entry = {
					errorKeys: null,
					isEditable: true,
					isRequired: false,
					value: {
						country: code,
						grandfathered: {
							value: "FUTURE_NONE", 
							isEditable: false, 
							isRequired: false, 
							errorKeys: null
						},
						priceTierEffectiveDate: null,
						priceTierEndDate: null,
						tierStem: tier
					}
				}
				data.subscriptions.push(entry);
			}
			return data;
		}

		function buildTrialRequest(trial, appId, productId){
			function pad(num, size) {
				let s = "00" + num;
				return s.substr(s.length - size);
			}
			let d = new Date();
			
			let currentDate = "" + d.getFullYear() + "-" + pad((d.getMonth() + 1), 2) + "-" + pad(d.getDate(), 2);
			let data = {
				batch: [{
					method: "POST",
					path: "/apps/" + appId + "/iaps/" + productId + "/pricing/intro-offers",
					value: {
						introOffers: []
					}
				}]
			}
			for (let code of storage.countryCodes){
				let entry = {
					errorKeys: null,
					isEditable: true,
					isRequired: true,
					value: {
						country: code,
						durationType: trial,
						numOfPeriods: 1,
						offerModeType: "FreeTrial",
						startDate: currentDate,
						endDate: null,
						tierStem: null	
					}
				}
				data.batch[0].value.introOffers.push(entry);
			}
			return data;
		}

		async function obtainFreshPurchase(appId, productId, tries){
			while (tries > 0){
				let iapsResponse = await sendIAPsRequest(appId);

				let iapsParsed = JSON.parse(iapsResponse).data;
				for (let i of iapsParsed)
					if (i.vendorId == productId)
						return i;

				//console.log("apple is shid")
				tries -= 1;
			}
			return null;
		}

		function reportErrorsIfAny(e, target){
			if (e && e.length > 0){
				console.log("Errors (" + target + "): ");
				console.log(e.join("\n"));
				console.log("\n");
			}
		}
		let currentFamily = {
			name: null,
			id: null
		}

		console.log("\nReceived order. Acquiring list of created families")
		let familiesResponse = await sendFamiliesRequest(command.options.appId);
		if (familiesResponse == "AUTH"){
			response.code = RESPONSE_CODES.AUTH;
			return response;
		} else {
			let parsed = JSON.parse(familiesResponse).data;
			if (parsed.length >= 1){
				currentFamily.name = parsed[0].name.value;
				currentFamily.id = parsed[0].id;
				console.log("Detected created family. Using \"" + currentFamily.name + "\"")
			} else {
				console.log("No families detected, will create a new one with name \"" + order.options.defaultFamilyName + "\"");
			}
		}

		console.log("Run initiated, orders in queue: " + command.options.orders.length);
		let finishedCount = 0;
		for (let order of command.options.orders){
			let baseResponse;
			
			let versions = {value: {
				description: {value: order.version.desc},
				name:        {value: order.version.name},
				localeCode:  "en-US"
			}};

			if (order.type == "rs" && !currentFamily.name){
				//Create subscription together with family
				let templateResponse = await sendFamilyTemplateRequest(command.options.appId);
				if (templateResponse == "AUTH"){
					response.code = RESPONSE_CODES.AUTH;
					return response;
				}

				let template = JSON.parse(templateResponse).data;
				template.activeAddOns[0].productId = {value: order.bundle};
				template.activeAddOns[0].referenceName = {value: order.refname};
				//template.activeAddOns[0].pricingDurationType = {value: order.duration}; //doesn't work
				template.name = {value: order.options.defaultFamilyName};
				template.details.value = [];
				let famCreateResponse = await sendFamilyCreation(template, command.options.appId);

				if (famCreateResponse == "OK"){
					let found = await obtainFreshPurchase(command.options.appId, order.bundle, 7);

					//Register freshly created family
					familiesResponse = await sendFamiliesRequest(command.options.appId);
					reportErrorsIfAny(requestErrors, order.bundle);
					let parsed = JSON.parse(familiesResponse).data;
					if (parsed.length >= 1){
						currentFamily.name = parsed[0].name.value;
						currentFamily.id = parsed[0].id;
					}

					if (!found){
						response.code = RESPONSE_CODES.ERROR;
						response.message = "Failed to find freshly created IAP";
						return response;
					}

					let detailsResponse = await sendIAPDetailsRequest(command.options.appId, found.adamId);
					reportErrorsIfAny(requestErrors, order.bundle);
					let freshProduct = JSON.parse(detailsResponse).data;
					freshProduct.versions[0].details.value = [versions];
					freshProduct.pricingDurationType = {value: order.duration};
					
					baseResponse = await sendIAPDetailsRefresh(freshProduct, command.options.appId, found.adamId);
					if (baseResponse != "OK") {
						console.log("Failed to fill purchase details for fresh family product, please check " + order.bundle);
						reportErrorsIfAny(requestErrors, order.bundle);
					}
				} else {
					console.log("Failed to create family, aborting");
					break;
				}
			} else {
				//Create IAP normally
				let templateResponse = await sendTemplateRequest(command.options.appId, IAP_TYPE_NAMES[order.type]);
				if (templateResponse == "AUTH"){
					response.code = RESPONSE_CODES.AUTH;
					return response;
				}

				let template = JSON.parse(templateResponse).data;
				template.familyId = currentFamily.id;
				template.productId = {value: order.bundle};
				template.referenceName = {value: order.refname};
				template.clearedForSale = {value: true};

				template.pricingIntervals = [{value:{
					country: "WW",
					tierStem: determineTier(order.type, order.price),
					priceTierEndDate: null,
					priceTierEffectiveDate: null
				}}]

				template.versions[0].details.value = [versions];
				
				if (order.type == "rs"){
					template.pricingDurationType = {value: order.duration};
				}
				baseResponse = await sendIAPCreation(template, command.options.appId);
			}
			if (baseResponse != "OK"){
				if (baseResponse == "AUTH"){
					response.code = RESPONSE_CODES.AUTH;
					return(response);
				} else {
					finishedCount += 1;
					console.log("Fail " + finishedCount + "/" + command.options.orders.length);
					reportErrorsIfAny(requestErrors, order.bundle);

					continue;
				}
			}
			if (order.type == "rs"){
				//Proceed to create pricing and trial
				let found = await obtainFreshPurchase(command.options.appId, order.bundle, 7);

				if (!found){
					response.code = RESPONSE_CODES.ERROR;
					response.message = "Failed to find freshly created IAP";
					return response;
				}
				
				let productId = found.adamId;
				let pricing = buildSubscriptionPricing(determineTier(order.type, order.price));
				let pricingResponse = await sendRSPriceCreation(pricing, command.options.appId, productId);
				reportErrorsIfAny(requestErrors, order.bundle);

				if (order.trial != "off" && pricingResponse == "OK"){
					let trial = buildTrialRequest(order.trial, command.options.appId, productId);
					let trialResponse = await sendTrialCreation(trial);
					reportErrorsIfAny(requestErrors, order.bundle);
					if (trialResponse != "OK") console.log("Failed to create trial");
				}
			}
			finishedCount += 1;
			console.log("Done " + finishedCount + "/" + command.options.orders.length);
		}
		console.log("Finished");
		response.code = RESPONSE_CODES.OK;
		return (response);
	}
	case ("RECREATE"):{
		//let found = await obtainFreshPurchase(command.options.appId, order.bundle, 7);
		let iapsResponse = await sendIAPsRequest(command.options.appId);

		let iapsParsed = JSON.parse(iapsResponse).data;
		for (let i of iapsParsed){
			console.log(i.versions[i.versions.length - 1].itunesConnectStatus);
			continue;

			let detailsResponse = await sendIAPDetailsRequest(command.options.appId, i.adamId);
			let product = JSON.parse(detailsResponse).data;
			let lc = product.versions[0].details.value[0].value.localeCode;
			if (lc == "en-US"){
				product.versions[0].details.value[0].value.localeCode = "en-CA";
			} else {
				product.versions[0].details.value[0].value.localeCode = "en-US";
			}
			
			let editResponse = await sendIAPDetailsRefresh(freshProduct, command.options.appId, found.adamId);
			if (editResponse == "OK")
				console.log(product.productId.value + ": Product locale edited");
			else
				console.log(product.productId.value + ": Failed to edit product locale");
		}
		response.code = RESPONSE_CODES.OK;
		return (response);
	}
	default:
		response.code = RESPONSE_CODES.ERROR;
		response.message = "Unknown command";
		return(response);
	}
}

function getCookieKey(c){
	return c.split("=")[0];
}
function addCookiesToStorage(cookies){
	if (!storage.cookies)
		storage.cookies = [];
	for (let c in cookies){
		let overwrite = false;
		for (let ec in storage.cookies){
			let oldKey = getCookieKey(storage.cookies[ec]);
			let newKey = getCookieKey(cookies[c]);
			if (oldKey == newKey){
				overwrite = true;
				storage.cookies[ec] = cookies[c];
				break;
			}
		}
		if (!overwrite)
			storage.cookies.push(cookies[c]);
	}
	saveStorage();
}
function formCookieHeader(){
	if (storage.cookies){
		let f = storage.cookies.join("; ");
		return f;
	} else
		return null;
}

function formHeader(dataLength){
	let headers = {
		"Content-Type": 'application/json',
		"Content-Type": 'application/json',
		"Content-Length": dataLength,
		"X-Requested-With": 'XMLHttpRequest',
		"Accept": "application/json, text/javascript"
	}
	if (storage["sessionId"]) headers["X-Apple-Id-Session-Id"] = storage["sessionId"];
	if (storage["serviceKey"])   headers["X-Apple-Widget-Key"] = storage["serviceKey"];
	if (storage["scnt"])                       headers["scnt"] = storage["scnt"];
	
	let storedCookies = formCookieHeader();
	if (storedCookies)                       headers["Cookie"] = storedCookies;

	return headers;
}

function applyParametersToEndpoint(endpoint, parameters){
	let e = endpoint;
	//Object.assign(e, endpoint);
	for (let p of parameters){
		e = e.replace("#", p);
	}
	return e;
}


function setServiceKey(rawdata){
	let j = JSON.parse(rawdata);
	storage["serviceKey"] = j.authServiceKey;
	saveStorage();
}

//Returns response body in callback
function sendServiceKeyRequest(){
	return genericRequest(METHOD_GET, null, ENDPOINTS.serviceKey, null);
}

function sendToOlympus(){
	genericRequest("GET", null, ENDPOINTS.olympus, null);
}

function sendLogin(login, password){
	const data = JSON.stringify({
		accountName: login,
		password: password,
		rememberMe: true
	});
	return genericRequest("POST", data, ENDPOINTS.login, null);
}

function sendCode(code){
	const data = JSON.stringify({ 
		securityCode: { 
			code: code 
		} 
	});
	return genericRequest(METHOD_POST, data, ENDPOINTS.code, null);
}

function sendUserDetails(){
	return genericRequest(METHOD_GET, null, ENDPOINTS.userdetails, null);
}

function sendAppsRequest(){
	return genericRequest(METHOD_GET, null, ENDPOINTS.listApps, null);
}

function sendIAPsRequest(appId){
	return genericRequest(METHOD_GET, null, ENDPOINTS.listIAPs, [appId]);
}

function sendFamiliesRequest(appId){
	return genericRequest(METHOD_GET, null, ENDPOINTS.listFamilies, [appId]);
}

function sendRSMatrixRequest(appId){
	return genericRequest(METHOD_GET, null, ENDPOINTS.priceMatrixRecurring, [appId]);
}

function sendCMatrixRequest(appId){
	return genericRequest(METHOD_GET, null, ENDPOINTS.priceMatrixConsumable, [appId]);
}

function sendCountriesRequest(){
	//return genericRequest(METHOD_GET, null, ENDPOINTS.countryCodes, null);
	return genericRequest(METHOD_GET, null, ENDPOINTS.countryCodesBetter, null);
}

function sendCountriesRequestLegacy(){
	return genericRequest(METHOD_GET, null, ENDPOINTS.countryCodes, null);
}

function sendTemplateRequest(appId, iapType){
	return genericRequest(METHOD_GET, null, ENDPOINTS.iapTemplate, [appId, iapType]);
}

function sendFamilyTemplateRequest(appId){
	return genericRequest(METHOD_GET, null, ENDPOINTS.famTemplate, [appId]);
}

function sendIAPCreation(filledTemplate, appId){
	return genericRequest(METHOD_POST, JSON.stringify(filledTemplate), ENDPOINTS.create, [appId]);
}

function sendFamilyCreation(filledTemplate, appId){
	return genericRequest(METHOD_POST, JSON.stringify(filledTemplate), ENDPOINTS.createFamily, [appId]);
}

function sendIAPDetailsRequest(appId, productId){
	return genericRequest(METHOD_GET, null, ENDPOINTS.iapDetails, [appId, productId]);
}

function sendIAPDetailsRefresh(updated, appId, productId){
	return genericRequest(METHOD_PUT, JSON.stringify(updated), ENDPOINTS.iapDetails, [appId, productId]);
}

function sendRSPriceCreation(pricing, appId, productId){
	return genericRequest(METHOD_POST, JSON.stringify(pricing), ENDPOINTS.rsPriceCreate, [appId, productId]);
}

function sendTrialCreation(trial){
	return genericRequest(METHOD_POST, JSON.stringify(trial), ENDPOINTS.trialCreate, null);
}

let requestErrors = [];
function genericRequest(method, data, endpoint, endpointParameters, tries = 7){
	function checkForErrors(body){
		try {
			let r = JSON.parse(body);
			if (r.data){
				if (r.data.sectionErrorKeys){
					requestErrors = r.data.sectionErrorKeys;
				}
			}
		} catch (e){}
	}
	return new Promise(resolve => {
		const options = {
			method: method,
			headers: formHeader((method == "GET") ? 0 : data.length)
		}
		
		let requestTarget;
		if (endpointParameters)
			requestTarget = applyParametersToEndpoint(endpoint, endpointParameters);
		else
			requestTarget = endpoint;
		const req = https.request(requestTarget, options, res => {
			addCookiesToStorage(res.headers["set-cookie"]);
			if (endpoint == ENDPOINTS.login || endpoint == ENDPOINTS.olympus){
				storage["scnt"] = res.headers["scnt"];
				storage["sessionId"] = res.headers["x-apple-id-session-id"];
				saveStorage();
			}

			let data = [];
			res.on('data', chunk => {
				data.push(chunk);
			});
			res.on('end', async () => {
				requestErrors = [];

				let responseBody = Buffer.concat(data).toString();
				if (res.headers["content-encoding"] == "gzip"){
					if (method != "POST")
						console.log("WARNING: got gzipped response to " + method + " request.\nEndpoint: " + requestTarget);
					responseBody = zlib.gunzipSync(Buffer.concat(data)).toString();
				}
				checkForErrors(responseBody);

				switch (res.statusCode){
				case (200):
				case (201):
				case (204):
					if (method == "GET")
						resolve(responseBody);
					else
						resolve("OK");
					break;
				case (401):
					resolve("AUTH");
					break;
				case (409):
					resolve("CODE");
					break;
				case (412):
					checkForErrors(responseBody);
					if (endpoint == ENDPOINTS.login || endpoint == ENDPOINTS.olympus)
						resolve("Need to acknowledge to Apple's bullshit agreements");
					else
						resolve(responseBody)
					break;
				case (422):
					checkForErrors(responseBody);
					resolve("MALFORMED REQUEST");
					break;
				case (502):
				case (503):
				case (504):
					if (tries <= 0){
						let message = `Request failed after retries: ${res.statusCode} at ${endpoint}`;
						console.log(message);
						console.log(responseBody);
						resolve(message);
					} else {
						let r = await genericRequest(method, data, endpoint, endpointParameters, tries - 1);
						resolve(r);
					}
				default:
					console.log(`Unknown status: ${res.statusCode} at ${endpoint}`);
					resolve(responseBody);
					break;
				}
			});
		});

		req.on('error', error => {
			console.error(error);
		})

		if (data) req.write(data);
		req.end();
	});
}