import Carousel from "../components/Carousel.jsx";
import Header from "../components/Header.jsx";
import Buttons from "../components/TaskButtons.jsx";
import { useState } from "react";


export default function Home()
{

    return (
      < div className="home">
        <Header />
        <Buttons />
        <Carousel />
      </div>
    );
}