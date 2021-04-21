## Installing Booster

You can develop with Booster using any of the following operating systems:

- Linux
- macOS
- Windows (Native and WSL)

### Prerequisites

#### Install Node.js

The minimal required Node.js version is `v12`. Download the installer
[from nodejs website](https://nodejs.org/en/), or install it using your system's package
manager.

##### Ubuntu
You just need to launch a terminal and type these two command lines: 

```shell
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install nodejs
```

##### macOS
Install the [Homebrew](https://brew.sh) package manager, in case you don't already have it. Then, install Node.js by typing this command line on Terminal:
```shell
brew install node
```

##### Windows
You can use the [Chocolatey](https://chocolatey.org/) package manager. After installing it, open the Admin Windows Powershell and type:
```shell
choco install nodejs
```

Verify that it was installed properly by checking so from your terminal:

```shell
$ node -v
v13.12.0

$ npm -v
6.14.4
```

As soon as you have a Node.js version higher than `v12`, and an `npm` version higher than
`6`, you are good to go. Just note that `npm` comes with node, you don't have to install
it apart.

Alternatively, we recommend you to use a version manager for dealing with different Node.js
versions:

- [`nvm`](https://github.com/nvm-sh/nvm) - Works with macOS, Linux, and Windows Subsystem
  for Linux
- [`nvm-windows`](https://github.com/coreybutler/nvm-windows) - Works with native Windows

#### Install Git

Booster will initialize a Git repository when you create a new project (unless you use the `--skipGit` flag), so it is required that you have it already installed in your system.

##### Ubuntu

```shell
sudo apt install git-all
```

##### macOS

```shell
brew install git
```

##### Windows

```shell
choco install git
```

##### Git configuration variables

After installing git in your machine, make sure that `user.name` and `user.email` are properly configured.
Take a look at the [Git configuration page](https://git-scm.com/docs/git-config) for more info.

To configure them, run in your terminal:

```shell
git config --global user.name "Your Name Here"
git config --global user.email "your_email@youremail.com"
```

#### Set up an AWS account

This step is optional; Booster is a cloud-native framework, meaning that your application
will be deployed to the cloud using different cloud providers. By default, Booster uses the
[AWS Provider](#aws-provider), so you need an AWS account. You can always omit
this step if you only want to get a grip of Booster or test it locally without making a
deployment.

> **Note**:
>
> Booster is free to use, but notice that the resources deployed to your cloud provider
> might generate some expenses.
>
> In AWS, all the resources generated by Booster are part of the [AWS free tier](https://aws.amazon.com/free).
> When you're not eligible for the free tier, resources are charged on-demand. Deploying a
> Booster project and sending a few commands and queries should cost just a few cents.
>
> In any case, make sure to un-deploy your application with the command `boost nuke -e production`
> if you're not planning to keep using it.

Now it is a good time to create that AWS account, you can do so from
[the AWS console registration](https://portal.aws.amazon.com/billing/signup).

Once you've registered yourself, you have to generate an access key for Booster. To do so,
login into the [AWS Console](https://console.aws.amazon.com), and click on your account
name on the top-right corner.

![aws account menu location](../img/aws-account-menu.png)

A menu will open, click on **My security credentials** and it will take you to the
Identity and Access Management panel. Once there, create an access key:

![create access key button location](../img/aws-create-access-key.png)

A pop-up like the following will appear, **don't close it!**.

![credentials pop up](../img/aws-credentials.png)

Using data from that pop-up, create a folder called `.aws` under your home
folder, and a file inside called `credentials` with this syntax:

```ini
 ~/.aws/credentials
[default]
aws_access_key_id = <YOUR ACCESS KEY ID>
aws_secret_access_key = <YOUR SECRET ACCESS KEY>
```

#### Multiple AWS Accounts

If you are using multiple AWS accounts and don't want to use the default profile,
you will need to set a `region` option to let the AWS SDK know which region you want your application to be deployed to.
To do so, we have two possible solutions:

- Add the region to the profile of your choice in your `~/.aws/credentials` file

```ini
 ~/.aws/credentials
[default]
aws_access_key_id = <DEFAULT ACCESS KEY ID>
aws_secret_access_key = <DEFAULT SECRET ACCESS KEY>
region=<DEFAULT REGION>

[other_profile]  Give this profile the name that works best for you
aws_access_key_id = <YOUR ACCESS KEY ID>
aws_secret_access_key = <YOUR SECRET ACCESS KEY>
region=<REGION FOR YOUR BOOSTER APP>
```

- Or creating a `~/.aws/config` file

```ini
 ~/.aws/config
[default]
region=<DEFAULT REGION>

[profile other_profile]  You can rename the profile in any way that works for you
region=<REGION FOR YOUR BOOSTER APP>
```

When using multiple profiles make sure to export the `AWS_PROFILE` environment variable to deploy or nuke
the application with the selected profile.

```shell
export AWS_PROFILE=other_profile
```

### Installing the Booster CLI

Booster comes with a command-line tool that helps you generating boilerplate code,
testing and deploying the application, and deleting all the resources in the cloud. All
the stable versions are published to [`npm`](https://www.npmjs.com/package/@boostercloud/cli),
these versions are the recommended ones, as they are well documented, and the changes are
stated in the release notes.

To install the Booster CLI run this:

```shell
npm install --global @boostercloud/cli
```

Verify the Booster CLI installation with the `boost version` command. You should get back
something like

```shell
$ boost version
@boostercloud/cli/0.12.3 darwin-x64 node-v14.0.0
```

## Your first Booster app in 10 minutes

In this section, we will go through all the necessary steps to have the backend up and
running for a blog application in just a few minutes. The steps to follow will be:

- [Create project](#1-create-the-project)
- [First command](#2-first-command)
- [First event](#3-first-event)
- [First entity](#4-first-entity)
- [First read model](#5-first-read-model)
- [Deployment](#6-deployment)
- [Testing](#7-testing)
    - [Creating posts](#71-creating-posts)
    - [Retrieving all posts](#72-retrieving-all-posts)
    - [Retrieving specific post](#73-retrieving-specific-post)
- [Removing the stack](#8-removing-the-stack)
- [More functionalities](#9-more-functionalities)

### 1. Create the project

First of all, we will use the Booster generators to create a project. Run this command and follow
the instructions, when asked for the provider, select AWS as that is what we have
configured [here](#set-up-an-aws-account).

```shell
> boost new:project boosted-blog

...

ℹ boost new 🚧
✔ Creating project root
✔ Generating config files
✔ Installing dependencies
ℹ Project generated!
```

**Note:** If you prefer to create the project with default parameters, you can run the command as `boost new:project booster-blog --default`. The default
parameters are as follows:

- Project name: The one provided when running the command, in this case "booster-blog"
- Provider: AWS
- Description, author, homepage and repository: ""
- License: MIT
- Version: 0.1.0

In case you want to specify each parameter without following the instructions, you can use the following flags with this structure `<flag>=<parameter>`.

| Flag                    | Short version | Description                                                                                     |
| :---------------------- | :------------ | :---------------------------------------------------------------------------------------------- |
| `--homepage`            | `-H`          | The website of this project                                                                     |
| `--author`              | `-a`          | Author of this project                                                                          |
| `--description`         | `-d`          | A short description                                                                             |
| `--license`             | `-l`          | License used in this project                                                                    |
| `--providerPackageName` | `-p`          | Package name implementing the cloud provider integration where the application will be deployed |
| `--repository`          | `-r`          | The URL of the repository                                                                       |
| `--version`             | `-v`          | The initial version                                                                             |

Additionally, you can use the `--skipInstall` flag if you want to skip installing dependencies and the `--skipGit` flag in case you want to skip git initialization.

> Booster CLI commands follow this structure: `boost <subcommand> [<flags>] [<parameters>]`.
> Let's break down the command we have just executed:
>
> - `boost` is the Booster CLI executable
> - `new:project` is the "subcommand" part. In this case, it is composed of two parts separated by a colon. The first part, `new`, means that we want to generate a new resource. The second part, `project`, indicates which kind of resource we are interested in. Other examples are `new:command`, `new:event`, etc. We'll see a bunch of them later.
> - `boosted-blog` is a "parameter" for the subcommand `new:project`. Flags and parameters are optional and their meaning and shape depend on the subcommand you used. In this case, we are specifying the name of the project we are creating.

**Note:** You can always use the `--help` flag to get all the available options for each cli command.

When finished, you'll see some scaffolding that has been generated. The project name will be the
project's root so `cd` into it:

```shell
cd boosted-blog
```

There you should have these files and directories already generated:

```text
boosted-blog
├── .eslintignore
├── .gitignore
├── .eslintrc.js
├── .prettierrc.yaml
├── package-lock.json
├── package.json
├── src
│   ├── commands
│   ├── common
│   ├── config
│   │   └── config.ts
│   ├── entities
│   ├── events
│   ├── event-handlers
│   ├── read-models
│   └── index.ts
├── tsconfig.eslint.json
└── tsconfig.json
```

Now open the project in your favorite editor, e.g. [Visual Studio Code](https://code.visualstudio.com/).

### 2. First command

Commands define the input to our system, so we'll start by generating our first
[command](#1-command-and-command-handlers) to create posts. Use the command generator, while in the project's root
directory, as follows:

```bash
boost new:command CreatePost --fields postId:UUID title:string content:string author:string
```

The `new:command` generator creates a `create-post.ts` file in the `commands` folder:

```text
boosted-blog
└── src
    └── commands
        └── create-post.ts
```

As we mentioned before, commands are the input of our system. They're sent
by the users of our application. When they are received you can validate its data,
execute some business logic, and register one or more events. Therefore, we have to define two more things:

1. Who is authorized to run this command.
1. The events that it will trigger.

Booster allows you to define authorization strategies (we will cover that
later). Let's start by allowing anyone to send this command to our application.
To do that, open the file we have just generated and add the string `'all'` to the
`authorize` parameter of the `@Command` decorator. Your `CreatePost` command should look like this:

```typescript
@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class CreatePost {
  public constructor(
    readonly postId: UUID,
    readonly title: string,
    readonly content: string,
    readonly author: string
  ) {}

  public static async handle(command: CreatePost, register: Register): Promise<void> {
    register.events(/* YOUR EVENT HERE */)
  }
}
```

### 3. First event

Instead of creating, updating, or deleting objects, Booster stores data in the form of events.
They are records of facts and represent the source of truth. Let's generate an event called `PostCreated`
that will contain the initial post info:

```bash
boost new:event PostCreated --fields postId:UUID title:string content:string author:string
```

The `new:event` generator creates a new file under the `src/events` directory.
The name of the file is the name of the event:

```text
boosted-blog
└── src
    └── events
        └── post-created.ts
```

All events in Booster must target an entity, so we need to implement an `entityID`
method. From there, we'll return the identifier of the post created, the field
`postID`. This identifier will be used later by Booster to build the final state
of the `Post` automatically. Edit the `entityID` method in `events/post-created.ts`
to return our `postID`:

```typescript
// src/events/post-created.ts

@Event
export class PostCreated {
  public constructor(
    readonly postId: UUID,
    readonly title: string,
    readonly content: string,
    readonly author: string
  ) {}

  public entityID(): UUID {
    return this.postId
  }
}
```

Now that we have an event, we can edit the `CreatePost` command to emit it. Let's change
the command's `handle` method to look like this:

```typescript
// src/commands/create-post.ts::handle
public static async handle(command: CreatePost, register: Register): Promise<void> {
  register.events(new PostCreated(command.postId, command.title, command.content, command.author))
}
```

Remember to import the event class correctly on the top of the file:

```typescript
import { PostCreated } from '../events/post-created'
```

We can do any validation in the command handler before storing the event, for our
example, we'll just save the received data in the `PostCreated` event.

### 4. First entity

So far, our `PostCreated` event suggests we need a `Post` entity. Entities are a
representation of our system internal state. They are in charge of reducing (combining) all the events
with the same `entityID`. Let's generate our `Post` entity:

```bash
boost new:entity Post --fields title:string content:string author:string --reduces PostCreated
```

You should see now a new file called `post.ts` in the `src/entities` directory.

This time, besides using the `--fields` flag, we use the `--reduces` flag to specify the events the entity will reduce and, this way, produce the Post current state. The generator will create one _reducer function_ for each event we have specified (only one in this case).
Reducer functions in Booster work similarly to the `reduce` callbacks in Javascript: they receive an event
and the current state of the entity, and returns the next version of the same entity.
In this case, when we receive a `PostCreated` event, we can just return a new `Post` entity copying the fields
from the event. There is no previous state of the Post as we are creating it for the first time:

```typescript
// src/entities/post.ts
@Entity
export class Post {
  public constructor(public id: UUID, readonly title: string, readonly content: string, readonly author: string) {}

  @Reduces(PostCreated)
  public static reducePostCreated(event: PostCreated, currentPost?: Post): Post {
    return new Post(event.postId, event.title, event.content, event.author)
  }
}
```

Entities represent our domain model and can be queried from command or
event handlers to make business decisions or enforcing business rules.

### 5. First read model

In a real application, we rarely want to make public our entire domain model (entities)
including all their fields. What is more, different users may have different views of the data depending
on their permissions. That's the goal of `ReadModels`. Client applications can query or
subscribe to them.

Read models are _projections_ of one or more entities into a new object that is reachable through the query and subscriptions APIs. Let's generate a `PostReadModel` that projects our
`Post` entity:

```bash
boost new:read-model PostReadModel --fields title:string author:string --projects Post:id
```

We have used a new flag, `--projects`, that allow us to specify the entities (can be many) the read model will
watch for changes. You might be wondering what is the `:id` after the entity name. That's the [joinKey](#the-projection-function),
but you can forget about it now.

As you might guess, the read-model generator will create a file called
`post-read-model.ts` under `src/read-models`:

```text
boosted-blog
└── src
    └── read-models
        └── post-read-model.ts
```

There are two things to do when creating a read model:

1. Define who is authorized to query or subscribe it
1. Add the logic of the projection functions, where you can filter, combine, etc., the entities fields.

While commands define the input to our system, read models define the output, and together they compound
the public API of a Booster application. Let's do the same we did in the command and authorize `all` to
query/subscribe the `PostReadModel`. Also, and for learning purposes, we will exclude the `content` field
from the `Post` entity, so it won't be returned when users request the read model.

Edit the `post-read-model.ts` file to look like this:

```typescript
// src/read-models/post-read-model.ts
@ReadModel({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class PostReadModel {
  public constructor(public id: UUID, readonly title: string, readonly author: string) {}

  @Projects(Post, 'postId')
  public static projectPost(entity: Post, currentPostReadModel?: PostReadModel): ProjectionResult<PostReadModel> {
    return new PostReadModel(entity.id, entity.title, entity.author)
  }
}
```

### 6. Deployment

At this point, we've:

- Created a publicly accessible command
- Emitted an event as a mechanism to store data
- Reduced the event into an entity to have a representation of our internal state
- Projected the entity into a read model that is also publicly accessible.

With this, you already know the basics to build event-driven, CQRS-based applications
with Booster.

You can check that code compiles correctly by running the build command:

```bash
boost build
```

You can also clean the compiled code by running:

```bash
boost clean
```

Now, let's deploy our application to the cloud to see it working. It is as simple as running
the deploy command:

```bash
boost deploy -e production
```

> Deploy command automatically builds the project for you before performing updates in the cloud provider,
so, build command it's not required beforehand.

> With `-e production` we are specifying which environment we want to deploy. We'll talk about them later.

And here it comes the Booster magic! ✨ When running the deploy command, Booster will handle the creation of all the resources, *like Lambdas, API Gateway,* and the "glue" between them; *permissions, events, triggers, etc.* It even creates a fully functional GraphQL API!

*If at this point you still don’t believe everything is done, feel free to check in your provider’s console. You should see, as in the AWS example below, that the stack and all the services are up and running!* 🚀

![resources](../img/aws-resources.png)

It will take a couple of minutes to deploy all the resources. Once finished, you will see
information about your application endpoints and other outputs. For this example, we will
only need to pick the output ending in `httpURL`, e.g.:

```text
https://<some random number>.execute-api.us-east-1.amazonaws.com/production
```

### 7. Testing

Let's get started testing the project. We will perform three actions:

- Add a couple of posts
- Retrieve all posts
- Retrieve a specific post

Booster applications provide you with a GraphQL API out of the box. You send commands using
_mutations_ and get read models data using _queries_ or _subscriptions_.

In this section, we will be sending requests by hand using the online tool [Hoppscotch (formerly Postwoman)](https://hoppscotch.io/graphql),
which is free and includes great support for GraphQL. However, you can use any client you want. Your endpoint URL should look like this:

```text
<httpURL>/graphql
```

#### 7.1 Creating posts

Let's use two mutations to send two `CreatePost` commands.

```graphql
mutation {
  CreatePost(
    input: {
      postId: "95ddb544-4a60-439f-a0e4-c57e806f2f6e"
      title: "Build a blog in 10 minutes with Booster"
      content: "I am so excited to write my first post"
      author: "Boosted developer"
    }
  )
}
```

```graphql
mutation {
  CreatePost(
    input: {
      postId: "05670e55-fd31-490e-b585-3a0096db0412"
      title: "Booster framework rocks"
      content: "I am so excited for writing the second post"
      author: "Another boosted developer"
    }
  )
}
```

The expected response for each of those requests should be:

```json
{
  "data": {
    "CreatePost": true
  }
}
```

> **Note**: In this example, the IDs are generated on the client-side. When running production applications
> consider adding validation for ID uniqueness. For this example, we have used [a UUID generator](https://www.uuidgenerator.net/version4)

#### 7.2 Retrieving all posts

Let's perform a GraphQL `query` that will be hitting our `PostReadModel`:

```graphql
query {
  PostReadModels {
    id
    title
    author
  }
}
```

It should respond with something like:

```json
{
  "data": {
    "PostReadModels": [
      {
        "id": "05670e55-fd31-490e-b585-3a0096db0412",
        "title": "Booster framework rocks",
        "author": "Another boosted developer"
      },
      {
        "id": "95ddb544-4a60-439f-a0e4-c57e806f2f6e",
        "title": "Build a blog in 10 minutes with Booster",
        "author": "Boosted developer"
      }
    ]
  }
}
```

#### 7.3 Retrieving specific post

It is also possible to retrieve specific a `Post` by adding the `id` as input, e.g.:

```graphql
query {
  PostReadModel(id: "95ddb544-4a60-439f-a0e4-c57e806f2f6e") {
    id
    title
    author
  }
}
```

You should get a response similar to this:

```json
{
  "data": {
    "PostReadModel": {
      "id": "95ddb544-4a60-439f-a0e4-c57e806f2f6e",
      "title": "Build a blog in 10 minutes with Booster",
      "author": "Boosted developer"
    }
  }
}
```

### 8. Removing the stack

It is convenient to destroy all the infrastructure created after you stop using
it to avoid generating cloud resource costs. Execute the following command from
the root of the project. For safety reasons, you have to confirm this action by
writing the project's name, in our case `boosted-blog` that is the same used when
we run `new:project` CLI command.

```bash
> boost nuke -e production

? Please, enter the app name to confirm deletion of all resources: boosted-blog
```

> Congratulations! You've built a serverless backend in less than 10 minutes. We hope you
> have enjoyed discovering the magic of the Booster Framework.

### 9. More functionalities

This is a really basic example of a Booster application. The are many other features Booster provides like:

- Use a more complex authorization schema for commands and read models based on user roles
- Use GraphQL subscriptions to get updates in real-time
- Make events trigger other events
- Deploy static content
- Reading entities within command handlers to apply domain-driven decisions
- And much more...

Continue reading to dig more. You've just scratched the surface of all the Booster
capabilities!