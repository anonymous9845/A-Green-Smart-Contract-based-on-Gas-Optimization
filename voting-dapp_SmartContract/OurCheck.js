let Election = artifacts.require("./Election.sol");
const Web3 = require('web3');

contract("Contract", async(accounts) => {
    var election;
    var owner = accounts[0];

    // 각 테스트가 진행되기 전에 실행됩니다.
    // before(async function() {
    //     // set contract instance into a variable
    //     var param2 = web3.utils.asciiToHex("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    //     store = await Store.new(param2, 1, {from:owner});
    // })

    before(async function() {
        election = await Election.new({from:owner});
        // defaultOwner = address(this);
        // dummy = address(0x00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDEADBEEF);
        // customerAddress = address(0x00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFAA);

        // var param1 = web3.utils.fromAscii("Candidate 1");
        // var param2 = web3.utils.fromAscii("Candidate 2");
        // var param3 = web3.utils.fromAscii("Candidate 3");
        // var keys = [];
        // var values = [];
        // var count = 1;
        // var result = await election.addCandidate(param1, keys, values, count, {from: owner});
        // result = await election.addCandidate(param2, keys, values, count, {from: owner});
        // result = await election.addCandidate(param3, keys, values, count, {from: owner});

    })
    it("addCandidate", async function() {
        var param1 = web3.utils.fromAscii("Hong gil dong");
        var keys = [];
        var values = [];
        var count = 1;
        
        var code = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        var result = await election.addCandidate(param1, keys, values, count, code, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 29,711
        console.log("addCandidate : " + gas);
    })

    it("vote", async function() {
        var keys1 = [];
        var values1 = [];

        var keys2 = [];
        var values2 = [];
        var count = 1;
        var result = await election.vote(1, keys1, values1, keys2, values2, count, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 33,021
        console.log("vote : " + gas);
    })
});