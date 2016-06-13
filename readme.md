# Alexa

## Skill Components

* Intents

  These represent actions that users can perform with the skill. Some required
  intents are the help, cancel and stop intents. Where help would offer
  instructions on how to use the Alexa skill and Stop would shut down the skill

* Sample Utterances

  These are essentially templates of valid phrases that users could submit to
  Alexa. For instance, one of the sample utterances for the APRS Printer is:

  The `{partNo}` and `{qty}` are both slots - we'll get to this later.

  `printer please print {partNo} times {qty}`


* Invocation Name

  This is the name that identifies the skill. The user speaks this name when
  they are attempting to invoke the skill.

* Cloud-based service that accepts intents sent from Alexa

  This is usually [AWS Lambda](https://aws.amazon.com/lambda/).

* A configuration that brings everything together

  this can be created using the [Developer Portal](https://developer.amazon.com/edw/home.html#/).

## Managing the Alexa side of things

You can create the Alexa Skill here:
https://developer.amazon.com/edw/home.html#/skills/list

This is where sample utterances and the intent schema is uploaded to. This is
also where you can find the application ID and where you would link to an AWS
lambda function.

## Managing the Lambda function

You can manage the Lambda function here:
https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions

This is where the src code and node modules are uploaded. The file structure you
will need is (Node.js version):

```
src
|
+-- AlexaSkill.js
+-- Index.js
|
+-- node_modules
|   |
|   +-- module1   
|   |   |
|   |   +-- package.json
|   |
|   +-- module2   
|   |   |
|   |   +-- package.json
```

Once satisfied with the src code and correct file structure is verified, you will
need to zip the contents of the directory with the linux command line:

`zip -r src.zip .` While in the working directory

## Helpful Resources


* Alexa Custom Skills Information

  https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/overviews/understanding-custom-skills
  
* Start to finish tutorial on how to create a skill in under 60 minutes (assumes knowledge in nodejs so it it will take much longer)

  https://developer.amazon.com/public/community/post/TxDJWS16KUPVKO/New-Alexa-Skills-Kit-Template-Build-a-Trivia-Skill-in-under-an-Hour

* Tutorial on Grabbing MTA key for new york transit system - useful for learning about the alexa request and response model

 http://tobuildsomething.com/2015/08/14/Amazon-Echo-Alexa-Tutorial-The-Definitive-Guide-to-Coding-an-Alexa-Skill/

* Lambda Getting Started Guide

  http://docs.aws.amazon.com/lambda/latest/dg/getting-started.html
