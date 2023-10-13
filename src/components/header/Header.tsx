/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faKey,
  faMoon,
  faSearch,
  faStarHalfAlt,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { ScrollToTop } from "../../api/ScrollToTop-api";
import { useDarkMode } from "../../context/Dark-mode";
import LoginModal from "../modal/LoginModal";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleSearch = (e: any) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      const coin = searchTerm.toUpperCase();
      window.location.href = `/search/${coin}`;
    }
  };

  return (
    
    <header
      className={`${
        darkMode ? "dark" : "light"
      } fixed top-0 w-full z-40 md:top-0 h-[120px] md:h-[155px] shadow-md shadow-slate-200 opacity-100`}
    >
    <LoginModal isModalOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <div className="flex items-center justify-between h-[100%] min-w-[300px] overflow-hidden mx-[20px]">
        <a
          href="/"
          className='md:w-[300px] max-w-[40%]'
        >
          <img
            src={`${darkMode ? "/header-dark.png" : "/header.png"}`}
            alt={`${darkMode ? "Header-dark" : "Header"}`}
          />
        </a>

        <div className='flex-1 max-w-[60%] h-[100%] flex flex-col items-end justify-center'>
          <div className="flex mt-[30px]">
            <button
              className="mr-[40px] md:text-xl md:cursor-pointer md:hover:text-[#efda7a]"
              onClick={toggleDarkMode}
            >
              {!darkMode && (
                <FontAwesomeIcon
                  icon={faMoon}
                  size="lg"
                  style={{
                    paddingRight: "7px",
                  }}
                />
              )}
              {darkMode && (
                <FontAwesomeIcon
                  icon={faSun}
                  size="lg"
                  style={{
                    paddingRight: "7px",
                  }}
                />
              )}
            </button>
            <button
              className={` md:cursor-pointer md:hover:underline  ${darkMode? 'hover:text-[#efda7a]':'hover:text-blue-400'}`}
              onClick={() => {
                openLoginModal();
              }}
            >
              <FontAwesomeIcon
                icon={faKey}
                style={{
                  paddingRight: "7px",
                }}
              />
              로그인
            </button>
          </div>

          <div className='group flex items-center justify-end m-[20px] mr-0 h-[100px] flex-wrap'>
            <div className="mb-[8px]">
              <a
                href="/favorites"
                className="mr-[20px] md:cursor-pointer md:hover:underline md:hover:text-[#efda7a]"
              >
                <FontAwesomeIcon
                  icon={faStarHalfAlt}
                  style={{
                    color: "#efda7a",
                    paddingRight: "7px",
                  }}
                />
                관심목록
              </a>
              <a
                href="/portfolio"
                className="md:cursor-pointer md:hover:underline md:hover:text-[#38bdf8] "
              >
                <FontAwesomeIcon
                  icon={faChartPie}
                  style={{
                    color: "#38bdf8",
                    paddingRight: "7px",
                  }}
                />
                포트폴리오
              </a>
            </div>

            <div className="flex items-center  justify-start ml-[20px] mb-[10px] w-[190px] rounded-lg shadow-sm shadow-slate-200 group-focus-within:shadow-blue-400 hover:shadow-blue-400">
              <label htmlFor="search" className="ml-[10px]">
                <FontAwesomeIcon icon={faSearch} style={{ paddingRight: "7px" }} />
              </label>
              <input
                type="text"
                id="search"
                placeholder="코인입력"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearch}
                value={searchTerm}
                className="w-[100px] h-[30px] focus:outline-none bg-transparent md:focus:outline-none"
              />
                <a
                href={`/search/${searchTerm}`}
                className="ml-[20px] hover:text-blue-500"
              >
                검색
              </a>
              
            </div>
          </div>
          
        </div>
        
      </div>
      <ScrollToTop />
      
    </header>
  );
}
