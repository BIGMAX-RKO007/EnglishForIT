export interface DualPhrase {
  id: string
  title: string
  category: 'standup' | 'review' | 'specs' | 'incident' | 'intro'
  categoryLabel: string
  intent: string // 中文业务意图与场景解读
  en: {
    text: string
    ipa: string // 国际音标
  }
  ja: {
    text: string // 日语原文（带常用汉字）
    furigana: string // 假名标注（振假名）
    romaji: string // 罗马音标注
  }
  tip: string // 职场跨文化沟通避坑指南
}

export const DUAL_PHRASES: DualPhrase[] = [
  // 1. 站会与进度汇报 (Standup & Progress)
  {
    id: 'standup-finished',
    title: '昨日完成工作汇报',
    category: 'standup',
    categoryLabel: '敏捷站会 · 昨日进展',
    intent: '在早会/站会上向主管和团队汇报：“昨天完成了用户认证模块的重构，并提交了 PR 供审查。”',
    en: {
      text: "Yesterday, I wrapped up the user authentication refactor and submitted a PR for review.",
      ipa: "/ˈjestərdeɪ, aɪ ræpt ʌp ðə ˈjuːzər ɔːˌθentɪˈkeɪʃn ˌriːˈfæktər ənd səbˈmɪtɪd ə ˌpiːˈɑːr fər rɪˈvjuː/",
    },
    ja: {
      text: "昨日はユーザー認証モジュールのリファクタリングを完了し、PRを提出いたしました。",
      furigana: "きのうは ユーザーにんしょうモジュールの リファクタリングを かんりょうし、ピーアールを ていしゅついたしました。",
      romaji: "Kinō wa yūzā ninshō mojūru no rifakutaringu o kanryō shi, pīāru o teishutsu itashimashita.",
    },
    tip: "外企站会喜欢用 wrap up（收尾/完成）比单纯 finish 更地道；日企现场使用片假名「リファクタリング」搭配谦让动词「提出いたしました」。",
  },
  {
    id: 'standup-today-plan',
    title: '今日计划与联调',
    category: 'standup',
    categoryLabel: '敏捷站会 · 今日计划',
    intent: '表达今天的主要任务：“今天我计划编写单元测试，并与前端团队联调支付回调接口。”',
    en: {
      text: "Today, I plan to write unit tests and integrate the payment callback API with the frontend team.",
      ipa: "/təˈdeɪ, aɪ plæn tuː raɪt ˈjuːnɪt tests ənd ˈɪntɪɡreɪt ðə ˈpeɪmənt ˈkɔːlbæk ˌeɪpiːˈaɪ wɪð ðə ˈfrʌntend tiːm/",
    },
    ja: {
      text: "本日は単体テストの作成と、フロントエンド側との決済コールバックAPIの結合検証を進める予定です。",
      furigana: "ほんじつは たんたいテストの さくせいと、フロントエンドがわとの けっさいコールバック エーピーアイの けつごうけんしょうを すすめるよていです。",
      romaji: "Honjitsu wa tantai tesuto no sakusei to, furontoendo-gawa to no kessai kōrubakku API no结合kenshō o susumeru yotei desu.",
    },
    tip: "中文常说“联调/接接口”，英文最地道的动词是 integrate with；日企现场通常习惯讲「結合テスト」「結合検証」或「I/F（インターフェース）すり合わせ」。",
  },
  {
    id: 'standup-blocker-waiting',
    title: '遇到阻塞点（依赖外部文档）',
    category: 'standup',
    categoryLabel: '敏捷站会 · 阻塞求助',
    intent: '说明当前遇到的卡点：“目前由于第三方接口文档还没提供，支付对接这块暂时处于阻塞状态。”',
    en: {
      text: "I'm currently blocked on the payment integration because we're still waiting for the third-party API specs.",
      ipa: "/aɪm ˈkɜːrəntli blɑːkt ɑːn ðə ˈpeɪmənt ˌɪntɪˈɡreɪʃn bɪˈkəz wɪr stɪl ˈweɪtɪŋ fər ðə ˈθɜːrdˌpɑːrti ˌeɪpiːˈaɪ speks/",
    },
    ja: {
      text: "外部APIの仕様書待ちのため、現在決済連携の作業がペンディングとなっております。",
      furigana: "がいぶ エーピーアイの しようしょまちのため、げんざい けっさいれんけいの さぎょうが ペンディングとなっております。",
      romaji: "Gaibu API no shiyōsho machi no tame, genzai kessai renkei no sagyō ga pendingu to natte orimasu.",
    },
    tip: "英语直接用 I'm blocked on... 态度明确；日企现场务必使用「仕様書待ち（等待规格书）」配合高频片假名「ペンディング（Pending 搁置中）」，显得专业委婉。",
  },
  {
    id: 'standup-delay-alert',
    title: '预警可能的进度微调',
    category: 'standup',
    categoryLabel: '敏捷站会 · 进度预警',
    intent: '提前给主管打预防针：“数据迁移遇到了一些意料之外的边缘情况，交付可能会稍有延迟。”',
    en: {
      text: "We ran into some unexpected edge cases during data migration, so there might be a slight delay in delivery.",
      ipa: "/wiː ræn ˈɪntuː sʌm ˌʌnɪkˈspektɪd edʒ ˈkeɪsɪz ˈdʊrɪŋ ˈdeɪtə maɪˈɡreɪʃn, soʊ ðer maɪt biː ə slaɪt dɪˈleɪ ɪn dɪˈlɪvəri/",
    },
    ja: {
      text: "データ移行で想定外のエッジケースが発生したため、納期のオンスケ維持に少々遅れが生じる可能性がございます。",
      furigana: "データいこうで そうていがいの エッジケースが はっせいしたため、のうきの オンスケいじに しょうしょう おくれが しょうじる かのうせいが ございます。",
      romaji: "Dēta ikō de sōteigai no ejjikēsu ga hassei shita tame, nōki no onsuke iji ni shōshō okure ga shōjiru kanōsei ga gozaimasu.",
    },
    tip: "日企特别忌讳当天临期才通知延期（報連相之大忌）！用「オンスケ（On Schedule 按期）」与「可能性がございます」提前预警，领导更容易接受并调配支援。",
  },

  // 2. 代码审查与协同 (Code Review & Collaboration)
  {
    id: 'review-request',
    title: '请求同事帮忙 Code Review',
    category: 'review',
    categoryLabel: '代码审查 · 邀请评审',
    intent: '在群聊或工位上委婉请同事看代码：“我有空闲时能帮我看一下 PR #102 吗？改动主要在订单校验逻辑。”',
    en: {
      text: "Could you take a look at PR #102 when you get a chance? The changes are mostly around order validation logic.",
      ipa: "/kʊd juː teɪk ə lʊk æt ˌpiːˈɑːr wʌn oʊ tuː wen juː ɡet ə tʃæns? ðə ˈtʃeɪndʒɪz ɑːr ˈmoʊstli əˈraʊnd ˈɔːrdər ˌvælɪˈdeɪʃn ˈlɑːdʒɪk/",
    },
    ja: {
      text: "お手すきの際に、PR #102 のレビューをお願いできますでしょうか？注文のバリデーション修正がメインです。",
      furigana: "おてすきのさいに、ピーアール 102の レビューを おねがいできますでしょうか？ちゅうもんの バリデーションしゅうせいが メインです。",
      romaji: "Otesuki no sai ni, pīāru 102 no rebyū o onegai dekimasu deshō ka? Chūmon no baridēshon shūsei ga mein desu.",
    },
    tip: "英语中的 when you get a chance 相当于日语中经典的垫话垫词（クッション言葉）「お手すきの際に（在您空闲的时候）」，极具职业素养。",
  },
  {
    id: 'review-comment-nits',
    title: 'PR 中提出非阻塞小建议 (Nitpick)',
    category: 'review',
    categoryLabel: '代码审查 · 委婉建议',
    intent: '给对方提个代码小优化（非必须改）：“整体写得很好！一个小建议：这里抽取一个常量可能会更易读。”',
    en: {
      text: "Looks great overall! Nit: extracting this magic string into a shared constant might improve readability.",
      ipa: "/lʊks ɡreɪt ˌoʊvərˈɔːl! nɪt: ɪkˈstræktɪŋ ðɪs ˈmædʒɪk strɪŋ ˈɪntuː ə ʃerd ˈkɑːnstənt maɪt ɪmˈpruːv ˌriːdəˈbɪləti/",
    },
    ja: {
      text: "全体的にとても綺麗ですね！細かい点ですが、このマジックナンバーを定数化するとさらに可読性が高まるかと思います。",
      furigana: "ぜんたいてきに とても きれいですね！こまかいてんですが、この マジックナンバーを ていすうかすると さらに かどくせいが たかまるかと おもいます。",
      romaji: "Zentaiteki ni totemo kirei desu ne! Komakai ten desu ga, kono majikku nanbā o teisūka suru to sarani kadokusei ga takamaru ka to omoimasu.",
    },
    tip: "国际团队常在代码评论前写 Nit（表示挑刺小细节，可不阻塞合入）；日企中用「細かい点ですが（虽然是细节）」「～かと思います」表达柔和建议。",
  },
  {
    id: 'review-sync-huddle',
    title: '逻辑复杂，请求发起 5 分钟语音沟通',
    category: 'review',
    categoryLabel: '日常沟通 · 快速对齐',
    intent: '文字打不清楚时：“针对这个缓存失效策略，方便开个 5 分钟的快速语音对齐一下吗？”',
    en: {
      text: "Do you have 5 minutes for a quick huddle to align on this cache invalidation strategy?",
      ipa: "/duː juː hæv faɪv ˈmɪnɪts fər ə kwɪk ˈhʌdl tuː əˈlaɪn ɑːn ðɪs kæʃ ɪnˌvælɪˈdeɪʃn ˈstrætədʒi/",
    },
    ja: {
      text: "キャッシュの無効化方針について、今5分ほどお時間をいただきサクッと認識合わせさせていただけますか？",
      furigana: "キャッシュの むこうかほうしんについて、いま ごふんほど おじかんを いただき サクッと にんしきあわせさせて いただけますか？",
      romaji: "Kyasshu no mukōka hōshin ni tsuite, ima go-fun hodo ojikan o itadaki sakutto ninshiki awase sasete itadakemasu ka?",
    },
    tip: "Slack/Teams 中快速开麦叫 huddle 或 quick sync；日企中称之为「認識合わせ（同步认知/对齐）」，在东京工位上极为高频常用。",
  },

  // 3. 需求确认与技术方案 (Specs & Q&A)
  {
    id: 'specs-edge-case',
    title: '向 PM / 客户确认异常边界条件',
    category: 'specs',
    categoryLabel: '需求确认 · 边界定义',
    intent: '写代码前确认规格：“如果用户在支付过程中断网，我们目前的预期处理流程是怎样的？”',
    en: {
      text: "What is the expected behavior if the user loses internet connection halfway through the checkout flow?",
      ipa: "/wʌt ɪz ðiː ɪkˈspektɪd bɪˈheɪvjər ɪf ðə ˈjuːzər ˈluːzɪz ˈɪntərnet kəˈnekʃn ˈhæfweɪ θruː ðə ˈtʃekaʊt floʊ/",
    },
    ja: {
      text: "決済処理の途中でネットワークが切断された場合の想定仕様（期待値）についてご確認させていただけますでしょうか？",
      furigana: "けっさいしょりの とちゅうで ネットワークが せつだんされた ばあいの そうていしよう（きたいち）について ごかくにんさせて いただけますでしょうか？",
      romaji: "Kessai shori no tochū de nettowāku ga setsudan sareta baai no sōtei shiyō (kitaichi) ni tsuite gokakunin sasete itadakemasu deshō ka?",
    },
    tip: "英文问法直击 expected behavior；日企中必须掌握关键词「期待値（期望结果/预期输出）」与「想定仕様（设计规格）」，提 Q&A 票时的必填项。",
  },
  {
    id: 'specs-scope-creep',
    title: '委婉告知需求变更会导致排期推迟',
    category: 'specs',
    categoryLabel: '需求变更 · 评估影响',
    intent: '遇到加需求时守住底线：“如果现在加入这个导出报表功能，我们需要重新评估本迭代的交付排期。”',
    en: {
      text: "If we accommodate this export feature now, we'll need to push back the release date or cut other scope.",
      ipa: "/ɪf wiː əˈkɑːmədeɪt ðɪs ˈekspɔːrt ˈfiːtʃər naʊ, wiːl niːd tuː pʊʃ bæk ðə rɪˈliːs deɪt ɔːr kʌt ˈʌðər skoʊp/",
    },
    ja: {
      text: "このエクスポート機能を追加いたしますと工数が逼迫するため、リリース日の再調整（リスケ）またはスコープの見直しが必要です。",
      furigana: "この エクスポートきのうを ついかいたしますと こうすうが ひっぱくするため、リリースびの さいちょうせい（リスケ）または スコープの みなおしが ひつようです。",
      romaji: "Kono ekusupōto kinō o tsuika itashimasu to kōsū ga hippaku suru tame, rirīsubi no saichōsei (risuke) matawa sukōpu no minaoshi ga hitsuyō desu.",
    },
    tip: "英文中 scope creep 指需求蔓延；日企非常强调「工数（人月/人日工时）」和「リスケ（Reschedule 重新排期）」，用数据和工数说话最专业。",
  },

  // 4. 线上故障与应急救火 (Incident & Troubleshooting)
  {
    id: 'incident-alert',
    title: '生产环境出现 500 告警首发通报',
    category: 'incident',
    categoryLabel: '线上事故 · 首发通报',
    intent: '第一时间在告警群同步：“我们检测到生产环境 API 出现 500 错误峰值，正在全力排查根因。”',
    en: {
      text: "Heads up: We're seeing an unusual spike in 500 errors on the production API. The team is actively investigating the root cause.",
      ipa: "/hedz ʌp: wɪr ˈsiːɪŋ æn ʌnˈjuːʒuəl spaɪk ɪn faɪv ˈhʌndrəd ˈerərz ɑːn ðə prəˈdʌkʃn ˌeɪpiːˈaɪ. ðə tiːm ɪz ˈæktɪvli ɪnˈvestɪɡeɪtɪŋ ðə ruːt kɔːz/",
    },
    ja: {
      text: "【緊急連絡】本番環境のAPIにて500エラーの急増を検知いたしました。現在チームで原因の一次切り分けを進めております。",
      furigana: "【きんきゅうれんらく】ほんばんかんきょうの エーピーアイにて ごひゃくエラーの きゅうぞうを けんちいたしました。げんざい チームで げんいんの いちじきりわけを すすめております。",
      romaji: "[Kinkyū renraku] Honban kankyō no API nite 500 erā no kyūzō o kenchi itashimashita. Genzai chīmu de gen'in no ichiji kiriwake o susumete orimasu.",
    },
    tip: "英文习惯用 Heads up 开头提醒所有人注意；日企事故必须使用高频黑话「切り分け（故障隔离与排查定位）」和「本番環境（生产环境）」。",
  },
  {
    id: 'incident-rollback',
    title: '决定先回滚版本以止血恢复服务',
    category: 'incident',
    categoryLabel: '线上事故 · 止血回滚',
    intent: '果断决策：“为了先恢复用户访问，我们决定立即将生产环境版本回滚到上一个稳定 Release。”',
    en: {
      text: "To restore service as quickly as possible, we have decided to roll back production to the previous stable release.",
      ipa: "/tuː rɪˈstɔːr ˈsɜːrvɪs æz ˈkwɪkli æz ˈpɑːsəbl, wiː hæv dɪˈsaɪdɪd tuː roʊl bæk prəˈdʌkʃn tuː ðə ˈpriːviəs ˈsteɪbl rɪˈliːs/",
    },
    ja: {
      text: "サービス復旧を最優先とするため、本番環境を直前の安定版リリースへロールバック（切り戻し）いたします。",
      furigana: "サービスふっきゅうを さいゆうせんとするため、ほんばんかんきょうを ちょくぜんの あんていばんリリースへ ロールバック（きりもどし）いたします。",
      romaji: "Sābisu fukkyū o saiyūsen to suru tame, honban kankyō o chokuzen no anteiban rirīsu e rōrubakku (kirimodoshi) itashimasu.",
    },
    tip: "英文叫 roll back；日企除了叫「ロールバック」外，传统客户特别爱用纯日语「切り戻し（きりもどし）」，两者意思完全相同。",
  },

  // 5. 现场破冰与面试自我介绍 (Onsite Intro & Interview)
  {
    id: 'intro-experience',
    title: '30 秒清晰陈述个人技术背景与擅长领域',
    category: 'intro',
    categoryLabel: '面试与破冰 · 核心背景',
    intent: '介绍自己的专业定位：“我是一名拥有 5 年经验的全栈工程师，主要专注于高并发架构与 TypeScript 研发。”',
    en: {
      text: "I'm a full-stack engineer with 5 years of experience, specializing in high-concurrency systems and modern TypeScript.",
      ipa: "/aɪm ə ˈfʊlˌstæk ˌendʒɪˈnɪr wɪð faɪv jɪrz ʌv ɪkˈspɪriəns, ˈspeʃəlaɪzɪŋ ɪn haɪ kənˈkɜːrənsi ˈsɪstəmz ənd ˈmɑːdərn ˈtaɪpˌskrɪpt/",
    },
    ja: {
      text: "フルスタックエンジニアとして5年の開発経験があり、主に高負荷分散システムとTypeScriptによる開発を得意としております。",
      furigana: "フルスタックエンジニアとして ごねんの かいはつけいけんがあり、おもに こうふかぶんさんシステムと タイプスクリプトによる かいはつを とくいとしております。",
      romaji: "Furusutakku enjinia to shite go-nen no kaihatsu keiken ga ari, omo ni kōfuka bunsan shisutemu to Taipusukuriputo ni yoru kaihatsu o tokui to shite orimasu.",
    },
    tip: "英文用 specializing in 展现专业权威；日企现场面谈多用「〜を得意としております（擅长某领域）」比单纯的「〜ができます」更具职场成熟度。",
  },
  {
    id: 'intro-onsite-greeting',
    title: '进场第一天向团队谦虚破冰',
    category: 'intro',
    categoryLabel: '现场入场 · 破冰问候',
    intent: '第一天加入现场：“初次见面！今天开始加入团队，希望能尽快熟悉业务成为独当一面的战力，请多多关照！”',
    en: {
      text: "Great to meet everyone! Excited to join the team today. I look forward to getting up to speed quickly and contributing to the project.",
      ipa: "/ɡreɪt tuː miːt ˈevriwʌn! ɪkˈsaɪtɪd tuː dʒɔɪn ðə tiːm təˈdeɪ. aɪ ˈlʊk ˈfɔːrwərd tuː ˈɡetɪŋ ʌp tuː spiːd ˈkwɪkli ənd kənˈtrɪbjuːtɪŋ tuː ðə ˈprɑːdʒekt/",
    },
    ja: {
      text: "初めまして！本日よりチームに参加いたします。早く業務に慣れて一人前の戦力になれるよう努めますので、よろしくお願いいたします！",
      furigana: "はじめまして！ほんじつより チームに さんかいたします。はやく ぎょうむに なれて いちにんまえの せんりょくに なれるよう つとめますので、よろしくおねがいいたします！",
      romaji: "Hajimemashite! Honjitsu yori chīmu ni sanka itashimasu. Hayaku gyōmu ni narete ichininmae no senryoku ni nareru yō tsutomemasu node, yoroshiku onegai itashimasu!",
    },
    tip: "来自日企课件原汁原味的日本职场文化金句！「一人前の戦力（独当一面的战斗力）」是在日现场面试与入场破冰最博得日本主管好感的满分词汇！英文对应 get up to speed（迅速上手）。",
  },
]
