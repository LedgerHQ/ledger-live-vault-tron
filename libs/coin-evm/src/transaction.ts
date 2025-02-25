import { getAccountUnit } from "@ledgerhq/coin-framework/account/index";
import { formatCurrencyUnit } from "@ledgerhq/coin-framework/currencies/index";
import {
  formatTransactionStatusCommon as formatTransactionStatus,
  fromTransactionCommonRaw,
  fromTransactionStatusRawCommon as fromTransactionStatusRaw,
  toTransactionCommonRaw,
  toTransactionStatusRawCommon as toTransactionStatusRaw,
} from "@ledgerhq/coin-framework/transaction/common";
import type { Account } from "@ledgerhq/types-live";
import { BigNumber } from "bignumber.js";
import { ethers } from "ethers";
import ERC20ABI from "./abis/erc20.abi.json";
import { transactionToEthersTransaction } from "./adapters";
import type {
  Transaction as EvmTransaction,
  EvmTransactionEIP1559,
  EvmTransactionLegacy,
  TransactionRaw as EvmTransactionRaw,
  FeeData,
} from "./types";

export const DEFAULT_GAS_LIMIT = new BigNumber(21000);

/**
 * Format the transaction for the CLI
 */
export const formatTransaction = (
  { mode, amount, recipient, useAllAmount }: EvmTransaction,
  account: Account,
): string =>
  `
${mode.toUpperCase()} ${
    useAllAmount
      ? "MAX"
      : amount.isZero()
      ? ""
      : " " +
        formatCurrencyUnit(getAccountUnit(account), amount, {
          showCode: true,
          disableRounding: true,
        })
  }${recipient ? `\nTO ${recipient}` : ""}`;

/**
 * Serializer raw to transaction
 */
export const fromTransactionRaw = (rawTx: EvmTransactionRaw): EvmTransaction => {
  const common = fromTransactionCommonRaw(rawTx);
  const tx: Partial<EvmTransaction> = {
    ...common,
    family: rawTx.family,
    mode: rawTx.mode,
    chainId: rawTx.chainId,
    nonce: rawTx.nonce,
    gasLimit: new BigNumber(rawTx.gasLimit),
    feesStrategy: rawTx.feesStrategy,
    type: rawTx.type ?? 0, // if rawTx.type is undefined, transaction will be considered legacy and therefore type 0
  };

  if (rawTx.data) {
    tx.data = Buffer.from(rawTx.data, "hex");
  }

  if (rawTx.gasPrice) {
    tx.gasPrice = new BigNumber(rawTx.gasPrice);
  }

  if (rawTx.maxFeePerGas) {
    tx.maxFeePerGas = new BigNumber(rawTx.maxFeePerGas);
  }

  if (rawTx.maxPriorityFeePerGas) {
    tx.maxPriorityFeePerGas = new BigNumber(rawTx.maxPriorityFeePerGas);
  }

  if (rawTx.additionalFees) {
    tx.additionalFees = new BigNumber(rawTx.additionalFees);
  }

  return tx as EvmTransaction;
};

/**
 * Serializer transaction to raw
 */
export const toTransactionRaw = (tx: EvmTransaction): EvmTransactionRaw => {
  const common = toTransactionCommonRaw(tx);
  const txRaw: Partial<EvmTransactionRaw> = {
    ...common,
    family: tx.family,
    mode: tx.mode,
    chainId: tx.chainId,
    nonce: tx.nonce,
    gasLimit: tx.gasLimit.toFixed(),
    feesStrategy: tx.feesStrategy,
    type: tx.type,
  };

  if (tx.data) {
    txRaw.data = Buffer.from(tx.data).toString("hex");
  }

  if (tx.gasPrice) {
    txRaw.gasPrice = tx.gasPrice.toFixed();
  }

  if (tx.maxFeePerGas) {
    txRaw.maxFeePerGas = tx.maxFeePerGas.toFixed();
  }

  if (tx.maxPriorityFeePerGas) {
    txRaw.maxPriorityFeePerGas = tx.maxPriorityFeePerGas.toFixed();
  }

  if (tx.additionalFees) {
    txRaw.additionalFees = tx.additionalFees.toFixed();
  }

  return txRaw as EvmTransactionRaw;
};

/**
 * Returns the data necessary to execute smart contracts.
 * As of now, only used to create ERC20 transfers' data
 */
export const getTransactionData = (transaction: EvmTransaction): Buffer | undefined => {
  const contract = new ethers.utils.Interface(ERC20ABI);
  const data = contract.encodeFunctionData("transfer", [
    transaction.recipient,
    transaction.amount.toFixed(),
  ]);

  return data ? Buffer.from(data.slice(2), "hex") : undefined;
};

/**
 * Returns a transaction with the correct type and entries depending
 * on the network compatiblity.
 */
export const getTypedTransaction = (
  transaction: EvmTransaction,
  feeData: FeeData,
): EvmTransaction => {
  // If the blockchain is supporting EIP-1559, use maxFeePerGas & maxPriorityFeePerGas
  if (feeData.maxFeePerGas && feeData.maxPriorityFeePerGas) {
    delete transaction.gasPrice;
    return {
      ...transaction,
      maxFeePerGas: feeData.maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      type: 2,
    } as EvmTransactionEIP1559;
  }

  // Else just use a legacy transaction
  delete transaction.maxFeePerGas;
  delete transaction.maxPriorityFeePerGas;
  return {
    ...transaction,
    gasPrice: feeData.gasPrice || new BigNumber(0),
    type: 0,
  } as EvmTransactionLegacy;
};

/**
 * Serialize a Ledger Live transaction into an hex string
 */
export const getSerializedTransaction = (
  tx: EvmTransaction,
  signature?: Partial<ethers.Signature>,
): string => {
  const unsignedEthersTransaction = transactionToEthersTransaction(tx);

  return ethers.utils.serializeTransaction(
    unsignedEthersTransaction,
    signature as ethers.Signature,
  );
};

export default {
  formatTransaction,
  fromTransactionRaw,
  toTransactionRaw,
  toTransactionStatusRaw,
  formatTransactionStatus,
  fromTransactionStatusRaw,
  getSerializedTransaction,
};
