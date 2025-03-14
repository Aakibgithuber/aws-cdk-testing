export const elasticBeanstalkConfig = [
  // Instance Profile Configuration
  {
    namespace: 'aws:autoscaling:launchconfiguration',
    optionName: 'IamInstanceProfile',
    value: 'MyInstanceProfile'
  },

  // Environment Variables
  ...[
    { optionName: 'APP_NAME', value: '' },
    { optionName: 'AWS_REGION', value: '' },
    { optionName: 'DB_DATABASE', value: '' },
    { optionName: 'DB_HOST', value: '' },
    { optionName: 'DB_PASSWORD', value: '' },
    { optionName: 'DB_PORT', value: '5432' }, // Default value for DB_PORT
    { optionName: 'DB_USER', value: '' },
    { optionName: 'ENVIRONMENT', value: '' },
    { optionName: 'KC_ADMIN_CLIENT_ID', value: '' },
    { optionName: 'KC_ADMIN_CLIENT_SECRET', value: '' },
    { optionName: 'KC_BASE_URL', value: '' },
    { optionName: 'KC_CLIENT_ID', value: '' },
    { optionName: 'KC_CLIENT_SECRET', value: '' },
    { optionName: 'KC_CLIENT_UUID', value: '' },
    { optionName: 'KC_REALM', value: '' },
    { optionName: 'NODE_ENV', value: '' },
    { optionName: 'PORT', value: '' },  
    { optionName: 'SENDGRID_API_KEY', value: '' },
    { optionName: 'SENDGRID_SENDER_EMAIL_ID', value: '' }
  ].map(({ optionName, value }) => ({
    namespace: 'aws:elasticbeanstalk:application:environment',
    optionName,
    value
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
