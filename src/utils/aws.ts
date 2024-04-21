import { EC2 } from "aws-sdk";

export async function getInstanceState(ec2: EC2, instanceId: string) {
  const params = {
    InstanceIds: [instanceId],
  };

  try {
    const data = await ec2.describeInstances(params).promise();
    const state = data.Reservations?.[0]?.Instances?.[0]?.State?.Name;
    return state as "running" | "stopping" | "stopped" | "terminated";
  } catch (error) {
    const err = error as Error;
    console.log(err, err.stack);
    return null; // or throw an error, depending on how you want to handle failures
  }
}

export async function stopInstance(ec2: EC2, instanceId: string) {
  const params = {
    InstanceIds: [instanceId],
  };

  try {
    await ec2.stopInstances(params).promise();
    return true;
  } catch (error) {
    return false;
  }
}
