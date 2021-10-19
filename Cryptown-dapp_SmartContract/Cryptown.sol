pragma solidity ^0.4.11;

import "./Ownable.sol";

contract Cryptown is Ownable {
    
    // Company information
    struct CompanyInfo {
        string name;
        string url;
        string logoUrl;
        string schedule;
        uint32[] parcels;
        bool initialized;
    }
    
    
    // Each parcel has an owner
    mapping(uint32 => address) parcelToOwner;
    // Each owner has a company information
    mapping(address => CompanyInfo) ownerToCompany;
    
    
    // Check if company is initialized (not used yet)
    modifier companyInitial (address _companyId) {
        require(ownerToCompany[_companyId].initialized);
        _;
    }
    
    
    // Register a new company by its address
    function registerCompanyInformation(string _name, string _url, string _logoUrl, string _schedule) external {
        // Check address not exists
        require(!ownerToCompany[msg.sender].initialized);
        CompanyInfo memory info = CompanyInfo(_name, _url, _logoUrl, _schedule, new uint32[](0), true);
        ownerToCompany[msg.sender] = info;
    }
    
    
    // Modify Company information. Only owner is able to modify it
    function modifyCompanyInformation(string _name, string _url, string _logoUrl, string _schedule) external {
        require(ownerToCompany[msg.sender].initialized);
        CompanyInfo storage companyInfo = ownerToCompany[msg.sender];
        companyInfo.name = _name;
        companyInfo.url = _url;
        companyInfo.logoUrl = _logoUrl;
        companyInfo.schedule = _schedule;
    }
    
    
    // Obtain the information about company. No gas required (only view)
    function getCompanyInformation(address _companyId) external view returns(string, string, string, string, uint32[]) {
        require(ownerToCompany[_companyId].initialized);
        CompanyInfo memory info = ownerToCompany[_companyId];
        return (info.name, info.url,  info.logoUrl, info.schedule, info.parcels);
    }
    
    
    // An address purchases the empty parcel
    // TODO: include payment to contract owner address
    function purchaseParcel(uint32 _parcelId) external {
        require(ownerToCompany[msg.sender].initialized); // Company exists
        require(parcelToOwner[_parcelId] == 0); // Parcel must not be asigned to be purchase
        parcelToOwner[_parcelId] = msg.sender; // Assign parcel to sender address
        ownerToCompany[msg.sender].parcels.push(_parcelId);
    } 
    
    
    // Obtain the parcel index on array of parcels
    function indexOfParcel(CompanyInfo _companyInfo, uint32 _parcelId) internal pure returns(uint8) {
        for(uint8 i = 0; i < _companyInfo.parcels.length; i++) {
            if(_companyInfo.parcels[i] == _parcelId) {
                return i;
            }
        }
        return uint8(-1);
    }
    
    
    // Transfers a parcel from owner to another customer
    // TODO: modify this to include an ammount to transfer. 
    function sellParcel(uint32 _parcelId, address _customerAddress) external {
        require(parcelToOwner[_parcelId] == msg.sender); // Parcel must currently owns to sender
        require(ownerToCompany[_customerAddress].initialized); // Another address must be registered as company to sell the parcel
        // Remove from current owner
        uint8 parcelIndex = indexOfParcel(ownerToCompany[_customerAddress], _parcelId);
        delete ownerToCompany[_customerAddress].parcels[parcelIndex];
        // Reasign to new customer
        parcelToOwner[_parcelId] = _customerAddress;
        ownerToCompany[_customerAddress].parcels.push(_parcelId);
    }
    
}
