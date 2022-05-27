#!/usr/bin/env node
import {
    App,
    Stage,
    StageProps
} from 'aws-cdk-lib'
import {
    DeploymentEnv,
    DeploymentRegion,
    WesdigitalAccount
} from '@wesdigital/adv-cdk-modules'
import { AuroraSlsV2Stack } from '../lib/aurora-serverless-v2-stack';

import {
    Construct
} from 'constructs'

// Needed to allow platform-dev stage
interface ApplicationStageProps extends StageProps {
  stageName: string;
}

class ApplicationStage extends Stage {
    constructor (scope: Construct, id: string, props: ApplicationStageProps) {
        super(scope, id, props)

        const stageName = props.stageName as DeploymentEnv

        new AuroraSlsV2Stack (this,
            'AuroraSlsV2Stack', {
                deploymentEnv: stageName,
                env: props.env
            })
    }
}

const app = new App()

new ApplicationStage(app, 'platform-dev', {
    env: {
        account: WesdigitalAccount.AdvantageAppSandpit,
        region: DeploymentRegion
    },
    stageName: 'dev'
})
