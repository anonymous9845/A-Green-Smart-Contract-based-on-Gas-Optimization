pragma solidity ^0.4.11;
pragma experimental ABIEncoderV2;
import "./Owned.sol";
contract MarketPlace is Owned {

    string public rootHash;

   function newArrayarticlesKeys(uint[] memory keys, uint value) private returns (uint[]) {
    uint[] memory arr = new uint[](keys.length+1);
    for(uint i=0; i<keys.length; i++) arr[i] = keys[i];

    arr[arr.length-1] = value; 

    return arr;
  }

  function newArrayarticlesValues(Article[] memory values) private returns (Article[]) {
    Article[] memory arr = new Article[](values.length+1);
    for(uint i=0; i<values.length; i++) arr[i] = values[i];

    return arr;
  }

  function articlesPosition(uint[] keys, uint key) private returns(uint) {
      for(uint i=0; i<keys.length; i++) if(keys[i] == key) return i; return keys.length;
  }

  event updateIpfsVariablearticleCounter(uint value);

  event updateIpfsVariablearticles(uint key, Article value);

    function setHash(string _rootHash) public {
        rootHash = _rootHash;
    }

    function getHash() public view returns (string) {
        return rootHash;
    }

  struct Article {
    uint id;
    address seller;
    address buyer;
    string name;
    string description;
    uint256 price;
  }
  event sellArticleEvent(
    uint indexed _id,
    address indexed _seller,
    string _name,
    uint256 _price);
  event buyArticleEvent(
    uint indexed _id,
    address indexed _seller,
    address indexed _buyer,
    string _name,
    uint256 _price);
  function sellArticle(string _name, string _description, uint256 _price, uint[] articles_keys, Article[] articles_values, uint articleCounter) public {
    uint articles_key_index = 0;
    articleCounter++;
    articles_key_index = articlesPosition(articles_keys, articleCounter);
    if(articles_key_index == articles_keys.length) {
      articles_keys = newArrayarticlesKeys(articles_keys, articleCounter);
      articles_values = newArrayarticlesValues(articles_values);
    }

    emit updateIpfsVariablearticles(articles_keys[articles_key_index], articles_values[articles_key_index]);
    articles_values[articles_key_index] = Article(articleCounter,msg.sender, 0x0, _name, _description, _price);
    sellArticleEvent(articleCounter, msg.sender, _name, _price);
    emit updateIpfsVariablearticleCounter(articleCounter);
  }
  function getNumberOfArticles(uint articleCounter) public constant returns (uint) {
    emit updateIpfsVariablearticleCounter(articleCounter);
    return articleCounter;
  }
  function getArticlesForSale(uint[] articles_keys, Article[] articles_values, uint articleCounter) public constant returns (uint[]) {
    uint articles_key_index = 0;
    if(articleCounter == 0) {
      emit updateIpfsVariablearticles(articles_keys[articles_key_index], articles_values[articles_key_index]);
      emit updateIpfsVariablearticleCounter(articleCounter);
      return new uint[](0);
    }
    uint[] memory articleIds = new uint[](articleCounter);
    uint numberOfArticlesForSale = 0;
    for (uint i = 1; i <= articleCounter; i++) {
    articles_key_index = articlesPosition(articles_keys, i);
    if(articles_key_index == articles_keys.length) {
      articles_keys = newArrayarticlesKeys(articles_keys, i);
      articles_values = newArrayarticlesValues(articles_values);
    }

      if (articles_values[articles_key_index].buyer == 0x0) {
    articles_key_index = articlesPosition(articles_keys, i);
    if(articles_key_index == articles_keys.length) {
      articles_keys = newArrayarticlesKeys(articles_keys, i);
      articles_values = newArrayarticlesValues(articles_values);
    }

        articleIds[numberOfArticlesForSale] = articles_values[articles_key_index].id;
        numberOfArticlesForSale++;
      }
    }
    uint[] memory forSale = new uint[](numberOfArticlesForSale);
    for (uint j = 0; j < numberOfArticlesForSale; j++) {
      forSale[j] = articleIds[j];
    }
    emit updateIpfsVariablearticles(articles_keys[articles_key_index], articles_values[articles_key_index]);
    emit updateIpfsVariablearticleCounter(articleCounter);
    return (forSale);
  }
  function buyArticle(uint _id, uint[] articles_keys, Article[] articles_values, uint articleCounter) payable public {
    uint articles_key_index = 0;
    // require(articleCounter > 0);
    // require(_id > 0 && _id <= articleCounter);
    articles_key_index = articlesPosition(articles_keys, _id);
    if(articles_key_index == articles_keys.length) {
      articles_keys = newArrayarticlesKeys(articles_keys, _id);
      articles_values = newArrayarticlesValues(articles_values);
    }

    Article memory article = articles_values[articles_key_index];
    // require(article.buyer == 0x0);
    // require(article.seller != msg.sender);
    // require(article.price == msg.value);
    article.buyer = msg.sender;
    article.seller.transfer(msg.value);
    buyArticleEvent(_id, article.seller, article.buyer, article.name, article.price);
    emit updateIpfsVariablearticleCounter(articleCounter);
    emit updateIpfsVariablearticles(articles_keys[articles_key_index], articles_values[articles_key_index]);
  }
  function kill() onlyOwner {
    selfdestruct(owner);
  }
}
