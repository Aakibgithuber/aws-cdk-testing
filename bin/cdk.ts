#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { KaitoApplicationStack } from '../lib/deploy-stack'; // Ensure this path is correct

const app = new cdk.App();
new KaitoApplicationStack(app, 'KaitoApplicationStack'); // Add this back
