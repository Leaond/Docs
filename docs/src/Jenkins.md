<!--
 * @Date: 2025-06-10 18:04:50
 * @LastEditors: liuzhengliang
 * @LastEditTime: 2025-06-10 18:27:36
 * @Description:
-->

# Jenkins

在学习 Jenkins 之前我们需要有一些前置知识，下面将进行讲解。

## DevOps

DevOps 是 Development 和 Operations 的组合，是一种方法论，并不特指某种技术或者开发工具。DevOps 是一种重视 Dev 开发人员和 Ops 运维人员之间沟通、协作的流程。通过自动化的软件交付，使软件的构建，测试，发布更加的快捷、稳定、可靠。

## CI

CI 全称`Continuous Integration`，持续集成。在软件开发的过程中，我们时常需要不断地提交，合并进行单元测试和发布测试版本等，这一系列的操作是十分繁琐的。持续集成 CI 是在源代码变更后自动检测、拉取、构建的过程。

## CD

CD 对应两个概念：持续交付 Continuous Delivery 持续部署 Continuous Deployment。

### 持续交付

在 CI 的自动化流程阶段后，运维团队可以快速、轻松将应用部署到生产环境中或者发布给最终的用户使用。在某些情况下肯定是不能直接通过自动化的方式将最终的 build 产物扔到生产环境的。持续交付就是可持续性交付供生产使用的最终 build。最后通过运维进行部署。

### 持续部署

作为持续交付的延伸，持续部署可以自动将应用发布到生产环境。

## Jenkins
