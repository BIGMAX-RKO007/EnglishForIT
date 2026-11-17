export interface StandupExample {
  id: string
  role: string
  roleZh: string
  yesterdayEn: string
  yesterdayZh: string
  todayEn: string
  todayZh: string
  blockersEn: string
  blockersZh: string
  fullSpokenEn: string
  audioHints: string
}

export interface WorkScenario {
  id: string
  title: string
  titleZh: string
  category: 'standup' | 'pr-review' | 'incident' | 'slack-chat'
  descriptionZh: string
  dialogue: {
    speaker: string
    speakerRole: string
    textEn: string
    textZh: string
    tipZh?: string
  }[]
  keyExpressions: {
    en: string
    zh: string
    usageNote: string
  }[]
}

export const STANDUP_EXAMPLES: StandupExample[] = [
  {
    id: 'standup-feature-dev',
    role: 'Full Stack Engineer',
    roleZh: '全栈开发（新功能开发）',
    yesterdayEn: "Yesterday, I wrapped up the user profile API endpoint and added corresponding unit tests with 90% coverage.",
    yesterdayZh: "昨天，我完成了用户个人资料的API接口，并编写了对应的单元测试，覆盖率达到90%。",
    todayEn: "Today, I'm working on integrating the frontend form with the backend API and handling edge cases like avatar uploads.",
    todayZh: "今天，我将进行前端表单与后端API的联调整合，并处理头像上传等边界异常情况。",
    blockersEn: "No hard blockers on my end, but I'd really appreciate a quick review on PR #128 so I can get it merged into main.",
    blockersZh: "我这边没有硬性阻塞项，不过希望大家能帮忙看一下128号PR，以便尽快合入主分支。",
    fullSpokenEn: "Morning everyone! Yesterday, I wrapped up the user profile API endpoint and added unit tests. Today, I'm focusing on frontend integration and avatar uploads. No major blockers on my side, but could someone take a look at PR #128 when you have a free minute? Thanks!",
    audioHints: "强调'wrapped up'（收尾搞定）和'focusing on'（专注于），语气轻快紧凑。"
  },
  {
    id: 'standup-bugfix-refactor',
    role: 'Backend Engineer',
    roleZh: '后端开发（性能与排障）',
    yesterdayEn: "Yesterday, I investigated ticket JIRA-402 regarding slow query execution in our billing report module. I identified that an unindexed foreign key was causing a full table scan.",
    yesterdayZh: "昨天，我排查了JIRA-402关于账单报表模块慢查询的Issue，发现是一个缺少索引的外键导致了全表扫描。",
    todayEn: "Today, I plan to deploy a non-blocking database migration script to staging, verify index usage, and benchmark the query performance.",
    todayZh: "今天，我计划向预发环境部署无锁DDL索引脚本，验证执行计划，并对查询性能进行基准压测。",
    blockersEn: "I'm currently waiting for DBA sign-off on the migration script before running it in production.",
    blockersZh: "我目前正在等待DBA对生产迁移脚本的审核签字。",
    fullSpokenEn: "Hey team. Yesterday, I tracked down the billing report slowdown in JIRA-402—turned out to be a missing index causing a full table scan. Today, I'm running migration benchmarks in staging. Blocker-wise, I'm just waiting for DBA sign-off before proceeding to prod.",
    audioHints: "使用'tracked down'（追查到根源）和'turned out to be'（原来是因为）。"
  },
  {
    id: 'standup-blocked-help',
    role: 'DevOps / Infra',
    roleZh: '运维/基础设施（求助与受阻）',
    yesterdayEn: "Yesterday, I provisioned the new staging Kubernetes cluster and configured the Helm charts for the microservices.",
    yesterdayZh: "昨天，我配置了新的预发K8s集群，并为各微服务编写了Helm配置清单。",
    todayEn: "Today, I will configure the Ingress controller and SSL certificates via cert-manager.",
    todayZh: "今天，我将配置Ingress网关路由，并通过cert-manager签发SSL证书。",
    blockersEn: "I'm blocked by DNS delegation permissions. Could someone from the security team grant me access to update the subdomain records?",
    blockersZh: "我目前被DNS委托权限卡住了，安全团队能否帮忙开通一下子域名的更新权限？",
    fullSpokenEn: "Hi all. Yesterday I got the new staging cluster provisioned with Helm. Today I'm setting up Ingress and SSL. I am currently blocked on DNS permissions—could anyone with admin access to Route53 ping me after standup? That's all from me.",
    audioHints: "受阻时直接说'I am currently blocked on...'，并在结尾补充'ping me after standup'。"
  }
]

export const WORK_SCENARIOS: WorkScenario[] = [
  {
    id: 'pr-code-review',
    title: 'PR & Code Review Etiquette',
    titleZh: '代码审查（PR Review）专业沟通',
    category: 'pr-review',
    descriptionZh: '如何在 GitHub / GitLab 上地道、委婉地提出修改建议，或者解释自己的代码设计。',
    dialogue: [
      {
        speaker: 'Senior Reviewer',
        speakerRole: '资深审查员',
        textEn: "Thanks for the PR! The overall implementation looks very clean. Just a quick question: have we considered what happens if the external payment gateway times out?",
        textZh: "感谢提交PR！整体实现非常清爽。提个小问题：我们是否考虑过如果外部支付网关超时会发生什么？",
        tipZh: "先肯定（looks very clean），再提问（have we considered...），切忌生硬命令对方修改。"
      },
      {
        speaker: 'You (Author)',
        speakerRole: '你（PR作者）',
        textEn: "Great catch! Currently it throws a 500. I think we should introduce a retry mechanism with exponential backoff and return a graceful fallback response.",
        textZh: "看得很准！目前它会直接抛出500。我认为我们应该引入指数退避重试机制，并返回一个友好的降级响应。",
        tipZh: "用'Great catch!'（提得太好了/被你抓到了）显得非常成熟且欢迎反馈。"
      },
      {
        speaker: 'Senior Reviewer',
        speakerRole: '资深审查员',
        textEn: "Sounds like a solid plan. Minor nitpick: could we extract line 45 into a reusable helper function? Otherwise, LGTM (Looks good to me)!",
        textZh: "方案很稳健。另外有个微小的排版/建议（Nitpick）：能不能把第45行抽取为一个通用的helper函数？除此以外，我看没问题，可以合入！",
        tipZh: "Nitpick代表'无伤大雅的小建议'，不影响PR合入。"
      }
    ],
    keyExpressions: [
      { en: "Great catch!", zh: "抓得太准了！/ 这个盲区提得好！", usageNote: "承认Reviewer指出的潜在问题，极其得体。" },
      { en: "Nitpick: ...", zh: "微小的建议 / 吹毛求疵的小点", usageNote: "不阻碍合入的代码风格建议。" },
      { en: "LGTM (Looks good to me)", zh: "代码整体不错，我准予合并", usageNote: "最通用的审查通过评价。" },
      { en: "Could we clarify the rationale behind this approach?", zh: "能否解释一下采取这种方案的设计考量？", usageNote: "比起直接说'你写错了'，这样问更加专业。" }
    ]
  },
  {
    id: 'incident-troubleshooting',
    title: 'Incident & Outage Troubleshooting',
    titleZh: '生产突发故障排查与紧急汇报',
    category: 'incident',
    descriptionZh: '当生产环境报警、5xx错误激增时，如何在 Slack / Teams 中快速同步排查进展并达成共识。',
    dialogue: [
      {
        speaker: 'Incident Lead',
        speakerRole: '故障指挥官',
        textEn: "Heads up team: we are seeing a spike in 504 Gateway Timeouts on the checkout service. Are there any recent deployments?",
        textZh: "大家注意：我们发现结算服务出现了大量504网关超时错误。最近有任何发布上线吗？",
        tipZh: "'Heads up'用于发起突发预警。"
      },
      {
        speaker: 'You (On-Call)',
        speakerRole: '你（当值开发）',
        textEn: "I'm looking into it right now. We deployed release v3.4 about 15 minutes ago. It looks like database connection pool exhaustion.",
        textZh: "我正在立即排查。大约15分钟前我们发布了v3.4版本。从现象看很可能是数据库连接池耗尽了。",
        tipZh: "使用'I'm looking into it'让团队安心，用'It looks like...'陈述初步判断。"
      },
      {
        speaker: 'You (On-Call)',
        speakerRole: '你（当值开发）',
        textEn: "To minimize user impact, I strongly recommend we roll back to v3.3 immediately while we inspect the slow query logs.",
        textZh: "为最大程度降低对用户的影响，我强烈建议我们立即回滚到v3.3版本，同时排查慢查询日志。",
        tipZh: "故障期'先止损，后排查'，提出明确Action（roll back）。"
      },
      {
        speaker: 'Incident Lead',
        speakerRole: '故障指挥官',
        textEn: "Agreed. Let's trigger the rollback. Keep us posted in the #incident-war-room channel.",
        textZh: "同意。开始触发回滚。排查进展请持续同步在故障战备频道。",
        tipZh: "'Keep us posted'意为随时同步最新消息。"
      }
    ],
    keyExpressions: [
      { en: "I'm looking into it right now.", zh: "我正在介入排查。", usageNote: "故障第一时间的标准响应。" },
      { en: "It might be related to...", zh: "这可能与……有关", usageNote: "用情态动词提出合理假设，避免下武断结论。" },
      { en: "Let's roll back immediately to mitigate user impact.", zh: "我们立即回滚以止损。", usageNote: "高压事故下的专业提议。" },
      { en: "The root cause has been isolated.", zh: "根本原因已经定位并隔离。", usageNote: "向管理层或跨部门同步好消息。" }
    ]
  },
  {
    id: 'slack-clarification',
    title: 'Async Clarification & Asking for Help',
    titleZh: 'Slack/Teams 异步需求对齐与提问',
    category: 'slack-chat',
    descriptionZh: '不确定需求或遇到技术卡点时，如何清晰、礼貌地向同事或跨国产品经理对齐。',
    dialogue: [
      {
        speaker: 'You',
        speakerRole: '你',
        textEn: "Hi Sarah, quick question regarding user story PROJ-88. Just to ensure we're on the same page: should the export CSV button be disabled for read-only members, or hidden completely?",
        textZh: "Sarah你好，关于PROJ-88用户故事有个小疑问。为了确保我们理解一致：对于只读权限成员，导出CSV按钮是置灰禁用，还是直接隐藏？",
        tipZh: "提供具体二选一选项（disabled or hidden），比开放性模糊提问效率高十倍！"
      },
      {
        speaker: 'Product Manager',
        speakerRole: '产品经理',
        textEn: "Good point! Let's disable it with a tooltip explaining that they need admin privileges to export data.",
        textZh: "问得好！我们把它置灰，并加上悬浮提示说明需要管理员权限才能导出数据。",
        tipZh: "跨国协作最喜欢这种精准的对齐方式。"
      },
      {
        speaker: 'You',
        speakerRole: '你',
        textEn: "Understood, will do! I will update the acceptance criteria in Jira accordingly.",
        textZh: "明白，收到！我会在Jira的验收标准中同步更新这一点。",
        tipZh: "主动闭环文档（update the acceptance criteria），尽显专业。"
      }
    ],
    keyExpressions: [
      { en: "Just to ensure we're on the same page...", zh: "为了确保我们理解完全一致……", usageNote: "确认需求时的万能金句。" },
      { en: "Would you prefer A or B?", zh: "你更倾向于方案A还是方案B？", usageNote: "给同事做选择题，减少来回扯皮。" },
      { en: "I'll update the ticket accordingly.", zh: "我会在工单中同步跟进。", usageNote: "展示主动推进闭环的素养。" }
    ]
  }
]

// ============================================================================
// 💼 重大架构与技术汇报 (Tech Briefing & Architecture Review)
// 主题：Box × Snowflake 原生打通（Openflow 批量入仓 vs ENA 原生 API 出网）
// 支持中、日、韩、英四语对照与原生语音试听
// ============================================================================

export interface TechBriefingKeyTerm {
  term: string
  zh: string
  ja: string
  ko: string
  en: string
  contextNoteZh: string
}

export interface TechBriefingComparisonRow {
  dimensionZh: string
  dimensionJa: string
  dimensionKo: string
  dimensionEn: string
  openflowZh: string
  openflowJa: string
  openflowKo: string
  openflowEn: string
  enaZh: string
  enaJa: string
  enaKo: string
  enaEn: string
}

export interface TechBriefingDimension {
  id: string
  dimensionNumber: number
  badgeZh: string
  badgeJa: string
  badgeKo: string
  badgeEn: string
  titleZh: string
  titleJa: string
  titleKo: string
  titleEn: string
  targetAudienceZh: string
  targetAudienceJa: string
  targetAudienceKo: string
  targetAudienceEn: string
  coreTakeawayZh: string
  coreTakeawayJa: string
  coreTakeawayKo: string
  coreTakeawayEn: string
  speechZh: string
  speechJa: string
  speechKo: string
  speechEn: string
  keyTerms: TechBriefingKeyTerm[]
  comparisonRows?: TechBriefingComparisonRow[]
}

export const TECH_BRIEFING_DATA: TechBriefingDimension[] = [
  {
    id: 'briefing-dim-1-strategy',
    dimensionNumber: 1,
    badgeZh: '战略价值 · 业务痛点',
    badgeJa: '戦略的価値・事業課題',
    badgeKo: '전략적 가치 · 비즈니스 과제',
    badgeEn: 'Strategic Value & Problem Statement',
    titleZh: '战略背景与业务价值：为什么做这件事？解决什么痛点？',
    titleJa: '戦略的背景とビジネス価値：なぜこの投資が必要か？どの課題を解くのか？',
    titleKo: '전략적 배경과 비즈니스 가치: 왜 지금 이 프로젝트인가? 어떤 페인포인트를 해결하는가?',
    titleEn: 'Strategic Context & Business Value: Why are we doing this?',
    targetAudienceZh: '部门领导、项目总监、业务侧主管',
    targetAudienceJa: '部門責任者、プロジェクト統括ディレクター、業務主管',
    targetAudienceKo: '부서장, 프로젝트 디렉터, 비즈니스 총괄 책임자',
    targetAudienceEn: 'Department Heads, Project Directors, Business Leads',
    coreTakeawayZh: '击碎 80% 非结构化规程与文档的数据孤岛，终结外部爬虫/Airflow 脚本长链路与密钥外泄风险，实现数仓与云盘的原生闭环。',
    coreTakeawayJa: '社内ナレッジの80%を占める非構造化文書のサイロ化を解消し、外部スクリプトの脆弱な多段運用と認証情報漏洩リスクを根本排除。',
    coreTakeawayKo: '사내 비정형 문서 80%의 데이터 사일로를 해소하고, 외부 스크립트/Airflow 다단계 파이프라인의 취약성과 인증키 유출 리스크를 원천 차단.',
    coreTakeawayEn: 'Unify 80% of unstructured enterprise knowledge into analytics without fragile external middleware or credential leaks.',
    speechZh: `各位领导，过去我们的数仓主要处理 Oracle、MySQL 等结构化交易数据。但企业中超过 80% 的高价值知识（如内控规程、技术设计书、合规清单）都沉睡在 Box 云盘里，业务在数仓中完全无法感知这些非结构化资产。

过去若想把 Box 数据拿到数仓，通常要在外部搭建 Python 爬虫或维护 Airflow 调度任务，链路长、节点多、运维重，且 API 密钥散落在外部服务器极易泄露。

这次我们通过技术攻关，实现了‘数仓与 SaaS 云盘的原生闭环’：不仅能把 Box 文档直接自动化同步入仓作为 Cortex AI 检索知识库，还能让 Snowflake 直接主动调用 Box Web API。真正做到了‘资产不出安全边界、架构零冗余中间件’。`,
    speechJa: `皆様、これまで当社のデータウェアハウスは主に Oracle や MySQL などの構造化されたトランザクションデータを扱ってまいりました。しかし、社内規定や技術設計書、コンプライアンス点検表といった高付加価値なナレッジの8割以上は、依然として Box 上にサイロ化されたまま眠っており、数倉側からは全く利活用できない状態でした。

従来、Box のデータを数倉へ取り込むには、外部サーバー上で Python スクリプトや Airflow によるバッチ連携を組む必要があり、連携障害のリスクや運用負荷が高く、API シークレットの管理不備による漏洩リスクも懸念されていました。

今回の技術検証により、外部ミドルウェアを一切介さない『Snowflake と Box のネイティブ連携』を実現いたしました。Box 内の文書を Cortex AI の検索用ナレッジとして自動同期するだけでなく、Snowflake から直接 Box Web API をオンデマンドで安全に呼び出すことが可能です。これにより、セキュリティ境界を厳格に維持したまま、完全ゼロ中間サーバー構成を達成いたしました。`,
    speechKo: `경영진 및 리더 여러분, 지금까지 저희 데이터 웨어하우스는 Oracle, MySQL 등 정형 트랜잭션 데이터 처리에 집중되어 있었습니다. 하지만 사내 핵심 지식인 내규, 기술 설계서, 컴플라이언스 체크리스트의 80% 이상은 여전히 Box 클라우드에 비정형 상태로 잠들어 있어, 데이터 웨어하우스에서 전혀 활용되지 못했습니다.

기존 방식으로 Box 데이터를 웨어하우스로 가져오려면 외부 가상머신에서 파이썬 크롤러나 Airflow 배치를 별도로 운영해야 했습니다. 이는 장애 포인트가 많고 운영 부담이 클 뿐 아니라, API 인증 키가 외부 서버에 노출되는 치명적인 보안 리스크가 있었습니다.

이번 기술 검증을 통해 저희는 별도의 미들웨어 없이 ‘Snowflake와 Box 간의 네이티브 완결형 파이프라인’을 구축했습니다. 대규모 문서를 Cortex AI 지식 베이스로 자동 동기화할 뿐 아니라, Snowflake 내부에서 Box REST API를 직접 안전하게 호출할 수 있게 되었습니다. 즉, ‘데이터 보안 경계 준수’와 ‘외부 인프라 제로화’를 완벽하게 동시에 달성했습니다.`,
    speechEn: `Executive team, traditionally our data warehouse has focused on structured relational databases like Oracle and MySQL. However, over 80% of our enterprise intelligence—such as internal governance policies, architecture blueprints, and compliance checklists—remains locked away in Box, entirely disconnected from our analytics platform.

In the past, bridging Box to Snowflake required managing external Python scripts or Airflow pipelines—introducing high operational overhead, frequent pipeline breakage, and critical credential exposure risks on third-party servers.

Through this initiative, we have established a native, zero-middleware integration between Snowflake and Box. We can now continuously ingest enterprise documents into internal stages for Cortex AI RAG search, while enabling Snowflake to directly invoke Box REST APIs on demand. This ensures zero data egress beyond our security perimeter and absolute zero infrastructure sprawl.`,
    keyTerms: [
      {
        term: 'Unstructured Data',
        zh: '非结构化数据',
        ja: '非構造化データ',
        ko: '비정형 데이터',
        en: 'Unstructured Data',
        contextNoteZh: '指 PDF、Word、扫描件等无法用标准 SQL 二维表存储的企业知识资产。',
      },
      {
        term: 'Data Silos',
        zh: '数据孤岛',
        ja: 'データのサイロ化',
        ko: '데이터 사일로',
        en: 'Data Silos',
        contextNoteZh: '云盘非结构化文档与数仓交易数据割裂、彼此无法联合检索的现状。',
      },
      {
        term: 'Native Integration',
        zh: '原生内生集成',
        ja: 'ネイティブ連携',
        ko: '네이티브 연동',
        en: 'Native Integration',
        contextNoteZh: '不依赖外部跳板机，直接在数仓计算引擎内完成鉴权与网络穿透。',
      },
      {
        term: 'Cortex AI / RAG',
        zh: '检索增强生成知识库',
        ja: 'Cortex RAG ナレッジベース',
        ko: 'Cortex RAG 지식 베이스',
        en: 'Cortex AI / RAG Knowledge Base',
        contextNoteZh: '将入仓文档自动切块分词与向量化，供企业内部 AI 进行精准问答检索。',
      },
    ],
  },
  {
    id: 'briefing-dim-2-architecture',
    dimensionNumber: 2,
    badgeZh: '架构选型 · 双轮驱动',
    badgeJa: '技術選定・両輪駆動',
    badgeKo: '아키텍처 선정 · 듀얼 엔진',
    badgeEn: 'Architecture Trade-offs & Selection Matrix',
    titleZh: '技术路线与双方案选型矩阵：两种方式怎么选？适用的场景是什么？',
    titleJa: '技術ロードマップと選定マトリクス：2方式の使い分けと適用シナリオ',
    titleKo: '기술 로드맵과 2대 솔루션 선정 매트릭스: 어떤 방식을 언제 선택하는가?',
    titleEn: 'Architecture Roadmap & Dual-Engine Selection Matrix',
    targetAudienceZh: '技术总监、企业架构师（Enterprise Architect）',
    targetAudienceJa: '技術統括部長、エンタープライズアーキテクト（EA）',
    targetAudienceKo: '기술총괄(CTO), 엔터프라이즈 아키텍트(EA)',
    targetAudienceEn: 'VP of Engineering, Enterprise Architects',
    coreTakeawayZh: '摒弃单一定式，确立“批量沉淀走 Openflow 托管管道，实时交互走 ENA 原生 API”的动静分离互补架构。',
    coreTakeawayJa: '画一的なアプローチを排し、「大量蓄積は Openflow パイプライン、リアルタイム照会は ENA API」という動静分離の相補構成を確立。',
    coreTakeawayKo: '단일 방식을 배제하고 ‘대규모 누적 적재는 Openflow 관리형 파이프라인, 실시간 대화형 조회는 ENA 네이티브 API’로 이원화.',
    coreTakeawayEn: 'Adopt a dual-engine architecture: managed Openflow pipelines for bulk ingestion, and ENA native APIs for real-time interaction.',
    speechZh: `在实际技术路线上，我们针对‘批量管道’与‘实时交互’两类诉求，分别落地并实测了两套互补方案：

方案 A：基于 Openflow 的全托管管道（入仓方向）。面向企业知识库沉淀的大批量、增量文档抓取。底层基于 SPCS 容器引擎，通过 Box 审计日志实现 CDC 增量变更捕获，自动将 PDF/Word 下载至内部受管 Stage，并由 Cortex 完成切块与向量化。

方案 B：基于 ENA（External Network Access）的微秒级 API 直连（出站方向）。面向即时查询与点对点按需抓取。在数仓内通过安全网关让 SQL/Python UDF 像调用本地函数一样直接触发 Box REST API，毫秒级拉取指定文件的元数据或流式正文。

选型结论是：定期沉淀全量制度走 Openflow，业务实时按需探测走 ENA API，职责清晰、完全解耦。`,
    speechJa: `技術アーキテクチャの選定において、我々は単一の手法に固執せず、『バッチ取り込み』と『リアルタイム対話』という異なる要件に対して、2つの相補的なアプローチを検証・確立いたしました。

第1に【Openflow マネージドパイプライン（インバウンド）】です。社内ナレッジベース構築に向けた大量文書の増分取り込みを担います。SPCS（Snowpark Container Services）基盤上で稼働し、Box の監査ログを活用した CDC（変更データキャプチャ）により、新規・更新された PDF や Word を内部ステージへ自動同期し、Cortex によるテキスト分割・ベクトル化を一気通貫で処理します。

第2に【ENA（External Network Access）ネイティブ API 直結（アウトバウンド）】です。オンデマンドなメタデータ検証や軽量な即時照会を担います。Network Rule と Secret による厳格な制御下で、SQL や Python UDF から Box REST API を直接呼び出し、指定ファイルの属性やストリーム本文をミリ秒単位で取得します。

結論として、定期的な全社ナレッジの蓄積には Openflow を、リアルタイムの個別照会には ENA API を使い分けることで、関心事の完全な分離と最適なリソース配分を実現いたします。`,
    speechKo: `기술 아키텍처 측면에서 저희는 한 가지 방식만 고집하지 않고, ‘대규모 배치 적재’와 ‘실시간 대화형 조회’라는 상이한 요구사항에 맞춰 두 가지 상호보완적 솔루션을 검증 완료했습니다.

첫 번째는 【Openflow 기반 관리형 파이프라인(인바운드)】입니다. 전사 지식 베이스 구축을 위한 대규모 증분 문서 수집에 최적화되어 있습니다. SPCS 컨테이너 인프라를 바탕으로 Box 감사 로그 기반의 CDC(변경 데이터 캡처)를 수행하여, PDF와 Word 문서를 내부 스테이지로 자동 적재하고 Cortex를 통해 청킹(Chunking) 및 임베딩을 완결합니다.

두 번째는 【ENA(External Network Access) 네이티브 Web API 직결(아웃바운드)】입니다. 온디맨드 단건 조회 및 실시간 메타데이터 검증에 적합합니다. 웨어하우스 내의 Network Rule과 Secret 객체를 통해 SQL 및 Python UDF에서 로컬 함수를 호출하듯 Box REST API를 직접 호출하여 수 밀리초 단위로 응답을 받아옵니다.

최종 결론은, 주기적인 대규모 제도 문서는 Openflow로 누적 적재하고, 실시간 온디맨드 인터랙션은 ENA API로 처리하는 ‘역할 분리 및 완전 디커플링’ 아키텍처입니다.`,
    speechEn: `From an engineering perspective, rather than forcing a monolithic pattern, we architected a dual-engine model tailored for bulk ingestion versus real-time query enrichment:

Pattern A: Openflow Managed Pipeline (Inbound). Designed for bulk ingestion into enterprise knowledge bases. Backed by SPCS containers, it leverages Box audit logs for automated CDC, syncing new and updated documents directly into internal stages where Cortex handles automated chunking and vector embeddings.

Pattern B: ENA Native Web API Integration (Outbound). Designed for sub-second, on-demand query enrichment. By defining Network Rules and Secrets within Snowflake, Python UDFs and Stored Procedures can invoke Box REST APIs just like local functions, streaming metadata and file content on the fly.

Our architectural verdict is straightforward: route periodic institutional document syncs through Openflow, and direct point-to-point operational lookups through ENA.`,
    keyTerms: [
      {
        term: 'Managed Pipeline (Openflow)',
        zh: '全托管数据管道',
        ja: 'マネージドパイプライン',
        ko: '관리형 데이터 파이프라인',
        en: 'Fully-Managed Data Pipeline',
        contextNoteZh: '基于 SPCS 容器底座的自动化文件同步与解析中间件。',
      },
      {
        term: 'External Network Access (ENA)',
        zh: '数仓原生出网能力',
        ja: '外部ネットワークアクセス (ENA)',
        ko: '외부 네트워크 접근 (ENA)',
        en: 'External Network Access (ENA)',
        contextNoteZh: '允许数仓内的 UDF / 存储过程在安全沙箱内主动发起外部 HTTPS 请求。',
      },
      {
        term: 'CDC (Change Data Capture)',
        zh: '增量变更捕获',
        ja: '変更データキャプチャ (CDC)',
        ko: '변경 데이터 캡처 (CDC)',
        en: 'Change Data Capture (CDC)',
        contextNoteZh: '借助 Box 审计事件日志精准抓取文件的新增、修改与删除事件。',
      },
    ],
    comparisonRows: [
      {
        dimensionZh: '数据流向',
        dimensionJa: 'データフロー方向',
        dimensionKo: '데이터 전송 방향',
        dimensionEn: 'Data Flow Direction',
        openflowZh: 'Box ➔ Snowflake (主动入仓拉取)',
        openflowJa: 'Box ➔ Snowflake (インバウンド取込)',
        openflowKo: 'Box ➔ Snowflake (인바운드 적재)',
        openflowEn: 'Box ➔ Snowflake (Inbound Ingestion)',
        enaZh: 'Snowflake ➔ Box (仓内主动出网请求)',
        enaJa: 'Snowflake ➔ Box (アウトバウンド要求)',
        enaKo: 'Snowflake ➔ Box (아웃바운드 API 호출)',
        enaEn: 'Snowflake ➔ Box (Outbound Request)',
      },
      {
        dimensionZh: '适用场景',
        dimensionJa: '適用シナリオ',
        dimensionKo: '적용 시나리오',
        dimensionEn: 'Target Use Case',
        openflowZh: '全量/增量文档沉淀、企业知识库、Cortex RAG',
        openflowJa: '全社規定・ドキュメント蓄積、Cortex RAG 基盤',
        openflowKo: '대규모 규정/설계서 축적, Cortex RAG 지식 베이스',
        openflowEn: 'Bulk Document Ingestion, Knowledge Bases, Cortex RAG',
        enaZh: '点对点按需抓取、实时元数据校验、轻量级即时交互',
        enaJa: 'オンデマンド個別照会、リアルタイム属性検証',
        enaKo: '온디맨드 단건 조회, 실시간 메타데이터 검증',
        enaEn: 'Point-to-Point Lookups, Real-time Metadata Enrichment',
      },
      {
        dimensionZh: '执行载体',
        dimensionJa: '実行基盤',
        dimensionKo: '실행 인프라',
        dimensionEn: 'Compute Execution',
        openflowZh: '托管数据管道（SPCS / NiFi 容器底座）',
        openflowJa: 'マネージドパイプライン（SPCS コンテナ基盤）',
        openflowKo: '관리형 파이프라인 (SPCS 컨테이너 인프라)',
        openflowEn: 'Managed Pipeline Engine (SPCS Containers)',
        enaZh: '标准虚拟数仓（Python UDF / Stored Procedure）',
        enaJa: '仮想ウェアハウス（Python UDF / ストアドプロシージャ）',
        enaKo: '가상 웨어하우스 (Python UDF / 저장 프로시저)',
        enaEn: 'Virtual Warehouse (Python UDF / Stored Procedure)',
      },
      {
        dimensionZh: '中间存储与落盘',
        dimensionJa: '中間ストレージ・永続化',
        dimensionKo: '중간 저장소 및 영속화',
        dimensionEn: 'Intermediate Storage',
        openflowZh: '必须落盘（Stage 物理原件 + Chunks 向量表）',
        openflowJa: '必須（内部ステージ原紙 + Chunks 分割表）',
        openflowKo: '필수 (내부 스테이지 원본 + Chunks 벡터 테이블)',
        openflowEn: 'Mandatory (Internal Stage + Chunks Table)',
        enaZh: '可选（内存直接解析流式返回，亦可按需入表）',
        enaJa: '任意（メモリ内でストリーム解析、必要に応じ格納）',
        enaKo: '선택적 (메모리 스트림 파싱 후 즉시 반환 가능)',
        enaEn: 'Optional (Streamed in-memory, persists only if needed)',
      },
      {
        dimensionZh: '触发与时延',
        dimensionJa: 'トリガー・レイテンシ',
        dimensionKo: '트리거 및 지연 시간',
        dimensionEn: 'Trigger & Latency',
        openflowZh: '事件驱动 / 定时调度（分钟级批处理）',
        openflowJa: 'イベント駆動 / スケジュールバッチ（分単位）',
        openflowKo: '이벤트 기반 / 주기적 스케줄링 (분 단위 배치)',
        openflowEn: 'Event-driven / Scheduled Batch (Minute-level)',
        enaZh: '业务 SQL 即席查询驱动（毫秒级即时响应）',
        enaJa: 'アドホック SQL クエリ駆動（ミリ秒単位で即応）',
        enaKo: 'SQL 쿼리 즉시 트리거 (밀리초 단위 즉각 응답)',
        enaEn: 'On-demand Ad-hoc SQL (Millisecond Latency)',
      },
    ],
  },
  {
    id: 'briefing-dim-3-security',
    dimensionNumber: 3,
    badgeZh: '安全防御 · 合规治理',
    badgeJa: 'セキュリティ・コンプライアンス',
    badgeKo: '보안 거버넌스 · 컴플라이언스',
    badgeEn: 'Zero-Trust Security & Compliance',
    titleZh: '安全与合规治理：如何保证企业级安全？有没有合规风险？',
    titleJa: 'セキュリティとガバナンス：エンタープライズ基準を満たせるか？コンプライアンスリスクは？',
    titleKo: '보안과 컴플라이언스 거버넌스: 엔터프라이즈 보안을 어떻게 보장하는가? 규제 리스크는?',
    titleEn: 'Enterprise Security & Compliance: Zero-Trust Governance',
    targetAudienceZh: '安全负责人（CISO）、合规审计员、风险管理部',
    targetAudienceJa: '最高情報セキュリティ責任者（CISO）、コンプライアンス監査室、リスク統括部',
    targetAudienceKo: '최고정보보호책임자(CISO), 컴플라이언스 감사팀, 리스크 관리본부',
    targetAudienceEn: 'Chief Information Security Officer (CISO), Compliance Auditors, Risk Management',
    coreTakeawayZh: '凭据硬件级加密掩码、出网白名单绝对锁定、以及原汁原味的 Box ACL 权限映射，确保“Box 看不到的，Snowflake 里绝查不到”。',
    coreTakeawayJa: '認証情報のハードウェア暗号化・完全マスキング、厳格な接続先ホワイトリスト、Box ACL の忠実な継承により金融水準の防壁を構築。',
    coreTakeawayKo: '자격 증명 하드웨어 암호화 및 마스킹, 엄격한 화이트리스트 아웃바운드 통제, Box ACL 상속으로 ‘Box 권한 없는 파일 열람 불가’ 구현.',
    coreTakeawayEn: 'Hardware-encrypted secrets, strict zero-trust egress whitelisting, and Box ACL preservation ensure defense-in-depth compliance.',
    speechZh: `在金融与企业级场景中，安全永远是第一优先级。我们在两套方案的设计中完全落实了最高级别的安全基线：

第一，凭据零泄露（Secret 硬件加密）：全面摒弃了明文配置与容易失效的外部环境变量。我们在 Snowflake 内创建专用的 SECRET 对象，明文在存入瞬间即被底层硬件加密，QUERY_HISTORY 日志中全被强制掩码，任何 DBA 通过 SQL 均无法逆向窥探。

第二，网络出网绝对受控（Zero Trust Egress）：通过 NETWORK RULE 实施极其严苛的白名单机制，仅允许发往 api.box.com:443，其他任何外部 IP 和域名一律在网关层彻底阻断，根绝数据外发与恶意越权。

第三，权限映射与保真（Box ACL 传承）：在文档切块与落表阶段，我们完整提取了 Box 文件夹上的员工权限列表（USER_EMAILS），即使数据进入数仓，下游应用查询时仍强行绑定用户身份过滤，确保‘在 Box 没权限看的文件，在 Snowflake 里同样查不到’。`,
    speechJa: `金融業界やエンタープライズにおいて、セキュリティは最大の最優先事項です。本設計では、極めて厳格なセキュリティベースラインを実装いたしました。

第1に【認証情報の完全秘匿化（Secret ハードウェア暗号化）】です。平文設定や失効リスクのある外部環境変数を完全に排除しました。Snowflake の SECRET オブジェクトに登録されたトークンは即座に基盤側で暗号化され、QUERY_HISTORY や実行ログ上でも自動的にマスキングされます。たとえ管理者権限（DBA）であっても SQL 経由で平文を閲覧することは不可能です。

第2に【ゼロトラストに基づく送出制限（Network Rule による厳格なホワイトリスト）】です。通信先を api.box.com:443 のみに限定し、未許可の IP アドレスやドメインへのアウトバウンド通信はネットワークレイヤーで物理的に遮断されます。これにより、意図しない外部データ漏洩を未然に防ぎます。

第3に【権限継承とアクセス制御（Box ACL の完全同期）】です。文書の取り込み時に Box のフォルダ権限（ユーザーメールアドレス一覧）を同時に保持し、数倉内の行レベルセキュリティ（RLS）にバインドします。『Box 側で閲覧権限を持たないユーザーは、Snowflake 側でも絶対に検索できない』統制を徹底しております。`,
    speechKo: `금융 및 엔터프라이즈 환경에서 보안은 타협할 수 없는 제1의 원칙입니다. 저희는 이번 설계 전반에 걸쳐 최고 수준의 보안 기준을 구축했습니다.

첫째, 【자격 증명 제로 누출 (Secret 하드웨어 암호화)】: 취약한 평문 설정이나 외부 환경 변수를 완전히 배제했습니다. Snowflake의 전용 SECRET 객체를 통해 등록 즉시 하드웨어 수준에서 암호화되며, QUERY_HISTORY 실행 로그에서도 완전히 마스킹 처리되어 최고 관리자(DBA)라 할지라도 평문 키를 열람할 수 없습니다.

둘째, 【제로 트러스트 아웃바운드 제어 (Network Rule 화이트리스트)】: 오직 api.box.com:443만 허용하는 강력한 화이트리스트를 적용하여, 그 외 모든 외부 IP 및 도메인으로의 데이터 전송을 게이트웨이 레벨에서 물리적으로 차단합니다. 악의적인 데이터 탈취나 비인가 통신이 원천 불가능합니다.

셋째, 【권한 매핑 및 ACL 완벽 보존】: 문서 수집 시 Box 폴더의 사용자 접근 권한(USER_EMAILS)을 추출하여 Snowflake 행 수준 보안(Row-Level Security)과 연동했습니다. 즉, ‘Box에서 권한이 없는 직원은 Snowflake에서도 해당 문서를 절대 검색하거나 열람할 수 없는’ 엄격한 컴플라이언스를 달성했습니다.`,
    speechEn: `In highly regulated enterprise and financial environments, security and data governance are paramount. Our architecture enforces a defense-in-depth security posture across three critical pillars:

First, Zero Credential Exposure via Hardware Encryption: We eliminated plaintext API keys and fragile environment variables. By leveraging native Snowflake SECRET objects, tokens are hardware-encrypted at rest and automatically masked in QUERY_HISTORY logs, preventing even administrators from retrieving raw secrets via SQL.

Second, Zero-Trust Egress Filtering: By configuring strict Snowflake NETWORK RULEs, outbound connectivity is physically restricted to api.box.com:443. All other outbound traffic is dropped at the hypervisor network layer, preventing data exfiltration.

Third, Full ACL Preservation: During document ingestion and chunking, we extract Box folder permission manifests (USER_EMAILS) and bind them directly to Snowflake Row-Level Security policies. This guarantees that an employee without Box access to a file can never query or retrieve it in Snowflake.`,
    keyTerms: [
      {
        term: 'Hardware Secret Masking',
        zh: '凭据硬件加密脱敏',
        ja: 'シークレットのハードウェア暗号化',
        ko: '자격 증명 하드웨어 암호화 및 마스킹',
        en: 'Hardware Secret Masking',
        contextNoteZh: '密钥存入 Snowflake Secret 瞬间即被加密，执行日志完全掩码，杜绝 DBA 偷窥。',
      },
      {
        term: 'Network Rule Whitelisting',
        zh: '网络规则白名单出网',
        ja: 'ネットワークルール送出制限',
        ko: '네트워크 룰 화이트리스트 제어',
        en: 'Network Rule Whitelisting',
        contextNoteZh: '仅放行 api.box.com 443 端口，非白名单流量一律在虚拟机网卡层强行阻断。',
      },
      {
        term: 'ACL Preservation',
        zh: '访问控制列表传承',
        ja: 'ACL（アクセス権限）の同期継承',
        ko: 'ACL 접근 제어 목록 상속',
        en: 'ACL Preservation',
        contextNoteZh: '数仓行级安全绑定 Box 原生权限，确保非授权用户在 AI 问答中无法获取密级文档。',
      },
    ],
  },
  {
    id: 'briefing-dim-4-cost',
    dimensionNumber: 4,
    badgeZh: '成本效益 · 运维减负',
    badgeJa: 'コスト最適化・運用負荷低減',
    badgeKo: '비용 효율성 · 운영 부하 절감',
    badgeEn: 'TCO & Operational Efficiency',
    titleZh: '成本效益与运维减负：能省多少钱？运维成本低在哪里？',
    titleJa: 'コスト対効果と運用削減：どれだけ削減できるか？保守コスト低減の根拠',
    titleKo: '비용 효율성과 운영 부하 절감: 얼마나 절감되는가? 유지보수 절감 포인트는?',
    titleEn: 'TCO & Operational Efficiency: How much does it save?',
    targetAudienceZh: '运维主管、财务/预算负责人、中层管理',
    targetAudienceJa: 'インフラ運用統括、財務・予算責任者、IT マネジメント',
    targetAudienceKo: '인프라 운영팀장, 재무/예산 책임자, IT 기획 관리자',
    targetAudienceEn: 'Infrastructure Leads, Finance/Budget Officers, IT Directors',
    coreTakeawayZh: '彻底告别独立 Linux 虚拟机维护，纯 Serverless 秒级计费与 60 秒自动挂起，杜绝机器空转费用。',
    coreTakeawayJa: '外部 Linux サーバーの保守運用をゼロ化し、完全サーバーレスと60秒オートサスペンドによるアイドルコストの徹底排除。',
    coreTakeawayKo: '독립 Linux 가상머신 유지보수를 완전히 제거하고, 순수 서버리스 기반 초단위 과금 및 60초 자동 일시정지로 유휴 비용 제로화.',
    coreTakeawayEn: 'Eliminate dedicated VM maintenance; fully serverless compute with per-second billing and 60-second auto-suspend prevents idle waste.',
    speechZh: `从 TCO（总拥有成本）与运维开销来看，这套内生方案相比传统外部方案具备显著优势：

第一，运维节点彻底‘归零’：以前需要在外部维护 Linux 服务器、安装补丁、监控调度守护进程，一旦外部断网或证书过期就会报警；现在整个计算直接依托 Snowflake 原生环境，无需维护任何外部虚拟机或容器。

第二，极致的按需计费（Compute Auto-Suspend）：调用 Box API 时只占用运行时的计算仓，采用秒级计费且开启了 60 秒自动挂起。没有请求时费用为 0，彻底杜绝了传统常驻服务器每月固定的空转成本。`,
    speechJa: `TCO（総保有コスト）および運用保守の観点におきましても、本内製化アーキテクチャは従来の外部システム構成に対して圧倒的な優位性を持っています。

第1に【運用管理ノードの完全ゼロ化】です。従来は外部に Linux サーバーを構築し、OS パッチ適用、監視エージェントの運用、証明書更新のメンテナンスが必要でした。本構成ではすべての処理が Snowflake マネージド環境で完結するため、外部 VM や常駐コンテナの保守負担が一切発生しません。

第2に【秒単位の従量課金とオートサスペンド】です。API 実行時は仮想ウェアハウスのリソースのみを消費し、秒単位で課金されます。さらに処理完了後 60 秒で自動的に一時停止（Auto-Suspend）する設定となっているため、アイドル時の待機コストは完全にゼロです。従来の常駐型サーバーに比べて月額固定費を劇的に圧縮できます。`,
    speechKo: `TCO(총소유비용)와 운영 인력 공수 측면에서도 이번 내장형 아키텍처는 기존 외부 인프라 방식 대비 확연한 비용 절감 효과를 제공합니다.

첫째, 【운영 유지보수 노드 제로화】: 과거에는 외부 리눅스 서버를 띄워 정기 OS 패치, 모니터링 데몬 관리, SSL 인증서 갱신 등 상당한 유지보수 리소스가 소모되었습니다. 이번 구성은 모든 연산이 Snowflake 내부에서 직접 실행되므로, 관리해야 할 외부 VM이나 컨테이너 호스트가 전혀 없습니다.

둘째, 【초단위 종량 과금과 60초 자동 정지 (Auto-Suspend)】: Box API를 호출할 때만 가상 웨어하우스가 가동되며, 초 단위로 실사용 시간만 정산됩니다. 작업이 끝나면 60초 이내에 자동으로 절전 모드(Auto-Suspend)에 진입하므로, 요청이 없을 때의 유휴 비용은 정확히 0원입니다. 24시간 켜두어야 했던 레거시 서버 대비 고정비를 획기적으로 절감할 수 있습니다.`,
    speechEn: `From a TCO and operational standpoint, native warehousing integration holds decisive advantages over traditional external staging servers:

First, Zero Infrastructure Footprint: Legacy approaches required maintaining external Linux VMs, applying OS patches, renewing certificates, and managing cron daemons. Under this architecture, execution is entirely managed within Snowflake's native environment, eliminating external VM maintenance altogether.

Second, True Serverless Consumption with Auto-Suspend: Compute is billed per second and only runs during active API exchanges. With warehouse auto-suspend configured to 60 seconds, compute costs immediately drop to zero the moment processing completes, eliminating the perpetual monthly idle burn of dedicated middleware.`,
    keyTerms: [
      {
        term: 'Zero Infrastructure Footprint',
        zh: '运维节点彻底归零',
        ja: 'インフラ運用ノードのゼロ化',
        ko: '인프라 운영 노드 제로화',
        en: 'Zero Infrastructure Footprint',
        contextNoteZh: '不需要为管道单独采购和运维 Linux 虚拟机或搭建复杂的 K8s 集群。',
      },
      {
        term: 'Compute Auto-Suspend',
        zh: '虚拟数仓自动秒级休眠',
        ja: 'コンピュート自動一時停止',
        ko: '컴퓨트 자동 일시정지 (Auto-Suspend)',
        en: 'Compute Auto-Suspend',
        contextNoteZh: '任务跑完 60 秒后自动暂停计费，零请求即零开销。',
      },
    ],
  },
  {
    id: 'briefing-dim-5-poc-roadmap',
    dimensionNumber: 5,
    badgeZh: '真机战果 · 落地演进',
    badgeJa: '実機成果・推進計画',
    badgeKo: '실기 성과 · 실행 로드맵',
    badgeEn: 'Production Proof & Roadmap',
    titleZh: '真机验证成果与下一步落地建议：做完了吗？效果如何？下一步是什么？',
    titleJa: '実機検証の成果と次のアクション：実稼働の実績、検証結果、今後の展開計画',
    titleKo: '실기 구동 검증 성과와 차기 추진 계획: 실증이 완료되었는가? 결과와 로드맵은?',
    titleEn: 'Production-Grade Proof & Next Steps: Verified Execution & Roadmap',
    targetAudienceZh: '全体与会者、技术委员会、最终决策层',
    targetAudienceJa: '審査委員会全員、技術検討会、最終意思決定者',
    targetAudienceKo: '위원회 참석자 전원, 기술심의회, 최종 의사결정권자',
    targetAudienceEn: 'Executive Steering Committee, Decision Makers, All Stakeholders',
    coreTakeawayZh: '拒绝纸上谈兵，已在真实环境跑通 Box Custom App + OAuth 凭证 + 多格式（PDF/Word/TXT）二进制解析直查闭环，并理清试用环境与网络策略边界。',
    coreTakeawayJa: '机上の空論を排し、実機環境で Box Custom App 認証・メタデータ取得・PDF/Word/TXT の直接パースから内部ステージ格納までの全工程を完遂。',
    coreTakeawayKo: '단순 이론 검토를 넘어 실제 환경에서 Box Custom App 인증, 메타데이터 연동, PDF/Word/TXT 바이너리 파싱 및 스테이지 적재 전 과정을 완벽히 실증 완료.',
    coreTakeawayEn: 'Beyond theoretical diagrams, we have verified end-to-end execution in real environments—covering Box Custom Apps, multi-format parsing, and internal stages.',
    speechZh: `目前，我们绝非仅停留在理论设计，而是已经在真实生产级测试环境中跑通了全流程验证：

- 接口实操闭环：我们打通了 Box 开发者平台（Custom App），成功调通了文件元数据接口与二进制下载接口；
- 实机多格式解析入库：真实提取了包含《情報セキュリティ基本規程.pdf》、《機密設計書.docx》等在内的 PDF、Word、TXT、CSV 样本，验证了文本提取、入仓落盘以及 SQL 直查的完整闭环；
- 边界与暗坑摸排：在验证过程中我们摸清了底层机制细节（如试用账号的网络限制差异、Box 企业级 JWT 凭证与 Snowflake Secret 类型的适配边界），沉淀了可直接复制的脚手架脚本与排坑指南。

下一步落地建议：
第一阶段：针对核心规程制度库，优先接入 Openflow 自动化同步，沉淀统一知识底座；
第二阶段：将该底座直接赋能下游的 Streamlit 内部应用与 Cortex AI 智能问答，快速向业务部门交付第一批看得见、用得着的 AI 检索成果。`,
    speechJa: `現在、本取り組みは単なる机上の青写真にとどまらず、実際の検証環境において全工程のエンドツーエンド動作確認を完全に完了しております。

・API 連携の実証完了：Box Developer Platform にて Custom App を発行し、OAuth 認証、メタデータ取得、および大容量バイナリダウンロードの各エンドポイントを正常に開通させました。
・マルチフォーマットの実機抽出・格納：『情報セキュリティ基本規程.pdf』や『機密設計書.docx』など実業務を模した PDF、Word、TXT、CSV の各ファイルを抽出し、テキスト抽出・ステージ格納・SQL ダイレクトクエリまでの一連のパイプラインを実証いたしました。
・技術的制約とベストプラクティスの可視化：検証を通じて判明したトライアルアカウントにおけるネットワーク制約や、JWT 認証トークンと Snowflake Secret の型マッピング仕様を整理し、再利用可能な構築スクリプトとトラブルシューティング手順書としてドキュメント化を完了しております。

今後の推進ロードマップ：
フェーズ 1：社内重要規定群を対象に Openflow を導入し、統合ナレッジ基盤を先行確立します。
フェーズ 2：蓄積されたナレッジを Streamlit 社内ダッシュボードおよび Cortex AI チャットボットへ接続し、現場部門へ即座に実効性のある AI 検索機能を価値提供いたします。`,
    speechKo: `현재 본 프로젝트는 단순한 개념 증명(PoC)이나 문서상의 설계를 넘어, 실제 테스트 환경에서 전체 파이프라인의 실기 구동 검증을 100% 완료했습니다.

- API 연동 파이프라인 개통: Box Developer Console에서 Custom App을 생성하고, OAuth/JWT 인증 기반의 파일 메타데이터 조회 및 대용량 바이너리 다운로드 엔드포인트를 성공적으로 개통했습니다.
- 멀티 포맷 실데이터 파싱 및 적재: 실제 업무 산출물인 『정보보안 기본규정.pdf』, 『상세설계서.docx』를 포함한 PDF, Word, TXT, CSV 샘플을 추출하여, 텍스트 파싱, 내부 스테이지 적재 및 SQL 직접 쿼리까지 이어지는 전체 워크플로우를 실증했습니다.
- 기술적 한계 및 노하우 자산화: 검증 과정에서 확인된 트라이얼 계정의 네트워크 방화벽 차이, Box 기업용 JWT 인증과 Snowflake Secret 간의 타입 매핑 제약 등을 철저히 분석하여, 즉시 배포 가능한 템플릿 코드와 트러블슈팅 가이드를 확보했습니다.

향후 단계별 실행 계획:
1단계: 우선 핵심 사규 및 내규 문서를 대상으로 Openflow 자동 수집을 가동하여 전사 통합 지식 저장소를 구축합니다.
2단계: 구축된 지식 베이스를 사내 Streamlit 애플리케이션 및 Cortex AI 대화형 검색 봇에 연동하여, 현업 부서가 즉시 체감할 수 있는 AI 인텔리전스 성과를 신속하게 제공하겠습니다.`,
    speechEn: `We have progressed far beyond theoretical diagrams; our team has executed and validated this entire workflow in a production-grade staging environment:

- End-to-End API Integration: We configured a Box Custom App, establishing authenticated channels for metadata queries and binary chunk downloads.
- Multi-Format Real-World Parsing: We successfully ingested representative enterprise assets—including InfoSec_Policy.pdf and Confidential_Spec.docx across PDF, DOCX, TXT, and CSV formats—proving out text extraction, stage persistence, and direct SQL querying.
- Pitfall Mitigation & Blueprints: We identified low-level nuances, such as account-tier egress variances and OAuth JWT secret mapping, synthesizing our learnings into turn-key deployment scripts and runbooks.

Recommended Next Steps:
Phase 1: Roll out Openflow automated ingestion across our core policy libraries to establish an authoritative enterprise knowledge base.
Phase 2: Connect this foundation directly to internal Streamlit portals and Snowflake Cortex AI search, delivering immediate, high-impact intelligent document search to our business units.`,
    keyTerms: [
      {
        term: 'Custom App & OAuth',
        zh: '企业级应用服务鉴权',
        ja: 'エンタープライズ認証連携',
        ko: '엔터프라이즈 인증 연동',
        en: 'Custom App & OAuth Authentication',
        contextNoteZh: '在 Box 开发者后台注册应用，通过企业级令牌授权免密访问。',
      },
      {
        term: 'Binary Parsing Pipeline',
        zh: '多格式二进制解析管道',
        ja: 'バイナリ直接パースパイプライン',
        ko: '바이너리 멀티 포맷 파싱 파이프라인',
        en: 'Binary Stream Parsing Pipeline',
        contextNoteZh: '直接在 Python 内存中提取 PDF/Word 文本，直接持久化写入 Snowflake Stage。',
      },
      {
        term: 'Phased Production Delivery',
        zh: '分期迭代投产策略',
        ja: 'フェーズ分け段階的導入',
        ko: '단계별 릴리스 로드맵',
        en: 'Phased Production Delivery',
        contextNoteZh: '一期沉淀非结构化知识底座，二期直连 AI 问答产品，小步快跑展示成效。',
      },
    ],
  },
]

