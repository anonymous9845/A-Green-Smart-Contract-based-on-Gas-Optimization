var Store = artifacts.require("./Store.sol");
const Web3 = require('web3');

contract("Contract", async(accounts) => {
    var store;
    var owner = accounts[0];

    // 각 테스트가 진행되기 전에 실행됩니다.
    // before(async function() {
    //     // set contract instance into a variable
    //     var param2 = web3.utils.asciiToHex("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    //     store = await Store.new(param2, 1, {from:owner});
    // })

    before(async function() {
        store = await Store.new({from:owner});
        // defaultOwner = address(this);
        // dummy = address(0x00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDEADBEEF);
        // customerAddress = address(0x00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFAA);

    })

    // it("registerProduct", async function() {
    //     var code = "function registerProduct(uint256 id, bytes32 name, bytes32 description, uint256 price, uint256 default_amount, uint256[] products_keys, Product[] products_values) onlyOwner returns (bool success) {var product = Product(id, name, description, price, default_amount);if (checkProductValidity(product)) {products_key_index = productsPosition(products_keys, id);if(products_key_index == products_keys.length) {products_keys = newArrayproductsKeys(products_keys, id);products_values = newArrayproductsValues(products_values);}products_values[products_key_index] = product;ProductRegistered(id);emit updateIpfsVariableproducts(products_keys[products_key_index], products_values[products_key_index]);return true;}uint products_key_index = 0;ProductRegistrationFailed(id);emit updateIpfsVariableproducts(products_keys[products_key_index], products_values[products_key_index]);return false;}";
    //     var result = await store.executeFunction(code, {from: owner});
    //     var {receipt} = result;
    //     var gas = JSON.stringify(receipt.gasUsed);

    //     // 36,453
    //     console.log("registerProduct : " + gas);
    // })

    // it("deregisterProduct", async function() {
    //     var code = "function deregisterProduct(uint256 id, uint256[] products_keys, Product[] products_values) onlyOwner returns (bool success) {products_key_index = productsPosition(products_keys, id);if(products_key_index == products_keys.length) {products_keys = newArrayproductsKeys(products_keys, id);products_values = newArrayproductsValues(products_values);}Product product = products_values[products_key_index];if (product.id == id) {products_key_index = productsPosition(products_keys, id);if(products_key_index == products_keys.length) {products_keys = newArrayproductsKeys(products_keys, id);products_values = newArrayproductsValues(products_values);}delete products_values[products_key_index];ProductDeregistered(id);emit updateIpfsVariableproducts(products_keys[products_key_index], products_values[products_key_index]);return true;}uint products_key_index = 0;ProductDeregistrationFaled(id);emit updateIpfsVariableproducts(products_keys[products_key_index], products_values[products_key_index]);return false;}";
    //     var result = await store.executeFunction(code, {from: owner});
    //     var {receipt} = result;
    //     var gas = JSON.stringify(receipt.gasUsed);

    //     // 38,441
    //     console.log("testDeregisterProduct : " + gas);
    // })
    
    // it("registerCustomer", async function() {
    //     var code = "function registerCustomer(address _address, bytes32 _name, uint256 _balance, address[] customers_keys, Customer[] customers_values) onlyOwner returns (bool success) {uint customers_key_index = 0;if (_address != address(0)) {Customer memory customer = Customer({ adr: _address, name: _name, balance: _balance, cart: Cart(new uint256[](0), 0)});customers_key_index = customersPosition(customers_keys, _address);if(customers_key_index == customers_keys.length) {customers_keys = newArraycustomersKeys(customers_keys, _address);customers_values = newArraycustomersValues(customers_values);}customers_values[customers_key_index] = customer;CustomerRegistered(_address);emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);return true;}CustomerRegistrationFailed(_address);emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);return false;}";
    //     var result = await store.executeFunction(code, {from: owner});
    //     var {receipt} = result;
    //     var gas = JSON.stringify(receipt.gasUsed);

    //     // 37,489
    //     console.log("testRegisterCustomer : " + gas);
    // })

    // it("deregisterCustomer", async function() {

    //     var code = "function deregisterCustomer(address _address, address[] customers_keys, Customer[] customers_values) onlyOwner returns (bool success) {uint customers_key_index = 0;customers_key_index = customersPosition(customers_keys, _address);if(customers_key_index == customers_keys.length) {customers_keys = newArraycustomersKeys(customers_keys, _address);customers_values = newArraycustomersValues(customers_values);}Customer customer = customers_values[customers_key_index];if (customer.adr != address(0)) {customers_key_index = customersPosition(customers_keys, _address);if(customers_key_index == customers_keys.length) {customers_keys = newArraycustomersKeys(customers_keys, _address);customers_values = newArraycustomersValues(customers_values);}delete customers_values[customers_key_index];CustomerDeregistered(_address);emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);return true;}CustomerDeregistrationFailed(_address);emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);return false;}";
    //     var result = await store.executeFunction(code, {from: owner});
    //     var {receipt} = result;
    //     var gas = JSON.stringify(receipt.gasUsed);

    //     // 40,020
    //     console.log("testRegisterCustomer : " + gas);
    // })

    it("insertProductIntoCart", async function() {

        var code = "function insertProductIntoCart(uint256 id, address[] customers_keys, Customer[] customers_values, uint256[] products_keys, Product[] products_values) returns (bool success, uint256 pos_in_prod_mapping) {uint customers_key_index = 0;customers_key_index = customersPosition(customers_keys, msg.sender);if(customers_key_index == customers_keys.length) {customers_keys = newArraycustomersKeys(customers_keys, msg.sender);customers_values = newArraycustomersValues(customers_values);}Customer cust = customers_values[customers_key_index];products_key_index = productsPosition(products_keys, id);if(products_key_index == products_keys.length) {products_keys = newArrayproductsKeys(products_keys, id);products_values = newArrayproductsValues(products_values);}Product prod = products_values[products_key_index];uint256 prods_prev_len = cust.cart.products.length;uint products_key_index = 0;cust.cart.products.push(prod.id);uint256 current_sum = cust.cart.completeSum;cust.cart.completeSum = safeAdd(current_sum, prod.price);if (cust.cart.products.length > prods_prev_len) {CartProductInserted(msg.sender, id, prod.price, cust.cart.completeSum);emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);return (true, cust.cart.products.length - 1);}CartProductInsertionFailed(msg.sender, id);emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);return (false, 0);}";
        var result = await store.executeFunction(code, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 45,840
        console.log("insertProductIntoCart : " + gas);
    })

    it("removeProductFromCart", async function() {

        var code = "function removeProductFromCart(uint256 prod_pos_in_mapping, address[] customers_keys, Customer[] customers_values, uint256[] products_keys, Product[] products_values) {uint customers_key_index = 0;customers_key_index = customersPosition(customers_keys, msg.sender);if(customers_key_index == customers_keys.length) {customers_keys = newArraycustomersKeys(customers_keys, msg.sender);customers_values = newArraycustomersValues(customers_values);}uint256[] memory new_product_list = new uint256[](customers_values[customers_key_index].cart.products.length - 1);var customerProds = customers_values[customers_key_index].cart.products;uint products_key_index = 0;for (uint256 i = 0; i < customerProds.length; i++) {if (i != prod_pos_in_mapping) {new_product_list[i] = customerProds[i];} else {customers_key_index = customersPosition(customers_keys, msg.sender);if(customers_key_index == customers_keys.length) {customers_keys = newArraycustomersKeys(customers_keys, msg.sender);customers_values = newArraycustomersValues(customers_values);}products_key_index = productsPosition(products_keys, customerProds[i);if(products_key_index == products_keys.length) {products_keys = newArrayproductsKeys(products_keys, customerProds[i);products_values = newArrayproductsValues(products_values);}customers_values[customers_key_index].cart.completeSum -= products_values[products_key_index]].price;CartProductRemoved(msg.sender, customerProds[i]);}}customers_key_index = customersPosition(customers_keys, msg.sender);if(customers_key_index == customers_keys.length) {customers_keys = newArraycustomersKeys(customers_keys, msg.sender);customers_values = newArraycustomersValues(customers_values);}customers_values[customers_key_index].cart.products = new_product_list;}";
        var result = await store.executeFunction(code, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 50,516
        console.log("removeProductFromCart : " + gas);
    })

    it("checkoutCart", async function() {

        var code = "function checkoutCart(uint256 store_balance, address[] customers_keys, Customer[] customers_values) returns (bool success) {uint customers_key_index = 0;customers_key_index = customersPosition(customers_keys, msg.sender);if(customers_key_index == customers_keys.length) {customers_keys = newArraycustomersKeys(customers_keys, msg.sender);customers_values = newArraycustomersValues(customers_values);}Customer customer = customers_values[customers_key_index];uint products_key_index = 0;uint256 paymentSum = customer.cart.completeSum;if ((customer.balance >= paymentSum) && customer.cart.products.length > 0) {customer.balance -= paymentSum;customer.cart = Cart(new uint256[](0), 0);store_balance += paymentSum;CartCheckoutCompleted(msg.sender, paymentSum);return true;}CartCheckoutFailed(msg.sender, customer.balance, paymentSum);emit updateIpfsVariablestore_balance(store_balance);emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);return false;}";
        var result = await store.executeFunction(code, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 38,465
        console.log("checkoutCart : " + gas);
    })
    
    it("emptyCart", async function() {

        var code = "function emptyCart(address[] customers_keys, Customer[] customers_values) returns (bool success) {customers_key_index = customersPosition(customers_keys, msg.sender);if(customers_key_index == customers_keys.length) {customers_keys = newArraycustomersKeys(customers_keys, msg.sender); customers_values = newArraycustomersValues(customers_values);}Customer customer = customers_values[customers_key_index];customer.cart = Cart(new uint256[](0), 0); CartEmptied(customer.adr);emit updateIpfsVariablecustomers(customers_keys[customers_key_index], customers_values[customers_key_index]);return true;}";
        var result = await store.executeFunction(code, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        //31,802
        console.log("checkoutCart : " + gas);
    })

    it("renameStoreTo", async function() {

        var code = "function renameStoreTo(bytes32 new_store_name, bytes32 store_name) onlyOwner returns (bool success) {if (new_store_name.length != 0 &&new_store_name.length <= 32) {store_name = new_store_name;emit updateIpfsVariablestore_name(store_name);return true;}emit updateIpfsVariablestore_name(store_name);eturn false;}";
        var result = await store.executeFunction(code, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 27,175
        console.log("renameStoreTo : " + gas);
    })
});


// struct Product {
//     uint256 id;
//     bytes32 name;
//     bytes32 description;
//     uint256 price;
//     uint256 default_amount;
// }



    // it("status check", async function() {
    //     // var param1 = ethers.utils.formatBytes32String("aaaa");
    //     var param0 = web3.utils.asciiToHex("hello1");
    //     var param1 = web3.utils.asciiToHex("hello2");
    //     var param2 = web3.utils.asciiToHex("hello3");
    //     var param3 = web3.utils.asciiToHex("hello4");
    //     var param4 = web3.utils.asciiToHex("hello5");
    //     var param6 = web3.utils.asciiToHex("hello6");
    //     var param7 = web3.utils.asciiToHex("hello7");
    //     var param8 = web3.utils.asciiToHex("hello8");
    //     var param9 = web3.utils.asciiToHex("hello9");
    //     var param10 = web3.utils.asciiToHex("hello10");
    //     var param11 = web3.utils.asciiToHex("hello11");
    //     var param12 = web3.utils.asciiToHex("hello12");
    //     // uint256 id, address[] customers_keys, Customer[] customers_values, uint256[] products_keys, Product[] products_values
    //     var a = [1,2,3,4,5];
    //     // struct Customer {
    //     //     address adr;
    //     //     bytes32 name;
    //     //     uint256 balance;
    //     //     Cart cart;
    //     // }
    //     // struct Cart {
    //     //     uint256[] products;
    //     //     uint256 completeSum;
    //     //   }
    //     // struct Product {
    //     //     uint256 id;
    //     //     bytes32 name;
    //     //     bytes32 description;
    //     //     uint256 price;
    //     //     uint256 default_amount;
    //     // }
    //     var cKeys = [1,2,3,4];
    //     var cValues = [{"0x00000000219ab540356cBB839Cbe05303d7705Fa", "abcdjksnakcjamsldkjandksjaldkss", 500, {[23, 45], 22}}, {"0x00000000219ab540356cBB839Cbe05303d7705Fa", "abcdjksnakcjamsldkjandksjaldkss", 500, {[23, 45], 22}}];
    //     var r = await store.insertProductIntoCart(2, {from: owner});
    //     console.log(JSON.stringify(r));
    //     // const { logs } = r;
    //     // console.log(logs);
    //     // const log = logs[0];
    //     // console.log("currentStatus:" + log.args.num);
    // });