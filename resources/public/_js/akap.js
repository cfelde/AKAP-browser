class Handler {
    // This is the address of the deployed AKAP contract.
    // If you want to run the AKAP browser against a local test deploy,
    // change this value accordingly.
    address = "0xaacCAAB0E85b1EfCEcdBA88F4399fa6CAb402349";

    // This is the ABI as given by the compiled IAKAP on
    // https://github.com/cfelde/AKAP/blob/master/contracts/IAKAP.sol
    abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "nodeId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "enum IAKAP.NodeAttribute",
                    "name": "attribute",
                    "type": "uint8"
                }
            ],
            "name": "AttributeChanged",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "nodeId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "parentId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "label",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "internalType": "enum IAKAP.ClaimCase",
                    "name": "claimCase",
                    "type": "uint8"
                }
            ],
            "name": "Claim",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "parentId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "label",
                    "type": "bytes"
                }
            ],
            "name": "hashOf",
            "outputs": [
                {
                    "internalType": "uint256",
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
                    "internalType": "uint256",
                    "name": "parentId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "label",
                    "type": "bytes"
                }
            ],
            "name": "claim",
            "outputs": [
                {
                    "internalType": "uint256",
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
                    "internalType": "uint256",
                    "name": "nodeId",
                    "type": "uint256"
                }
            ],
            "name": "exists",
            "outputs": [
                {
                    "internalType": "bool",
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
                    "internalType": "uint256",
                    "name": "nodeId",
                    "type": "uint256"
                }
            ],
            "name": "isApprovedOrOwner",
            "outputs": [
                {
                    "internalType": "bool",
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
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
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
                    "internalType": "uint256",
                    "name": "nodeId",
                    "type": "uint256"
                }
            ],
            "name": "parentOf",
            "outputs": [
                {
                    "internalType": "uint256",
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
                    "internalType": "uint256",
                    "name": "nodeId",
                    "type": "uint256"
                }
            ],
            "name": "expiryOf",
            "outputs": [
                {
                    "internalType": "uint256",
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
                    "internalType": "uint256",
                    "name": "nodeId",
                    "type": "uint256"
                }
            ],
            "name": "seeAlso",
            "outputs": [
                {
                    "internalType": "uint256",
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
                    "internalType": "uint256",
                    "name": "nodeId",
                    "type": "uint256"
                }
            ],
            "name": "seeAddress",
            "outputs": [
                {
                    "internalType": "address",
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
                    "internalType": "uint256",
                    "name": "nodeId",
                    "type": "uint256"
                }
            ],
            "name": "nodeBody",
            "outputs": [
                {
                    "internalType": "bytes",
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
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
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
                    "internalType": "uint256",
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
                    "internalType": "uint256",
                    "name": "nodeId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
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
                    "internalType": "uint256",
                    "name": "nodeId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
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
                    "internalType": "uint256",
                    "name": "nodeId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
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
                    "internalType": "uint256",
                    "name": "nodeId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
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
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
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
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getApproved",
            "outputs": [
                {
                    "internalType": "address",
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
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "bool",
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
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
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
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
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
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
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
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
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

    toHex(value) {
        if (value === null) return null;

        return this.web3.utils.toHex(value);
    }

    toClaimCase(value) {
        switch (value) {
            case "0": return "RECLAIM";
            case "1": return "NEW";
            case "2": return "TRANSFER";
            default: return "UNKNOWN";
        }
    }

    toNodeAttribute(value) {
        switch (value) {
            case "0": return "EXPIRY";
            case "1": return "SEE_ALSO";
            case "2": return "SEE_ADDRESS";
            case "3": return "NODE_BODY";
            case "4": return "TOKEN_URI";
            default: return "UNKNOWN";
        }
    }

    parseEvent(event) {
        switch (event.event) {
            case "Claim":
                return [
                    "Claim", event.blockNumber, event.transactionHash,
                    "Sender", event.returnValues.sender,
                    "Node ID", this.toHex(event.returnValues.nodeId),
                    "Parent ID", this.toHex(event.returnValues.parentId),
                    "Label", event.returnValues.label,
                    "Claim case", this.toClaimCase(event.returnValues.claimCase)
                ];
            case "AttributeChanged":
                return [
                    "AttributeChanged", event.blockNumber, event.transactionHash,
                    "Sender", event.returnValues.sender,
                    "Node ID", this.toHex(event.returnValues.nodeId),
                    "Attribute", this.toNodeAttribute(event.returnValues.attribute)
                ];
            case "Transfer":
                return [
                    "Transfer", event.blockNumber, event.transactionHash,
                    "From", event.returnValues.from,
                    "To", event.returnValues.to,
                    "Node ID", this.toHex(event.returnValues.tokenId)
                ];
            case "Approval":
                return [
                    "Approval", event.blockNumber, event.transactionHash,
                    "Owner", event.returnValues.owner,
                    "Approved", event.returnValues.approved,
                    "Node ID", this.toHex(event.returnValues.tokenId)
                ];
            case "ApprovalForAll":
                return [
                    "ApprovalForAll", event.blockNumber, event.transactionHash,
                    "Owner", event.returnValues.owner,
                    "Operator", event.returnValues.operator,
                    "Approved", event.returnValues.approved
                ];
            default:
                return null;
        }
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

        let gasEstimate = await this.akap.methods
            .claim(parentHash, this.web3.utils.utf8ToHex(nodeLabel))
            .estimateGas();

        return this.akap.methods
            .claim(parentHash, this.web3.utils.utf8ToHex(nodeLabel))
            .send({
                from: accounts[0],
                gasPrice: avgGasPrice,
                gas: gasEstimate + 30000
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

        let gasEstimate = await this.akap.methods
            .setSeeAlso(nodeHash, newValue)
            .estimateGas();

        return this.akap.methods
            .setSeeAlso(nodeHash, newValue)
            .send({
                from: accounts[0],
                gasPrice: avgGasPrice,
                gas: gasEstimate + 30000
            })
            .then(_ => true)
            .catch(e => this.catcher(e, false));
    }

    async setSeeAddress(nodeHash, newValue) {
        if (!this.addressCheck(newValue)) return false;

        let accounts = await this.web3.eth.getAccounts();
        let avgGasPrice = await this.web3.eth.getGasPrice();

        let gasEstimate = await this.akap.methods
            .setSeeAddress(nodeHash, newValue)
            .estimateGas();

        return this.akap.methods
            .setSeeAddress(nodeHash, newValue)
            .send({
                from: accounts[0],
                gasPrice: avgGasPrice,
                gas: gasEstimate + 30000
            })
            .then(_ => true)
            .catch(e => this.catcher(e, false));
    }

    async setNodeBody(nodeHash, newValue) {
        let accounts = await this.web3.eth.getAccounts();
        let avgGasPrice = await this.web3.eth.getGasPrice();

        let gasEstimate = await this.akap.methods
            .setNodeBody(nodeHash, this.web3.utils.toHex(newValue))
            .estimateGas();

        return this.akap.methods
            .setNodeBody(nodeHash, this.web3.utils.toHex(newValue))
            .send({
                from: accounts[0],
                gasPrice: avgGasPrice,
                gas: gasEstimate + 30000
            })
            .then(_ => true)
            .catch(e => this.catcher(e, false));
    }

    async setTokenURI(nodeHash, newValue) {
        let accounts = await this.web3.eth.getAccounts();
        let avgGasPrice = await this.web3.eth.getGasPrice();

        let gasEstimate = await this.akap.methods
            .setTokenURI(nodeHash, newValue)
            .estimateGas();

        return this.akap.methods
            .setTokenURI(nodeHash, newValue)
            .send({
                from: accounts[0],
                gasPrice: avgGasPrice,
                gas: gasEstimate + 30000
            })
            .then(_ => true)
            .catch(e => this.catcher(e, false));
    }

    async nodeEvents(millisBack, nodeHash, owner) {
        let lastBlockNumber = await this.web3.eth.getBlockNumber();
        let lastTimestamp = (await this.web3.eth.getBlock(lastBlockNumber)).timestamp;

        let firstBlockNumber = lastBlockNumber;
        let firstTimestamp;

        do {
            firstBlockNumber = Math.max(0, firstBlockNumber - 1920);
            firstTimestamp = (await this.web3.eth.getBlock(firstBlockNumber)).timestamp;
        } while ((lastTimestamp - firstTimestamp) * 1000 < millisBack && firstBlockNumber > 0);

        let events1 = await this.akap.getPastEvents("Claim", {filter: {nodeId: nodeHash}, fromBlock: firstBlockNumber, toBlock: lastBlockNumber});
        let events2 = await this.akap.getPastEvents("AttributeChanged", {filter: {nodeId: nodeHash}, fromBlock: firstBlockNumber, toBlock: lastBlockNumber});
        let events3 = await this.akap.getPastEvents("Transfer", {filter: {tokenId: nodeHash}, fromBlock: firstBlockNumber, toBlock: lastBlockNumber});
        let events4 = await this.akap.getPastEvents("Approval", {filter: {tokenId: nodeHash}, fromBlock: firstBlockNumber, toBlock: lastBlockNumber});
        let events5 = await this.akap.getPastEvents("ApprovalForAll", {filter: {owner: owner}, fromBlock: firstBlockNumber, toBlock: lastBlockNumber});

        let events = [].concat(events1, events2, events3, events4, events5);

        events.sort((a, b) => b.blockNumber - a.blockNumber);

        return await Promise.all(events.map(e => this.parseEvent(e)).filter(e => e !== null));
    }
}
