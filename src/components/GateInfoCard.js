import { Fragment, useState, useEffect } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import Modal from "./Modal";

const GateInfoCard = ({ info, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [flightNumber, setFlightNumber] = useState(info.flightNumber);
  const [destination, setDestination] = useState(info.destination);
  const [airline, setAirline] = useState(info.airline);
  const [departureTime, setDepartureTime] = useState(info.departureTime);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFlightNumber(info.flightNumber);
    setDestination(info.destination);
    setAirline(info.airline);
    setDepartureTime(info.departureTime);
  }, [info]);

  const validateForm = () => {
    const errors = {};
    if (!flightNumber) errors.flightNumber = "El número de vuelo es requerido";
    if (!destination) errors.destination = "El destino es requerido";
    if (!airline) errors.airline = "La aerolínea es requerida";
    if (!departureTime) {
      errors.departureTime = "La hora de salida es requerida";
    } else if (!/^(2[0-3]|[01]?[0-9]):[0-5][0-9]$/.test(departureTime)) {
      errors.departureTime = "El formato de hora inválido (HH:MM)";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      onUpdate(info.gate, {
        flightNumber,
        destination,
        airline,
        departureTime,
      });
      setShowModal(false);
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <Fragment>
        <div className="rounded-3xl p-1 bg-gradient-linear-1 max-w-[380px]">
          <div className="rounded-[calc(1.5rem-0.25rem)] pt-4 pb-10 pr-4 pl-10 bg-white text-[#25316D]">
            <div className="relative w-full flex justify-end">
              <HiPencilSquare
                className="w-6 h-6 text-[#25316D] cursor-pointer hover:opacity-50"
                onClick={() => setShowModal(true)}
              />
            </div>
            <div className="pr-6">
              <div className="mb-5 flex flex-col items-center bg-transparent">
                <span className="font-medium sm:text-md text-sm text-[#5F6F94]">
                  Puerta de Embarque
                </span>
                <span className="text-3xl font-bold">Gate {info.gate}</span>
              </div>
              <div className="mb-1 flex flex-col bg-transparent">
                <span className="font-medium sm:text-md text-sm text-[#5F6F94]">
                  Aerolinea
                </span>
                <span className="text-xl font-bold">{info.airline}</span>
              </div>
              <div className="mb-1 flex flex-col bg-transparent">
                <span className="font-medium sm:text-md text-sm text-[#5F6F94]">
                  Número de Vuelo
                </span>
                <span className="text-xl font-bold">{info.flightNumber}</span>
              </div>
              <div className="mb-1 flex flex-col bg-transparent">
                <span className="font-medium sm:text-md text-sm text-[#5F6F94]">
                  Destino
                </span>
                <span className="text-xl font-bold">{info.destination}</span>
              </div>
              <div className="mb-1 flex flex-col bg-transparent">
                <span className="font-medium sm:text-md text-sm text-[#5F6F94]">
                  Hora de Salida
                </span>
                <span className="text-xl font-bold">{info.departureTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="mb-4 flex flex-col items-center bg-transparent">
          <span className="text-[#5F6F94]">Editar la Puerta de Embarque</span>
          <span className="text-3xl font-bold">Gate {info.gate}</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-[#5F6F94]">
              Aerolínea <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              className="p-2 border rounded text-[#25316D]"
              type="text"
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
            />
            {errors.airline && <span className="text-red-500">{errors.airline}</span>}
          </div>
          <div className="flex flex-col">
            <label className="text-[#5F6F94]">
              Número de Vuelo <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              className="p-2 border rounded text-[#25316D]"
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
            />
            {errors.flightNumber && <span className="text-red-500">{errors.flightNumber}</span>}
          </div>
          <div className="flex flex-col">
            <label className="text-[#5F6F94]">
              Destino <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              className="p-2 border rounded text-[#25316D]"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            {errors.destination && <span className="text-red-500">{errors.destination}</span>}
          </div>
          <div className="flex flex-col">
            <label className="text-[#5F6F94]">
              Hora de Salida <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              className="p-2 border rounded text-[#25316D]"
              type="text"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
            />
            {errors.departureTime && <span className="text-red-500">{errors.departureTime}</span>}
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default GateInfoCard;
