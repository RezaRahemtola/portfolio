interface PolymarketStats {
	balance: number | null;
	volume: number | null;
	pnl: number | null;
	monthlyPnl: number | null;
}

export async function getPolymarketStats(): Promise<PolymarketStats> {
	try {
		// Fetch USDC balance on Polygon
		const walletAddress = "0xc0fd74f90c717431fe2fc9afd25d310d3bab0255";
		const usdcAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; // USDC.e on Polygon (bridged)
		const balanceOfSignature = "0x70a08231"; // balanceOf(address)
		const paddedAddress = walletAddress.slice(2).padStart(64, "0");

		const [volumeRes, pnlRes, monthlyPnlRes, usdcBalanceRes] = await Promise.all([
			fetch("https://predictfolio.com/api/current-volume?trader_id=0xc0fd74f90c717431fe2fc9afd25d310d3bab0255", {
				next: { revalidate: 3600 },
			}),
			fetch("https://predictfolio.com/api/current-pnl?trader_id=0xc0fd74f90c717431fe2fc9afd25d310d3bab0255", {
				next: { revalidate: 3600 },
			}),
			fetch(
				"https://user-pnl-api.polymarket.com/user-pnl?user_address=0xc0fd74f90c717431fe2fc9afd25d310d3bab0255&interval=1m&fidelity=1d",
				{
					next: { revalidate: 3600 },
				},
			),
			fetch("https://polygon-rpc.com", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					jsonrpc: "2.0",
					method: "eth_call",
					params: [
						{
							to: usdcAddress,
							data: `${balanceOfSignature}${paddedAddress}`,
						},
						"latest",
					],
					id: 1,
				}),
				next: { revalidate: 3600 },
			}),
		]);

		const volumeData = await volumeRes.json();
		const pnlData = await pnlRes.json();
		const monthlyPnlData = await monthlyPnlRes.json();
		const usdcBalanceData = await usdcBalanceRes.json();

		const volume = volumeData[0]?.amount ?? null;
		const pnl = pnlData[0]?.amount ?? null;
		const monthlyPnl =
			monthlyPnlData && Array.isArray(monthlyPnlData) && monthlyPnlData.length > 0
				? monthlyPnlData[monthlyPnlData.length - 1].p
				: null;

		// Parse USDC balance (6 decimals for USDC)
		let balance: number | null = null;
		if (usdcBalanceData?.result) {
			const balanceHex = usdcBalanceData.result;
			const balanceWei = BigInt(balanceHex);
			balance = Number(balanceWei) / 1e6; // USDC has 6 decimals
		}

		return { balance, volume, pnl, monthlyPnl };
	} catch (error) {
		console.error("Failed to fetch polymarket stats:", error);
		return { balance: null, volume: null, pnl: null, monthlyPnl: null };
	}
}
