//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;


// This is the main building block for smart contracts.
contract Token {
    // Some string type variables to identify the token.
    string public name = "Sushi Career Token";
    string public symbol = "SSH";

    // Company
    struct Company {
        address companyAddress;
        string companyName;
        uint256 companyToken;
        uint employeeCount;
    }
    Company[] public companies;

    mapping(uint => address) public companyOwner;
    mapping(address => uint) public ownerCompanyId;
    mapping(address => bool) public companyExist;
    mapping(string => uint) public companyNameId;
    event UpdateCompanyName(uint id, string companyName);

    // Employee
    struct Employee {
        address employeeAddress;
        string employeeName;
        uint256 employeeToken;
        string companyName;
    }

    Employee[] public employees;
    mapping(address => uint) public employeeId;         // employeesのINDEX
    mapping(address => bool) public employeeExist;      // 既に登録済みかどうか
    mapping(address => bool) public employeeCompanyExist;  // 会社に所属しているかどうか
    mapping(address => uint) public employeeCompanyId;  // 会社に所属する時に設定
    event RegisterEmployee(uint id, string userName, uint256 employeeToken);

    // ユーザー登録
    function _createEmployee(string memory _name) public {
        require(employeeExist[msg.sender] == false, "Employee already exists");
        employees.push(Employee(msg.sender, _name, 1000, ""));
        uint id = employees.length - 1;
        employeeId[msg.sender] = id;
        employeeExist[msg.sender] = true;
        employeeCompanyExist[msg.sender] = false;
        emit RegisterEmployee(id, _name, employees[id].employeeToken);
    }

    // ユーザーの情報を取得
    function _getEmployeeInfo() public view returns (string memory, uint256, string memory) {
        // require(employeeExist[msg.sender] == true, "Employee not exists");
        require(employeeExist[msg.sender] == true, string(abi.encodePacked("Employee not exists: ", msg.sender)));
        uint id = employeeId[msg.sender];
        string memory companyName = "";
        if (employeeCompanyExist[msg.sender] != false) {
            uint companyId = employeeCompanyId[msg.sender];
            companyName = companies[companyId].companyName;
        }

        return (employees[id].employeeName, employees[id].employeeToken, companyName);
    }

    // ユーザーが会社に所属する
    function _setEmployeeJoinCompany(uint _companyId) public {
        require(employeeCompanyExist[msg.sender] == false, "Employee already join company");
        employeeCompanyId[msg.sender] = _companyId;
        employeeCompanyExist[msg.sender] = true;

        companies[_companyId].employeeCount += 1;
        companies[_companyId].companyToken += employees[employeeId[msg.sender]].employeeToken;
        employees[employeeId[msg.sender]].employeeToken = 0;
        employees[employeeId[msg.sender]].companyName = companies[_companyId].companyName;
        emit RegisterEmployee(employeeId[msg.sender], employees[employeeId[msg.sender]].employeeName, employees[employeeId[msg.sender]].employeeToken);
    }

    // ユーザーが退職する
    function _setEmployeeLeaveCompany(uint _companyId, uint256 _zanToken) public {
        require(employeeCompanyExist[msg.sender] == true, "Employee not join company");
        employeeCompanyId[msg.sender] = 0;
        employeeCompanyExist[msg.sender] = false;

        companies[_companyId].employeeCount -= 1;
        companies[_companyId].companyToken -= _zanToken;
        employees[employeeId[msg.sender]].employeeToken = _zanToken;
        employees[employeeId[msg.sender]].companyName = "";
        emit RegisterEmployee(employeeId[msg.sender], employees[employeeId[msg.sender]].employeeName, employees[employeeId[msg.sender]].employeeToken);
    }

    // 全ての情報を取得
    function _getAllThings() public view returns (Company[] memory, Employee[] memory) {
        return (companies, employees);
    }

////////////////////////////////////////////////////////////////////////////////////////

    // 会社登録
    function _createCompany(string memory _name) public {
        require(companyExist[msg.sender] == false, "Company already exists");
        companies.push(Company(msg.sender, _name, 0, 0));
        uint id = companies.length - 1;
        companyOwner[id] = msg.sender;
        ownerCompanyId[msg.sender] = id;
        companyNameId[_name] = id;
        companyExist[msg.sender] = true;
        emit UpdateCompanyName(id, _name);
    }

    // 会社のトークンを取得
    function _getCompanyToken() public view returns (uint256, address) {
        require(companyExist[msg.sender] == true, "Company not exists");
        uint id = ownerCompanyId[msg.sender];
        return (companies[id].companyToken, msg.sender);
    }

    // 会社名を取得
    function _getCompanyName() public view returns (string memory) {
        require(companyExist[msg.sender] == true, "Company not exists");
        uint id = ownerCompanyId[msg.sender];
        return companies[id].companyName;
    }

    function _getAllCompanyInfo() public view returns (Company[] memory) {
        return companies;
    }
}