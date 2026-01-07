pipeline {
  agent any

  environment {
    DOCKERHUB_REPO = "23127081/nuoica"
    APP_NAME = "nuoica"
  }

  stages {
    stage("1) Git Pull") {
      steps { checkout scm }
    }

    stage("2) Build image") {
      steps {
        sh """
          docker build -t ${DOCKERHUB_REPO}:${BUILD_NUMBER} .
          docker tag ${DOCKERHUB_REPO}:${BUILD_NUMBER} ${DOCKERHUB_REPO}:latest
        """
      }
    }

    stage("3) Push to DockerHub") {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
          sh """
            echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
            docker push ${DOCKERHUB_REPO}:${BUILD_NUMBER}
            docker push ${DOCKERHUB_REPO}:latest
          """
        }
      }
    }

    stage("4) Pull from DockerHub and Deploy container") {
      steps {
        sh """
          docker pull ${DOCKERHUB_REPO}:latest
          docker stop ${APP_NAME} || true
          docker rm ${APP_NAME} || true
          docker run -d --name ${APP_NAME} -p 3000:3000 ${DOCKERHUB_REPO}:latest
        """
      }
    }
  }
}
