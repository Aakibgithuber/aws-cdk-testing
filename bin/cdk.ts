#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MyAwsSetupStack } from '../lib/deploy-stack'; // Ensure correct import path

const app = new cdk.App();
new MyAwsSetupStack(app, 'MyAwsSetupStack'); // Ensure this line exists

app.synth();
