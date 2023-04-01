import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

const user1 = {
  privateKey:
    "7909d6d515a810f7beca17042e75d6714e4b709c1fa82f2da5519e4494075fbe",
  publicKey:
    "04c10972a8f95a60c12309dd87c94268df11f4c98454ed708df0a534942b6d399867459ff5b4349c346d3c8a31f6ae135e55389f342aa41234b3ab0c93196806c5",
};
const user2 = {
  privateKey:
    "6bf324f1e6712e4315fd23bc7762316f8d0c49ce4371c0e083706e4789a9a6a6",
  publicKey:
    "04bebf0913bf7721a9caf7b6f9396782427b93ff7e5bd87086b9a0b24181bba641ada73a6cb9e13fc1877fe425e58181c7407c4158e5aa1e4a3ae303fd84878ae8",
};

const user3 = {
  privateKey:
    "2ec214dd70a77a41454bf2780cd8f5ba0fc5bb90ec629e2c676301f746431770",
  publicKey:
    "04e1941dc4dd3633f30a5ae82c6d8348637f56fec871e631c95b58695c76d931e6941c4020e44f60abd934e23dcbbd27df86977cd4d75691ecd2ea88e9788300fb",
};

const hashMessage = (message) => keccak256(Uint8Array.from(message));

export async function Sign(privateKey, message) {
  const hash = hashMessage(message);

  const [signature, recoveryBit] = await secp.sign(hash, privateKey, {
    recovered: true,
  });

  const fullSignature = new Uint8Array([recoveryBit, ...signature]);

  return toHex(fullSignature);
}
