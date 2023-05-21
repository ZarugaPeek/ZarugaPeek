import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // AdminTable is partitioned by orgId and sorted by sortKey.
    // With this table, we can get
    // - An organization item by orgId.
    // - Application items in a Organization sorted by appId.
    // - Prompt items in an Application sorted by promptVersion.
    const adminTable = new dynamodb.Table(this, "DynamoDBTable", {
      // Partition key is a UUID assigned to each organization."
      partitionKey: {
        name: "orgId",
        type: dynamodb.AttributeType.STRING,
      },
      // Sort key is automatically assigned to each item based on the kind of item and certain properties.
      // - Organization items: `ORG`
      // - Application items: `APP#${appId}`
      // - Prompt items: `Prompt#${appId}#${promptVersion}`
      sortKey: {
        name: "sortKey",
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: 1,
      writeCapacity: 1,
      billingMode: dynamodb.BillingMode.PROVISIONED,
      encryption: dynamodb.TableEncryption.DEFAULT, // AWS_OWNED
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: true,
    });

    // ChatLogTable is partitioned by orgId and sorted by sortKey.
    // With this table, we can get
    // - A log item by appId and userId sortedBy lastSentAt, which means
    //   we can also get the chat logs in the last session by appId and userId.
    // - Log items by orgId sortedBy lastSentAt, which means we can get
    //   recent chat logs in an organization.
    // - Log items by appId sortedBy lastSentAt, which means we can get
    //   recent chat logs in an application.
    const LogTable = new dynamodb.Table(this, "LogTable", {
      // Partition key is a UUID assigned to each log item."
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: 1,
      writeCapacity: 1,
      billingMode: dynamodb.BillingMode.PROVISIONED,
      encryption: dynamodb.TableEncryption.DEFAULT, // AWS_OWNED
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: true,
    });
    // A global secondary index to get the last session of user in app.
    LogTable.addGlobalSecondaryIndex({
      indexName: "appId_userId-lastSentAt",
      partitionKey: {
        name: "appId_userId",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "lastSentAt",
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.ALL,
      readCapacity: 1,
      writeCapacity: 1,
    });
    // A global secondary index to get the recent chat logs in an organization.
    LogTable.addGlobalSecondaryIndex({
      indexName: "orgId-lastSentAt",
      partitionKey: {
        name: "orgId",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "lastSentAt",
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.ALL,
      readCapacity: 1,
      writeCapacity: 1,
    });
    // A global secondary index to get the recent chat logs in an application.
    LogTable.addGlobalSecondaryIndex({
      indexName: "appId-lastSentAt",
      partitionKey: {
        name: "appId",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "lastSentAt",
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: 1,
      writeCapacity: 1,
    });
  }
}
