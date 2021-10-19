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

    it("registerProduct", async function() {

        var content = "";
        var result = await store.injector(content);
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 31,427
        console.log("registerProduct : " + gas);
    })

    it("registerProduct", async function() {
        var param1 = web3.utils.fromAscii("default test product");
        var param2 = web3.utils.fromAscii("default description");

        var products_keys = [];
        var products_values = [];

        var result = await store.registerProduct(0, param1, param2, 50, 1, products_keys, products_values);
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 31,427
        console.log("registerProduct : " + gas);
    })

    it("deregisterProduct", async function() {
        var expected = true;
        var products_keys = [];
        var products_values = [];

        var result = await store.deregisterProduct(99, products_keys, products_values);

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 32,981
        console.log("testDeregisterProduct : " + gas);
    })
    
    it("registerCustomer", async function() {
        var customer = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
        var customer_keys = [];
        var customer_values = [];
        var param1 = web3.utils.fromAscii("Harris");
        var result = await store.registerCustomer(customer, param1, 100, customer_keys, customer_values);

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 32,250
        console.log("testRegisterCustomer : " + gas);
    })

    it("deregisterCustomer", async function() {

        var expected = true;
        var customer_keys = [];
        var customer_values = [];
        var customer = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
        var result = await store.deregisterCustomer(customer, customer_keys, customer_values);

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 35,588
        console.log("testRegisterCustomer : " + gas);
    })

    it("insertProductIntoCart", async function() {

        var customer = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
        var param1 = web3.utils.fromAscii("DummyCustomer1");
        var customer_keys = [];
        var customer_values = [];
        var products_keys = [];
        var products_values = [];
        var result = await store.registerCustomer(customer, param1, 100, customer_keys, customer_values);

        result = await store.insertProductIntoCart(55, customer_keys, customer_values, products_keys, products_values);

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 38,122
        console.log("insertProductIntoCart : " + gas);
    })

    it("removeProductFromCart", async function() {

        var customer = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
        var param1 = web3.utils.fromAscii("DummyCustomer1");
        var customer_keys = [];
        var customer_values = [];
        var products_keys = [];
        var products_values = [];
        var result = await store.registerCustomer(customer, param1, 100, customer_keys, customer_values);

        result = await store.insertProductIntoCart(55, customer_keys, customer_values, products_keys, products_values);
        result = await store.removeProductFromCart(0, customer_keys, customer_values, products_keys, products_values);

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // OOG: no loop-optimization
        23,706
        console.log("removeProductFromCart : " + gas);
    })

    it("checkoutCart", async function() {

        var customer = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
        var param1 = web3.utils.fromAscii("DummyCustomer1");
        var customer_keys = [];
        var customer_values = [];
        var products_keys = [];
        var products_values = [];
        var store_balance = 100;
        var result = await store.registerCustomer(customer, param1, 100, customer_keys, customer_values);

        result = await store.insertProductIntoCart(55, customer_keys, customer_values, products_keys, products_values);
        result = await store.checkoutCart(store_balance, customer_keys, customer_values);

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 31,943
        console.log("checkoutCart : " + gas);
    })
    
    it("emptyCart", async function() {

        var customer = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
        var param1 = web3.utils.fromAscii("DummyCustomer1");
        var customer_keys = [];
        var customer_values = [];
        var products_keys = [];
        var products_values = [];
        var store_balance = 100;
        var result = await store.registerCustomer(customer, param1, 100, customer_keys, customer_values);

        result = await store.insertProductIntoCart(55, customer_keys, customer_values, products_keys, products_values);
        result = await store.emptyCart(customer_keys, customer_values);

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 30,157
        console.log("checkoutCart : " + gas);
    })

    it("renameStoreTo", async function() {

        var param1 = web3.utils.fromAscii("myTestStore");
        var result = await store.renameStoreTo(param1, param1);

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 24,515
        console.log("renameStoreTo : " + gas);
    })
});