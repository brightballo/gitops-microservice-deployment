# This file is used to configure the backend for Terraform state storage####################
terraform {
  backend "s3" {
    bucket = "terraform-bk"
    key    = "terra.tfstate"
    region = "us-east-1"
  }
}
##############################################################################################