let Cryptown = artifacts.require("./Cryptown.sol");
const Web3 = require('web3');

contract("Contract", async(accounts) => {
    var town;
    var owner = accounts[0];
    var tempAddr = accounts[1];

    // 각 테스트가 진행되기 전에 실행됩니다.
    // before(async function() {
    //     // set contract instance into a variable
    //     var param2 = web3.utils.asciiToHex("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    //     store = await Store.new(param2, 1, {from:owner});
    // })

    before(async function() {
        town = await Cryptown.new({from:owner});
        // defaultOwner = address(this);
        // dummy = address(0x00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDEADBEEF);
        // customerAddress = address(0x00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFAA);


    })
    it("registerCompanyInformation", async function() {
        var code = "function registerCompanyInformation(string _name, string _url, string _logoUrl, string _schedule, address[] ownerToCompany_keys, CompanyInfo[] ownerToCompany_values) public {uint ownerToCompany_key_index = 0;ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, msg.sender);if(ownerToCompany_key_index == ownerToCompany_keys.length) {ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, msg.sender);ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);}require(!ownerToCompany_values[ownerToCompany_key_index].initialized);CompanyInfo memory info = CompanyInfo(_name, _url, _logoUrl, _schedule, new uint32[](0), true);ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, msg.sender);if(ownerToCompany_key_index == ownerToCompany_keys.length) {ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, msg.sender);ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);}emit updateIpfsVariableownerToCompany(ownerToCompany_keys[ownerToCompany_key_index], ownerToCompany_values[ownerToCompany_key_index]);ownerToCompany_values[ownerToCompany_key_index] = info;}";

        var result = await town.executeFunction(code, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 41,080
        console.log("registerCompanyInformation : " + gas);
    })

    it("modifyCompanyInformation", async function() {
        var code = "function modifyCompanyInformation(string _name, string _url, string _logoUrl, string _schedule, address[] ownerToCompany_keys, CompanyInfo[] ownerToCompany_values) public {ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, msg.sender);if(ownerToCompany_key_index == ownerToCompany_keys.length) {ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, msg.sender);ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);}require(ownerToCompany_values[ownerToCompany_key_index].initialized);ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, msg.sender);if(ownerToCompany_key_index == ownerToCompany_keys.length) {ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, msg.sender);ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);}CompanyInfo memory companyInfo = ownerToCompany_values[ownerToCompany_key_index];uint ownerToCompany_key_index = 0;companyInfo.name = _name;companyInfo.url = _url;companyInfo.logoUrl = _logoUrl;companyInfo.schedule = _schedule;ownerToCompany_values[ownerToCompany_key_index] = companyInfo;emit updateIpfsVariableownerToCompany(ownerToCompany_keys[ownerToCompany_key_index], ownerToCompany_values[ownerToCompany_key_index]);}";

        var result = await town.executeFunction(code, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 42,707
        console.log("modifyCompanyInformation : " + gas);
    })

    it("purchaseParcel", async function() {
        var code = "function purchaseParcel(uint32 _parcelId, uint32[] parcelToOwner_keys, address[] memory parcelToOwner_values, address[] ownerToCompany_keys, CompanyInfo[] ownerToCompany_values) public {uint parcelToOwner_key_index = 0;uint ownerToCompany_key_index = 0;ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, msg.sender);if(ownerToCompany_key_index == ownerToCompany_keys.length) {ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, msg.sender);ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);}require(ownerToCompany_values[ownerToCompany_key_index].initialized); // Company existsparcelToOwner_key_index = parcelToOwnerPosition(parcelToOwner_keys, _parcelId);if(parcelToOwner_key_index == parcelToOwner_keys.length) {parcelToOwner_keys = newArrayparcelToOwnerKeys(parcelToOwner_keys, _parcelId);parcelToOwner_values = newArrayparcelToOwnerValues(parcelToOwner_values);}require(parcelToOwner_values[parcelToOwner_key_index] == 0); // Parcel must not be asigned to be purchaseparcelToOwner_key_index = parcelToOwnerPosition(parcelToOwner_keys, _parcelId);if(parcelToOwner_key_index == parcelToOwner_keys.length) {parcelToOwner_keys = newArrayparcelToOwnerKeys(parcelToOwner_keys, _parcelId);parcelToOwner_values = newArrayparcelToOwnerValues(parcelToOwner_values);}emit updateIpfsVariableparcelToOwner(parcelToOwner_keys[parcelToOwner_key_index], parcelToOwner_values[parcelToOwner_key_index]);parcelToOwner_values[parcelToOwner_key_index] = msg.sender; // Assign parcel to sender addressownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, msg.sender);if(ownerToCompany_key_index == ownerToCompany_keys.length) {ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, msg.sender);ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);}emit updateIpfsVariableownerToCompany(ownerToCompany_keys[ownerToCompany_key_index], ownerToCompany_values[ownerToCompany_key_index]);ownerToCompany_values[ownerToCompany_key_index].parcels.push(_parcelId);} ";

        var result = await town.executeFunction(code, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);


        // 55,530
        console.log("purchaseParcel : " + gas);
    })

});
