type Props = {
  account: string;
  onConnect: () => void;
};

export default function WalletPanel({ account, onConnect }: Props) {
  return (
    <div className="card">
      <h2>Подключение</h2>
      <button onClick={onConnect}>Подключить MetaMask</button>
      <p>{account ? `Подключён: ${account}` : "Кошелёк не подключён"}</p>
    </div>
  );
}