import useTeam from "../hooks/useTeam";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faTachometerAlt,
  faFistRaised,
  faShieldAlt,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";

const TeamDetails = ({ averageWeight, averageHeight }) => {
  const { heroes } = useTeam();
  const { powerStatsCount } = useTeam();

  let statsValues = [];

  for (let stat in powerStatsCount) {
    statsValues.push(powerStatsCount[stat]);
  }

  let maxStatValue = Math.max(...statsValues);

  let maxStat;

  for (let stat in powerStatsCount) {
    if (powerStatsCount[stat] === maxStatValue) {
      maxStat = stat;
    }
  }

  return (
    <>
      {heroes.length !== 0 && (
        <Container fluid className="team-stats-container">
          <Row>
            <Col className="team-stats-col d-flex flex-column align-items-center m-2 p-2">
              <h3 className="h2">
                <u>Your Team</u>
              </h3>
              <div className="p-2 m-2 team-stats-box">
                <p><span>Team type:</span> {maxStat.charAt(0).toUpperCase()}
              {maxStat.slice(1)} </p>
                <p>
                  <span>Average weight:</span> {averageWeight.toFixed(1)} kg
                </p>
                <p>
                  <span>Average height:</span> {averageHeight.toFixed(1)} cm
                </p>
              </div>
            </Col>
            <Col className="team-stats-col d-flex flex-column align-items-center m-2">
              <h3 className="h2">
                <u>Team Powerstats</u>
              </h3>
              <div className="d-flex p-3 m-2 team-stats-box">
                <div className="hero-stats mx-1">
                  <FontAwesomeIcon className="icon" icon={faBrain} />
                  <br />
                  {powerStatsCount.intelligence}
                </div>
                <div className="hero-stats  mx-1">
                  <FontAwesomeIcon className="icon" icon={faTachometerAlt} />
                  <br />
                  {powerStatsCount.speed}
                </div>
                <div className="hero-stats mx-1">
                  <FontAwesomeIcon className="icon" icon={faFistRaised} />
                  <br />
                  {powerStatsCount.combat}
                </div>
                <div className="hero-stats mx-1">
                  <FontAwesomeIcon className="icon" icon={faShieldAlt} />
                  <br />
                  {powerStatsCount.durability}
                </div>
                <div className="hero-stats mx-1">
                  <FontAwesomeIcon className="icon" icon={faDumbbell} />
                  <br />
                  {powerStatsCount.strength}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default TeamDetails;
