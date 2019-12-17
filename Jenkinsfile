pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/GreatToubib/ecp'
      }
    }
    stage('Preinstall') {
        steps {
          bat 'NOVE_ENV=prod'
          bat 'npm install @angular/cli @angular/compiler-cli @angular-devkit/build-angular typescript'
        }
      }
      stage('Install') {
        steps {
          bat 'npm install'
        }
      }
      stage('Build') {
        steps {
          // sh 'npm run build'  
          bat 'npm run ng -- build --prod'
        }
      }
    
  }
}
