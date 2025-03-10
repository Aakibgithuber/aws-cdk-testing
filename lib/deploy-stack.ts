import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as elasticbeanstalk from 'aws-cdk-lib/aws-elasticbeanstalk';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

export class MyAwsSetupStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Step 1: Create an S3 Bucket
    const myBucket = new s3.Bucket(this, 'MyBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
    // Outputs
    new cdk.CfnOutput(this, 'BucketName', { value: myBucket.bucketName });
  }
}

const app = new cdk.App();
new MyAwsSetupStack(app, 'MyAwsSetupStack');
app.synth();
