import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as elasticbeanstalk from 'aws-cdk-lib/aws-elasticbeanstalk';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { elasticBeanstalkConfig } from './eb-config';

export class KaitoApplicationStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Step 1: Create an S3 Bucket
    const myBucket = new s3.Bucket(this, `${id}-test-bucket`, {
      bucketName: "kaito-test-bucket-123",
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Step 2: Elastic Beanstalk Application
    const ebApp = new elasticbeanstalk.CfnApplication(this, 'MyElasticBeanstalkApp', {
      applicationName: 'kaito-eb-app'
    });

    // Step 3: IAM Role for Beanstalk EC2 Instances (Instance Profile)
    const instanceRole = new iam.Role(this, 'MyBeanstalkInstanceRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkWebTier'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess')
      ]
    });

    const instanceProfile = new iam.CfnInstanceProfile(this, 'MyInstanceProfile', {
      roles: [instanceRole.roleName]
    });

    // Step 4: Elastic Beanstalk Environment (Using Platform ARN)
    const ebEnv = new elasticbeanstalk.CfnEnvironment(this, 'MyElasticBeanstalkEnv', {
      environmentName: 'kaito-eb-env',
      applicationName: ebApp.applicationName!,
      platformArn: 'arn:aws:elasticbeanstalk:ap-south-1::platform/Docker running on 64bit Amazon Linux 2023/4.4.4',
      optionSettings: [
        ...elasticBeanstalkConfig,
        {
          namespace: 'aws:autoscaling:launchconfiguration',
          optionName: 'IamInstanceProfile',
          value: instanceProfile.ref
        }
      ]
    });

    // Outputs
    new cdk.CfnOutput(this, 'BucketName', { value: myBucket.bucketName });
    new cdk.CfnOutput(this, 'ElasticBeanstalkEnv', { value: ebEnv.ref });
  }
}

const app = new cdk.App();
new KaitoApplicationStack(app, 'KaitoApplicationStack');
app.synth();
