import { useState, useEffect } from "react";
import { axios } from "./setup/axios";
import camelize from "camelize";

async function getTeams() {
  return await axios.get("/api/teams");
}

function ExtractByYear(teams, year) {
  return teams.map((team) => {
    const result = team.results.find((el) => el.year === year);
    return {
      ...team,
      result: result,
    };
  });
}

function SortByRank(teams) {
  return teams.sort((a, b) => a.result.rank - b.result.rank);
}

function useApp() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams().then((res) => {
      const data = camelize(res.data.data);
      setTeams(data);
    });
  }, []);

  const centralTeams = teams.filter((team) => team.league === "central");
  const pacificTeams = teams.filter((team) => team.league === "pacific");

  const sortedCentralTeams = SortByRank(ExtractByYear(centralTeams, 2020));
  const sortedPacificTeams = SortByRank(ExtractByYear(pacificTeams, 2020));

  return { sortedCentralTeams, sortedPacificTeams };
}

function Team({ team }) {
  return (
    <li>
      {team.name}, {team.foundedYear}, {team.result.rank}
    </li>
  );
}

function App() {
  const { sortedCentralTeams, sortedPacificTeams } = useApp();
  return (
    <div className="container mt-5">
      <section>
        <h2>セ・リーグ</h2>
        <ul>
          {sortedCentralTeams.map((team) => {
            return <Team team={team} key={`c-${team.id}`} />;
          })}
        </ul>
      </section>
      <section className="mt-4">
        <h2>パ・リーグ</h2>
        <ul>
          {sortedPacificTeams.map((team) => {
            return <Team team={team} key={`p-${team.id}`} />;
          })}
        </ul>
      </section>
    </div>
  );
}

export default App;
