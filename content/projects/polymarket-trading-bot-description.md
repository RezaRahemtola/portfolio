[Polymarket](https://polymarket.com) is a blockchain-based prediction market where you can bet on future events across
various topics.

I was already using it as a hedging tool when yields are attractive, but I started studying bots when I came across a
few posts on X ([like this one](https://x.com/thejayden/status/1996281508550877314)) trying to dissect the logic of the
most profitable bots.

After many tests, exploration, data collection & analysis and around $500 lost testing various strategies (as paper
trading simulation has its limits, like reliably replicate orders filling & available liquidity), I managed to find &
implement a profitable strategy on short time crypto markets (15min & 1h).

Some statistics as of now (fetched from
the [PredictFolio](https://predictfolio.com/@0xc0fd74f90C717431FE2fc9AFD25D310D3BAb0255-1768261238207) API):

- All-Time PnL: **$ALL_TIME_PNL**
- All-Time Trading volume: **$ALL_TIME_VOLUME**
- Last month PnL: **$LAST_MONTH_PNL**
- Current balance: **$BALANCE**

The bot is written in TypeScript with the [Polymarket client](https://github.com/Polymarket/clob-client), and I'm also
using several Python scripts to keep collecting data & evaluate different scenarios to optimize the performance.
I'm targeting a monthly PnL of $5,000 by May 2026 and $10,000 by September 2026 after various improvements I'm
planning to implement.

I won't share the code or the strategy used for obvious reasons, but you can verify that I am the owner of this
Polymarket account by following these steps:

- Go the [profile page](https://polymarket.com/@0xc0fd74f90C717431FE2fc9AFD25D310D3BAb0255-1768261238207) and click
  the "Copy Address" button next to the username, which should give you this address
  `0xc0fd74f90c717431fe2fc9afd25d310d3bab0255`
- Go on [PolygonScan](https://polygonscan.com/), paste the address, and
  once [on the page](https://polygonscan.com/address/0xc0fd74f90c717431fe2fc9afd25d310d3bab0255)
  click ["Internal Transactions"](https://polygonscan.com/address/0xc0fd74f90c717431fe2fc9afd25d310d3bab0255#internaltx)
  then [on the hash](https://polygonscan.com/tx/0x4eeb74374432c159e0dc46816091f8931ceab649ee9164dfd5b65152368ee56b) of
  the "Contract Creation" transaction
- At the top you should see that this Polymarket contract was created by the address [
  `0xf528c437bd05b77beb86a625a27459a1cb739036`](https://polygonscan.com/address/0xf528c437bd05b77beb86a625a27459a1cb739036),
  and on the page of this address you can see it was funded by my main
  address [rezarah.eth](https://app.ens.domains/rezarah.eth)
