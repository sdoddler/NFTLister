# NFT Lister

NFT Lister is a Node.js project designed to list NFTs on the XRPL (XRP Ledger) by creating offers for them. This project consists of three files: `NFTLister.js`, `config.json`, and `nftIDs.json`.

## Getting Started

To get started, you will need to have Node.js installed on your system. You can download it from the [official website](https://nodejs.org/).

### Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/nft-lister.git
```

2. Install the required dependencies:

```
cd nft-lister
npm install
```

### Configuration

1. Update the `config.json` file with your wallet seed:

```json
{
  "node": "wss://xrplcluster.com/",
  "walletSeed": "sYourSeedHere"
}
```

Replace `sYourSeedHere` with your wallet seed.

2. Update the `nftIDs.json` file with the NFTs you want to list:

```json
{
  "NFT_ID_1": {
    "amount": 0,
    "destination": "rGnBUCwMJSX57QDecdyT5drdG3gvsmVqxD"
  },
  "NFT_ID_2": {
    "amount": 40
  },
  "NFT_ID_3": {
    "amount": 40
  }
}
```

Replace the `NFT_ID_*` keys with the actual NFT IDs and configure the "amount" and "destination" values as needed.

### Usage

To list the NFTs, run the following command:

```
node NFTLister.js
```

## Overview

### NFTLister.js

`NFTLister.js` is the main file that connects to the XRPL, reads the `nftIDs.json` file, and creates offers for the specified NFTs using the wallet seed from the `config.json` file.

### config.json

`config.json` is the configuration file that stores the XRPL node URL and the wallet seed.

### nftIDs.json

`nftIDs.json` contains the list of NFTs to be listed on the XRPL. The JSON keys are the NFT IDs, and the values are objects with properties "amount" and "destination". The "amount" property is the selling price, and the "destination" property is an optional address to specify where the NFT should be sent after purchase.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

