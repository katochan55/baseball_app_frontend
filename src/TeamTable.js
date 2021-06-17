export function TeamTable({ teams, color }) {
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
            創立年
          </th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => {
          return (
            <tr key={team.id}>
              <th className="border text-xl font-normal px-2 py-1">
                {team.result.rank}
              </th>
              <th className="border text-xl font-normal px-2 py-1">
                {team.name}
              </th>
              <th className="border text-xl font-normal px-2 py-1">
                {team.result.winsCount}
              </th>
              <th className="border text-xl font-normal px-2 py-1">
                {team.result.losesCount}
              </th>
              <th className="border text-xl font-normal px-2 py-1">
                {team.foundedYear}
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
