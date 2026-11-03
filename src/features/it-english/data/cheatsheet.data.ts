export interface CheatItem {
  id: string
  category: 'sdlc' | 'meetings' | 'code-review' | 'incident' | 'polite-fillers'
  categoryZh: string
  phraseEn: string
  phraseZh: string
  phoneticOrContext?: string
  exampleSentenceEn: string
  exampleSentenceZh: string
}

export interface PronunciationItem {
  id: string
  term: string
  correctPhonetic: string
  commonMistake: string
  audioText: string
  contextSentenceEn: string
  contextSentenceZh: string
}

export const CHEATSHEET_ITEMS: CheatItem[] = [
  {
    id: 'c1',
    category: 'sdlc',
    categoryZh: '软件工程与架构',
    phraseEn: "backward compatibility",
    phraseZh: "向下兼容性 / 向后兼容",
    phoneticOrContext: "API版本迭代、数据库结构升级必备",
    exampleSentenceEn: "We need to ensure backward compatibility so existing mobile app clients don't crash after this release.",
    exampleSentenceZh: "我们需要确保向下兼容，以免现有手机端App在本次发布后发生崩溃。"
  },
  {
    id: 'c2',
    category: 'sdlc',
    categoryZh: '软件工程与架构',
    phraseEn: "single point of failure (SPOF)",
    phraseZh: "单点故障",
    phoneticOrContext: "架构高可用讨论",
    exampleSentenceEn: "Currently, our standalone Redis instance is a single point of failure; we should migrate to Redis Sentinel.",
    exampleSentenceZh: "目前我们的单节点Redis是系统的一个单点故障，我们应当迁移到Redis哨兵高可用集群。"
  },
  {
    id: 'c3',
    category: 'sdlc',
    categoryZh: '软件工程与架构',
    phraseEn: "technical debt (tech debt)",
    phraseZh: "技术债务",
    phoneticOrContext: "敏捷迭代与重构讨论",
    exampleSentenceEn: "We took some shortcuts during the MVP launch, so we've allocated 20% of this sprint to pay down tech debt.",
    exampleSentenceZh: "在MVP发布期间我们做了一些妥协，因此本次Sprint我们预留了20%的精力来偿还技术债务。"
  },
  {
    id: 'c4',
    category: 'sdlc',
    categoryZh: '软件工程与架构',
    phraseEn: "graceful degradation",
    phraseZh: "优雅降级",
    phoneticOrContext: "高并发熔断降级",
    exampleSentenceEn: "When the recommendation engine is overloaded, the service performs graceful degradation by serving cached defaults.",
    exampleSentenceZh: "当推荐引擎负载过高时，服务会触发优雅降级，直接返回缓存中的默认内容。"
  },
  {
    id: 'c5',
    category: 'meetings',
    categoryZh: '敏捷与日常站会',
    phraseEn: "wrap up",
    phraseZh: "完成 / 收尾搞定",
    phoneticOrContext: "站会汇报昨日进展",
    exampleSentenceEn: "I wrapped up the authentication middleware yesterday afternoon.",
    exampleSentenceZh: "我昨天下午把鉴权中间件彻底做完收尾了。"
  },
  {
    id: 'c6',
    category: 'meetings',
    categoryZh: '敏捷与日常站会',
    phraseEn: "blocker / impediment",
    phraseZh: "阻碍项 / 卡点",
    phoneticOrContext: "站会第三问（遇到什么阻碍）",
    exampleSentenceEn: "No blockers on my end, I'm good to go.",
    exampleSentenceZh: "我这边没有遇到阻碍，进展顺利。"
  },
  {
    id: 'c7',
    category: 'meetings',
    categoryZh: '敏捷与日常站会',
    phraseEn: "take this offline",
    phraseZh: "会后单独讨论 / 线下沟通",
    phoneticOrContext: "防止站会严重超时超时",
    exampleSentenceEn: "This implementation detail is getting quite deep. Let's take this offline after standup.",
    exampleSentenceZh: "这个实现细节讨论得有点深了，我们站会后单独线下沟通吧。"
  },
  {
    id: 'c8',
    category: 'code-review',
    categoryZh: '代码审查与协作',
    phraseEn: "trade-off",
    phraseZh: "权衡 / 取舍",
    phoneticOrContext: "架构与面试核心高频词",
    exampleSentenceEn: "It's always a trade-off between write throughput and read latency.",
    exampleSentenceZh: "在写入吞吐量和读取延迟之间，往往需要做出权衡取舍。"
  },
  {
    id: 'c9',
    category: 'code-review',
    categoryZh: '代码审查与协作',
    phraseEn: "edge case",
    phraseZh: "边界情况 / 极端异常用例",
    phoneticOrContext: "测试与代码审查",
    exampleSentenceEn: "What happens if a user submits two identical requests simultaneously? Let's account for that edge case.",
    exampleSentenceZh: "如果用户同时提交两次相同的请求会怎样？我们得考虑这个边界情况。"
  },
  {
    id: 'c10',
    category: 'incident',
    categoryZh: '故障与排障',
    phraseEn: "root cause analysis (RCA)",
    phraseZh: "根本原因分析",
    phoneticOrContext: "故障复盘会议",
    exampleSentenceEn: "We are conducting a root cause analysis to make sure this deadlock never happens again.",
    exampleSentenceZh: "我们正在做根本原因分析，以确保这种死锁问题永不再犯。"
  },
  {
    id: 'c11',
    category: 'polite-fillers',
    categoryZh: '职场垫话与过渡句',
    phraseEn: "Just to ensure we're on the same page...",
    phraseZh: "为了确保我们理解一致……",
    phoneticOrContext: "需求对齐神句",
    exampleSentenceEn: "Just to ensure we're on the same page, the payload should be serialized as Protobuf, right?",
    exampleSentenceZh: "为了确保我们理解一致，传输体应该是序列化为Protobuf对吧？"
  },
  {
    id: 'c12',
    category: 'polite-fillers',
    categoryZh: '职场垫话与过渡句',
    phraseEn: "From an architectural perspective...",
    phraseZh: "从架构层面上看……",
    phoneticOrContext: "面试阐述技术见解",
    exampleSentenceEn: "From an architectural perspective, decoupling this service gives us better horizontal scalability.",
    exampleSentenceZh: "从架构层面上看，将该服务解耦能赋予我们更好的水平伸缩能力。"
  }
]

export const PRONUNCIATION_ITEMS: PronunciationItem[] = [
  {
    id: 'p1',
    term: 'SQL',
    correctPhonetic: '/ˈsiːkwəl/ (See-kwel) 或 /ˌɛs.kjuːˈɛl/',
    commonMistake: '不要读成"S-Q-L"单字母或"死扣"',
    audioText: 'SQL is commonly pronounced as sequel.',
    contextSentenceEn: "I have 5 years of experience optimizing complex SQL queries.",
    contextSentenceZh: "我有5年优化复杂SQL查询的经验。"
  },
  {
    id: 'p2',
    term: 'Azure',
    correctPhonetic: '/ˈæʒ.ər/ (AZH-er)',
    commonMistake: '常见误读：阿居尔、阿祖尔',
    audioText: 'We deployed our microservices onto Microsoft Azure.',
    contextSentenceEn: "We host our containerized microservices on Microsoft Azure.",
    contextSentenceZh: "我们在微软Azure云上托管容器化微服务。"
  },
  {
    id: 'p3',
    term: 'GUI',
    correctPhonetic: '/ˈɡuː.i/ (GOO-ee)',
    commonMistake: '不要单字母拼 G-U-I',
    audioText: 'The system provides both a CLI and a web-based GUI.',
    contextSentenceEn: "Our team developed a responsive GUI for internal administration.",
    contextSentenceZh: "我们团队为内部运营开发了一个响应式的GUI界面。"
  },
  {
    id: 'p4',
    term: 'Cache',
    correctPhonetic: '/kæʃ/ (Cash，跟现金 Cash 同音)',
    commonMistake: '切勿读成"卡车 (catch)"或"卡秀"',
    audioText: 'We store frequently accessed sessions in Redis cache.',
    contextSentenceEn: "Implementing a distributed cache slashed our DB load by 80%.",
    contextSentenceZh: "引入分布式缓存为我们的数据库降低了80%的负载。"
  },
  {
    id: 'p5',
    term: 'Agile',
    correctPhonetic: '/ˈædʒ.aɪl/ (AJ-eye-l)',
    commonMistake: '不要读成"阿吉勒"或"埃吉尔"',
    audioText: 'Our engineering team follows Agile Scrum methodology.',
    contextSentenceEn: "We run two-week sprints under the Agile framework.",
    contextSentenceZh: "我们在敏捷框架下运行两周一期的Sprint迭代。"
  },
  {
    id: 'p6',
    term: 'NGINX',
    correctPhonetic: '/ˌɛn.dʒɪnˈɛks/ (Engine-X)',
    commonMistake: '不要拼读 N-G-I-N-X',
    audioText: 'NGINX acts as our reverse proxy and load balancer.',
    contextSentenceEn: "We configured NGINX as the API gateway and TLS termination proxy.",
    contextSentenceZh: "我们将NGINX配置为API网关与TLS卸载代理。"
  },
  {
    id: 'p7',
    term: 'Kubectl',
    correctPhonetic: '/koob-control/ 或 /ˈkjuːb.kə.təl/',
    commonMistake: '不要读得磕磕绊绊，老外多读作 "koob-control"',
    audioText: 'You can inspect the running pods with kubectl get pods.',
    contextSentenceEn: "I use kubectl daily to monitor pod health and logs in Kubernetes.",
    contextSentenceZh: "我每天用kubectl查看K8s集群中Pod的运行状态与日志。"
  },
  {
    id: 'p8',
    term: 'SaaS',
    correctPhonetic: '/sæs/ (Sass)',
    commonMistake: '不要读成"S-A-A-S"',
    audioText: 'Our company builds enterprise B2B SaaS software.',
    contextSentenceEn: "I have spent four years architecting multitenant SaaS platforms.",
    contextSentenceZh: "我拥有四年设计多租户SaaS平台的架构经验。"
  }
]

