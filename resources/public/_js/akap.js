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
    address = "0xdDb4Dd12Ea6C92D09FaA4B64FE398F926be23A12";

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
            "name": "exists",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
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
            "name": "isApprovedOrOwner",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
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
            "name": "ownerOf",
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
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
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
            "name": "getApproved",
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
            "constant": false,
            "inputs": [
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "owner",
                    "type": "address"
                },
                {
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
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
                    "name": "from",
                    "type": "address"
                },
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "from",
                    "type": "address"
                },
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "from",
                    "type": "address"
                },
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
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

    addressCheck(address) {
        return this.web3.utils.isAddress(address)
    }

    catcher(e, d) {
        console.error(e);
        return d;
    }

    async hashOf(parentHash, nodeLabel) {
        if (!this.hashCheck(parentHash)) return null;

        return this.akap.methods
            .hashOf(parentHash, this.web3.utils.utf8ToHex(nodeLabel))
            .call()
            .then(v => this.web3.utils.toHex(v))
            .catch(e => this.catcher(e, null));
    }

    async claim(parentHash, nodeLabel) {
        if (!this.hashCheck(parentHash)) return null;

        let accounts = await this.web3.eth.getAccounts();
        let avgGasPrice = await this.web3.eth.getGasPrice();

        return this.akap.methods
            .claim(parentHash, this.web3.utils.utf8ToHex(nodeLabel))
            .send({
                from: accounts[0],
                gasPrice: avgGasPrice,
                gas: 200000
            })
            .then(_ => true)
            .catch(e => this.catcher(e, false));
    }

    async loadDetails(nodeHash) {
        if (!this.hashCheck(nodeHash)) return null;

        // There's never a node on 0x0, but return default values if requested
        if (nodeHash === "0x0") return {
            "node-hash": nodeHash,
            "parent-hash": nodeHash,
            "owner-address": nodeHash,
            "expiry": 8640000000000,
            "see-also": nodeHash,
            "see-address": nodeHash,
            "node-body": null,
            "token-uri": "https://akap.me",
            "is-approved": false
        };

        let exists = await this.akap.methods.exists(nodeHash).call();

        if (!exists) return {};

        let accounts = await this.web3.eth.getAccounts();

        let parentHash = await this.akap.methods.parentOf(nodeHash).call().catch(e => this.catcher(e, null));
        let ownerAddress = await this.akap.methods.ownerOf(nodeHash).call().catch(e => this.catcher(e, null));
        let expiry = await this.akap.methods.expiryOf(nodeHash).call().catch(e => this.catcher(e, null));
        let seeAlso = await this.akap.methods.seeAlso(nodeHash).call().catch(e => this.catcher(e, null));
        let seeAddress = await this.akap.methods.seeAddress(nodeHash).call().catch(e => this.catcher(e, null));
        let nodeBody = await this.akap.methods.nodeBody(nodeHash).call().catch(e => this.catcher(e, null));
        let tokenURI = await this.akap.methods.tokenURI(nodeHash).call().catch(e => this.catcher(e, null));
        let isApproved = await this.akap.methods.isApprovedOrOwner(nodeHash).call(
            {from: accounts[0]}
        ).catch(e => this.catcher(e, false));

        return {
            "node-hash": nodeHash,
            "parent-hash": parentHash !== null ? this.web3.utils.toHex(parentHash) : parentHash,
            "owner-address": ownerAddress,
            "expiry": expiry,
            "see-also": seeAlso !== null ? this.web3.utils.toHex(seeAlso) : seeAlso,
            "see-address": seeAddress,
            "node-body": nodeBody !== null ? this.web3.utils.toHex(nodeBody) : nodeBody,
            "token-uri": tokenURI,
            "is-approved": isApproved
        }
    }

    async setSeeAlso(nodeHash, newValue) {
        let accounts = await this.web3.eth.getAccounts();
        let avgGasPrice = await this.web3.eth.getGasPrice();

        return this.akap.methods
            .setSeeAlso(nodeHash, newValue)
            .send({
                from: accounts[0],
                gasPrice: avgGasPrice,
                gas: 200000 // TODO
            })
            .then(_ => true)
            .catch(e => this.catcher(e, false));
    }

    async setSeeAddress(nodeHash, newValue) {
        if (!this.addressCheck(newValue)) return false;

        let accounts = await this.web3.eth.getAccounts();
        let avgGasPrice = await this.web3.eth.getGasPrice();

        return this.akap.methods
            .setSeeAddress(nodeHash, newValue)
            .send({
                from: accounts[0],
                gasPrice: avgGasPrice,
                gas: 200000 // TODO
            })
            .then(_ => true)
            .catch(e => this.catcher(e, false));
    }

    async setNodeBody(nodeHash, newValue) {
        let accounts = await this.web3.eth.getAccounts();
        let avgGasPrice = await this.web3.eth.getGasPrice();

        return this.akap.methods
            .setNodeBody(nodeHash, this.web3.utils.toHex(newValue))
            .send({
                from: accounts[0],
                gasPrice: avgGasPrice,
                gas: 200000 // TODO
            })
            .then(_ => true)
            .catch(e => this.catcher(e, false));
    }

    async setTokenURI(nodeHash, newValue) {
        let accounts = await this.web3.eth.getAccounts();
        let avgGasPrice = await this.web3.eth.getGasPrice();

        return this.akap.methods
            .setTokenURI(nodeHash, newValue)
            .send({
                from: accounts[0],
                gasPrice: avgGasPrice,
                gas: 200000 // TODO
            })
            .then(_ => true)
            .catch(e => this.catcher(e, false));
    }
}