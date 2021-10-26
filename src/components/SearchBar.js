import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import HeroCard from "./HeroCard";
import {Formik} from "formik";

const SearchBar = ({showResults, setShowResults }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const url = `https://superheroapi.com/api.php/10227809474243443/search/${query}`;

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const searchHero = async () => {
    axios.get(url).then((response) => {
      setResults([]);
      if (response.data.results) {
        setResults(response.data.results);
      }
    });
    setShowResults(true);
  };


  return (
    <>
      <Container
        fluid
        className="search-container p-2 d-flex justify-content-center"
      >
        <input type="text" value={query} onChange={handleChange} />
        <Button className="ms-2" onClick={searchHero}>
          {" "}
          Search a superhero!
        </Button>
      </Container>
      <Container fluid className="results-container">
      <div className="d-flex flex-wrap justify-content-center align-content-center">
        {showResults && (
          results.length === 0 ? (
          <p className="m-2" style={{ fontWeight: "bolder", fontSize: "1.5rem" }}>
            No heroes found
          </p>
        ) : (
          results.map((hero) => <HeroCard mode="search" id={hero.id} />)
        ))}
      </div>
      </Container>
    </>
  );
};

export default SearchBar;
