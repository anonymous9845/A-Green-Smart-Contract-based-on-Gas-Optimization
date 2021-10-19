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
        var param1 = web3.utils.fromAscii("default test product");
        var param2 = web3.utils.fromAscii("default description");
        var result = await store.registerProduct(0, param1, param2, 50, 1);
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 105,997
        // Gasol: 105,997
        console.log("registerProduct : " + gas);
    })

    it("deregisterProduct", async function() {
        var expected = true;
        var result = await store.deregisterProduct(99);

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 24,362
        // Gasol: 24,362
        console.log("testDeregisterProduct : " + gas);
    })
    
    it("registerCustomer", async function() {
        var customer = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
        var param1 = web3.utils.fromAscii("Harris");
        var result = await store.registerCustomer(customer, param1, 100);

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 88,362
        // Gasol: 88,362
        console.log("testRegisterCustomer : " + gas);
    })

    it("deregisterCustomer", async function() {

        var expected = true;
        var customer = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
        var result = await store.deregisterCustomer(customer);

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 21,743
        // Gasol: 21,743
        console.log("testRegisterCustomer : " + gas);
    })

    it("insertProductIntoCart", async function() {

        var customer = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
        var param1 = web3.utils.fromAscii("DummyCustomer1");
        var result = await store.registerCustomer(customer, param1, 100);

        result = await store.insertProductIntoCart(55);

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 53,002
        // Gasol: 53,002
        console.log("insertProductIntoCart : " + gas);
    })

    it("removeProductFromCart", async function() {

        var customer = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
        var param1 = web3.utils.fromAscii("DummyCustomer1");
        var result = await store.registerCustomer(customer, param1, 100);

        result = await store.insertProductIntoCart(55);
        result = await store.removeProductFromCart(0);

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 23,706
        // Gasol: 23,706
        console.log("removeProductFromCart : " + gas);
    })

    it("checkoutCart", async function() {

        var customer = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
        var param1 = web3.utils.fromAscii("DummyCustomer1");
        var result = await store.registerCustomer(customer, param1, 100);

        result = await store.insertProductIntoCart(55);
        result = await store.checkoutCart();

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 21,537
        // Gasol: 21,537
        console.log("checkoutCart : " + gas);
    })
    
    it("emptyCart", async function() {

        var customer = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
        var param1 = web3.utils.fromAscii("DummyCustomer1");
        var result = await store.registerCustomer(customer, param1, 100);

        result = await store.insertProductIntoCart(55);
        result = await store.emptyCart();

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 16,407
        // Gasol: 16,407
        console.log("checkoutCart : " + gas);
    })

    it("renameStoreTo", async function() {

        var param1 = web3.utils.fromAscii("myTestStore");
        var result = await store.renameStoreTo(param1);

        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 27,791
        // Gasol: 27,791
        console.log("renameStoreTo : " + gas);
    })
});