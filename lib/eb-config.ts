export const elasticBeanstalkConfig = [
  // Instance Profile Configuration
  {
    namespace: 'aws:autoscaling:launchconfiguration',
    optionName: 'IamInstanceProfile',
    value: 'MyInstanceProfile' // Instance profile reference will be dynamically assigned
  },

  // Environment Variables (Empty values for now)
  ...[
    'APP_NAME',
    'AWS_REGION',
    'DB_HOST',
    'DB_PORT'
  ].map((optionName) => ({
    namespace: 'aws:elasticbeanstalk:application:environment',
    optionName,
    value: optionName === 'DB_PORT' ? '5432' : ''  // Default value for DB_PORT
  })),

  // EC2 Instance Configuration
  ...[
    { optionName: 'InstanceType', value: 't3.medium' },
    { optionName: 'RootVolumeType', value: 'gp3' },
    { optionName: 'RootVolumeSize', value: '30' },
    { optionName: 'RootVolumeIOPS', value: '3000' }
  ].map(({ optionName, value }) => ({
    namespace: 'aws:autoscaling:launchconfiguration',
    optionName,
    value
  }))
];
