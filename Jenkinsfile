node {

    def app
    def IMAGE_NAME = 'swapnilghorpade/pentacle-ui'

    stage('Git Checkout') {
        properties([pipelineTriggers([[$class: 'GitHubPushTrigger']])])
        checkout scm
    }

     nodejs('node') {
        sh 'npm i'
    }

        stage('Snyk scan') {
            snykSecurity(
                snykInstallation: 'snyk@latest', 
                snykTokenId: 'SNYK_TOKEN',
                failOnIssues: false, 
                severity: 'critical',
                targetFile: 'package.json'
            )
        }

    stage('Creating env from vault') {
        sh 'bash /var/lib/jenkins/scripts/vault-dumper.sh pentacle-frontend'
    }  

    stage('Build image') {  
        app = docker.build("${IMAGE_NAME}")
    }

    stage('Image push') {
        docker.withRegistry('https://registry.hub.docker.com', 'DOCKER_HUB_CREDS') {
            app.push("latest")
        }
    }
 
    
    stage('Deploy on Portainer') {
        sshagent(credentials: ['PORTAINER_SSH_KEY']) {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId:'DOCKER_HUB_CREDS', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                sh 'ssh -o StrictHostKeyChecking=no dev@192.168.1.104 bash deploy-apis.sh swapnilghorpade/pentacle-ui $USERNAME $PASSWORD 3200 3000'
            }
            
        }
    } 

        stage('Clean Workspace') {
            cleanWs()
        }
 
}
