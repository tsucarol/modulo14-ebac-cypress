pipeline {
    agent any

    stages {
        stage('Clonar o repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/tsucarol/modulo14-ebac-cypress.git'
            }
        }
        stage('Instalar dependências') {
            steps {
                sh 'npm install'
            }
        }

        stage('Executar Testes') {
            steps {
                sh 'NO_COLOR=1 npx cypress run'
            }
        }
    }
}
