/*
Argentea.js

Argentea is Strelitzia module responsible for providing interface to work with AppStore Connect using Chlorophytum while also providing detailed feedback

https://www.deviantart.com/argonaut11/art/Argentea-Darling-In-The-Franxx-Phone-wallpaper-744586505
*/

const chlorophytum = require("./chlorophytum.js");

let mainProgressList = [];
let onProgressChange;

const OPERATION_FAMILIES  = "getfamily";
const OPERATION_TEMPLATE  = ".template";
const OPERATION_CREATE    = ".create";
const OPERATION_OBTAINID  = ".obtainid";
const OPERATION_EQUALIZE  = ".equalize";
const OPERATION_PRICE     = ".price";
const OPERATION_TRIAL     = ".trial";
const OPERATION_REGFAMILY = ".register";
const OPERATION_DETAILS   = ".details";
const OPERATION_UPDATEIAP = ".update";

function progress(bundleName, task, status, message = null){
	for (let item of mainProgressList){

	}
	onProgressChange(mainProgressList);
}

module.exports = {
	PROGRESS_INITIAL      : "initial",
	PROGRESS_INPROGRESS   : "inprogress",
	PROGRESS_DONE_OK      : "done_ok",
	PROGRESS_DONE_WARNING : "done_warning",
	PROGRESS_DONE_FAIL    : "done_fail",
	PROGRESS_BADAPOL      : "done_badapol",

	planning: {
		resetProgressList: ()=>{
			mainProgressList = [];
		},
		setProgressCallback: (progressChange)=>{
			onProgressChange = progressChange;
		},
		planFamilyCheck: ()=>{
			mainProgressList.push({
				name: "Determine family",
				id: OPERATION_FAMILIES,
				steps: [],
				status: this.PROGRESS_INITIAL
			});
		},
		planFamilyCreation: (order)=>{
			let t = {
				name: "IAP " + order.bundle,
				id: order.bundle,
				steps: [
					{
						name: "Load family template",
						id: order.bundle + OPERATION_TEMPLATE,
						status: this.PROGRESS_INITIAL
					},
					{
						name: "Create family with IAP",
						id: order.bundle + OPERATION_CREATE,
						status: this.PROGRESS_INITIAL
					},
					{
						name: "Register new family",
						id: order.bundle + OPERATION_REGFAMILY,
						status: this.PROGRESS_INITIAL
					},
					{
						name: "Get fresh product id",
						id: order.bundle + OPERATION_OBTAINID,
						status: this.PROGRESS_INITIAL
					},
					{
						name: "Request IAP details for editing",
						id: order.bundle + OPERATION_DETAILS,
						status: this.PROGRESS_INITIAL
					},
					{
						name: "Update details with localized name and duration",
						id: order.bundle + OPERATION_UPDATEIAP,
						status: this.PROGRESS_INITIAL
					},
					{
						name: "Equalize prices",
						id: order.bundle + OPERATION_EQUALIZE,
						status: this.PROGRESS_INITIAL
					},
					{
						name: "Add price",
						id: order.bundle + OPERATION_PRICE,
						status: this.PROGRESS_INITIAL
					}
				],
				status: this.PROGRESS_INITIAL
			};

			if (order.trial != "off"){
				t.steps.push({
					name: "Add trial",
					id: order.bundle + OPERATION_TRIAL,
					status: this.PROGRESS_INITIAL
				});
			}

			mainProgressList.push(t);
		},
		planIAPCreation: (order)=>{
			let t = {
				name: "IAP " + order.bundle,
				id: order.bundle,
				steps: [
					{
						name: "Load IAP template",
						id: order.bundle + OPERATION_TEMPLATE,
						status: this.PROGRESS_INITIAL
					},
					{
						name: "Create IAP",
						id: order.bundle + OPERATION_CREATE,
						status: this.PROGRESS_INITIAL
					}
				],
				status: this.PROGRESS_INITIAL
			};
		
			if (order.type == "rs"){
				t.steps.push({
					name: "Get fresh product id",
					id: order.bundle + OPERATION_OBTAINID,
					status: this.PROGRESS_INITIAL
				});
				t.steps.push({
					name: "Equalize prices",
					id: order.bundle + OPERATION_EQUALIZE,
					status: this.PROGRESS_INITIAL
				});
				t.steps.push({
					name: "Add price",
					id: order.bundle + OPERATION_PRICE,
					status: this.PROGRESS_INITIAL
				});
				if (order.trial != "off"){
					t.steps.push({
						name: "Add trial",
						id: order.bundle + OPERATION_TRIAL,
						status: this.PROGRESS_INITIAL
					});
				}
			}

			mainProgressList.push(t);
		}
	},
	operations: {
		equalizeByUSD: async (bundleName, appId, productId, tier)=>{
			progress(bundleName, OPERATION_EQUALIZE, PROGRESS_INPROGRESS);
			let result = await chlorophytum.sendEqualizeByUSDRequest(appId, productId, tier);
			if (result && result.data){
				progress(bundleName, OPERATION_EQUALIZE, this.PROGRESS_DONE_OK);
				return result.data;
			} else {
				progress(bundleName, OPERATION_EQUALIZE, this.PROGRESS_BAD_APOL);
				return null;
			}
		},
		createRSPricing: async (bundleName, equalized, countryCodes, appId, productId)=>{
			let pricing = buildSubscriptionPricing(equalized, countryCodes);
			progress(bundleName, OPERATION_PRICE, this.PROGRESS_INPROGRESS);
			let pricingResponse = await chlorophytum.sendRSPriceCreation(pricing, appId, productId);
			if (pricingResponse == "OK"){
				progress(bundleName, OPERATION_PRICE, this.PROGRESS_DONE_OK);
				return true;
			} else {
				progress(bundleName, OPERATION_PRICE, this.PROGRESS_DONE_FAIL);
				return false;
			}
		},
		createTrial: async (bundleName, trialDuration, appId, productId)=>{
			progress(bundleName, OPERATION_TRIAL, this.PROGRESS_INPROGRESS);
			let trialRequest = buildTrialRequest(trialDuration, appId, productId);
			let trialResponse = await chlorophytum.sendTrialCreation(trialRequest);
			if (trialResponse == "OK") {
				progress(bundleName, OPERATION_TRIAL, this.PROGRESS_DONE_OK);
			} else {
				let message = reportErrorsIfAny(requestErrors, order.bundle);
				progress(bundleName, OPERATION_TRIAL, this.PROGRESS_DONE_FAIL, message);
			}
		},
		selectFamily: async (appId, repeated, defaultFamilyName)=>{
			let operationId = repeated ? OPERATION_REGFAMILY : OPERATION_FAMILIES;
			progress(null, operationId, this.PROGRESS_INPROGRESS);
			let familiesResponse = await chlorophytum.sendFamiliesRequest(appId);
			if (familiesResponse && familiesResponse.data){
				progress(null, operationId, this.PROGRESS_DONE_OK);
				let selectedFamily;
				try {
					if (familiesResponse.data.length >= 1){
						selectedFamily = {
							name: familiesResponse.data[0].name.value,
							id:   familiesResponse.data[0].id
						};
						let message = "Detected existing family. Using \"" + selectedFamily.name + "\"";
						progress(null, operationId, this.PROGRESS_DONE_OK, message);
					} else {
						selectedFamily = {
							name: defaultFamilyName,
							id:   null
						};
						let message = "No families detected, will create a new one with name \"" + defaultFamilyName + "\"";
						progress(null, operationId, this.PROGRESS_DONE_WARNING, message);
					}
					return selectedFamily;
				} catch(e){
					let message = "Failed to read existing families";
					progress(null, operationId, this.PROGRESS_DONE_FAIL, message);
					return null;
				}
			} else {
				progress(null, operationId, this.PROGRESS_DONE_FAIL);
				return null;
			}
		},
		requestFamilyTemplate: async (bundleName, appId)=>{
			progress(bundleName, OPERATION_TEMPLATE, this.PROGRESS_INPROGRESS);
			let templateResponse = await chlorophytum.sendFamilyTemplateRequest(appId);
			if (templateResponse && templateResponse.data){
				progress(bundleName, OPERATION_TEMPLATE, this.PROGRESS_DONE_OK);
				return templateResponse.data;
			} else {
				progress(bundleName, OPERATION_TEMPLATE, this.PROGRESS_DONE_FAIL);
				return null;
			}
		},
		requestIAPTemplate: async (bundleName, appId)=>{
			progress(bundleName, OPERATION_TEMPLATE, this.PROGRESS_INPROGRESS);
			let templateResponse = await chlorophytum.sendTemplateRequest(command.options.appId, IAP_TYPE_NAMES[order.type]);
			sendProgressData({
				id: order.bundle + ".template",
				status: "done_ok"
			});
		},
		createFamily: async (bundleName, filledTemplate, appId)=>{
			progress(bundleName, OPERATION_CREATE, this.PROGRESS_INPROGRESS);
			let createResponse = await chlorophytum.sendFamilyCreation(filledTemplate, appId);

			if (createResponse == "OK"){
				progress(bundleName, OPERATION_CREATE, this.PROGRESS_DONE_OK);
				return true;
			} else {
				progress(bundleName, OPERATION_CREATE, this.PROGRESS_DONE_FAIL);
				return false;
			}
		},
		obtainFreshPurchase: async (bundleName, appId, tries = 7)=>{
			let message;
			progress(bundleName, OPERATION_OBTAINID, this.PROGRESS_INPROGRESS);
			while (tries > 0){
				tries -= 1;
				let iapsResponse = await chlorophytum.sendIAPsRequest(appId);
		
				if (iapsResponse && iapsResponse.data){
					for (let iap of iapsResponse.data)
						if (iap.vendorId == bundleName){
							progress(bundleName, OPERATION_OBTAINID, this.PROGRESS_DONE_OK);
							return iap.adamId;
						}

					message = "Retrying to obtain id of fresh product. Tries left: " + tries;
					progress(bundleName, OPERATION_OBTAINID, this.PROGRESS_BADAPOL, message);
				} else {
					progress(bundleName, OPERATION_OBTAINID, this.PROGRESS_BADAPOL);
					continue;
				}
			}
			message = "Failed to acquire id of freshly created purchase";
			progress(bundleName, OPERATION_OBTAINID, this.PROGRESS_DONE_FAIL, message);
			return null;
		},
		requestIAPDetails: async (bundleName, appId, productId)=>{
			progress(bundleName, OPERATION_DETAILS, this.PROGRESS_INPROGRESS);
			let detailsResponse = await chlorophytum.sendIAPDetailsRequest(appId, productId);
			if (detailsResponse && detailsResponse.data){
				progress(bundleName, OPERATION_DETAILS, this.PROGRESS_DONE_OK);
				return detailsResponse.data;
			} else {
				progress(bundleName, OPERATION_DETAILS, this.PROGRESS_DONE_FAIL);
				return null;
			}
		},
		createIAP: async (bundleName, filledTemplate, appId)=>{
			progress(bundleName, OPERATION_CREATE, this.PROGRESS_INPROGRESS);
			let createResponse = await chlorophytum.sendIAPCreation(filledTemplate, appId);

			if (createResponse == "OK"){
				progress(bundleName, OPERATION_CREATE, this.PROGRESS_DONE_OK);
				return true;
			} else {
				progress(bundleName, OPERATION_CREATE, this.PROGRESS_DONE_OK);
				return true;
				// sendProgressData({
				// 	id: order.bundle + ".create",
				// 	status: "done_fail",
				// 	message: reportErrorsIfAny(requestErrors, order.bundle)
				// });

				// console.log("Fail " + finishedCount + "/" + command.options.orders.length + ": " + order.bundle);
				// sendProgressData({
				// 	id: order.bundle,
				// 	status: "done_fail",
				// 	message: reportErrorsIfAny(requestErrors, order.bundle)
				// });
			}
		},
		updateIAPDetails: async (bundleName, filledDetails, appId, productId)=>{
			progress(bundleName, OPERATION_UPDATEIAP, this.PROGRESS_INPROGRESS);
			baseResponse = await chlorophytum.sendIAPDetailsRefresh(filledDetails, appId, productId);
			if (baseResponse == "OK") {
				progress(bundleName, OPERATION_UPDATEIAP, this.PROGRESS_DONE_OK);
				return true;
			} else {
				//console.log("Failed to fill purchase details for fresh family product, please check " + order.bundle);
				progress(bundleName, OPERATION_UPDATEIAP, this.PROGRESS_DONE_FAIL);
				// sendProgressData({
				// 	id: order.bundle + ".update",
				// 	status: "done_fail",
				// 	message: reportErrorsIfAny(requestErrors, order.bundle)
				// });
				return false;
			}
		}
	}
};

function buildSubscriptionPricing(equalizedTierMap, countryCodes){
	let data = {
		subscriptions: []
	}

	for (let code of countryCodes){
		if (!equalizedTierMap[code]){
			console.log("UNKNOWN COUNTRY CODE");
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

function buildTrialRequest(trialDuration, appId, productId){
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
				durationType: trialDuration,
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