pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";


contract Kyra is ERC1155{
    address public governance;
    uint256 public IdCount;
    modifier onlyGovernance(){
        require(msg.sender == governance, "Only the owner of this contract can create do that");
        _;
    }

    constructor() public ERC1155(""){
        governance = msg.sender;
        IdCount = 0;
    }



    function newToken(address owner, uint256 id, bytes calldata data)external onlyGovernance{
        IdCount++;

        bytes memory dataByte = bytes(data);

        if(owner == address(0)){  //test if owner is empty; give the ownership to  the governance
            _mint(msg.sender, id, 1, dataByte);
        }
        else{
            _mint(owner, id, 1, dataByte);
        }
    }

    //Rajouter l'apporbation du owner du contract setApprovalForAll

    function SafeTransfer(address _ActualOwnerOfToken, address _to, uint256 _IdOfToken) public{

        require(_to !=address(0), "You can't transfer your token to the zero address");


        require(
            balanceOf(_ActualOwnerOfToken, _IdOfToken) == 1
        );

        safeTransferFrom(_ActualOwnerOfToken, _to, _IdOfToken, 1, "");
    }

}
