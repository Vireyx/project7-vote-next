type Proposal = {
  index: number;
  name: string;
  voteCount: string;
};

type Props = {
  proposals: Proposal[];
  onLoad: () => void;
};

export default function ProposalsList({ proposals, onLoad }: Props) {
  return (
    <div className="card">
      <h2>Предложения</h2>
      <button onClick={onLoad}>Показать предложения</button>

      <div className="proposals-list">
        {proposals.map((proposal) => (
          <div key={proposal.index} className="proposal-item">
            #{proposal.index}: {proposal.name} — голосов: {proposal.voteCount}
          </div>
        ))}
      </div>
    </div>
  );
}