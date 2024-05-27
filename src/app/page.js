"use client";

import { useState, useEffect } from "react";
import GateInfoCard from "../components/GateInfoCard";
import gateInfo from "../resources/gateInfo";
import { socket } from "../socket";

const Home = () => {
  const [gateData, setGateData] = useState(gateInfo);

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const handleUpdate = (gate, newInfo) => {};

  return (
    <main className="min-h-screen">
      <div>
        <p>Status: {isConnected ? "connected" : "disconnected"}</p>
        <p>Transport: {transport}</p>
      </div>
      <div className="mb-10 flex flex-col items-center bg-transparent">
        <span className="w-auto inline-block text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-linear-1">
          SITAS
        </span>
        <span className="font-medium md:text-xl sm:text-lg text-md text-[#25316D]">
          Puertas de Embarque
        </span>
      </div>
      <div className="grid min-[1230px]:grid-cols-4 min-[840px]:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {gateData.map((info) => (
          <GateInfoCard key={info.gate} info={info} onUpdate={handleUpdate} />
        ))}
      </div>
    </main>
  );
};

export default Home;
