import { Conflux } from "js-conflux-sdk";
import { abi } from '../contracts/Main.json';

const cfxNetwork= 'https://test.confluxrpc.com';
const defaultPrivateKey = '0xba32959bc0a2479108c329099b4bdcd4def8713c52d61cfd95a4598507d27870';
const contractAddress = 'cfxtest:acc8ctvggnkksv4g2t3zcae2zs6m32nfv6dn9xt77n';

export const queryCommodity = async (id) => {
  const cfx = new Conflux({
    url: cfxNetwork,
    networkId: 1,
  });
  cfx.wallet.addPrivateKey(defaultPrivateKey);

  const contract = cfx.Contract({abi, address: contractAddress});
  let result = await contract.getCommodity(id);

  return result;
};

export const produce = async (privateKey, name, describe, loc, event) => {
  const cfx = new Conflux({
    url: cfxNetwork,
    networkId: 1,
  });
  const contract = cfx.Contract({abi, address: contractAddress});

  const account = cfx.wallet.addPrivateKey(privateKey);

  let res = await contract.produce(name, describe, loc, event).sendTransaction({from: account}).executed();
  let count = -1;
  if(res.outcomeStatus === 0) count = parseInt(await contract.counter()) - 1;

  return count;
}

export const sell = async (privateKey, id, loc, event) => {
  const cfx = new Conflux({
    url: cfxNetwork,
    networkId: 1,
  });
  const contract = cfx.Contract({abi, address: contractAddress});

  const account = cfx.wallet.addPrivateKey(privateKey);

  let res = await contract.sell(id, loc, event).sendTransaction({from: account}).executed();
  if(res.outcomeStatus === 0) return true;
  else return false;
}

export const deliver = async (privateKey, id, loc, event) => {
  const cfx = new Conflux({
    url: cfxNetwork,
    networkId: 1,
  });
  const contract = cfx.Contract({abi, address: contractAddress});

  const account = cfx.wallet.addPrivateKey(privateKey);

  let res = await contract.deliver(id, loc, event).sendTransaction({from: account}).executed();
  if(res.outcomeStatus === 0) return true;
  else return false;
}