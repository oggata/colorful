# junkbot

A new Flutter project.

# Getting Started

```
##clone
git clone https://github.com/oggata/gadget_flutter_app
cd gadget_flutter_app

##flutterの準備
flutter doctor
flutter --version

##コードの実行
git checkout repo-url 
(flutter create helloworld)
flutter packages get
flutter devices
flutter run
(複数ある場合->flutter run -d "iPhone X")

##実機確認
flutter install
flutter build ios --debug --flavor dev
open ios/Runner.xcworkspace

##remixの操作
npm install -g remixd
remixd -s ./smart-contract --remix-ide https://remix.ethereum.org
(remixd -s /Users/repo-dir --remix-ide https://remix.ethereum.org)
```

# Contract

```

deployの仕方

A:コントラクト準備
A-1.JunkallstarsMaterials,JunkallstarsControlContract,JunkallstarsToken
をdeployする

A-2.
JunkallstarsMaterials.addMinter([JunkallstarsTokenのコントラクトアドレス])
を実行する

A-3.
JunkallstarsToken.setJunkallstarsControlContract(0x2b67fc7ec82a3573d59b19aacb057d45d0dcec61);
JunkallstarsToken.setJunkallstarsMaterialsContract(0xcedb15ee9bebd98aa222f18672225433aaec7396);
を実行する

B:ゲーム準備
B-1.
JunkallstarsToken.initPlayer()を実行する

B-2.
いくつかmintしてみる
JunkallstarsToken.mint(1,"0x28899653c0951d29635a4a123b8a43eb15744f64");

B-3.
getCardData(1)
などでカードを取得してみる


memo;
JunkallstarsMaterials
0xcedb15ee9bebd98aa222f18672225433aaec7396
JunkallstarsControlContract
0x2b67fc7ec82a3573d59b19aacb057d45d0dcec61
JunkallstarsToken
0x0b68352cddeeb86cd7f56607bf9d78ecb2991ce2

```

v1:
coin:0x124dbf2bd5eb5517b8aa7cdc7c26720634c9533e
controll:0x383a6647519ace7eb8ec6ff1d89fd14ab74ce09f
token:0xcabb9a446981b90ab1508aaa6c332d630cae1a8f

>>
v2:
coin:0xb7e0f5681d4335eacd43ed96ad24e0cdd377ae3e
controll:0x6d916fa98b7af870865ca4bc4218d57a6232f2e0
token:0x00b1b05fbb6f19d49e143bd1e0c5ff02a529bb77


v3:
token:0x78be343476ccad513067d218f6697c63b9d12ef4
coin:0x01c5937fe5e22fba5efd8cc9d817f9cea2bfc44f
controll:0x8a05f37a6f1f8e7684d08466cf176d1aa287ac9a


http://sugarpot.org/images/junkbot/20.png
https://rinkeby.opensea.io/assets/0x78be343476ccad513067d218f6697c63b9d12ef4/1



https://rinkeby.opensea.io/assets/0x78be343476ccad513067d218f6697c63b9d12ef4/1
https://rinkeby.opensea.io/assets/0x78be343476ccad513067d218f6697c63b9d12ef4/2
https://rinkeby.opensea.io/assets/0x78be343476ccad513067d218f6697c63b9d12ef4/3
https://rinkeby.opensea.io/assets/0x78be343476ccad513067d218f6697c63b9d12ef4/4
https://rinkeby.opensea.io/assets/0x78be343476ccad513067d218f6697c63b9d12ef4/5
https://rinkeby.opensea.io/assets/0x78be343476ccad513067d218f6697c63b9d12ef4/6



