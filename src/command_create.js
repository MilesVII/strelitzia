module.exports = () => {

};

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
				
				/*let productId = foundFreshPurchase.adamId;
				let equalizedRaw = await sendEqualizeByUSDRequest(command.options.appId, productId, determineTier(order.type, order.price));
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
				}*/
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