const { Conflux } = require('js-conflux-sdk');
const { abi } = require('../contracts/Main.json');

const main = async ()=> {
  const cfx = new Conflux({
    url: 'https://test.confluxrpc.com',
    networkId: 1,
  });
  cfx.wallet.addPrivateKey("0xba32959bc0a2479108c329099b4bdcd4def8713c52d61cfd95a4598507d27870");

  const contract = cfx.Contract({abi, address:'cfxtest:acaet7ybsyaw2twazenavnpk7fwp6zs5subnjadhzh'});
  const comm = await contract.getCommodity(0);
  const deliverChain = await contract.getDeliverChain(0);
  console.log(comm);
  console.log(deliverChain);
}

main();