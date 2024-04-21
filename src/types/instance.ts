import { Timestamp } from "firebase-admin/firestore";

export type InstanceType = "cloud_compute" | "dedicated" | "gaming";
export type Locations = "us" | "uk" | "fr" | "sp";

export interface StoredInstance {
  id?: string;
  hash: string;
  user: string;
  status: "ACTIVE" | "STOPPED";
  terminatesAt: Timestamp;
  plan: string;
  type: InstanceType;
  location: Locations;
  instanceId: string;
  keypair: string;
  sshCommand: string;
  serverType: string;
}
