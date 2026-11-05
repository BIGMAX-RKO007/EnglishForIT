# 📘 English For IT 职场实用英语工作台 — 使用手册

> **核心设计理念**：拒绝学院派应试，面向真实的面试与海外远程协同。  
> **终极目标**：达到“能用”的工作沟通水平（自我介绍、讲清项目经历、日常站会与协同），听得懂、说得清楚！

---

## 🧭 快速上手与访问地址

### 🌐 Cloudflare 线上正式部署（全球边缘加速）
* **公网在线地址**：[https://englishforit.fanxiao.workers.dev](https://englishforit.fanxiao.workers.dev)
  * **中文主页**：`https://englishforit.fanxiao.workers.dev/zh`
  * **实战控制台**：`https://englishforit.fanxiao.workers.dev/zh/app`
  * **自我介绍破冰台**：`https://englishforit.fanxiao.workers.dev/zh/app/self-intro`
  * **项目经历 STAR 台**：`https://englishforit.fanxiao.workers.dev/zh/app/project-star`
  * **日常工作交流模拟**：`https://englishforit.fanxiao.workers.dev/zh/app/daily-work`
  * **工位秒查锦囊与发音**：`https://englishforit.fanxiao.workers.dev/zh/app/cheatsheet`
  * **英日双轨对照工作台**：`https://englishforit.fanxiao.workers.dev/zh/app/dual-work`

### 💻 本地开发运行：
```bash
cd C:\Users\FX\Projects\EnglishForIT
pnpm dev
```
打开本地浏览器访问：
* **实战控制台（主页）**：`http://localhost:3000/zh/app`
* **自我介绍破冰台**：`http://localhost:3000/zh/app/self-intro`
* **项目经历 STAR 转换台**：`http://localhost:3000/zh/app/project-star`
* **日常工作交流模拟器**：`http://localhost:3000/zh/app/daily-work`
* **工位秒查锦囊与发音**：`http://localhost:3000/zh/app/cheatsheet`
* **英日双轨对照工作台**：`http://localhost:3000/zh/app/dual-work`

> 💡 **免登录体验**：系统已内置免登录访客模式（Guest Mode），无需注册账号，打开即可立即练习！

---

## 🎯 五大核心模块使用指南

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

### 五、 英日双轨对照工作台 (`/zh/app/dual-work`) 🌟 NEW!

专为在日本现场或跨国团队（日英混用、跨国协同）的 IT 工程师打造。**同一真实工位意图，英文日文并列呈现**，深度攻克技术与跨文化表达痛点。

#### 1. 双轨核心要素
* 🇬🇧 **英文板块**：硅谷/跨国敏捷地道表达，附带 **IPA 国际音标** 与美式/英式发音示范。
* 🇯🇵 **日文板块**：日本 IT 现场/SIer 规范敬语表达，附带 **假名注音（Furigana）** 与 **罗马音（Romaji）**，并支持日语原生发音。
* 💡 **跨文化工位心法（Tip）**：深度剖析欧美工程师崇尚的“直接坦诚/快速迭代”与日本现场推崇的“報連相（ほうれんそう）/オンスケ/一次切り分け”之间的微妙语境区别。

#### 2. 精选 5 大高频双语实战场景
1. **敏捷晨会与进度 (Standup & Progress)**：
   * 昨日完成：`I wrapped up the refactor...` vs. `昨日はユーザー認証モジュールのリファクタリングを完了させました。`
   * 今日联调：`Today I’m focusing on integrating with...` vs. `本日は決済APIとの結合検証を進めます。`
   * 阻塞点求助：`I’m blocked on the API specs...` vs. `外部APIの仕様書待ちのため、現在このタスクはペンディングとなっております。`
   * 进度微调与预警：`I might need an extra half-day...` vs. `現時点ではオンスケですが、例外処理の考慮漏れにより半日ほど遅れが生じる可能性がございます。`
2. **代码审查与协作 (Code Review & Collaboration)**：
   * 邀请评审：`When you get a chance, could you take a look...` vs. `お手すきの際に、こちらのPRをご確認いただけますでしょうか。`
   * 委婉挑刺：`Nit: what if we memoize this callback?` vs. `細かい点（Nit）ですが、こちらのコールバックをメモ化するのはいかがでしょうか。`
   * 5分钟快速对齐：`Let’s do a quick 5-minute huddle...` vs. `サクッと5分ほどハドルで認識合わせさせていただけますでしょうか。`
3. **需求与测试边界 (Specs & Q&A)**：
   * 异常场景期望：`What's the expected behavior when...` vs. `ネットワーク切断時の想定仕様（期待値）についてご確認させてください。`
   * 需求蔓延/评估工期影响：`Adding this scope right now will push back our sprint delivery...` vs. `このスコープを追加しますと、今スプリントのリリース日程に影響（リスケ）が出る恐れがございます。`
4. **线上故障与应急排障 (Incident & Troubleshooting)**：
   * 500 告警首发通报：`Heads up: we're seeing a spike in 500 errors...` vs. `【緊急連絡】本番環境にて500エラーのスパイクを検知しました。`
   * 快速止血与回滚：`I recommend rolling back to the previous stable build...` vs. `原因調査と並行して、まずは前バージョンの安定版への切り戻し（ロールバック）を推奨いたします。`
5. **入场与面试破冰 (Onsite Intro & Interview)**：
   * 30 秒技术背景陈述：`I'm a backend engineer specializing in distributed systems...` vs. `バックエンドエンジニアとして、分散システムや高負荷設計を得意としております。`
   * 进场破冰：`I'm looking forward to getting up to speed quickly...` vs. `一日も早く現場のキャッチアップを終え、チームの戦力になれるよう努めます。`

#### 3. 个性化视角与模式切换
* **英日双轨对照**：默认模式，英日双语一屏横向对比，适合全面对照学习。
* **仅看英语 (音标)**：关闭日文，专注于国际开源与欧美远程面试表达。
* **仅看日语 (罗马音)**：关闭英文，专注于日本 IT 现场工作沟通与敬语训练。
* **实时全局搜索**：支持输入中文意图、英文单词、日文汉字或罗马字即搜即得。

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

