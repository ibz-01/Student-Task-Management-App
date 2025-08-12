
import { useState } from "react";

export default function Header()
{

    
    const date = new Date()
    let hour = date.getHours()

    const weekday = date.toLocaleString("en-US", { weekday: "long" });
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();
    const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    });

    const fullDateTime = `${weekday}, ${month} ${day} | ${time}`;
    

    let greeting = ""
    


    if (hour < 12) {
      greeting = "Good Morning, [user]!";
    } else if (hour < 18) {
      greeting = "Good Afternoon, [user]!";
    } else if (hour < 20) {
      greeting = "Good Evening, [user]!";
    } else {
      greeting = "Good Night, [user]!";
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