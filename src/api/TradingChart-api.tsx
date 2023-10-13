/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

export interface BithumbResponse {
  status: string;
  data: {
    [key: string]: {
      opening_price: number;
      closing_price: number;
      max_price: number;
      min_price: number;
      units_traded: number;
      acc_trade_value: number;
      prev_closing_price: number;
      fluctate_rate_24H: number;
    };
  };
}

export const TradingChartApi: React.FC<{
  onDataLoaded: (data: BithumbResponse) => void;
}> = ({ onDataLoaded }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://api.bithumb.com/public/ticker/ALL_KRW",
          headers: { accept: "application/json" },
        };

        const response = await axios.request<BithumbResponse>(options);
        onDataLoaded(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [onDataLoaded]);

  return (
    <div className='absolute translate-x-10 translate-y-[500px] z-50 font-bold text-2xl'>
      {loading && <p><FontAwesomeIcon icon={faRotateRight} spin /></p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};
