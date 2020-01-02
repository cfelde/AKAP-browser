async function getProvider() {
    let web3Provider;

    // Modern dapp browsers...
    if (window.ethereum) {
        web3Provider = window.ethereum;

        try {
            // Request account access
            await window.ethereum.enable();
        } catch (error) {
            // User denied account access...
            console.error("User denied account access")
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, return null..
    else {
        web3Provider = null;
    }

    return web3Provider == null ? null : new Web3(web3Provider);
}

class Handler {
    // TODO temp
    address = "0x384779758032D01f57Adb44cD4409D4cE07040c4";

    abi = [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "parentId",
                    "type": "uint256"
                },
                {
                    "name": "label",
                    "type": "bytes"
                }
            ],
            "name": "hashOf",
            "outputs": [
                {
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "parentId",
                    "type": "uint256"
                },
                {
                    "name": "label",
                    "type": "bytes"
                }
            ],
            "name": "claim",
            "outputs": [
                {
                    "name": "status",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "nodeId",
                    "type": "uint256"
                }
            ],
            "name": "parentOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "nodeId",
                    "type": "uint256"
                }
            ],
            "name": "expiryOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "nodeId",
                    "type": "uint256"
                }
            ],
            "name": "seeAlso",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "nodeId",
                    "type": "uint256"
                }
            ],
            "name": "seeAddress",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "nodeId",
                    "type": "uint256"
                }
            ],
            "name": "nodeBody",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "nodeId",
                    "type": "uint256"
                }
            ],
            "name": "expireNode",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "nodeId",
                    "type": "uint256"
                },
                {
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "setSeeAlso",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "nodeId",
                    "type": "uint256"
                },
                {
                    "name": "value",
                    "type": "address"
                }
            ],
            "name": "setSeeAddress",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "nodeId",
                    "type": "uint256"
                },
                {
                    "name": "value",
                    "type": "bytes"
                }
            ],
            "name": "setNodeBody",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "nodeId",
                    "type": "uint256"
                },
                {
                    "name": "uri",
                    "type": "string"
                }
            ],
            "name": "setTokenURI",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    constructor(web3) {
        this.web3 = web3;
        this.akap = new web3.eth.Contract(this.abi, this.address);
    }

    hashCheck(hash) {
        return this.web3.utils.isHexStrict(hash);
    }

    async hashOf(parentHash, nodeLabel) {
        if (this.hashCheck(parentHash)) {
            return this.akap.methods.hashOf(parentHash, this.web3.utils.utf8ToHex(nodeLabel)).call();
        } else {
            return null;
        }
    }
}