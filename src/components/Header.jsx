
import { useState, useEffect } from "react";



export default function Header()
{
    
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(timer); 
    }, []);

    
    const hour = currentTime.getHours();
    const weekday = currentTime.toLocaleString("en-US", { weekday: "long" });
    const month = currentTime.toLocaleString("en-US", { month: "long" });
    const day = currentTime.getDate();
    const time = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    });

    const fullDateTime = `${weekday}, ${month} ${day} | ${time}`;
    

    let greeting = ""
    


    if (hour > 6 && hour < 12) {
      greeting = "Good Morning!";
    } else if (hour >= 12 && hour < 18) {
      greeting = "Good Afternoon!";
    } else if (hour >= 18 && hour <= 22) {
      greeting = "Good Evening!";
    } else {
      greeting = "Good Night!";
    }

    const [greetUser] = useState(greeting)
    return (
      <>
        <header className="header">
              <h1 className="greeting"> {greetUser} </h1>
              <h2 className="date-time"> {fullDateTime} </h2>
        </header>
      </>
    );
}