# 📘 English For IT 职场实用英语工作台 — 使用手册

> **核心设计理念**：拒绝学院派应试，面向真实的面试与海外远程协同。  
> **终极目标**：达到“能用”的工作沟通水平（自我介绍、讲清项目经历、日常站会与协同），听得懂、说得清楚！

---

## 🧭 快速上手与访问地址

在本地启动服务：
```bash
cd C:\Users\FX\Projects\EnglishForIT
pnpm dev
```
打开浏览器访问：
* **实战控制台（主页）**：`http://localhost:3000/zh/app`
* **自我介绍破冰台**：`http://localhost:3000/zh/app/self-intro`
* **项目经历 STAR 转换台**：`http://localhost:3000/zh/app/project-star`
* **日常工作交流模拟器**：`http://localhost:3000/zh/app/daily-work`
* **工位秒查锦囊与发音**：`http://localhost:3000/zh/app/cheatsheet`

> 💡 **免登录体验**：系统已内置免登录访客模式（Guest Mode），无需注册账号，打开即可立即练习！

---

## 🎯 四大核心模块使用指南

### 一、 自我介绍破冰台 (`/zh/app/self-intro`)

无论面试还是新团队破冰，开场第 1 分钟决定面试官对你的第一印象。

#### 1. 经典范例精读 (30s / 1m / 3m)
* **30 秒极速电梯破冰**：适用于技术交叉面、电话初筛或快节奏开场。三段论结构：*身份定位 ➔ 核心技术栈 ➔ 最近高亮战绩*。
* **1 分钟标准自述**：单人技术主面试的黄金时长。信息密度最高，涵盖专长、架构成果（减少 45% 延迟）、敏捷协同习惯。
* **3 分钟成长深度自白**：适用于 Hiring Manager / 资深架构师深入探讨个人技术演进（从单体到分布式、解决单点故障 SPOF、工程规范推进）。
* **操作方式**：点击右侧每一句的 **【发音朗读】**（戴上耳机听纯正发音），点击 **【复制英文】** 快速存入个人笔记。

#### 2. 一键自制专属自述 (Custom Builder)
* 切换到 **“一键自制专属自述”** 标签页；
* 填入你的信息：英文名、目标岗位、工龄、擅长技术栈、以及你最自豪的一个数字指标（支持中英文输入）；
* 右侧**实时合成**符合 Google / 硅谷工程师范式的地道自述，戴耳机试听，背诵到脱口而出！

#### 3. 经典面试打乱追问 (Interview Q&A)
* 提取自教材 Lesson 14 的经典面试问题（*Why did you apply? / Strengths & Weaknesses / Do you have questions for us?*）；
* 包含**面试官意图剖析**、**硅谷标准高分回答范式**与**反向提问策略**。

---

### 二、 项目经历 STAR 转换台 (`/zh/app/project-star`)

技术面试中最怕把项目讲成流水账。使用 STAR 法则，让老外听到你的架构深度与业务价值。

#### 1. 高频真实项目拆解
* **高并发性能调优与多级缓存**（Redis 集群、Single-flight 请求合并、分流 92% 主库读压力）；
* **单体向事件驱动微服务平滑迁移**（Kafka 异步事件总线、绞杀者模式、灰度发布）；
* **线上突发故障紧急止损**（8分钟快速回滚、Heap Snapshot 堆转储定位泄漏、CI 压测门禁）。

#### 2. STAR 4 阶段精炼原则
* **[S] Situation (背景与规模)**：简明扼要，交代系统规模与遭遇的痛点（如 15,000 QPS 下 CPU 飙升 90%）；
* **[T] Task (职责与目标)**：说明你的角色与量化目标（如确保 30,000 QPS 下 p99 延迟 < 80ms）；
* **[A] Action (技术方案 - 重点!)**：占叙述 60% 以上比重，用强动词（*spearheaded, benchmarked, implemented, decoupled*）；
* **[R] Result (量化收益)**：用数据说话（*QPS 从 15k 提至 38k，p99 延迟降低至 45ms，零停机*）。

#### 3. 面试官常追问的两个问题 (Grilling Questions)
* 每个项目均配有老外面试官最常刨根问底的难题（数据一致性、Trade-off 权衡取舍、事故沟通机制），提供破局思考维度。

#### 4. 40+ 工程强动词速查
* 告别单一的 "I do / I make"：按**架构设计**、**性能优化**、**工程交付**分类，每项均带发音示范。

---

### 三、 日常工作交流模拟器 (`/zh/app/daily-work`)

专为入职外企或参与开源协同的工程师打造，解决每天最频繁的沟通堵点。

#### 1. 每日站会发言器 (Daily Standup Generator)
* 遵循敏捷三问公式：
  * **Yesterday**：过去式，用 *wrapped up / investigated / deployed*；
  * **Today**：现在进行时，用 *focusing on / integrating / benchmarking*；
  * **Blockers**：有卡点用 *I'm blocked by...*，没有用 *No blockers on my end*。
* 可以在输入框填入你今天做的事情，点击一键生成可以直接在 Zoom 晨会上念的口语稿，或复制粘贴到 Slack 异步汇报群。

#### 2. 实战情景对话 (Roleplay)
* **PR Review**：如何礼貌、专业地提出代码审查建议（*Great catch! / Nitpick / LGTM*）；
* **Incident 排障**：线上突发 504 错误时的标准沟通流程（*Heads up / I'm looking into it / Let's roll back*）；
* **Slack 异步对齐**：需求不明确时的高效提问法（*Just to ensure we're on the same page... / 给出 A or B 选择题*）。

---

### 四、 工位秒查锦囊与发音纠错 (`/zh/app/cheatsheet`)

#### 1. 核心工程语块卡片
* 提取自《English For IT Professionals 1.0 & 2.0》的黄金高频语块：
  * *backward compatibility*（向下兼容）、*single point of failure (SPOF)*（单点故障）、*technical debt*（技术债务）、*graceful degradation*（优雅降级）、*take this offline*（会后单独聊）、*trade-off*（权衡取舍）等；
* 支持按分类（架构、站会、PR、排障、垫话）快速筛选或直接关键字搜索。

#### 2. 技术名词发音避坑殿堂
* 纠正国内工程师最容易翻车的技术名词读音：
  * **SQL**：正确读作 /ˈsiːkwəl/ (Sequel)，切忌读成死扣；
  * **Azure**：正确读作 /ˈæʒ.ər/ (AZH-er)，避免阿居尔；
  * **Cache**：正确读作 /kæʃ/ (Cash，跟现金同音)，避免读成卡车；
  * **GUI**：正确读作 /ˈɡuː.i/ (Gooey)，不要单字母拼读；
  * **Agile**：正确读作 /ˈædʒ.aɪl/ (AJ-eye-l)，避免阿吉勒；
  * **NGINX**：正确读作 Engine-X；
  * **Kubectl**：地道读法为 koob-control。
* 每一项点击即可戴耳机听纯正发音示范。

---

## 🎧 工位“摸鱼练习”最佳实践（每天 10 分钟）

1. **静音听音模式**：
   * 在公司戴上耳机，随意点击任意卡片上的小喇叭按钮，利用浏览器原生语音引擎收听发音，在心中默读或轻声哼读，不影响工位环境。
2. **现学现抄**：
   * 每天早上开站会前 2 分钟，在日常沟通模拟器中填入今天要做的事，生成口语稿，点击“复制”，直接发到公司群或开会时对着念。
3. **针对性背诵**：
   * 面试前重点背诵并自制 1 套自己的自我介绍（1分钟版本）+ 1 个自己的项目经历（STAR 四段论）。

---

## ☁️ 部署到 Cloudflare

本项目完全适配 Cloudflare Pages 原生部署，零服务器成本：

1. **推送到你的 GitHub 仓库**：
   ```bash
   git push origin main
   ```
2. **在 Cloudflare Dashboard 创建 Pages**：
   * 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) ➔ **Workers & Pages** ➔ **Create application** ➔ **Pages** ➔ **Connect to Git**；
   * 选择你的仓库 `BIGMAX-RKO007/EnglishForIT`；
   * **Framework preset**: `Vite` (或 None)；
   * **Build command**: `pnpm build`；
   * **Build output directory**: `dist/client`；
   * 点击 **Save and Deploy** 即可获得全球 Edge 节点极速访问的在线工作台！

