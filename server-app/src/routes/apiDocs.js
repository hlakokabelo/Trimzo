import express from "express";

const router = express.Router();
// Self-documenting root route
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Trimzo API",
    description: "Trimzo lets you shorten URLs via API or the frontend UI.",
    endpoints: {
      shortenUrl: {
        method: "GET",
        url: "/api/shortenUrl",
        query: {
          link: "URL to shorten",
          alias: "(optional) custom alias",
        },
        description:
          "Shorten a URL. Returns JSON with the shortened link and metadata.",
      },
      getUrl: {
        method: "GET",
        url: "/api/shortenUrl/:id",
        description:
          "Retrieve shortened URL info by its alias or auto-generated ID.",
      },
      frontend: {
        url: "https://trimzo.vercel.app/",
        description: "Use the frontend UI to shorten and manage your URLs.",
      },
    },
  });
});
export default router;
