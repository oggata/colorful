(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


//const fs = require('fs');
//const EthereumTx = require('ethereumjs-tx');
//var abi = JSON.parse(fs.readFileSync('./contracts/abi/planet.abi', "utf8"));

var abi = [
{
"constant": true,
"inputs": [],
"name": "word",
"outputs": [
  {
    "name": "",
    "type": "string"
  }
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": false,
    "name": "sender",
    "type": "address"
  },
  {
    "indexed": false,
    "name": "newWord",
    "type": "string"
  }
],
"name": "Set",
"type": "event"
},
{
"constant": true,
"inputs": [],
"name": "get",
"outputs": [
  {
    "name": "",
    "type": "string"
  }
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [
  {
    "name": "newWord",
    "type": "string"
  }
],
"name": "set",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
}
];
var address = "0x974f865f903d0adbffe957ce8ae5bf34941604fd"; // コントラクトアドレス
var web3Local;



window.addEventListener('load', function() {


       

    });


window.onload = function() {
var contract = web3.eth.contract(abi).at(address);
contract.get((error, result) => {
document.getElementById("contract_result").value = result;
});

//web3Local = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8575"));
web3Local = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/75Bs6R09NFuc68BYBWWU "));
var eventContract = web3Local.eth.contract(abi).at(address);
eventContract.Set((error, data) => {
console.log("event callback.");
document.getElementById("contract_result").value = data.args.newWord;
});

document.getElementById("button_set").onclick = () => {
console.log("xxx");
let time = Math.floor(new Date().getTime() / 1000);
console.log(time);
contract.set("BBB" + time, (error, txid) => {
  console.log(txid);
});
};









// Load WEB3
console.log(">>>>1");
        // Check wether it's already injected by something else (like Metamask or Parity Chrome plugin)
        if(typeof web3 !== 'undefined') {
console.log(">>>>2");
console.log(web3.currentProvider);
            web3 = new Web3(web3.currentProvider);  
            //web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/75Bs6R09NFuc68BYBWWU "));

        // Or connect to a node
        } else {
console.log(">>>>3");
            web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/75Bs6R09NFuc68BYBWWU "));
        }

        // Check the connection
        if(!web3.isConnected()) {
console.log(">>>>4");
            console.error("Not connected");
        }
console.log(">>>>5");


        var hoge = web3.eth.getAccounts();
console.log(hoge);
//var hoge2 = web3.eth.getBalance(hoge);
//console.log(hoge2);

        var account = null;
console.log(account);
console.log(account);

//var account = web3.eth.getAccounts();



        var accountInterval = setInterval(function() {

//console.log(web3.eth.accounts[0] + "-" + account);
//console.log(account);



          if (web3.eth.accounts[0] !== account) {

console.log(web3.eth.accounts[0] + "-" + account);

            account = web3.eth.accounts[0];
            document.getElementById("wallet_address").value= account;
console.log("bb");

              new Promise((resolve, reject) => {
                          web3.eth.getBalance(account, (error, result) => {
                              if (error) {
                                  console.log(error);
                                  reject(error)
                              } else {
                                  console.log(result);
                                  resolve(result)
                                  document.getElementById("wallet_balance").value = result;
                              }
                          })
              });



          }
        }, 100);

};
},{}]},{},[1]);
