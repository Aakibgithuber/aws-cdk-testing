export const elasticBeanstalkConfig = [
  // Instance Profile Configuration
  {
    namespace: 'aws:autoscaling:launchconfiguration',
    optionName: 'IamInstanceProfile',
    value: 'MyInstanceProfile' // Instance profile reference will be dynamically assigned
  },

  // Environment Variables (Only keys, values left empty intentionally)
  ...[
    'APP_NAME',
    'AWS_REGION',
    'DB_DATABASE',
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'ENVIRONMENT',
    'KC_ADMIN_CLIENT_ID',
    'KC_ADMIN_CLIENT_SECRET',
    'KC_BASE_URL',
    'KC_CLIENT_ID',
    'KC_CLIENT_SECRET'
    'KC_CLIENT_UUID'
    'KC_REALM'
    'NODE_ENV'
    'PORT'
    'SENDGRID_API_KEY'
    'SENDGRID_SENDER_EMAIL_ID'
  ].map((optionName) => ({
    namespace: 'aws:elasticbeanstalk:application:environment',
    optionName,
    value: ''  // Empty value for now (we'll set these in console later)
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
