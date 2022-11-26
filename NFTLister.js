const xrpl = require('xrpl');

const nfts = require('./nftIDs.json')
const { node, walletSeed } = require('./config.json');


const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

let xrpClient;

xconnect().then(function () { createOffers() });

async function createOffers() {

    

    var mintingWallet = xrpl.Wallet.fromSeed(walletSeed);

    for (nft in nfts) {
        //console.log(nft);

        var destination = "";
        
        txt = `Selling ${nft} for ${nfts[nft].amount}`;
        if (nfts[nft].destination) {
            txt += " to " + nfts[nft].destination
            destination = nfts[nft].destination;
        }

        var offerID = await createOffer(xrpClient, nft, nfts[nft].amount, mintingWallet, destination);


        console.log(txt);
        console.log("OfferID: " + offerID + "\n")

    }

    await delay(10000)
}

async function xconnect() {

    if (typeof xrpClient !== 'undefined' && xrpClient !== null) { if (xrpClient.isConnected) return; }
    console.log(`connecting to **XRPL** ${node}`);

    xrpClient = new xrpl.Client(node)

    await xrpClient.connect()

}

async function createOffer(client, nftID, saleAmount, nftWallet, destinationAddress = "") {
    var count = 0
    while (count < 5) {
        // try {

        if (saleAmount > 0) saleAmount *= 1000000;

        saleAmount = saleAmount.toString()

        var offer = {
            "TransactionType": "NFTokenCreateOffer",
            "Account": nftWallet.classicAddress,
            "NFTokenID": nftID,
            "Amount": saleAmount,
            "Flags": 1,
        }

        if (destinationAddress != "") {
            offer["Destination"] = destinationAddress;
        }

        var nftSellPrep = await client.autofill(offer)


        var nftSellSigned = nftWallet.sign(nftSellPrep);
        var nftSellResult = await client.submitAndWait(nftSellSigned.tx_blob);

        if (nftSellResult.result.meta.TransactionResult == "tesSUCCESS") {
            for (a in nftSellResult.result.meta.AffectedNodes) {
                if ("CreatedNode" in nftSellResult.result.meta.AffectedNodes[a]) {
                    if (nftSellResult.result.meta.AffectedNodes[a].CreatedNode.LedgerEntryType == "NFTokenOffer") {
                        var nftOfferIndex = nftSellResult.result.meta.AffectedNodes[a].CreatedNode.LedgerIndex;

                        return nftOfferIndex;
                    }
                }
            }
        } else {
            console.log(nftSellResult.result)
            //fakeFunctionToThrowError()
        }
        break
        //} catch (err) {

        //    console.log(`Creating Offer Failed ${count}\n${err}`)
        //    count += 1
        //}
    }

    return null;
}