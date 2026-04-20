"use client";

import { useState } from "react";
import { BrowserProvider } from "ethers";

export function useWallet() {
  const [account, setAccount] = useState<string>("");
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<any>(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Установи MetaMask");
        return;
      }

      const browserProvider = new BrowserProvider(window.ethereum);
      await browserProvider.send("eth_requestAccounts", []);
      const currentSigner = await browserProvider.getSigner();
      const address = await currentSigner.getAddress();

      setProvider(browserProvider);
      setSigner(currentSigner);
      setAccount(address);
    } catch (error) {
      console.error("Ошибка подключения кошелька:", error);
    }
  };

  return { account, provider, signer, connectWallet };
}