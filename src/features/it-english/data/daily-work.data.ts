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

