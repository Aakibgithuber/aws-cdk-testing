import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as elasticbeanstalk from 'aws-cdk-lib/aws-elasticbeanstalk';
import * as iam from 'aws-cdk-lib/aws-iam';
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

    // Step 2: Elastic Beanstalk Application
    const ebApp = new elasticbeanstalk.CfnApplication(this, 'MyElasticBeanstalkApp', {
      applicationName: 'MyApp'
    });

    // Step 3: IAM Role for Beanstalk EC2 Instances (Instance Profile)
    const instanceRole = new iam.Role(this, 'MyBeanstalkInstanceRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkWebTier'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess') // Optional, as per your needs
      ]
    });

    const instanceProfile = new iam.CfnInstanceProfile(this, 'MyInstanceProfile', {
      roles: [instanceRole.roleName]
    });

    // Step 4: Elastic Beanstalk Environment with Instance Profile
    const ebEnv = new elasticbeanstalk.CfnEnvironment(this, 'MyElasticBeanstalkEnv', {
      environmentName: 'MyApp-env',
      applicationName: ebApp.applicationName!,
      solutionStackName: '64bit Amazon Linux 2 v5.9.12 running Node.js 18',
      optionSettings: [
        {
          namespace: 'aws:autoscaling:launchconfiguration',
          optionName: 'IamInstanceProfile',
          value: instanceProfile.ref
        }
      ]
    });

    // Step 5: CloudFront Distribution for Beanstalk
    const cfDistribution = new cloudfront.Distribution(this, 'MyCloudFront', {
      defaultBehavior: {
        origin: new origins.HttpOrigin(`${ebEnv.attrEndpointUrl}`),
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      }
    });

    // Outputs
    new cdk.CfnOutput(this, 'BucketName', { value: myBucket.bucketName });
    new cdk.CfnOutput(this, 'ElasticBeanstalkEnv', { value: ebEnv.ref });
    new cdk.CfnOutput(this, 'CloudFrontURL', { value: cfDistribution.distributionDomainName });
  }
}

const app = new cdk.App();
new MyAwsSetupStack(app, 'MyAwsSetupStack');
app.synth();
