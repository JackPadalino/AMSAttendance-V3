const app = require("./app");

const init = async () => {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

init();