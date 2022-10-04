import { useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");
  const { searchRepositories } = useActions();

  // useTypedSelector - custom hook = useSelector + RootState
  // or We can just add RootState to the State - (state: RootState) => state.repositories
  // and use useSelector instead
  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );
  console.log(data);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchRepositories(term);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
        />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && (
        <img
          src="https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=790b7611d9a62f91843c7e0300258f863466639f6d2b4998&rid=giphy.gif&ct=g"
          alt="loading"
          style={{ height: "100px", width: "100px" }}
        />
      )}
      {!error && !loading && (
        <div className="package-list">
          <ul>
            {data.map((packageEl: string) => {
              return <li>{packageEl}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
