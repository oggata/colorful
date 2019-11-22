var app = module.parent.exports;
var passport = app.get("passport");
var crypto = require("crypto");
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream('debug.log', {
    flags: 'w'
});
var log_stdout = process.stdout;
console.log = function (d) {
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};
app.get('/play', function (req, res) {
    res.render('play', {
        title: 'play'
    });
});
app.get('/list', function (req, res) {
    res.render('list', {
        title: 'list'
    });
});

var colorful = require('./colorful.js');
app.get('/opensea/tokens/:id', colorful.get_opensea_format_data);
//http://localhost:3000/wallet/create_wallet
//http://localhost:3000/wallet/check_balance_by_address?address=0x28899653C0951D29635A4a123b8A43Eb15744f64
//http://localhost:3000/wallet/get_history_by_address?address=0x28899653C0951D29635A4a123b8A43Eb15744f64

var wallet = require('./wallet.js');
app.get('/wallet/import_pk', wallet.importPK);
app.get('/wallet/create_wallet', wallet.createWallet);
app.get('/wallet/check_balance_by_address', wallet.checkBalanceByAddress);
app.get('/wallet/check_balance', wallet.checkBalance);
app.get('/wallet/get_history_by_address', wallet.getHistoryByAddress);

app.get('/contract/get_base_token_uri', colorful.get_base_token_uri);
app.get('/contract/get_total_supply', colorful.get_total_supply);
app.get('/contract/get_owned_list', colorful.get_owned_list);
app.get('/contract/get_card_data', colorful.get_card_data);
app.get('/contract/send_mint_to_address', colorful.send_mint_to_address);

