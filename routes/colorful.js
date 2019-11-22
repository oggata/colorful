var ethers = require('ethers');
let provider = ethers.getDefaultProvider('ropsten');
var etherString;
var current_wallet;
var wallet;
var Hashids = require("hashids");
var ColorfulContract = require('../app/colorful_contract.js');

exports.send_mint_to_address = async function (req, res) {
    const _address = "0x6303b56db2d46fb34EE996E8f3Db58793e7d97dE";
    const _pk = "0x5259e42293d55a7431cac40bc02297cc2ad952e02981ab4d5dadd7577787f1e5";
    var address = req.param('address') || _address;
    var privatekey = req.param('pk') || _pk;
    var cc = new ColorfulContract();
    var tx = await cc.sendMintToAddress(address,privatekey);
    var _json = ''
    _json += '{';
    _json += '"blockHash": "' + tx.blockHash + '",';
    _json += '"contractAddress": "' + tx.contractAddress + '",';
    _json += '"cumulativeGasUsed": "' + tx.cumulativeGasUsed + '",';
    _json += '"from": "' + tx.from + '",';
    _json += '"gasUsed": "' + tx.gasUsed + '",';
    _json += '"status": "' + tx.status + '",';
    _json += '"to": "' + tx.to + '",';
    _json += '"transactionHash": "' + tx.transactionHash + '",';
    _json += '"transactionIndex": "' + tx.transactionIndex + '"';
    _json += '}';
    res.json(JSON.parse(_json));
}

exports.get_base_token_uri = async function (req, res) {
    var cc = new ColorfulContract();
    var _uri = await cc.getBaseTokenURI();
    var _json = ''
    _json += '{';
    _json += '"uri": "' + _uri + '"';
    _json += '}';
    res.json(JSON.parse(_json));
}

exports.get_total_supply = async function (req, res) {
    var cc = new ColorfulContract();
    var _totalSupply = await cc.getTotalSupply();
    var _json = ''
    _json += '{';
    _json += '"uri": "' + _totalSupply + '"';
    _json += '}';
    res.json(JSON.parse(_json));
}

exports.get_owned_list = async function (req, res) {
    var currentPage = req.param('page') || 1;
    var address = req.param('address') || "0x6303b56db2d46fb34EE996E8f3Db58793e7d97dE";
    var cc = new ColorfulContract();
    var tokens = await cc.getTokensOf(address);
    var array = [];
    for(var i=0;i<tokens.length;i++){
        console.log(tokens[i]);
        var card = await cc.getCardData1(tokens[i]);
        console.log(card);
        array.push(card);
    }
    var elementsPerPage = req.param('element_per_page') || 5;
    var elemetStartId = 1 + (currentPage - 1) * elementsPerPage;
    var elementFinishId = elemetStartId + elementsPerPage;
    var maxPageNum = Math.ceil(tokens.length / elementsPerPage);
    var itemCount = tokens.length;
    var endPageNumber = Math.ceil(itemCount / elementsPerPage);
    var _maxloopCnt = elementFinishId;
    if (elementFinishId >= tokens.length) {
        _maxloopCnt = tokens.length;
    }
    var _json = ''
    _json += '{';
    _json += '"currentPage": "' + currentPage + '",';
    _json += '"itemCount": "' + itemCount + '",';
    _json += '"elementsPerPage": "' + elementsPerPage + '",';
    _json += '"endPageNumber": "' + endPageNumber + '",';
    _json += '"elemetStartId": "' + elemetStartId + '",';
    _json += '"elementFinishId": "' + elementFinishId + '",';
    _json += '"list": [';
    //for(var j=0;j<array.length;j++){
    for (var j = elemetStartId; j < _maxloopCnt; j++) {
        _json += '{';
        _json += '"id": "' + array[j][0] + '",';
        _json += '"price": "' + array[j][1] + '",';
        _json += '"code": "' + array[j][2] + '",';
        _json += '"ctype": "' + array[j][3] + '",';
        _json += '"exp": "' + array[j][4] + '",';
        _json += '"cooldownFinishTime": "' + array[j][5] + '",';
        _json += '"createdAt": "' + array[j][6] + '"';
        _json += '}';
        /*
        if(j != array.length - 1){
            _json += ',';
        }
        */
        if(j != _maxloopCnt - 1){
            _json += ',';
        }
    }
    _json += ']';
    _json += '}';
    res.json(JSON.parse(_json));
}

exports.get_card_data = async function (req, res) {
    var tokenId = req.param('id') || 1;
    var cc = new ColorfulContract();
    var card = await cc.getCardData1(tokenId);
    var id = card[0];
    var price = card[1];
    var code = card[2];
    var ctype = card[3];
    var exp = card[4];
    var cooldownFinishTime = card[5];
    var createdAt = card[6];
    var strCode = "" + code + "";
    var hashids = new Hashids("colors");
    var name = hashids.encode(strCode.slice(5));
    var param1 = strCode.slice(9);
    var param2 = strCode.slice(9);
    var param3 = strCode.slice(9);
    var param4 = strCode.slice(9);
    var param5 = strCode.slice(9);

    var _json = '';
    _json += '{';
    _json += '"id": "' + id + '",';
    _json += '"price": "' + price + '",';
    _json += '"code": "' + code + '",';
    _json += '"ctype": "' + ctype + '",';
    _json += '"exp": "' + exp + '",';
    _json += '"cooldownFinishTime": "' + cooldownFinishTime + '",';
    _json += '"createdAt": "' + createdAt + '",';
    _json += '"name": "' + name + '",';
    _json += '"param1": "' + param1 + '",';
    _json += '"param2": "' + param2 + '",';
    _json += '"param3": "' + param3 + '",';
    _json += '"param4": "' + param4 + '",';
    _json += '"param5": "' + param5 + '"';
    _json += '}';
    res.json(JSON.parse(_json));
}

exports.get_opensea_format_data = async function (req, res) {
    var cc = new ColorfulContract();
    var card = await cc.getCardData(req.param('id'));
    var id = card[0];
    var price = card[1];
    var code = card[2];
    var ctype = card[3];
    var exp = card[4];
    var cooldownFinishTime = card[5];
    var createdAt = card[6];
    var strCode = "" + code + "";
    var hashids = new Hashids("colors");
    var name = hashids.encode(strCode.slice(5));
    var param1 = strCode.slice(9);
    var param2 = strCode.slice(9);
    var param3 = strCode.slice(9);
    var param4 = strCode.slice(9);
    var param5 = strCode.slice(9);

    var _json = ''
    _json += '{';
    _json += '"name": "' + name + '",';
    _json += '"image": "https://oggata-colorful.glitch.me/images/opensea/' + ctype + '.png",';
    _json += '"background_color": "ffffff",';
    _json += '"symbol": "COR",';
    _json += '"description": "find new",';
    _json += '"external_url": "https://oggata-colorful.glitch.me/' + id + '",';
    _json += '"wiki_link": "https://opensea.readme.io/page/cryptokitties",';
    _json += '"attributes": [';
    _json += '    {';
    _json += '      "trait_type": "code", ';
    _json += '      "value": "' + code + '"';
    _json += '    }, ';
    _json += '    {';
    _json += '      "trait_type": "ctype", ';
    _json += '      "value": "' + ctype + '"';
    _json += '    }, ';
    _json += '    {';
    _json += '      "trait_type": "exp", ';
    _json += '      "value": "' + exp + '"';
    _json += '    }, ';
    _json += '    {';
    _json += '      "trait_type": "param1", ';
    _json += '      "value": "' + param1 + '"';
    _json += '    }, ';
    _json += '    {';
    _json += '      "trait_type": "param2", ';
    _json += '      "value": "' + param2 + '"';
    _json += '    }, ';
    _json += '    {';
    _json += '      "trait_type": "param3", ';
    _json += '      "value": "' + param3 + '"';
    _json += '    }, ';
    _json += '    {';
    _json += '      "trait_type": "param4", ';
    _json += '      "value": "' + param4 + '"';
    _json += '    }, ';
    _json += '    {';
    _json += '      "trait_type": "param5", ';
    _json += '      "value": "' + param5 + '"';
    _json += '    }, ';
    _json += '    {';
    _json += '      "trait_type": "created_at", ';
    _json += '      "value": "' + createdAt + '"';
    _json += '    } ';
    _json += ']';
    _json += '}';
    res.json(JSON.parse(_json));
};
