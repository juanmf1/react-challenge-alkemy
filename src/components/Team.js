import Container from "react-bootstrap/Container";
import HeroCard from "./HeroCard";
import useTeam from "../hooks/useTeam";

const Team = () => {
  const { heroes } = useTeam();

  const styles = {
    fontSize: "1.5rem",
    color: "#fff",
    display: "block",
    textAlign: "center"
  };

  const styles2 = {
    fontSize: "1.2rem",
    color: "#ccc",
    display: "block",
    textAlign: "center"
  }


  return (
    <>
      <Container fluid className="team-container d-flex flex-column ">
        <div className="d-flex justify-content-center flex-wrap pt-4">
          {heroes.length === 0 ? (
            <>
              <div className="d-flex flex-column justify-content-center">
                <p style={styles}> No heroes yet.</p>
                <p style={styles2}>
                  With great power comes great responsibility... choose wisely.
                </p>
              </div>
            </>
          ) : (
            heroes.map((hero) => <HeroCard id={hero.id} mode="team" />)
          )}
        </div>
      </Container>
    </>
  );
};

export default Team;
