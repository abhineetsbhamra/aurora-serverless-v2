import { Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as rds from 'aws-cdk-lib/aws-rds'
import * as cr from 'aws-cdk-lib/custom-resources'
import { Construct } from 'constructs'
import { Peer, Port, SecurityGroup } from 'aws-cdk-lib/aws-ec2'
import { wesDigitalVpc, WesdigitalAccountNumber, DeploymentEnv } from '@wesdigital/adv-cdk-modules'

export interface AuroraSlsStackProps extends StackProps {
  deploymentEnv: DeploymentEnv
}

export class AuroraSlsV2Stack extends Stack {
  constructor(scope: Construct, id: string, props: AuroraSlsStackProps) {
    super(scope, id, props);
    const envProps = {
      account: props.env?.account as WesdigitalAccountNumber,
      env: props.deploymentEnv
    }
    const vpc = wesDigitalVpc(this, 'WesDigitalVPC', envProps)
    
    //sec group config
    const DbSecurityGroup = new SecurityGroup(this, 'AuroraServerlessV2SecurityGroup', {
      vpc,
      allowAllOutbound: true
    })

    //subnet group 
    const dbSubnetGroup = new rds.SubnetGroup(this, 'AuroraServerlessV2SubnetGroup', {
      description: 'AuroraServerlessSubnetGroup',
      vpc: vpc,
    });

    // serverless v2 code from github
    enum ServerlessInstanceType {
      SERVERLESS = 'serverless',
    };

    type CustomInstanceType = ServerlessInstanceType | ec2.InstanceType;
  
    const CustomInstanceType = { ...ServerlessInstanceType, ...ec2.InstanceType };
    
    const dbClusterInstanceCount: number = 1;
    

    // create aurora db serverless cluster 
    const dbCluster = new rds.DatabaseCluster(this, 'AuroraServerlessV2Cdk', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_13_4,
      }),
      instances: dbClusterInstanceCount,
      instanceProps: {
        vpc: vpc,
        instanceType: CustomInstanceType.SERVERLESS as unknown as ec2.InstanceType,
        autoMinorVersionUpgrade: false,
        publiclyAccessible: false,
        securityGroups: [],
      },
      backup: {
        retention: cdk.Duration.days(7),
        preferredWindow: '08:00-09:00'
      },
      port: 5432,
      cloudwatchLogsExports: ["postgresql"],
      cloudwatchLogsRetention: logs.RetentionDays.SIX_MONTHS,
      subnetGroup: dbSubnetGroup,
      storageEncrypted: true,
    });

    const serverlessV2ScalingConfiguration = {
      MinCapacity: 0.5,
      MaxCapacity: 16,
    };

    const dbScalingConfigure = new cr.AwsCustomResource(this, 'AuroraServerlessV2DbScalingConfigure', {
      onCreate: {
        service: "RDS",
        action: "modifyDBCluster",
        parameters: {
          DBClusterIdentifier: dbCluster.clusterIdentifier,
          ServerlessV2ScalingConfiguration: serverlessV2ScalingConfiguration,
        },
        physicalResourceId: cr.PhysicalResourceId.of(dbCluster.clusterIdentifier)
      },
      onUpdate: {
        service: "RDS",
        action: "modifyDBCluster",
        parameters: {
          DBClusterIdentifier: dbCluster.clusterIdentifier,
          ServerlessV2ScalingConfiguration: serverlessV2ScalingConfiguration,
        },
        physicalResourceId: cr.PhysicalResourceId.of(dbCluster.clusterIdentifier)
      },
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
        resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });

    const cfnDbCluster = dbCluster.node.defaultChild as rds.CfnDBCluster;
    const dbScalingConfigureTarget = dbScalingConfigure.node.findChild("Resource").node.defaultChild as cdk.CfnResource;
    
    cfnDbCluster.addPropertyOverride("EngineMode", "provisioned")
    dbScalingConfigure.node.addDependency(cfnDbCluster)
    
    
    for (let i = 1 ; i <= dbClusterInstanceCount ; i++) { 
      (dbCluster.node.findChild(`Instance${i}`) as rds.CfnDBInstance).addDependsOn(dbScalingConfigureTarget)
    };
  }
}