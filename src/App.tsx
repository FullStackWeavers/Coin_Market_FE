/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NowPrice } from "./pages/public/Now-price";
import NowPriceAssets from "./pages/public/Now-price-assets";
import NotFound from "./pages/error/404";
import TermsOfUse from "./pages/notice/Terms-of-Use";
import PrivacyPolicy from "./pages/notice/Privacy-Policy";
import { PortFolioTracker } from "./pages/portfolio/portfolio";
import { WatchList } from "./pages/watchlist/watchList";
import NoneCoin from "./pages/error/NoneCoin";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NowPrice />} />
        <Route path="/search/:currency" element={<NowPriceAssets />} />
        <Route path="/nonecoin" element={<NoneCoin />} />
        <Route path="/trading-view/:currency" element={<NowPriceAssets />} />
        <Route path="/portfolio" element={<PortFolioTracker />} />
        <Route path="/favorites" element={<WatchList />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}
