import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "./App.module.css";

function App() {
  const inputRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [names, setNames] = useState(["Anna", "Max", "Sarah"]);
  const [inputName, setInputName] = useState(names[selectedIndex]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={styles.root}>
      <ul className={styles.people}>
        {names.map((name, index) => {
          return (
            <li
              className={clsx(styles.person, {
                [styles.selected]: index === selectedIndex,
              })}
              key={index}
              onClick={(e) => {
                setInputName(name);
                setSelectedIndex(index);
                inputRef.current.focus();
              }}
            >
              {name}
            </li>
          );
        })}
        <li
          className={styles.addPersonButton}
          onClick={(e) => {
            setSelectedIndex(names.length);
            setNames([...names, "New Person"]);
            setInputName("");

            inputRef.current.focus();
          }}
        >
          +
        </li>
      </ul>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();

          if (names.length === 0) {
            // create a new name
            setSelectedIndex(names.length);
            setNames([...names, inputName]);

            inputRef.current.focus();
          } else {
            // update an existing name
            const newNames = names.map((name, index) =>
              selectedIndex === index ? inputName : name
            );
            setNames(newNames);
          }
        }}
      >
        <label className={styles.label}>Name</label>
        <input
          ref={inputRef}
          value={inputName}
          onChange={(e) => {
            setInputName(e.target.value);
          }}
        />
        <button className={styles.button}>Save</button>
        <button
          type="button"
          className={styles.button}
          disabled={names.length === 0}
          onClick={(e) => {
            const newNames = names.filter((name, i) => selectedIndex !== i);
            setNames(newNames);

            if (names.length === 1) {
              setInputName("");
            } else if (selectedIndex === names.length - 1) {
              setInputName(names[selectedIndex - 1]);
              setSelectedIndex(selectedIndex - 1);
            } else {
              setInputName(names[selectedIndex + 1]);
            }
          }}
        >
          Delete
        </button>
      </form>
    </div>
  );
}

export default App;
