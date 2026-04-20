"use client";

import { useState } from "react";
import { useWallet } from "../hooks/useWallet";
import { useBallot } from "../hooks/useBallot";
import { CONTRACT_ADDRESS } from "../lib/contract";

import WalletPanel from "../components/WalletPanel";
import VoterStatus from "../components/VoterStatus";
import ProposalsList from "../components/ProposalsList";
import GiveRightForm from "../components/GiveRightForm";
import DelegateForm from "../components/DelegateForm";
import VoteForm from "../components/VoteForm";
import WinnerCard from "../components/WinnerCard";

export default function Home() {
  const { account, provider, signer, connectWallet } = useWallet();
  const {
    getProposals,
    giveRightToVote,
    delegateVote,
    vote,
    getWinner,
  } = useBallot(signer || provider);

  const [status, setStatus] = useState("Ожидание действий...");
  const [proposals, setProposals] = useState<
    { index: number; name: string; voteCount: string }[]
  >([]);
  const [winner, setWinner] = useState("");
  const [isTie, setIsTie] = useState(false);

  const [voterAddress, setVoterAddress] = useState("");
  const [delegateAddress, setDelegateAddress] = useState("");
  const [proposalIndex, setProposalIndex] = useState("");

  const loadProposals = async () => {
    try {
      const data = await getProposals();
      setProposals(data);
      setStatus("Список предложений загружен");
    } catch (error) {
      console.error(error);
      setStatus("Ошибка загрузки предложений");
    }
  };

  const handleGiveRight = async (address: string) => {
    try {
      setStatus("Отправка транзакции...");
      await giveRightToVote(address);
      setStatus("Право голоса успешно выдано");
    } catch (error) {
      console.error(error);
      setStatus("Ошибка при выдаче права голоса");
    }
  };

  const handleDelegate = async (address: string) => {
    try {
      setStatus("Отправка транзакции...");
      await delegateVote(address);
      setStatus("Голос успешно делегирован");
    } catch (error) {
      console.error(error);
      setStatus("Ошибка при делегировании");
    }
  };

  const handleVote = async (index: number) => {
    try {
      setStatus("Отправка транзакции...");
      await vote(index);
      setStatus("Голос успешно отправлен");
    } catch (error) {
      console.error(error);
      setStatus("Ошибка при голосовании");
    }
  };

  const loadWinner = async () => {
  try {
    const data = await getProposals();

    if (!data.length) {
      setWinner("");
      setIsTie(false);
      setStatus("Нет данных о предложениях");
      return;
    }

    const maxVotes = Math.max(...data.map((p) => Number(p.voteCount)));
    const winners = data.filter((p) => Number(p.voteCount) === maxVotes);

    if (winners.length > 1) {
      setIsTie(true);
      setWinner(winners.map((w) => w.name).join(", "));
      setStatus("Обнаружена ничья");
    } else {
      setIsTie(false);
      setWinner(winners[0].name);
      setStatus("Победитель успешно определён");
    }
  } catch (error) {
    console.error(error);
    setStatus("Ошибка получения победителя");
  }
};

  return (
    <main className="container">
      <h1>Ballot DApp (Next.js)</h1>

      <WalletPanel account={account} onConnect={connectWallet} />

      <div className="card">
        <h2>Информация о контракте</h2>
        <p>Адрес контракта: {CONTRACT_ADDRESS}</p>
      </div>

      <ProposalsList proposals={proposals} onLoad={loadProposals} />

      <GiveRightForm onGiveRight={handleGiveRight} />

      <DelegateForm onDelegate={handleDelegate} />

      <VoteForm onVote={handleVote} />

      <WinnerCard winner={winner} isTie={isTie} onLoadWinner={loadWinner} />

      <VoterStatus status={status} />
    </main>
  );
}