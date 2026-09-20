# Awesome Jev (简体中文)

> 此文件由英文列表自动生成，请勿直接编辑。贡献请修改 [readme.md](readme.md)。

[English](readme.md) · [网站](https://awesomejev.vercel.app/zh/) · [英文网站](https://awesomejev.vercel.app/)

## 从这里开始

- [Introduction](https://docs.typesafe.ai/introduction) - 两页讲清心智模型：输入状态加带类型的问题，输出带概率的带类型答案。
- [Quick start](https://docs.typesafe.ai/introduction/quickstart) - 用 Python、TypeScript 或 curl 发出第一个请求。
- [Primitives](https://docs.typesafe.ai/primitives) - Choice、Score 和 Noul，以及各自的适用场景。
- [State](https://docs.typesafe.ai/concepts/state) - 如何打包交给 Jev 评判的内容，以及为什么越少越好。
- [API reference](https://docs.typesafe.ai/api) - 请求与响应的约定。
- [Models](https://docs.typesafe.ai/models) - 别名、当前版本、价格与速率限制。
- [Model jaggedness: jev-1.13](https://docs.typesafe.ai/model-jaggedness/jev-1.13) - 已知失效模式，直接来自厂商。
- [System One](https://docs.typesafe.ai/concepts/system-one) - 这个品类意味着什么，以及它与聊天模型的区别。
- [How to build with System One](https://docs.typesafe.ai/concepts/how-to-build-with-system-one) - 把一次判断拆解成原子问题，并把控制流留在代码里。
- [Confidence](https://docs.typesafe.ai/confidence) - confidence 字段的含义，以及如何据此转为执行、复核或回退。
- [Patterns](https://docs.typesafe.ai/patterns) - 推测式扇出、按置信度路由、组合打分、意图路由。
- [Use-case map](https://docs.typesafe.ai/concepts/use-case-map) - 厂商自己整理的目录，列出 Jev 适用和不适用的场景。
- [Cookbooks](https://docs.typesafe.ai/cookbooks/parallel_questions) - 可照做的配方，从把多个问题批量合并进一个请求开始；其余在侧边栏。
- [Workflow evals](https://evals.typesafe.ai/) - 厂商在四种工作流上的基准测试，页面上附有注意事项。
- [Manifesto](https://typesafe.ai/manifesto) - 产品主张，一句话概括为造产品，不造神。
- [llms.txt](https://docs.typesafe.ai/llms.txt) - 所有文档页面的纯 Markdown 版本，用于喂给智能体。
- [Console](https://console.typesafe.ai/) - 等候名单、API 密钥和用量。
- [Jev on Vercel AI Gateway](https://vercel.com/ai-gateway/models/jev) - 模型 id `typesafe-ai/jev`，通过 Vercel 计费，无需 TypeSafe 等候名单。
- [Jev on Cloudflare Workers AI](https://developers.cloudflare.com/ai/models/typesafe/jev/) - 在 Worker 中通过 `env.AI.run` 调用 `typesafe/jev`。
- [Jev on OpenRouter](https://openrouter.ai/typesafe/jev-1.13) - 在通用网关上的 Beta 上架，模型 id `typesafe/jev-1.13`，按你的 OpenRouter 密钥计费。
- [Jev-verified cascade](https://openrouter.ai/docs/cookbook/evaluate-and-optimize/jev-verified-cascade) - OpenRouter 配方：由廉价模型作答，Jev 检查答案，只有失败的才升级。
- [Jev on Netlify AI Gateway](https://www.netlify.com/changelog/typesafe-jev-ai-gateway/) - 从 Netlify Functions 零配置访问，无需单独的 TypeSafe 密钥。
- [LiteLLM pass-through](https://docs.litellm.ai/docs/pass_through/typesafe) - 把 System One 端点经 LiteLLM 代理路由，以做密钥管理和成本跟踪；不支持流式，因为 TypeSafe 本就没有。
- [Discord](https://discord.gg/typesafe) - 官方服务器；builder 演示在 show-and-tell 频道。

## 官方 SDK 与框架支持

- [typesafe-sdk-js](https://github.com/typesafe-ai/typesafe-sdk-js) - TypeScript 与 JavaScript 客户端，答案类型由你的问题推断得出。
- [typesafe-sdk-python](https://github.com/typesafe-ai/typesafe-sdk-python) - Python 客户端，同步与异步。
- [system-one-adapter-python](https://github.com/typesafe-ai/system-one-adapter-python) - 以 LLM API 为后端的同款 `TypeSafeClient` 接口，可在相同问题上把 Jev 和聊天模型做对比。
- [skills](https://github.com/typesafe-ai/skills) - 用于设计问题、构建工作流并做评估的智能体技能。
- [Agent skill](https://docs.typesafe.ai/agent-skill) - 如何在 Claude Code、Cursor 等工具中安装官方技能。
- [Vercel AI SDK provider](https://ai-sdk.dev/providers/ai-sdk-providers/typesafe-ai) - `@ai-sdk/typesafe-ai` 通过 `experimental_evaluate` 暴露 Jev。
- [eve](https://github.com/vercel/eve) - Vercel 的智能体框架；Jev 在其 evaluate 步骤中充当带类型的评判。
- [ai-cli](https://github.com/vercel-labs/ai-cli) - 终端里的 Vercel AI SDK，其 evaluate 路径跑在 Jev 上。

## 编程智能体

### Claude Code

- [fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) - 用 Jev 的判定替代上下文压缩的摘要：一次请求为每个工具调用及其结果打分，丢弃过时项，保留的一律原样留存。
- [jev-router](https://github.com/gargpratyush/jev-router) - 把每个任务路由到能胜任的最便宜的 Claude 模型。
- [winnow](https://github.com/GhalebDweikat/winnow) - 在每个工具结果进入上下文前先做评判，让窗口填得更慢，而不是事后清理。
- [yoshi](https://github.com/compozy/yoshi) - 面向 Claude Code 和 Codex 的上下文裁剪代理，节省量是实测而非宣称。
- [skillranker](https://github.com/Dicklesworthstone/skillranker) - Rust CLI 与钩子，利用实时会话上下文为下一步排序已安装的技能，并支持弃权。
- [jcm-router](https://github.com/adarshmishra07/jcm-router) - 本地代理，逐条消息选择模型与思考强度，不触碰已缓存的主对话。
- [jev-skillful](https://github.com/bestagentkits/jev-skillful) - 按提示词在技能、MCP 服务器、智能体和命令之间路由，并测量注入是否真的有帮助。
- [limpet](https://github.com/noplan-inc/limpet) - 一个 Stop 钩子，依据自然语言规则评判，阻止智能体过早停止。
- [jevwire](https://github.com/Brainwires/jevwire) - MCP 服务器、可嵌入的决策模型，外加一个只升级不放松的插件，能让载体更严格但绝不更宽松。
- [jev-code](https://github.com/devagrawal09/jev-code) - 命令行工具包，编码智能体把重判断的活交给它，每个请求对应一条带类型的 Jev 工作流。
- [vexjoy-agent](https://github.com/notque/vexjoy-agent) - 智能体工具包，其 `/d` 命令用一次 Jev 调用选定专家智能体、技能和流水线，另有可选的 Jev 自动压缩插件。
- [save-token-jev](https://github.com/IAmUnbounded/save-token-jev-clean) - 上下文压缩时询问 Jev 哪些工具调用仍然重要，其余原样保留，并带有 Claude Code、Codex、OpenCode 和原始 API 记录的适配器。
- [jev-pruner](https://github.com/tamaratran/jev-pruner) - 在命令执行后、模型看到前用 Jev 裁剪冗长的 Bash 输出；短输出、报错和结构化格式原样放行。
- [jev-rules](https://github.com/EliaAlberti/jev-rules) - 针对每个提示词为你的常驻规则打分，每个会话只投送一次真正适用的那些。
- [jev-belay](https://github.com/valentynkit/jev-belay) - Stop 钩子，拦截未经验证的“完成”：读取记录寻找证据，仅当文件有改动且此后没有通过的检查时，才花一次四问的 Jev 调用；所有错误路径均失败放行。
- [jev-use](https://github.com/shitianfang/jev-use) - 把 Claude Code、Codex 和 pi 中无需文本输出的步骤交给 Jev 处理，并为所有它不该决定的事项提供类型化的升级契约。
### Codex

- [jev-codex-router](https://github.com/0xNatoshi/jev-codex-router) - 为每个 Codex 回合选择模型、思考深度和速度模式。
### Pi

- [pi-jev by y0usaf](https://github.com/y0usaf/pi-jev) - 一个经过实测的工具调用门禁，外加一个在 Pi 内给出带类型答案的 `jev_ask` 工具。
- [pi-warden](https://github.com/DevMortimer/pi-warden) - 引导而非打断的护栏：不可逆调用、偏离任务的调用、卡住的循环、未经验证的完成声明，每次约 250 毫秒。
- [pi-jev-auto-mode](https://github.com/jomatsu/pi-jev-auto-mode) - 在语义层面自动批准 bash、write 和 edit 调用，无法判定时失败拦截。
- [pi-jev by TheoOliveira](https://github.com/TheoOliveira/pi-jev) - 把语义化工具路由和带类型决策作为 Pi 工具提供。
- [pi-jev-router](https://github.com/mejiasd3v/pi-jev-router) - 通过 Vercel AI Gateway 为 Pi 做自动模型路由。
- [pi-fast-jev-compaction](https://github.com/joelhooks/pi-fast-jev-compaction) - 把原样保留的上下文压缩思路移植到 Pi。
- [bicameral](https://github.com/AbdelStark/bicameral) - 面向 Pi 的混合载体：由 LLM 写代码，Jev 反射对每次调用做放行、确认、阻断、警告或引导的门禁。
- [pi-quiet-ask](https://github.com/HyunjunJeon/pi-quiet-ask) - 把 Jev 作为 Pi 编码智能体安静的决策层。
- [pi-typesafe-jev](https://github.com/legacybridge-tech/pi-typesafe-jev) - Pi 扩展，把 Jev 的判断暴露为五个 Pi 工具。
- [pi-typesafe](https://github.com/DevMortimer/pi-typesafe) - 批量评估工具、终端演练场，以及给 Pi 扩展作者的带类型 API。
- [pi-heed](https://github.com/Nyarlathoteppppp/pi-heed) - 把每次有副作用的工具调用对照你在会话前面说过的话做检查，这样“只做复核”在上下文压缩后依然成立。
- [pi-jev-sentinel](https://github.com/harshwasan/pi-jev-sentinel) - 用 Jev 检查 Pi 的工具调用、工具输出和回复中的风险操作与提示注入，带用户审批、上下文复检、密钥擦除和可选的任务锁定。
- [pi-mcp-adapter](https://github.com/nicobailon/pi-mcp-adapter) - 对 MCP 工具结果做可选的带类型评估和语义搜索，受按服务器配置的数据外发白名单约束。
### Hermes

- [typesafe-skill-router](https://github.com/DECRUX9812/typesafe-skill-router) - 在模型调用前指出唯一值得加载的那个技能；仅用标准库，每回合约千分之一美元。
- [jev-agent-skill-router](https://github.com/GodsBoy/jev-agent-skill-router) - 带置信度感知的技能路由，包含弃权路径。
- [hermes-jev](https://github.com/keeltrace/hermes-jev) - 带类型的决策、排序、验证，以及一个可选启用的工具门禁。
- [ask-jev-skill](https://github.com/shantanugoel/ask-jev-skill) - 让 Hermes 及同类智能体直接向 Jev 提问。
- [hermes-jev-plugin](https://github.com/ajensenwaud/hermes-jev-plugin) - 四个 Hermes 工具，用于原子检查、路由和量表打分；已收录于 Hermes 插件目录。
- [hermes-jev-approvals](https://github.com/anpicasso/hermes-jev-approvals) - 在被标记的 shell 命令运行前予以批准、拒绝或升级；提速数据为厂商自报。
### Agent Zero

- [a0-typesafe-ai](https://github.com/3clyp50/a0-typesafe-ai) - 给 Agent Zero 的带类型工具和概率卡片。
### 任意智能体

- [skillbox](https://github.com/kitze/skillbox) - 自托管、带版本的技能库，通过 MCP 提供服务，由 Jev 推荐该加载哪个技能。
- [jev-mcp by jkudish](https://github.com/jkudish/jev-mcp) - 第一个面向 Jev 的 MCP 服务器，至今仍是被链接最多的那个。
- [typesafe-mcp](https://github.com/itsmostafa/typesafe-mcp) - Go 语言的 MCP 连接器。
- [jev-mcp by blakestone-x](https://github.com/blakestone-x/jev-mcp) - 分类、打分、检查、匹配和筛查，每个答案都带置信度。
- [Jevbridge](https://github.com/tacticocc/Jevbridge) - ACP 与 MCP 适配器，把 Jev 与任意 LLM 配对用于计算机操作和带类型决策。
- [jev-eval-mcp](https://github.com/BYK/jev-mcp) - 评估优先的 MCP 服务器：先做出一个问题的原型，再映射到大量条目上，然后用带标注的样例和阈值扫描来衡量各个变体。
- [azdaja](https://github.com/kubet/azdaja) - 面向 Claude Code、Codex、Gemini 和 OpenCode 的递归语言模型层，把完整源文本留在本地评估器中；Jev 是可选的叶子节点，用于重排、验证、分类和语义连接，批次有预算并带检查点。
### 编写 Jev 代码的技能

- [building-with-jev-skill](https://github.com/dbreunig/building-with-jev-skill) - 用于编写和改进调用 Jev 的程序的技能。
- [jev-system-architect](https://github.com/samtay32/jev-system-architect) - 找出系统中的模糊判断，把它变成细小的 Choice、Score 和 Noul 原语。
- [jev-judgment](https://github.com/HyunjunJeon/jev-judgment) - 把编码智能体的封闭式判断发给 Jev，而不是聊天模型。
- [skills by fabricioctelles](https://github.com/fabricioctelles/skills) - 智能体技能目录，可用 Jev 为主观评估标准打分。
- [Augustus](https://github.com/24601/Augustus) - 用于判定带类型的判断究竟该放在哪里、哪些留在代码里的技能；它是官方技能的搭档，不是替代品。

## 浏览器与计算机操作

- [jev-ultrafast](https://github.com/browser-use/jev-ultrafast) - 一次请求同时从索引化的 DOM 表中选出操作和目标元素；小模型只负责写带类型的文本。苏黎世到伦敦的订票用时 7.1 秒。
- [typesafe-computer-use](https://github.com/awlevin/typesafe-computer-use) - 对屏幕做 OCR，分类下一步动作，点击；在 macOS 上每步约 $0.0002。
- [mobile-jev](https://github.com/droidrun/mobile-jev) - 同样的循环跑在真实 Android 手机上；演示中 21 秒完成九个 Uber 操作。
- [jev-browser by jkudish](https://github.com/jkudish/jev-browser) - 第一个社区版 Jev 浏览器智能体，附演示 GIF。
- [jev-voice-browser](https://github.com/moritzkremb/jev-voice-browser) - 按说出的每个词在约 300 毫秒内判定意图和目标，往往在句子说完之前就完成。
- [jev-browser by Ying-Kai-Liao](https://github.com/Ying-Kai-Liao/jev-browser) - 由 LLM 规划，Jev 决策；含库、CLI 和 MCP 服务器。
- [jev-browser by tontoko](https://github.com/tontoko/jev-browser) - 一个落地的 Jev 加 Playwright 内核，支撑带类型的 SDK、常驻 CLI 和 MCP 服务器。
- [jev-mobile](https://github.com/friedjof/jev-mobile) - 通过 USB 连接的 Android 子智能体，运行观察、归一、决策、变更、验证的流程，由 Jev 做决策。
- [jev-ego](https://github.com/romaluev/jev-ego) - 浏览器智能体，每一步花一次 Jev 请求来选定动作。
- [jev-browser-use](https://github.com/wy-coliney/jev-browser-use) - Codex 技能与插件，Jev 负责导航、点击和滚动，Codex 保留输入和验证；据称浏览器步骤快 5 到 10 倍。
- [Jev-cu](https://github.com/Sac-Y/Jev-cu) - Codex 的计算机操作，Jev 从屏幕文本中选出元素、动作、完成状态和风险，不发送截图；中文说明。
- [JevScout](https://github.com/hqman/JevScout) - 求职技能，通过 CDP 驱动 Chrome，并让 Jev 为每个链接和职位打分。
- [Jev Social](https://github.com/socai-io/jev-social) - Lets Jev choose each read-only social research step while socai runs it in a real Chrome session and streams inspectable Instagram, TikTok, or LinkedIn evidence into a report.

## 开源模型与复刻

- [SemIf](https://github.com/TheoLeeCJ/SemIf) - 在单张 3090 上用开源模型实现语义 if；星标最多的独立复刻实现，前身为 openjev。
- [jevlike](https://github.com/vinnylarouge/jevlike) - 开源的选项打分器，读取候选项的 logits 而不是生成 JSON。
- [NanoJev](https://github.com/TianyuCodings/NanoJev) - 0.6B 的复刻实现，支持并行决策、动态候选项和端到端训练流水线。
- [openjev-sglang](https://github.com/ekzhang/openjev-sglang) - 基于 SGLang 的 Jev 兼容 API 端点，仅做 prefill。
- [jev-visual](https://github.com/hr98w/jev-visual) - 面向教学的视觉推理变体，跑在 Apple Silicon 上：共享上下文，直接为候选项打分。
- [reflex](https://github.com/kshetrajna12/reflex) - 基于 Qwen3.5 的小型开源决策模型：状态加带类型的问题，输出校准后的概率。
- [decider](https://github.com/Mapika/decider) - 从 Qwen3.5-2B 微调而来的单遍带类型决策。
- [jevmlx](https://github.com/bnsd55/jevmlx) - 在 Apple Silicon 上为任意 MLX 模型提供并行受约束决策，只需一次前向传播。
- [mini-jev](https://github.com/r-ms/mini-jev) - 在冻结的 Qwen3-4B 上做的预注册实验：读取选项字母的 logits，跳过 JSON。
- [system-one-open](https://github.com/mithalouni/system-one-open) - 在 Gemma 4 E2B 和 Gemma 3 270M 上用一次前向传播得到带类型的校准决策。
- [Verdict-open-jev](https://github.com/Heman10x-NGU/Verdict-open-jev) - 基于 ModernBERT 的非自回归决策引擎，带校准的不确定度和浏览器内的 WebGPU 演练场。
- [jevfire](https://github.com/kikoncuo/jevfire) - 通过 vLLM API 为 CUDA 上的 LLM 提供并行决策，附游戏智能体示例和基准测试。
- [jevbetter](https://github.com/olanotolu/jevbetter) - 更强的单遍打分器，与 jevlike 的起步设计做了正面基准对比。
- [open-alternative-jev](https://github.com/ikermoel/open-alternative-jev) - 在 Hugging Face 和 vLLM 上，用任意开源权重模型一次前向传播得到带类型的校准决策。
- [openjev by zhihz](https://github.com/zhihz/openjev) - 从上下文、问题和候选答案出发的双语本地决策。
- [jev-on-a-laptop](https://github.com/rorshopping/jev-on-a-laptop) - 在笔记本上用现成的 1.5B 到 8B 模型做 Jev 式决策的研究，附 Hugging Face 演示。
- [typesafe-ai-benchmark](https://github.com/iammrduncan/typesafe-ai-benchmark) - 模仿 TypeSafe 响应结构的 LLM 网关，在等密钥期间可作替身使用。
- [Parallel constrained decoding](https://huggingface.co/spaces/drinkmoonshine/parallel-constrained-decoding) - Hugging Face Space，在 Qwen2.5-1B 上演示 RLCD 式并行解码。
- [openvons](https://github.com/genai-craft/openvons) - 开源决策层，对有限选项集给出概率，并分为执行、确认和拒绝。独立复刻实现，不是 TypeSafe 的权重。
- [von](https://github.com/wfzyx/von) - 非自回归开源决策模型，本地报告低于 15 ms，可作为 Jev 的直接替代。
- [litjev](https://github.com/zhengxuyu/litjev) - 把任意现成 LLM 变成 Jev 式的决策层。
- [open-jev](https://github.com/JoshuaSP/open-jev) - 用 DiffusionGemma 做带类型的 JSON 推理，并与 Jev 做了基准对比。
- [kev](https://github.com/jaredpalmer/kev) - Qwen2.5-0.5B 上的 LoRA 适配器与读出头，一次 prefill 回答多个带类型问题；在 MacBook 上两小时内训完，留出集 ECE 0.065，说 TypeSafe 的传输格式。
- [simple-jev](https://github.com/featherless-ai/simple-jev) - 从任意 Hugging Face 模型读取下一 token 的 logits，用于选择题、评分量表和支持性问题；公开演示 API 无需密钥。
- [OpenJev by razorback16](https://github.com/razorback16/openjev) - 通过 vLLM 在 DiffusionGemma 26B 上运行的 Jev 兼容决策服务器，支持图像，由 [Codiv](https://codiv.ai) 免费托管。
- [openjev by daseinlabs](https://github.com/daseinlabs/open-jev) - 在 Gemma 3 4B 上用 MLX 做一次 prefill，并在一次填充过的传播中为所有选项打分；演示中从终端玩 Doom。
- [jeff by logan-markewich](https://github.com/logan-markewich/jeff) - 基于 400M 的 GLiFormer 自托管的 System One API，基准测试直言它在哪些地方落后于 Jev。
- [JevForge](https://github.com/zwliJay/jev-forge) - 端到端技术栈：可审计的数据构建、Qwen3.5-0.8B 训练、固定的 Mind2Web 与 OOD 评测、本地部署，以及初步的 RLCD 基线。
- [PlayJev](https://github.com/OmniJev/PlayJev) - 在微调过的 Qwen3.5-0.8B 上仅凭画面玩十款浏览器游戏，每步一次前向传播，开放权重并附浏览器演示。

## 代码审查与质量

- [jev-review by devagrawal09](https://github.com/devagrawal09/jev-review) - 分阶段的代码评审工作流，带本地看板。
- [jev-review by NiazMorshed2007](https://github.com/NiazMorshed2007/jev-review) - 本地优先的 MCP 插件，供编码智能体做持续质量评审。
- [foreman](https://github.com/thruwire/foreman) - 监管一整座智能体软件工厂，由 Jev 做放行与否的判定。
- [supercov](https://github.com/supercorp-ai/supercov) - 给编码智能体的代码质量与覆盖率信号。
- [diffjury](https://github.com/raihankhan-rk/diffjury) - PR 风险路由器与评审教练。
- [clean-code-review](https://github.com/frostney/clean-code-review) - 按 Clean Code 规则评判 PR 中的每个文件，再交由 LLM 复核。
- [JevLint](https://github.com/huntedman/JevLint) - 可配置的语义 lint，采用文件级的 Noul 判断。
- [commit-miner](https://github.com/devanshbatham/commit-miner) - 对提交 diff 和提交信息做分类：缺陷修复、带 CWE 的安全修复、变更类型。
- [jev-review-action](https://github.com/fatwang2/jev-review-action) - 用 Jev 做提交内容评审和 PR 分类的 GitHub Action，链路中没有文本生成模型。
- [jev-triage](https://github.com/cephalization/jev-triage) - 拉取大型仓库，用带类型的 Jev 问题为其 issue 做分诊。
- [perch](https://github.com/lakeday-org/perch) - 语义 lint：规则用自然语言写，每个文件交由 Jev 评判，可本地或在 CI 中运行。
- [jeff by Alurith](https://github.com/Alurith/jeff) - 只读的 Go CLI，按编码规则检查文件，例如隐藏的副作用和薄弱的错误处理。
- [jev-pref](https://github.com/doeixd/jev-pref) - 把你 AGENTS.md 里的偏好变成一个 linter，在代码变更时运行并把结果回报给智能体。
- [jev-commit](https://github.com/valentynkit/jev-commit) - 提交前钩子：一次 Jev 调用判断提交信息是否与暂存的 diff 相符，另查调试残留、未提及的改动和凭据带；一律只告警，唯有发现密钥时才阻断。
- [slop-grader](https://github.com/lukstei/slop-grader) - Grades text and markdown files for AI slop, grammar, and technical documentation quality, and guides an AI agent to auto-fix violations.

## 路由与网关

- [tiershift](https://github.com/iamvatsalpatel/tiershift) - 把每次 LLM 调用转到能胜任的最便宜模型，策略写在 YAML 里，决策约 180 毫秒。
- [jev-router by prismhq](https://github.com/prismhq/jev-router) - 构建在 LiteLLM 之上的 LLM 路由器。
- [agent-router](https://github.com/nidhi-singh02/agent-router) - 为一个任务选定 Cursor、Claude Code、Codex 或 OpenCode，连同模型和思考强度，然后启动它。
- [Janus](https://github.com/FirasSX914/Janus) - 在你自己的数据上测量 Jev 何时胜过其他模型，再据此路由。
- [hono-jev-router](https://github.com/yusukebe/hono-jev-router) - 在 Hono 中按语义路由 HTTP 请求。
- [JevRouter](https://github.com/BillionsBobby/JevRouter) - 把模型、子智能体、技能、MCP 工具和 CLI 统一为一个候选集；Jev 挑选，路由器负责权限和风险的执行；据报在 Toolathlon 上前五次工具调用命中率 44%，DeepSeek 为 24%。
- [jev-gateway](https://github.com/vinilana/jev-gateway) - 面向 Codex 和 Claude Code 的本地网关，把“下一步用哪个工具”的决策交给 Jev，其余都交给你平常的模型。

## 搜索、重排与 RAG

- [jev-search](https://github.com/superagents-lab/jev-search) - 网页搜索的来源选择、查询理解和相关性排序。
- [blink](https://github.com/ellipsis-dev/blink) - 代码库搜索，由 Jev 为候选项打分。
- [reranker](https://github.com/hev/reranker) - 把 Jev 当作校准过的重排器：一次调用，最多 30 篇文档，每篇给出一个概率。
- [llama-index-jev](https://github.com/WiktorB2004/llama-index-jev) - LlamaIndex 的重排器与路由器，比 LLM 评判更便宜。
- [jev-tree](https://github.com/reachjalil/jev-tree) - 在分类体系上做递归选择，突破 255 个选项的上限。
- [jev-folio-recursive-classifier](https://github.com/mttrbrts/jev-folio-recursive-classifier) - 用递归的 Jev Choice、束搜索、按置信度停在叶节点以及上下文长度基准测试，把 OCR 后的法律协议按 FOLIO 文档类型本体分类。
- [neo4jev](https://github.com/jexp/neo4jev) - 通过对相邻关系做分类来遍历 Neo4j 图。
- [jev-sift](https://github.com/kbhuw/jev-sift) - MCP 工具，批量为文件、URL 或片段的相关性打分，让智能体只打开真正要紧的那些。
- [jev-scout](https://github.com/AkashPriyadarshii/jev-scout) - Rust CLI 与 MCP 服务器，针对自然语言请求找出真实且有人维护的仓库和 crate，由 Jev 为候选项打分。

## 数据与运维

- [pg-jev](https://github.com/realZachi/pg-jev) - PostgreSQL 扩展，用自然语言回答关于你的表的问题。
- [vgi-typesafe](https://github.com/Query-farm/vgi-typesafe) - DuckDB worker，把 choice、noul 和 score 暴露为 SQL 中可做 lateral join 的表函数。
- [jevsql](https://github.com/EugeneBoondock/jevsql) - 在 SQLite 之上带自然语言谓词的 SQL：按语义过滤、排序和分类行，支持批量并有成本保护。
- [sqlite-jev](https://github.com/mgaitan/sqlite-jev) - 通过可加载的 C 扩展和 Python 封装，给 SQLite 加上 Jev 的 Noul、Choice 和 Score 判断，提供标量函数和批量虚表查询。
- [jevlogs](https://github.com/reachjalil/jevlogs) - 在为 LLM 分析付费之前先给 OpenTelemetry 日志的信号量打分。
- [jev-curate](https://github.com/AkashPriyadarshii/jev-curate) - 以每秒 1500 行以上的速度筛选 Parquet 和 JSONL 训练数据。
- [HA-Jev](https://github.com/AboveColin/HA-Jev) - Home Assistant 集成：问一个关于你家的问题，得到一个概率、选择或分数作为实体。
- [typesafe-migration-guard](https://github.com/opaielsheikh/typesafe-migration-guard) - 在数据库迁移执行前审查其安全性。
- [jev-for-engineers](https://github.com/Foadsf/jev-for-engineers) - 来自机械和电气工程的八个小例子：CAD 布线、FEM 分诊、DFM 筛查、BOM 对齐。
- [jlink](https://github.com/keltokhy/jlink) - 按一条用自然英语写的匹配规则在两个数据集之间关联记录，可从 Python、shell、Stata 或 R 调用，在 NBER 专利受让人对 Compustat 的任务上报告 F1 0.73，调优过的字符串匹配为 0.69。
- [pg_typesafe](https://github.com/giuliosmall/pg_typesafe) - 用 Jev 做类别分类的预览版 PostgreSQL 扩展。
- [jev-mode](https://github.com/ddfeyes/jev-mode) - 基于带类型判断模型的工单分诊和文件打标；据报 token 减少 78%，准确率 96.1%，基线为 93.7%。
- [jev-reviewer](https://github.com/choxos/jev-reviewer) - 通过语音、文本或问题文件向临床试验报告索取系统综述所需的数据；每个答案都是带出处文件和位置的原文引用。
- [tax-doc-classifier](https://github.com/kyotofin/tax-doc-classifier) - 每页一个请求，在 261 种 IRS 表单和七类页面中做选择；在其语料上报告 100% 准确率，每页 $0.001，比它取代的 LLM 流水线便宜 34 倍。
- [jevql](https://github.com/kylemclaren/jevql) - 面向 PostgreSQL 的语义 SQL，由 Jev 回答其中的谓词。
- [duckdb-jev](https://github.com/colliber/duckdb-jev) - DuckDB 扩展，向每一行提一个问题并返回真正的 SQL 类型。
- [invalidate](https://github.com/chopratejas/invalidate) - 给每条存下的智能体记忆一个租约，并询问 Jev 新证据是否让它失效；[在线演示](https://invalidate-playground.vercel.app)。

## 安全、内容审核与校验

- [jev-shield](https://github.com/caiovicentino/jev-shield) - 语义化的 MCP 防火墙，筛查每一次工具调用、结果和描述；据报拦截召回率 94%，每次检查约 $0.00002。
- [jev-guard](https://github.com/leepokai/jev-guard) - 面向 Claude Code、Codex、Cursor、Gemini CLI、Pi 和 OpenCode 的自动模式：为每次工具调用打风险分并归为拒绝、询问或放行，同时标记结果中的提示注入。
- [Jev-Moderation-Bot](https://github.com/brainstormity/Jev-Moderation-Bot) - 带可编辑规则的聊天内容审核。
- [citation-verifier](https://github.com/MarissaFamularo/citation-verifier) - 被引论文是否支持引用它的那句话？由 Claude 找出原文，Jev 打分，人来定夺。
- [human-compiler](https://github.com/asfarsadewa/human-compiler) - 贴入文本，得到诊断信息，像给散文用的编译器。
- [snifftest](https://github.com/DanRWilloughby/snifftest) - 针对 AI 写作痕迹的散文 linter：可计数的规则加一个判断模型。
- [riff](https://github.com/scale-venture-partners/riff) - 给写作用的 Ruff 风格规则编号。
- [jev-secret-detection](https://github.com/teyhouse/jev-secret-detection) - 测量 Jev 在文件片段中识别真实凭据的效果，形似配置的难例单独计分。
- [jev-audio-beeper](https://github.com/santos-sanz/jev-audio-beeper) - 低延迟音频消音的概念验证：由 Jev 的带类型决策驱动 ffmpeg。
- [is-malicious](https://github.com/luantak/is-malicious) - 在你运行代码库之前扫描其中隐藏的或窃取数据的行为；报告干净并不等于证明安全，它也这么说。
- [tripwire](https://github.com/noelzappy/tripwire) - AI SDK 中间件与代理，在用户看到之前对每个 LLM 响应跑七项 Jev 检查；目前还没有准确率数字，它也这么说。

## 应用与扩展

- [unclutter](https://github.com/kitze/unclutter) - 浏览器扩展，用可复用的模板规则移除页面杂物。
- [typesafe-adblock](https://github.com/realZachi/typesafe-adblock) - Chrome 扩展，逐个 DOM 节点询问“这个元素是广告吗？”；是个玩具，它也这么说。
- [vibecheck](https://github.com/RafalWilinski/vibecheck) - 在你按下发布之前给你的 X 帖子做个氛围检查。
- [xtags](https://github.com/manifoldor/xtags) - 给你 X 时间线上的每条帖子标注它想让你做什么。
- [jevibe-check](https://github.com/sriganesh/jevibe-check) - 为 Bluesky 的帖子和草稿实时标注语气。
- [jevmeter](https://github.com/ChetasLua/jevmeter) - 给任意视频加上实时仪表：每句话按五个问题打分，渲染成 16:9 的成片，一整场辩论约两美分。
- [killmyidea](https://github.com/monteduro/killmyidea) - 描述你的创业点子；Jev 告诉你该毙掉、该改，还是该发。
- [notra](https://github.com/usenotra/notra) - 把工作变成内容，由 Jev 决定什么值得发。
- [slidepilot](https://github.com/harshil1712/slidepilot) - 基于 Cloudflare Agents 的 Slidev 语音驱动自动翻页。
- [should-ai-kill-us-all](https://github.com/hellogumbo/should-ai-kill-us-all) - 每十分钟拿真实头条向 Jev 问一次这个问题。
- [Privacy Facts](https://github.com/thenewpotato/privacy-facts) - 把隐私政策变成营养成分表式的标签，配以自然语言答案、Jev 的置信度分数和建议的出处条款。
- [jev-voice-control](https://github.com/chris-wozniczek/jev-voice-control) - 菜单栏 Swift 应用，把语音命令转成 Jev 的带类型决策和 macOS 动作。
- [jev-got](https://github.com/phureewat29/jev-got) - 《权力的游戏》角色扮演，由故事模型写每一幕，Jev 回答五个带类型问题，驱动标题、配乐、画面和下一个提示词。
- [typesafe-jev](https://github.com/gtaras7/typesafe-jev) - Jev 实验合集，从本地简历筛选工作台开始，每个都有各自的实测结果。
- [super-jev](https://github.com/kevthetech143/super-jev) - 把证据、Jev 判断、允许的动作和已验证的结果串起来的小型载体。
- [safer-with-jev](https://github.com/andrelandgraf/safer-with-jev) - 面向 Neon AI Gateway 的 Neon Function 代理，前置 Jev 路由。
- [Sponsor Skip](https://github.com/trungdq88/youtube-sponsor-detection) - Chrome 扩展，从字幕或实时音频中找出口播广告并跳过；所有时间戳都由代码掌控，字幕模式下每小时不到一美分。
- [jev-seo](https://github.com/AkashPriyadarshii/jev-seo) - 面向 SEO 和 GEO 检查的 Rust CLI 与 MCP 服务器，基于 DuckDuckGo 结果，由 Jev 打分。
- [jev.nvim](https://github.com/valentynkit/jev.nvim) - Neovim 插件：用自然语言向缓冲区提问，Treesitter 把它切成函数，Jev 为每个函数打分，答案按概率排序落入 quickfix。
- [jev-skip](https://github.com/valentynkit/jev-skip) - 浏览器扩展，读取字幕轨道并在片头结束前把每段的赞助概率画在进度条上，不依赖众包数据库；在 23 个视频上报告捕获了 SponsorBlock 赞助秒数的 77%，每个视频 $0.0008。
- [openpoke-meets-jev](https://github.com/0xShin0221/openpoke-meets-jev) - OpenPoke 分支，把邮件筛选、工具调用护栏和搜索重排序移到 Jev 上，附带与被替换的 Sonnet 调用的 A/B 对比，以及对注入门控的对抗测试。

## 游戏、机器人与仿真

- [typesafe-mario](https://github.com/fhshaik/typesafe-mario) - 从结构化的模拟器状态出发玩《超级马里奥兄弟》；Jev 直接选择 NES 手柄输入。
- [jev-drone](https://github.com/RomanSlack/jev-drone) - MuJoCo 中仅用摄像头的无人机，Jev 以 2.5 Hz 在回路中。
- [tsai-sc](https://github.com/phyous/tsai-sc) - 通过键盘和鼠标玩初代《星际争霸》共享版，动作概率全程记录。
- [tsai-civ2](https://github.com/phyous/tsai-civ2) - 浏览器中的《文明 II》，完整对局的载体，动作概率实时显示。
- [heist-one](https://github.com/AbdelStark/heist-one) - 潜行游戏，Jev 负责守卫的判断，确定性代码掌控世界。
- [typesafe-snake](https://github.com/sorrycc/typesafe-snake) - 每一帧一次 Choice；合法走法和事实由代码生成。
- [jev-doom-agent](https://github.com/lukaske/jev-doom-agent) - 浏览器原生的 Doom 智能体，带结构化空间状态和实时决策遥测。
- [OneVOneJev](https://github.com/emrickgarrett/OneVOneJev) - 用 Three.js 做的 1v1 快速狙击竞技场。
- [JevPlaysPokemon](https://github.com/anxkhn/JevPlaysPokemon) - 通过 Showdown 和一份真实的 FireRed ROM 玩第三世代宝可梦。
- [jev-askable-arm](https://github.com/TarunTomar122/jev-askable-arm) - 在仿真的 Franka 机械臂上零样本执行英文目标；Jev 把写死的原语串起来。
- [quackd](https://github.com/rokbenko/quackd) - 面向 LLM 驾驶机器人的命令行，覆盖七种本体，带可选的 Jev 步进器，只在若干调用之间做选择，从不直接写关节角。
- [snake-jev](https://github.com/siroccomask/snake-jev) - 由并行的 Jev 评估操控的贪吃蛇，每帧一次 API 调用。
- [JevPilot](https://github.com/standardagents/jevpilot) - Three.js 驾驶模拟器，Jev 每秒最多四次从采样路径中选出转向和速度；[上手开](https://jevpilot.standardagents.ai)。
- [live-jev](https://github.com/vinilana/live-jev) - 浏览器里的俯视视角汽车，每 200 ms 发出四个带类型的问题，覆盖逻辑由代码按置信度门禁执行。
- [jev-plays-pokemon-red](https://github.com/valentynkit/jev-plays-pokemon-red) - 在 PyBoy 上玩《宝可梦红》：路线和算术由代码掌控，Jev 只在分支处做选择，每个战斗回合都记录一条倒下预测，并用 Brier 分数对照 RAM 的实际值。

## 金融与交易

- [jev-trader](https://github.com/jarrodwatts/jev-trader) - 在 Monad 的每个区块做一次交易决策，标的为 Kuru MON-USDC，每次约 300 ms。
- [trade-jev](https://github.com/justinhe16/trade-jev) - 在 NQ 订单簿数据上回测把 Jev 当作买入、卖出或持有的交易者。
- [Jev-Trades](https://github.com/zadescoxp/Jev-Trades) - 带回测的加密货币交易机器人。
- [jev-trade](https://github.com/aowang-ai/jev-trade) - 运行在 Hyperliquid 上的实盘 Jev 交易者。

## 基准、评测与校准

- [jev-benchmarks](https://github.com/AbdelStark/jev-benchmarks) - 面向带类型决策模型的概率感知评估：校准、选择性风险、延迟，可复现。
- [jevcal](https://github.com/abhixhek/jevcal) - 别再猜阈值了：对照一个 LLM 教师做校准、定阈值和漂移检查。
- [jev-harness](https://github.com/AntonioCoppe/jev-harness) - 置信度门禁、影子模式、配方和评估；在同一个行过滤任务上报告 Claude CLI 用时 48.9 秒，Jev 用时 1.3 秒。
- [jev-rerank-bench](https://github.com/anessbelbati/jev-rerank-bench) - 在 14 个数据集上把 Jev 与 Cohere Rerank、ZeroEntropy 和一个聊天基线作对比，附原始响应。
- [jev-search-rerank-eval](https://github.com/zhuyansen/jev-search-rerank-eval) - Jev 重排能胜过向量检索吗？9,831 对评分样本，并测量了评判循环性带来的偏差。
- [jev-sec-bench](https://github.com/Gaurav-Gosain/jev-sec-bench) - 针对提示注入和漏洞代码检测的盲测基准。
- [jev-phishing-bench](https://github.com/anisselbd/jev-phishing-bench) - 在 2,000 封钓鱼邮件上把 Jev 与 Claude Haiku 作对比：准确率、校准、延迟、成本。
- [jev-spam-eval](https://github.com/bitnovus/jev-spam-eval) - 用 Noul 问题做零样本垃圾邮件过滤，对照 TF-IDF 基线。
- [jev-agent-failure-benchmark](https://github.com/TokenTrim/jev-agent-failure-benchmark) - 在 Who and When 智能体失败归因基准上把 Jev 与一个强力 LLM 作对比。
- [jev-korean-benchmark](https://github.com/mahlernim/jev-korean-benchmark) - 韩语理解与医学文本，附运行时间与成本证据。
- [jev-behavior-study](https://github.com/RINNECODER/jev-behavior-study) - 在 jev-1.13.0 上做的受控提示词实验，含原始结果和离线验证。
- [jev-report](https://github.com/HackSing/jev-report) - 独立的中文研究报告：52 页，50 项可复现测试，143 行可追溯数据。
- [jev-benchmark](https://github.com/wondertwins/jev-benchmark) - 两项基准测试，国际象棋和猛兽辨识，一项在 Jev 的能力区内、一项在区外，都附结果。
- [jev-dspy-lab](https://github.com/jmanhype/jev-dspy-lab) - 针对 DSPy 中 Jev 决策的可复现校准与选择性风险基准测试。
- [jev-eval-agent](https://github.com/vinilana/jev-eval-agent) - 带 100 个模拟工具的个人助理智能体，测量受 Jev 门禁的智能体需要多少步。
- [jev-synergy-screening](https://github.com/PistachioAIHQ/jev-synergy-screening) - 用 Choice 和 Noul 问题做摘要筛查，对照 ASReview SYNERGY 的金标准标注计分。
- [jev-orderby-bench](https://github.com/yodablocks/jev-orderby-bench) - 衡量按 Jev 概率做 ORDER BY 是否站得住脚：成对逆序、Score 与人工评级的序数一致性、校准，以及预注册门禁下的措辞不变性；在 20 Newsgroups 主题上通过，在 Amazon ESCI 商品相关性上六项条件中有四项不通过，并表明通过 DuckDB 扩展做 40 行批量状态会不通过排序门禁，而每请求一行则通过。
- [cultivar](https://github.com/pinecone-io/cultivar) - Pinecone 的技能测试 CLI，带 Jev 评分后端，据报比 LLM 评分器便宜约 30 倍。
- [jev-eval by 4esv](https://github.com/4esv/jev-eval) - 在三项带标注的任务上把 Jev 与 GPT-5.6 Terra 作对比：简单任务打平，77 路路由低 6.7 分，速度快 5 倍，成本低 41 到 50 倍。
- [jev-benchmark by themsquared](https://github.com/themsquared/jev-benchmark) - 工具调用风险分类，附多次运行的方差；每一个错误答案都伴随着含糊的置信度。
- [jev-research-eval](https://github.com/jgridifier/jev-research-eval) - 基于钉住的 jev-ultrafast 提交的可复现载体，含基线套件和压力套件。
- [jev-playground by hegargarcia](https://github.com/hegargarcia/jev-playground) - 在状态明确、合法动作明确、结果可衡量的游戏中把 Jev 与其他模型作对比。

## 演练场与演示

- [typesafe-playground by TypeSafeAI](https://github.com/TypeSafeAI/typesafe-playground) - 110 个用例、游戏和模型挑战，提示词可编辑并支持 A/B 对比；这是社区组织而非厂商，前身在 BunsDev 名下。
- [typesafe-playground by kavehmz](https://github.com/kavehmz/typesafe-playground) - 从客服路由到带可见传感器输入的 3D 驾驶模拟。
- [jev-experiments](https://github.com/dabit3/jev-experiments) - Nader Dabit 的 Jev 小实验杂货铺。
- [TypeSafe Typewriter](https://typesafe-demo.val.run/) - 十六项带类型判断随你打字实时更新，跑在 Val Town 上。
- [Yes / No](https://yesno.coderai.dev) - 问一个问题，得到是、否或也许，必要时会联网搜索；无需注册。
- [Jev Pac-Man](https://jev-pacman.ephraimduncan.com) - 迷宫表示为 JSON；Jev 在每个路口选择转向。
- [Jev Tetris](https://jev-omega.vercel.app) - 根据空洞数、堆叠高度和凹凸度选定旋转和落点列。
- [Hollow Creek](https://hollow-creek-sigma.vercel.app) - 村庄 NPC 每一帧都在评判你，而不是和你聊天。
- [Crowdcheck](https://crowdcheck-ai.vercel.app/) - 在发布之前拿 10,000 个合成人格测试你的帖子。
- [Magic-8-Jev](https://github.com/willprout/magic-8-ball) - 问一个问题，用一次 choice 从二十个答复中选出回答，并显示从点击到答案的延迟；[在线演示](https://willprout.github.io/magic-8-ball/)。
- [typesafe-ai-playground by markjaquith](https://github.com/markjaquith/typesafe-ai-playground) - 围绕 Jev 做实验的 Rust CLI 演练场。
- [jev-playground by wustep](https://github.com/wustep/jev-playground) - 一个 System One 模型能否仅凭带类型的分类、打分和挑选决策来引导一段音乐创作。
- [typesafe-jev-workflow](https://github.com/GiesN/typesafe-jev-workflow) - LangGraph 演示，把一封模拟邮件发给 Jev，并按它返回的带类型 Choice 做路由。
- [jev-little-airways](https://github.com/lbotinelly/jev-little-airways) - 拿来展示的 Jev 能力研究。
- [jev-demos](https://github.com/bud-ro/jev-demos) - 为测试 Jev 擅长什么而做的演示。
- [Jev Classifier](https://jevclassifier.vercel.app) - 托管演示，按类型、质量、情绪和语气给帖子归档。
- [Jev Guard demo](https://guard-jev.vercel.app) - 托管的评论审核演练场。
- [Companion](https://jev-demo.vercel.app) - 托管的机器人界面，每回合回答九个带类型问题来决定执行、追问还是摊手，不生成任何文本。
- [Jev System One](https://github.com/haseeb-heaven/jev-system-one) - 终端界面，由 OpenAI 作答，Jev 单独为相关性、可靠性和质量打分。
- [jev-web-analyzer](https://github.com/replynodes/jev-web-analyzer) - 把 SaaS 落地页转成 Markdown，向 Jev 提十个有界的 Choice 问题，判断首次访客能理解什么，并以创始人视角的拆解呈现。

## 命令行

- [jev-axi](https://github.com/shiftynick/jev-axi) - 给智能体和人用的 shell 动词：pick、rate、check、rank、triage、guard。
- [semdecide](https://github.com/sharziki/semdecide) - 给 Unix 管道和 CI 用的带类型语义决策。
- [every](https://github.com/sufianetaouil/every) - 向代码库里的每个函数问一个是非题；把模式换成问题的 grep。
- [typesafe-cli](https://github.com/y0usaf/typesafe-cli) - 从 shell 里以数字形式取得 noul、choice 和 score 答案。
- [jev-shell-history](https://github.com/mrnugget/jev-shell-history) - Fish 风格的 zsh 历史补全建议，由 Jev 排序。
- [jgrep](https://github.com/keltokhy/jgrep) - 打印符合一段自然英语描述的行，可在花费上限下从 `tail -f` 流式处理，在 SMS 垃圾短信上报告 F1 0.91，关键词 grep 为 0.72。
- [jev-cli by jtsang4](https://github.com/jtsang4/jev-cli) - 输入带类型的问题，输出结构化的 JSON 答案。
- [jev-cli by tumf](https://github.com/tumf/jev-cli) - 零依赖的 Python CLI，封装 Choice、Score 和 Noul。
- [jevctl](https://github.com/Nasrallah-AL/jev-cli) - npm CLI，密钥存在操作系统钥匙串里；从 shell 获取带类型的判断。

## 社区客户端

- [jev-go](https://github.com/Gaurav-Gosain/jev-go) - Go 客户端，返回带类型的判断和概率。
- [typesafe-go](https://github.com/zhirschtritt/typesafe-go) - 符合 Go 习惯的 TypeSafe API SDK。
- [typesafe-ai](https://github.com/Twister915/typesafe-ai) - Rust 客户端，提供异步和阻塞两种后端以及可观测的重试。
- [typesafe-ai-rs](https://github.com/gilljon/typesafe-ai-rs) - 独立的异步与阻塞 Rust SDK。
- [jev](https://github.com/dannote/jev) - 为 OTP 打造的 Elixir 客户端：从 GenServer 回应 Jev 并对答案做模式匹配。
- [typesafe-sdk](https://github.com/joshmn/typesafe-sdk) - Ruby 客户端。
- [ruby_llm-typesafe](https://github.com/kieranklaassen/ruby_llm-typesafe) - 把 TypeSafe 作为 RubyLLM 2 的结构化输出提供方。
- [laravel-typesafe-jev](https://github.com/Butochnikov/laravel-typesafe-jev) - Laravel 集成，带类型响应、异步请求和测试替身。
- [typesafe-sdk-java](https://github.com/Premo-Cloud/typesafe-sdk-java) - Java 客户端。
- [typesafe-sdk-swift](https://github.com/alterhq/typesafe-sdk-swift) - Swift 客户端。
- [TypeSafeAI.Net](https://github.com/Hawxy/TypeSafeAI.Net) - .NET SDK。
- [zio-typesafe-ai](https://github.com/jamesward/zio-typesafe-ai) - 基于 ZIO 的 Scala 客户端。
- [jev-dsl](https://github.com/inanna-malick/jev-dsl) - Haskell DSL，带类型的数据包和推断出的答案类型。
- [advocaat](https://github.com/pithings/advocaat) - 小巧的 TypeScript 客户端，用来对你自己的数据提问。
- [jod](https://github.com/mateonunez/jod) - Jev 之上的 Zod 风格 schema：先在本地校验状态，再投影出带类型的答案。
- [n8n-nodes-typesafe-ai](https://github.com/DomMonte/n8n-nodes-typesafe-ai) - n8n 社区节点，支持是非题、选择题和打分题。
- [jevclient](https://github.com/AboveColin/jevclient) - 异步 Python 客户端，输出概率和选择，没有散文需要解析。
- [s1-rs](https://github.com/AbdelStark/s1-rs) - 把 Rust 的 enum 和 struct 变成 Choice、Score 和 Noul 问题，答案在编译期受检并按置信度设门禁。
- [typesafe-rs](https://github.com/AbdelStark/typesafe-rs) - 延迟优先的 Rust 客户端，已发布到 crates.io。
- [kunobi-jev](https://github.com/kunobi-ninja/kunobi-jev) - 面向 System One API 的 Rust 客户端。
- [jev-go by Stumble](https://github.com/Stumble/jev-go) - Jev 的 Go 客户端。
- [typesafe-ai-rails](https://github.com/GenieRobot/typesafe-ai-rails) - 构建在社区 Ruby gem 之上的 Rails 集成。
- [typesafe_sdk by nshkrdotcom](https://github.com/nshkrdotcom/typesafe_sdk) - TypeScript AI SDK 的 Elixir 移植版，带一个 TypeSafe 提供方。
- [ruby_decision_model](https://github.com/obie/ruby_decision_model) - 面向决策模型的 Ruby 客户端，把 OpenRouter 和 TypeSafe 提供方收在同一个接口后面，仅用标准库。
- [zod-jev](https://github.com/jomatsu/zod-jev) - 带语义规则的 Zod 4 schema：结构校验留在 Zod，语义校验一次请求发给 Jev，再以 Zod issue 的形式返回。
- [typesafeai-dotnet-sdk](https://github.com/saibimajdi/typesafeai-dotnet-sdk) - 社区版 .NET SDK，支持带类型的 Noul、Choice 和 Score 问题。
- [typesafe-sdk-go by Tangerg](https://github.com/Tangerg/typesafe-sdk-go) - 无第三方依赖的 Go SDK。
- [swift-typesafe](https://github.com/ainame/swift-typesafe) - Swift 6.4 SDK，沿用 Python SDK 的 API，支持 Apple 平台和 Linux。
- [typesafe-sdk-php](https://github.com/Butochnikov/typesafe-sdk-php) - PHP 客户端，支持同步调用、Guzzle promise 和 PSR-3 日志。
- [jev4k](https://github.com/pambrose/jev4k) - Kotlin DSL and client.

## 文章与演讲

### 发布报道

- [Introducing System One Models and Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) - 发布文章：架构、RLCD、基准测试、定价和 FAQ。
- [Launch thread by Diogo Almeida](https://x.com/CompleteSkeptic/status/2099925682726002904) - 创始人的论证：经 RLCD 训练的决策模型比聊天更快通向价值。
- [Hacker News launch thread](https://news.ycombinator.com/item?id=49717558) - 对这些基准测试持怀疑态度的解读都在这里。
- [The Register](https://www.theregister.com/ai-and-ml/2026/09/16/typesafe-ai-debuts-model-for-machines-that-plays-doom/5296711) - 发布报道、Doom 演示，以及 4000 万美元种子轮。
- [Latent Space](https://www.latent.space/p/ainews-jev-a-system-one-model-that) - 发布当日的汇总。
- [TypeSafe AI emerges from stealth with $40M](https://finance.yahoo.com/technology/ai/articles/typesafe-ai-emerges-stealth-40m-190000776.html) - 融资公告。
- [The Rundown](https://www.therundown.ai/news/typesafe-jev-ai-decisions-software) - 简短的发布摘要。
- [DataCamp](https://www.datacamp.com/blog/system-one-models-jev) - 第三方对这些原语、定价和厂商评测的讲解。
- [How does Jev work? RLCD and parallel inference](https://www.explainx.ai/blog/how-does-jev-work-rlcd-system-one-model-explained-2026) - 关于训练方法已公开的部分。
- [TypeSafe Jev: the first decision-only model class](https://www.developersdigest.tech/blog/typesafe-jev-system-one-models-release-guide-2026) - 发布周的技术汇总：API、评测、适配器和技能。
- [TechCrunch](https://techcrunch.com/2026/09/18/a-new-kind-of-ai-model-from-a-chatgpt-inventor-is-thrilling-developers/) - 发布两天后：需求一度把 API 打挂，以及 Almeida 谈不想做前沿实验室。
- [Forkast](https://forkast.news/typesafe-ais-jev-is-not-an-llm-and-that-may-be-the-point/) - 商业视角，附报道中的估值以及 Every 给出的速度和成本数字。
### 独立测评

- [Testing Jev on public and private data](https://amankumar.ai/blogs/jev-measured) - 16,000 次调用对比两款 GPT 模型：它在哪里胜出、在哪里崩掉，以及一套定阈值的流程。
- [One judge call, or twelve dimension scores?](https://agentjournal.dev/blog/llm-judge-vs-feature-extraction/) - 三项分类任务，一个直接问题对比十二个带拟合权重的打分维度。
- [Jev vs Mistral and Gemini for event validation](https://nearhere.events/blog/typesafe-jev-mistral-gemini-event-validation) - 在本地活动信息上的正面对比，附成本和延迟。
- [Mini-Vibe Check](https://every.to/also-true-for-humans/mini-vibe-check-typesafe-s-jev-judged-everything-i-ve-written-in-0-7-seconds) - Every 在一份写作归档上跑了 1,709 次判断，花费不到一美分。
- [TypeSafe Jev played chess](https://dev.to/maximsaplin/typesafe-jev-played-chess-and-landed-next-to-reasoning-models-28ga) - 只在合法走法中做 Choice，让它与推理模型比肩。
- [Jev, Sorted](https://pearpages.com/blog/2026/09/16/jev-sorted-what-typesafes-system-one-model-actually-is-and-what-is-still-just-a-claim) - 读过一手资料后，哪些发布时的说法还站得住。
- [Typed decisions, not chat](https://warmersun.com/jev/) - 把已发布的说法与公开证据能确立的部分区分开。
- [TypeSafeのJevを正しく驚く](https://zenn.dev/nwn/articles/824026c76116e0) - 日语；在 Gemma 上复现了 logit 捷径，并在马里奥载体上与多款 LLM 作对比。
- [TypeSafe Jev vs Claude Code: 4 models, 2 real jobs](https://primeline.cc/blog/typesafe-jev-pre-registered-test) - 约 9,750 次调用的预注册测试：按问题类型给出校准误差，Jev 在提交分类上领先、在知识库归档上落后，弃权把差距补了回来。
- [Jev, three days in](https://aiwithmike.substack.com/p/jev-three-days-in-what-is-known-what) - 哪些已知、哪些是猜的、它适合做什么，把各方独立数字汇到一处。
### 长文与推文串

- [Building a harness with Jev](https://www.langchain.com/blog/building-a-harness-with-jev) - LangChain 谈模型路由，以及把危险的工具调用挡在一个带类型决策之后。
- [Jev, from a developer's angle](https://flaviocopes.com/jev/) - 分诊、RAG 过滤、引用核查和置信度门禁，附代码。
- [Jev is the fish at the poker table](https://backnotprop.com/blog/jev-poker/) - 一篇随笔，谈一个校准良好、不做生成的模型有什么用。
- [Jev as a command safety reviewer](https://x.com/rauchg/status/2100307962262872105) - Guillermo Rauch 谈用 Jev 审查每一条 fx 命令。
- [Jev Typewriter](https://x.com/stevekrouse/status/2100287368221659289) - Steve Krouse 的十六项判断演示和视频。
- [He says he co-invented ChatGPT. His new AI will not write a word](https://dev.to/gabrielanhaia/he-says-he-co-invented-chatgpt-his-new-ai-jev-wont-write-a-word-e3c) - Vercel AI SDK 集成的逐步讲解。
- [Testing Jev for Pi extensions](https://reddit.com/r/PiCodingAgent/comments/1whsav6/anyone_else_testing_out_typesafe_ais_new_system/) - 开发者把 Jev 当作工具使用的安全层。
- [jev 同士に五目並べで対戦させた](https://zenn.dev/mizchi/articles/jev-plays-gomoku) - 日语；Jev 对弈 Jev 下五子棋，附源码和计时日志。
- [Jev's Architecture Unmasked](https://archerhume.com/posts/jevs-architecture-unmasked/) - 一次 10,000 调用的探测，重建出共享状态、并行分支的架构；上面的 kev 就是据此造的。
- [OpenJev on Hacker News](https://news.ycombinator.com/item?id=49752041) - 直接读 logits 到底算不算新鲜事，一场长篇争论。
- [Open-sourced Jev architecture last year](https://news.ycombinator.com/item?id=49736660) - 一项关于非自回归带类型决策的在先技术主张，以及反驳意见：真正的差别在于零样本的通用性。
