import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDarkMode } from '../../context/Dark-mode';
import { faX } from '@fortawesome/free-solid-svg-icons';

interface BookModalProps {
  isNames: string;
  isOpen: boolean;
  onClose: () => void;
}

const page1 = [(
  <>
    <div className={`mb-[1vh] text-center font-semibold text-xl`}>지갑 발금방법</div>
    <div className='flex-1 bg-gray-300 rounded text-black overflow-auto'>
      <div className='text-center'>
        <p className='text-[1vh] font-bold text-xl my-2'>지갑 주소 발급 방법</p>
        <p>아래 링크를 통해 회원가입을 진행해주세요.</p>
        <p className='font-bold underline'><a className='hover:text-orange-400' href="https://www.bithumb.com" target="_blank">빗썸</a></p>
        <img className='py-2 w-[100%]' src="/Manual1.png" alt="" />
        <p>회원가입 후 빗썸 모바일앱을 설치해주세요.</p>
        <p>모바일앱에서 로그인 후에 고객환인을 진행해주세요.</p>
        <p>고객환인이 완료된후에 </p>
        <p>지갑관리에 입금을 클릭해주세요.</p>
        <p>구분에서 원하는 항목을 선택하고 지갑주소 생성버튼을 눌러주세요.</p>
        <img className='w-[100%]' src="/Manual2.png" alt="" />
        <p>지갑 주소 생성하셨다면 다음을 눌러주세요</p>
      </div>
    </div>
  </>

), (
  <>
    <div className={`mb-[1vh] text-center font-semibold text-xl`}>지갑 연결 방법</div>
    <div className='flex-1 bg-gray-300 rounded text-black overflow-auto'>
      <div className='text-center'>
        <p>구글 네이버 카카오톡을 이용해 간편로그인후</p>
        <img className='w-[100%]' src="/Manual3.png" alt="" />
        <p>포트폴리오로 이동후 지갑연결 버튼 클릭</p>
        <img className='w-[100%]' src="/Manual4.png" alt="" />
        <p>창에 빗썸에서 생성한 코인지갑 주소를 입력후</p>
        <p>버튼을 클릭</p>
        <img className='w-[100%]' src="/Manual5.png" alt="" />
      </div>
    </div>
  </>
)];

const page2 = [(
  <div className='flex-1 bg-gray-300 rounded text-black'>
    <div>
      <p>수동1 내용</p>
    </div>
  </div>
), (
  <div className='flex-1 bg-gray-300 rounded text-black'>
    <div>
      <p>수동2 내용</p>
    </div>
  </div>
), (
  <div className='flex-1 bg-gray-300 rounded text-black'>
    <div>
      <p>수동3 내용</p>
    </div>
  </div>
)]

export const BookModal: React.FC<BookModalProps> = ({ isNames, isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const selectedArray =
    isNames === "page1"
      ? page1 : isNames === "page2" ? page2 : [];
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const { darkMode } = useDarkMode();

  const nextPage = () => {
    if (currentPage < selectedArray.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleCloseModal = () => {
    onClose();
    setCurrentPage(0);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };



  return isOpen ? (
    <div className=" fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: isOpen ? "rgba(0, 0, 0, 0.6)" : "transparent" }} onClick={handleBackdropClick}>
      <div className={`${darkMode ? "bg-black text-white shadow-md shadow-white" : "bg-white text-black"} flex flex-col justify-between p-4 rounded shadow-lg w-[80%] h-[80%]`}>
        <div className="text-right">
          <button className={`${darkMode ? "text-white" : "text-black"} text-[2vw]  hover:text-red-500`} onClick={handleCloseModal}>
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        {selectedArray[currentPage]}
        <div className="flex mt-[1vh] justify-center space-x-4">
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded shadow ${darkMode ? "shadow-white" : "shadow-black"} ${currentPage == 0 ? "hidden" : ""}`}
            onClick={prevPage}
          >
            이전 페이지
          </button>
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded shadow ${darkMode ? "shadow-white" : "shadow-black"} ${currentPage == selectedArray.length - 1 ? "hidden" : ""}`}
            onClick={nextPage}
          >
            다음 페이지
          </button>
        </div>
      </div>
    </div>
  ) : null;
};


