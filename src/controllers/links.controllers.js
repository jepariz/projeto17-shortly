import { nanoid } from "nanoid";
import {
  addVisitCount,
  createShortenUrl,
  deleteUrlFromDb,
  findShortUrls,
  findUrls,
} from "../repository/links.repositories.js";

export async function shortenUrl(req, res) {
  const { url, userId } = res.locals;

  const shortUrl = nanoid(8);

  try {
    await createShortenUrl(url, shortUrl, userId);
    return res.status(201).send(shortUrl);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function listsUrl(req, res) {
  const { id } = req.params;

  try {
    const getUrl = await findUrls(id);

    if (getUrl.rowCount > 0) {
      const url = {
        id: getUrl.rows[0].id,
        shortUrl: getUrl.rows[0].shortUrl,
        url: getUrl.rows[0].url,
      };
      return res.status(201).send(url);
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function redirect(req, res) {
  const { shortUrl } = req.params;

  try {
    const getShortUrl = await findShortUrls(shortUrl);

    if (getShortUrl.rowCount > 0) {
      const url = `localhost:4000/${getShortUrl.rows[0].shortUrl} `;
      const id = getShortUrl.rows[0].id;
      await addVisitCount(id);
      return res.redirect(url);
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function deleteUrl(req, res) {
  const id = res.locals;

  try {
    await deleteUrlFromDb(id);
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
