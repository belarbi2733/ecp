pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/GreatToubib/ecp'
      }
    }
        
    stage('Install dependencies') {
      steps {
        bat 'npm install'
        bat 'npm install --save-dev jest'
        bat 'npm install supertest'
        bat 'npm install angular'
        bat 'npm install express'
      }
    }
     
    stage('Test') {
      steps {
         bat 'npm test'
         bat 'npm run test'
      }
    }      
  }
}
