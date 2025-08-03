import { UserData } from "../data/UserData";
import fetch from "node-fetch";

export abstract class DataExporter {
  protected data: UserData[] = [];
  protected result: string = "";

  public async export(): Promise<void> {
    await this.load();
    this.transform();
    this.beforeRender();
    this.result = this.render();
    this.afterRender();
    this.save();
  }

  protected async load(): Promise<void> {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = (await response.json()) as any[];

      this.data = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }));
    } catch (error) {
      console.error("Error loading data:", error);
      throw error;
    }
  }

  protected transform(): void {
    this.data = this.data
      .map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  protected beforeRender(): void {
    // hook
  }

  protected afterRender(): void {
    // hook
  }

  protected abstract render(): string;
  protected abstract save(): void;
}
