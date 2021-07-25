import { useState, useEffect, ChangeEvent } from "react";
import { axios } from "./setup/axios";
import camelize from "camelize";
import { TeamTable } from "./TeamTable";
import { TeamWithMultipleResultType, TeamWithSingleResultType } from "./types";

async function getTeams() {
  return await axios.get("/api/teams");
}

function getAllYears(teams: TeamWithMultipleResultType[]) {
  return Array.from(
    new Set(
      teams
        .map((team) => {
          return team.results.map((result) => {
            return result.year;
          });
        })
        .flat()
    )
  ).sort((a, b) => b - a);
}

function extractByYear(teams: TeamWithMultipleResultType[], year: number) {
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

function sortByRank(teams: TeamWithSingleResultType[]) {
  return teams.sort((a, b) => {
    if (a.result && b.result) return a.result.rank - b.result.rank;
    if (!a.result && b.result) return 1;
    return -1;
  });
}

type YearSelectProps = {
  years: number[];
  year: number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

function YearSelect({ years, year, onChange }: YearSelectProps) {
  return (
    <select className="text-2xl border mb-7" value={year} onChange={onChange}>
      {years.map((option) => {
        return (
          <option value={option} key={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}

function App() {
  const [teams, setTeams] = useState<TeamWithMultipleResultType[]>([]);
  const years = getAllYears(teams);
  const [year, setYear] = useState(years[0] | 2020);

  function changeYear(e: ChangeEvent<HTMLSelectElement>) {
    setYear(Number(e.target.value));
  }

  useEffect(() => {
    getTeams().then((res) => {
      const data: TeamWithMultipleResultType[] = camelize(res.data.data);
      setTeams(data);
    });
  }, []);

  const centralTeams = teams.filter((team) => team.league === "central");
  const pacificTeams = teams.filter((team) => team.league === "pacific");

  const sortedCentralTeams = sortByRank(extractByYear(centralTeams, year));
  const sortedPacificTeams = sortByRank(extractByYear(pacificTeams, year));

  return (
    <div className="container mx-7 my-7">
      <header className="text-3xl mb-7">チーム成績</header>
      <YearSelect years={years} year={year} onChange={changeYear} />
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
