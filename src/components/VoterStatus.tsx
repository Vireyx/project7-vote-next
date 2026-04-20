type Props = {
  status: string;
};

export default function VoterStatus({ status }: Props) {
  return (
    <div className="card">
      <h2>Статус</h2>
      <p>{status}</p>
    </div>
  );
}