"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Splash from "./Pages/Splash";
import Explore from "./Pages/Explore";
import Layout from './layout';
import { HashRouter , BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <div className="main">
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path="/">
              <Route path="/" element={<Splash />} />
              <Route path="/Explore" element={<Explore />} />
            </Route>
          </Routes>
      </HashRouter>
    </QueryClientProvider>
    </div>
  );
}
