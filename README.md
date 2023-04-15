## Description

Web3 service for Web2 users!

Send SUSHI to say Thank you for your co-workers!

SUSHI Career is a tool to send "Thank you" via slack within your company. (Peer bonus)

We use Slack instead of Discord so that Web2 users in the company can get used to Web3.

In addition, we use ZK-olleup to send OSUSHI to each other without worrying about the cost of Gas.

SUSHI Career is not just a "Thank you" tool.

Users can show the public how much you appreciate others and how much you are appreciated by others.

Companies can show that your company is an attractive company with active communication by publishing SUSHI Transactions.

In other words, this service can be used as an HRService.

SUSHI Career is a tool that allows both job seekers and companies to show everyone what they have to offer that cannot be expressed in a resume!

#### Contract 設定

```
yarn install
```

#### Contract Compile

```
npx hardhat compile
```

#### Contract 起動（localhost)
```
npx hardhat node --network hardhat
```

#### Contract Deploy
```
npx hardhat run scripts/deploy.js --network localhost
```

#### Contract Deploy - Scroll Testnet
```
npx hardhat run --network scrollTestnet scripts/deploy.js
```
