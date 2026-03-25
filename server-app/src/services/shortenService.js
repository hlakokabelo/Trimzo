import { urlModel } from "../models/urlModel.js";

export const shortenUrl = async (req, res, { fullUrl, alias }) => {
  // if user not logged in and fullUrl already has shortened version, return that version
  if (!req.user?._id) {
    const urlFound = await urlModel.findOne({ fullUrl, user: null });
    if (urlFound) {
      const link = `/api/shortenUrl/${urlFound._doc.shortId}`;
      return res.status(201).json({ link, ...urlFound._doc });
    }
  } else {
    //if user already shortend url return the shortened one
    const urlFound = await urlModel.findOne({
      fullUrl,
      user: req.user?._id || null,
    });
    if (urlFound) {
      const link = `/api/shortenUrl/${urlFound._doc.shortId}`;
      return res.status(201).json({ link, ...urlFound._doc });
    }
  }

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
    const link = `/api/shortenUrl/${urlFound._doc.shortId}`;
    return { link, ...urlFound._doc };
  }
  return null;
};
