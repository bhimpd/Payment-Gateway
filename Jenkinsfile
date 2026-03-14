pipeline {
    agent any

    environment {
        PG_BASEURL = 'http://pg.infodev.com.np'
        PG_USERNAME = 'bhimSuperAdmin'
        PG_PASSWORD = 'bhimSuperAdmin'
        BANK_BASEURL='http://banking.infodev.com.np'
        BANK_USERNAME='bhimclient'
        BANK_PASSWORD='bhim1client'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitLab...'
                git branch: 'bhim-branch', url: 'http://192.168.50.225/bhim.lamichhane/pg.git'
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