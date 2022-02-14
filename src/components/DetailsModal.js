import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DetailsModal = ({
  name,
  image,
  alias,
  weight,
  height,
  workPlace,
  eyesColor,
  hairColor,
  show,
  setShowDetailsModal,
}) => {


  // Funcion para sumar a la variable aliases todos los alias con una coma al final,
  // para luego quitar la coma final de la cadena en el componente

  let aliases = "";

  for (let i = 0; i < alias.length; i++) {
    aliases+=` ${alias[i]},`
  }

  const handleClickClose = () => {
    setShowDetailsModal(false);
  };

  return (
    <>
      <Modal
        className="details-modal"
        show={show}
        onHide={handleClickClose}
        centered
        size="lg"
      >
        <Modal.Header className="details-modal-header" closeButton>
          <Modal.Title className="details-modal-title">{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="details-modal-body d-flex flex-column flex-sm-row">
          <div className="d-flex justify-content-center align-items-center">
            <img className="details-image" src={image} alt="" />
          </div>
          <div className="pt-3 pt-sm-0 ps-4">
            <p>
              <span>Alias:</span>
              {/* Con esto quitamos el ultimo caracter de la cadena, que es la coma */}
              {aliases.slice(0,-1)}
            </p>
            <p>
              <span>Weight:</span> {weight}
            </p>
            <p>
              <span>Height:</span> {height}
            </p>
            <p>
              <span>Workplace:</span> {workPlace}
            </p>
            <p>
              <span>Eye color:</span> {eyesColor.charAt(0).toUpperCase()}
              {eyesColor.slice(1)}
            </p>
            <p>
              <span>Hair color:</span> {hairColor.charAt(0).toUpperCase()}
              {hairColor.slice(1)}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="details-modal-footer">
          <Button variant="dark" onClick={handleClickClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DetailsModal;
