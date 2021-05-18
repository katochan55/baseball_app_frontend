import { useState, useEffect } from "react";
import { axios } from "./setup/axios";

async function getTeams() {
  return await axios.get("/api/teams");
}

function App() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams().then((res) => {
      const data = res.data.data;
      setTeams(data);
    });
  }, []);

  return (
    <ul>
      {teams.map((team) => {
        return (
          <li key={team.id}>
            {team.name}, {team.founded_year}
          </li>
        );
      })}
    </ul>
  );
}

export default App;
