import { useState } from "react";

type Props = {
  onGiveRight: (address: string) => void;
};

export default function GiveRightForm({ onGiveRight }: Props) {
  const [address, setAddress] = useState("");

  return (
    <div className="card">
      <h2>Выдать право голоса</h2>
      <input
        type="text"
        placeholder="Введите адрес пользователя"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={() => onGiveRight(address)}>Выдать право голоса</button>
    </div>
  );
}