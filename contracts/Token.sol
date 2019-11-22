pragma solidity ^ 0.5 .0;

import "@openzeppelin/contracts-ethereum-package/contracts/payment/PullPayment.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC721/ERC721Full.sol";
import '@openzeppelin/contracts-ethereum-package/contracts/token/ERC721/ERC721Mintable.sol';
import "@openzeppelin/contracts-ethereum-package/contracts/GSN/GSNRecipient.sol";
import "@openzeppelin/upgrades/contracts/Initializable.sol";
import './Strings.sol';

/**
 * @title ColorfulERC721Token
 * ColorfulERC721Token - ERC721 contract that whitelists a trading address, and has minting functionality.
 */
contract ColorfulERC721Token is GSNRecipient, ERC721Full, ERC721Mintable, Ownable {

    // accept all requests
    function acceptRelayedCall(
      address,
      address,
      bytes calldata,
      uint256,
      uint256,
      uint256,
      uint256,
      bytes calldata,
      uint256
      ) external view returns (uint256, bytes memory) {
      return _approveRelayedCall();
    }

    function setRelayHubAddress() public {
      if(getHubAddr() == address(0)) {
        _upgradeRelayHub(0xD216153c06E857cD7f72665E0aF1d7D82172F494);
      }
    }

    function getRecipientBalance() public view returns (uint) {
      return IRelayHub(getHubAddr()).balanceOf(address(this));
    }

    Card[] private cards;
    uint public seqId = 1;
    string public baseUri = "https://oggata-colorful.glitch.me/opensea/tokens/";

    struct Card {
        uint id; //id
        address owner; //オーナー
        uint price; //価格
        uint code; //コード
        uint ctype; //タイプ
        uint exp; //経験値
        uint cooldownFinishTime; //クールダウン終了時間
        uint isSold; //売約済
        uint createdAt; //作成日
        uint updatedAt; //更新日
        uint blocknum; //発見されたblockのnumber
        uint timestamp; //発見されたblockのtimestamp  
    }
    using Strings
    for string;
    address proxyRegistryAddress;

    function initialize() public initializer {
      ERC721.initialize();
      ERC721Enumerable.initialize();
      ERC721Metadata.initialize("eth.colorful.game", "COR");
      //this.owner = msg.sender();
    }

    ColorfulControlContract public ccc;
    function setColorfulControlContract(address _contractAddress)  public {
        ccc = ColorfulControlContract(_contractAddress);
    }

    function mintToAddress(address _to) public {
        uint id = cards.push(Card(seqId, //id
            _to, //オーナー
            0, //価格
            ccc.getCode(), 
            ccc.getCType(), 
            0, //経験値
            0, //cooldownFinishTime
            0, //売約済
            uint32(now), //作成日
            uint32(now), //更新日
            block.number, //発見されたblockのnumber
            block.timestamp //発見されたblockのtimestamp
        )) - 1;
        seqId++;
        super._mint(_to, id);
    }

    function addExp(uint _seqId, uint _amount) public onlyOwner {
        cards[_seqId].exp += _amount;
    }

    function baseTokenURI() public view returns(string memory) {
        return baseUri;
    }

    function tokenURI(uint256 _tokenId) external view returns(string memory) {
        return Strings.strConcat(baseTokenURI(), Strings.uint2str(_tokenId));
    }

    function getCardData(uint _seqId) public view returns(uint[7] memory) {
        uint[7] memory uintArray;
        uintArray[0] = _seqId;
        uintArray[1] = cards[_seqId].price;
        uintArray[2] = cards[_seqId].code;
        uintArray[3] = cards[_seqId].ctype;
        uintArray[4] = cards[_seqId].exp;
        uintArray[5] = cards[_seqId].cooldownFinishTime;
        uintArray[6] = cards[_seqId].createdAt;
        return uintArray;
    }

    function setBaseURI(string memory _baseUri) public {
        baseUri = _baseUri;
    }

    function withdraw() public onlyOwner {
        msg.sender.transfer(address(this).balance);
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function tokensOf(address _owner) public view returns(uint256[] memory) {
        return _tokensOfOwner(_owner);
    }

    function setProxyRegistryAddress(address _proxyAddress) public onlyOwner{
      proxyRegistryAddress = _proxyAddress;
    }

    /**
     * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
     */
    function isApprovedForAll(address owner, address operator)
    public view
    returns(bool) {
        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }
        return super.isApprovedForAll(owner, operator);
    }
}

contract OwnableDelegateProxy {}
contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

/**
 * @title ColorfulControlContract
 */
contract ColorfulControlContract is Ownable {
    uint public version;
    uint private nonce = 1;
    constructor(uint _version) public {
        version = _version;
    }

    function getCode() public view returns(uint) {
        uint _randNum = getRandNum(899999999999) + 100000000000;
        return _randNum;
    }

    function getCType() public view returns(uint) {
        return getRandNum(3);
    }

    function getRandNum(uint upper) public view returns(uint) {
        uint randomnumber = uint(keccak256(abi.encodePacked(now, msg.sender, nonce))) % upper;
        randomnumber = randomnumber + 1;
        return randomnumber;
    }
}
contract ColorfulControlContractInterface {
    function getCode(uint _tokenId) public view returns(uint);
}