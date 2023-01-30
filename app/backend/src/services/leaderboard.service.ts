import Teams from '../database/models/Teams';
import MatchesService from './matches.service';
import { IMatches } from '../interfaces/matches.interface';
import { ITeams } from '../interfaces/teams.interface';
import IResultMatch from '../interfaces/leaderboard.interface';

type resultsMatchers = { wins: number, loses: number, draws: number };

export default class LeaderboardService {
  public static getResultsMatches = (matches: IMatches[], id: number)
  : resultsMatchers => matches.reduce((acc, c) => {
    const match: boolean = c.homeTeamId === id; const result = c.homeTeamGoals - c.awayTeamGoals;
    // console.log(match);
    if (result > 0) {
      if (!match) {
        return { ...acc, loses: acc.loses + 1 };
      } if (match) {
        return { ...acc, wins: acc.wins + 1 };
      }
    }

    if (result < 0) {
      if (!match) {
        return { ...acc, wins: acc.wins + 1 };
      } if (match) {
        return { ...acc, loses: acc.loses + 1 };
      }
    }

    if (result === 0) return { ...acc, draws: acc.draws + 1 };

    return acc;
  }, { wins: 0, loses: 0, draws: 0 });

  public static getMatchesTeams = (matches: IMatches[], id: number, home?: boolean)
  : IMatches[] => matches.filter(({ homeTeamId, awayTeamId }) => {
    // !home ? homeTeamId === id || awayTeamId === id : homeTeamId === id;
    if (home) return homeTeamId === id;
    if (home === undefined) return homeTeamId === id || awayTeamId === id;

    const resultt = awayTeamId === id;
    // console.log(result);

    return resultt;
  });

  public static getGolsTeams = (matches: IMatches[], id: number, favor: boolean)
  : number => matches.reduce((acc, { homeTeamId, homeTeamGoals, awayTeamGoals }) => {
    const match: boolean = !favor ? homeTeamId !== id : homeTeamId === id;
    // console.log(match)

    if (!match) return acc + awayTeamGoals;

    return acc + homeTeamGoals;
  }, 0);

  public static sortOrder = (LB: IResultMatch[]): IResultMatch[] => LB.sort((teamA, teamB) => {
    const victories = teamB.totalVictories - teamA.totalVictories;
    const points = teamB.totalPoints - teamA.totalPoints;
    const goals = teamB.goalsBalance - teamA.goalsBalance;
    const own = teamB.goalsOwn - teamA.goalsOwn;
    const favor = teamB.goalsFavor - teamA.goalsFavor;

    if (points !== 0) return points;

    if (victories !== 0) return victories;

    if (goals !== 0) return goals;

    if (favor !== 0) return favor;

    return own;
  });

  public static getScoreResults = (matches: IMatches[], id: number, home?: boolean)
  : Omit<IResultMatch, 'name'> => {
    const matchess = this.getMatchesTeams(matches, id, home);
    const resultsMatches = this.getResultsMatches(matchess, id);
    // console.log(results)
    const ownMatches = this.getGolsTeams(matchess, id, false);
    // console.log(own)
    const totalMatches = (resultsMatches.wins * 3) + resultsMatches.draws;
    // console.log(total)
    const favorMatches = this.getGolsTeams(matchess, id, true);
    // console.log(favor)

    return {
      totalPoints: totalMatches,
      totalGames: matchess.length,
      totalVictories: resultsMatches.wins,
      totalDraws: resultsMatches.draws,
      totalLosses: resultsMatches.loses,
      goalsFavor: favorMatches,
      goalsOwn: ownMatches,
      goalsBalance: favorMatches - ownMatches,
      efficiency: Number(((totalMatches / (matchess.length * 3)) * 100).toFixed(2)),
    };
  };

  public static getAllTeams = async (): Promise<ITeams[]> => {
    const teams = await Teams.findAll();

    return teams;
  };

  public static getLeaderboardComplete = async (home?: boolean): Promise<IResultMatch[]> => {
    const allTeams = await this.getAllTeams();
    const allMatches = (await MatchesService.getAllMatches());
    // console.log(teams);
    // console.log(matches);

    const matchesFiltered = allMatches.filter(({ inProgress }) => !inProgress);
    // console.log(matchesFiltered)

    const orderboard = allTeams.map(({ teamName, id }) => ({
      name: teamName,
      ...this.getScoreResults(matchesFiltered, id, home),
    }));

    const leaderboardOrdened = this.sortOrder(orderboard);
    // console.log(leaderboardOrdened)

    return leaderboardOrdened as IResultMatch[];
  };
}
