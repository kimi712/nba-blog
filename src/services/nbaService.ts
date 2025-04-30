import axios from 'axios';
import * as cheerio from 'cheerio';

export interface NBANews {
  title: string;
  link: string;
  image?: string;
  summary?: string;
  date?: string;
  isGenerated?: boolean;
}

export const fetchNBANews = async (): Promise<NBANews[]> => {
  try {
    const response = await axios.get('https://www.nbcsports.com/nba/news');
    const $ = cheerio.load(response.data);
    const news: NBANews[] = [];

    $('.article-card').each((_, element) => {
      const title = $(element).find('.article-card__title').text().trim();
      const link = $(element).find('a').attr('href') || '';
      const image = $(element).find('img').attr('src');
      const summary = $(element).find('.article-card__description').text().trim();
      const date = $(element).find('.article-card__date').text().trim();

      if (title && link) {
        news.push({
          title,
          link: `https://www.nbcsports.com${link}`,
          image,
          summary,
          date,
          isGenerated: false
        });
      }
    });

    return news;
  } catch (error) {
    console.error('Error fetching NBA news:', error);
    return [];
  }
};

const topics = [
  '勒布朗·詹姆斯的职业生涯里程碑',
  '金州勇士队的王朝之路',
  'NBA季后赛最激动人心的时刻',
  '新秀球员的成长之路',
  '联盟交易截止日的重大交易',
  '全明星周末的精彩表现',
  'NBA历史上最伟大的对决',
  '球队重建的成功案例',
  '教练战术创新与变革',
  '球员数据分析与发展趋势'
];

export const generateNBANews = async (topic?: string): Promise<NBANews> => {
  const currentDate = new Date().toLocaleDateString('zh-CN');
  const selectedTopic = topic || topics[Math.floor(Math.random() * topics.length)];
  
  // 模拟生成新闻内容
  const generateContent = () => {
    const templates = [
      {
        title: `${selectedTopic}：深度分析与展望`,
        summary: `本文将深入探讨${selectedTopic}，为球迷带来独特的视角和专业的分析。通过数据统计和专家观点，我们将全方位解读这一主题的方方面面。`
      },
      {
        title: `${selectedTopic}：最新进展报道`,
        summary: `关于${selectedTopic}的最新动态引发了广泛关注。本文将为您详细介绍相关发展，并分析其对NBA的深远影响。`
      },
      {
        title: `专题：聚焦${selectedTopic}`,
        summary: `${selectedTopic}作为NBA近期热点话题，吸引了众多球迷的目光。本文将从多个角度出发，为您带来全面的报道与分析。`
      }
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  };

  const content = generateContent();
  return {
    title: content.title,
    summary: content.summary,
    date: currentDate,
    link: '#',
    image: 'https://a.espncdn.com/combiner/i?img=/i/espn/misc_logos/500/nba.png',
    isGenerated: true
  };
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
