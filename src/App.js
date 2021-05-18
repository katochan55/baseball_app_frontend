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

  const centralTeams = teams.filter((team) => team.league === "central");
  const pacificTeams = teams.filter((team) => team.league === "pacific");

  return { centralTeams, pacificTeams };
}

function App() {
  const { centralTeams, pacificTeams } = useApp();
  return (
    <div className="container mt-5">
      <section>
        <h2>セ・リーグ</h2>
        <ul>
          {centralTeams.map((team) => {
            return (
              <li key={team.id}>
                {team.name}, {team.founded_year}
              </li>
            );
          })}
        </ul>
      </section>
      <section className="mt-4">
        <h2>パ・リーグ</h2>
        <ul>
          {pacificTeams.map((team) => {
            return (
              <li key={team.id}>
                {team.name}, {team.founded_year}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default App;
