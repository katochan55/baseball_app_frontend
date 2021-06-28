import { TeamWithSingleResultType } from "./types";

type Props = {
  teams: TeamWithSingleResultType[];
  color: string;
};

export function TeamTable({ teams, color }: Props) {
  if (!teams[0]) return <div></div>;
  const topWinsCount = teams[0].result ? teams[0].result.winsCount : 0;
  const topLosesCount = teams[0].result ? teams[0].result.losesCount : 0;
  return (
    <table className="table-fixed w-3/5 my-3 border-collapse border">
      <thead>
        <tr
          className={`p-3 border bg-gradient-to-r from-${color}-300 to-${color}-100`}
        >
          <th className="w-1/8 border text-lg text-gray-500 font-normal px-2 py-1">
            順位
          </th>
          <th className="w-1/2 border text-lg text-gray-500 font-normal px-2 py-1">
            チーム名
          </th>
          <th className="w-1/8 border text-lg text-gray-500 font-normal px-2 py-1">
            勝
          </th>
          <th className="w-1/8 border text-lg text-gray-500 font-normal px-2 py-1">
            負
          </th>
          <th className="w-1/8 border text-lg text-gray-500 font-normal px-2 py-1">
            勝率
          </th>
          <th className="w-1/8 border text-lg text-gray-500 font-normal px-2 py-1">
            差
          </th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => {
          const winsCount = team.result ? team.result.winsCount : 0;
          const losesCount = team.result ? team.result.losesCount : 0;
          const winRate = `.${Math.trunc(
            (winsCount / (winsCount + losesCount)) * 1000
          )}`;
          const gamesBehind =
            (topWinsCount - topLosesCount - (winsCount - losesCount)) / 2;
          const formattedGamesBehind = gamesBehind === 0 ? "-" : gamesBehind;
          const rank = team.result ? team.result.rank : "-";
          return (
            <tr key={team.id}>
              <th className="border text-xl font-normal px-2 py-1">{rank}</th>
              <th className="border text-xl font-normal px-2 py-1">
                {team.name}
              </th>
              <th className="border text-xl font-normal px-2 py-1">
                {winsCount}
              </th>
              <th className="border text-xl font-normal px-2 py-1">
                {losesCount}
              </th>
              <th className="border text-xl font-normal px-2 py-1">
                {winRate}
              </th>
              <th className="border text-xl font-normal px-2 py-1">
                {formattedGamesBehind}
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
