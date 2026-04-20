import { useState } from "react";

type Props = {
  onVote: (proposalIndex: number) => void;
};

export default function VoteForm({ onVote }: Props) {
  const [proposalIndex, setProposalIndex] = useState("");

  return (
    <div className="card">
      <h2>Голосование</h2>
      <input
        type="number"
        placeholder="Введите индекс предложения"
        value={proposalIndex}
        onChange={(e) => setProposalIndex(e.target.value)}
      />
      <button onClick={() => onVote(Number(proposalIndex))}>Проголосовать</button>
    </div>
  );
}