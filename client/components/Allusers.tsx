import { useState } from "react";

const Allusers = () => {

  const [list, setList] = useState<string []>(["Tanav", "Ai"])

  return (
    <div>
      <h2 className="text-lg font-semibold">Users</h2>

      <ul className="mt-4 ml-4 list-decimal">
        // TODO: not started
        this is not working
        {list.map(name => (
          <li>{name}</li>
        ))}
      </ul>
    </div>
  );
};


export default Allusers;