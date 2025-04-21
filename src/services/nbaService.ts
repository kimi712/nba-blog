import axios from 'axios';
import * as cheerio from 'cheerio';

export interface NBANews {
  title: string;
  link: string;
  image?: string;
  summary?: string;
  date?: string;
}

export const fetchNBANews = async (): Promise<NBANews[]> => {
  try {
    const response = await axios.get('https://www.nbcsports.com/nba', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const news: NBANews[] = [];

    // 提取新闻文章
    $('article').each((_, element) => {
      const article = $(element);
      const title = article.find('h2').text().trim();
      const link = article.find('a').attr('href');
      const image = article.find('img').attr('src');
      const summary = article.find('p').text().trim();
      const date = article.find('time').text().trim();

      if (title && link) {
        news.push({
          title,
          link: link.startsWith('http') ? link : `https://www.nbcsports.com${link}`,
          image,
          summary,
          date
        });
      }
    });

    return news;
  } catch (error) {
    console.error('Error fetching NBA news:', error);
    return [];
  }
};

// 获取球队数据
export const fetchTeams = async () => {
  try {
    const response = await axios.get('https://www.nbcsports.com/nba/teams');
    const $ = cheerio.load(response.data);
    const teams: any[] = [];

    $('.team-card').each((_, element) => {
      const team = $(element);
      teams.push({
        name: team.find('.team-name').text().trim(),
        city: team.find('.team-city').text().trim(),
        logo: team.find('img').attr('src'),
        record: team.find('.team-record').text().trim()
      });
    });

    return teams;
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
};

// 获取球员数据
export const fetchPlayers = async () => {
  try {
    const response = await axios.get('https://www.nbcsports.com/nba/players');
    const $ = cheerio.load(response.data);
    const players: any[] = [];

    $('.player-card').each((_, element) => {
      const player = $(element);
      players.push({
        name: player.find('.player-name').text().trim(),
        team: player.find('.player-team').text().trim(),
        position: player.find('.player-position').text().trim(),
        image: player.find('img').attr('src')
      });
    });

    return players;
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};
