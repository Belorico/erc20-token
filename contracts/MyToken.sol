// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    address public owner;

    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
        owner = msg.sender;
    }

    // Function to mint new tokens, restricted to the owner
    function mint(address to, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can mint tokens");
        _mint(to, amount);
    }

    // Function to burn tokens from a specific address
    function burn(address from, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can burn tokens");
        _burn(from, amount);
    }
}
