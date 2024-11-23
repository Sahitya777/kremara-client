import {Signature, RpcProvider, TypedData, Account, CallData, num, stark, ArraySignatureType} from 'starknet';

export async function VerifySignature(message: TypedData, address : string, signature : any){
    let parsedAddress = address;
  try {
    parsedAddress = standariseAddress(address);
  } catch (e) {
    throw new Error('Invalid address');
  }
  // console.log(parsedAddress);
  // console.log(signature,"signature");
  const parsedSignature =JSON.parse(signature) as string[];
  if (!parsedSignature || parsedSignature.length <= 0) {
    throw new Error('Signature parsing failed');
  }

  const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
  });

  const myAccount = new Account(provider, parsedAddress, '');

  const hash = await myAccount.hashMessage(message);

  const function_sigs = ['is_valid_signature', 'isValidSignature'];
  const signatures = [
    parsedSignature,
    parsedSignature.slice(parsedSignature.length - 2, parsedSignature.length),
  ];

  let isValid = false;
  for (const fn_sig of function_sigs) {
    for (const sig of signatures) {
      try {
        // console.log(`Checking: ${fn_sig}`);
        // console.log(`Signature: ${JSON.stringify(sig)}`);
        isValid = await verifyMessageHash(myAccount, hash, sig, fn_sig);
        console.debug('isValid', isValid);
        break;
      } catch (error) {
        console.warn(`verification failed [${fn_sig}]:`, error);
      }
    }
    if (isValid) {
      // console.log(isValid,"valid")
      return isValid
      break;
    }
  }
  console.log(isValid,'validator')
  return isValid
}

async function verifyMessageHash(
    account: Account,
    hash: string,
    signature: string[],
    entrypoint = 'isValidSignature',
  ) {
    try {
      console.log('entry')
      const resp = await account.callContract({
        contractAddress: account.address,
        entrypoint,
        calldata: CallData.compile({
          hash: num.toBigInt(hash).toString(),
          signature: stark.formatSignature(signature),
        }),
      });
      console.debug('verifyMessageHash resp', resp);
      if (Number(resp[0]) == 0) {
        throw new Error('Invalid signature');
      }
      return true;
    } catch (err: any) {
      console.error('Error verifying signature:', err);
      if (
        [
          'argent/invalid-signature',
          'is invalid, with respect to the public key',
        ].some((errMessage) => err.message.includes(errMessage))
      ) {
        throw Error('Invalid signature');
      }
      throw Error(
        `Signature verification request is rejected by the network: ${err}`,
      );
    }
}

function standariseAddress(address: string | bigint) {
    return num.getHexString(num.getDecimalString(address.toString()));
}