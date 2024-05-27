import { IoClose } from "react-icons/io5";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <div className="bg-white text-[#25316D] pt-5 pb-10 pr-5 pl-10 rounded-3xl mx-10">
          <div className="relative w-full flex justify-end">
            <button
              className="text-white text-xl place-self-end"
              onClick={() => onClose()}
            >
              <IoClose className="h-5 w-5 text-[#25316D] cursor-pointer hover:opacity-50" />
            </button>
          </div>
          <div className="pr-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
