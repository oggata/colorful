var planetid = document.getElementById('param_planetid').getAttribute('planetid');
console.log("MMMMM");
console.log(planetid);
console.log("MMMMM");
var abi;
var address; // コントラクトアドレス
var web3;
var contract;
var content;
$(document).ready(function () {
    var _planetId = planetid;
    console.log(_planetId);
    var xmlHttp = new XMLHttpRequest();
    console.log("1>");
    xmlHttp.open("get", "/contracts/abi/token.abi?20180810");
    console.log("2>");
    console.log(xmlHttp.responseText);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                abi = JSON.parse(xmlHttp.responseText);
                if (typeof Web3 == "undefined") {
                    alert("ゲームを始める場合は、MetaMaskまたはTrustなどのEthereumのWalltアプリから開いてください.");
                    location.href = "http://" + location.hostname + ":" + location.port;
                }
                if (localStorage.getItem('txiud')) {
                    if (document.getElementById("txid")) {
                        document.getElementById("txid").value = localStorage.getItem('txiud');
                    }
                }
                /////////////////////////
                //アカウントが切り替わった時に備えて、定期的に更新する
                var account = null;
                var accountInterval = setInterval(function () {
                    if (web3.eth.accounts[0] !== account) {
                        account = web3.eth.accounts[0];
                        if (document.getElementById("network")) {
                            if (web3.currentProvider.isMetaMask) {
                                console.log(web3.currentProvider);
                                document.getElementById("network").value = "MetaMask";
                            } else if (web3.currentProvider.isTrust) {
                                document.getElementById("network").value = "Trust";
                            } else {
                                document.getElementById("network").value = web3.currentProvider.host;
                            }
                        }
                        const networkId = web3.version.network;
                        console.log("networkId:" + networkId);
                        if (networkId) {
                            if (networkId == 1) {
                                //address = "0x1080b0f884fbfb5032ece5333116afa66b77db9c" // (本番用)
                            }
                            if (networkId == 4) {
                                address = "0x78be343476ccad513067d218f6697c63b9d12ef4" // (Rinkeby用)
                                //alert("現在Test用のネットワークに接続されています.mainnetに接続しなおしてください.");
                            }
                        }
                        /////////////////////////
                        //コントラクトの基本情報を取得
                        contract = web3.eth.contract(abi).at(address);
                        if (document.getElementById("wallet_address")) {
                            document.getElementById("wallet_address").value = account;
                        }
                        /*
                        contract.getVersion((error, version) => {
                            console.log(version);
                            if (document.getElementById("version")) {
                                console.log(version);
                                document.getElementById("version").value = version;
                            }
                        });
                        */
                        /*
                        //ownerOf
                        contract.ownerOf(_planetId, (error, result) => {
                            if (document.getElementById("owner")) {
                                document.getElementById("owner").value = result;
                            }
                        });
                        //name
                        contract.getPlanetName(_planetId, (error, result) => {
                            if (document.getElementById("planet_name")) {
                                document.getElementById("planet_name").value = result;
                            }
                        });
                        */
                        //getPlanet
                        contract.getJunkbotData(_planetId, (error, planet) => {
                            console.log(planet);
                            /*
                            if (document.getElementById("planet_name")) {
                                document.getElementById("planet_name").value = planet[1];
                            }
                            */
                            if (document.getElementById("typeName")) {
                                document.getElementById("typeName").value = planet[2];
                            }
                            var _planetId = planet[0]["c"][0];
                            var _planetImageNumber = planet[3]["c"][0];
                            var _imageUrl = "/images/planets/notfound.png";
                            if (_planetImageNumber) {
                                //var _imageId = _planetImageNumber % 10;
                                _imageUrl = "/images/planets/planet_img_001.png";
                                //_imageUrl = ""
                            }
                            //var elem = document.getElementById("planet_image");
                            //elem.src = _imageUrl;
                            //setPlanetImage(_imageUrl);
                            //alert(_imageUrl);
                            /*
                            setPlanetImage(_imageUrl);
                            if (document.getElementById("rarity")) {
                                var _stars = "☆☆☆☆☆☆☆";
                                if (planet[4]["c"][0] == 1) {
                                    _stars = "★☆☆☆☆☆☆";
                                }
                                if (planet[4]["c"][0] == 2) {
                                    _stars = "★★☆☆☆☆☆";
                                }
                                if (planet[4]["c"][0] == 3) {
                                    _stars = "★★★☆☆☆☆";
                                }
                                if (planet[4]["c"][0] == 4) {
                                    _stars = "★★★★☆☆☆";
                                }
                                if (planet[4]["c"][0] == 5) {
                                    _stars = "★★★★★☆☆";
                                }
                                if (planet[4]["c"][0] == 6) {
                                    _stars = "★★★★★★☆";
                                }
                                if (planet[4]["c"][0] == 7) {
                                    _stars = "★★★★★★★";
                                }
                                document.getElementById("rarity").value = _stars;
                            }
                            if (document.getElementById("createdAt")) {
                                console.log(planet[6]["c"][0]);
                                var date = new Date(planet[6]["c"][0] * 1000);
                                var hours = date.getHours();
                                var minutes = "0" + date.getMinutes();
                                var seconds = "0" + date.getSeconds();
                                var formattedTime = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '' + ':' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                                document.getElementById("createdAt").value = formattedTime;
                            }
                            */
                        });
                        /*
                        //getPlanet2
                        contract.getPlanetData(_planetId, (error, planet) => {
                            console.log(planet);
                            if (document.getElementById("price")) {
                                document.getElementById("price").value = planet[2];
                            }
                            if (document.getElementById("area")) {
                                document.getElementById("area").value = planet[3];
                            }
                            if (document.getElementById("planet_resouces")) {
                                document.getElementById("planet_resouces").value = planet[4];
                            }
                            if (document.getElementById("blocknum")) {
                                document.getElementById("blocknum").value = planet[5];
                            }
                        });
                        */
                        //
                        /*

                                        /*
                                        var date = new Date(con[5]*1000);
                                        var hours = date.getHours();
                                        var minutes = "0" + date.getMinutes();
                                        var seconds = "0" + date.getSeconds();
                                        var formattedTime = 
                                            date.getFullYear() + '/'
                                             + (date.getMonth()+1) + '/' 
                                             + date.getDate() + ''+ ':' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                                        */
                        //ロード画面を隠す
                        jQuery('#loader-bg').hide();
                    };
                });
            }
        }
    }
    xmlHttp.onerror = function (e) {
        console.error(xmlHttp.statusText);
    };
    xmlHttp.send(null);
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

function SetPlanetName() {
    var gift_address = document.getElementById("gift_address").value;
    //alert(gift_address);
    if (web3.isAddress(gift_address) == false) {
        alert("アドレスの形式が不正です.");
        return;
    }
    contract.updateName(1, gift_address, {
        value: web3.toWei(0, "wei")
    }, (error, txid) => {});
}

//battle