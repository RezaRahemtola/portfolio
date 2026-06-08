[Polymarket](https://polymarket.com) offers prediction markets on stock prices, like "Will GOOGL close above $200 by end
of February?".

By buying NO shares on price targets significantly above the current stock price, you're betting the stock won't reach
that price. If you're right, you get $1 per share at expiration. If you're wrong, but you own the actual stock, your
stock gains offset the prediction market loss.

Prediction markets, especially low-liquidity ones, are often inefficient. You can frequently find 20-50%+ APY on
relatively safe scenarios (e.g., betting a stock won't rise 30% in 2 weeks).

This is actually pretty similar to options trading (selling covered calls being the closest example here) without the
downsides (minimum amount of just $1, not forcing you to sell your stock if the option is called...).

This tool scans Polymarket for these opportunities, ranks them by attractiveness based on delta the from current price,
time to expiry and APY, and optionally lets you execute trades directly.

Features include a market scanner, portfolio dashboard, stock holdings tracker for hedge calculations, trade execution,
and automatic redemption of resolved winning positions.
