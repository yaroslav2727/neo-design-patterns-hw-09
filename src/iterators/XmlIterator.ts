import { readFileSync } from "fs";
import { UserData } from "../data/UserData";
import { XMLParser } from "fast-xml-parser";

export class XmlIterator implements Iterable<UserData> {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  [Symbol.iterator](): Iterator<UserData> {
    const content = readFileSync(this.filePath, "utf8");
    const parser = new XMLParser();
    const parsed = parser.parse(content);

    const users: UserData[] = Array.isArray(parsed.users.user)
      ? parsed.users.user
      : [parsed.users.user];

    let index = 0;

    return {
      next(): IteratorResult<UserData> {
        if (index >= users.length) {
          return { done: true, value: undefined };
        }

        const user = users[index++];
        const userData: UserData = {
          id: typeof user.id === "string" ? parseInt(user.id, 10) : user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        };

        return { done: false, value: userData };
      },
    };
  }
}
