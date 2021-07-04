type TeamType = {
  id: number;
  name: string;
  foundedYear: number;
  league: string;
};

type TeamResultType = {
  id: number;
  teamId: number;
  year: number;
  rank: number;
  winsCount: number;
  losesCount: number;
};

export type TeamWithSingleResultType = TeamType & {
  result?: TeamResultType;
};

export type TeamWithMultipleResultType = TeamType & {
  results: TeamResultType[];
};
