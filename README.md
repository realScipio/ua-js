# ua-js
Repo to calculate UserAuthority (UA) via follower data within Steem.

### Implementation plan
1) read all follower transactions, chronologically, from the blockchain
- for a Proof of Concept (PoC), we will however begin with retrieving data from steemdata.com (MongoDB)
2) store follower transactions in a temp MongoDB collection: followDB
- update followDB per blockchain block
- include last block id
3) approximate all user UA via multi-iterational substitution, begin with 1 per account, store in temp MongoDB collection: uaDB
- equilibrium state is reached when abs[(it(n) - it(n-1)] < x % (confidence interval to be decided, can be very high)
4) store, as binary, the equilibrium per user as [uid: ua] : ua.db (binary file)
5) hash-encrypt ua.db , store hash in latest blockchain block for consensus
6) witnesses read ua.db per user (let's say 8 bytes per user: UA(user 100,000) is found at byte 800,000
