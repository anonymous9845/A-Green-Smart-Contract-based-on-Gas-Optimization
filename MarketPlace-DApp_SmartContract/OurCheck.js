var MarketPlace = artifacts.require("./MarketPlace.sol");
const Web3 = require('web3');

contract("Contract", async(accounts) => {
    var market;
    var owner = accounts[0];
    var seller = accounts[1];
    var buyer = accounts[2];
    var articleName1 = "article 1";
    var articleDescription1 = "Description for article 1";
    var articlePrice1 = 10;
    var articleName2 = "article 2";
    var articleDescription2 = "Description for article 2";
    var articlePrice2 = 20;
    var watcher;
    var sellerBalanceBeforeBuy, sellerBalanceAfterBuy;
    var buyerBalanceBeforeBuy, buyerBalanceAfterBuy;

    before(async function() {
        // set contract instance into a variable
        market = await MarketPlace.new({from:owner});
        // market = MarketPlace.deployed();
    })

    it("sellArticle", async function() {
        var keys = [];
        var values = [];
        var articleCounter = 0;

        var result = await market.sellArticle(articleName1, articleDescription1, articlePrice1, keys, values, articleCounter, {from: seller});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 35,820
        console.log("sellArticle : " + gas);
    })
    
    it("buyArticle", async function() {

        var articleId = 1;
        var keys = [];
        var values = [];
        var articleCounter = 1;

        var result = await market.buyArticle(articleId, keys, values, articleCounter, {from: buyer, value: articlePrice1});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 41,186
        console.log("buyArticle : " + gas);
    })

});