import { getRanking } from "../repository/ranking.repositories.js";

export async function ranking(req, res) {
  try {
    const ranking = await getRanking();

    const rankingData = ranking.rows;

    const response = rankingData.map((row) => ({
      id: row.id,
      name: row.name,
      linksCount: row.linksCount,
      visitCount: row.visitCount,
    }));

    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
