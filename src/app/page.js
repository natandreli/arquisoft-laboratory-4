"use client";

import { useState, useEffect } from "react";
import GateInfoCard from "../components/GateInfoCard";
import { socket } from "../socket";

const Home = () => {
  const [gateData, setGateData] = useState([
    {
      gate: 1,
      flightNumber: "AV1234",
      destination: "CTG",
      airline: "AVIANCA",
      departureTime: "11:00",
    },
    {
      gate: 2,
      flightNumber: "WG998",
      destination: "BOG",
      airline: "WINGO",
      departureTime: "09:45",
    },
    {
      gate: 3,
      flightNumber: "LA5678",
      destination: "MDE",
      airline: "LATAM",
      departureTime: "13:30",
    },
    {
      gate: 4,
      flightNumber: "AA4321",
      destination: "MIA",
      airline: "AMERICAN AIRLINES",
      departureTime: "14:15",
    },
    {
      gate: 5,
      flightNumber: "AV8765",
      destination: "PEI",
      airline: "AVIANCA",
      departureTime: "08:00",
    },
    {
      gate: 6,
      flightNumber: "CM1234",
      destination: "PTY",
      airline: "COPA AIRLINES",
      departureTime: "10:50",
    },
    {
      gate: 7,
      flightNumber: "KL5678",
      destination: "AMS",
      airline: "KLM",
      departureTime: "12:20",
    },
    {
      gate: 8,
      flightNumber: "DL4321",
      destination: "ATL",
      airline: "DELTA",
      departureTime: "15:00",
    },
    {
      gate: 9,
      flightNumber: "AV8765",
      destination: "SMR",
      airline: "AVIANCA",
      departureTime: "16:40",
    },
    {
      gate: 10,
      flightNumber: "BA1234",
      destination: "LHR",
      airline: "BRITISH AIRWAYS",
      departureTime: "18:30",
    },
    {
      gate: 11,
      flightNumber: "AF5678",
      destination: "CDG",
      airline: "AIR FRANCE",
      departureTime: "20:15",
    },
    {
      gate: 12,
      flightNumber: "LH4321",
      destination: "FRA",
      airline: "LUFTHANSA",
      departureTime: "21:00",
    },
    {
      gate: 13,
      flightNumber: "UA8765",
      destination: "ORD",
      airline: "UNITED AIRLINES",
      departureTime: "07:45",
    },
    {
      gate: 14,
      flightNumber: "IB1234",
      destination: "MAD",
      airline: "IBERIA",
      departureTime: "09:15",
    },
    {
      gate: 15,
      flightNumber: "AV5678",
      destination: "CLO",
      airline: "AVIANCA",
      departureTime: "11:35",
    },
    {
      gate: 16,
      flightNumber: "JJ4321",
      destination: "GRU",
      airline: "LATAM BRASIL",
      departureTime: "13:50",
    },
    {
      gate: 17,
      flightNumber: "AM8765",
      destination: "MEX",
      airline: "AEROMEXICO",
      departureTime: "17:10",
    },
    {
      gate: 18,
      flightNumber: "AV1234",
      destination: "BAQ",
      airline: "AVIANCA",
      departureTime: "19:25",
    },
    {
      gate: 19,
      flightNumber: "AV9988",
      destination: "UIO",
      airline: "AVIANCA",
      departureTime: "05:50",
    },
    {
      gate: 20,
      flightNumber: "EK5678",
      destination: "DXB",
      airline: "EMIRATES",
      departureTime: "23:10",
    },
  ]);

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

    socket.on("gateUpdated", ({ gate, newInfo }) => {
      setGateData((prevGateData) =>
        prevGateData.map((g) =>
          g.gate === gate ? { ...g, ...newInfo } : g
        )
      );
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const handleUpdate = (gate, newInfo) => {
    setGateData((prevGateData) =>
      prevGateData.map((g) =>
        g.gate === gate ? { ...g, ...newInfo } : g
      )
    );
    socket.emit("updateGate", { gate, newInfo });
  };

  return (
    <main className="min-h-screen">
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
