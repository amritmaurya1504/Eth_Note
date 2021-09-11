// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 < 0.9.0;

contract Note {
    string public name = "DNOTE";
    mapping(uint => Todo) public notes;
    uint public noteCount = 0;
    struct Todo{
        uint id;
        string description;
        address author;
    }
    
    function createNote(string memory _desc) public {
        noteCount++;
        notes[noteCount] = Todo(noteCount, _desc , address(msg.sender));
    }
}