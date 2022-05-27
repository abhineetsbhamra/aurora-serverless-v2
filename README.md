➜  aurora-serverless-v2 git:(master) ✗ cdk deploy platform-dev/AuroraSlsV2Stack --profile 317585435641_AWSPowerUserAccess 
[Warning at /platform-dev/AuroraSlsV2Stack/WesDigitalVPC/PrivateSubnet1] No routeTableId was provided to the subnet 'subnet-02a0efb50ec7e1dde'. Attempting to read its .routeTable.routeTableId will return null/undefined. (More info: https://github.com/aws/aws-cdk/pull/3171)
[Warning at /platform-dev/AuroraSlsV2Stack/WesDigitalVPC/PrivateSubnet2] No routeTableId was provided to the subnet 'subnet-09079df43da1626f0'. Attempting to read its .routeTable.routeTableId will return null/undefined. (More info: https://github.com/aws/aws-cdk/pull/3171)
[Warning at /platform-dev/AuroraSlsV2Stack/WesDigitalVPC/PrivateSubnet3] No routeTableId was provided to the subnet 'subnet-0ec97ec0250420617'. Attempting to read its .routeTable.routeTableId will return null/undefined. (More info: https://github.com/aws/aws-cdk/pull/3171)

✨  Synthesis time: 3.54s

This deployment will make potentially sensitive changes according to your current security approval level (--require-approval broadening).
Please confirm you intend to make the following modifications:

IAM Statement Changes
┌───┬─────────────────────────────────────────────────────────┬────────┬─────────────────────────────────────────────────────────┬───────────────────────────────────────────────────────────┬───────────┐
│   │ Resource                                                │ Effect │ Action                                                  │ Principal                                                 │ Condition │
├───┼─────────────────────────────────────────────────────────┼────────┼─────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┼───────────┤
│ + │ ${AuroraSlsV2Stack/AWS679f53fac002430cb0da5b7982bd2287/ │ Allow  │ sts:AssumeRole                                          │ Service:lambda.amazonaws.com                              │           │
│   │ ServiceRole.Arn}                                        │        │                                                         │                                                           │           │
├───┼─────────────────────────────────────────────────────────┼────────┼─────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┼───────────┤
│ + │ ${AuroraSlsV2Stack/AuroraServerlessV2dbEncryptionKey.Ar │ Allow  │ kms:*                                                   │ AWS:arn:${AWS::Partition}:iam::317585435641:root          │           │
│   │ n}                                                      │        │                                                         │                                                           │           │
├───┼─────────────────────────────────────────────────────────┼────────┼─────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┼───────────┤
│ + │ ${AuroraSlsV2Stack/LogRetentionaae0aa3c5b4d4f87b02d85b2 │ Allow  │ sts:AssumeRole                                          │ Service:lambda.amazonaws.com                              │           │
│   │ 01efdd8a/ServiceRole.Arn}                               │        │                                                         │                                                           │           │
├───┼─────────────────────────────────────────────────────────┼────────┼─────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┼───────────┤
│ + │ *                                                       │ Allow  │ logs:DeleteRetentionPolicy                              │ AWS:${AuroraSlsV2Stack/LogRetentionaae0aa3c5b4d4f87b02d85 │           │
│   │                                                         │        │ logs:PutRetentionPolicy                                 │ b201efdd8a/ServiceRole}                                   │           │
│ + │ *                                                       │ Allow  │ rds:ModifyDBCluster                                     │ AWS:${AuroraSlsV2Stack/AWS679f53fac002430cb0da5b7982bd228 │           │
│   │                                                         │        │                                                         │ 7/ServiceRole}                                            │           │
└───┴─────────────────────────────────────────────────────────┴────────┴─────────────────────────────────────────────────────────┴───────────────────────────────────────────────────────────┴───────────┘
IAM Policy Changes
┌───┬──────────────────────────────────────────────────────────────────────────────┬────────────────────────────────────────────────────────────────────────────────┐
│   │ Resource                                                                     │ Managed Policy ARN                                                             │
├───┼──────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────┤
│ + │ ${AuroraSlsV2Stack/AWS679f53fac002430cb0da5b7982bd2287/ServiceRole}          │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole │
├───┼──────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────┤
│ + │ ${AuroraSlsV2Stack/LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8a/ServiceRole} │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole │
└───┴──────────────────────────────────────────────────────────────────────────────┴────────────────────────────────────────────────────────────────────────────────┘
Security Group Changes
┌───┬─────────────────────────────────────────────────────────────┬─────┬────────────┬─────────────────┐
│   │ Group                                                       │ Dir │ Protocol   │ Peer            │
├───┼─────────────────────────────────────────────────────────────┼─────┼────────────┼─────────────────┤
│ + │ ${AuroraSlsV2Stack/AuroraServerlessV2SecurityGroup.GroupId} │ Out │ Everything │ Everyone (IPv4) │
└───┴─────────────────────────────────────────────────────────────┴─────┴────────────┴─────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Do you wish to deploy these changes (y/n)? y
platform-dev/AuroraSlsV2Stack (platform-dev-AuroraSlsV2Stack): deploying...
[0%] start: Publishing e5032a7ed03a7762b99560439c17f58d046a35d40ebf64ba70c63157df388563:317585435641-ap-southeast-2
[0%] start: Publishing 9ab58259097ac1249b4061ac6e823f78810b11c4c760a30324f6d012fe8e6440:317585435641-ap-southeast-2
[0%] start: Publishing da82e45fbebd6bf6c04bd7287d841cdd69c92cda30fcfea9ac63047625ab5fef:317585435641-ap-southeast-2
[33%] success: Published e5032a7ed03a7762b99560439c17f58d046a35d40ebf64ba70c63157df388563:317585435641-ap-southeast-2
[66%] success: Published da82e45fbebd6bf6c04bd7287d841cdd69c92cda30fcfea9ac63047625ab5fef:317585435641-ap-southeast-2
[100%] success: Published 9ab58259097ac1249b4061ac6e823f78810b11c4c760a30324f6d012fe8e6440:317585435641-ap-southeast-2
platform-dev-AuroraSlsV2Stack: creating CloudFormation changeset...

 ✅  platform-dev/AuroraSlsV2Stack (platform-dev-AuroraSlsV2Stack)

✨  Deployment time: 750.48s

Stack ARN:
arn:aws:cloudformation:ap-southeast-2:317585435641:stack/platform-dev-AuroraSlsV2Stack/b69090d0-dd81-11ec-b78a-02a03b532636

✨  Total time: 754.02s
