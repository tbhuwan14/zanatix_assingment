import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

export default function DetailModal(props) {
  const { isOpen, name, id, types, toggle } = props;
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Pokemon Details</ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <img
              className="pokemon_image"
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
              alt="pokemon"
            />
          </Col>
          <Col className="">
            <Row>
              <Col>
                <span>Name : </span>
                <span>{name}</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>Type : </span>
                <span>
                  {types?.map(({ type }) => type?.name || "").join(", ")}
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>ID : </span>
                <span>{id}</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}
