import { createEleganceClient } from "@singlestore/elegance-sdk";

export const eleganceClient = createEleganceClient("mysql", { baseURL: "http://localhost:3000/api" });
