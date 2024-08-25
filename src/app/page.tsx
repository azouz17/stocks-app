'use client'; 
import Image from "next/image";
import styles from "./page.module.css";
import Splash from "./Pages/Splash";
import Explore from "./Pages/Explore";
import Layout from './layout'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'


const Router = createBrowserRouter(
  createRoutesFromElements(

    <Route>
    <Route path='/' element={<Splash />}> </Route>
    <Route path='Explore' element={<Explore />}></Route>
  </Route>
  )
)

export default function Home() {
  
  return (
    <div className="main">
          <RouterProvider  router = {Router}/>
    </div>
  );
}
