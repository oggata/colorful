var web3;
var content;
var account = null;
var currentPage = getParam('page') || 1;
async function getAccount() {
    var account = 0;
    if (window.ethereum) {
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
        alert("localStorage is not available on your browser");
    }
    getAccount();
    window.addEventListener('load', function () {
        if (typeof web3 !== 'undefined') {
            console.log('Web3：' + web3.currentProvider.constructor.name);
        } else {
            console.log('please install MetaMask');
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

    function openFile(url) {
        const p = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
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
    var accountInterval = setInterval(function () {
        if (web3.eth.accounts[0] !== account) {
            account = web3.eth.accounts[0];
            init();
        }
    }, 3000);
    /*
        function hoge(array) {
            token_abi = JSON.parse(array[0]);
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
            ]);
        promise.then(
            (xhrArray) => hoge(xhrArray));
            */
});
var init = function () {
    const networkId = web3.version.network;
    if (networkId) {
        if (networkId == 4) {}
        if (networkId != 4) {
            if (networkId == 1) {
                alert("Mainnet is not availabe. please connect Rinkeby. ");
            } else
            if (networkId == 3) {
                alert("Ropsten is not availabe. please connect Rinkeby. ");
            } else
            if (networkId == 42) {
                alert("Kovan is not availabe. please connect Rinkeby. ");
            } else {
                alert("This network is not availabe. please connect Rinkeby.");
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
    if (document.getElementById("wallet_address")) {
        document.getElementById("wallet_address").value = account;
    }
    web3.eth.getBalance(account, (error, balance) => {
        if (error) {} else {
            if (document.getElementById("wallet_balance")) {
                document.getElementById("wallet_balance").value = balance / 1000000000000000000;
            }
        }
    });
    //list
    var tbodyElement = document.createElement('tbody');
    var trElement = document.createElement('tr');
    var request = new XMLHttpRequest();
    request.open('GET', "/contract/get_owned_list", true);
    request.responseType = 'json';
    request.onload = function () {
        var res = this.response;
        var endPageNumber = res["endPageNumber"];
        var pagerhtml = '<ul class="pagination2">';
        pagerhtml += '<li class="pre"><a href="/list?page=1"><span>«</span></a></li>';
        if (currentPage >= 2) {
            pagerhtml += '<li><a href="/list?page=' + Math.ceil(Number(currentPage) - 1) + '"><span>' + Math.ceil(Number(currentPage) - 1) + '</span></a></li>';
        }
        pagerhtml += '<li><a href="/list?page=' + currentPage + '" class="active"><span>' + currentPage + '</span></a></li>';
        if (endPageNumber >= Math.ceil(Number(currentPage) + 1)) {
            pagerhtml += '<li><a href="/list?page=' + Math.ceil(Number(currentPage) + 1) + '"><span>' + Math.ceil(Number(currentPage) + 1) + '</span></a></li>';
        }
        pagerhtml += '<li class="next"><a href="/list?page=' + endPageNumber + '"><span>»</span></a></li>';
        pagerhtml += ' </ul>';
        var myh1 = document.getElementById("pager2");
        if (myh1) {
            myh1.innerHTML = pagerhtml;
        }
        for (var i = 0; i < res["list"].length; i++) {
            var data = res["list"];
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
            var _tokenId = data[0];
            var _code = data[2];
            var _ctype = data[3];
            var _createdAt = data[0];
            var _imageUrl = "/images/opensea/" + _ctype + ".png";
            if (i == 0) {
                tdElement1.innerHTML = '<div class="rsample"><img src="' + _imageUrl + '" width="200px"><span>new</span></div>'
            } else {
                tdElement1.innerHTML = '<img src="' + _imageUrl + '" width="200px">';
            }
            tdElement2.innerHTML = data[1]; //name
            tdElement3.innerHTML = ""; //typeId
            tdElement4.innerHTML = "";
            tdElement5.innerHTML = _code; //generation
            tdElement6.innerHTML = '<a class="button button-neutral"  target="_blank" href="https://rinkeby.opensea.io/assets/' + "aaaa" + "/" + _tokenId + '?force_update=true' + "" + '">OPENSEA</a>';
            tbodyElement.appendChild(trElement);
            tbodyElement.appendChild(tdElement1);
            tbodyElement.appendChild(tdElement2);
            tbodyElement.appendChild(tdElement3);
            tbodyElement.appendChild(tdElement4);
            tbodyElement.appendChild(tdElement5);
            tbodyElement.appendChild(tdElement6);
        }
        if (document.getElementById("problems-details-table")) {
            console.log("add element");
            document.getElementById("problems-details-table").appendChild(tbodyElement);
            jQuery('#loader-bg').hide();
        }
    };
    request.send();
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