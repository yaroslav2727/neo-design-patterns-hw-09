import { DataExporter } from "./DataExporter";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export class JsonExporter extends DataExporter {
  protected render(): string {
    return JSON.stringify(this.data, null, 2);
  }

  protected save(): void {
    const filePath = "dist/users.json";
    const dir = dirname(filePath);

    if (!existsSync(dir) && dir !== ".") {
      mkdirSync(dir, { recursive: true });
    }

    writeFileSync(filePath, this.result, "utf8");
    console.log(`JSON file saved: ${filePath}`);
  }
}
