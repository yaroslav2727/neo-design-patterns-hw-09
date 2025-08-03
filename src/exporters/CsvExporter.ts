import { DataExporter } from "./DataExporter";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export class CsvExporter extends DataExporter {
  protected render(): string {
    const header = "id,name,email,phone";

    const rows = this.data.map(
      (user) => `${user.id},${user.name},${user.email},${user.phone}`
    );

    return [header, ...rows].join("\n");
  }

  protected save(): void {
    const filePath = "dist/users.csv";
    const dir = dirname(filePath);

    if (!existsSync(dir) && dir !== ".") {
      mkdirSync(dir, { recursive: true });
    }

    writeFileSync(filePath, this.result, "utf8");
    console.log(`CSV file saved: ${filePath}`);
  }
}
