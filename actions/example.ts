import {
	ActionFn,
	Context,
	Event,
	TransactionEvent,
} from '@tenderly/actions';
import axios from 'axios';
// import { ethers } from 'ethers';

async function getCoinSymbol(addr: string): Promise<string> {
	const requestURL = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${addr}`;
	const response = await axios.get<{ symbol: string }>(requestURL);
	return response.data.symbol;

}

export const aaveDepositsFn: ActionFn = async (context: Context, event: Event) => {
	let txEvent = event as TransactionEvent;
	let depositor = txEvent.from; // right
	let depositToken = txEvent.logs[3].address;
	let amount = txEvent.logs[3].data;
	let tokenSymbol = await getCoinSymbol(depositToken);
	console.log(`Deposit of token ${tokenSymbol}, amount: ${amount}, depositor: ${depositor}`);
}
