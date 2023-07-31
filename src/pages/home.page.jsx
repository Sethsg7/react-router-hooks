import { useState } from "react";

export function HomePage(props) {
  //State  Setter
  //The Reactive part will only change when the Setter is called.
  //Reactive  Setter                0/Default State
  let [list, setList] = useState(["ready", "set", "GO"]);
  let [text, setText] = useState("");

  //STUDYING HERE.
  function onSubmit(e) {
    e.preventDefault();

    let newList = [...list, text];
    setList(newList);
    setText("");
  }

  return (
    <div>
      <h1>Hello World!</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {list.map((item, idx) => { //This idx helps make a unique key for each item.
          return <li key={item + idx}>{item}</li>;

        })}
      </ul>
    </div>
  );
}
