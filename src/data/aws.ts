import { InstanceType, Locations } from "@/types";

export const ec2Instances: {
  [K in InstanceType]: { [key: string]: string };
} = {
  cloud_compute: {
    competitor: "t3a.medium",
    premium: "t3a.large",
  },
  dedicated: {
    basic: "t3.xlarge",
    premium: "t3.2xlarge",
  },
  gaming: {
    small: "t3a.small",
    big: "t3a.large",
  },
};

export const amiIds: {
  [K in Locations]: { [K in "ami" | "security"]: string };
} = {
  us: {
    ami: "ami-080e1f13689e07408",
    security: "sg-017cd9a7a44c0abca",
  },
  uk: {
    ami: "ami-0b9932f4918a00c4f",
    security: "sg-0ef4339f297aeedb1",
  },
  fr: {
    ami: "ami-00c71bd4d220aa22a",
    security: "sg-089aaced8831f44b9",
  },
  sp: {
    ami: "ami-06c4be2792f419b7b",
    security: "sg-07d22ba48e2c86694",
  },
};

export const awsLocations: { [K in Locations]: string } = {
  us: "us-east-1",
  uk: "eu-west-2",
  fr: "eu-west-3",
  sp: "ap-southeast-1",
};
