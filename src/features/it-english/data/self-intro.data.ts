export interface IntroTemplate {
  id: string
  title: string
  titleZh: string
  duration: '30s' | '1m' | '3m'
  role: string
  roleZh: string
  scriptEn: string
  scriptZh: string
  breakdown: {
    section: string
    sectionZh: string
    textEn: string
    textZh: string
    keyCollocations: string[]
  }[]
}

export interface InterviewQnA {
  id: string
  questionEn: string
  questionZh: string
  intent: string
  goodAnswerEn: string
  goodAnswerZh: string
  tips: string
}

export const SELF_INTRO_TEMPLATES: IntroTemplate[] = [
  {
    id: 'pitch-30s-backend',
    title: '30-Second Elevator Pitch (Backend Focus)',
    titleZh: '30秒电梯破冰（后端架构向）',
    duration: '30s',
    role: 'Backend Engineer',
    roleZh: '后端工程师',
    scriptEn: "Hi, I'm a Senior Backend Engineer with over 6 years of experience building scalable distributed systems. My core stack centers around Go, Java, and cloud-native architecture. In my recent role, I led the core service refactoring that handled peak traffic of 30,000 QPS while maintaining 99.99% uptime. I'm excited to bring my system design and performance optimization expertise to this team.",
    scriptZh: "你好，我是一名拥有6年多经验的高级后端工程师，专注于构建可扩展的分布式系统。我的核心技术栈围绕Go、Java和云原生架构。在最近的职位中，我主导了核心服务重构，成功承载了30,000 QPS的峰值流量，同时保持99.99%的可用性。我非常期待将我的系统设计和性能优化经验带到贵团队。",
    breakdown: [
      {
        section: 'Hook & Identity',
        sectionZh: '破冰与身份定位',
        textEn: "Hi, I'm a Senior Backend Engineer with over 6 years of experience building scalable distributed systems.",
        textZh: "你好，我是一名拥有6年多经验的高级后端工程师，专注于构建可扩展的分布式系统。",
        keyCollocations: ['scalable distributed systems', 'over X years of experience']
      },
      {
        section: 'Core Stack',
        sectionZh: '核心技术栈',
        textEn: "My core stack centers around Go, Java, and cloud-native architecture.",
        textZh: "我的核心技术栈围绕Go、Java和云原生架构。",
        keyCollocations: ['core stack centers around', 'cloud-native architecture']
      },
      {
        section: 'Highlight & Impact',
        sectionZh: '核心战绩与数据',
        textEn: "In my recent role, I led the core service refactoring that handled peak traffic of 30,000 QPS while maintaining 99.99% uptime.",
        textZh: "在最近的职位中，我主导了核心服务重构，成功承载了30,000 QPS的峰值流量，同时保持99.99%的可用性。",
        keyCollocations: ['handled peak traffic of', 'maintaining 99.99% uptime', 'led the refactoring']
      },
      {
        section: 'Call to Action',
        sectionZh: '收尾契合度',
        textEn: "I'm excited to bring my system design and performance optimization expertise to this team.",
        textZh: "我非常期待将我的系统设计和性能优化经验带到贵团队。",
        keyCollocations: ['bring my expertise to', 'system design and performance optimization']
      }
    ]
  },
  {
    id: 'pitch-1m-fullstack',
    title: '1-Minute Comprehensive Intro (Full Stack)',
    titleZh: '1分钟标准自我介绍（全栈通用）',
    duration: '1m',
    role: 'Full Stack Engineer',
    roleZh: '全栈工程师',
    scriptEn: "Thanks for having me today. My name is Alex, and I've been working as a Full Stack Engineer for about 5 years. I specialize in TypeScript, React, and Node.js on the backend, alongside relational databases like PostgreSQL. Throughout my career, I've taken products from initial MVP to production scale. At my last company, I spearheaded the overhaul of our dashboard, which reduced end-to-end page load latency by 45% and streamlined our CI/CD pipeline. I thrive in collaborative Agile teams where engineers have end-to-end ownership. Today, I'm looking for a role where I can solve complex engineering bottlenecks and deliver seamless user experiences.",
    scriptZh: "感谢今天给我这个面试机会。我叫Alex，做全栈工程师大约有5年了。我擅长TypeScript、React、Node.js后端以及PostgreSQL关系型数据库。在我的职业生涯中，我多次主导产品从最初的MVP演进到生产级规模。在上一家公司，我牵头重构了数据面板，使端到端页面加载延迟降低了45%，并精简了CI/CD自动化流程。我习惯在工程师拥有端到端Owner意识的敏捷团队中协作。今天，我希望在一个能够解决复杂工程瓶颈并交付流畅用户体验的团队中发挥价值。",
    breakdown: [
      {
        section: 'Opening & Overview',
        sectionZh: '感谢与年限概括',
        textEn: "Thanks for having me today. My name is Alex, and I've been working as a Full Stack Engineer for about 5 years.",
        textZh: "感谢今天给我这个面试机会。我做全栈工程师大约有5年了。",
        keyCollocations: ['Thanks for having me', 'working as a ... for about X years']
      },
      {
        section: 'Specialization',
        sectionZh: '技术专长',
        textEn: "I specialize in TypeScript, React, and Node.js on the backend, alongside relational databases like PostgreSQL.",
        textZh: "我擅长TypeScript、React、Node.js后端以及PostgreSQL关系型数据库。",
        keyCollocations: ['specialize in', 'alongside relational databases']
      },
      {
        section: 'Proven Track Record',
        sectionZh: '核心落地与项目收益',
        textEn: "At my last company, I spearheaded the overhaul of our dashboard, which reduced end-to-end page load latency by 45% and streamlined our CI/CD pipeline.",
        textZh: "在上一家公司，我牵头重构了数据面板，使端到端页面加载延迟降低了45%，并精简了CI/CD流程。",
        keyCollocations: ['spearheaded the overhaul', 'reduced page load latency by', 'streamlined the pipeline']
      },
      {
        section: 'Work Culture & Next Step',
        sectionZh: '工作文化与诉求',
        textEn: "I thrive in collaborative Agile teams where engineers have end-to-end ownership. Today, I'm looking for a role where I can solve complex engineering bottlenecks.",
        textZh: "我习惯在拥有端到端Owner意识的敏捷团队中协作，希望能解决更复杂的工程瓶颈。",
        keyCollocations: ['thrive in collaborative Agile teams', 'end-to-end ownership', 'engineering bottlenecks']
      }
    ]
  },
  {
    id: 'pitch-3m-deepdive',
    title: '3-Minute In-Depth Career Journey',
    titleZh: '3分钟深度技术履历与成长演进',
    duration: '3m',
    role: 'Staff / Tech Lead',
    roleZh: '资深开发 / 技术负责人',
    scriptEn: "I began my software engineering journey as an application developer focusing on monolithic web apps. Over the years, as our user base expanded tenfold, I naturally transitioned into distributed systems and cloud infrastructure. In my previous role at a SaaS company, I was responsible for architecting our event-driven microservices using Kafka and Kubernetes. One of my proudest achievements was leading the database sharding initiative, which mitigated our single point of failure and cut our cloud infrastructure costs by 25%. Beyond hands-on coding, I regularly mentor junior engineers, conduct thorough code reviews, and drive engineering best practices. I'm excited about this opportunity because your team is tackling high-throughput challenges that align directly with my technical background.",
    scriptZh: "我的软件开发生涯始于单体Web应用的业务开发。随着用户规模扩大了十倍，我自然而然地转向了分布式系统和云基础设施领域。在上一家SaaS公司，我负责使用Kafka和Kubernetes架构事件驱动的微服务体系。我最自豪的成就之一是主导了数据库分库分表改造，彻底消除了单点故障（SPOF），并将云基础设施成本削减了25%。除了亲自写代码，我还定期辅导初级工程师、推进严谨的Code Review并建立工程最佳实践。我对这个机会非常感兴趣，因为贵团队正在攻克的高吞吐量挑战与我的技术背景高度契合。",
    breakdown: [
      {
        section: 'Career Evolution',
        sectionZh: '技术生涯演进',
        textEn: "I began my software engineering journey as an application developer focusing on monolithic web apps. As our user base expanded tenfold, I naturally transitioned into distributed systems.",
        textZh: "我的生涯始于单体Web开发。随着用户规模增长十倍，我转向了分布式系统。",
        keyCollocations: ['began my software engineering journey', 'monolithic web apps', 'expanded tenfold', 'distributed systems']
      },
      {
        section: 'Architecture Milestone',
        sectionZh: '重大架构里程碑',
        textEn: "In my previous role, I was responsible for architecting our event-driven microservices. One of my proudest achievements was leading the database sharding initiative, which mitigated our single point of failure.",
        textZh: "我负责架构事件驱动微服务。最自豪的是主导分库分表，消除了单点故障。",
        keyCollocations: ['responsible for architecting', 'event-driven microservices', 'single point of failure (SPOF)']
      },
      {
        section: 'Leadership & Best Practices',
        sectionZh: '工程领导力与规范',
        textEn: "Beyond hands-on coding, I regularly mentor junior engineers, conduct thorough code reviews, and drive engineering best practices.",
        textZh: "除了亲自写代码，我还辅导新人、做深入的代码审查并推动最佳实践。",
        keyCollocations: ['beyond hands-on coding', 'conduct thorough code reviews', 'drive engineering best practices']
      }
    ]
  }
]

export const TOP_INTERVIEW_QUESTIONS: InterviewQnA[] = [
  {
    id: 'q1',
    questionEn: "Tell me about yourself and your background.",
    questionZh: "请先简单做个自我介绍。",
    intent: "面试官评估你的技术定位、语言流利度以及是否具备清晰的工程逻辑。",
    goodAnswerEn: "Certainly! I'm a software engineer with 5 years of experience in backend development, primarily using Go, Docker, and PostgreSQL. I specialize in designing high-availability APIs and distributed caching. Recently, I've been leading a migration from a monolith to microservices.",
    goodAnswerZh: "好的！我是一名拥有5年后端开发经验的软件工程师，主要使用Go、Docker和PostgreSQL。我专注于高可用API设计与分布式缓存。最近，我一直在主导单体架构向微服务的迁移。",
    tips: "不要复述简历流水账！用'经历年限 + 核心技术栈 + 最近关键战绩'的三段论公式回答。"
  },
  {
    id: 'q2',
    questionEn: "Why did you apply for this position?",
    questionZh: "你为什么申请我们公司的这个职位？",
    intent: "评估你对公司的了解程度和长期留存动机。",
    goodAnswerEn: "I've been following your product's recent progress in real-time collaboration. The technical challenges your engineering team discusses on your tech blog—specifically around high-concurrency event streaming—align directly with what I've been doing with Kafka and WebSockets.",
    goodAnswerZh: "我一直在关注贵产品在实时协作方面的进展。你们技术博客上探讨的工程挑战——特别是高并发事件流处理——正好与我此前用Kafka和WebSocket所做的深度实践高度契合。",
    tips: "一定要提对方的技术博客、开源项目或业务痛点，证明你做了功课（Did your homework）。"
  },
  {
    id: 'q3',
    questionEn: "What are your greatest technical strengths and weaknesses?",
    questionZh: "你最大的技术优势和劣势是什么？",
    intent: "考察自我认知与成长心态，切忌假大空的缺点。",
    goodAnswerEn: "My greatest strength is system troubleshooting under pressure; I have strong observability and root-cause analysis habits. As for an area of improvement, I sometimes spend too much time perfecting code architecture up front, so I've adopted time-boxing to balance speed with engineering purity.",
    goodAnswerZh: "我最大的优势是高压下的故障排查能力，拥有极强的可观测性和根本原因分析习惯。至于需要改进的地方，有时我会在前期过度追求架构完美，因此我现在学会了设定时间盒（Time-boxing），以平衡交付速度与工程纯粹度。",
    tips: "讲缺点一定要附带你的改良措施（Action taken to improve）。"
  },
  {
    id: 'q4',
    questionEn: "Do you have any questions for us?",
    questionZh: "你有什么问题想问我们的吗？",
    intent: "反向提问是展现资深工程师专业度的绝佳机会。",
    goodAnswerEn: "Yes, thank you! Could you share what the typical deployment pipeline and on-call rotation look like for this team? Also, what is the biggest technical bottleneck the team is currently facing?",
    goodAnswerZh: "有的，谢谢！能否请教一下团队目前的日常发布流程和值班轮换（On-call）机制是怎样的？另外，团队目前面临的最大技术瓶颈是什么？",
    tips: "问团队的发布机制（Deployment pipeline）、值班规范（On-call rotation）或当前技术债务，立刻体现出你的成熟度！"
  }
]

