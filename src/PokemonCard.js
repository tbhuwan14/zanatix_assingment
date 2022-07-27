import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

export default function PokemonCard(props) {
  const { name, id, types, onClick } = props;
  return (
    <Col className="m-2 col-sm-2">
      <Card onClick={() => onClick({ name, id, types })}>
        <CardHeader
          className="mx-auto"
          style={{ height: "100px", width: "100px", overflow: "hidden" }}
        >
          <img
            className="pokemon_image"
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
            alt="pokemon"
          />
        </CardHeader>
        <CardBody>
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
                {types.map(({ type }) => type?.name || "").join(", ")}
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span>ID : </span>
              <span>{id}</span>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
}
