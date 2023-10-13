import {
  faArrowPointer,
  faArrowRight,
  faBars,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { BookModal } from "../../components/modal/ManualModal";
import { useDarkMode } from "../../context/Dark-mode";
import Key from "../../components/key/key";
import { WalletConnectionModal } from "../../components/modal/WalletConnectionModal";

export const PortFolioTracker = () => {
  const { darkMode } = useDarkMode();
  const [isMenu, setIsMenu] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalletModal, setWalletModal] = useState(false)
  const [isName, setIsName] = useState("")

  const openModal = () => {
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const walleOpentModal = () => {
    setWalletModal(true);
  }
  const walletCloseModal = () => {
    setWalletModal(false);
  }

  const onWallet = () => {
    openModal();
    setIsName("page1")
  }
  const onMenual = () => {
    openModal();
    setIsName("page2")
  }

  const onIsMenu = () => {
    setIsMenu(!isMenu)
  }

  useEffect(() => {
    if (isModalOpen) {
      const scrollY = window.scrollY;
      document.body.style.cssText = `
        position: fixed;
        top: -${scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
      return () => {
        document.body.style.cssText = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isModalOpen, isWalletModal]);

  return (
    <main className={`mt-[130px] md:mt-[155px] overflow-x-hidden md:min-h-[1100px]`}>
      <div className="flex justify-center">
        <div className="md:w-[80%] w-full md:h-[500px] h-full">
          <div className="md:pl-0 pl-2 md:mt-0 mt-4 h-[100%]">

            <div className="md:h-[100%] text-center flex justify-between">
              <div className="hidden md:flex md:w-[20%] pt-4 pl-2">
                <div className={`w-[3vw] h-[4vh] rounded-lg border-2 ${darkMode ? "border-white" : "border-black"} mr-1`}>
                  <button className={`w-[100%] h-[100%] shadow-md ${darkMode ? "shadow-white" : "shadow-black"}`} onClick={onIsMenu}>
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                </div>
                <div className="flex-1 text-center">
                  <p className=" font-bold text-[2vw] mb-3">사용방법</p>
                  <ul className="text-left" style={{ display: isMenu ? "block" : "none" }}>
                    <li className="list-disc text-gray-300">
                      <link rel="stylesheet" href="" />
                      <button className={`${darkMode ? "text-white" : "text-black"} hover:underline decoration-1 hover:text-red-200 text-[1.4vw]`} onClick={onWallet}>지갑연결 방법</button>
                      <BookModal isNames={isName} isOpen={isModalOpen} onClose={closeModal} />
                    </li>
                    <li className="list-disc text-gray-300">
                      <button className={`${darkMode ? "text-white" : "text-black"} hover:underline decoration-1 hover:text-red-200 text-[1.4vw]`} onClick={onMenual}>수동 거래 추가 방법</button>
                      <BookModal isNames={isName} isOpen={isModalOpen} onClose={closeModal} />
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center">
                <p className="text-[4vh]">
                  첫번째 포트폴리오를 시작합니다.
                </p>
              </div>
              <Key />
              <div className={`pt-2 pr-2 md:pt-4`}>
                <button className={`h-8 bg-blue-500 rounded-lg hover:bg-blue-700 w-25 shadow ${darkMode ? "shadow-white" : "shadow-black"}`}>
                  <p className="text-white text-[3px] px-3">
                    +Create portfolio
                  </p>
                </button>
              </div>
            </div>

            <div className=" md:pl-2 md:flex md:justify-between">
              <div className="md:w-[48%] md:h-[30%] md:p-0 p-2">
                <div>
                  <div className={`flex rounded w-[100%] h-[80px] shadow-md ${darkMode ? "shadow-white" : "shadow-black"}`} onClick={walleOpentModal}>
                    <div className="md:pt-4 pt-[30px] w-[20%] flex justify-center ">
                      <div className="w-6 h-6 text-center bg-gray-200 rounded-full">
                        <FontAwesomeIcon
                          icon={faWallet}
                          style={{ color: "blue", fontSize: "14px" }}
                        />
                      </div>
                    </div>
                    <div className="w-[100%] h-[100%] text-left pt-5">
                      <h2 className="font-medium text-[12px] flex items-center">
                        지갑연결
                        <p className="rounded-full text-white bg-blue-600 w-[12%] h-4 text-[3px] text-center inline-block ml-2">
                          Beta
                        </p>
                      </h2>
                      <p className="text-[3px] text-gray-500 pb-[8px]">
                        지갑 주소를 입력하기만 하면 바로 동기화됩니다.
                      </p>
                    </div>
                    <div className="pl-[10%] h-[100%] w-[35%] flex items-center">
                      <div className="pr-4 text-center">
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          style={{ fontSize: "15px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <WalletConnectionModal isOpen={isWalletModal} onClose={walletCloseModal} />
                </div>
              </div>

              <div className="md:pr-2 md:w-[48%] md:h-[30%] md:p-0 p-2">
                <div>
                  <button className={`flex rounded w-[100%] h-[80px] shadow-md ${darkMode ? "shadow-white" : "shadow-black"}`}>
                    <div className="md:pt-4 pt-[30px] w-[20%] flex justify-center ">
                      <div className="w-6 h-6 text-center bg-green-100 rounded-full">
                        <FontAwesomeIcon
                          icon={faArrowPointer}
                          style={{ color: "#0aa80a", fontSize: "12px" }}
                        />
                      </div>
                    </div>
                    <div className="w-[100%] text-left pt-5">
                      <h2 className="font-medium text-[12px] flex items-center">
                        수동으로 거래추가
                      </h2>
                      <p className="text-[3px] text-gray-500 pb-[8px]">
                        포트폴리오를 추적하기 위해 원하는 속도로 모든 거래세부
                        정보를 입력하십시오.
                      </p>
                    </div>
                    <div className="pl-[10%] h-[100%] w-[35%] flex items-center">
                      <div className="pr-4 text-center">
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          style={{ fontSize: "15px" }}
                        />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
