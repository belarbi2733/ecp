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
          sh 'NOVE_ENV=prod'
          sh 'npm install @angular/cli @angular/compiler-cli @angular-devkit/build-angular typescript'
        }
      }
      stage('Install') {
        steps {
          sh 'npm install'
        }
      }
      stage('Build') {
        steps {
          // sh 'npm run build'  
          sh 'npm run ng -- build --prod'
        }
      }
    
  }
}
