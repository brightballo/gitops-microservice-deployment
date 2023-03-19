![image](https://user-images.githubusercontent.com/62260900/226180985-6f6358fb-2e67-4865-8bc1-4b9ad7ec6c2f.png)

# Deploying a react app and the socks app to EKS using Terraform and Helm charts on argocd and monitoring with prometheus and grafana combined with a CI/CD pipeline using Github Actions

## Prerequisites

* AWS account
* AWS CLI
* Terraform
* Helm
* Kubectl
* ArgoCD
* Github account
* Github Actions
* Docker
* NodeJS
* NPM

## Deploying the infrastructure

* Create a new directory and clone the repository
* Create a new AWS account and create a new user with programmatic access
* Configure the AWS CLI with the new user credentials
* Create a new S3 bucket for the terraform state

```bash
aws s3api create-bucket --bucket <bucket-name> --region <region> --create-bucket-configuration LocationConstraint=<region>
```

* configure the terraform backend in the main.tf file

```bash
terraform {
  backend "s3" {
    bucket = "<bucket-name>"
    key    = "terraform.tfstate"
    region = "<region>"
  }
}
```

* Initialize the terraform backend

```bash
terraform init
```

* run the terraform plan and apply

```bash
terraform plan
terraform apply
```

* Create a new Github repository and push the code to the repository
* Create a new Github Actions workflow and add the following code

```bash
name: CI/CD

on:
  push:
    branches: [ main ]

jobs:
    build:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v2
        - name: Set up QEMU
            uses: docker/setup-qemu-action@v1
        - name: Set up Docker Buildx
            uses: docker/setup-buildx-action@v1
        - name: Login to ghcr.io
            uses: docker/login-action@v1
            with:
            username: ${{ secrets.GHCR_USERNAME }}
            password: ${{ secrets.GHCR_PASSWORD }}
        - name: Build and push
            id: docker_build
            uses: docker/build-push-action@v2
            with:
            context: .
            push: true
            tags: ${{ secrets.ghcr.io }}/demo-app:latest
    ``` 
* Create a new DockerHub account and create a new repository
* Create a new secret in the Github repository with the DockerHub username and password
* locate the Dockerfile in the demo-app/ in the repository and change the image name to the DockerHub repository name
* Push the code to the Github repository and the workflow will start
* Create a new GHCR repository and push the image to the repository

```bash
docker tag socks-app:latest ghcr.io/<username>/socks-app:latest
docker push ghcr.io/<username>/socks-app:latest
```

* Create a new secret in the Github repository with the GHCR username and password
* Make sure the image name in the Dockerfile is correct

* The terraform file labelled eks.tf will create the EKS cluster and the node group
* The terraform file labelled argocd.tf will create the argocd deployment and the ingress
* The deployment yamls located in the /argocd_apps/ directory will create the exam app, the socks app and the monitoring stack (prometheus and grafana) using helm only for the moitoring stacks.
* The deployment files for the socks app are located in the /argocd_apps_2/ directory
* The argocd ingress will be available at the following url: http://argocd.<domain-name>/
* The exam app will be available at the following url: http://exam-app.<domain-name>/
* The socks app will be available at the following url: http://socks-app.<domain-name>/
* The grafana dashboard will be available at the following url: http://grafana.<domain-name>/
* The prometheus dashboard will be available at the following url: http://prometheus.<domain-name>/

* Use the following command to get the argocd password

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

* Use the following command to get the grafana password

```bash
kubectl get secret --namespace argocd grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```
* Use the following command to connect to the EKS cluster

```bash
aws eks --region  us-east-1 update-kubeconfig --name Altschool-staging
```




