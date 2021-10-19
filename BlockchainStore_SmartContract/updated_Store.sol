pragma solidity ^0.4.10;
pragma experimental ABIEncoderV2;
import "./Base/Owned.sol";
import "./Base/SafeMath.sol";
contract Store is Owned, SafeMath {

    string public rootHash;

   function newArrayproductsid(uint256[] memory keys, uint256 value) private returns (uint256[]) {
    uint256[] memory arr = new uint256[](keys.length+1);
    for(uint i=0; i<keys.length; i++) arr[i] = keys[i];

    arr[arr.length-1] = value; 

    return arr;
  }

   function newArrayproductsKeys(uint256[] memory keys, uint256 value) private returns (uint256[]) {
    uint256[] memory arr = new uint256[](keys.length+1);
    for(uint i=0; i<keys.length; i++) arr[i] = keys[i];

    arr[arr.length-1] = value; 

    return arr;
  }

  function newArrayproductsValues(Product[] memory values) private returns (Product[]) {
    Product[] memory arr = new Product[](values.length+1);
    for(uint i=0; i<values.length; i++) arr[i] = values[i];

    return arr;
  }

  function productsPosition(uint256[] keys, uint256 key) private returns(uint) {
      for(uint i=0; i<keys.length; i++) if(keys[i] == key) return i; return keys.length;
  }

   function newArraycustomersKeys(address[] memory keys, address value) private returns (address[]) {
    address[] memory arr = new address[](keys.length+1);
    for(uint i=0; i<keys.length; i++) arr[i] = keys[i];

    arr[arr.length-1] = value; 

    return arr;
  }

  function newArraycustomersValues(Customer[] memory values) private returns (Customer[]) {
    Customer[] memory arr = new Customer[](values.length+1);
    for(uint i=0; i<values.length; i++) arr[i] = values[i];

    return arr;
  }

  function customersPosition(address[] keys, address key) private returns(uint) {
      for(uint i=0; i<keys.length; i++) if(keys[i] == key) return i; return keys.length;
  }

  event updateIpfsVariableproducts(uint256 key, Product value);

  event updateIpfsVariablecustomers(address key, Customer value);

  event updateIpfsVariablestore_balance(uint256 value);

  event updateIpfsVariablestore_name(bytes32 value);

    function setHash(string _rootHash) public {
        rootHash = _rootHash;
    }

    function getHash() public view returns (string) {
        return rootHash;
    }

    event CustomerRegistered(address customer);
    event CustomerRegistrationFailed(address customer);
    event CustomerDeregistered(address customer);
    event CustomerDeregistrationFailed(address customer);
    event ProductRegistered(uint256 productId);
    event ProductDeregistered(uint256 productId);
    event ProductRegistrationFailed(uint256 productId);
    event ProductDeregistrationFaled(uint256 productId);
    event CartProductInserted(address customer, uint256 prodId, uint256 prodPrice, uint256 completeSum);
    event CartProductInsertionFailed(address customer, uint256 prodId);
    event CartProductRemoved(address customer, uint256 prodId);
    event CartCheckoutCompleted(address customer, uint256 paymentSum);
    event CartCheckoutFailed(address customer, uint256 customerBalance, uint256 paymentSum);
    event CartEmptied(address customer);
    struct Customer {
        address adr;
        bytes32 name;
        uint256 balance;
        Cart cart;
    }
    struct Cart {
      uint256[] products;
      uint256 completeSum;
    }
    struct Product {
        uint256 id;
        bytes32 name;
        bytes32 description;
        uint256 price;
        uint256 default_amount;
    }
    struct Receipt {
        InvoiceLine[] lines;
        address customer_address;
    }
    struct InvoiceLine {
        bytes product_id;
        uint256 amount;
        uint256 product_price;
        uint256 total_price;
    }
    function Store() {
        owner = msg.sender;

        if (this.balance > 0) throw;
    }
    function() payable {
    }
    function registerProduct(uint256 id, bytes32 name, bytes32 description, uint256 price, uint256 default_amount, uint256[] products_keys, Product[] products_values) onlyOwner returns (bool success) {
        var product = Product(id, name, description, price, default_amount);
        if (checkProductValidity(product)) {
    products_key_index = productsPosition(products_keys, id);
    if(products_key_index == products_keys.length) {
      products_keys = newArrayproductsKeys(products_keys, id);
      products_values = newArrayproductsValues(products_values);
    }

            products_values[products_key_index] = product;
            ProductRegistered(id);
    emit updateIpfsVariableproducts(products_keys[products_key_index], products_values[products_key_index]);
            return true;
        }
    uint products_key_index = 0;
        ProductRegistrationFailed(id);
    emit updateIpfsVariableproducts(products_keys[products_key_index], products_values[products_key_index]);
        return false;
    }
    function deregisterProduct(uint256 id, uint256[] products_keys, Product[] products_values) onlyOwner returns (bool success) {
    products_key_index = productsPosition(products_keys, id);
    if(products_key_index == products_keys.length) {
      products_keys = newArrayproductsKeys(products_keys, id);
      products_values = newArrayproductsValues(products_values);
    }

      Product memory product = products_values[products_key_index];
      if (product.id == id) {
    products_key_index = productsPosition(products_keys, id);
    if(products_key_index == products_keys.length) {
      products_keys = newArrayproductsKeys(products_keys, id);
      products_values = newArrayproductsValues(products_values);
    }

        delete products_values[products_key_index];
        ProductDeregistered(id);
    emit updateIpfsVariableproducts(products_keys[products_key_index], products_values[products_key_index]);
        return true;
      }
    uint products_key_index = 0;
      ProductDeregistrationFaled(id);
    emit updateIpfsVariableproducts(products_keys[products_key_index], products_values[products_key_index]);
      return false;
    }
    function registerCustomer(address _address, bytes32 _name, uint256 _balance, address[] customers_keys, Customer[] customers_values) onlyOwner returns (bool success) {
    uint customers_key_index = 0;
      if (_address != address(0)) {
        Customer memory customer = Customer({ adr: _address, name: _name, balance: _balance, cart: Cart(new uint256[](0), 0)});
    customers_key_index = customersPosition(customers_keys, _address);
    if(customers_key_index == customers_keys.length) {
      customers_keys = newArraycustomersKeys(customers_keys, _address);
      customers_values = newArraycustomersValues(customers_values);
    }

        customers_values[customers_key_index] = customer;
        CustomerRegistered(_address);
    emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);
        return true;
      }
      CustomerRegistrationFailed(_address);
    emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);
      return false;
    }
    function deregisterCustomer(address _address, address[] customers_keys, Customer[] customers_values) onlyOwner returns (bool success) {
    uint customers_key_index = 0;
    customers_key_index = customersPosition(customers_keys, _address);
    if(customers_key_index == customers_keys.length) {
      customers_keys = newArraycustomersKeys(customers_keys, _address);
      customers_values = newArraycustomersValues(customers_values);
    }

      Customer memory customer = customers_values[customers_key_index];
      if (customer.adr != address(0)) {
    customers_key_index = customersPosition(customers_keys, _address);
    if(customers_key_index == customers_keys.length) {
      customers_keys = newArraycustomersKeys(customers_keys, _address);
      customers_values = newArraycustomersValues(customers_values);
    }

        delete customers_values[customers_key_index];
        CustomerDeregistered(_address);
    emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);
        return true;
      }
      CustomerDeregistrationFailed(_address);
    emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);
      return false;
    }
    function insertProductIntoCart(uint256 id, address[] customers_keys, Customer[] customers_values, uint256[] products_keys, Product[] products_values) returns (bool success, uint256 pos_in_prod_mapping) {
    uint customers_key_index = 0;
    customers_key_index = customersPosition(customers_keys, msg.sender);
    if(customers_key_index == customers_keys.length) {
      customers_keys = newArraycustomersKeys(customers_keys, msg.sender);
      customers_values = newArraycustomersValues(customers_values);
    }

        Customer memory cust = customers_values[customers_key_index];
    products_key_index = productsPosition(products_keys, id);
    if(products_key_index == products_keys.length) {
      products_keys = newArrayproductsKeys(products_keys, id);
      products_values = newArrayproductsValues(products_values);
    }

        Product memory prod = products_values[products_key_index];
        uint256 prods_prev_len = cust.cart.products.length;
    uint products_key_index = 0;
        cust.cart.products = newArrayproductsid(cust.cart.products, prod.id);
        uint256 current_sum = cust.cart.completeSum;
        cust.cart.completeSum = safeAdd(current_sum, prod.price);
        if (cust.cart.products.length > prods_prev_len) {
          CartProductInserted(msg.sender, id, prod.price, cust.cart.completeSum);
    emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);
          return (true, cust.cart.products.length - 1);
        }
        CartProductInsertionFailed(msg.sender, id);
    emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);
        return (false, 0);
    }
    function removeProductFromCart(uint256 prod_pos_in_mapping, address[] customers_keys, Customer[] customers_values, uint256[] products_keys, Product[] products_values) {
    uint customers_key_index = 0;
    customers_key_index = customersPosition(customers_keys, msg.sender);
    if(customers_key_index == customers_keys.length) {
      customers_keys = newArraycustomersKeys(customers_keys, msg.sender);
      customers_values = newArraycustomersValues(customers_values);
    }

        uint256[] memory new_product_list = new uint256[](customers_values[customers_key_index].cart.products.length - 1);

        var customerProds = customers_values[customers_key_index].cart.products;
    uint products_key_index = 0;
        for (uint256 i = 0; i < customerProds.length; i++) {
          if (i != prod_pos_in_mapping) {
            new_product_list[i] = customerProds[i];
          } else {
    customers_key_index = customersPosition(customers_keys, msg.sender);
    if(customers_key_index == customers_keys.length) {
      customers_keys = newArraycustomersKeys(customers_keys, msg.sender);
      customers_values = newArraycustomersValues(customers_values);
    }

    products_key_index = productsPosition(products_keys, customerProds[i]);
    if(products_key_index == products_keys.length) {
      products_keys = newArrayproductsKeys(products_keys, customerProds[i]);
      products_values = newArrayproductsValues(products_values);
    }

            customers_values[customers_key_index].cart.completeSum -= products_values[products_key_index].price;
            CartProductRemoved(msg.sender, customerProds[i]);
          }
        }
    customers_key_index = customersPosition(customers_keys, msg.sender);
    if(customers_key_index == customers_keys.length) {
      customers_keys = newArraycustomersKeys(customers_keys, msg.sender);
      customers_values = newArraycustomersValues(customers_values);
    }

        customers_values[customers_key_index].cart.products = new_product_list;
    }
    function checkoutCart(uint256 store_balance, address[] customers_keys, Customer[] customers_values) returns (bool success) {
    uint customers_key_index = 0;
    customers_key_index = customersPosition(customers_keys, msg.sender);
    if(customers_key_index == customers_keys.length) {
      customers_keys = newArraycustomersKeys(customers_keys, msg.sender);
      customers_values = newArraycustomersValues(customers_values);
    }

        Customer memory customer = customers_values[customers_key_index];
    uint products_key_index = 0;
        uint256 paymentSum = customer.cart.completeSum;
        if ((customer.balance >= paymentSum) && customer.cart.products.length > 0) {
            customer.balance -= paymentSum;
            customer.cart = Cart(new uint256[](0), 0);
            store_balance += paymentSum;
            CartCheckoutCompleted(msg.sender, paymentSum);
            return true;
        }
        CartCheckoutFailed(msg.sender, customer.balance, paymentSum);
    emit updateIpfsVariablestore_balance(store_balance);
    emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);
        return false;
    }
    function emptyCart(address[] customers_keys, Customer[] customers_values) returns (bool success) {
      uint customers_key_index = 0;
    customers_key_index = customersPosition(customers_keys, msg.sender);
    if(customers_key_index == customers_keys.length) {
      customers_keys = newArraycustomersKeys(customers_keys, msg.sender);
      customers_values = newArraycustomersValues(customers_values);
    }

        Customer memory customer = customers_values[customers_key_index];
        customer.cart = Cart(new uint256[](0), 0);
        CartEmptied(customer.adr);
    emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);
        return true;
    }
    function renameStoreTo(bytes32 new_store_name, bytes32 store_name) onlyOwner returns (bool success) {
        if (new_store_name.length != 0 &&
            new_store_name.length <= 32) {
            store_name = new_store_name;
    emit updateIpfsVariablestore_name(store_name);
            return true;
        }
    emit updateIpfsVariablestore_name(store_name);
        return false;
    }
    function getProduct(uint256 id, uint256[] products_keys, Product[] products_values) constant returns (bytes32 name, bytes32 description, uint256 price, uint256 default_amount) {
      uint products_key_index = 0;
    products_key_index = productsPosition(products_keys, id);
    if(products_key_index == products_keys.length) {
      products_keys = newArrayproductsKeys(products_keys, id);
      products_values = newArrayproductsValues(products_values);
    }

    emit updateIpfsVariableproducts(products_keys[products_key_index], products_values[products_key_index]);
       return (products_values[products_key_index].name, products_values[products_key_index].description, products_values[products_key_index].price, products_values[products_key_index].default_amount);
    
    }
    function getCart(address[] customers_keys, Customer[] customers_values, uint256[] products_keys, Product[] products_values) constant returns (uint256[] memory product_ids, uint256 complete_sum) {
      uint customers_key_index = 0;
    customers_key_index = customersPosition(customers_keys, msg.sender);
    if(customers_key_index == customers_keys.length) {
      customers_keys = newArraycustomersKeys(customers_keys, msg.sender);
      customers_values = newArraycustomersValues(customers_values);
    }

      Customer memory customer = customers_values[customers_key_index];
    uint products_key_index = 0;
      uint256 len = customer.cart.products.length;
      uint256[] memory ids = new uint256[](len);
      for (uint256 i = 0; i < len; i++) {
    products_key_index = productsPosition(products_keys, i);
    if(products_key_index == products_keys.length) {
      products_keys = newArrayproductsKeys(products_keys, i);
      products_values = newArrayproductsValues(products_values);
    }

        ids[i] = products_values[products_key_index].id;
      }
    emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);
    emit updateIpfsVariableproducts(products_keys[products_key_index], products_values[products_key_index]);
      return (ids, customer.cart.completeSum);
    }
    function getBalance(address[] customers_keys, Customer[] customers_values) constant returns (uint256 _balance) {
    uint customers_key_index = 0;
    customers_key_index = customersPosition(customers_keys, msg.sender);
    if(customers_key_index == customers_keys.length) {
      customers_keys = newArraycustomersKeys(customers_keys, msg.sender);
      customers_values = newArraycustomersValues(customers_values);
    }

    emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);
      return customers_values[customers_key_index].balance;
    }
    function getStoreBalance(uint256 store_balance) onlyOwner constant returns (uint256) {
    emit updateIpfsVariablestore_balance(store_balance);
      return store_balance;
    }
    function checkProductValidity(Product product) private returns (bool valid) {
       return (product.price > 0);
    }
}
