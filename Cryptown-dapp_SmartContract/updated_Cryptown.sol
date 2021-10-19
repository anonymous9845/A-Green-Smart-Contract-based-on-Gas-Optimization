pragma solidity ^0.4.11;
pragma experimental ABIEncoderV2;
import "./Ownable.sol";
contract Cryptown is Ownable {

    string public rootHash;


   function newArraypercelsid(uint32[] memory keys, uint32 value) private returns (uint32[]) {
    uint32[] memory arr = new uint32[](keys.length+1);
    for(uint i=0; i<keys.length; i++) arr[i] = keys[i];

    arr[arr.length-1] = value; 

    return arr;
  }

   function newArrayownerToCompanyKeys(address[] memory keys, address value) private returns (address[]) {
    address[] memory arr = new address[](keys.length+1);
    for(uint i=0; i<keys.length; i++) arr[i] = keys[i];

    arr[arr.length-1] = value; 

    return arr;
  }

  function newArrayownerToCompanyValues(CompanyInfo[] memory values) private returns (CompanyInfo[]) {
    CompanyInfo[] memory arr = new CompanyInfo[](values.length+1);
    for(uint i=0; i<values.length; i++) arr[i] = values[i];

    return arr;
  }

  function ownerToCompanyPosition(address[] keys, address key) private returns(uint) {
      for(uint i=0; i<keys.length; i++) if(keys[i] == key) return i; return keys.length;
  }

   function newArrayparcelToOwnerKeys(uint32[] memory keys, uint32 value) private returns (uint32[]) {
    uint32[] memory arr = new uint32[](keys.length+1);
    for(uint i=0; i<keys.length; i++) arr[i] = keys[i];

    arr[arr.length-1] = value; 

    return arr;
  }

  function newArrayparcelToOwnerValues(address[] memory values) private returns (address[]) {
    address[] memory arr = new address[](values.length+1);
    for(uint i=0; i<values.length; i++) arr[i] = values[i];

    return arr;
  }

  function parcelToOwnerPosition(uint32[] keys, uint32 key) private returns(uint) {
      for(uint i=0; i<keys.length; i++) if(keys[i] == key) return i; return keys.length;
  }

  event updateIpfsVariableownerToCompany(address key, CompanyInfo value);

  event updateIpfsVariableparcelToOwner(uint32 key, address value);

    function setHash(string _rootHash) public {
        rootHash = _rootHash;
    }

    function getHash(address[] ownerToCompany_keys, CompanyInfo[] ownerToCompany_values) public view returns (string) {
        return rootHash;
    }

    
    struct CompanyInfo {
        string name;
        string url;
        string logoUrl;
        string schedule;
        uint32[] parcels;
        bool initialized;
    }
    
    
    
    
    modifier companyInitial (address _companyId) {
      // not used
    //   uint ownerToCompany_key_index = 0;
    // ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, _companyId);
    // if(ownerToCompany_key_index == ownerToCompany_keys.length) {
    //   ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, _companyId);
    //   ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);
    // }

    //     require(ownerToCompany_values[ownerToCompany_key_index].initialized);
        _;
    }
    
    
    function registerCompanyInformation(string _name, string _url, string _logoUrl, string _schedule, address[] memory ownerToCompany_keys, CompanyInfo[] ownerToCompany_values) public {
    ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, msg.sender);
    if(ownerToCompany_key_index == ownerToCompany_keys.length) {
      ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, msg.sender);
      ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);
    }

        require(!ownerToCompany_values[ownerToCompany_key_index].initialized);
        CompanyInfo memory info = CompanyInfo(_name, _url, _logoUrl, _schedule, new uint32[](0), true);
    uint ownerToCompany_key_index = 0;
    ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, msg.sender);
    if(ownerToCompany_key_index == ownerToCompany_keys.length) {
      ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, msg.sender);
      ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);
    }

    emit updateIpfsVariableownerToCompany(ownerToCompany_keys[ownerToCompany_key_index], ownerToCompany_values[ownerToCompany_key_index]);
        ownerToCompany_values[ownerToCompany_key_index] = info;
    }
    
    
    function modifyCompanyInformation(string _name, string _url, string _logoUrl, string _schedule, address[] ownerToCompany_keys, CompanyInfo[] ownerToCompany_values) public {
    ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, msg.sender);
    if(ownerToCompany_key_index == ownerToCompany_keys.length) {
      ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, msg.sender);
      ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);
    }

        require(ownerToCompany_values[ownerToCompany_key_index].initialized);
    ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, msg.sender);
    if(ownerToCompany_key_index == ownerToCompany_keys.length) {
      ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, msg.sender);
      ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);
    }

    
        CompanyInfo memory companyInfo = ownerToCompany_values[ownerToCompany_key_index];
    uint ownerToCompany_key_index = 0;
        companyInfo.name = _name;
        companyInfo.url = _url;
        companyInfo.logoUrl = _logoUrl;
        companyInfo.schedule = _schedule;
        ownerToCompany_values[ownerToCompany_key_index] = companyInfo;
        emit updateIpfsVariableownerToCompany(ownerToCompany_keys[ownerToCompany_key_index], ownerToCompany_values[ownerToCompany_key_index]);
    }
    
    
    function getCompanyInformation(address _companyId, address[] ownerToCompany_keys, CompanyInfo[] ownerToCompany_values) public view returns(string, string, string, string, uint32[]) {
    ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, _companyId);
    if(ownerToCompany_key_index == ownerToCompany_keys.length) {
      ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, _companyId);
      ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);
    }

        require(ownerToCompany_values[ownerToCompany_key_index].initialized);
    ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, _companyId);
    if(ownerToCompany_key_index == ownerToCompany_keys.length) {
      ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, _companyId);
      ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);
    }

        CompanyInfo memory info = ownerToCompany_values[ownerToCompany_key_index];
    uint ownerToCompany_key_index = 0;
    emit updateIpfsVariableownerToCompany(ownerToCompany_keys[ownerToCompany_key_index], ownerToCompany_values[ownerToCompany_key_index]);
        return (info.name, info.url,  info.logoUrl, info.schedule, info.parcels);
    }
    
    
    function purchaseParcel(uint32 _parcelId, uint32[] parcelToOwner_keys, address[] parcelToOwner_values, address[] ownerToCompany_keys, CompanyInfo[] ownerToCompany_values) public {
    uint parcelToOwner_key_index = 0;
    ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, msg.sender);
    if(ownerToCompany_key_index == ownerToCompany_keys.length) {
      ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, msg.sender);
      ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);
    }

        require(ownerToCompany_values[ownerToCompany_key_index].initialized); // Company exists
    uint ownerToCompany_key_index = 0;
    parcelToOwner_key_index = parcelToOwnerPosition(parcelToOwner_keys, _parcelId);
    if(parcelToOwner_key_index == parcelToOwner_keys.length) {
      parcelToOwner_keys = newArrayparcelToOwnerKeys(parcelToOwner_keys, _parcelId);
      parcelToOwner_values = newArrayparcelToOwnerValues(parcelToOwner_values);
    }

        require(parcelToOwner_values[parcelToOwner_key_index] == 0); // Parcel must not be asigned to be purchase
    parcelToOwner_key_index = parcelToOwnerPosition(parcelToOwner_keys, _parcelId);
    if(parcelToOwner_key_index == parcelToOwner_keys.length) {
      parcelToOwner_keys = newArrayparcelToOwnerKeys(parcelToOwner_keys, _parcelId);
      parcelToOwner_values = newArrayparcelToOwnerValues(parcelToOwner_values);
    }

    emit updateIpfsVariableparcelToOwner(parcelToOwner_keys[parcelToOwner_key_index], parcelToOwner_values[parcelToOwner_key_index]);
        parcelToOwner_values[parcelToOwner_key_index] = msg.sender; // Assign parcel to sender address
    ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, msg.sender);
    if(ownerToCompany_key_index == ownerToCompany_keys.length) {
      ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, msg.sender);
      ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);
    }

        ownerToCompany_values[ownerToCompany_key_index].parcels = newArraypercelsid(ownerToCompany_values[ownerToCompany_key_index].parcels, _parcelId);
        emit updateIpfsVariableownerToCompany(ownerToCompany_keys[ownerToCompany_key_index], ownerToCompany_values[ownerToCompany_key_index]);
    } 
    
    
    function indexOfParcel(CompanyInfo _companyInfo, uint32 _parcelId) internal pure returns(uint8) {
        for(uint8 i = 0; i < _companyInfo.parcels.length; i++) {
            if(_companyInfo.parcels[i] == _parcelId) {
                return i;
            }
        }
        return uint8(-1);
    }
    
    
    function sellParcel(uint32 _parcelId, address _customerAddress, uint32[] parcelToOwner_keys, address[] parcelToOwner_values, address[] ownerToCompany_keys, CompanyInfo[] ownerToCompany_values) public {
    uint parcelToOwner_key_index = 0;
    uint ownerToCompany_key_index = 0;
    parcelToOwner_key_index = parcelToOwnerPosition(parcelToOwner_keys, _parcelId);
    if(parcelToOwner_key_index == parcelToOwner_keys.length) {
      parcelToOwner_keys = newArrayparcelToOwnerKeys(parcelToOwner_keys, _parcelId);
      parcelToOwner_values = newArrayparcelToOwnerValues(parcelToOwner_values);
    }

        require(parcelToOwner_values[parcelToOwner_key_index] == msg.sender); // Parcel must currently owns to sender
    ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, _customerAddress);
    if(ownerToCompany_key_index == ownerToCompany_keys.length) {
      ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, _customerAddress);
      ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);
    }

        require(ownerToCompany_values[ownerToCompany_key_index].initialized); // Another address must be registered as company to sell the parcel
    ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, _customerAddress);
    if(ownerToCompany_key_index == ownerToCompany_keys.length) {
      ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, _customerAddress);
      ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);
    }

    emit updateIpfsVariableownerToCompany(ownerToCompany_keys[ownerToCompany_key_index], ownerToCompany_values[ownerToCompany_key_index]);
        uint8 parcelIndex = indexOfParcel(ownerToCompany_values[ownerToCompany_key_index], _parcelId);
    ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, _customerAddress);
    if(ownerToCompany_key_index == ownerToCompany_keys.length) {
      ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, _customerAddress);
      ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);
    }

    emit updateIpfsVariableownerToCompany(ownerToCompany_keys[ownerToCompany_key_index], ownerToCompany_values[ownerToCompany_key_index]);
        delete ownerToCompany_values[ownerToCompany_key_index].parcels[parcelIndex];
    parcelToOwner_key_index = parcelToOwnerPosition(parcelToOwner_keys, _parcelId);
    if(parcelToOwner_key_index == parcelToOwner_keys.length) {
      parcelToOwner_keys = newArrayparcelToOwnerKeys(parcelToOwner_keys, _parcelId);
      parcelToOwner_values = newArrayparcelToOwnerValues(parcelToOwner_values);
    }

    emit updateIpfsVariableparcelToOwner(parcelToOwner_keys[parcelToOwner_key_index], parcelToOwner_values[parcelToOwner_key_index]);
        parcelToOwner_values[parcelToOwner_key_index] = _customerAddress;
    ownerToCompany_key_index = ownerToCompanyPosition(ownerToCompany_keys, _customerAddress);
    if(ownerToCompany_key_index == ownerToCompany_keys.length) {
      ownerToCompany_keys = newArrayownerToCompanyKeys(ownerToCompany_keys, _customerAddress);
      ownerToCompany_values = newArrayownerToCompanyValues(ownerToCompany_values);
    }

      ownerToCompany_values[ownerToCompany_key_index].parcels = newArraypercelsid(ownerToCompany_values[ownerToCompany_key_index].parcels, _parcelId);
      emit updateIpfsVariableownerToCompany(ownerToCompany_keys[ownerToCompany_key_index], ownerToCompany_values[ownerToCompany_key_index]);
    }
    
}
