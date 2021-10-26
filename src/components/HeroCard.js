import { useState, useEffect } from "react";
import useTeam from "../hooks/useTeam";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import DetailsModal from "./DetailsModal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faTachometerAlt,
  faFistRaised,
  faShieldAlt,
  faDumbbell,
  faTrashAlt,
  faLaughBeam,
  faAngry,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

// token 10227809474243443

const HeroCard = ({ id, mode }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [combat, setCombat] = useState("");
  const [intelligence, setIntelligence] = useState("");
  const [strength, setStrength] = useState("");
  const [speed, setSpeed] = useState("");
  const [durability, setDurability] = useState("");
  const powerStats = {
    intelligence: intelligence,
    strength: strength,
    speed: speed,
    durability: durability,
    combat: combat,
  };
  const [alignment, setAlignment] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [alias, setAlias] = useState("");
  const [eyesColor, setEyeColor] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [cardMode, setCardMode] = useState(mode);
  const { heroes, setHeroes } = useTeam();
  const { goodAlignmentCount, setGoodAlignment } = useTeam();
  const { badAlignmentCount, setBadAlignment } = useTeam();
  const [showWarning, setShowWarning] =useState(false);
  const [showWarningGood, setShowWarningGood] = useState(false);
  const [showWarningBad, setShowWarningBad] = useState(false);

  useEffect(() => {
    axios
      .get(`https://www.superheroapi.com/api.php/10227809474243443/${id}`)
      .then((response) => {
        setName(response.data.name);
        setImage(response.data.image.url);
        setHeight(response.data.appearance.height[1]);
        setWeight(response.data.appearance.weight[1]);
        setStrength(response.data.powerstats.strength);
        setDurability(response.data.powerstats.durability);
        setCombat(response.data.powerstats.combat);
        setSpeed(response.data.powerstats.speed);
        setIntelligence(response.data.powerstats.intelligence);
        setAlignment(response.data.biography.alignment);
        setAlias(response.data.biography.aliases);
        setEyeColor(response.data.appearance["eye-color"]);
        setHairColor(response.data.appearance["hair-color"]);
        setWorkPlace(response.data.work.base);
      });
  }, [heroes]);

  // Efecto para saber si el heroe esta en el equipo

  useEffect(() => {
    if (heroes.some((hero) => hero.id === id)) {
      setCardMode("team");
    } else {
      setCardMode("search");
    }
  }, [heroes]);

  const alignmentIcon = () => {
    if (alignment === "good") {
      return (
        <FontAwesomeIcon
          style={{ color: "#ADDD2F" }}
          className="icon"
          icon={faLaughBeam}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          style={{ color: "#DF4E3A" }}
          className="icon"
          icon={faAngry}
        />
      );
    }
  };

  const handleAddHero = () => {
    if (heroes.length < 6) {
      if (alignment === "good" && goodAlignmentCount < 3) {
        setHeroes([
          ...heroes,
          {
            id: id,
            name: name,
            height: height,
            weight: weight,
            alias: alias,
            hairColor: hairColor,
            workPlace: workPlace,
            eyeColor: eyesColor,
            image: image,
            powerStats,
          },
        ]);
        setGoodAlignment(goodAlignmentCount + 1);
        setCardMode("team");
      }
      if (alignment === "good" && goodAlignmentCount >= 3) {
        setShowWarningGood(true);
        setTimeout(() => setShowWarningGood(false), 1500);
      }
      if (alignment === "bad" && badAlignmentCount < 3) {
        setHeroes([
          ...heroes,
          {
            id: id,
            name: name,
            height: height,
            weight: weight,
            alias: alias,
            hairColor: hairColor,
            workPlace: workPlace,
            eyeColor: eyesColor,
            image: image,
            powerStats,
          },
        ]);
        setBadAlignment(badAlignmentCount + 1);
        setCardMode("team");
      }
      if (alignment === "bad" && badAlignmentCount >= 3) {
        setShowWarningBad(true);
        setTimeout(() => setShowWarningBad(false), 1500);
      }
      if (alignment === "neutral" && badAlignmentCount < 3) {
        setHeroes([
          ...heroes,
          {
            id: id,
            name: name,
            height: height,
            weight: weight,
            alias: alias,
            hairColor: hairColor,
            workPlace: workPlace,
            eyeColor: eyesColor,
            image: image,
            powerStats,
          },
        ]);
        setBadAlignment(badAlignmentCount + 1);
        setCardMode("team");
      }
      if (alignment === "neutral" && badAlignmentCount >= 3) {
        setShowWarningBad(true);
        setTimeout(() => setShowWarningBad(false), 1500);
      }
    } else{
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 1500);
    }
  };

  const handleRemoveHero = () => {
    const newHeroes = heroes.filter((hero) => hero.id !== id);
    setHeroes(newHeroes);
    if (alignment === "good") {
      setGoodAlignment(goodAlignmentCount - 1);
    } else {
      setBadAlignment(badAlignmentCount - 1);
    }
  };

  let cardIcon;

  if (cardMode === "team") {
    cardIcon = (
      <FontAwesomeIcon
        onClick={handleRemoveHero}
        className="icon card-icon"
        icon={faTrashAlt}
      />
    );
  }
  if (cardMode === "search") {
    cardIcon = (
      <FontAwesomeIcon
        className="icon card-icon"
        icon={faPlusCircle}
        onClick={handleAddHero}
      />
    );
  }

  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleClickDetails = () => {
    setShowDetailsModal(true);
  };

  return (
    <>
      {image === "" ? (
        <Spinner animation="border" className="m-3" />
      ) : (
        <>
          <DetailsModal
            name={name}
            alias={alias}
            weight={weight}
            height={height}
            workPlace={workPlace}
            eyesColor={eyesColor}
            hairColor={hairColor}
            image={image}
            show={showDetailsModal}
            setShowDetailsModal={setShowDetailsModal}
          />

          <Card
            className="card m-2"
            style={{ maxWidth: "16rem", backgroundColor: "#2c3957" }}
          >
            <Card.Img className="card-image" variant="top" src={image} />
            <Card.Body>
              <Card.ImgOverlay className="d-flex flex-column p-0 ">
                <Card.Title className="card-title p-2 px-3 d-flex m-0">
                  {name}
                  {cardIcon}
                </Card.Title>
                <p className="alignment-card p-1">{alignmentIcon()}</p>
                {showWarning && 
                <p className="warning-sign">Too many heroes in your team</p>
                }
                {showWarningGood && (
                  <p className="warning-sign">Too many good heroes in your team</p>
                )}
                {showWarningBad && (
                  <p className="warning-sign">Too many bad heroes in your team</p>
                )}
                <Button
                  className="details-button"
                  variant="dark"
                  onClick={handleClickDetails}
                >
                  Details
                </Button>
              </Card.ImgOverlay>
              <Card.Text className="d-flex p-2 mb-4">
                <div className="hero-stats">
                  <FontAwesomeIcon className="icon" icon={faBrain} />{" "}
                  {intelligence}
                </div>
                <div className="hero-stats">
                  <FontAwesomeIcon className="icon" icon={faTachometerAlt} />{" "}
                  {speed}
                </div>
                <div className="hero-stats">
                  <FontAwesomeIcon className="icon" icon={faFistRaised} />{" "}
                  {combat}
                </div>
                <div className="hero-stats">
                  <FontAwesomeIcon className="icon" icon={faShieldAlt} />{" "}
                  {durability}
                </div>
                <div className="hero-stats">
                  <FontAwesomeIcon className="icon" icon={faDumbbell} />{" "}
                  {strength}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default HeroCard;
