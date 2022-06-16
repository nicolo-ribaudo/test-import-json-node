import fs from "fs";

export function load(url, context, defaultLoad) {
  if (url.toString().endsWith(".json")) {
    const json = fs.readFileSync(new URL(url).pathname, "utf8");
    return {
      format: "module",
      source: `
        const json = ${json};
        export { json as default };
        export const ${
          Object.keys(JSON.parse(json)).map(k => `${k} = json.${k}`).join(",")
        };
      `,
    };
  }
  return defaultLoad(url, context, defaultLoad);
}
