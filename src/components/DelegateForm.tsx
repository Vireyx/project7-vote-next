import { useState } from "react";

type Props = {
  onDelegate: (address: string) => void;
};

export default function DelegateForm({ onDelegate }: Props) {
  const [address, setAddress] = useState("");

  return (
    <div className="card">
      <h2>Делегирование</h2>
      <input
        type="text"
        placeholder="Введите адрес делегата"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={() => onDelegate(address)}>Делегировать голос</button>
    </div>
  );
}