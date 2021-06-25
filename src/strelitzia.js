const http = require('http');   //For server
const https = require('https'); //For apol
const fs = require('fs');       //For fuck's sake (storage)
const zlib = require("zlib");   //For reading apol POST responses (really)
const {app, BrowserWindow, ipcMain} = require('electron');
const { assert } = require('console');

const DEBUG_MODE = false;
const DEBUG_FAMILY_BYPASS = false;
const BAD_APOL = "🏳️‍🌈🏳️‍🌈🏳️‍🌈  B4D AP0L 🏳️‍🌈🏳️‍🌈🏳️‍🌈";
let mainWindow;

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true
		}
	});

	mainWindow.loadFile('./src/client/index.html');
	if (DEBUG_MODE) mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
	createWindow();
	start();
})

const CWD = app.getPath("userData");
let storage = {};
function loadStorage(){
	try {
		let f = fs.readFileSync(CWD + "/storage.json");
		if (f) storage = JSON.parse(f);
	} catch (e){
		console.log("No saved storages found, will load new");
	}
}
function saveStorage(){
	let s = JSON.stringify(storage)
	fs.writeFileSync(CWD + "/storage.json", s);
}

function start(){
	loadStorage();

	if (!storage["serviceKey"])
		sendServiceKeyRequest().then((key) => setServiceKey(key));

	let path = process.execPath;
	path = path.substring(0, path.lastIndexOf("/") + 1);

	console.log("Current path " + process.cwd());
}

ipcMain.on('strelitziaCommand', async (event, command) => {
	let r = await respondToCommand(command);
	event.sender.send("strelitziaResponse", r);
})

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
	"ITC.addons.type.consumable"    : IAP_TYPE_C,
	"ITC.addons.type.nonConsumable" : IAP_TYPE_NC,
	"ITC.addons.type.recurring"     : IAP_TYPE_RS,
	"ITC.addons.type.subscription"  : IAP_TYPE_NRS,
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
	equalize:              "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/#/pricing/equalize/USD/#",          //appId, productId, tier
	create:                "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps",                                   //appId
	createFamily:          "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/family/",                           //appId
	rsPriceCreate:         "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/#/pricing/subscriptions",           //appId, productId
	pricingDownload:       "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/#/pricing",                         //appId, productId
	trialCreate:           "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/iaps/pricing/batch",
	countryCodes:          "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/users/itc/preferredCurrencies",
	countryCodesBetter:    "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/pricing/supportedCountries"
}

const METHOD_GET = "GET";
const METHOD_POST = "POST";
const METHOD_PUT = "PUT";

let mainProgressList = [];
function setMainProgressList(list){
	mainProgressList = list;
}
function sendProgressData(data){
	if (data.message == BAD_APOL) data.status = "done_badapol";

	let target = null;
	for (let item of mainProgressList){
		if (target) break;
		if (item.id == data.id){
			target = item;
			break;
		}
		for (let step of item.steps){
			if (step.id == data.id){
				target = step;
				break;
			}
		}
	}
	if (!target){
		console.log("failed")
	}

	target.status = data.status;
	target.message = data.message;
	mainWindow.webContents.send("progressUpdate", mainProgressList);
}
function sendStatusUpdate(message){
	mainWindow.webContents.send("statusUpdate", message);
}

async function respondToCommand(command){
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	let response = {
		code: RESPONSE_CODES.ERROR,
		message: "Error message unset"
	}

	switch (command.command){
	case ("SERVICE"): {
		switch (command.options.message){
		case ("PRICES"): {
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
		case ("SIGNOUT"): {
			delete storage.cookies;
			delete storage.team;
			saveStorage();
			return("OK");
			break;
		}
		case ("RESET"): {
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
	case ("START"): {
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
	case ("LOGIN"): {
		let loginResponse = await sendLogin(command.options.login, command.options.password);

		if (loginResponse == "CODE"){
			response.code = RESPONSE_CODES.CODE;
		} else {
			response.code = RESPONSE_CODES.ERROR;
			response.message = loginResponse;
		}
		
		return response;
	}
	case ("CODE"): {
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
	case ("SEL_TEAM"): {
		storage["team"] = command.options.id;
		saveStorage();
		response.code = RESPONSE_CODES.OK;
		return response;
	}
	case ("APPS"): {
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
	case ("SEL_APP"): {
		if (!storage.rsMatrix){
			sendStatusUpdate("Downloading RS price matrix (1/3)");
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
			sendStatusUpdate("Downloading C price matrix (2/3)");
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
			sendStatusUpdate("Downloading list of countries (3/3)");
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
	case ("DL_IAPS"): {
		function findRSPrice(from, country){
			let tier = null;

			for (let price of from){
				if (price.value.country == country){
					tier = price.value.tierStem;
					break;
				}
			}

			if (tier){
				for (let rsPrice of storage.rsMatrix)
					if (rsPrice.tier == tier)
						return rsPrice.price;
			}

			return null;
		}
		function findTrial(from, country){
			let tier = null;

			for (let offer of from){
				if (offer.value.country == country){
					return offer.value.durationType;
				}
			}

			return null;
		}
		function findIAPByAdamId(list, adamId){
			for (let item of list){
				if (item.adamId == adamId)
					return true;
			}
			return false;
		}

		let errorCount = 1;
		let tries = 3;
		let results = [];

		while (errorCount > 0 && tries > 0){
			--tries;

			let response = await sendIAPsRequest(command.options.appId);
			sendStatusUpdate("Downloaded IAP list (1/3)");
			let parsed = JSON.parse(response).data;
			sendStatusUpdate("Downloaded IAP list (1/3): " + parsed.length + " IAPs detected");

			let dontMakeNoPromises = [];
			let yourBodyCantKeep = [];
			errorCount = 0;
			
			for (let product of parsed){
				if (!findIAPByAdamId(results, product.adamId))
					dontMakeNoPromises.push(sendIAPDetailsRequest(command.options.appId, product.adamId));
			}
			let responses;
			try {
				responses = await Promise.all(dontMakeNoPromises);
			} catch (e) {
				sleep(3000);
				sendStatusUpdate("Failed to load IAP details (2/3), retrying");
				continue;
			}
			sendStatusUpdate("Downloaded IAP details (2/3)");

			for (let response of responses){
				try {
					yourBodyCantKeep.push(JSON.parse(response).data);
				} catch (e) {
					++errorCount;
				}
			}

			let rsResults = [];

			const REVERSE_TYPE_MAP = {
				"recurring": "rs",
				"consumable" : "c",
				"nonConsumable": "nc"
			};
			//sendRSPricingRequest
			for (let raw of yourBodyCantKeep){
				//Format reference: renderer.js:collectOrders()

				let entry;
				let type = IAP_TYPE_NAMES[raw.addOnType];
				switch (type){
					case (IAP_TYPE_NRS): 
						console.log("Unsupported");
						break;
					case (IAP_TYPE_NC):
					case (IAP_TYPE_C):{
						entry = {
							adamId: raw.adamId,
							type: REVERSE_TYPE_MAP[type],
							refname: raw.referenceName.value,
							bundle: raw.productId.value,
							version: {
								name: null, //raw.versions[0].details.value[0].value.name.value,
								desc: null //raw.versions[0].details.value[0].value.description.value
							},
							price: raw.pricingIntervals[0].value.tierStem
						};
						if (raw.versions.length > 0 && raw.versions[0].details.value.length > 0){
							entry.version.name = raw.versions[0].details.value[0].value.name.value;
							entry.version.desc = raw.versions[0].details.value[0].value.description.value;
						}
						
						let tierFound = false;
						for (let mItem of storage.cMatrix){
							if (mItem.tier == entry.price){
								entry.price = mItem.price;
								tierFound = true;
								break;
							}
						}
						if (!tierFound) entry.price = null;

						break;
					}
					case (IAP_TYPE_RS):{
						entry = {
							adamId: raw.adamId,
							type: REVERSE_TYPE_MAP[type],
							refname: raw.referenceName.value,
							bundle: raw.productId.value,
							version: {
								name: null, //raw.versions[0].details.value[0].value.name.value,
								desc: null //raw.versions[0].details.value[0].value.description.value
							},
							duration: raw.pricingDurationType.value,
							trial: null,
							price: null
						};
						if (raw.versions.length > 0 && raw.versions[0].details.value.length > 0){
							entry.version.name = raw.versions[0].details.value[0].value.name.value;
							entry.version.desc = raw.versions[0].details.value[0].value.description.value;
						}
						break;
					}
					default: {
						break;
					}
				}
				results.push(entry);
				if (type == IAP_TYPE_RS) rsResults.push(entry);
			}

			let pricingTries = 3;
			let pricingErrors = 1;
			let pricingIgnoreList = [];

			while (pricingErrors > 0 && pricingTries > 0){
				--pricingTries;
				pricingErrors = 0;

				if (rsResults.length > 0){
					let pricingPromises = [];
					for (let rs of rsResults){
						if (!pricingIgnoreList.includes(rs.adamId))
							pricingPromises.push(sendRSPricingRequest(command.options.appId, rs.adamId));
					}
					let pricings = await Promise.all(pricingPromises);
					sendStatusUpdate("Downloaded IAP pricings and trials (3/3), Done");
					
					for (let raw of pricings){
						try {
							let pricing = JSON.parse(raw.data).data;
							for (let rs of rsResults){
								if (rs.adamId == raw.adamId){
									if (pricing.subscriptions && pricing.subscriptions.length > 0)
										rs.price = findRSPrice(pricing.subscriptions, "US");
									if (pricing.introOffers && pricing.introOffers.length > 0)
										rs.trial = findTrial(pricing.introOffers, "US");
									else
										rs.trial = "off";
									break;
								}
							}
							pricingIgnoreList.push(raw.adamId);
						} catch (e) {
							++pricingErrors;
						}
						
					}
				}
			}
		}
		sendStatusUpdate("Downloaded " + results.length + " IAPs");

		return ({data: results, errorCount: errorCount});
	}
	case ("CREATE_IAP"): {
		function determineTier(type, price){
			for (let t of (type == "rs") ? storage.rsMatrix : storage.cMatrix){
				if (price == t.price){
					return t.tier;
				}
			}
			return 0;
		}

		function buildSubscriptionPricing(equalizedTierMap){
			let data = {
				subscriptions: []
			}

			for (let code of storage.countryCodes){
				if (!equalizedTierMap[code]){
					console.log("UNKNOWN CODE IN KNOWN LIST");
					return null;
				}
				let tier = equalizedTierMap[code].tierStem;

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

		async function obtainFreshPurchase(appId, productBundleName, tries){
			sendProgressData({
				id: productBundleName + ".obtainid",
				status: "inprogress"
			});
			while (tries > 0){
				tries -= 1;
				let iapsResponse = await sendIAPsRequest(appId);

				let iapsParsed;
				try {
					iapsParsed = JSON.parse(iapsResponse).data;
				} catch(e){
					sendProgressData({
						id: productBundleName + ".obtainid",
						status: "done_badapol"
					});
					continue;
				}
				for (let i of iapsParsed)
					if (i.vendorId == productBundleName){
						sendProgressData({
							id: productBundleName + ".obtainid",
							status: "done_ok",
							message: "Obtained id: " + i.adamId
						});
						return i;
					}

				sendProgressData({
					id: productBundleName + ".obtainid",
					status: "done_badapol",
					message: "Retrying to obtain id of fresh product. Tries left: " + tries
				});
			}
			sendProgressData({
				id: productBundleName + ".obtainid",
				status: "done_fail",
				message: "Failed to acquire id of freshly created purchase"
			});
			return null;
		}

		function reportErrorsIfAny(e, target){
			if (e && e.length > 0){
				console.log("Errors (" + target + "): ");
				console.log(e.join("\n"));
				console.log("\n");
				return e.join("\n");
			}
			return null;
		}
		
		let firstRSOrder = null;
		for (let order of command.options.orders){
			if (order.type == "rs") {
				firstRSOrder = order; 
				break;
			}
		}
		function initProgressListWithFamily(){
			return [{
				name: "Determine family",
				id: "getfamily",
				steps: [],
				status: "initial"
			}];
		}
		function buildProgressItem(order){
			let t = {
				name: "IAP " + order.bundle,
				id: order.bundle,
				steps: [
					{
						name: "Load IAP template",
						id: order.bundle + ".template",
						status: "initial"
					},
					{
						name: "Create IAP",
						id: order.bundle + ".create",
						status: "initial"
					}
				],
				status: "initial"
			};

			if (order.type == "rs"){
				t.steps.push({
					name: "Get fresh product id",
					id: order.bundle + ".obtainid",
					status: "initial"
				});
				t.steps.push({
					name: "Equalize prices",
					id: order.bundle + ".equalize",
					status: "initial"
				});
				t.steps.push({
					name: "Add price",
					id: order.bundle + ".price",
					status: "initial"
				});
				if (order.trial != "off"){
					t.steps.push({
						name: "Add trial",
						id: order.bundle + ".trial",
						status: "initial"
					});
				}
			}

			return t;
		}
		function buildProgressItemForFamily(order){
			let t = {
				name: "IAP " + order.bundle,
				id: order.bundle,
				steps: [
					{
						name: "Load family template",
						id: order.bundle + ".template",
						status: "initial"
					},
					{
						name: "Create family with IAP",
						id: order.bundle + ".create",
						status: "initial"
					},
					{
						name: "Register new family",
						id: order.bundle + ".register",
						status: "initial"
					},
					{
						name: "Get fresh product id",
						id: order.bundle + ".obtainid",
						status: "initial"
					},
					{
						name: "Request IAP details for editing",
						id: order.bundle + ".details",
						status: "initial"
					},
					{
						name: "Update details with localized name and duration",
						id: order.bundle + ".update",
						status: "initial"
					},
					{
						name: "Equalize prices",
						id: order.bundle + ".equalize",
						status: "initial"
					},
					{
						name: "Add price",
						id: order.bundle + ".price",
						status: "initial"
					},
					{
						name: "Add trial",
						id: order.bundle + ".trial",
						status: "initial"
					}

				],
				status: "initial"
			};

			
				if (order.trial != "off"){
					t.steps.push();
				}

			return t;
		}

		let progressList = initProgressListWithFamily();
		setMainProgressList(progressList)

		function sendPriceAndTrial(order, freshPurchase){
			return new Promise(async resolve => {
				let productId = freshPurchase.adamId;
				sendProgressData({
					id: order.bundle + ".equalize",
					status: "inprogress"
				});
				let equalizedRaw = await sendEqualizeByUSDRequest(command.options.appId, productId, determineTier(order.type, order.price));
				sendProgressData({
					id: order.bundle + ".equalize",
					status: "done_ok"
				});
				let equalized = JSON.parse(equalizedRaw).data;
				let pricing = buildSubscriptionPricing(equalized);
				sendProgressData({
					id: order.bundle + ".price",
					status: "inprogress"
				});
				let pricingResponse = await sendRSPriceCreation(pricing, command.options.appId, productId);
				if (pricingResponse == "OK"){
					sendProgressData({
						id: order.bundle + ".price",
						status: "done_ok"
					});
					
					if (order.trial != "off"){
						sendProgressData({
							id: order.bundle + ".trial",
							status: "inprogress"
						});
						let trial = buildTrialRequest(order.trial, command.options.appId, productId);
						let trialResponse = await sendTrialCreation(trial);
						if (trialResponse != "OK") {
							console.log("Failed to create trial for " + order.bundle);
							sendProgressData({
								id: order.bundle + ".trial",
								status: "done_fail",
								message: reportErrorsIfAny(requestErrors, order.bundle)
							});
						} else {
							sendProgressData({
								id: order.bundle + ".trial",
								status: "done_ok"
							});
						}
					}
				} else {
					sendProgressData({
						type: "update",
						id: order.bundle + ".price",
						status: "done_fail",
						message: reportErrorsIfAny(requestErrors, order.bundle)
					});

				}
				resolve();
			});
		}

		let currentFamily = {
			name: null,
			id: null
		}

		let familiesResponse = null;
		if (firstRSOrder){
			sendProgressData({
				id: "getfamily",
				status: "inprogress"
			});
			familiesResponse = await sendFamiliesRequest(command.options.appId);
			if (familiesResponse == "AUTH"){
				response.code = RESPONSE_CODES.AUTH;
				sendProgressData({
					id: "getfamily",
					status: "done_fail",
					message: "Authorization required"
				});
				return response;
			} else {
				let parsed = JSON.parse(familiesResponse).data;
				/*if (DEBUG_FAMILY_BYPASS){ 
					parsed = [];
					command.options.defaultFamilyName += Math.floor(Math.random(10000));
				}*/
				if (parsed.length >= 1){
					currentFamily.name = parsed[0].name.value;
					currentFamily.id = parsed[0].id;
					sendProgressData({
						id: "getfamily",
						status: "done_ok",
						message: "Detected existing family. Using \"" + currentFamily.name + "\""
					});
				} else {
					sendProgressData({
						id: "getfamily",
						status: "done_warning",
						message: "No families detected, will create a new one with name \"" + command.options.defaultFamilyName + "\""
					});

					let order = firstRSOrder;
					let baseResponse;
					let foundFreshPurchase = null;
					let versions = {value: {
						description: {value: order.version.desc},
						name:        {value: order.version.name},
						localeCode:  "en-US"
					}};
					progressList.push(buildProgressItemForFamily(order));

					sendProgressData({
						id: order.bundle,
						status: "inprogress"
					});

					//Create subscription together with family
					sendProgressData({
						id: order.bundle + ".template",
						status: "inprogress"
					});
					let templateResponse = await sendFamilyTemplateRequest(command.options.appId);
					sendProgressData({
						id: order.bundle + ".template",
						status: "done_ok"
					});

					let template = JSON.parse(templateResponse).data;
					template.activeAddOns[0].productId = {value: order.bundle};
					template.activeAddOns[0].referenceName = {value: order.refname};
					//template.activeAddOns[0].pricingDurationType = {value: order.duration}; //doesn't work
					template.name = {value: command.options.defaultFamilyName};
					template.details.value = [];
					sendProgressData({
						id: order.bundle + ".create",
						status: "inprogress"
					});
					let famCreateResponse = await sendFamilyCreation(template, command.options.appId);

					if (famCreateResponse == "OK"){
						sendProgressData({
							id: order.bundle + ".create",
							status: "done_ok"
						});


						//Register freshly created family
						sendProgressData({
							id: order.bundle + ".register",
							status: "inprogress"
						});
						familiesResponse = await sendFamiliesRequest(command.options.appId);
						let parsed = JSON.parse(familiesResponse).data;
						if (parsed.length >= 1){
							currentFamily.name = parsed[0].name.value;
							currentFamily.id = parsed[0].id;
							sendProgressData({
								id: order.bundle + ".register",
								status: "done_ok"
							});
						} else {
							sendProgressData({
								id: order.bundle + ".register",
								status: "done_fail",
								message: "Can not find freshly created family"
							});
						}

						sendProgressData({
							id: order.bundle + ".obtainid",
							status: "inprogress"
						});
						foundFreshPurchase = await obtainFreshPurchase(command.options.appId, order.bundle, 7);

						if (foundFreshPurchase){
							sendProgressData({
								id: order.bundle + ".obtainid",
								status: "done_ok"
							});
						} else {
							response.code = RESPONSE_CODES.ERROR;
							response.message = "Failed to find freshly created IAP";
							sendProgressData({
								id: order.bundle + ".obtainid",
								status: "done_fail",
								message: response.message
							});
							return response;
						}

						sendProgressData({
							id: order.bundle + ".details",
							status: "inprogress"
						});
						let detailsResponse = await sendIAPDetailsRequest(command.options.appId, foundFreshPurchase.adamId);
						let errorsMaybe = reportErrorsIfAny(requestErrors, order.bundle);
						if (errorsMaybe){
							sendProgressData({
								id: order.bundle + ".details",
								status: "done_fail",
								message: errorsMaybe
							});
						} else {
							sendProgressData({
								id: order.bundle + ".details",
								status: "done_ok"
							});
						}
						
						let freshProduct = JSON.parse(detailsResponse).data;
						freshProduct.versions[0].details.value = [versions];
						freshProduct.pricingDurationType = {value: order.duration};
						
						sendProgressData({
							id: order.bundle + ".update",
							status: "inprogress"
						});
						baseResponse = await sendIAPDetailsRefresh(freshProduct, command.options.appId, foundFreshPurchase.adamId);
						if (baseResponse != "OK") {
							console.log("Failed to fill purchase details for fresh family product, please check " + order.bundle);
							sendProgressData({
								id: order.bundle + ".update",
								status: "done_fail",
								message: reportErrorsIfAny(requestErrors, order.bundle)
							});
						} else {
							sendProgressData({
								id: order.bundle + ".update",
								status: "done_ok"
							});
						}

						await sendPriceAndTrial(order, foundFreshPurchase);
						sendProgressData({
							id: order.bundle,
							status: "done_ok"
						});
					} else {
						sendProgressData({
							id: order.bundle + ".create",
							status: "done_failed",
							message: "Failed to create family, aborting"
						});
						response.code = RESPONSE_CODES.ERROR;
						return response;
					}
				}
			}
		}

		function prepareOrder(order){
			return new Promise(async resolve => {
				try {
					sendProgressData({
						id: order.bundle,
						status: "inprogress"
					});

					let baseResponse;
					let foundFreshPurchase = null;
					
					let versions = {value: {
						description: {value: order.version.desc},
						name:        {value: order.version.name},
						localeCode:  "en-US"
					}};

					//Create IAP normally
					sendProgressData({
						id: order.bundle + ".template",
						status: "inprogress"
					});
					let templateResponse = await sendTemplateRequest(command.options.appId, IAP_TYPE_NAMES[order.type]);
					sendProgressData({
						id: order.bundle + ".template",
						status: "done_ok"
					});

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
					sendProgressData({
						id: order.bundle + ".create",
						status: "inprogress"
					});
					baseResponse = await sendIAPCreation(template, command.options.appId);

					if (baseResponse != "OK"){
						sendProgressData({
							id: order.bundle + ".create",
							status: "done_fail",
							message: reportErrorsIfAny(requestErrors, order.bundle)
						});
						finishedCount += 1;

						console.log("Fail " + finishedCount + "/" + command.options.orders.length + ": " + order.bundle);
						sendProgressData({
							id: order.bundle,
							status: "done_fail",
							message: reportErrorsIfAny(requestErrors, order.bundle)
						});

						resolve();
						return;
					}
					sendProgressData({
						id: order.bundle + ".create",
						status: "done_ok"
					});
					if (order.type == "rs"){
						//Proceed to create pricing and trial

						if (!foundFreshPurchase)
							foundFreshPurchase = await obtainFreshPurchase(command.options.appId, order.bundle, 7);

						if (!foundFreshPurchase){
							response.code = RESPONSE_CODES.ERROR;
							response.message = "Failed to find freshly created IAP";
							resolve();
							return;// response;
						}

						await sendPriceAndTrial(order, foundFreshPurchase);
					}
					finishedCount += 1;
					console.log("Done " + finishedCount + "/" + command.options.orders.length);

					sendProgressData({
						type: "update",
						id: order.bundle,
						status: "done_ok"
					});
					resolve();
					return;
				} catch (e) {
					sendProgressData({
						type: "update",
						id: order.bundle,
						status: "done_fail",
						message: "Error occurred: " + e.name + ": " + e.message + "\n" + e.stack
					});
				}
				resolve();
			});
		}
		
		let finishedCount = 0;
		let mainListOfOrders = [];
		for (let order of command.options.orders){
			if (order != firstRSOrder){
				progressList.push(buildProgressItem(order));
				mainListOfOrders.push(prepareOrder(order));
			}
		}

		await Promise.all(mainListOfOrders);

		console.log("Finished");
		response.code = RESPONSE_CODES.OK;
		return response;
	}
	case ("EDIT_IAP"): {
		// command.options.orders
		// command.options.appId
		response.code = RESPONSE_CODES.OK;
		return response;
	}
	case ("RECREATE"): {
		//let found = await obtainFreshPurchase(command.options.appId, order.bundle, 7);
		let iapsResponse = await sendIAPsRequest(command.options.appId);

		let iapsParsed = JSON.parse(iapsResponse).data;
		for (let i of iapsParsed){
			//i.iTunesConnectStatus == 
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

function sendEqualizeByUSDRequest(appId, productId, tier){
	return genericRequest(METHOD_GET, null, ENDPOINTS.equalize, [appId, productId, tier]);
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

function sendRSPricingRequest(appId, productId){
	return new Promise(async resolve => {
		let response = await genericRequest(METHOD_GET, null, ENDPOINTS.pricingDownload, [appId, productId]);
		resolve ({adamId: productId, data: response});
	});
}

function sendTrialCreation(trial){
	return genericRequest(METHOD_POST, JSON.stringify(trial), ENDPOINTS.trialCreate, null);
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
					let message = `Request failed after retries: ${res.statusCode} at ${endpoint}`;
					console.log(message);
					console.log(responseBody);
					requestErrors = [BAD_APOL]
					resolve(message);
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