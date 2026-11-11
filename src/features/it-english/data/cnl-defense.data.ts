export interface CnlSlotOption {
  label: string // 按钮上展示的中文或简写
  en: string // 英文槽位内容
  phonics: string // 槽位英文自然拼读
  ja: string // 日语对应词
  romaji: string // 罗马音
  zh: string // 中文对应词/含义
}

export interface CnlFormula {
  id: string
  verbCategory: 'GET' | 'HAVE' | 'MAKE' | 'TAKE' | 'GO' | 'COME' | 'DO' | 'PUT' | 'SHELL'
  title: string
  mentalModel: string // 底层物理意象 / 设计逻辑
  templateEn: string // 如 "Can I get {X}?" 或 "I have an issue with {X}."
  phonicsTemplate: string // 如 "[kan eye GET {X} ?]"
  templateJa: string // 如 "{X} をいただけますでしょうか？"
  romajiTemplate: string // 如 "{X} o itadakemasu deshō ka?"
  templateZh: string // 如 "请问能给我一份 {X} 吗？"
  slotPlaceholder: string // 如 "{X}"
  slotName: string // 如 "事物 / 模块 / 目标"
  defaultSlotIndex: number
  slots: CnlSlotOption[]
  scenarioType: 'work' | 'incident' | 'life'
  tip: string
}

export interface ShellItem {
  id: string
  category: 'sensory' | 'polite' | 'defense'
  categoryLabel: string
  intent: string
  templateEn: string
  phonics: string
  templateJa: string
  furigana: string
  romaji: string
  templateZh: string // 如 "我想 {X}。"
  slotName?: string
  slotPlaceholder?: string
  slots?: CnlSlotOption[]
  tip: string
}

// 15% 外围安全壳速查
export const CNL_SHELL_ITEMS: ShellItem[] = [
  // 1. 心理与感官 (表达主观意志)
  {
    id: 'shell-want',
    category: 'sensory',
    categoryLabel: '心理与主观 · 表达诉求',
    intent: '想要明确表达自己的即时诉求',
    templateEn: 'I want {X}.',
    phonics: '[eye WAHNT {X}]',
    templateJa: '{X} を希望いたします。',
    furigana: '{X} を きぼういたします。',
    romaji: '{X} o kibō itashimasu.',
    templateZh: '我想 {X}。',
    slotPlaceholder: '{X}',
    slotName: '诉求目标',
    slots: [
      { label: '离开/休息', en: 'to take a break now', phonics: 'too TAYK uh BRAYK NOW', ja: '少し休憩を取ること', romaji: 'sukoshi kyūkei o toru koto', zh: '现在稍作休息' },
      { label: '看日志', en: 'to check the error logs first', phonics: 'too CHEK thuh ER-er LAWGZ FURST', ja: 'まずエラーログを確認すること', romaji: 'mazu erā rogu o kakunin suru koto', zh: '先查看一下错误日志' },
      { label: '重新部署', en: 'to redeploy this service', phonics: 'too ree-dih-PLOY this SUR-vis', ja: 'このサービスを再デプロイすること', romaji: 'kono sābisu o saidepuroi suru koto', zh: '重新部署这个服务' },
    ],
    tip: '正式场合可用 I would like to 代替 I want，但在紧急排障或日常防身时，I want 最短、最直接！',
  },
  {
    id: 'shell-think',
    category: 'sensory',
    categoryLabel: '心理与主观 · 提出判断',
    intent: '判断这里有问题或给出技术直觉',
    templateEn: 'I think {X}.',
    phonics: '[eye THINK {X}]',
    templateJa: '{X} と考えております。',
    furigana: '{X} と かんがえております。',
    romaji: '{X} to kangaete orimasu.',
    templateZh: '我觉得 {X}。',
    slotPlaceholder: '{X}',
    slotName: '判断结论',
    slots: [
      { label: '这里逻辑有错', en: 'there is a bug here', phonics: 'ther iz uh BUG HEER', ja: 'ここにバグがある', romaji: 'koko ni bagu ga aru', zh: '这里存在代码逻辑缺陷' },
      { label: '是配置问题', en: 'it is a configuration issue', phonics: 'it iz uh kun-fig-yuh-RAY-shun ISH-oo', ja: '設定上の問題である', romaji: 'setteijō no mondai de aru', zh: '这是环境配置上的问题' },
      { label: '需要回滚', en: 'we should roll back immediately', phonics: 'wee shud ROHL BAK ih-MEE-dee-ut-lee', ja: '即座にロールバックすべきである', romaji: 'sokuza ni rōrubakku subeki de aru', zh: '我们应当立即执行回滚' },
    ],
    tip: '给出不同意见时用 I think 开头，既表明专业思考，又避免过于武断。',
  },
  {
    id: 'shell-see',
    category: 'sensory',
    categoryLabel: '感官确认 · 屏幕所见',
    intent: '指出屏幕上正在发生的异常',
    templateEn: 'I see {X}.',
    phonics: '[eye SEE {X}]',
    templateJa: '画面上に {X} が確認できます。',
    furigana: 'がめんじょうに {X} が かくにんできます。',
    romaji: 'Gamen-jō ni {X} ga kakunin dekimasu.',
    templateZh: '我在屏幕上看到了 {X}。',
    slotPlaceholder: '{X}',
    slotName: '所见异常',
    slots: [
      { label: '500 报错', en: 'a 500 internal server error on screen', phonics: 'uh FYVE-HUN-dred in-TUR-nul SUR-ver ER-er on SKREEN', ja: '500内部サーバーエラー', romaji: '500 naibu sābā erā', zh: '500 内部服务器报错' },
      { label: '内存泄漏告警', en: 'a memory leak alert in Datadog', phonics: 'uh MEM-ree LEEK uh-LURT in DAY-tuh-dawg', ja: 'メモリリークの警告', romaji: 'memori rīku no keikoku', zh: 'Datadog 里的内存泄漏告警' },
      { label: '连接超时', en: 'a connection timeout error', phonics: 'uh kuh-NEK-shun TYME-owt ER-er', ja: '接続タイムアウトエラー', romaji: 'setsuzoku taimuauto erā', zh: '接口连接超时错误' },
    ],
    tip: '远程屏幕共享（Zoom/Meet）排障时，I see... 是最自然的第一句话。',
  },

  // 2. 社交礼貌缓冲 (消除冒犯感)
  {
    id: 'shell-excuse-me',
    category: 'polite',
    categoryLabel: '礼貌缓冲 · 起手打扰',
    intent: '准备向同事、客户或陌生人提问时的万能起手式',
    templateEn: 'Excuse me, {X}?',
    phonics: '[ek-SKYOOZ mee, {X} ?]',
    templateJa: 'すみません、{X} でしょうか？',
    furigana: 'すみません、{X} でしょうか？',
    romaji: 'Sumimasen, {X} deshō ka?',
    templateZh: '不好意思打扰一下，请问 {X} 吗？',
    slotPlaceholder: '{X}',
    slotName: '核心疑问',
    slots: [
      { label: '现在方便吗', en: 'do you have a quick minute', phonics: 'doo yoo HAV uh KWIK MIN-it', ja: '今少々お時間よろしい', romaji: 'ima shōshō ojikan yoroshii', zh: '您现在方便聊一两分钟' },
      { label: '这个API谁维护', en: 'who is maintaining this API', phonics: 'hoo iz mayn-TAYN-ing this AY-PEE-EYE', ja: 'こちらのAPIの担当者はどなた', romaji: 'kochira no API no tantōsha wa donata', zh: '这个 API 目前是谁负责维护' },
      { label: '洗手间在哪', en: 'where is the restroom', phonics: 'wair iz thuh REST-room', ja: 'お手洗いはどちら', romaji: 'otearai wa dochira', zh: '洗手间在哪个方向' },
    ],
    tip: '无论在东京办公室还是欧美外企，开口第一秒先给 Excuse me / すみません，消除 90% 冒犯感。',
  },
  {
    id: 'shell-sorry-about',
    category: 'polite',
    categoryLabel: '礼貌缓冲 · 表达歉意',
    intent: '出现小失误或延迟时快速止损客套',
    templateEn: 'Sorry about {X}.',
    phonics: '[SAH-ree uh-BOWT {X}]',
    templateJa: '{X} の件、大変失礼いたしました。',
    furigana: '{X} のけん、たいへん しつれいいたしました。',
    romaji: '{X} no ken, taihen shitsurei itashimashita.',
    templateZh: '关于 {X}，非常抱歉。',
    slotPlaceholder: '{X}',
    slotName: '抱歉原因',
    slots: [
      { label: '延期交付', en: 'the delay in delivery', phonics: 'thuh dih-LAY in dih-LIV-er-ee', ja: '納期の遅延', romaji: 'nōki no chien', zh: '这次交付进度有所延误' },
      { label: '漏了这条评论', en: 'missing your comment on the PR', phonics: 'MISS-ing yoor KOM-ent on thuh PEE-AR', ja: 'PRコメントの見落とし', romaji: 'PR komento no miotoshi', zh: '之前漏看了您在 PR 上的留言' },
      { label: '打断了会议', en: 'interrupting the meeting', phonics: 'in-tuh-RUPT-ing thuh MEET-ing', ja: 'ミーティング中のお邪魔', romaji: 'mītingu-chū no ojama', zh: '刚才中途打扰了大家的讨论' },
    ],
    tip: '快速道歉并不意味着担全责，而是表达职场合作态度。日企用「失礼いたしました」非常体面。',
  },
  {
    id: 'shell-could-you-please',
    category: 'polite',
    categoryLabel: '礼貌缓冲 · 得体索取',
    intent: '请别人帮自己执行某个动作',
    templateEn: 'Could you please {X}?',
    phonics: '[kud yoo PLEEZ {X} ?]',
    templateJa: '恐れ入りますが、{X} していただけますでしょうか？',
    furigana: 'おそれいりますが、{X} していただけますでしょうか？',
    romaji: 'Osoreirimasu ga, {X} shite itadakemasu deshō ka?',
    templateZh: '能否请您帮我 {X} 呢？',
    slotPlaceholder: '{X}',
    slotName: '请求动作',
    slots: [
      { label: '看一下这个报错', en: 'check this error', phonics: 'CHEK this ER-er', ja: 'こちらのエラーをご確認', romaji: 'kochira no erā o gokakunin', zh: '查看确认一下这个报错' },
      { label: '合并这个PR', en: 'merge this pull request', phonics: 'MURJ this POOL rih-KWEST', ja: 'こちらのPRをマージ', romaji: 'kochira no PR o māji', zh: '合并这个已通过审查的 PR' },
      { label: '重发测试链接', en: 'resend the staging link', phonics: 'ree-SEND thuh STAY-jing LINK', ja: '検証環境のリンクを再送', romaji: 'kenshō kankyō no rinku o saisō', zh: '重新发送一下测试环境的访问链接' },
    ],
    tip: '外企求人办事必挂 Could you please，日企对应最强敬语垫词「恐れ入りますが……」。',
  },

  // 3. 听力防御反击 (把对方强行拉回极简频道)
  {
    id: 'shell-slower',
    category: 'defense',
    categoryLabel: '防御反击 · 请求降速',
    intent: '老外语速太快听不懂时，果断控场',
    templateEn: 'Could you speak a bit slower, please?',
    phonics: '[kud yoo SPEEK uh BIT SLOH-er, PLEEZ?]',
    templateJa: '恐れ入りますが、もう少しゆっくりお話しいただけますでしょうか？',
    furigana: 'おそれいりますが、もうすこし ゆっくり おはなしいただけますでしょうか？',
    romaji: 'Osoreirimasu ga, mō sukoshi yukkuri ohanashi itadakemasu deshō ka?',
    templateZh: '不好意思，请问您可以讲得慢一点点吗？',
    tip: '听不懂千万不要点头傻笑！主动要求对方降速是专业工程师成熟自信的表现。',
  },
  {
    id: 'shell-write-down',
    category: 'defense',
    categoryLabel: '防御反击 · 文字落地',
    intent: '发音不清晰或专业术语复杂时，要求打字',
    templateEn: 'Sorry, could you write it down in the chat?',
    phonics: '[SAH-ree, kud yoo RYTE it DOWN in thuh CHAT?]',
    templateJa: '恐縮ですが、チャットにテキストで残していただけますでしょうか？',
    furigana: 'きょうしゅくですが、チャットに テキストで のこしていただけますでしょうか？',
    romaji: 'Kyōshuku desu ga, chatto ni tekisuto de nokoshite itadakemasu deshō ka?',
    templateZh: '不好意思，可以麻烦您在聊天框里打出来吗？',
    tip: '将语音强行拉回 Slack / Teams 文字聊天，利用翻译软件与查阅时间从容应对。',
  },
  {
    id: 'shell-you-mean',
    category: 'defense',
    categoryLabel: '防御反击 · 意图核验',
    intent: '核实自己的极简理解，确认没有偏差',
    templateEn: 'You mean {X}, right?',
    phonics: '[yoo MEEN {X}, RYTE?]',
    templateJa: '{X} というご認識でよろしいでしょうか？',
    furigana: '{X} という ごにんしきで よろしいでしょうか？',
    romaji: '{X} to iu goninshiki de yoroshii deshō ka?',
    templateZh: '您的意思是说 {X}，对吗？',
    slotPlaceholder: '{X}',
    slotName: '你的极简理解',
    slots: [
      { label: '先回滚到稳定版', en: 'we should roll back to the stable version first', phonics: 'wee shud ROHL BAK too thuh STAY-bul VUR-zhun FURST', ja: 'まず安定版へ切り戻す', romaji: 'mazu anteiban e kirimodosu', zh: '我们应该先回滚到上一版稳定版' },
      { label: '等下周再发布', en: 'we wait until next sprint to release', phonics: 'wee WAYT un-TIL NEKST SPRINT too rih-LEESS', ja: 'リリースを次スプリントまで見送る', romaji: 'rirīsu o tsugi supurinto made miokuru', zh: '本次发布推迟到下一个迭代' },
      { label: '由前端负责校验', en: 'the frontend team will handle validation', phonics: 'thuh FRONT-end TEEM wil HAN-dul val-ih-DAY-shun', ja: 'バリデーションはフロント側が担当する', romaji: 'baridēshon wa furonto-gawa ga tantō suru', zh: '这部分参数校验由前端团队负责' },
    ],
    tip: '日本现场称之为「認識合わせ」。主动把复杂讨论收敛为一句话反问，彻底避免背锅！',
  },
]

// 85% 核心动词引擎
export const CNL_VERB_FORMULAS: CnlFormula[] = [
  // 1. GET (从无到有：获取、搞懂、完成状态)
  {
    id: 'get-can-i-get',
    verbCategory: 'GET',
    title: 'GET · 从无到有：请求获取某物/资料',
    mentalModel: '从“没有”到“拥有”的流向，万能索取',
    templateEn: 'Can I get {X}?',
    phonicsTemplate: '[kan eye GET {X} ?]',
    templateJa: '{X} をいただけますでしょうか？',
    romajiTemplate: '{X} o itadakemasu deshō ka?',
    templateZh: '请问能给我一份 {X} 吗？',
    slotPlaceholder: '{X}',
    slotName: '需要获取的目标',
    defaultSlotIndex: 0,
    slots: [
      { label: 'API 文档规格书', en: 'the API specification document', phonics: 'thuh AY-PEE-EYE spes-uh-fih-KAY-shun DAHK-yuh-munt', ja: 'APIの仕様書', romaji: 'API no shiyōsho', zh: 'API 接口文档规格书' },
      { label: '数据库只读权限', en: 'read-only access to the production DB', phonics: 'REED-OHN-lee AK-sess too thuh pruh-DUK-shun DEE-BEE', ja: '本番DBの閲覧権限', romaji: 'honban DB no etsuran kengen', zh: '生产数据库的只读权限' },
      { label: '账单 / 票据', en: 'the receipt and the bill', phonics: 'thuh rih-SEET and thuh BILL', ja: '領収書とお会計', romaji: 'ryōshūsho to okaikei', zh: '账单与发票明细' },
      { label: '最新的 Figma 设计稿', en: 'the latest Figma mockups', phonics: 'thuh LAY-tist FIG-muh MAHK-ups', ja: '最新のFigmaデザイン案', romaji: 'saishin no Figma dezain-an', zh: '最新的 Figma 设计稿' },
    ],
    scenarioType: 'work',
    tip: '无论是餐馆买单、还是向客户索要 API 规格书，一律用 Can I get... 极简高效！',
  },
  {
    id: 'get-done-by',
    verbCategory: 'GET',
    title: 'GET · 状态转移：承诺交付完成',
    mentalModel: '驱动事物达到某种完结状态（get + X + done）',
    templateEn: "I will get {X} done by {Y}.",
    phonicsTemplate: "[eye wil GET {X} DUN by {Y}]",
    templateJa: "{Y} までに {X} を完了させます。",
    romajiTemplate: "{Y} made ni {X} o kanryō sasemasu.",
    templateZh: "我会在 {Y} 之前把 {X} 搞定交付。",
    slotPlaceholder: '{X}',
    slotName: '交付任务',
    defaultSlotIndex: 0,
    slots: [
      { label: '用户认证模块重构', en: 'the auth refactor', phonics: 'thuh AWTH REE-fak-ter', ja: '認証モジュールのリファクタリング', romaji: 'ninshō mojūru no rifakutaringu', zh: '用户认证模块重构' },
      { label: '单元测试编写', en: 'all unit tests', phonics: 'AWL YOO-nit TESTS', ja: 'すべての単体テスト', romaji: 'subete no tantai tesuto', zh: '全部核心单元测试' },
      { label: '数据库迁移脚本', en: 'the DB migration script', phonics: 'thuh DEE-BEE my-GRAY-shun SKRIPT', ja: 'DB移行スクリプト', romaji: 'DB ikō sukuriputo', zh: '数据库平滑迁移脚本' },
    ],
    scenarioType: 'work',
    tip: '站会上的万能金句！用 get it done 代替冗长的语法，领导听了最踏实。',
  },

  // 2. HAVE (已经持有：拥有、存在故障、有疑问)
  {
    id: 'have-issue',
    verbCategory: 'HAVE',
    title: 'HAVE · 静态持有：通报系统故障或阻塞',
    mentalModel: '当前系统中“已经存在”某种异常状态或问题',
    templateEn: 'We have an issue with {X}.',
    phonicsTemplate: '[wee HAV an ISH-oo with {X}]',
    templateJa: '{X} に課題（不具合）が発生しております。',
    romajiTemplate: '{X} ni kadai (fuguai) ga hassei shite orimasu.',
    templateZh: '我们的 {X} 遇到故障问题了。',
    slotPlaceholder: '{X}',
    slotName: '故障对象',
    defaultSlotIndex: 0,
    slots: [
      { label: '生产环境支付接口', en: 'the production payment gateway', phonics: 'thuh pruh-DUK-shun PAY-munt GAYT-way', ja: '本番環境の決済ゲートウェイ', romaji: 'honban kankyō no kessai gētowei', zh: '生产环境支付网关' },
      { label: 'Redis 缓存同步', en: 'the Redis cache sync', phonics: 'thuh REE-dis KASH SINK', ja: 'Redisキャッシュの同期', romaji: 'Redis kyasshu no dōki', zh: 'Redis 缓存数据同步' },
      { label: '办公网 Wi-Fi 信号', en: 'the office Wi-Fi connection', phonics: 'thuh AWF-iss WY-FY kuh-NEK-shun', ja: 'オフィスのWi-Fi接続', romaji: 'ofisu no Wi-Fi setsuzoku', zh: '办公室 Wi-Fi 网络连接' },
    ],
    scenarioType: 'incident',
    tip: '只要遇到故障或报错，不用拼凑复杂生词，句式固定为 We have an issue with... 脱口而出。',
  },
  {
    id: 'have-question',
    verbCategory: 'HAVE',
    title: 'HAVE · 疑问持有：优雅发起技术提问',
    mentalModel: '自己持有疑问，请求对方解答',
    templateEn: 'I have a quick question about {X}.',
    phonicsTemplate: '[eye HAV uh KWIK KWES-chun uh-BOWT {X}]',
    templateJa: '{X} について一点確認させていただけますか？',
    romajiTemplate: '{X} ni tsuite itten kakunin sasete itadakemasu ka?',
    templateZh: '关于 {X}，我想快速确认一个小问题。',
    slotPlaceholder: '{X}',
    slotName: '提问主题',
    defaultSlotIndex: 0,
    slots: [
      { label: '这版需求文档的边界', en: 'the edge cases in this spec', phonics: 'thuh EJ KAY-siz in this SPEK', ja: '本仕様書のエッジケース', romaji: 'hon-shiyōsho no ejjikēsu', zh: '这份规格书中的异常边界情况' },
      { label: '数据库表结构设计', en: 'the new database schema', phonics: 'thuh NOO DAY-tuh-bays SKEE-muh', ja: '新規DBスキーマ設計', romaji: 'shinki DB sukīma sekkei', zh: '新数据表结构的字段设计' },
      { label: '排期与上线窗口', en: 'the deployment release window', phonics: 'thuh dih-PLOY-munt rih-LEESS WIN-doh', ja: 'リリース作業時間枠', romaji: 'rirīsu sagyō jikanwaku', zh: '本次发布上线的维护时间窗口' },
    ],
    scenarioType: 'work',
    tip: '加一个 quick（I have a quick question）能大幅减轻对方被占用时间的心理压力。',
  },

  // 3. MAKE (从零产出：确保结果、制定决策)
  {
    id: 'make-sure',
    verbCategory: 'MAKE',
    title: 'MAKE · 结果把控：确保关键事实或质量',
    mentalModel: '从不确定到“100% 确保发生”，质量防线',
    templateEn: 'Please make sure {X}.',
    phonicsTemplate: '[PLEEZ MAYK SHOOR {X}]',
    templateJa: '念のため、{X} を徹底していただくようお願いいたします。',
    romajiTemplate: 'Nen no tame, {X} o tettei shite itadaku yō onegai itashimasu.',
    templateZh: '请务必确保 {X}。',
    slotPlaceholder: '{X}',
    slotName: '必须确保的事实',
    defaultSlotIndex: 0,
    slots: [
      { label: '向下兼容现有老版本', en: 'it is backward-compatible', phonics: 'it iz BAK-werd kum-PAT-uh-bul', ja: '後方互換性が保たれていること', romaji: 'kōhō gokansei ga tamotarete iru koto', zh: '向下兼容现存所有老客户端版本' },
      { label: '环境变量已写入配置', en: 'the environment variables are set', phonics: 'thuh en-vy-run-munt VAIR-ee-uh-bulz ahr SET', ja: '環境変数が正しく設定されていること', romaji: 'kankyō hensū ga tadashiku setteisarete iru koto', zh: '所有生产环境变量均已正确配置' },
      { label: '所有测试全部通过', en: 'all CI pipeline checks pass', phonics: 'AWL SEE-EYE PYP-lyne CHEKS PASS', ja: 'CIテストがすべてグリーン（通過）であること', romaji: 'CI tesuto ga subete gurīn de aru koto', zh: 'CI 流水线自动化检查全部通过' },
    ],
    scenarioType: 'work',
    tip: 'Code Review 或发布前叮嘱团队的最强动词，日企对应「念のため〜徹底をお願いします」。',
  },

  // 4. TAKE (抓取消耗：抓取审查、花费工时、私下聊)
  {
    id: 'take-look',
    verbCategory: 'TAKE',
    title: 'TAKE · 视线抓取：请求同事审查代码或报错',
    mentalModel: '请求抓取对方的一点注意力（take a look at）',
    templateEn: 'Could you take a look at {X}?',
    phonicsTemplate: '[kud yoo TAYK uh LOOK at {X} ?]',
    templateJa: 'お手すきの際に、{X} をご確認いただけますでしょうか？',
    romajiTemplate: 'Otesuki no sai ni, {X} o gokakunin itadakemasu deshō ka?',
    templateZh: '方便时能否顺便帮我看一下 {X} 呢？',
    slotPlaceholder: '{X}',
    slotName: '审查对象',
    defaultSlotIndex: 0,
    slots: [
      { label: '我的 Pull Request', en: 'my latest PR', phonics: 'my LAY-tist PEE-AR', ja: '私の最新のプルリクエスト', romaji: 'watashi no saishin no puru rikuesuto', zh: '我刚提交的最新 PR' },
      { label: '这段崩溃堆栈日志', en: 'this crash stack trace', phonics: 'this KRASH STAK TRAYSS', ja: 'クラッシュのスタックトレース', romaji: 'kurasshu no sutakku torēsu', zh: '这段系统崩溃堆栈信息' },
      { label: '这个接口返回的错误码', en: 'this unexpected response payload', phonics: 'this un-ek-SPEK-tid rih-SPONSS PAY-lohd', ja: '想定外のレスポンス内容', romaji: 'sōteigai no responsu naiyō', zh: '这个接口返回的非预期响应数据' },
    ],
    scenarioType: 'work',
    tip: '工位日常最高频句子，没有之一！配上 Phonics 拼读，顺口念出。',
  },
  {
    id: 'take-time',
    verbCategory: 'TAKE',
    title: 'TAKE · 工时消耗：评估耗时与工期',
    mentalModel: '该任务需要“吃掉/消耗”多少时间成本',
    templateEn: 'It will take about {X} to finish.',
    phonicsTemplate: '[it wil TAYK uh-BOWT {X} too FIN-ish]',
    templateJa: '完了までに約 {X} ほど工数を要する見込みです。',
    romajiTemplate: 'Kanryō made ni yaku {X} hodo kōsū o yōsuru mikomi desu.',
    templateZh: '完成这块工作大约需要消耗 {X}。',
    slotPlaceholder: '{X}',
    slotName: '预计耗时',
    defaultSlotIndex: 0,
    slots: [
      { label: '2 到 3 个小时', en: 'two to three hours', phonics: 'TOO too THREE OW-erz', ja: '2〜3時間', romaji: 'ni kara san jikan', zh: '2 到 3 个小时' },
      { label: '大约半个工作日', en: 'half a day', phonics: 'HAF uh DAY', ja: '半日程度', romaji: 'hannichi teido', zh: '大约半天工时' },
      { label: '一到两个迭代周期', en: 'one to two sprints', phonics: 'WUN too TWO SPRINTS', ja: '1〜2スプリント', romaji: 'ichi kara ni supurinto', zh: '一到两个迭代 Sprint' },
    ],
    scenarioType: 'work',
    tip: '被 PM 问到工期时，It will take about... 加上时间，回答精准利落。',
  },

  // 5. GO (离开位移：运转状态、发生偏差)
  {
    id: 'go-wrong',
    verbCategory: 'GO',
    title: 'GO · 状态偏离：系统突发未知异常',
    mentalModel: '偏离正常轨道，进入错误状态（went wrong）',
    templateEn: 'Something went wrong with {X}.',
    phonicsTemplate: '[SUM-thing WENT RAWNG with {X}]',
    templateJa: '{X} に何らかの異常が発生いたしました。',
    romajiTemplate: '{X} ni nanraka no ijō ga hassei itashimashita.',
    templateZh: '我们的 {X} 出现了一些异常状况。',
    slotPlaceholder: '{X}',
    slotName: '异常模块',
    defaultSlotIndex: 0,
    slots: [
      { label: '用户登录鉴权', en: 'the user login authentication', phonics: 'thuh YOO-zer LAWG-in aw-then-tih-KAY-shun', ja: 'ログイン認証処理', romaji: 'roguin ninshō shori', zh: '用户登录鉴权服务' },
      { label: '生产环境部署流水线', en: 'the production deployment pipeline', phonics: 'thuh pruh-DUK-shun dih-PLOY-munt PYP-lyne', ja: '本番デプロイパイプライン', romaji: 'honban depuroi paipurain', zh: '生产环境发布流水线' },
      { label: '第三方回调 Webhook', en: 'the third-party webhook listener', phonics: 'thuh THURD-PAR-tee WEB-hook LISS-ner', ja: '外部Webhook受信処理', romaji: 'gaibu Webhook jushin shori', zh: '第三方 Webhook 回调监听' },
    ],
    scenarioType: 'incident',
    tip: '当根因还不明确但系统已经报错时，用 Something went wrong with... 第一时间通报。',
  },

  // 6. COME (靠近伴随：自带随附、呼叫支援)
  {
    id: 'come-check',
    verbCategory: 'COME',
    title: 'COME · 靠近协助：请求现场排查或支援',
    mentalModel: '呼叫物理人员靠近帮忙诊断',
    templateEn: 'Could someone come and check {X}?',
    phonicsTemplate: '[kud SUM-wun KUM and CHEK {X} ?]',
    templateJa: 'どなたか {X} の状態を一緒にご確認いただけますか？',
    romajiTemplate: 'Donataka {X} no jōtai o issho ni gokakunin itadakemasu ka?',
    templateZh: '能请一位同事过来帮忙看看 {X} 吗？',
    slotPlaceholder: '{X}',
    slotName: '待检设备或分支',
    defaultSlotIndex: 0,
    slots: [
      { label: '这台现场测试服务器', en: 'this on-premise test server', phonics: 'this ON-PREM-iss TEST SUR-ver', ja: 'こちらの検証用サーバー', romaji: 'kochira no kenshō-yō sābā', zh: '这台现场验证服务器' },
      { label: '本地环境构建报错', en: 'this local build failure', phonics: 'this LOH-kul BILD FAYL-yer', ja: 'ローカルのビルドエラー', romaji: 'rōkaru no birudo erā', zh: '本地代码构建失败的报错' },
      { label: '网络连接丢包情况', en: 'the network packet drop issue', phonics: 'thuh NET-wurk PAK-it DRAWP ISH-oo', ja: 'パケットロスの状況', romaji: 'paketto rosu no jōkyō', zh: '网络偶发性丢包的情况' },
    ],
    scenarioType: 'incident',
    tip: '在工位上卡壳时，向边上的技术大拿或现场 Leader 求救的神句。',
  },

  // 7. DO (通用行为：认领任务、搞定动作)
  {
    id: 'do-first',
    verbCategory: 'DO',
    title: 'DO · 行为认领：主动认领首要处理动作',
    mentalModel: '万能行动执行动词（I will do X first）',
    templateEn: "I'll do {X} first.",
    phonicsTemplate: "[eyel DO {X} FURST]",
    templateJa: "まずは私の方で {X} を対応いたします。",
    romajiTemplate: "Mazu wa watashi no hō de {X} o taiō itashimasu.",
    templateZh: "首先我会先去处理 {X}。",
    slotPlaceholder: '{X}',
    slotName: '首要认领项',
    defaultSlotIndex: 0,
    slots: [
      { label: '生产环境错误日志的一次排查', en: 'the initial log investigation', phonics: 'thuh ih-NISH-ul LAWG in-ves-tih-GAY-shun', ja: 'ログの一次切り分け', romaji: 'rogu no ichiji kiriwake', zh: '线上错误日志的初步排错定位' },
      { label: '本地代码复现', en: 'the local reproduction of this bug', phonics: 'thuh LOH-kul ree-pruh-DUK-shun uv this BUG', ja: 'ローカルでのバグ再現', romaji: 'rōkaru de no bagu saigen', zh: '该 Bug 在本地环境的复现' },
      { label: '测试环境基建配置', en: 'the staging environment setup', phonics: 'thuh STAY-jing en-VY-run-munt SET-up', ja: '検証環境のセットアップ', romaji: 'kenshō kankyō no settouappu', zh: '测试联调环境的初始配置' },
    ],
    scenarioType: 'work',
    tip: '突发故障或晨会任务分配时，一句 I\'ll do X first 展现极强的主动性（Ownership）。',
  },

  // 8. PUT (空间放置：存入、写入、配置生效)
  {
    id: 'put-into',
    verbCategory: 'PUT',
    title: 'PUT · 实体安置：将配置或数据放入目标位置',
    mentalModel: '把 A 放入 B 中（put X into Y）',
    templateEn: 'Did you put {X} into {Y}?',
    phonicsTemplate: '[did yoo POOT {X} IN-too {Y} ?]',
    templateJa: '{X} を {Y} に反映（格納）されましたでしょうか？',
    romajiTemplate: '{X} o {Y} ni han\'ei (kakunō) saremashita deshō ka?',
    templateZh: '请问你是否已经把 {X} 放入 {Y} 中了？',
    slotPlaceholder: '{X}',
    slotName: '被放置项',
    defaultSlotIndex: 0,
    slots: [
      { label: '密钥放到 .env 变量中', en: 'the secret API keys into the .env file', phonics: 'thuh SEE-krit AY-PEE-EYE KEEZ IN-too thuh DOT-EN-VEE FYLE', ja: 'APIキーを .env ファイルに', romaji: 'API kī o .env fairu ni', zh: '敏感 API 密钥放入 .env 环境变量文件' },
      { label: 'Token 放到请求头中', en: 'the Bearer token into the request header', phonics: 'thuh BAIR-er TOH-kun IN-too thuh rih-KWEST HED-er', ja: 'Bearerトークンをリクエストヘッダーに', romaji: 'Bearer tōkun o rikuesuto heddā ni', zh: 'Bearer 授权 Token 放入请求头 Header' },
      { label: '测试数据导入到数据库中', en: 'the seed data into the test database', phonics: 'thuh SEED DAY-tuh IN-too thuh TEST DAY-tuh-bays', ja: 'シードデータをテストDBに', romaji: 'shīdo dēta o tesuto DB ni', zh: '种子初始数据导入至测试数据库' },
    ],
    scenarioType: 'work',
    tip: '排查联调失败时，90% 是参数或密钥放错了地方。用 put X into Y 快速核对。',
  },
]
