import { readFileSync } from "fs";
import { UserData } from "../data/UserData";

export class JsonIterator implements Iterable<UserData> {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  [Symbol.iterator](): Iterator<UserData> {
    const content = readFileSync(this.filePath, "utf8");
    const users: UserData[] = JSON.parse(content);

    let index = 0;

    return {
      next(): IteratorResult<UserData> {
        if (index >= users.length) {
          return { done: true, value: undefined };
        }

        const userData = users[index++];
        return { done: false, value: userData };
      },
    };
  }
}
