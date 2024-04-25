import { useState } from "react";

const Allusers = () => {

  const [list, setList] = useState<string []>(["Tanav", "Ai"])

  return (
    <div>
      <ul className="ml-6 text-white/50 list-decimal">
        {list.map(name => (
          <li>{name}</li>
        ))}
      </ul>
    </div>
  );
};


export default Allusers;