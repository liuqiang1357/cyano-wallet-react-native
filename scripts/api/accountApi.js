import { get } from 'lodash';
import { Account, Crypto, utils, Wallet } from 'ontology-ts-sdk';
import { v4 as uuid } from 'uuid';
import { getWallet } from './authApi';

const PrivateKey = Crypto.PrivateKey;

export function decryptAccount(wallet, password) {
  const account = wallet.accounts[0];
  const saltHex = Buffer.from(account.salt, 'base64').toString('hex');
  const encryptedKey = account.encryptedKey;
  const scrypt = wallet.scrypt;

  return encryptedKey.decrypt(password, account.address, saltHex, {
    blockSize: scrypt.r,
    cost: scrypt.n,
    parallel: scrypt.p,
    size: scrypt.dkLen
  });
}

export function accountSignUp(password, neo) {
  const mnemonics = utils.generateMnemonic(32);
  return accountImportMnemonics(mnemonics, password, neo);
}

export function accountImportMnemonics(mnemonics, password, neo) {
  const bip32Path = neo ? "m/44'/888'/0'/0/0" : "m/44'/1024'/0'/0/0";
  const privateKey = PrivateKey.generateFromMnemonic(mnemonics, bip32Path);
  const wif = privateKey.serializeWIF();

  const result = accountImportPrivateKey(wif, password);

  return {
    mnemonics,
    ...result
  };
}

export function accountImportPrivateKey(wif, password) {
  const wallet = Wallet.create(uuid());
  const scrypt = wallet.scrypt;
  const scryptParams = {
    blockSize: scrypt.r,
    cost: scrypt.n,
    parallel: scrypt.p,
    size: scrypt.dkLen
  };

  const privateKey = PrivateKey.deserializeWIF(wif);
  const account = Account.create(privateKey, password, uuid(), scryptParams);

  wallet.addAccount(account);
  wallet.setDefaultAccount(account.address.toBase58());

  return {
    encryptedWif: account.encryptedKey.serializeWIF(),
    wallet: wallet.toJson(),
    wif
  };
}

export function getAddress(walletEncoded) {
  const wallet = getWallet(walletEncoded);
  return wallet.defaultAccountAddress;
}

export function getPublicKey(walletEncoded) {
  const wallet = getWallet(walletEncoded);

  const account = wallet.accounts.find((a) => a.address.toBase58() === wallet.defaultAccountAddress);
  if (account !== undefined) {
    return account.publicKey;
  } else {
    return '';
  }
}

export function isLedgerKey(wallet) {
  return get(wallet.accounts[0].encryptedKey, 'type') === 'LEDGER';
}
