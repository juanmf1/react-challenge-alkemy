import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import TeamContext from "./context/TeamContext";
import Team from "./components/Team";
import Home from "./components/Home";
import TeamDetails from "./components/TeamDetails";
import SearchBar from "./components/SearchBar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

function App() {
  const token = localStorage.getItem("token");
  const [heroes, setHeroes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [goodAlignmentCount, setGoodAlignment] = useState(0);
  const [badAlignmentCount, setBadAlignment] = useState(0);
  // const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [powerStatsCount, setPowerStatsCount] = useState({});
  const [averageWeight, setAverageWeight] = useState(0);
  const [averageHeight, setAverageHeight] = useState(0);

  useEffect(() => {
    let intelligenceCount = 0;
    let combatCount = 0;
    let strengthCount = 0;
    let speedCount = 0;
    let durabilityCount = 0;

    heroes.forEach((hero) => {
      intelligenceCount += parseInt(hero.powerStats.intelligence);
      combatCount += parseInt(hero.powerStats.combat);
      strengthCount += parseInt(hero.powerStats.strength);
      speedCount += parseInt(hero.powerStats.speed);
      durabilityCount += parseInt(hero.powerStats.durability);
    });

    setPowerStatsCount({
      intelligence: intelligenceCount,
      combat: combatCount,
      strength: strengthCount,
      speed: speedCount,
      durability: durabilityCount,
    });

    let averageHeight = 0;
    let averageWeight = 0;

    heroes.forEach((hero) => {
      averageHeight += parseInt(hero.height);
      averageWeight += parseInt(hero.weight);
    });

    setAverageHeight(averageHeight / heroes.length);
    setAverageWeight(averageWeight / heroes.length);
  }, [heroes]);

  return (
    <>
      <TeamContext.Provider
        value={{
          token,
          heroes,
          setHeroes,
          goodAlignmentCount,
          setGoodAlignment,
          badAlignmentCount,
          setBadAlignment,
          powerStatsCount,
        }}
      >
        <Home />
        {token ? (
          <Tabs
            defaultActiveKey="team"
            id="uncontrolled-tab-example"
            className="d-flex justify-content-center tab-container"
          >
            <Tab className="app-tab" eventKey="team" title="Team">
              <TeamDetails
                averageWeight={averageWeight}
                averageHeight={averageHeight}
              />
              <Team />
            </Tab>
            <Tab className="app-tab" eventKey="search" title="Search">
              <SearchBar
                showResults={showResults}
                setShowResults={setShowResults}
              />
            </Tab>
          </Tabs>
        ) : (
          <LoginForm />
        )}
      </TeamContext.Provider>
    </>
  );
}

export default App;
