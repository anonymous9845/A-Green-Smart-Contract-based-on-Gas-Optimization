
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
contract Election {

    string public rootHash;
    string constant function1Hash = "aaa";

    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    event updateIpfsVariablecandidatesCount(uint256 value);

    event updateIpfsVariablecandidates(uint256 key, Candidate value);

    event updateIpfsVariablevoters(address key, bool value);
    event votedEvent(uint256 indexed _candidateId);

    constructor() public {

    }

    function executeFunction(string functionCode) {
        // if(function1Hash == hash(functionCode)) {
        //     eval(functionCode);
        // }
    }
}
