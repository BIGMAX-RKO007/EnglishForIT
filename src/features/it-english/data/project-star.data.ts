export interface StarProject {
  id: string
  title: string
  titleZh: string
  techStack: string[]
  situationEn: string
  situationZh: string
  taskEn: string
  taskZh: string
  actionEn: string
  actionZh: string
  resultEn: string
  resultZh: string
  actionVerbs: string[]
  metrics: string[]
  followUpQuestions: {
    questionEn: string
    questionZh: string
    hintEn: string
    hintZh: string
  }[]
}

export const STAR_PROJECTS: StarProject[] = [
  {
    id: 'project-perf-opt',
    title: 'High-Concurrency Performance & Cache Optimization',
    titleZh: '高并发性能调优与多级缓存优化',
    techStack: ['Go', 'Redis Cluster', 'PostgreSQL', 'Prometheus', 'Grafana'],
    situationEn: "At my previous company, our core checkout service suffered from severe latency spikes during promotional events. Under peak loads of 15,000 QPS, database CPU utilization surged past 90%, causing request timeouts and degrading user experience.",
    situationZh: "在上一家公司，我们核心结算服务在大促期间经常遭遇严重的延迟尖峰。在15,000 QPS的峰值压力下，数据库CPU利用率经常飙破90%，导致大量请求超时，严重损害了用户体验。",
    taskEn: "I was tasked as the technical lead to resolve the database bottleneck, eliminate timeouts, and ensure the system could sustain at least 30,000 QPS with p99 latency under 80 milliseconds.",
    taskZh: "我作为技术负责人接到了任务：解决数据库瓶颈、消除超时现象，并确保系统在30,000 QPS的高压下，p99延迟仍能稳定在80毫秒以内。",
    actionEn: "I spearheaded a multi-tier caching strategy. First, I benchmarked our query patterns and identified that 80% of reads hit identical product inventory records. I introduced a local in-memory cache combined with a distributed Redis cluster using read-through caching. To prevent cache stampedes, I implemented distributed mutex locks with single-flight request coalescing. Finally, I optimized slow SQL queries and created composite indexes.",
    actionZh: "我主导设计了多级缓存方案。首先，我压测并分析了查询模式，发现80%的读操作集中在相同商品的库存数据上。我引入了本地内存缓存配合Redis集群的双层读穿透架构。为防止缓存击穿（Cache Stampede），我实现了基于Single-flight的请求合并与分布式互斥锁。最后，我针对慢SQL进行优化并补齐了复合索引。",
    resultEn: "As a result, we offloaded 92% of queries from the primary database. Peak throughput increased from 15k to 38k QPS, while p99 latency dropped from 420ms to 45ms. During Black Friday, the service operated with zero downtime and zero manual interventions.",
    resultZh: "最终，我们为核心主库分流了92%的查询压力。系统峰值吞吐量从1.5万提升至3.8万 QPS，p99延迟从420毫秒骤降至45毫秒。在随后的黑五大促中，服务实现了零故障、零人工介入稳定运行。",
    actionVerbs: ['spearheaded', 'benchmarked', 'identified', 'introduced', 'implemented', 'optimized', 'offloaded'],
    metrics: ['38k QPS (from 15k)', 'p99 latency dropped from 420ms to 45ms', '92% query offload', 'zero downtime'],
    followUpQuestions: [
      {
        questionEn: "How did you handle cache invalidation and data consistency between Redis and the primary database?",
        questionZh: "你是如何处理Redis与主数据库之间的缓存失效和数据一致性问题的？",
        hintEn: "Mention Cache-Aside pattern, transactional outbox or CDC (Canal/Debezium), and eventual consistency with TTL.",
        hintZh: "回答重点：提及 Cache-Aside 模式、基于 Binlog 变更监听（CDC）异步淘汰或延迟双删，并强调业务场景下最终一致性（Eventual Consistency）的取舍。"
      },
      {
        questionEn: "What was the biggest technical trade-off you had to make during this optimization?",
        questionZh: "在这次优化过程中，你做出的最大技术权衡（Trade-off）是什么？",
        hintEn: "Trade memory footprint and complexity for ultra-low latency and DB safety.",
        hintZh: "回答重点：权衡了内存开销与代码复杂度，为了保障核心主库不宕机和极低延迟，允许了短暂的非强一致性。"
      }
    ]
  },
  {
    id: 'project-microservices-migration',
    title: 'Monolith to Event-Driven Microservices Migration',
    titleZh: '单体系统向事件驱动微服务架构平滑迁移',
    techStack: ['Java', 'Spring Cloud', 'Kafka', 'Kubernetes', 'Docker'],
    situationEn: "Our team was maintaining a legacy monolith codebase with over 200,000 lines of code. Deploying a minor fix required rebuilding the entire application, and a single uncaught exception in the notification module could take down the entire payment processing pipeline.",
    situationZh: "我们团队维护着一个超过20万行代码的遗留单体系统。发布一个小修补都需要全量打包部署，而且通知模块中的一个未捕获异常就可能导致整个支付结算链路瘫痪。",
    taskEn: "My goal was to decouple the monolith into domain-driven microservices without disrupting ongoing production operations, adopting the Strangler Fig pattern.",
    taskZh: "我的目标是采用“绞杀者模式（Strangler Fig pattern）”，在不中断生产环境正常业务的前提下，基于领域驱动设计（DDD）将单体系统逐步解耦为独立的微服务。",
    actionEn: "I mapped domain boundaries and prioritized extracting the billing and notification services. I introduced Apache Kafka as an asynchronous event bus to decouple synchronous RPC calls. To ensure zero-downtime migration, I orchestrated traffic routing using an API Gateway with canary releases and dual-write verification before cutting over the database.",
    actionZh: "我梳理了业务领域边界，优先剥离了结算和通知两大服务。我引入了Apache Kafka作为异步事件总线，替代原有的同步阻塞调用。为了确保迁移过程零停机，我通过API网关实施金丝雀灰度引流，并在正式切库前采用了双写校验机制。",
    resultEn: "We successfully extracted 4 microservices within 6 months. Deployment frequency increased from bi-weekly releases to daily independent deployments. Mean time to recovery (MTTR) decreased by 60%, and team velocity improved significantly.",
    resultZh: "我们在6个月内成功拆分出4个微服务。发布频率从两周一次全量发布提升到每日独立部署。故障平均恢复时间（MTTR）缩短了60%，团队研发迭代速度大幅提升。",
    actionVerbs: ['decoupled', 'mapped', 'prioritized', 'orchestrated', 'extracted', 'decreased'],
    metrics: ['daily independent deployments (from bi-weekly)', 'MTTR reduced by 60%', 'zero downtime migration'],
    followUpQuestions: [
      {
        questionEn: "How did you ensure data consistency across multiple microservices without distributed transactions?",
        questionZh: "在没有强分布式事务的情况下，你是如何保证跨微服务间的数据一致性的？",
        hintEn: "Mention the Saga pattern, idempotent consumers, or compensation workflows.",
        hintZh: "回答重点：提及 Saga 编排模式、消费端的幂等性（Idempotency key）设计以及补偿逻辑。"
      }
    ]
  },
  {
    id: 'project-incident-postmortem',
    title: 'Production Incident Mitigation & Reliability Engineering',
    titleZh: '线上突发故障紧急止损与高可用治理',
    techStack: ['Node.js', 'K8s', 'Grafana', 'Sentry', 'Cloudflare'],
    situationEn: "Following a Friday evening release, our production cluster experienced a sudden memory leak. Pods repeatedly crashed with Out-Of-Memory (OOM) errors, dropping API availability from 99.9% to under 85%.",
    situationZh: "在周五晚间发布后，我们的生产集群突然遭遇内存泄漏，多个Pod频繁触发OOMKilled崩溃重启，API可用率从99.9%跌至85%以下。",
    taskEn: "As the on-call engineer, I had to immediately stabilize the service, restore uptime, pinpoint the root cause, and establish preventive guardrails.",
    taskZh: "作为当值On-call工程师，我必须立即稳住服务恢复可用性、准确定位根本原因并建立防御性防护机制。",
    actionEn: "I immediately triggered an emergency rollback to the previous stable release via our CI/CD pipeline, bringing service availability back to 100% within 8 minutes. Next, I reproduced the leak in staging using heap snapshots and profiler dumps, isolating an unclosed database cursor in a newly added batch export endpoint. I patched the leak with scoped context handlers and added automated load-test thresholds in our pull request checks.",
    actionZh: "我立即通过CI/CD流水线触发了紧急一键回滚，在8分钟内将服务可用性恢复至100%。随后，我在预发环境中通过抓取Heap Snapshot内存堆转储复现了泄漏，锁定是在新添加的批量导出接口中未正确关闭数据库游标。我通过上下文作用域治理修复了泄漏，并在PR检查中加入了自动化压测阈值门禁。",
    resultEn: "Service availability was restored in under 10 minutes. The subsequent post-mortem identified gaps in our load testing, which led to the creation of automated memory leak detection tests in CI.",
    resultZh: "服务在10分钟内完全恢复正常。随后的复盘会议（Post-mortem）补齐了压测盲区，并在CI流水线中固化了自动化内存泄漏检测机制。",
    actionVerbs: ['triggered', 'stabilized', 'reproduced', 'isolated', 'patched', 'prevented'],
    metrics: ['restored in 8 minutes', 'availability back to 100%', 'automated CI leak detection'],
    followUpQuestions: [
      {
        questionEn: "What did your incident communication workflow look like during those 8 minutes?",
        questionZh: "在那关键的8分钟里，你的故障协同与沟通流程是怎样的？",
        hintEn: "Acknowledge incident in Slack channel, declare severity (P0/P1), post regular status updates, avoid blame.",
        hintZh: "回答重点：在专用事故频道通报、定级（P0）、每5分钟同步当前排查进展与回滚决定、事后组织无指责复盘（Blameless Post-mortem）。"
      }
    ]
  }
]

export const ACTION_VERB_CATEGORIES = [
  {
    category: 'Architecture & System Design (架构与设计)',
    verbs: ['Architected (架构)', 'Spearheaded (主导/牵头)', 'Decoupled (解耦)', 'Designed (设计)', 'Engineered (研发)', 'Modularized (模块化)', 'Standardized (规范化)']
  },
  {
    category: 'Performance & Optimization (性能与调优)',
    verbs: ['Refactored (重构)', 'Benchmarked (基准测试/压测)', 'Optimized (优化)', 'Streamlined (精简/提速)', 'Accelerated (加速)', 'Mitigated (减轻/缓解)', 'Offloaded (卸载/分流)']
  },
  {
    category: 'Delivery & Reliability (交付与可用性)',
    verbs: ['Automated (自动化)', 'Orchestrated (编排调度)', 'Implemented (实现/落地)', 'Containerized (容器化)', 'Deployed (部署发布)', 'Troubleshot (排障)', 'Eliminated (消除)']
  }
]

