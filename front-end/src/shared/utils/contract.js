export async function createContract (web3, contractAbi, contractAddress) {
  const contract = await new web3.eth.Contract(contractAbi, contractAddress);
  return contract
}
