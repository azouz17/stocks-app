"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Splash from "./Pages/Splash";
import Explore from "./Pages/Explore";
import Layout from './layout';
import React , {useState} from 'react'
import { HashRouter , BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Switch from "@mui/material/Switch";

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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </div>
  );
}
