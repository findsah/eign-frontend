import React, { useEffect } from "react";
import EiginToGain from "./components/EiginToGain";
import TopSection from "./components/TopSection";
import HelpingSection from "./components/HelpingSection";
import SellMore from "./components/SellMore";
import About from "./components/About";
import Tricks from "./components/Tricks";
import { GetCurrentLocation } from "../../services/ShareApi";
import { useDispatch } from "react-redux";
import { useLoadScript } from "@react-google-maps/api";
const libraries = ["places"];

export default function Home() {
  const dispatch = useDispatch()
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: `${process.env.REACT_APP_MAP_KEY}`,
//     libraries,
// }); 
  useEffect(()=>{
  dispatch(GetCurrentLocation())
  },[dispatch])
  // if (loadError) return <div>Error loading maps</div>;
  // if (!isLoaded) return <div>Loading maps</div>;
  return (
    <div className="home">
      
      <TopSection />
      <HelpingSection />
      <SellMore />
      <EiginToGain />
      <About />
      <Tricks />
    </div>
  );
}
