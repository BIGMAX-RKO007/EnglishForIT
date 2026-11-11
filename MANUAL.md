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
  * **语言防身与槽位引擎（英日双轨）**：`https://englishforit.fanxiao.workers.dev/zh/app/defense`

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
* **语言防身与槽位引擎（英日双轨）**：`http://localhost:3000/zh/app/defense`

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

### 五、 极简语言防身与槽位引擎（英日双轨对照全融合）(`/zh/app/defense`) 🛡️ 深度融合版

采用**受控自然语言（Controlled Natural Language, CNL）**与**槽位替换（Slot & Frame）**思想设计。已全面融合原“英日双轨对照”所有敏捷实战场景（昨日晨会汇报、今日联调、阻塞求助、进度微调、PR挑刺、线上故障应急止血、进场破冰）！

剥离繁杂语法，用程序员最熟悉的“函数调用与传参”心智，完成 85%~90% 的工位表达与日常防身！

#### 1. 句式结构视觉指南
* **[ 浅色高亮底色 ]**：核心固定动词 / 句式骨架（肌肉记忆，无需思考语法，脱口而出）；
* **<u>【 带下划线 】</u>**：动态业务插槽（即插即用，点击预设芯片或自定义输入即时替换）；
* **🇨🇳 中文含义**：带底色与下划线同步对照，清晰指引业务意图与含义；
* **🇬🇧 美式自然拼读 (Phonics)**：大写表示重音，连字符分隔音节，彻底告别生僻音标，见词即读；
* **🇯🇵 日语现场敬语与罗马音 (Romaji)**：片假名术语与敬语搭配，支持假名与罗马音拼读。

#### 2. 系统调用三步总链路
```text
[步骤 1: 礼貌起手（15% 安全壳）]  Excuse me / すみません
               ↓
[步骤 2: 意图驱动（85% 核心动词）]  [8 大核心动词万能公式] + [核心事物槽位]
               ↓
[步骤 3: 听力受阻（防御反击）]      Could you speak slower / write it down in the chat?
```

#### 3. 85% 核心动词引擎 (全量融合敏捷与现场实战)
* **GET（从无到有）**：
  * 请求获取：`Can I get [X]?`（API规格书 / 生产DB只读权限 / Figma设计稿 / 账单收据）；
  * 状态交付：`I will get [X] done by [Y].`（承诺工期交付）；
  * 现场破冰：`I look forward to getting up to speed quickly on [X] and contributing.`（独当一面的战力「一人前の戦力」）；
  * 请教求导：`Could you walk me through the spec for [X]?`（式样书编写方法与测试要点请教）；
  * 概念搞懂：`Could I get some clarification on the definition of [X]?`（术语与缩写定义核对）。
* **HAVE（静态持有 / 阻断 / 对齐）**：
  * 故障通报：`We have an issue with [X].`（生产支付网关 / Redis缓存同步 / 办公Wi-Fi）；
  * 阻断求助：`I'm currently blocked on [X] because we're still waiting for the API specs.`（外部API仕様書待ち・ペンディング）；
  * 语音对齐：`Do you have 5 minutes for a quick huddle to align on [X]?`（サクッと認識合わせ）；
  * 技术提问：`I have a quick question about [X].`（优雅发起需求确认）；
  * 答复催办：`Could we have your answer regarding [X] by today?`（为保里程碑催促Q&A回答）；
  * 1对1面谈：`I would like to have a 1-on-1 to discuss [X].`（定期面谈与业务负荷沟通）。
* **MAKE（结果把控 / 达成共识）**：
  * 质量把关：`Please make sure [X].`（向下兼容 / 环境变量配置 / CI流水线全绿）；
  * 需求共识：`Before writing code, let’s make sure we align on [X].`（动手写代码前全面すり合わせ）。
* **TAKE（抓取消耗 / 排期阻击 / 责任接手）**：
  * 视线抓取：`Could you take a look at [X] when you get a chance?`（お手すきの際に）；
  * 排期防守：`If we accommodate [X] now, we'll need to push back the release date.`（需求蔓延与工数リスケ）；
  * 耗时评估：`It will take about [X] to finish.`（评估2-3小时 / 半天 / 1个迭代）；
  * 主动分担：`If your plate is full, I can take over [X].`（主动接手分担繁重任务「巻き取る」）。
* **GO / RUN（状态偏离）**：
  * 进度预警：`We ran into some unexpected [X], so there might be a slight delay.`（報連相・オンスケ維持遅れ）；
  * 延误致歉：`Our work on [X] will go past the estimate by half a day.`（进度延期半天致歉与重新承诺）；
  * 未知异常：`Something went wrong with [X].`（系统登录鉴权 / 部署流水线报错）。
* **COME（靠近协助 / 现场求援）**：
  * 现场排查：`Could someone come and check [X]?`（呼叫现场排查服务器 / 本地构建报错）；
  * 瓶颈求援：`Could you please come assist with [X]?`（遇到技术手詰まり卡点求援）。
* **DO（行为认领 / 收尾 / 联调 / 止血 / 验证）**：
  * 晨会收尾：`Yesterday, I wrapped up [X] and submitted a PR for review.`（リファクタリング完了・PR提出）；
  * 联调计划：`Today, I plan to write unit tests and integrate [X] with the frontend team.`（結合検証）；
  * 止血回滚：`To restore service, we have decided to roll back production to [X].`（緊急切り戻し）；
  * 主动认领：`I'll do [X] first.`（主动认领错误日志一次排查）；
  * 委托验证：`I have completed the bug fix; could you do a quick verification test on [X]?`（委托第三者交叉测试）；
  * 疏忽补救：`I apologize for the oversight; I will do an immediate fix on [X].`（手误致歉与秒级修复）。
* **PUT（实体安置 / 优先级调控）**：
  * 防呆核对：`Did you put [X] into [Y]?`（API Key 放入 .env / Token 放入 Header）；
  * 暂存搁置：`Based on current priorities, let’s put [X] on hold.`（次要需求暂存保留・ペンディング）。

#### 4. 15% 外围安全壳 (Safety Shell)
* **主观表达**：`I want [X]` / `I think [X]` / `I see [X]`（表达诉求、提出技术判断、指出屏幕报错）；
* **社交缓冲与评审**：
  * 消除冒犯：`Excuse me, [X]?` / `Sorry about [X].` / `Could you please [X]?`
  * 委婉挑刺：`Nit: [X]`（PR 优化建议）
  * 指摘认领：`I have addressed your review comments regarding [X].`（CR 指摘点修复与最新提交说明）
  * 邮件通知：`Just a heads-up that I have emailed you [X].`（送付完了通知）
  * 预约短会：`Would you have 15 minutes this afternoon to meet on [X]?`（约 15 分钟短会）
  * 迟到预警：`Due to [X], I might be about 15 minutes late for our meeting.`（电车延误/突发排障提前报备）
  * 申请许可：`May I have your permission to proceed with [X]?`（敏感环境操作前合规申请）
* **听力防御反击**：
  * 语速过快：`Could you speak a bit slower, please?`
  * 词汇生僻：`Sorry, could you write it down in the chat?`
  * 意图核验：`You mean [X], right?`
  * 需求边界：`What is the expected behavior if [X]?`（想定仕様・期待値確認）；
  * 理解核对：`Just to confirm my understanding, does [X] mean...?`（动工前理解双向核对）。

#### 5. 交互式槽位拼装器 (Slot Replacer)
* 每个公式支持**点击预设芯片即时替换**，或在输入框中**自定义输入英文槽位**。
* 页面**实时动态生成**：中文意图 + 地道英文 + 美式 Phonics 自然拼读注音 + 对应日文现场敬语 + 罗马音。
* 支持美音与日音真人发音、一键复制。
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

