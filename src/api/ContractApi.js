import { Conflux } from "js-conflux-sdk";
import { abi } from '../contracts/Main.json';

const cfxNetwork= 'https://test.confluxrpc.com';
const defaultPrivateKey = '0xba32959bc0a2479108c329099b4bdcd4def8713c52d61cfd95a4598507d27870';
const contractAddress = 'cfxtest:acbtsya8ykrtu01a1ub5x0rmnj9bu0pfga6t56pert';

function logsHanlder(contract, logs) {
  let logsDecoded = {};
  for(let i=0; i<logs.length; i++) {
    let logDecoded = contract.abi.decodeLog(logs[i]);
    logsDecoded[logDecoded.name] = logDecoded;
  }

  return logsDecoded;
}

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

  if(res.outcomeStatus === 0) {
    let logs = logsHanlder(contract, res.logs);
    console.log(logs);
    if('ProduceCommodity' in logs) {
      return {
        success: true,
        producer: logs.ProduceCommodity.object._producer,
        id: logs.ProduceCommodity.object._commodity_id
      }
    } else {
      return {
        success: false,
      }
    }
  }
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
  
  if(res.outcomeStatus === 0) return {
    success: true,
    transaction: res.transactionHash
  };
  else return {
    success: false,
  };
}