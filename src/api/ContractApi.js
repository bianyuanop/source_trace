import { Conflux } from "js-conflux-sdk";
import { abi } from '../contracts/Main.json';

const cfxNetwork= 'https://test.confluxrpc.com';
const defaultPrivateKey = '0xba32959bc0a2479108c329099b4bdcd4def8713c52d61cfd95a4598507d27870';

export const queryCommodity = async (id) => {
  const cfx = new Conflux({
    url: cfxNetwork,
    networkId: 1,
  });
  cfx.wallet.addPrivateKey(defaultPrivateKey);

  const contract = cfx.Contract({abi, address:'cfxtest:acaet7ybsyaw2twazenavnpk7fwp6zs5subnjadhzh'});
  let result = await contract.getCommodity(id);

  return result;
};


//export const producerCommodity = async 