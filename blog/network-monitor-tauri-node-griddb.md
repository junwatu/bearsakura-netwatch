# Building a Desktop WiFi Network Monitor with Tauri, React, Node.js, and GridDB

## Introduction

In this article, we will delve into the process of constructing a Desktop WiFi Network Monitor, intricately weaving together technologies like **Node.js**, **Tauri**, and **React**. Central to our architectural decisions is the emphasis on using **GridDB** for our storage needs. But why GridDB? As we navigate through the intricacies of WiFi network monitoring, the choice of a reliable and efficient storage mechanism becomes paramount. GridDB, with its unique features and optimized performance characteristics, emerges as an ideal candidate. Paired with the versatility of Node.js, the rich user interface capabilities of React, and the cross-platform advantages of Tauri, we aim to present a holistic approach to effective network monitoring.

## System Architecture

![base system architecture](images/system-arch.png)

Within the architecture of the Desktop WiFi Network Monitor, **Npcap** stands out as a powerful packet capture module optimized for Windows OS. This utility continuously fetches WiFi network packets, subsequently channeling them to our dedicated **Node.js Server**. Beyond mere data processing, this server integrates seamlessly with **GridDB**, our selected high-performance database. Once data is safely persisted, the server interfaces with an advanced dashboard developed using **Tauri** and **React**. This interface is designed to provide a detailed and actionable visualization of the network metrics directly on the user's desktop.

## Capture Network Traffic

Capturing network traffic using Node.js typically involves native modules that interface with system-level libraries like **libpcap** (on Unix-like systems) or **WinPcap/Npcap** (on Windows). For this post, we will be using Windows OS.

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

### GridDB

GridDB is a highly scalable NoSQL database specifically tailored for time-series data. Rooted in its unique architecture, it offers both in-memory and disk-based storage, ensuring optimized performance and data durability. Its architecture is designed to handle massive volumes of data, making it a preferred choice for IoT, telemetry, and any application where time-based data is crucial. Beyond its core features, GridDB boasts advanced functions like automatic partitioning and robust failover mechanisms, ensuring data consistency and high availability.

If you are using WSL on Windows, go to this [link](https://docs.griddb.net/gettingstarted/wsl/#installing-wsl) for installation.



## Frontend Development with Tauri and React

### Tauri

[Tauri](https://tauri.studio/) is a toolkit for building small, secure, and fast applications with web technologies. It's a competitor to [Electron](https://www.electronjs.org/), aiming to provide a leaner and more performant solution for creating desktop applications with web front-ends. The core idea is to enable developers to use familiar web technologies while reducing the bloat and potential security issues associated with bundling a complete Chromium instance, which is what Electron does.

Tauri is built in [Rust](https://www.rust-lang.org/), a memory-safe language, and its core is a very lightweight webview rendering engine. This allows for significantly smaller binary sizes and lower resource usage compared to Electron. It also provides a strong security model by minimizing the necessary permissions and isolating the web content from the system.

The motivation behind Tauri's creation was to address the common criticisms of Electron regarding size, speed, and security, while preserving the ease of development and cross-platform capabilities that web technologies provide.

### React

[React](https://react.dev/) is a JavaScript library for building user interfaces, maintained by Facebook and a community of individual developers and companies. It was created to facilitate the development of complex, interactive UIs in an efficient and flexible manner. React's [virtual DOM](https://reactjs.org/docs/faq-internals.html) further optimizes rendering and improves app performance. The declarative nature of React simplifies the code, making it easier to debug and manage. The component-based architecture allows developers to build encapsulated components that manage their own state, which can then be composed to make complex UIs. React also empowers developers with the ability to create web applications that can update and render efficiently in response to data changes.
