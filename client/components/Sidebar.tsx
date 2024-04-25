import { useState } from "react";
import Allusers from "./Allusers";
import Updates from "./Updates"

const Sidebar = ({ ready, room }: { ready: boolean; room: any; }) => {

    const [slider, setSlider] = useState(0)

    return (
        <div>
            <div className="flex items-center text-2xl justify-center font-bold mb-4">
              <span
                className={
                  "w-2 h-2 rounded-full animate-ping mr-3 " +
                  (ready ? "bg-green-600" : "bg-red-600")
                }
              ></span>
              <p className="opacity-50  italic">
              {room}
              </p>
              &#x1F517;
            </div>
            <div className="flex gap-2 mt-8">
                <button className={"font-bold hover:bg-white/50 text-white/50 hover:text-black transition px-2 rounded "+(slider==0 && "ring ring-white/10")} onClick={() => setSlider(0)}>users</button>
                <button className={"font-bold hover:bg-white/50 text-white/50 hover:text-black transition px-2 rounded "+(slider==1 && "ring ring-white/10")} onClick={() => setSlider(1)}>updates</button>
            </div>
            <div className="border border-white/10 mt-3 rounded-lg p-3 transition-all h-fit">
            {(slider==0) && (<Allusers />)}
            {(slider==1) && (<Updates />)}
            </div>
        </div>
    )
}

export default Sidebar;