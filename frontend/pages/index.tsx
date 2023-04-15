import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
	return (
		<div className="px-0">
			<main className="min-h-screen px-16 flex-1 flex flex-col justify-center items-center">
				<h1 className="m-0 leading-normal text-7xl">
					Welcome to Sushi Career!
				</h1>

				<p className="mt-12 mb-8 leading-6 text-base">
					Get started by configuring your desired network in{" "}
				</p>

				<div className="mb-8 w-56">
					<ConnectWallet />
				</div>

				<div className="flex items-center justify-center flex-wrap max-w-screen-xl">
					<Link
						href="/user"
						className="bg-slate-800 m-4 p-6 text-left no-underline border rounded-lg max-w-sm text-white"
					>
						<h2>Register User &rarr;</h2>
						<p>Register your wallet</p>
					</Link>

					<Link
						href="/users"
						className="bg-slate-800 m-4 p-6 text-left no-underline border rounded-lg max-w-sm text-white"
					>
						<h2>Users &rarr;</h2>
						<p>employees information.</p>
					</Link>
				</div>
			</main>
		</div>
	);
};

export default Home;
