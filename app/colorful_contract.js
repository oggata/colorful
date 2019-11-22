var contractAddress = "0x17229bc4436a933c54c4031a0552bf361af5c669";
var etherScanURL = "https://rinkeby.etherscan.io/tx/";

const fs = require('fs');
const EthereumTx = require('ethereumjs-tx');
var abi = JSON.parse(fs.readFileSync('./contracts/abi/token.abi', "utf8"));

var Web3 = require('web3');
const { fromInjected, fromConnection } = require('@openzeppelin/network');
var web3;

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

    this.sendMintToAddress = async(address,pk) => {
        const injected = await fromConnection('wss://rinkeby.infura.io/ws/v3/95202223388e49f48b423ea50a70e336', { 
            gsn: { 
                signKey: pk 
            } 
        });
        const instance = new injected.lib.eth.Contract(this.abi, contractAddress);
        const tx = await instance.methods.mintToAddress(address).send({
            from: address
        });
        return tx;
    };

    this.getBaseTokenURI = async function (id) {
        return new Promise((resolve, reject) => {
            const contract = new web3.eth.Contract(abi,contractAddress);
                contract.methods.baseTokenURI().call().then((result) => {
                    console.log(result);
                    resolve(result);
                });
        });
    };

    this.getTotalSupply = async function (id) {
        return new Promise((resolve, reject) => {
            const contract = new web3.eth.Contract(abi,contractAddress);
                contract.methods.totalSupply().call().then((result) => {
                    console.log(result);
                    resolve(result);
                });
        });
    };

    this.getTokensOf = async function (address) {
        return new Promise((resolve, reject) => {
            const contract = new web3.eth.Contract(abi,contractAddress);
                contract.methods.tokensOf(address).call().then((result) => {
                    console.log(result);
                    resolve(result);
                });
        });
    };

    this.getCardData1 = async function (id) {
        return new Promise((resolve, reject) => {
            const contract = new web3.eth.Contract(abi,contractAddress);
                contract.methods.getCardData(id).call().then((result) => {
                    console.log(result);
                    resolve(result);
                });
        });
    };

    this.getCardData = async function (id) {
        return new Promise((resolve, reject) => {
            const contract = new web3.eth.Contract(abi,contractAddress);
            contract.methods.getCardData(id).call().then((result2) => {
                console.log(result2);
                var _data = [];
                //_data.push(result);
                for(i=0;i<=result2.length;i++){
                    _data.push(result2[i]);
                }
                resolve(_data);
            });
        });
    };

};
module.exports = ColorfulContract;

