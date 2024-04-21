import AWS from "aws-sdk";
import { getDocument, updateDocumentById } from "@/firebase";
import { errorHandler, log } from "@/utils/handlers";
import { StoredInstance } from "./types";
import { Timestamp } from "firebase-admin/firestore";
import { AWS_ACCESS_KEY, AWS_ACCESS_KEY_ID } from "./utils/env";
import { awsLocations } from "./data/aws";
import { getInstanceState, stopInstance } from "./utils/aws";

export async function cleanUpInstances() {
  const activeInstances = await getDocument<StoredInstance>({
    collectionName: "instances",
    queries: [["status", "==", "ACTIVE"]],
  });

  for (const instance of activeInstances) {
    try {
      const { location, terminatesAt, instanceId } = instance;
      const currentTimestamp = Timestamp.now();

      if (currentTimestamp.seconds <= terminatesAt.seconds) continue;

      AWS.config.update({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_ACCESS_KEY,
        region: awsLocations[location],
      });

      const ec2 = new AWS.EC2();

      const state = await getInstanceState(ec2, instanceId);

      if (state === "running") {
        await stopInstance(ec2, instanceId);
        log(`Stopped instanceId - ${instanceId}`);
      }

      updateDocumentById<StoredInstance>({
        collectionName: "instances",
        id: instance.id || "",
        updates: {
          status: "STOPPED",
        },
      });
    } catch (error) {
      errorHandler(error);
    }
  }
}
