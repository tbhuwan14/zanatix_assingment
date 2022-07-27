import { useEffect, useState } from "react";
import { Button, Input, Row } from "reactstrap";
import DetailModal from "./DetailModal";
import Loader from "./Loader";
import PokemonCard from "./PokemonCard";
import "./styles.css";

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [state, setState] = useState({
    pageNo: 1,
    pageSize: 20,
    search: ""
  });
  const [timeOutId, setTimeOutId] = useState(null);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  async function fetchPokemonList(data) {
    const newState = { ...state, ...data };
    const { pageSize, pageNo } = newState;
    setState(newState);
    setLoading(true);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${pageNo}&name=${"ivysaur"}`
    );
    const { results, count } = await response.json();
    setTotalPages(Math.ceil(count / pageSize));
    const modifiedData = await Promise.all(
      results.map(async ({ url }) => {
        const response = await fetch(url);
        return await response.json();
      })
    );
    setPokemonList(modifiedData);
    setLoading(false);
  }

  const onSearchChange = ({ target: { value: search } }) => {
    setState((prev) => ({ ...prev, search }));
    clearTimeout(timeOutId);

    if (search.trim() === state.search.trim()) return;

    const newTimeOutId = setTimeout(() => {
      // fetchPokemonList({ search, pageNo: 1 });
    }, 500);
    setTimeOutId(newTimeOutId);
  };

  const onSelect = (data) => {
    setSelectedPokemon(data);
    toggle();
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      {loading && <Loader />}
      <DetailModal toggle={toggle} isOpen={isOpen} {...selectedPokemon} />
      <div className="d-flex justify-content-between">
        <div>
          <Input
            value={state.search}
            name="search"
            placeholder="Search Here"
            onChange={onSearchChange}
          />
        </div>
        <div>
          <Input type="select" name="select">
            {/* <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option> */}
          </Input>
        </div>
      </div>
      <div>
        <Row className="d-flex justify-content-around">
          {pokemonList.map((pokemon) => (
            <PokemonCard onClick={onSelect} key={pokemon.id} {...pokemon} />
          ))}
        </Row>
      </div>
      <div className="m-4 d-flex justify-content-between">
        <Button
          disabled={state.pageNo === 1}
          color="primary"
          onClick={() => fetchPokemonList({ pageNo: state.pageNo - 1 })}
        >
          Prev
        </Button>
        <Button
          disabled={state.pageNo >= totalPages}
          color="primary"
          onClick={() => fetchPokemonList({ pageNo: state.pageNo + 1 })}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
