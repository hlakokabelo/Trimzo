import { urlModel } from "../models/urlModel.js";

export const shortenUrl = async (req, res, { fullUrl, alias }) => {
  const newUrl = await urlModel.create({
    fullUrl,
    shortId: alias || undefined,
    user: req.user?._id || null, // attach user if logged in
  });

  const link = `http://localhost:5000/api/shortenUrl/${newUrl.shortId}`;

  res.status(201).json({
    apiLink: link,
    ...newUrl._doc,
  });
};

export const findByAlias = async (alias) => {
  const urlFound = await urlModel.findOne({ shortId: alias });
  if (urlFound) {
    const link = `http://localhost:5000/api/shortenUrl/${urlFound._doc.shortId}`;

    return { link, ...urlFound._doc };
  }
  return null;
};
