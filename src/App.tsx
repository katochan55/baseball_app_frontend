import { useState, useEffect } from "react";
import { axios } from "./setup/axios";
import camelize from "camelize";
import { TeamTable } from "./TeamTable";
import { TeamWithMultipleResultType, TeamWithSingleResultType } from "./types";

async function getTeams() {
  return await axios.get("/api/teams");
}

function ExtractByYear(teams: TeamWithMultipleResultType[], year: number) {
  return teams.map((team) => {
    const result = team.results.find((el) => el.year === year);
    const { id, name, foundedYear, league } = { ...team };
    return {
      id,
      name,
      foundedYear,
      league,
      result,
    };
  });
}

function SortByRank(teams: TeamWithSingleResultType[]) {
  return teams.sort((a, b) => {
    if (a.result && b.result) return a.result.rank - b.result.rank;
    if (!a.result && b.result) return 1;
    return -1;
  });
}

function useApp() {
  const [teams, setTeams] = useState<TeamWithMultipleResultType[]>([]);

  useEffect(() => {
    getTeams().then((res) => {
      const data: TeamWithMultipleResultType[] = camelize(res.data.data);
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
