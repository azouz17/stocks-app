'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Splash from "./Pages/Splash";
import Explore from "./Pages/Explore";


export default function Home() {
  return (
    <div className="main">
          <Explore />
    </div>
  );
}
