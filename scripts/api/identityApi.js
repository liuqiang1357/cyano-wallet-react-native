import { Crypto, Identity, utils } from 'ontology-ts-sdk';
import { v4 as uuid } from 'uuid';
import { getWallet } from './authApi';
const PrivateKey = Crypto.PrivateKey;

export function decryptIdentity(identity, password, scrypt) {
  const control = identity.controls[0];
  const saltHex = Buffer.from(control.salt, 'base64').toString('hex');
  const encryptedKey = control.encryptedKey;
  
  return encryptedKey.decrypt(password, control.address, saltHex, {
    blockSize: scrypt.r,
    cost: scrypt.n,
    parallel: scrypt.p,
    size: scrypt.dkLen
  });
}

export function identitySignUp(password, scrypt, neo) {
  const mnemonics = utils.generateMnemonic(32);
  return identityImportMnemonics(mnemonics, password, scrypt, neo);
}

export function identityImportMnemonics(mnemonics, password, scrypt, neo) {
  const bip32Path = neo ? "m/44'/888'/0'/0/0" : "m/44'/1024'/0'/0/0";
  const privateKey = PrivateKey.generateFromMnemonic(mnemonics, bip32Path);
  const wif = privateKey.serializeWIF();

  const result = identityImportPrivateKey(wif, password, scrypt);

  return {
    mnemonics,
    ...result
  };
}

export function identityImportPrivateKey(wif, password, scrypt) {
  const scryptParams = {
    blockSize: scrypt.r,
    cost: scrypt.n,
    parallel: scrypt.p,
    size: scrypt.dkLen
  };

  const privateKey = PrivateKey.deserializeWIF(wif);
  const publicKey = privateKey.getPublicKey();

  const identity = Identity.create(privateKey, password, uuid(), scryptParams);
  
  return {
    encryptedWif: identity.controls[0].encryptedKey.serializeWIF(),
    idPk: publicKey.serializeHex(),
    identity,
    ontId: identity.ontid,
    wif
  };
}

export function getIdentity(walletEncoded) {
  const wallet = getWallet(walletEncoded);
  if (wallet.defaultOntid !== '') {
    return wallet.defaultOntid;
  } else {
    return null;
  }
}
