import { DataExporter } from "./DataExporter";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export class XmlExporter extends DataExporter {
  protected render(): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const usersOpen = "<users>";
    const usersClose = "</users>";

    const userElements = this.data.map((user) => {
      return `  <user>
    <id>${user.id}</id>
    <name>${user.name}</name>
    <email>${user.email}</email>
    <phone>${user.phone}</phone>
  </user>`;
    });

    return [xmlHeader, usersOpen, ...userElements, usersClose].join("\n");
  }

  protected afterRender(): void {
    this.result += `\n<!-- Експорт згенеровано: ${new Date().toISOString()} -->`;
  }

  protected save(): void {
    const filePath = "dist/users.xml";
    const dir = dirname(filePath);

    if (!existsSync(dir) && dir !== ".") {
      mkdirSync(dir, { recursive: true });
    }

    writeFileSync(filePath, this.result, "utf8");
    console.log(`XML file saved: ${filePath}`);
  }
}
