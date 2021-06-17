import { useState, useEffect } from "react";
import { axios } from "./setup/axios";
import camelize from "camelize";
import { TeamTable } from "./TeamTable";

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

function App() {
  const { sortedCentralTeams, sortedPacificTeams } = useApp();
  return (
    <div className="container mx-7 my-7">
      <header className="text-3xl mb-7">チーム成績</header>
      <select className="text-2xl border mb-7">
        <option value="2020">2020</option>
      </select>
      <span className="text-2xl">年成績</span>
      <section>
        <p className="text-3xl">セ・リーグ順位表</p>
        <TeamTable teams={sortedCentralTeams} color="green" />
      </section>
      <section className="mt-7">
        <p className="text-3xl">パ・リーグ順位表</p>
        <TeamTable teams={sortedPacificTeams} color="blue" />
      </section>
    </div>
  );
}

export default App;
