import { NextApiRequest, NextApiResponse } from 'next'
import TokenArtifact from "../../contracts/AIB.json";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const web3 = new Web3(Web3.givenProvider || "https://alpha-rpc.scroll.io/l2");

const contractAddress = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY || "";
const abi = TokenArtifact.abi; // コントラクトのABIをここに記述
const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress);
const privateKey = '81d7a846c0556340fc0849fcb2e7e8a1564b8fcb177d668212722c3d83538ffe';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    console.log("req: ", req.body);
    if (req.body == "") res.status(200).json({ result: 'empty' })
    const sender_name = req.body.sender_name;
    const receiver_name = req.body.receiver_name;
    const osushi_count = req.body.osushi_count;

    console.log("sender_name: ", sender_name);
    console.log("receiver_name: ", receiver_name);
    console.log("osushi_count: ", osushi_count);

    const sender_id = await getEmployeeInfoBySlackId(sender_name);
    const receiver_id = await getEmployeeInfoBySlackId(receiver_name);

    console.log("sender_id: ", sender_id);
    console.log("receiver_id: ", receiver_id);

    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    console.log("account: ", account);
    const gasPrice = await web3.eth.getGasPrice();
    console.log("gasPrice: ", gasPrice);
    const gasLimit = 3000000;
    const tx = {
        from: account.address,
        to: contractAddress,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        data: contract.methods._sendSushi(sender_id, receiver_id, osushi_count).encodeABI()
    };
    console.log("tx: ", tx);
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    console.log("signedTx: ", signedTx);
    if (signedTx.rawTransaction) {
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("receipt: ", receipt);
    }
    // await sendSushi(sender_id, receiver_id, osushi_count);

    res.status(200).json({ result: 'OK' })
} 

async function getEmployeeInfoBySlackId(slackId: string): Promise<number> {
    const accounts = await web3.eth.getAccounts();
    const result = await contract.methods
        .getEmployeeInfoSlack(slackId)
        .call({ from: accounts[0] });
    console.log("getEmployeeInfoBySlackId: ", result);

    // display user info
    return result[0];
}

async function sendSushi(fromId: number, toId: number, sushi: number) {
    console.log("sendSushi Execute");
    const accounts = await web3.eth.getAccounts();
    console.log("accounts: ", accounts);
    if (accounts.length == 0) {
        accounts.push("0x0FDCE8E09BdE360a72DA70F06b82048907dc9775");
    }
    const result = await contract.methods
        ._sendSushi(fromId, toId, sushi)
        .send({ from: accounts[0] });
    console.log("setEmployeeJoinCompany: ", result);
}

export default handler;
