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
