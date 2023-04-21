import { useEffect, useState } from "react";

const MiApi = () => {
  const [personajes, setPersonajes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchApiRickAndMorty = async () => {
      const endpointPersonajes =
        "https://rickandmortyapi.com/api/character?page=" + pagina;
      try {
        const respuesta = await fetch(endpointPersonajes);
        const dataPersonajes = await respuesta.json();
        setPersonajes(dataPersonajes.results);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchApiRickAndMorty();
  }, [pagina]);

  const estilosTarjeta = {
    display: "inline-block",
    width: "180px",
    borderRadius: "5px",
    background: "#ccc",
    margin: "10px",
    boxShadow: "2px 3px 8px black",
    overflow: "hidden"
  };

  const paginarAdelante = () => {
    if (pagina === 42) {
      setPagina(42);
    } else {
      setPagina(pagina + 1);
    }
  };

  const paginarAtras = () => {
    if (pagina <= 1) {
      setPagina(1);
    } else {
      setPagina(pagina - 1);
    }
  };

  const estilosInput = {
    fontSize: "19px",
    padding: "3px",
    width: "50%",
    margin: "20px"
  };

  return (
    <div className="App">
      <input
        type="search"
        style={estilosInput}
        placeholder="Filtrar por nombres"
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <div>
        <button onClick={paginarAtras} className="botones">
          Ir hacia atras
        </button>
        <button onClick={paginarAdelante} className="botones">
          Ir hacia adelante
        </button>
        <br />
        <br />
        {pagina}
      </div>
      {personajes ? (
        personajes
          .filter((personaje) => {
            return personaje.name
              .toLowerCase()
              .includes(busqueda.toLowerCase());
          })
          .sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          })
          .map((personaje) => {
            return (
              <div key={personaje.id} style={estilosTarjeta}>
                <img src={personaje.image} height="180" />
                <br />
                <h3>{personaje.name}</h3>
                {personaje.status === "Alive" ? (
                  <h4>
                    <span className="status alive"></span> Vivo
                  </h4>
                ) : (
                  <h4>
                    <span className="status dead"></span> Muerto
                  </h4>
                )}
              </div>
            );
          })
      ) : (
        <h2>Aún cargando...</h2>
      )}
    </div>
  );
};
export default MiApi;
