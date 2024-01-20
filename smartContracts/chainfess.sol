// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ChainFess{
    
    uint public tokenCounter;

    mapping(uint => ZKFess) public zkFesses;
    mapping(uint => address) public zkFessToOwner;
    mapping(address => uint) ownerZKFessCount;
    //storing list of zkFesses owned by address
    mapping(address => uint[]) public ownerZKFessList;

    address public owner;

    struct ZKFess {
        string sender;
        string content;
        string receiver;
        uint256 timestamp;
    }
    
    function createZKFess(
        string memory sender,
        string memory content,
        string memory receiver
    ) public {
        require(bytes(sender).length > 0);
        require(bytes(content).length > 0);
        require(bytes(receiver).length > 0);
        tokenCounter++;
        zkFesses[tokenCounter] = ZKFess(sender, content, receiver, block.timestamp);
        zkFessToOwner[tokenCounter] = msg.sender;
        ownerZKFessCount[msg.sender]++;
        ownerZKFessList[msg.sender].push(tokenCounter);
    }

    function getZKFess(uint _id) public view returns(string memory, string memory, string memory, uint256){
        return (zkFesses[_id].sender, zkFesses[_id].content, zkFesses[_id].receiver, zkFesses[_id].timestamp);
    }

    function getOwnerZKFessCount(address _owner) public view returns(uint){
        return ownerZKFessCount[_owner];
    }

    function getOwnerZKFessList(address _owner) public view returns(uint[] memory){
        return ownerZKFessList[_owner];
    }

    function helperZKFessList() public view returns(ZKFess[] memory){
        uint[] memory list = ownerZKFessList[msg.sender];
        ZKFess[] memory zkFessList = new ZKFess[](list.length);
        for(uint i = 0; i < list.length; i++){
            zkFessList[i] = zkFesses[list[i]];
        }
        return zkFessList;
    }

    function getOwnerZKFess(uint _id) public view returns(string memory, string memory, string memory, uint256){
        return (zkFesses[_id].sender, zkFesses[_id].content, zkFesses[_id].receiver, zkFesses[_id].timestamp);
    }


}
