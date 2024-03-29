var web3;
var content;
var account = null;
var currentPage = getParam('page') || 1;

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
    init();
});

var init = function () {
    var tbodyElement = document.createElement('tbody');
    var trElement = document.createElement('tr');
    var request = new XMLHttpRequest();
    var strWalletAddress = localStorage.getItem('storage_wallet_address');
    var strWalletPk = localStorage.getItem('storage_wallet_pk');
    if(!strWalletAddress){
        //redirect
        alert("please create your address");
    }
    request.open('GET', "/contract/get_owned_list?address=" + strWalletAddress, true);
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

        if(res["list"].length == 0){
            alert("You don't have items");
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