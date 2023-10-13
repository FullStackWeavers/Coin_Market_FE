/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDarkMode } from '../context/Dark-mode';

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef<(() => void) | null>(null);
  const [isTVScriptLoaded, setIsTVScriptLoaded] = useState<boolean>(false);
  const { currency } = useParams();
  const { darkMode } = useDarkMode();

  const coinName = currency;

  useEffect(() => {

    onLoadScriptRef.current = createWidget;

    if (!isTVScriptLoaded) {
      const script = document.createElement('script');
      script.id = 'tradingview-widget-loading-script';
      script.src = 'https://s3.tradingview.com/tv.js';
      script.type = 'text/javascript';
      script.onload = () => {
        setIsTVScriptLoaded(true);
      };

      document.head.appendChild(script);
    }

    if (isTVScriptLoaded) {
      onLoadScriptRef.current?.();
    }

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      if (
        document.getElementById('tradingview_56581') &&
        'TradingView' in window
      ) {
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: `BITHUMB:${coinName}KRW`,
          interval: '240',
          timezone: 'Asia/Seoul',
          theme: `${darkMode ? 'dark' : 'light'}`,
          style: '8',
          locale: 'kr',
          enable_publishing: false,
          backgroundColor: `${darkMode ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)'}`,
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          studies: [
            'STD;RSI',
            'STD;Stochastic_RSI',
            'Volume@tv-basicstudies',
            'STD;Average%Day%Range',
            'STD;MA%Ribbon',
            'STD;TEMA',
          ],
          container_id: 'tradingview_56581',
          refresh_interval: 3000, 
        });
      }
    }
  }, [isTVScriptLoaded, coinName, darkMode]);

  return (
    <div className='tradingview-widget-containe min-w-[200px] h-[500px] m-[20px] md:h-[1000px] shadow-lg	shadow-slate-500'>
      <div id='tradingview_56581' className='h-[100%]' />
      <div className='tradingview-widget-copyright border-1 '>
        <a
          href='https://kr.tradingview.com/'
          rel='noopener nofollow'
          target='_blank'
        ></a>
      </div>
    </div>
  );
}
