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
        var code = "function addCandidate(string memory _name, uint256[] candidates_keys, Candidate[] candidates_values, uint256 candidatesCount, string memory) public {uint256 candidatesCount = getCandidatesCount(); uint candidates_key_index = 0; candidatesCount++; candidates_key_index = candidatesPosition(candidates_keys, candidatesCount);if(candidates_key_index == candidates_keys.length) {candidates_keys = newArraycandidatesKeys(candidates_keys, candidatesCount);candidates_values = newArraycandidatesValues(candidates_values);}emit updateIpfsVariablecandidates(candidates_keys[candidates_key_index], candidates_values[candidates_key_index]);candidates_values[candidates_key_index] = Candidate(candidatesCount, _name, 0);setCandidatesCount(candidatesCount);emit updateIpfsVariablecandidatesCount(candidatesCount);}";
        var result = await election.executeFunction(code, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 35,191
        console.log("addCandidate : " + gas);
    })

    it("vote", async function() {
        var code = "uint voters_key_index = 0;uint candidates_key_index = 0;voters_key_index = votersPosition(voters_keys, msg.sender);if(voters_key_index == voters_keys.length) {voters_keys = newArrayvotersKeys(voters_keys, msg.sender);voters_values = newArrayvotersValues(voters_values);}require(!voters_values[voters_key_index]);require(_candidateId > 0 && _candidateId <= candidatesCount);voters_key_index = votersPosition(voters_keys, msg.sender);if(voters_key_index == voters_keys.length) {voters_keys = newArrayvotersKeys(voters_keys, msg.sender);voters_values = newArrayvotersValues(voters_values);}emit updateIpfsVariablevoters(voters_keys[voters_key_index], voters_values[voters_key_index]);voters_values[voters_key_index] = true;candidates_key_index = candidatesPosition(candidates_keys, _candidateId);if(candidates_key_index == candidates_keys.length) {candidates_keys = newArraycandidatesKeys(candidates_keys, _candidateId);candidates_values = newArraycandidatesValues(candidates_values);}emit updateIpfsVariablecandidates(candidaes_keys[candidates_key_index], candidates_values[candidates_key_index]);candidates_values[candidates_key_index].voteCount++;emit votedEvent(_candidateId);}";
        var result = await election.executeFunction(code, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 41,190
        console.log("vote : " + gas);
    })
});
