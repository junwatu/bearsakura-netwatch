# Building a Desktop WiFi Network Monitor with Tauri, React, Node.js, and GridDB

## Introduction

- Hook: Start with a relatable problem or a provocative question.
- Introduce the main topic: "Building a Desktop WiFi Network Monitor."
- Briefly mention the technologies involved (Tauri, React, Node.js, and GridDB).

## Why We Need a Custom WiFi Monitor

- **Problem Statement**
  - Describe the challenges of monitoring WiFi networks.
  - Explain why existing solutions might not be sufficient.

- **Benefits of a Custom Solution**
  - Discuss the advantages of building a tailored network monitor.
  - Highlight the benefits of using Tauri, React, Node.js, and GridDB.

## System Architecture

![base system architecture](images/system-arch.png)


## Capture Network Traffic

Capturing network traffic using Node.js typically involves native modules that interface with system-level libraries like `libpcap` (on Unix-like systems) or `WinPcap/Npcap` (on Windows). For this post, we will be using Windows OS.

### Install Npcap

[Npcap](https://npcap.com/) is a packet capture and sending library for Microsoft Windows. We need to install this software first so that later we can use it with the node.js npm package, such as [`cap`](https://github.com/mscdex/cap), to perform packet capturing.

To download Npcap, please visit [their site](https://npcap.com/#download) and choose the appropriate installer type for a hassle-free installation. Upon installation, leave every option at its default.

![npcap windows installer](images/npcap-windows.png)

## Backend Development with Node.js and GridDB

### Node.js

Node.js® is an open-source, cross-platform JavaScript runtime environment. Download the Windows installer from [here](https://nodejs.org/en/download). We will use the Node.js LTS v18.18.0 version. There many ways to install Node.js in Windows, please look into their [documentation](https://nodejs.dev/en/). We can use 3rd party Windows package installer such as [chocolatey](https://chocolatey.org/) or use the manual installation.

You can check the Node.js installation in the terminal with running this command:

```shell
node --version
```


- **Frontend Development with React**
  - Discuss the project structure, components, and integration with the backend.
- **Desktop Integration using Tauri**
  - Detail the process of turning your web app into a desktop application with Tauri.

## Demonstrating the Results

- Share performance results, user feedback, or any metrics that demonstrate the value of your solution.
- Visual aids: Use screenshots or GIFs of the application in action to reinforce the benefits.

## Addressing the Challenges

- Describe any obstacles faced during development.
- Detail how you overcame them, offering insights or best practices derived from your experiences.

## Conclusion

- Recap the main points of your post, combining the "why" and the "how".
- Discuss potential future enhancements or plans related to the project.

## Call to Action

- Invite readers to try out your project (provide a GitHub link if it's open source).
- Encourage comments, questions, and feedback.

## References/Further Reading

- List any sources you cited or further reading materials for those interested in diving deeper into specific technologies.
