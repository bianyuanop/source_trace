const { Conflux } = require('js-conflux-sdk');
const { abi } = require('../src/contracts/Main.json');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const privateKeys = {
  sellor: '0x2d84be03a1662c587edb4471fab0d3f62b371f0006d4f57acb2eadc73a4a0837',
  producer: '0x1b699944b3d58b4da2dc17e469df2f2416b7085e401260408a479facde6e8a10',
  deliver: '0xd708bbcf29fef885a19abe4007a75125d94bee51c77ebab24f809c33d1038c30'
};

const cfx = new Conflux({
  url: 'https://test.confluxrpc.com',
  networkId: 1,
});

const contract = cfx.Contract({abi, address:'cfxtest:acbtsya8ykrtu01a1ub5x0rmnj9bu0pfga6t56pert'});

const testQueryCommodity = async ()=> {
  const comm = await contract.getCommodity(0);
  const deliverChain = await contract.getDeliverChain(0);
  console.log(comm);
  console.log(deliverChain);
}

const testDeliverCommodity = async ()=> {
  const account = cfx.wallet.addPrivateKey(privateKeys.deliver);

  const res = await contract.deliver(0,"TestDeliver","Event").sendTransaction({from: account});
  console.log("Receipt: ", res);
}

const testSellCommodity = async ()=> {
  const account = cfx.wallet.addPrivateKey(privateKeys.sellor);

  const res = await contract.sell(0,"TestDeliver","Event").sendTransaction({from: account});
  console.log("Receipt: ", res);


}
const testProduceCommodity = async () => {
  const account = cfx.wallet.addPrivateKey(privateKeys.producer);

  const res = await contract.produce("Test1", "Describe1", "loctaion1", "Event1").sendTransaction({from: account}).executed();

  console.log(res);

  const output = await contract.abi.decodeLog(res.logs[0]);
  console.log(output);

}

testProduceCommodity();