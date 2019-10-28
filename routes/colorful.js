
var Hashids = require("hashids");

var JunkallstarsContract = require('../app/junkallstars_contract.js');

exports.get_bot_json_data = async function (req, res) {
    var wm = new JunkallstarsContract();
    var _data = await wm.getCardData(req.param('id'));
    var _seqId = _data[0];
    var _price =  _data[1];
    var _code = _data[2];
    var _ctype = _data[3];
    var _exp = _data[4];
    var _cooldownFinishTime = _data[5];
    var _createdAt = _data[7];
    var _updatedAt = _data[8];
    var _blocknum = _data[9];
    var _timestamp = _data[10];

    var _strCode = "" + _code + "";
    var _cid = 1;
    if(0 <= _seqId &&_seqId < 99999){
        _cid = _strCode.slice(0,2);
    }
    var _num1 = _strCode.slice(9);
    var _keyNum = "key__" + _num1;

    var hashids = new Hashids("junkbot");
    var _name = hashids.encode(_strCode.slice(5));
    //806749883200

    var _json = ''
    _json += '{';
    _json += '"name": "' + _name + '",';
    _json += '"image": "https://oggata-colorful.glitch.me/images/opensea/001.png",';
    _json += '"background_color": "ffffff",';
    _json += '"symbol": "JAT",';
    _json += '"description": "find new",';
    _json += '"external_url": "http://junkallstars.com/token/' + _seqId + '",';
    _json += '"wiki_link": "https://opensea.readme.io/page/cryptokitties",';
    _json += '"attributes": [';
    _json += '    {';
    _json += '      "trait_type": "cid", ';
    _json += '      "value": "' + _cid + '"';
    _json += '    }, ';
    _json += '    {';
    _json += '      "trait_type": "code", ';
    _json += '      "value": "' + _code + '"';
    _json += '    }, ';
    _json += '    {';
    _json += '      "trait_type": "ctype", ';
    _json += '      "value": "' + _ctype + '"';
    _json += '    }, ';
    _json += '    {';
    _json += '      "trait_type": "exp", ';
    _json += '      "value": "' + _exp + '"';
    _json += '    }, ';
    _json += '    {';
    _json += '      "trait_type": "keyNum", ';
    _json += '      "value": "' + _num1 + '"';
    _json += '    }, ';
    _json += '    {';
    _json += '      "trait_type": "created_at", ';
    _json += '      "value": "' + _createdAt + '"';
    _json += '    } ';
    _json += ']';
    _json += '}';
    res.json(JSON.parse(_json));
};
