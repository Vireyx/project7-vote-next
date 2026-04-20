"use client";

import { Contract } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/contract";

export function useBallot(signerOrProvider: any) {
  const contract =
    signerOrProvider
      ? new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider)
      : null;

  const getProposals = async () => {
    if (!contract) return [];

    const count = Number(await contract.getProposalsCount());
    const proposals = [];

    for (let i = 0; i < count; i++) {
      const proposal = await contract.getProposal(i);
      proposals.push({
        index: i,
        name: proposal[0],
        voteCount: proposal[1].toString(),
      });
    }

    return proposals;
  };

  const giveRightToVote = async (address: string) => {
    if (!contract) return;
    const tx = await contract.giveRightToVote(address);
    await tx.wait();
  };

  const delegateVote = async (address: string) => {
    if (!contract) return;
    const tx = await contract.delegate(address);
    await tx.wait();
  };

  const vote = async (proposalIndex: number) => {
    if (!contract) return;
    const tx = await contract.vote(proposalIndex);
    await tx.wait();
  };

  const getWinner = async () => {
    if (!contract) return "";
    return await contract.getWinnerNameString();
  };

  return {
    getProposals,
    giveRightToVote,
    delegateVote,
    vote,
    getWinner,
  };
}