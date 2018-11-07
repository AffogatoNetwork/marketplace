pragma solidity ^0.4.23;

contract Marketplace{

    event LogCreateBid(
        address _farmer,
        uint256 _initialPrice,
        uint256 _buyoutPrice,
        uint _coffeeBatchId,
        uint _timeLimit, 
        bool _status
    );

    struct Bid {
        address farmer;
        uint256 initialPrice;
        uint256 buyoutPrice;
        uint coffeeBatchId;
        uint timeLimit; 
        bool status;
    }
    mapping (address => Bid[]) public farmerToBid;

    function createBid(uint256 _initialPrice, uint256 _buyoutPrice, uint _coffeeBatchId, uint _timeLimit) public{
        Bid memory bid = Bid(msg.sender, _initialPrice, _buyoutPrice, _coffeeBatchId, _timeLimit, true);
        farmerToBid[msg.sender].push(bid);
        emit LogCreateBid(msg.sender, _initialPrice, _buyoutPrice, _coffeeBatchId, _timeLimit, true);
    }

    function getBid(address _owner, uint _bidPosition) public view returns(
        address,
        uint256,
        uint256,
        uint,
        uint,
        bool
    ){
        Bid memory bid = farmerToBid[_owner][_bidPosition];
        return(
            bid.farmer,
            bid.initialPrice,
            bid.buyoutPrice,
            bid.coffeeBatchId,
            bid.timeLimit,
            bid.status
        );
    }
}