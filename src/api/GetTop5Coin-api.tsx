import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '../context/Dark-mode';

const RealTimeTop5Coins: React.FC = () => {
  const [top5Coins, setTop5Coins] = useState<any[]>([]);
  const updateInterval = 1000;
  const { darkMode } = useDarkMode();
  
  useEffect(() => {
    const fetchTop5CoinsData = async () => {
      try {
        const response = await axios.get("https://api.bithumb.com/public/ticker/all");
        const coinData = response.data.data;

        const sortedCoins = Object.keys(coinData)
          .filter((symbol) => symbol !== "date")
          .sort((a, b) => {
            const aFluctuation = Math.abs(parseFloat(coinData[a].fluctate_rate_24H));
            const bFluctuation = Math.abs(parseFloat(coinData[b].fluctate_rate_24H));
            return bFluctuation - aFluctuation;
          })
          .slice(0, 5);

        const top5CoinsData = sortedCoins.map((symbol) => {
          const coin = coinData[symbol];
          return {
            name: symbol,
            fluctuation: parseFloat(coin.fluctate_rate_24H).toFixed(2) + "%",
          };
        });

        setTop5Coins(top5CoinsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTop5CoinsData();
    const intervalId = setInterval(fetchTop5CoinsData, updateInterval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2 className='font-bold my-[8px]'>실시간 변동률 TOP 5 코인</h2>
      <ul className='w-full'>
        {top5Coins.map((coin, index) => (
          <li
            key={index}
            className={`flex my-[4px] mx-auto w-[100%] h-[100%] shadow-md shadow-slate-300 border-slate-200 hover:shadow-lg ${darkMode ? 'hover:bg-yellow-600':'hover:bg-yellow-300'} transition-all hover:cursor-pointer`}
            onClick={() => {
              window.location.href = `/trading-view/${coin.name}`;
            }}

          >
            <div className=' text-start w-[50px] ml-[20px]'>
              <p className=''>Top{index + 1} </p>
            </div>
            <div className='flex-1'>
              <p>{coin.name}</p>
            </div>
            <div className='text-start w-[90px]'>
              <p className=''>
                {coin.fluctuation}
              </p>
            </div>
            <div>
              <p className='text-[16px] mr-[20px]'>
                {parseFloat(coin.fluctuation) > 0 ? <FontAwesomeIcon icon={faCaretUp} className='text-red-500' /> : <FontAwesomeIcon icon={faCaretDown} className='text-blue-500' />}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeTop5Coins;
