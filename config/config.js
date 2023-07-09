const fs = require("fs");
const yaml = require("js-yaml");

// Read the YAML file
const fileContents = fs.readFileSync(__dirname + "/config.yaml", "utf8");

module.exports = {
  config: yaml.load(fileContents),
};
