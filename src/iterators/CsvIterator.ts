import { readFileSync } from "fs";
import { UserData } from "../data/UserData";

export class CsvIterator implements Iterable<UserData> {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  [Symbol.iterator](): Iterator<UserData> {
    const content = readFileSync(this.filePath, "utf8");
    const lines = content.trim().split("\n");
    const dataLines = lines.slice(1);

    let index = 0;

    return {
      next(): IteratorResult<UserData> {
        if (index >= dataLines.length) {
          return { done: true, value: undefined };
        }

        const line = dataLines[index++];
        const [id, name, email, phone] = line.split(",");

        const userData: UserData = {
          id: parseInt(id, 10),
          name,
          email,
          phone,
        };

        return { done: false, value: userData };
      },
    };
  }
}
