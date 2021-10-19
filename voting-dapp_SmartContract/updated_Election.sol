    emit updateIpfsVariablecandidatesCount(candidatesCount);
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
contract Election {

    string public rootHash;

   function newArraycandidatesKeys(uint256[] memory keys, uint256 value) private returns (uint256[]) {
    uint256[] memory arr = new uint256[](keys.length+1);
    for(uint i=0; i<keys.length; i++) arr[i] = keys[i];

    arr[arr.length-1] = value; 

    return arr;
  }

  function newArraycandidatesValues(Candidate[] memory values) private returns (Candidate[]) {
    Candidate[] memory arr = new Candidate[](values.length+1);
    for(uint i=0; i<values.length; i++) arr[i] = values[i];

    return arr;
  }

  function candidatesPosition(uint256[] keys, uint256 key) private returns(uint) {
      for(uint i=0; i<keys.length; i++) if(keys[i] == key) return i; return keys.length;
  }

   function newArrayvotersKeys(address[] memory keys, address value) private returns (address[]) {
    address[] memory arr = new address[](keys.length+1);
    for(uint i=0; i<keys.length; i++) arr[i] = keys[i];

    arr[arr.length-1] = value; 

    return arr;
  }

  function newArrayvotersValues(bool[] memory values) private returns (bool[]) {
    bool[] memory arr = new bool[](values.length+1);
    for(uint i=0; i<values.length; i++) arr[i] = values[i];

    return arr;
  }

  function votersPosition(address[] keys, address key) private returns(uint) {
      for(uint i=0; i<keys.length; i++) if(keys[i] == key) return i; return keys.length;
    uint candidates_key_index = 0;
  }

  event updateIpfsVariablecandidatesCount(uint256 value);

  event updateIpfsVariablecandidates(uint256 key, Candidate value);

  event updateIpfsVariablevoters(address key, bool value);

    function setHash(string _rootHash) public {
        rootHash = _rootHash;
    }

    function getHash() public view returns (string) {
        return rootHash;
    }

    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }
    event votedEvent(uint256 indexed _candidateId);
    function getCandidatesCount(uint256 candidatesCount) public returns(uint256) {
    emit updateIpfsVariablecandidatesCount(candidatesCount);
        return candidatesCount;
    uint candidates_key_index = 0;
    }
    function setCandidatesCount(uint256 value, uint256 candidatesCount) {
        candidatesCount = value;
    uint candidates_key_index = 0;
    }
    constructor() public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
        addCandidate("Candidate 3");
    emit updateIpfsVariablecandidatesCount(candidatesCount);
    }
    function addCandidate(string memory _name, uint256[] candidates_keys, Candidate[] candidates_values, uint256 candidatesCount, string memory) public {
        uint256 candidatesCount = getCandidatesCount();
    uint candidates_key_index = 0;
        
        candidatesCount++;
    candidates_key_index = candidatesPosition(candidates_keys, candidatesCount);
    if(candidates_key_index == candidates_keys.length) {
      candidates_keys = newArraycandidatesKeys(candidates_keys, candidatesCount);
      candidates_values = newArraycandidatesValues(candidates_values);
    }

    emit updateIpfsVariablecandidates(candidates_keys[candidates_key_index], candidates_values[candidates_key_index]);
        candidates_values[candidates_key_index] = Candidate(candidatesCount, _name, 0);
        setCandidatesCount(candidatesCount);
    emit updateIpfsVariablecandidatesCount(candidatesCount);
    }
    function vote(uint256 _candidateId, address[] voters_keys, bool[] voters_values, uint256[] candidates_keys, Candidate[] candidates_values, uint256 candidatesCount) public {
    uint voters_key_index = 0;
    uint candidates_key_index = 0;
    voters_key_index = votersPosition(voters_keys, msg.sender);
    if(voters_key_index == voters_keys.length) {
      voters_keys = newArrayvotersKeys(voters_keys, msg.sender);
      voters_values = newArrayvotersValues(voters_values);
    }

        require(!voters_values[voters_key_index]);
        require(_candidateId > 0 && _candidateId <= candidatesCount);
    voters_key_index = votersPosition(voters_keys, msg.sender);
    if(voters_key_index == voters_keys.length) {
      voters_keys = newArrayvotersKeys(voters_keys, msg.sender);
      voters_values = newArrayvotersValues(voters_values);
    }

    emit updateIpfsVariablevoters(voters_keys[voters_key_index], voters_values[voters_key_index]);
        voters_values[voters_key_index] = true;
    candidates_key_index = candidatesPosition(candidates_keys, _candidateId);
    if(candidates_key_index == candidates_keys.length) {
      candidates_keys = newArraycandidatesKeys(candidates_keys, _candidateId);
      candidates_values = newArraycandidatesValues(candidates_values);
    }

    emit updateIpfsVariablecandidates(candidates_keys[candidates_key_index], candidates_values[candidates_key_index]);
        candidates_values[candidates_key_index].voteCount++;
        emit votedEvent(_candidateId);
    }
}
