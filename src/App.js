import { useState, useEffect } from "react";
import { axios } from "./setup/axios";

async function getTeams() {
  return await axios.get("/api/teams");
}

function useApp() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams().then((res) => {
      const data = res.data.data;
      setTeams(data);
    });
  }, []);

  return { teams };
}

function App() {
  const { teams } = useApp();
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
