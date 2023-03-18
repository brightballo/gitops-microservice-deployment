# Description: This file contains all the variables used in the terraform code####################
variable "AWS_REGION" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "AWS_ACCESS_KEY_ID" {
  description = "AWS access key"
  type        = string
  sensitive   = true
}

variable "AWS_SECRET_ACCESS_KEY" {
  description = "AWS secret key"
  type        = string
  sensitive   = true
}

variable "env" {
  description = "Environment variable abbreviation"
  type        = string
  default     = "staging"

  validation {
    condition     = contains(["staging", "prod"], var.env)
    error_message = "Invalid argument \"env\", please choose one of: (\"staging\",\"prod\")."
  }
}

### VPC variables
variable "single_nat_gateway" {
  type        = bool
  default     = true
  description = "Should be true if you want to provision a single shared NAT Gateway across all of your private networks. Consider setting to false for HA in production env."
}


### EKS variables
variable "eks_default_instance_type" {
  type        = string
  default     = "t2.medium" # t2.medium is the default instance type for EKS
  description = "Default instance type for EKS cluster"
}

############################################################################################################