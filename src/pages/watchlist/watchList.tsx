import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faCaretDown, faCaretUp, faChevronDown, faChevronUp, faPen, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowUpFromBracket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { BithumbResponse, TradingChartApi } from "../../api/TradingChart-api";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/Dark-mode";

export const WatchList: React.FC = () => {
    const [responseData, setResponseData] = useState<BithumbResponse | null>(
        null
    );

    const { darkMode } = useDarkMode();
    const [DBdata, setDBdata] = useState(['a']);
    const [searchTerm, _setSearchTerm] = useState<string>("");
    const [showList, setShowList] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("")
    const [nameList, setNameList] = useState(["DBdata", "DBdata2"])

    const onBtnShowInput = () => {
        setInputValue("")
        setShowInput(true)
    }

    const offBtnShowInput = () => {
        setShowInput(false)
    }

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value)
    }
    const handleAddToList = () => {
        if (inputValue.trim() !== '') {
            setNameList([...nameList]);
            setInputValue('');
            setShowInput(false);
        }
    }

    const onShowList = () => {
        setShowInput(false)
        setShowList(!showList)
    }

    const onDataLoaded = (data: BithumbResponse) => {
        setResponseData(data);
    };


    const filterCoins = (data: BithumbResponse | null, searchTerm: string) => {
        if (!data) return [];
        if (!searchTerm) return Object.keys(data.data);

        return Object.keys(data.data).filter((key) =>
            key.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const filteredCoins = filterCoins(responseData, searchTerm);

    return (
        <main className='mt-[130px] md:mt-[155px] overflow-x-hidden md:min-h-[1100px]'>
            <TradingChartApi onDataLoaded={onDataLoaded} />
            <div className="flex justify-center ">
                <div className="w-full md:w-[80%] h-[100%]">
                    <div className="pt-[3%]">
                        <div className="md:block flex justify-center md:justify-start items-center ">
                            <span className="cursor-default md:top-[21%] bg-blue-600 rounded px-1 text-white text-[1vw] mx-1">Main</span>
                            <div className="flex items-center">
                                <p className="cursor-default text-[3vw] md:text-[2vw] md:text-[2vw] pr-2 font-bold ">My First Coin Watchlist</p>
                                <button onClick={onBtnShowInput}>
                                    {showInput ? (
                                        <div className="flex">
                                            <div className=" mx-1 bg-gray-100">
                                                <input className="flex-1 bg-gray-100"
                                                    type="text"
                                                    value={inputValue}
                                                    onChange={handleInputChange}
                                                    placeholder="이름 입력"
                                                />
                                            </div>
                                            <div className="bg-gray-200 rounded px-1" onClick={handleAddToList}>
                                                추가
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center items-center bg-gray-200 h-5 w-5 px-2 rounded">
                                            <div className="text-center pb-1">
                                                <FontAwesomeIcon className="text-[1vw]" icon={faPen} style={{ color: 'gray' }} />
                                            </div>
                                        </div>
                                    )}
                                </button>
                                <button className="ml-1 bg-gray-200 rounded px-1" style={{ display: showInput ? "block" : "none" }} onClick={offBtnShowInput}>닫기</button>


                                <button className="pl-2 flex justify-center" onClick={onShowList}>
                                    {!showList ?
                                        <div>
                                            <FontAwesomeIcon className="text-[2vw] md:text-[1vw]" icon={faChevronUp} />
                                        </div>
                                        :
                                        <div>
                                            <FontAwesomeIcon className="text-[2vw] md:text-[1vw]" icon={faChevronDown} />
                                        </div>
                                    }
                                </button>
                            </div>
                        </div>

                        <div className="flex h-[100px]">
                            <ul className="w-[100%] md:w-[25%] text-center">
                                {nameList.map((arr, index) => (
                                    <li className="border-b-2 hover:bg-gray-200" key={index} style={{ display: showList ? "block" : "none" }}>
                                        {arr}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div >
                        <div className="flex justify-end py-4">
                            <div className="text-[1vw] h-[25px]">
                                <button className={`${darkMode ? "bg-gray-500" : "bg-gray-200"} h-[100%] rounded px-2 mr-2`}>
                                    <FontAwesomeIcon className="pr-1" icon={faArrowUpFromBracket} />공유</button>
                                <button className={`${darkMode ? "bg-gray-500" : "bg-gray-200"} h-[100%] rounded px-2 mr-2`}>
                                    <FontAwesomeIcon className="pr-1" icon={faPlus} />
                                    코인추가</button>
                                <button className={`${darkMode ? "bg-gray-500" : "bg-gray-200"} h-[100%] rounded px-2`}>
                                    <FontAwesomeIcon className="pr-1" icon={faMap} />
                                    맞춤설정</button>
                            </div>
                        </div>
                        <div className="flex">
                            <table className="w-full table-fixed">
                                <thead className={`h-[40px] ${darkMode ? "text-white bg-gray-500" : "bg-gray-100"}`}>
                                    <tr className="text-[1vh] cursor-default">
                                        <th className="hidden md:flex-1 md:table-cell">즐겨찾기</th>
                                        <th className="flex-1">가상코인</th>
                                        <th className="flex-1">현재가</th>
                                        <th className="flex-1">거래량</th>
                                        <th className="hidden md:flex-1 md:table-cell">거래금액</th>
                                        <th className="hidden md:flex-1 md:table-cell">전일종가(24h)</th>
                                        <th className="flex-1">변동률(24h)</th>
                                    </tr>
                                </thead>
                                <tbody className="drop-shadow-2xl border-b-2 border-white">
                                    {filteredCoins.map((currency: any) => {
                                        (DBdata.indexOf(currency) == -1) ? currency = null : currency;
                                        const item = responseData?.data[currency];
                                        if (!item) return null;
                                        if (currency === "date") return;

                                        const fluctuationClass =
                                            item.fluctate_rate_24H > 0
                                                ? "text-red-500 "
                                                : "text-blue-500";

                                        const nowPriceClass =
                                            item.opening_price > item.prev_closing_price
                                                ? "text-red-500 "
                                                : item.opening_price === item.prev_closing_price
                                                    ? ""
                                                    : "text-blue-500";

                                        return (
                                            <tr
                                                key={currency}
                                                className={`${darkMode ? "border-t-2 border-white" : ""} shadow text-center hover:bg-[#efda7a] md:cursor-pointer md:hover:bg-[#efda7a] md:shadow`}
                                            >
                                                <td className="hidden md:flex-1 md:py-2 md:table-cell md:border-r md:border-gray-200">
                                                    <FontAwesomeIcon icon={faStar} style={{ color: '#ffb574' }} />
                                                </td>
                                                <td className="flex-1 py-2 border-r border-gray-200 md:flex-1 md:py-2 md:border-r md:border-gray-200">
                                                    <Link to={`/trading-view/${currency}`}>{currency}</Link>
                                                </td>
                                                <td
                                                    className={`flex-1 py-2 border-r border-gray-200 md:flex-1 md:py-2 md:border-r md:border-gray-200 ${nowPriceClass}`}
                                                >
                                                    <Link to={`/trading-view/${currency}`}>
                                                        ₩{Number(item.opening_price).toLocaleString()}
                                                    </Link>
                                                </td>
                                                <td
                                                    className={
                                                        `flex-1 py-2 border-r border-gray-200 md:flex-1 md:py-2 md:border-r md:border-gray-200 md:table-cell `
                                                    }
                                                >
                                                    <Link to={`/trading-view/${currency}`}>
                                                        {Math.floor(item.units_traded).toLocaleString()}
                                                    </Link>
                                                </td>
                                                <td
                                                    className={
                                                        `hidden flex-1 py-2 border-r border-gray-200 md:flex-1 md:py-2 md:border-r md:border-gray-200 md:table-cell`
                                                    }
                                                >
                                                    <Link to={`/trading-view/${currency}`}>
                                                        ₩{Math.floor(item.acc_trade_value).toLocaleString()}
                                                    </Link>
                                                </td>
                                                <td className="hidden md:flex-1 md:py-2 md:border-r md:border-gray-200 md:table-cell">
                                                    <Link to={`/trading-view/${currency}`}>
                                                        ₩{Number(item.prev_closing_price).toLocaleString()}
                                                    </Link>
                                                </td>
                                                <td
                                                    className={`flex-1 py-2 md:flex-1 md:py-2 ${fluctuationClass}`}
                                                >
                                                    <Link to={`/trading-view/${currency}`}>
                                                        <FontAwesomeIcon
                                                            icon={
                                                                item.fluctate_rate_24H >= 0
                                                                    ? faCaretUp
                                                                    : faCaretDown
                                                            }
                                                            size="sm"
                                                            style={{
                                                                paddingRight: "5px",
                                                            }}
                                                        />
                                                        {Math.abs(item.fluctate_rate_24H).toFixed(2)}%
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
};
