import bitcoin from "../families/bitcoin/cli-transaction";
import cardano from "../families/cardano/cli-transaction";
import celo from "../families/celo/cli-transaction";
import cosmos from "../families/cosmos/cli-transaction";
import crypto_org from "../families/crypto_org/cli-transaction";
import elrond from "../families/elrond/cli-transaction";
import ethereum from "../families/ethereum/cli-transaction";
import filecoin from "../families/filecoin/cli-transaction";
import hedera from "../families/hedera/cli-transaction";
import near from "../families/near/cli-transaction";
import ripple from "../families/ripple/cli-transaction";
import solana from "../families/solana/cli-transaction";
import stellar from "../families/stellar/cli-transaction";
import tezos from "../families/tezos/cli-transaction";
import tron from "../families/tron/cli-transaction";
import { makeLRUCache } from "@ledgerhq/live-network/cache";
import network from "@ledgerhq/live-network/network";
import polkadotCreateCliTools from "@ledgerhq/coin-polkadot/cli-transaction";
import algorandCreateCliTools from "@ledgerhq/coin-algorand/cli-transaction";
import evmCreateCliTools from "@ledgerhq/coin-evm/cli-transaction";

export default {
  bitcoin,
  cardano,
  celo,
  cosmos,
  crypto_org,
  elrond,
  ethereum,
  filecoin,
  hedera,
  near,
  ripple,
  solana,
  stellar,
  tezos,
  tron,
  polkadot: polkadotCreateCliTools(network, makeLRUCache),
  algorand: algorandCreateCliTools(network, makeLRUCache),
  evm: evmCreateCliTools(network, makeLRUCache),
};
