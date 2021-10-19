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
        var code = "function sellArticle(string _name, string _description, uint256 _price, uint[] articles_keys, Article[] articles_values, uint articleCounter) public {uint articles_key_index = 0;articleCounter++;articles_key_index = articlesPosition(articles_keys, articleCounter);if(articles_key_index == articles_keys.length) {articles_keys = newArrayarticlesKeys(articles_keys, articleCounter);articles_values = newArrayarticlesValues(articles_values);}emit updateIpfsVariablearticles(articles_keys[articles_key_index], articles_values[articles_key_index]);articles_values[articles_key_index] = Article(articleCounter,msg.sender, 0x0, _name, _description, _price);sellArticleEvent(articleCounter, msg.sender, _name, _price);emit updateIpfsVariablearticleCounter(articleCounter);}";
        var result = await market.executeFunction(code, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 34,512
        console.log("sellArticle : " + gas);
    })
    
    it("buyArticle", async function() {

        var code = "function buyArticle(uint _id, uint[] articles_keys, Article[] articles_values, uint articleCounter) payable public {uint articles_key_index = 0;require(articleCounter > 0);require(_id > 0 && _id <= articleCounter);articles_key_index = articlesPosition(articles_keys, _id);if(articles_key_index == articles_keys.length) {articles_keys = newArrayarticlesKeys(articles_keys, _id);articles_values = newArrayarticlesValues(articles_values);}Article memory article = articles_values[articles_key_index];require(article.buyer == 0x0);require(article.seller != msg.sender);require(article.price == msg.value);article.buyer = msg.sender;article.seller.transfer(msg.value);buyArticleEvent(_id, article.seller, article.buyer, article.name, article.price);emit updateIpfsVariablearticleCounter(articleCounter);emit updateIpfsVariablearticles(articles_keys[articles_key_index], articles_values[articles_key_index]);}";
        var result = await market.executeFunction(code, {from: owner});
        var {receipt} = result;
        var gas = JSON.stringify(receipt.gasUsed);

        // 36,839
        console.log("buyArticle : " + gas);
    })
});