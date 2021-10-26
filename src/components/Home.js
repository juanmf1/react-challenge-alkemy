import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import useTeam from "../hooks/useTeam";

const Home = () => {
  const { token } = useTeam();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <Container
        fluid
        className="title-container d-flex flex-column align-items-center py-4"
      >
        {token && (
          <Button className="ms-auto mb-4 " variant="warning" onClick={handleLogOut}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Log-out
          </Button>
        )}
        <h1 className="page-title">SuperHero App</h1>
        <p className="page-subtitle">Make your own superhero team!</p>
      </Container>
    </>
  );
};

export default Home;
