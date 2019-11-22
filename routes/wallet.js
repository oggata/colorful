var ethers = require('ethers');
let provider = ethers.getDefaultProvider('ropsten');
const {
    distanceInWordsToNow
} = require('date-fns');
var etherString;
var current_wallet;
var wallet;
const Wallet = ethers.Wallet;
const utils = ethers.utils;
const providers = ethers.providers;
const etherscanProvider = new ethers.providers.EtherscanProvider();
exports.importPK = async function (req, res) {
    var privateKey = req.param('pk')
    wallet = new ethers.Wallet(privateKey, provider);
    console.log(wallet);
    var _json = ''
    _json += '{';
    _json += '"status": "ok",';
    _json += '"pubkey": "' + wallet.signingKey.publicKey + '",';
    _json += '"address": "' + wallet.address + '",';
    _json += '"mnemonic": "' + wallet.mnemonic + '",';
    _json += '"privatekey": "' + wallet.privateKey + '"';
    _json += '}';
    res.json(JSON.parse(_json));
}
exports.createWallet = async function (req, res) {
    wallet = ethers.Wallet.createRandom();
    var _json = ''
    _json += '{';
    _json += '"status": "ok",';
    _json += '"pubkey": "' + wallet.signingKey.publicKey + '",';
    _json += '"address": "' + wallet.address + '",';
    _json += '"mnemonic": "' + wallet.mnemonic + '",';
    _json += '"privatekey": "' + wallet.privateKey + '"';
    _json += '}';
    res.json(JSON.parse(_json));
}
exports.checkBalanceByAddress = async function (req, res) {
    var ext_address = req.param('address');
    try {
        let balance = await provider.getBalance(ext_address);
        etherString = ethers.utils.formatEther(balance);
        console.log("Balance: " + etherString);
        var _json = ''
        _json += '{';
        _json += '"status": "ok",';
        _json += '"address": "' + ext_address + '",';
        _json += '"balance": "' + etherString + '"';
        _json += '}';
        res.json(JSON.parse(_json));
    } catch (err) {
        console.log("error", err);
        var _json = ''
        _json += '{';
        _json += '"status": "error",';
        _json += '"address": "' + ext_address + '"';
        _json += '}';
        res.json(JSON.parse(_json));
    }
}
exports.checkBalance = async function (req, res) {
    try {
        let balance = await provider.getBalance(wallet.address);
        etherString = ethers.utils.formatEther(balance);
        console.log("Balance: " + etherString);
        var _json = ''
        _json += '{';
        _json += '"status": "ok",';
        _json += '"address": "' + wallet.address + '"';
        _json += '"balance": "' + etherString + '"';
        _json += '}';
        res.json(JSON.parse(_json));
    } catch (err) {
        console.log("error", err);
        var _json = ''
        _json += '{';
        _json += '"status": "error",';
        _json += '"address": "' + wallet.address + '"';
        _json += '}';
        res.json(JSON.parse(_json));
    }
}
exports.getHistoryByAddress = async function (req, res) {
    var ext_address = req.param('address');
    let gasPrice = await provider.getGasPrice();
    console.log(gasPrice);
    try {
        const address = '0x28899653C0951D29635A4a123b8A43Eb15744f64';
        let history = await etherscanProvider.getHistory(address);
        let historyList = await history.reverse().map(tx => {
            let value = utils.formatEther(tx.value);
            let to = tx.to;
            let from = tx.from;
            let hash = tx.hash;
            //let time =  distanceInWordsToNow(new Date(tx.timestamp * 1000));
            return {
                value,
                to,
                from,
                hash
            };
        });
        console.log(historyList);
        var _json = ''
        _json += '{';
        _json += '"status": "ok",';
        _json += '"address": "' + ext_address + '"';
        _json += '}';
        res.json(JSON.parse(_json));
    } catch (err) {
        console.log("error", err);
        var _json = ''
        _json += '{';
        _json += '"status": "error",';
        _json += '"address": "' + ext_address + '"';
        _json += '}';
        res.json(JSON.parse(_json));
    }
}
exports.send = async function (req, res) {
    /*
try {
        console.log(wallet);
        let tx = {
            to: req.query['receiver'],
            value: ethers.utils.parseEther(req.query['ether'])
        }
        let sendPromise = await wallet.sendTransaction(tx);;
        console.log(sendPromise);
    } 
    catch(err) {
        console.log("error", err);
    }
    res.send("Success");
    */
    //wallet = ethers.Wallet.createRandom();
    //console.log(wallet.signingKey.publicKey);
    //res.send({pubkey: wallet.signingKey.publicKey, address: wallet.address,});
    var _json = ''
    _json += '{';
    _json += '}';
    res.json(JSON.parse(_json));
}