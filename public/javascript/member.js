var web3;
var content;
var account = null;
var wa = "-----";
var pk = "-----";
var etherAmount = 0;
function removeWalletData() {
    localStorage.removeItem('storage_wallet_address');
    localStorage.removeItem('storage_wallet_pk');
}
function showPK() {
    alert(pk);
}
function test() {
    alert("test");
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/contract/send_mint_to_address?address=" + wa + "&pk=" + pk, true);
        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var json = JSON.parse(xhr.responseText);
              console.log(json);
              console.log(json.transactionHash);
              alert(json.transactionHash);
            } else {
              console.error(xhr.statusText);
            }
          }
        };
        xhr.onerror = function (e) {
          console.error(xhr.statusText);
        };
        xhr.send(null); 

}
$(document).ready(function () {
    if (!window.localStorage) {
        alert("localStorage is not available on your browser");
    }
    init();
});
var init = function () {

    var _data = localStorage.getItem("zombieStorage");
    console.log(_data);

    var strWalletAddress = localStorage.getItem('storage_wallet_address');
    var strWalletPk = localStorage.getItem('storage_wallet_pk');
    if (strWalletAddress) {
        wa = strWalletAddress;
        pk = strWalletPk;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/wallet/check_balance_by_address?address=" + wa, true);
        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var json = JSON.parse(xhr.responseText);
              console.log(json);
              etherAmount = json.balance;
            } else {
              console.error(xhr.statusText);
            }
          }
        };
        xhr.onerror = function (e) {
          console.error(xhr.statusText);
        };
        xhr.send(null); 
    }else{
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/wallet/create_wallet", true);
        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var json = JSON.parse(xhr.responseText);
              console.log(json);
              wa = json.address;
                pk = json.privatekey.toString("hex");
                localStorage.setItem('storage_wallet_address', wa);
                localStorage.setItem('storage_wallet_pk', pk);
            } else {
              console.error(xhr.statusText);
            }
          }
        };
        xhr.onerror = function (e) {
          console.error(xhr.statusText);
        };
        xhr.send(null); 
    }
    if (document.getElementById("NetworkName")) {
        document.getElementById("NetworkName").value = "Rinkeby";
    }
    if (document.getElementById("address")) {
        document.getElementById("address").value = wa;
    }

    if (document.getElementById("pk")) {
        document.getElementById("pk").value = pk;
    }

    if (document.getElementById("wallet_balance")) {
        document.getElementById("wallet_balance").value = etherAmount;
    }
}
