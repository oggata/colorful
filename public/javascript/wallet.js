var web3;
var content;
var account = null;
var currentPage = getParam('page');

var token_contract;
//var material_contract;
//var player_contract;

var token_abi;
var material_abi;
var player_abi;

var junkallstars_erc721token_address = "";
//var junkallstars_materials_address = "";
//var junkallstars_player_contract_address = "";

//var rinkeby_junkallstars_materials_address = "0x1d20f60e57efa003a7c2cdbe4ca4660ad32e3a25";
var rinkeby_junkallstars_erc721token_address = "0x3d7a94657173d42d7007a0ebc19fa85b9d5813bc";
//var rinkeby_junkallstars_player_contract_address = "0x8021e85a12122a4e9982f274d9c90682a62b42a3";

//var mainnet_junkallstars_materials_address = "0x1d20f60e57efa003a7c2cdbe4ca4660ad32e3a25";
var mainnet_junkallstars_erc721token_address = "0x3d7a94657173d42d7007a0ebc19fa85b9d5813bc";
//var mainnet_junkallstars_player_contract_address = "0x8021e85a12122a4e9982f274d9c90682a62b42a3";

var cardcodes = [];

async function getAccount2() {
    var account = 0;
    if (window.ethereum) { // for modern DApps browser
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
        } catch (error) {
            console.error(error);
        }
    } else if (web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
    if (window.web3 !== 'undefined') {
        web3.eth.getAccounts((error, result) => {
            if (error) {
                console.log("error:");
                console.log(error);
            } else {
                console.log("result:");
                console.log(result);
                account = result;
            }
        });
    }
    return account;
}

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
$(document).ready(function () {
    if (!window.localStorage) {
        alert("お使いのブラウザはlocalstorageに対応してません。");
    }
    getAccount2();
    window.addEventListener('load', function () {
        if (typeof web3 !== 'undefined') {
            console.log('Web3：' + web3.currentProvider.constructor.name);
            //startApp();
        } else {
            console.log('MetaMaskをインストールして下さい');
        }
    })
    if (document.getElementById('param_charactor_id')) {
        var param_charactor_id = document.getElementById('param_charactor_id').value;
        //console.log(param_charactor_id);
    }
    //アドレスのETH量を取得
    function getBalance(_address) {
        web3.eth.getBalance(_address, (error, balance) => {
            if (error) return;
            console.log(JSON.stringify(balance, null, 2));
        });
    }

    function
    openFile(url) {
        const p = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            //xhr.addEventListener('load', (e) => resolve(xhr));
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        console.log("ok1");
                        resolve(xhr.responseText);
                    }
                }
            };
        });
        return p;
    }

    function hoge(array) {
        //console.log(array[0]);
        token_abi = JSON.parse(array[0]);
        //material_abi = JSON.parse(array[1]);
        //player_abi = JSON.parse(array[2]);
        var accountInterval = setInterval(function () {
            if (web3.eth.accounts[0] !== account) {
                account = web3.eth.accounts[0];
                init();
            }
        }, 100);
    }
    const promise = Promise.all(
        [
            openFile('/contracts/abi/token.abi?201907'),
            //openFile('/contracts/abi/material.abi?201907'),
            //openFile('/contracts/abi/player.abi?201907'),
        ]);
    promise.then(
        (xhrArray) => hoge(xhrArray));
});
var init = function () {
    const networkId = web3.version.network;
    if (networkId) {
        if (networkId == 1) {

        }
        if (networkId == 4) {
            junkallstars_erc721token_address = rinkeby_junkallstars_erc721token_address;
            //junkallstars_materials_address =  rinkeby_junkallstars_materials_address;
            //junkallstars_player_contract_address = rinkeby_junkallstars_player_contract_address;
        }
        if (networkId != 4) {
            if (networkId == 1) {
                alert("MainNetに接続されています.Rinkeby(TestNet)にのみサービス提供中です.");
            } else
            if (networkId == 3) {
                alert("Ropsten(TestNet)に接続されています.Rinkeby(TestNet)にのみサービス提供中です.");
            } else
            if (networkId == 42) {
                alert("Kovan(TestNet)に接続されています.Rinkeby(TestNet)にのみサービス提供中です.");
            } else {
                alert("Rinkeby(TestNet)にのみサービス提供中です.");
            }
            location.href = "http://" + location.hostname + ":" + location.port;
        }
    }
    if (document.getElementById("network")) {
        account = web3.eth.getAccounts();
        if (web3.currentProvider.isMetaMask) {
            document.getElementById("network").value = "MetaMask";
        } else if (web3.currentProvider.isTrust) {
            document.getElementById("network").value = "Trust";
        } else {
            document.getElementById("network").value = web3.currentProvider.host;
        }
    }
    //NetworkName
    if (document.getElementById("NetworkName")) {
        document.getElementById("NetworkName").value = "Rinkeby";
    }
    /////////////////////////
    //コントラクトの基本情報を取得
    token_contract = web3.eth.contract(token_abi).at(junkallstars_erc721token_address);
    //material_contract = web3.eth.contract(material_abi).at(junkallstars_materials_address);
    //player_contract = web3.eth.contract(player_abi).at(junkallstars_player_contract_address);

/*
    player_contract.getPlayerStatus(account, (error, result) => {
        if (document.getElementById("coin_amount")) {
            document.getElementById("coin_amount").value = result[0];
        }
        if (document.getElementById("total_coin_store_amount")) {
            document.getElementById("total_coin_store_amount").value = result[1];
        }
        if (document.getElementById("total_coin_amount_per_hour")) {
            document.getElementById("total_coin_amount_per_hour").value = result[2];
        }
        if (document.getElementById("last_coin_created_at")) {
            document.getElementById("last_coin_created_at").value = result[3];
        }
        if (document.getElementById("total_coin_amount")) {
            document.getElementById("total_coin_amount").value = result[4];
        }
    });
*/
        token_contract.totalSupply((error, result) => {
            if (document.getElementById("totalSupply")) {
                document.getElementById("totalSupply").value = result;
            }
        });
        token_contract.totalSupply((error, result) => {
            if (document.getElementById("totalSupply")) {
                document.getElementById("totalSupply").value = result;
            }
        });
    
    if (document.getElementById("wallet_address")) {
        document.getElementById("wallet_address").value = account;
    }
    web3.eth.getBalance(account, (error, balance) => {
        if (error) {
        } else {
            if (document.getElementById("wallet_balance")) {
                document.getElementById("wallet_balance").value = balance / 1000000000000000000;
            }
        }
    });

    var _owneddata = asyncGetCardData(account);
    _owneddata.then(function (result) {
        // Create the main TABLE elements
        var tbodyElement = document.createElement('tbody');
        var trElement = document.createElement('tr');
        var conditions = result
        if (currentPage == null) {
            currentPage = 1;
        }
        var elementsPerPage = 5;
        var elemetStartId = 1 + (currentPage - 1) * elementsPerPage;
        var elementFinishId = elemetStartId + elementsPerPage;
        var maxPageNum = Math.ceil(conditions.length / elementsPerPage);
        //console.log("maxPage:" + maxPageNum);
        var _maxloopCnt = elementFinishId;
        if (elementFinishId >= conditions.length) {
            _maxloopCnt = conditions.length;
        }
        //console.log(currentPage);
        var pagerhtml = '<ul class="pagination2">';
        pagerhtml += '<li class="pre"><a href="/list?page=1"><span>«</span></a></li>';
        if (currentPage >= 2) {
            pagerhtml += '<li><a href="/list?page=' + Math.ceil(Number(currentPage) - 1) + '"><span>' + Math.ceil(Number(currentPage) - 1) + '</span></a></li>';
        }
        pagerhtml += '<li><a href="/list?page=' + currentPage + '" class="active"><span>' + currentPage + '</span></a></li>';
        if (maxPageNum >= Math.ceil(Number(currentPage) + 1)) {
            pagerhtml += '<li><a href="/list?page=' + Math.ceil(Number(currentPage) + 1) + '"><span>' + Math.ceil(Number(currentPage) + 1) + '</span></a></li>';
        }
        pagerhtml += '<li class="next"><a href="/list?page=' + maxPageNum + '"><span>»</span></a></li>';
        pagerhtml += ' </ul>';
        var myh1 = document.getElementById("pager2");
        if (myh1) {
            myh1.innerHTML = pagerhtml;
        }
        for (var i = elemetStartId; i < _maxloopCnt; i++) {
            var con = conditions[i];
            // Create and set the TD elements
            var trElement = document.createElement('tr'),
                tdElement1 = document.createElement('td'),
                tdElement2 = document.createElement('td'),
                tdElement3 = document.createElement('td');
            tdElement4 = document.createElement('td');
            tdElement5 = document.createElement('td');
            tdElement6 = document.createElement('td');
            tdElement1.setAttribute('style', 'padding:13px 5px;border-bottom:1px solid #f0f0f0;'),
                tdElement2.setAttribute('style', 'padding:13px 5px;border-bottom:1px solid #f0f0f0;'),
                tdElement3.setAttribute('style', 'padding:13px 5px;border-bottom:1px solid #f0f0f0;');
            tdElement4.setAttribute('style', 'padding:13px 5px;border-bottom:1px solid #f0f0f0;');
            tdElement5.setAttribute('style', 'padding:1px 2px;border-bottom:1px solid #f0f0f0;');
            tdElement6.setAttribute('style', 'padding:13px 5px;border-bottom:1px solid #f0f0f0;');

            var _tokenId = con[0];
            var _code = con[2];
            var _ctype = con[3];
            var _createdAt = con[6];
            var _imageUrl = "/images/opensea/" + _ctype + ".png";
            if (i == 0) {
                tdElement1.innerHTML = '<div class="rsample"><img src="' + _imageUrl + '" width="200px"><span>new</span></div>'
            } else {
                tdElement1.innerHTML = '<img src="' + _imageUrl + '" width="200px">';
            }
            tdElement2.innerHTML = con[1]; //name
            tdElement3.innerHTML = timeConverter(_createdAt); //typeId
            tdElement4.innerHTML = "";
            //tdElement4.innerHTML = _mintCnt + "/" + _maxMintNum;
            //console.log(timeConverter(_createdAt));
            tdElement5.innerHTML = _code; //generation
            tdElement6.innerHTML = '<a class="button button-neutral"  target="_blank" href="https://rinkeby.opensea.io/assets/' + junkallstars_erc721token_address + "/" + _tokenId + '?force_update=true' + "" + '">OPENSEA</a>';
            tbodyElement.appendChild(trElement);
            tbodyElement.appendChild(tdElement1);
            tbodyElement.appendChild(tdElement2);
            tbodyElement.appendChild(tdElement3);
            tbodyElement.appendChild(tdElement4);
            tbodyElement.appendChild(tdElement5);
            tbodyElement.appendChild(tdElement6);
        }
        if (document.getElementById("problems-details-table")) {
            document.getElementById("problems-details-table").appendChild(tbodyElement);
            //ローディング画面を隠す
            jQuery('#loader-bg').hide();
        }
    });
}
var getCardData = function (_tokenId) {
    return new Promise(function (resolve, reject) {
        token_contract.getCardData(_tokenId, (error, result) => {
            resolve(result);
        });
    })
}
/////////////////////////
var getowneddata = async function (account) {
    var ownedCardIds = [];
    return new Promise(function (fulfilled, rejected) {
        token_contract = web3.eth.contract(token_abi).at(junkallstars_erc721token_address);
        token_contract.tokensOf(account, (error, ids) => {
            for (let i = 0; i < ids.length; i++) {
                ownedCardIds.push(ids[i]);
            };
            //worksに同時に取得した関数を詰めておく.
            var workers = [];
            token_contract = web3.eth.contract(token_abi).at(junkallstars_erc721token_address);
            for (let i = 0; i < ownedCardIds.length; i++) {
                var _tokenId = ownedCardIds[i]["c"][0];
                workers.push(getCardData(_tokenId));
            };
            return Promise.all(workers).then(res => {
                fulfilled(res);
            }).catch(err => {
                rejected(err);
            });
        });
    })
};
var asyncGetCardData = async function (account) {
    var _ownedCard = await getowneddata(account);
    return _ownedCard.reverse();
}

function OnButtonClick() {
    /*
    uintArray[0] = _seqId;
    uintArray[1] = cards[_seqId].price;
    uintArray[2] = cards[_seqId].code;
    uintArray[3] = cards[_seqId].ctype;
    uintArray[4] = cards[_seqId].exp;
    uintArray[5] = cards[_seqId].cooldownFinishTime;
    uintArray[6] = cards[_seqId].isSold;
    uintArray[7] = cards[_seqId].createdAt;
    uintArray[8] = cards[_seqId].updatedAt;
    uintArray[9] = cards[_seqId].blocknum;
    uintArray[10] = cards[_seqId].timestamp;
    */
    //alert("hello1");

    /*
    var cardData = asyncGetCardData(account);
    cardData.then(function (result) {
        var cards = result;    
        for( var i=0; i<cards.length; i++) {
          cardcodes.push(cards[i][2]);
        }
        console.log(cardcodes);
    });



function SendGiftToAddress() {
    var gift_address = document.getElementById("gift_address").value;
    //alert(gift_address);
    if (web3.isAddress(gift_address) == false) {
        alert("アドレスの形式が不正です.");
        return;
    }
    contract.sendCardFree(1, gift_address, {
        value: web3.toWei(0, "wei")
    }, (error, txid) => {});
}
msg_contract
    */
    alert("hello1");

    msg_contract.setMessage('ogt1',{
        value: web3.toWei(0, "wei")
    }, (error, txid) => {});

}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

/*
function mint(account) {
    material_contract.approveAndCall("0x78be343476ccad513067d218f6697c63b9d12ef4", 100, "0x00", {
        value: web3.toWei(0, "wei")
    }, (error, txid) => {});
}
*/

function sendAllCoinToWallet() {
    token_contract.sendAllCoinToWallet({
        value: web3.toWei(0, "wei")
    }, (error, txid) => {});
}