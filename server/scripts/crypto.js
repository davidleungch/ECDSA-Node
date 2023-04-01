const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, hexToBytes } = require("ethereum-cryptography/utils");

const hashMessage = (message) => keccak256(Uint8Array.from(message));

const PublickeyToAddress = (publicKey) => {
  return toHex(publicKey);
};

const SignatureToAddress = (message, signature) => {
  const hash = hashMessage(message);
  const fullSignatureBytes = hexToBytes(signature);
  const recoveryBit = fullSignatureBytes[0];
  const signatureBytes = fullSignatureBytes.slice(1);
  const publicKey = secp.recoverPublicKey(hash, signatureBytes, recoveryBit);
  const address = PublickeyToAddress(publicKey);
  return address;
};

module.exports = { SignatureToAddress };
