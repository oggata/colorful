var httpProvider = "https://rinkeby.infura.io/";
var contractAddress = "0x3d7a94657173d42d7007a0ebc19fa85b9d5813bc";
var etherScanURL = "https://rinkeby.etherscan.io/tx/";

const fs = require('fs');
const EthereumTx = require('ethereumjs-tx');
var abi = JSON.parse(fs.readFileSync('./contracts/abi/token.abi', "utf8"));

var Web3 = require('web3');
//console.log(web3.currentProvider);
var web3;
//自分のアカウントとひもづく情報を取得する
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/dbffb59cd462432aaa7997abedf8d6b7"));
}

var ColorfulContract = function () {
    this.abi = JSON.parse(fs.readFileSync('./contracts/abi/token.abi', "utf8"));
    this.address_from = null;
    this.address_from_pk = null;
    this.mnemonic = null;
    this.getProvider = function () {
        return web3.currentProvider.host;
    }
    this.getTokenContractInstance = function () {
        return new web3.eth.Contract(abi, contractAddress);
    };
    var Tx = require('ethereumjs-tx');
    this.getCardData = async function (id) {

        return new Promise((resolve, reject) => {
            const contract = new web3.eth.Contract(abi,contractAddress);
            //contract.methods.getRobotName(id).call().then((result) => {
                contract.methods.getCardData(id).call().then((result2) => {
                    console.log(result2);
                    var _data = [];
                    //_data.push(result);
                    for(i=0;i<=result2.length;i++){
                        _data.push(result2[i]);
                    }
                    resolve(_data);
                });
            //});
        });
    };
};
module.exports = ColorfulContract;

