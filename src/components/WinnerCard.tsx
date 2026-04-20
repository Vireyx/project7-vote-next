type Props = {
  winner: string;
  isTie: boolean;
  onLoadWinner: () => void;
};

export default function WinnerCard({ winner, isTie, onLoadWinner }: Props) {
  return (
    <div className="card">
      <h2>Победитель</h2>
      <button onClick={onLoadWinner}>Показать победителя</button>
      <div className="winner-box">
        {winner
          ? isTie
            ? `Ничья: ${winner}`
            : `Победитель: ${winner}`
          : "Пока не определён"}
      </div>
    </div>
  );
}