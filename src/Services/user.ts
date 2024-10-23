import { DefaultUserModel, UserModel } from "@/models/user";

export class UserService {
  static baseUrl = "https://jsonplaceholder.typicode.com";

  static async getAll(): Promise<UserModel[]> {
    const response = await fetch(this.baseUrl + "/users", {
      method: "GET",
      cache: "no-cache",
    });

    if (response.ok !== true) {
      const isJson = response.headers.get("Content-Type");
      if (isJson) throw await response.json();
      throw new Error("Not authorized");
    }

    const data = (await response.json()) as DefaultUserModel[];

    return data.map(
      ({ id, name, username, email, phone, address, company }) => ({
        id,
        name,
        username,
        email,
        phone,
        city: address?.city || "",
        company: company?.name || "",
      })
    );
  }
}
