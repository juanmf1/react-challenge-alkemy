import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import HeroCard from "./HeroCard";
import { Formik, Form, ErrorMessage, Field } from "formik";

const SearchBar = ({ showResults, setShowResults }) => {
  const [results, setResults] = useState([]);

  return (
    <>
      <Container
        fluid
        className="search-container p-2 d-flex justify-content-center"
      >
        <Formik
          initialValues={{ query: "" }}
          validate={(values) => {
            let error = {};

            if (values.query.length <= 1) {
              error.query = "Enter two or more chars to search";
            }
            return error;
          }}
          onSubmit={(values, { resetForm }) => {
            const url = `https://superheroapi.com/api.php/10227809474243443/search/${values.query}`;

            if (values.query.length > 1) {
              axios.get(url).then((response) => {
                setResults([]);
                if (response.data.results) {
                  setResults(response.data.results);
                }
              });
              setShowResults(true);
              resetForm();
            }
            resetForm();
          }}
        >
          {({ errors }) => (
            <Form className="d-flex flex-column">
              <div className="d-flex">
                <Field type="text" name="query"></Field>
                <Button type="submit" className="ms-2">
                  Search a superhero!
                </Button>
              </div>
              <ErrorMessage
                name="query"
                component={() => (
                  <div className="error-login p-1 mt-3">{errors.query}</div>
                )}
              ></ErrorMessage>
            </Form>
          )}
        </Formik>
      </Container>
      <Container fluid className="results-container">
        <div className="d-flex flex-wrap justify-content-center align-content-center">
          {showResults &&
            (results.length === 0 ? (
              <p
                className="m-2"
                style={{ fontWeight: "bolder", fontSize: "1.5rem" }}
              >
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
