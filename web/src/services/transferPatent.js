import { web3 } from "../constants/constants";

export const transferPatent = async function (
  fromAddress,
  toAddress,
  tokenID,
  update,
  success,
  error
) {
  const minABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const contract = new web3.eth.Contract(
    minABI,
    "0x7e40600d3f52ccc62fb94187ac6decb8802c22f3"
  );
  try {
    contract.methods
      .safeTransferFrom(fromAddress, toAddress, tokenID)
      .send({ from: fromAddress })
      .on("transactionHash", (hash) => {
        update(hash);
      })
      .then((done) => {
        success(done);
      });
  } catch (err) {
    error(err.message);
  }
};
