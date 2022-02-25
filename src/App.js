import React, { useState, useEffect, useCallback } from "react";

import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";
import Spinner from "./components/spinner/spinner.component";

import "./App.css";

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [isFectching, setIsFetching] = useState(false);
  const [searchField, setSearchField] = useState("");

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    const data = await fetch(
      "https://random-data-api.com/api/users/random_user?size=10"
    );
    const users = data.json();
    setIsFetching(false);
    return users;
  }, []);

  const loadMonsters = useCallback(async () => {
    const newMonsters = await fetchData();
    setMonsters((prev) => prev.concat(newMonsters));
  },[fetchData]);

  const handleScroll = useCallback(async () => {
    let {
      innerHeight,
      scrollY,
      document: {
        body: { offsetHeight }
      }
    } = window;
    if (innerHeight + scrollY >= offsetHeight + 48 && !isFectching) {
      loadMonsters();
    }
  }, [isFectching, loadMonsters]);

  useEffect(() => {
    if (monsters.length === 0) {
      loadMonsters();
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, loadMonsters, monsters]); 

  const filteredMonsters = monsters.filter((monster) =>
    (
      monster.first_name.toLowerCase() + monster.last_name.toLowerCase()
    ).includes(searchField.toLowerCase())
  );

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  return (
    <div className="App">
      <h1>Monsters Rolodex</h1>
      <SearchBox onSearchChange={onSearchChange} />
      <CardList monsters={filteredMonsters} />
      <Spinner isFetching={isFectching} />
    </div>
  );
};

export default App;
