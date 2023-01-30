import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { IFullMatch, IMatches } from '../interfaces/matches.interface';

export default class MatchesService {
  public static getAllMatches = async (): Promise<Matches[]> => {
    const matches = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });

    return matches;
  };

  public createMatch = async (dados: IFullMatch) => {
    const matches = await Matches.create({ ...dados, inProgress: true });

    return matches;
  };

  public finishMatch = async (id: number): Promise<void> => {
    await Matches.update({ inProgress: false }, { where: { id } });
  };

  public editedMatch = async (id: number, data: Partial<IMatches>): Promise<void> => {
    await Matches.update({ ...data }, { where: { id } });
  };
}
