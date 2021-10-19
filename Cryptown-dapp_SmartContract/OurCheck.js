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
        var param1 = web3.utils.fromAscii("Hong gil dong1");
        var param2 = web3.utils.fromAscii("Hong gil dong2");
        var param3 = web3.utils.fromAscii("Hong gil dong3");
        var param4 = web3.utils.fromAscii("Hong gil dong4");
        var keys = [];
        var values = [];

        var result = await town.registerCompanyInformation(param1, param2, param3, param4, keys, values, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 35,851
        console.log("registerCompanyInformation : " + gas);
    })

    it("modifyCompanyInformation", async function() {
        var param1 = web3.utils.fromAscii("Hong gil dong1");
        var param2 = web3.utils.fromAscii("Hong gil dong2");
        var param3 = web3.utils.fromAscii("Hong gil dong3");
        var param4 = web3.utils.fromAscii("Hong gil dong4");
        var keys = [];
        var values = [];

        var result = await town.modifyCompanyInformation(param1, param2, param3, param4, keys, values, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 37,120
        console.log("modifyCompanyInformation : " + gas);
    })

    it("purchaseParcel", async function() {
        var keys1 = [];
        var values1 = [];

        var keys2 = [];
        var values2 = [];
        var result = await town.purchaseParcel(5, keys1, values1, keys2, values2, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 34,616
        console.log("purchaseParcel : " + gas);
    })

});