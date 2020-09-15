pipeline {
  agent {
    docker {
      image "node:alpine"
      args "--network=skynet"
    }
  }
  stages {
    stage("Build") {
      steps {
        sh "echo 'http://dl-cdn.alpinelinux.org/alpine/v3.8/main' >> /etc/apk/repositories"
        sh "echo 'http://dl-cdn.alpinelinux.org/alpine/v3.8/community' >> /etc/apk/repositories"
        sh "apk upgrade --update"
        sh "apk update"
        sh "apk add --no-cache --update mongodb"
        sh "chmod +x ./scripts/dropdb.sh"
        sh "npm install"
      }
    }
    stage("Test") {
      steps {
        sh "npm run test:ci"
      }
      post {
        always {
          junit "log/*.xml"
        }
      }
    }
    stage("Production") {
      steps {
        input message: "Go to production? (Clik 'Proceed' to continue)"
        sh "echo 'subindo em produção'"
      }
    }
  }
}
