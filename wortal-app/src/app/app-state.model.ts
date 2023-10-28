import { Member } from "./core/core.model";

export interface AppState {
  member: Member | undefined;
}

export interface StoreModel {
  app: {
    member: Member | undefined;
  }
}
