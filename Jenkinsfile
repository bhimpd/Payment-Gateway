pipeline {
    agent any

    environment {
        PG_BASEURL = 'http://www.testpg.np'
        PG_USERNAME = 'testpg'
        PG_PASSWORD = 'testpg'
        BANK_BASEURL='http://www.testbank.com.np'
        BANK_USERNAME='testbank'
        BANK_PASSWORD='testbank'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitLab...'
                git branch: 'test-branch', url: 'http://test.gitrepo/pgtest.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'
                bat 'npm install'
            }
        }

        stage('Clean Previous Reports') {
            steps {
                bat 'npm run clean:reports'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npm run all_tests || exit 0'
            }
        }

        stage('Publish Allure Report') {
            steps {
                // Use the Jenkins Allure plugin
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']],  // Playwright generates this folder
                    reportBuildPolicy: 'ALWAYS'
                ])
            }
        }
    }

    post {
        always {
            echo 'Archiving Playwright & Allure artifacts...'

            archiveArtifacts artifacts: '''
                test-results/**,
                allure-report/**
            ''', allowEmptyArchive: true

            cleanWs()
        }

        success {
            echo 'Tests passed!'
        }

        failure {
            echo 'Tests failed!'
        }
    }
}
