/*
Delphinium.js

Delphinium is Strelitzia module responsible for orchestrating processes provided by Argentea

https://www.deviantart.com/argonaut11/art/Delphinium-Darling-In-the-Franxx-756840835
*/

const argentea = require("./argentea.js");
const DEFAULT_FAMILY_NAME = "Subscriptions";

module.exports = {
	createIAPs: async (orders, appId, storage, sequentialMode)=>{
		argentea.planning.resetProgressList();

		let firstRSOrder = getFirstRSOrder(orders);
		if (firstRSOrder){
			argentea.planning.planFamilyCheck();
			let selectedFamily = await argentea.operations.selectFamily(appId, false, DEFAULT_FAMILY_NAME);
			if (!selectedFamily)
				return false;
			
			if (DEBUG_FAMILY_BYPASS){ 
				selectedFamily = {
					name: DEFAULT_FAMILY_NAME + Math.floor(Math.random(10000)),
					id: null
				};
			}
			
			if (!selectedFamily.id){
				//Create family by completing first RS order 
				argentea.planning.planFamilyCreation();
				let template = await argentea.operations.requestFamilyTemplate(firstRSOrder.bundle, appId);

				template.activeAddOns[0].productId = {value: firstRSOrder.bundle};
				template.activeAddOns[0].referenceName = {value: firstRSOrder.refname};
				//template.activeAddOns[0].pricingDurationType = {value: firstRSOrder.duration}; //doesn't work
				template.name = {value: selectedFamily.name};
				template.details.value = [];

				if (! await argentea.operations.createFamily(firstRSOrder.bundle, tempalte, appId))
					return false;
				
				selectedFamily = await argentea.operations.selectFamily(appId, true, selectedFamily.name);
				if (!(selectedFamily && selectedFamily.id))
					return false;

				let productId = await argentea.operations.obtainFreshPurchase(firstRSOrder.bundle, appId);
				if (!productId)
					return false;

				let productDetails = await argentea.operations.requestIAPDetails(firstRSOrder.bundle, appId, productId);
				if (!productDetails)
					return false;
				productDetails.versions[0].details.value = [buildEnUsVersion(firstRSOrder.version.name, firstRSOrder.version.desc)];
				productDetails.pricingDurationType = {value: order.duration};
				if (! await argentea.operations.updateIAPDetails(firstRSOrder.bundle, productDetails, appId, productId))
					return false;

				if (! await sendPriceAndTrial(firstRSOrder, appId, productId, storage.rsMatrix, storage.cMatrix, storage.countryCodes))
					return false;
			}
		}
		//Create the rest of IAPs
	}
}

function getFirstRSOrder(orders){
	for (let order of rders)
		if (order.type == "rs") 
			return order;
	return null;
}

async function sendPriceAndTrial(order, appId, productId, rsMatrix, cMatrix, countryCodes){
	function determineTier(type, price){
		for (let t of (type == "rs") ? rsMatrix : cMatrix){
			if (price == t.price){
				return t.tier;
			}
		}
		return 0;
	}
	let equalizedTierMap = await argentea.operations.equalizeByUSD(order.bundle, appId, productId, determineTier("rs", order.price));

	if (! await argentea.operations.createRSPricing(order.bundle, equalizedTierMap, countryCodes, appId, productId))
		return false;
	
	if (order.trial != "off"){
		if (! await argentea.operations.createTrial(order.bundle, order.trial, appId, productId))
			return false;
	}
	return true;
}

function buildEnUsVersion(name, description){
	return {value: {
		description: {value: description},
		name:        {value: name},
		localeCode:  "en-US"
	}};
}








/*

function reportErrorsIfAny(e, target){
	if (e && e.length > 0){
		console.log("Errors (" + target + "): ");
		console.log(e.join("\n"));
		console.log("\n");
		return e.join("\n");
	}
	return null;
}








let familiesResponse = null;
if (firstRSOrder){
	sendProgressData({
		id: "getfamily",
		status: "inprogress"
	});
	familiesResponse = await sendFamiliesRequest(command.options.appId);
	
	let parsed = JSON.parse(familiesResponse).data;
	
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
				
				// let productId = foundFreshPurchase.adamId;
				// let equalizedRaw = await sendEqualizeByUSDRequest(command.options.appId, productId, determineTier(order.type, order.price));
				// let equalized = JSON.parse(equalizedRaw).data;
				// let pricing = buildSubscriptionPricing(equalized);
				// sendProgressData({
				// 	id: order.bundle + ".price",
				// 	status: "inprogress"
				// });
				// let pricingResponse = await sendRSPriceCreation(pricing, command.options.appId, productId);
				// if (pricingResponse == "OK"){
				// 	sendProgressData({
				// 		id: order.bundle + ".price",
				// 		status: "done_ok"
				// 	});
					
				// 	if (order.trial != "off"){
				// 		sendProgressData({
				// 			id: order.bundle + ".trial",
				// 			status: "inprogress"
				// 		});
				// 		let trial = buildTrialRequest(order.trial, command.options.appId, productId);
				// 		let trialResponse = await sendTrialCreation(trial);
				// 		if (trialResponse != "OK") {
				// 			console.log("Failed to create trial for " + order.bundle);
				// 			sendProgressData({
				// 				id: order.bundle + ".trial",
				// 				status: "done_fail",
				// 				message: reportErrorsIfAny(requestErrors, order.bundle)
				// 			});
				// 		} else {
				// 			sendProgressData({
				// 				id: order.bundle + ".trial",
				// 				status: "done_ok"
				// 			});
				// 		}
				// 	}
				// } else {
				// 	sendProgressData({
				// 		type: "update",
				// 		id: order.bundle + ".price",
				// 		status: "done_fail",
				// 		message: reportErrorsIfAny(requestErrors, order.bundle)
				// 	});
				// }
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
}*/