import Web3 from "web3";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import TokenArtifact from "../contracts/AIB.json";
import { useState } from "react";
import { resolve } from "path";
import { useRouter } from "next/navigation";
import { AbiItem } from "web3-utils";

type userInfo = {
	companyName: string;
	companyUrl: string;
	employeeAddress: string;
	employeeName: string;
	employeeSlackId: string;
};

const User: NextPage = () => {
	const [userName, setUserName] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [companyUrl, setCompanyUrl] = useState("");
	const [fromId, setFromId] = useState("");
	const [toId, setToId] = useState("");
	const [sushi, setSushi] = useState("");
	const [fromIdInfo, setFromIdInfo] = useState("");
	const [slackId, setSlackId] = useState("");

	// result
	const [createdResult, setCreatedResult] = useState("");
	const [employeeInfo, setEmployeeInfo] = useState<userInfo | "">(""); // result of getEmployeeInfo
	const [sendResult, setSendResult] = useState("");
	const [allData, setAllData] = useState<userInfo[] | "">("");
	const [userAddress, setUserAddress] = useState<userInfo | "">("");
	const [userInfo, setUserInfo] = useState<userInfo | "">(""); // result of getEmployeeInfoAddress

	const userNameChange = (e: any) => {
		setUserName(e.target.value);
	};

	const companyNameChange = (e: any) => {
		setCompanyName(e.target.value);
	};

	const companyUrlChange = (e: any) => {
		setCompanyUrl(e.target.value);
	};

	const fromIdInfoChange = (e: any) => {
		setFromIdInfo(e.target.value);
	};

	const fromIdChange = (e: any) => {
		setFromId(e.target.value);
	};

	const toIdChange = (e: any) => {
		setToId(e.target.value);
	};

	const sushiChange = (e: any) => {
		setSushi(e.target.value);
	};

	const slackIdChange = (e: any) => {
		setSlackId(e.target.value);
	};

	const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

	const contractAddress =
		process.env.NEXT_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY || "";
	const abi = TokenArtifact.abi; // コントラクトのABIをここに記述
	const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress);

	const router = useRouter();

	async function createUser() {
		console.log("userName: ", userName);
		console.log("companyName: ", companyName);
		console.log("companyUrl: ", companyUrl);
		const accounts = await web3.eth.getAccounts();
		console.log("accounts: ", accounts);
		const result = await contract.methods
			._createEmployee(userName, companyName, companyUrl, slackId)
			.send({ from: accounts[0] });
		console.log(result);

		// display result (created)
		// setCreatedResult(result);
	}

	async function getEmployeeInfo() {
		const result = await contract.methods._getEmployeeInfo(fromIdInfo).call();
		console.log("getEmployeeInfo: ", result);

		// display user Info
		setEmployeeInfo(result);
	}

	async function sendSushi() {
		const accounts = await web3.eth.getAccounts();
		const result = await contract.methods
			._sendSushi(fromId, toId, sushi)
			.send({ from: accounts[0] });
		console.log("setEmployeeJoinCompany: ", result);

		// display send result
		setSendResult(result);
	}

	async function getAllThings() {
		const result = await contract.methods._getAllThings().call();
		console.log("getAllThings: ", result);

		// display all data (map)
		setAllData(result);
	}

	async function getEmployeeInfoAddress() {
		const accounts = await web3.eth.getAccounts();
		const result = await contract.methods
			.getEmployeeInfoAddress()
			.call({ from: accounts[0] });
		console.log("getEmployeeInfoAddress: ", result);

		// display user address
		setUserAddress(result[1]);
	}

	async function getEmployeeInfoBySlackId() {
		const accounts = await web3.eth.getAccounts();
		const result = await contract.methods
			.getEmployeeInfoSlack(slackId)
			.call({ from: accounts[0] });
		console.log("getEmployeeInfoBySlackId: ", result);

		// display user info
		setUserInfo(result[1]);
	}

	return (
		<div className="px-0 w-full flex justify-center items-center">
			<main className="min-h-screen w-3/5 px-16 flex-1 flex flex-col justify-center items-center">
				<h1 className="m-0 leading-normal text-7xl">
					Welcome to Sushi Career!
				</h1>

				<div>
					<p className="mt-12 mb-8 leading-6 text-base">User form</p>
				</div>
				<div className="flex space-x-3">
					{/* left */}
					<div className="bg-slate-800 w-1/3 p-5 h-80 rounded-md">
						{/* register */}
						<div className="flex-col flex p-3 space-y-6">
							<input
								type="text"
								name="user_name"
								value={userName}
								onChange={userNameChange}
								placeholder="Your Name"
								className="rounded-md p-1"
							/>
							<input
								type="text"
								name="company_name"
								value={companyName}
								onChange={companyNameChange}
								placeholder="Your Company Name"
								className="rounded-md p-1"
							/>
							<input
								type="text"
								name="company_url"
								value={companyUrl}
								onChange={companyUrlChange}
								placeholder="Your Company Url"
								className="rounded-md p-1"
							/>
							<input
								type="text"
								name="slack_id"
								value={slackId}
								onChange={slackIdChange}
								placeholder="Your Slack ID"
								className="rounded-md p-1"
							/>
							<button className="bg-white p-1 rounded" onClick={createUser}>
								Register
							</button>
						</div>
						{/* <div>{createdResult && <div>{createdResult}</div>}</div> */}
						<br />
					</div>

					{/* right */}
					<div className="bg-slate-800 p-5 rounded-md space-y-3 w-2/3">
						{/* <div className="space-x-3">
							<input
								type="text"
								name="from_id_info"
								value={fromIdInfo}
								onChange={fromIdInfoChange}
								placeholder="Your Id"
								className="rounded-md p-1"
							/>
							<button
								className="bg-white p-1 rounded"
								onClick={getEmployeeInfo}
							>
								get User Info
							</button>
						</div>
						<div>
							{employeeInfo && (
								<div className="bg-white rounded-md p-1">
									<p>CompanyName: {employeeInfo.companyName}</p>
									<p>CompanyURL: {employeeInfo.companyUrl}</p>
									<p>EmployeeAddress: {employeeInfo.employeeAddress}</p>
									<p>EmployeeName: {employeeInfo.employeeName}</p>
									<p>EmployeeSlackId: {employeeInfo.employeeSlackId}</p>
								</div>
							)}
						</div> */}

						{/* <div className="space-x-3">
						<input
							type="text"
							name="from_id"
							value={fromId}
							onChange={fromIdChange}
							placeholder="Your Id"
							className="rounded-md p-1"
						/>
						<input
							type="text"
							name="to_id"
							value={toId}
							onChange={toIdChange}
							placeholder="Send Id"
							className="rounded-md p-1"
						/>
						<input
							type="text"
							name="sushi"
							value={sushi}
							onChange={sushiChange}
							placeholder="Sushi"
							className="rounded-md p-1"
						/>
						<button className="bg-white p-1 rounded" onClick={sendSushi}>
							Send Sushi
						</button>
					</div> */}
						{/* <div>{sendResult && <div>{sendResult}</div>}</div> */}
						{/* <br />
						<div className="space-x-3">
							<input
								type="text"
								name="slack_id"
								value={slackId}
								onChange={slackIdChange}
								placeholder="Slack ID"
								className="rounded-md p-1"
							/>
							<button
								onClick={getEmployeeInfoBySlackId}
								className="bg-white p-1 rounded"
							>
								get User Info by Slack ID
							</button>
						</div>
						<div>
							{userInfo && (
								<div className="bg-white rounded-md p-1">
									<p>CompanyName: {userInfo.companyName}</p>
									<p>CompanyURL: {userInfo.companyUrl}</p>
									<p>EmployeeAddress: {userInfo.employeeAddress}</p>
									<p>EmployeeName: {userInfo.employeeName}</p>
									<p>EmployeeSlackId: {userInfo.employeeSlackId}</p>
								</div>
							)}
						</div>
						<br /> */}
						<div className="justify-center text-center">
							<button
								onClick={getEmployeeInfoAddress}
								className="bg-white p-1 rounded"
							>
								Get User Info by Address
							</button>
						</div>
						<div>
							{userAddress && (
								<div className="bg-white rounded-md p-1 w-96">
									<p>CompanyName: {userAddress.companyName}</p>
									<p>CompanyURL: {userAddress.companyUrl}</p>
									<p>EmployeeAddress: {userAddress.employeeAddress}</p>
									<p>EmployeeName: {userAddress.employeeName}</p>
									<p>EmployeeSlackId: {userAddress.employeeSlackId}</p>
								</div>
							)}
						</div>
						<br />

						{/* <div>
							<button onClick={getAllThings} className="bg-white p-1 rounded">
								Get AllThings
							</button>
						</div>
						<div className="space-y-2">
							{allData &&
								allData.map((data: userInfo, i: number) => (
									<div
										className="bg-white rounded-md p-1 cursor-pointer"
										key={i}
										onClick={() => {
											router.push(`/user/${i}`);
										}}
									>
										<p>CompanyName: {data.companyName}</p>
										<p>CompanyURL: {data.companyUrl}</p>
										<p>EmployeeAddress: {data.employeeAddress}</p>
										<p>EmployeeName: {data.employeeName}</p>
										<p>EmployeeSlackId: {data.employeeSlackId}</p>
									</div>
								))}
						</div> */}
					</div>
				</div>
				<div className={styles.connect}>{/* <ConnectWallet /> */}</div>
			</main>
		</div>
	);
};

export default User;
