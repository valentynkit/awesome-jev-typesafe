# Awesome Jev (日本語)

> このファイルは英語のリストから自動生成されています。直接編集せず、[readme.md](readme.md) に貢献してください。

[English](readme.md) · [サイト](https://awesomejev.vercel.app/ja/) · [英語サイト](https://awesomejev.vercel.app/)

## ここから始める

- [Introduction](https://docs.typesafe.ai/introduction) - メンタルモデルを 2 ページで、状態と型付きの質問を入力し、確率付きの型付き回答を得ます。
- [Quick start](https://docs.typesafe.ai/introduction/quickstart) - Python、TypeScript、curl での最初のリクエストです。
- [Primitives](https://docs.typesafe.ai/primitives) - Choice、Score、Noul と、それぞれが適する場面です。
- [State](https://docs.typesafe.ai/concepts/state) - Jev が判定する対象をどうまとめるか、そしてなぜ少ないほど良いのかを説明します。
- [API reference](https://docs.typesafe.ai/api) - リクエストとレスポンスの契約です。
- [Models](https://docs.typesafe.ai/models) - エイリアス、現行バージョン、価格、レート制限です。
- [Model jaggedness: jev-1.13](https://docs.typesafe.ai/model-jaggedness/jev-1.13) - ベンダー自身が示す既知の失敗モードです。
- [System One](https://docs.typesafe.ai/concepts/system-one) - このカテゴリが何を意味し、チャットモデルとどう違うのかを説明します。
- [How to build with System One](https://docs.typesafe.ai/concepts/how-to-build-with-system-one) - 判断を原子的な質問に分解し、制御フローはコード側に残します。
- [Confidence](https://docs.typesafe.ai/confidence) - confidence フィールドの意味と、それを実行・レビュー・フォールバックに変える方法です。
- [Patterns](https://docs.typesafe.ai/patterns) - 投機的ファンアウト、confidence によるルーティング、複合スコアリング、意図ルーティングです。
- [Use-case map](https://docs.typesafe.ai/concepts/use-case-map) - Jev が適する場面と適さない場面をベンダー自身がまとめた一覧です。
- [Cookbooks](https://docs.typesafe.ai/cookbooks/parallel_questions) - 多数の質問を 1 リクエストにまとめる例から始まる実践レシピ集で、残りはサイドバーにあります。
- [Workflow evals](https://evals.typesafe.ai/) - 4 つのワークフローを対象としたベンダーのベンチマークで、注意点もページに明記されています。
- [Manifesto](https://typesafe.ai/manifesto) - build prod, not god と要約されるプロダクトの主張です。
- [llms.txt](https://docs.typesafe.ai/llms.txt) - エージェントに渡すための、全ドキュメントページのプレーン Markdown 版です。
- [Console](https://console.typesafe.ai/) - ウェイトリスト、API キー、使用量です。
- [Jev on Vercel AI Gateway](https://vercel.com/ai-gateway/models/jev) - モデル id は `typesafe-ai/jev`、課金は Vercel 経由で、TypeSafe のウェイトリストは不要です。
- [Jev on Cloudflare Workers AI](https://developers.cloudflare.com/ai/models/typesafe/jev/) - Worker から `env.AI.run` を通して `typesafe/jev` を呼び出します。
- [Jev on OpenRouter](https://openrouter.ai/typesafe/jev-1.13) - 汎用ゲートウェイでのベータ掲載で、モデル id は `typesafe/jev-1.13`、課金は自分の OpenRouter キーです。
- [Jev-verified cascade](https://openrouter.ai/docs/cookbook/evaluate-and-optimize/jev-verified-cascade) - OpenRouter のクックブックで、安価なモデルが回答し、Jev がその回答を検査し、失敗したものだけをエスカレートします。
- [Jev on Netlify AI Gateway](https://www.netlify.com/changelog/typesafe-jev-ai-gateway/) - Netlify Functions から設定不要でアクセスでき、TypeSafe の個別キーは不要です。
- [LiteLLM pass-through](https://docs.litellm.ai/docs/pass_through/typesafe) - キー管理とコスト追跡のために System One のエンドポイントを LiteLLM プロキシ経由でルーティングし、TypeSafe にストリーミングがないためストリーミングは非対応です。
- [Discord](https://discord.gg/typesafe) - 公式サーバーで、ビルダーのデモは show-and-tell チャンネルにあります。

## 公式 SDK とフレームワーク対応

- [typesafe-sdk-js](https://github.com/typesafe-ai/typesafe-sdk-js) - 質問から回答の型を推論する TypeScript および JavaScript のクライアントです。
- [typesafe-sdk-python](https://github.com/typesafe-ai/typesafe-sdk-python) - 同期と非同期に対応した Python クライアントです。
- [system-one-adapter-python](https://github.com/typesafe-ai/system-one-adapter-python) - LLM API を裏側に置いた同じ `TypeSafeClient` インターフェースで、同一の質問について Jev とチャットモデルを比較できます。
- [skills](https://github.com/typesafe-ai/skills) - 質問の設計、ワークフローの構築、その評価のためのエージェントスキルです。
- [Agent skill](https://docs.typesafe.ai/agent-skill) - Claude Code や Cursor などに公式スキルをインストールする方法です。
- [Vercel AI SDK provider](https://ai-sdk.dev/providers/ai-sdk-providers/typesafe-ai) - `@ai-sdk/typesafe-ai` は `experimental_evaluate` を通じて Jev を公開します。
- [eve](https://github.com/vercel/eve) - Vercel のエージェントフレームワークで、Jev はその evaluate ステップにおける型付きの判定です。
- [ai-cli](https://github.com/vercel-labs/ai-cli) - ターミナルで動く Vercel AI SDK で、evaluate のパスは Jev 上で動作します。

## コーディングエージェント

### Claude Code

- [fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) - コンテキスト圧縮の要約を Jev の判断に置き換え、すべてのツール呼び出しと結果を 1 リクエストで採点し、古いものを捨て、残したものはそのまま保持します。
- [jev-router](https://github.com/gargpratyush/jev-router) - 各タスクを、それを処理できる最も安価な Claude モデルにルーティングします。
- [winnow](https://github.com/GhalebDweikat/winnow) - すべてのツール結果をコンテキストに入る前に判定し、後から掃除するのではなくウィンドウの消費を遅らせます。
- [yoshi](https://github.com/compozy/yoshi) - Claude Code と Codex 向けのコンテキスト削減プロキシで、削減量は主張ではなく実測されています。
- [skillranker](https://github.com/Dicklesworthstone/skillranker) - ライブのセッションコンテキストを使って次のステップ向けにインストール済みスキルをランク付けする Rust の CLI とフックで、棄権にも対応します。
- [jcm-router](https://github.com/adarshmishra07/jcm-router) - メッセージごとにモデルと effort を選び、キャッシュ済みのメインチャットには手を触れないローカルプロキシです。
- [jev-skillful](https://github.com/bestagentkits/jev-skillful) - スキル、MCP サーバー、エージェント、コマンドをプロンプトごとにルーティングし、注入が役立ったかどうかを測定します。
- [limpet](https://github.com/noplan-inc/limpet) - エージェントが早すぎる段階で停止するのを防ぐ Stop フックで、平易な言葉で書かれたルールに照らして判定します。
- [jevwire](https://github.com/Brainwires/jevwire) - MCP サーバー、埋め込み可能な判断モデル、そしてハーネスを厳しくすることはできても緩めることはできないエスカレーション専用のプラグインです。
- [jev-code](https://github.com/devagrawal09/jev-code) - コーディングエージェントが判断の重い作業を委ねるコマンドラインツールキットで、1 リクエストにつき 1 つの型付き Jev ワークフローを実行します。
- [vexjoy-agent](https://github.com/notque/vexjoy-agent) - `/d` コマンドが 1 回の Jev 呼び出しで専門エージェント、スキル、パイプラインを選ぶエージェントツールキットで、任意で使える Jev の自動コンテキスト圧縮プラグインも付属します。
- [save-token-jev](https://github.com/IAmUnbounded/save-token-jev-clean) - どのツール呼び出しがまだ重要かを Jev に尋ね、残りはそのまま保持するコンテキスト圧縮で、Claude Code、Codex、OpenCode、素の API トランスクリプト向けのアダプタを備えます。
- [jev-pruner](https://github.com/tamaratran/jev-pruner) - コマンドの実行後、モデルが見る前に長い Bash 出力を Jev で削り、短い出力、エラー、構造化フォーマットはそのまま通します。
- [jev-rules](https://github.com/EliaAlberti/jev-rules) - 常設のルールをプロンプトごとに採点し、該当するものだけをセッションに 1 回だけ届けます。
- [jev-belay](https://github.com/valentynkit/jev-belay) - 未検証の「完了」をブロックする Stop フックで、トランスクリプトから根拠を読み取り、ファイルが変更されて以降に合格したチェックがない場合にのみ 4 問の Jev 呼び出しを 1 回使い、あらゆるエラー経路ではフェイルオープンします。
- [jev-use](https://github.com/shitianfang/jev-use) - Claude Code、Codex、pi のうちテキスト出力が不要なステップを Jev に任せ、判断すべきでない事柄には型付きのエスカレーション契約を用意します。
### Codex

- [jev-codex-router](https://github.com/0xNatoshi/jev-codex-router) - Codex のターンごとにモデル、思考の深さ、速度モードを選びます。
### Pi

- [pi-jev by y0usaf](https://github.com/y0usaf/pi-jev) - 実測されたツール呼び出しのゲートと、Pi の中で型付き回答を得る `jev_ask` ツールです。
- [pi-warden](https://github.com/DevMortimer/pi-warden) - 中断ではなく誘導するガードレールで、不可逆な呼び出し、タスク外の呼び出し、抜け出せないループ、未検証の完了主張を、それぞれ約 250 ms で扱います。
- [pi-jev-auto-mode](https://github.com/jomatsu/pi-jev-auto-mode) - bash、write、edit の呼び出しを意味的に自動承認し、判断できない場合はフェイルクローズします。
- [pi-jev by TheoOliveira](https://github.com/TheoOliveira/pi-jev) - 意味的なツールルーティングと型付きの判断を Pi のツールとして提供します。
- [pi-jev-router](https://github.com/mejiasd3v/pi-jev-router) - Vercel AI Gateway を通した Pi 向けの自動モデルルーティングです。
- [pi-fast-jev-compaction](https://github.com/joelhooks/pi-fast-jev-compaction) - 原文をそのまま残すコンテキスト圧縮のアイデアを Pi に移植したものです。
- [bicameral](https://github.com/AbdelStark/bicameral) - Pi 向けのハイブリッドハーネスで、LLM がコードを書き、Jev のリフレックスがすべての呼び出しを allow、confirm、block、warn、steer のいずれかでゲートします。
- [pi-quiet-ask](https://github.com/HyunjunJeon/pi-quiet-ask) - Pi のコーディングエージェントにとって静かな判断レイヤーとなる Jev です。
- [pi-typesafe-jev](https://github.com/legacybridge-tech/pi-typesafe-jev) - Jev の判定を 5 つの Pi ツールとして公開する Pi 拡張です。
- [pi-typesafe](https://github.com/DevMortimer/pi-typesafe) - バッチ評価ツール、ターミナルのプレイグラウンド、そして Pi 拡張の作者向けの型付き API です。
- [pi-heed](https://github.com/Nyarlathoteppppp/pi-heed) - 副作用のあるツール呼び出しをセッションの前半で述べた内容に照らして確認し、コンテキスト圧縮の後も「レビューのみ」が保たれるようにします。
- [pi-jev-sentinel](https://github.com/harshwasan/pi-jev-sentinel) - Pi のツール呼び出し、ツール出力、返答を Jev で確認し、危険な操作とプロンプトインジェクションを検出します。ユーザー承認、コンテキストの再確認、シークレットの除去、任意のタスク固定を備えます。
- [pi-mcp-adapter](https://github.com/nicobailon/pi-mcp-adapter) - MCP ツールの結果に対する任意の型付き評価とセマンティック検索で、サーバーごとのデータ送出許可リストで制御します。
### Hermes

- [typesafe-skill-router](https://github.com/DECRUX9812/typesafe-skill-router) - モデル呼び出しの前に読み込む価値のあるスキルを 1 つだけ指名し、標準ライブラリのみで、1 ターンあたり約 0.1 セントです。
- [jev-agent-skill-router](https://github.com/GodsBoy/jev-agent-skill-router) - 棄権の経路を備えた、confidence を考慮するスキルルーティングです。
- [hermes-jev](https://github.com/keeltrace/hermes-jev) - 型付きの判断、ランキング、検証、そしてオプトインのツールゲートです。
- [ask-jev-skill](https://github.com/shantanugoel/ask-jev-skill) - Hermes や同様のエージェントが Jev に直接尋ねられるようにします。
- [hermes-jev-plugin](https://github.com/ajensenwaud/hermes-jev-plugin) - 原子的なチェック、ルーティング、ルーブリック採点のための四つの Hermes ツールです。Hermes のプラグインカタログに掲載されています。
- [hermes-jev-approvals](https://github.com/anpicasso/hermes-jev-approvals) - フラグの付いたシェルコマンドを実行前に承認、拒否、またはエスカレーションします。高速化の数値はベンダー報告です。
### Agent Zero

- [a0-typesafe-ai](https://github.com/3clyp50/a0-typesafe-ai) - Agent Zero 向けの型付きツールと確率カードです。
### エージェント共通

- [skillbox](https://github.com/kitze/skillbox) - MCP 経由で提供されるセルフホストかつバージョン管理されたスキルライブラリで、どのスキルを読み込むかは Jev が推薦します。
- [jev-mcp by jkudish](https://github.com/jkudish/jev-mcp) - Jev 向け初の MCP サーバーで、今も最も多くリンクされています。
- [typesafe-mcp](https://github.com/itsmostafa/typesafe-mcp) - Go 製の MCP コネクタです。
- [jev-mcp by blakestone-x](https://github.com/blakestone-x/jev-mcp) - 分類、採点、検査、マッチング、スクリーニングを行い、すべての回答に confidence が付きます。
- [Jevbridge](https://github.com/tacticocc/Jevbridge) - コンピュータ操作と型付きの判断のために Jev を任意の LLM と組み合わせる ACP および MCP のアダプタです。
- [jev-eval-mcp](https://github.com/BYK/jev-mcp) - 評価優先の MCP サーバーで、質問を試作し、多数の項目に適用し、しきい値を掃引しながらラベル付きの例に対してバリアントを測定します。
- [azdaja](https://github.com/kubet/azdaja) - Claude Code、Codex、Gemini、OpenCode 向けの再帰的な言語モデルレイヤーで、完全なソースをローカルの評価器に保持し、Jev はリランキング、検証、分類、意味的な結合のための任意のリーフとして、予算とチェックポイントを備えたバッチで動きます。
### Jev コードを書くためのスキル

- [building-with-jev-skill](https://github.com/dbreunig/building-with-jev-skill) - Jev を呼び出すプログラムを書き、改善するためのスキルです。
- [jev-system-architect](https://github.com/samtay32/jev-system-architect) - システムの中の曖昧な判断を見つけ、小さな Choice、Score、Noul のプリミティブに変えます。
- [jev-judgment](https://github.com/HyunjunJeon/jev-judgment) - コーディングエージェントの閉じた判断を、チャットモデルではなく Jev に送ります。
- [skills by fabricioctelles](https://github.com/fabricioctelles/skills) - 主観的な評価基準を Jev で採点できるエージェントスキルのディレクトリです。
- [Augustus](https://github.com/24601/Augustus) - そもそも型付きの判断をどこに置くべきか、何をコードに残すかを決めるためのスキルで、公式スキルの置き換えではなく補完です。

## ブラウザとコンピュータ操作

- [jev-ultrafast](https://github.com/browser-use/jev-ultrafast) - 1 リクエストでインデックス化された DOM テーブルから操作と対象要素の両方を選び、小さな LLM は入力するテキストを書くだけです。チューリッヒからロンドンまでの予約を 7.1 秒で完了します。
- [typesafe-computer-use](https://github.com/awlevin/typesafe-computer-use) - 画面を OCR し、次のアクションを分類してクリックし、macOS では 1 ステップあたり約 $0.0002 です。
- [mobile-jev](https://github.com/droidrun/mobile-jev) - 同じループを実機の Android で動かし、デモでは Uber の 9 つの操作を 21 秒で実行します。
- [jev-browser by jkudish](https://github.com/jkudish/jev-browser) - Jev 上で動く最初のコミュニティ製ブラウザエージェントで、デモの GIF が付いています。
- [jev-voice-browser](https://github.com/moritzkremb/jev-voice-browser) - 発話された単語ごとに意図と対象を約 300 ms で判断し、多くの場合は文が終わる前に決まります。
- [jev-browser by Ying-Kai-Liao](https://github.com/Ying-Kai-Liao/jev-browser) - LLM が計画し Jev が判断する、ライブラリ、CLI、MCP サーバーです。
- [jev-browser by tontoko](https://github.com/tontoko/jev-browser) - 型付き SDK、常駐する CLI、MCP サーバーの背後に、グラウンディングされた Jev と Playwright のコアが 1 つあります。
- [jev-mobile](https://github.com/friedjof/jev-mobile) - USB 経由で動く Android のサブエージェントで、observe、normalize、decide、mutate、verify を実行し、判断は Jev が行います。
- [jev-ego](https://github.com/romaluev/jev-ego) - 1 ステップにつき 1 回の Jev リクエストでアクションを選ぶブラウザエージェントです。
- [jev-browser-use](https://github.com/wy-coliney/jev-browser-use) - Jev がナビゲーション、クリック、スクロールを担い、Codex が入力と検証を担当する Codex のスキルとプラグインで、ブラウザ操作が 5 倍から 10 倍速くなると報告しています。
- [Jev-cu](https://github.com/Sac-Y/Jev-cu) - 画面上のテキストから Jev が要素、アクション、完了、リスクを選び、スクリーンショットは送らない Codex のコンピュータ操作で、中国語の readme です。
- [JevScout](https://github.com/hqman/JevScout) - CDP 経由で Chrome を操作し、すべてのリンクと求人を Jev に採点させる求職スキルです。

## オープンモデルと再現実装

- [SemIf](https://github.com/TheoLeeCJ/SemIf) - 3090 一枚でオープンモデルから意味的な if を作る、最もスターの多い独立した再実装で、旧称は openjev です。
- [jevlike](https://github.com/vinnylarouge/jevlike) - JSON を生成する代わりに候補のロジットを読むオープンな選択肢スコアラーです。
- [NanoJev](https://github.com/TianyuCodings/NanoJev) - 並列の判断、動的な候補、エンドツーエンドの学習パイプラインを備えた 0.6B の再実装です。
- [openjev-sglang](https://github.com/ekzhang/openjev-sglang) - SGLang 上の Jev 互換 API エンドポイントで、prefill のみです。
- [jev-visual](https://github.com/hr98w/jev-visual) - Apple Silicon 向けの教育用の視覚推論バリアントで、コンテキストを共有し、候補を直接採点します。
- [reflex](https://github.com/kshetrajna12/reflex) - Qwen3.5 をベースにした小さなオープン判断モデルで、状態と型付きの質問から較正済みの確率を返します。
- [decider](https://github.com/Mapika/decider) - Qwen3.5-2B からファインチューニングした、ワンパスの型付き判断です。
- [jevmlx](https://github.com/bnsd55/jevmlx) - Apple Silicon 上のあらゆる MLX モデルに対して、1 回の順伝播で並列の制約付き判断を行います。
- [mini-jev](https://github.com/r-ms/mini-jev) - 凍結した Qwen3-4B 上の事前登録された実験で、選択肢の文字のロジットを読み、JSON を省きます。
- [system-one-open](https://github.com/mithalouni/system-one-open) - Gemma 4 E2B と Gemma 3 270M 上で、1 回の順伝播により型付きで較正された判断を行います。
- [Verdict-open-jev](https://github.com/Heman10x-NGU/Verdict-open-jev) - ModernBERT 上の非自己回帰な判断エンジンで、較正された不確実性とブラウザ内の WebGPU プレイグラウンドを備えます。
- [jevfire](https://github.com/kikoncuo/jevfire) - vLLM API を通じて CUDA の LLM に並列の判断をもたらし、ゲームエージェントの例とベンチマークが付いています。
- [jevbetter](https://github.com/olanotolu/jevbetter) - jevlike のスターター設計と直接比較するベンチマークを備えた、より強力なワンパスのスコアラーです。
- [open-alternative-jev](https://github.com/ikermoel/open-alternative-jev) - Hugging Face と vLLM 上で、あらゆるオープンウェイトのモデルから 1 回の順伝播で型付きかつ較正された判断を得ます。
- [openjev by zhihz](https://github.com/zhihz/openjev) - コンテキスト、質問、候補回答から、ローカルで二言語の判断を行います。
- [jev-on-a-laptop](https://github.com/rorshopping/jev-on-a-laptop) - ノート PC 上の素の 1.5B から 8B のモデルで Jev 風の判断を検証した研究で、Hugging Face のデモが付いています。
- [typesafe-ai-benchmark](https://github.com/iammrduncan/typesafe-ai-benchmark) - TypeSafe のレスポンス形状を模倣する LLM ゲートウェイで、キーを待つ間の代用として役立ちます。
- [Parallel constrained decoding](https://huggingface.co/spaces/drinkmoonshine/parallel-constrained-decoding) - Qwen2.5-1B 上で RLCD 風の並列デコーディングを実演する Hugging Face Space です。
- [openvons](https://github.com/genai-craft/openvons) - 有限の選択肢集合に対し、execute、confirm、reject に分けた確率で答えるオープンな判断レイヤーです。TypeSafe の重みではなく、独立した再実装です。
- [von](https://github.com/wfzyx/von) - ローカルで 15 ms 未満を報告する非自己回帰なオープン判断モデルで、Jev のドロップイン代替です。
- [litjev](https://github.com/zhengxuyu/litjev) - 市販のあらゆる LLM を Jev 風の判断レイヤーに変えます。
- [open-jev](https://github.com/JoshuaSP/open-jev) - DiffusionGemma による型付き JSON 推論で、Jev と比較したベンチマークが付いています。
- [kev](https://github.com/jaredpalmer/kev) - Qwen2.5-0.5B 上の LoRA アダプタと読み出しヘッドで、多数の型付き質問に 1 回の prefill で答え、MacBook で 2 時間未満で学習でき、ホールドアウトの ECE は 0.065、TypeSafe のワイヤ形式を話します。
- [simple-jev](https://github.com/featherless-ai/simple-jev) - あらゆる Hugging Face モデルから次トークンのロジットを読んで choice、rubric、support の質問に答え、キー不要の公開デモ API を備えます。
- [OpenJev by razorback16](https://github.com/razorback16/openjev) - vLLM を通じた DiffusionGemma 26B 上の Jev 互換の判断サーバーで、画像にも対応し、[Codiv](https://codiv.ai) で無料ホストされています。
- [openjev by daseinlabs](https://github.com/daseinlabs/open-jev) - MLX を使った Gemma 3 4B で一度 prefill し、パディングした 1 パスですべての選択肢を採点し、デモではターミナルから Doom をプレイします。
- [jeff by logan-markewich](https://github.com/logan-markewich/jeff) - 400M の GLiFormer 上でセルフホストする System One API で、Jev に劣る部分を示すベンチマークが付いています。
- [JevForge](https://github.com/zwliJay/jev-forge) - 監査可能なデータ構築、Qwen3.5-0.8B の学習、固定した Mind2Web と OOD の評価、ローカルでの提供、予備的な RLCD ベースラインまでを含むエンドツーエンドのスタックです。
- [PlayJev](https://github.com/OmniJev/PlayJev) - 微調整した Qwen3.5-0.8B でフレームだけを見て十種類のブラウザゲームを遊びます。一手ごとに一回の順伝播で、重みは公開、ブラウザデモ付きです。

## コードレビューと品質

- [jev-review by devagrawal09](https://github.com/devagrawal09/jev-review) - ローカルのダッシュボードを備えた段階的なコードレビューのワークフローです。
- [jev-review by NiazMorshed2007](https://github.com/NiazMorshed2007/jev-review) - コーディングエージェントによる継続的な品質レビューのための、ローカルファーストな MCP プラグインです。
- [foreman](https://github.com/thruwire/foreman) - エージェントによるソフトウェア工場を監督し、可否の判断は Jev が行います。
- [supercov](https://github.com/supercorp-ai/supercov) - コーディングエージェント向けのコード品質とカバレッジのシグナルです。
- [diffjury](https://github.com/raihankhan-rk/diffjury) - PR のリスクルーターであり、レビューのコーチです。
- [clean-code-review](https://github.com/frostney/clean-code-review) - PR 内のすべてのファイルを Clean Code のルールに照らして判定し、その後 LLM がレビューします。
- [JevLint](https://github.com/huntedman/JevLint) - ファイル単位の Noul 判定による、設定可能な意味的リントです。
- [commit-miner](https://github.com/devanshbatham/commit-miner) - コミットの差分とメッセージを分類し、バグ修正、CWE 付きのセキュリティ修正、変更の種類を判別します。
- [jev-review-action](https://github.com/fatwang2/jev-review-action) - Jev で投稿のレビューと PR の分類を行う GitHub Action で、テキスト生成モデルは介在しません。
- [jev-triage](https://github.com/cephalization/jev-triage) - 大規模なリポジトリを取得し、型付きの Jev の質問でその issue をトリアージします。
- [perch](https://github.com/lakeday-org/perch) - 意味的なリントで、ルールは平易な言葉で書き、各ファイルを Jev が判定し、ローカルでも CI でも実行できます。
- [jeff by Alurith](https://github.com/Alurith/jeff) - 隠れた副作用や弱いエラー処理といったコード化されたルールにファイルを照らして検査する、読み取り専用の Go CLI です。
- [jev-pref](https://github.com/doeixd/jev-pref) - AGENTS.md に書いた好みを、コード変更時に実行されてエージェントに結果を返すリンターに変えます。
- [jev-commit](https://github.com/valentynkit/jev-commit) - pre-commit フックで、1 回の Jev 呼び出しがコミットメッセージとステージ済み差分の一致に加え、デバッグの残骸、言及されていない作業、資格情報の混入を判定し、シークレット以外は警告にとどめ、シークレットはブロックします。

## ルーティングとゲートウェイ

- [tiershift](https://github.com/iamvatsalpatel/tiershift) - すべての LLM 呼び出しを処理可能な最も安価なモデルに移し、ポリシーは YAML、判断は約 180 ms です。
- [jev-router by prismhq](https://github.com/prismhq/jev-router) - LiteLLM の上に載せた LLM ルーターです。
- [agent-router](https://github.com/nidhi-singh02/agent-router) - タスクに対して Cursor、Claude Code、Codex、OpenCode のいずれかとモデル、effort を選び、そのまま起動します。
- [Janus](https://github.com/FirasSX914/Janus) - Jev が他のモデルより優れる場面を自分のデータ上で測定し、それに応じてルーティングします。
- [hono-jev-router](https://github.com/yusukebe/hono-jev-router) - Hono で HTTP リクエストを意味によってルーティングします。
- [JevRouter](https://github.com/BillionsBobby/JevRouter) - モデル、サブエージェント、スキル、MCP ツール、CLI を 1 つの候補集合として Jev が選び、ルーターが権限とリスクを強制し、Toolathlon では最初の 5 回のツール呼び出しの命中率が DeepSeek の 24 パーセントに対し 44 パーセントと報告しています。
- [jev-gateway](https://github.com/vinilana/jev-gateway) - Codex と Claude Code 向けのローカルゲートウェイで、「次にどのツールを使うか」の判断を Jev に送り、それ以外はいつものモデルに送ります。

## 検索・リランキング・RAG

- [jev-search](https://github.com/superagents-lab/jev-search) - ウェブ検索のための情報源の選択、クエリの理解、関連度のランキングです。
- [blink](https://github.com/ellipsis-dev/blink) - 候補を Jev が採点するコードベース検索です。
- [reranker](https://github.com/hev/reranker) - 較正されたリランカーとしての Jev で、1 回の呼び出しで最大 30 件の文書を扱い、文書ごとに確率を返します。
- [llama-index-jev](https://github.com/WiktorB2004/llama-index-jev) - LlamaIndex のリランカーとルーターで、LLM の判定より安価です。
- [jev-tree](https://github.com/reachjalil/jev-tree) - 分類体系に対する再帰的な選択で、255 選択肢の上限を超えられます。
- [jev-folio-recursive-classifier](https://github.com/mttrbrts/jev-folio-recursive-classifier) - OCR した法律契約書を FOLIO 文書タイプのオントロジーに沿って分類します。再帰的な Jev Choice、ビームサーチ、信頼度に応じた葉での停止、コンテキスト長のベンチマークを備えます。
- [neo4jev](https://github.com/jexp/neo4jev) - 隣接する関係を分類しながら Neo4j のグラフを辿ります。
- [jev-sift](https://github.com/kbhuw/jev-sift) - ファイル、URL、スニペットのバッチを関連度で採点する MCP ツールで、エージェントは重要なものだけを開きます。
- [jev-scout](https://github.com/AkashPriyadarshii/jev-scout) - 平易な言葉のリクエストに対して実在し保守されているリポジトリやクレートを見つける Rust の CLI と MCP サーバーで、候補の採点は Jev が行います。

## データと運用

- [pg-jev](https://github.com/realZachi/pg-jev) - テーブルについての平易な言葉の質問に答える PostgreSQL 拡張です。
- [vgi-typesafe](https://github.com/Query-farm/vgi-typesafe) - choice、noul、score を SQL のラテラル結合可能なテーブル関数として公開する DuckDB ワーカーです。
- [jevsql](https://github.com/EugeneBoondock/jevsql) - SQLite 上で自然言語の述語を使う SQL で、意味によって行を絞り込み、順位付けし、分類し、バッチ処理とコストの抑制を備えます。
- [sqlite-jev](https://github.com/mgaitan/sqlite-jev) - ロード可能な C 拡張と Python ラッパーを通じて SQLite に Jev の Noul、Choice、Score の判定を追加し、スカラー関数とバッチ化された仮想テーブルのクエリを備えます。
- [jevlogs](https://github.com/reachjalil/jevlogs) - LLM による分析に費用をかける前に OpenTelemetry のログのシグナルを採点します。
- [jev-curate](https://github.com/AkashPriyadarshii/jev-curate) - Parquet と JSONL の学習データを毎秒 1,500 行以上でふるい分けます。
- [HA-Jev](https://github.com/AboveColin/HA-Jev) - Home Assistant の統合で、家についての質問をすると確率、選択、スコアがエンティティとして返ります。
- [typesafe-migration-guard](https://github.com/opaielsheikh/typesafe-migration-guard) - データベースのマイグレーションを実行前に安全性の観点でレビューします。
- [jev-for-engineers](https://github.com/Foadsf/jev-for-engineers) - 機械工学と電気工学からの 8 つの小さな例で、CAD の配線、FEM のトリアージ、DFM のスクリーニング、BOM の突き合わせを扱います。
- [jlink](https://github.com/keltokhy/jlink) - 平易な英語で書いたマッチルールから 2 つのデータセット間のレコードを Python、シェル、Stata、R のいずれかから突き合わせ、NBER の特許譲受人と Compustat の対応では調整済みの文字列マッチの F1 0.69 に対し 0.73 を報告しています。
- [pg_typesafe](https://github.com/giuliosmall/pg_typesafe) - Jev によるカテゴリ分類のためのプレアルファ版 PostgreSQL 拡張です。
- [jev-mode](https://github.com/ddfeyes/jev-mode) - 型付き判断モデル上でのチケットのトリアージとファイルのタグ付けで、トークンが 78 パーセント少なく、ベースラインの 93.7 パーセントに対して 96.1 パーセントの精度を報告しています。
- [jev-reviewer](https://github.com/choxos/jev-reviewer) - 臨床試験報告書に対して系統的レビュー用のデータを音声、テキスト、質問ファイルで尋ね、すべての回答はファイルと箇所を添えた逐語引用です。
- [tax-doc-classifier](https://github.com/kyotofin/tax-doc-classifier) - 1 ページにつき 1 リクエストで 261 種類の IRS フォームと 7 種類のページ種別から選び、自前のコーパスで 100 パーセント、1 ページ $0.001 と、置き換え前の LLM パイプラインより 34 倍安いと報告しています。
- [jevql](https://github.com/kylemclaren/jevql) - PostgreSQL 向けの意味的な SQL で、述語には Jev が答えます。
- [duckdb-jev](https://github.com/colliber/duckdb-jev) - すべての行に質問を投げ、実際の SQL 型を返す DuckDB 拡張です。
- [invalidate](https://github.com/chopratejas/invalidate) - 保存されたエージェントの記憶それぞれにリースを与え、新しい証拠がそれを終わらせるかどうかを Jev に尋ねる仕組みで、[ライブデモ](https://invalidate-playground.vercel.app)があります。

## 安全性・モデレーション・検証

- [jev-shield](https://github.com/caiovicentino/jev-shield) - すべてのツール呼び出し、結果、説明を検査する意味的な MCP ファイアウォールで、1 回の検査あたり約 $0.00002 でブロック再現率 94 パーセントを報告しています。
- [jev-guard](https://github.com/leepokai/jev-guard) - Claude Code、Codex、Cursor、Gemini CLI、Pi、OpenCode 向けの自動モードで、各ツール呼び出しを deny、ask、allow としてリスク採点し、結果に含まれるプロンプトインジェクションを検出します。
- [Jev-Moderation-Bot](https://github.com/brainstormity/Jev-Moderation-Bot) - 編集可能なルールによるチャットのモデレーションです。
- [citation-verifier](https://github.com/MarissaFamularo/citation-verifier) - 引用された論文は、それを引用している文を裏付けているでしょうか。Claude が該当箇所を見つけ、Jev が採点し、人間が判断します。
- [human-compiler](https://github.com/asfarsadewa/human-compiler) - テキストを貼り付けると診断が返る、散文のためのコンパイラのようなものです。
- [snifftest](https://github.com/DanRWilloughby/snifftest) - AI 的な書き癖を検出する散文リンターで、数えられるルールと 1 つの判断モデルを組み合わせます。
- [riff](https://github.com/scale-venture-partners/riff) - 文章向けの Ruff 風のルールコードです。
- [jev-secret-detection](https://github.com/teyhouse/jev-secret-detection) - ファイルのスニペットから本物の資格情報をどれだけ見つけられるかを測定し、設定ファイル風の難しいケースは別に採点します。
- [jev-audio-beeper](https://github.com/santos-sanz/jev-audio-beeper) - 低遅延の音声検閲の概念実証で、Jev の型付き判断が ffmpeg を駆動します。
- [is-malicious](https://github.com/luantak/is-malicious) - 実行する前にコードベースを走査して隠れた挙動やデータを盗む挙動を探し、問題なしという報告が証明にはならないことも明示しています。
- [tripwire](https://github.com/noelzappy/tripwire) - すべての LLM レスポンスをユーザーが見る前に 7 つの Jev のチェックにかける AI SDK のミドルウェアとプロキシで、精度の数値はまだなく、その旨も明示しています。

## アプリケーションと拡張

- [unclutter](https://github.com/kitze/unclutter) - 再利用可能なテンプレートルールでページの雑然とした要素を取り除くブラウザ拡張です。
- [typesafe-adblock](https://github.com/realZachi/typesafe-adblock) - DOM ノードごとに「この要素は広告か」を尋ねる Chrome 拡張で、おもちゃであることも明示しています。
- [vibecheck](https://github.com/RafalWilinski/vibecheck) - X への投稿を公開する前に、その雰囲気をチェックします。
- [xtags](https://github.com/manifoldor/xtags) - X のタイムライン上のすべての投稿に、それがあなたに何をさせたいのかというラベルを付けます。
- [jevibe-check](https://github.com/sriganesh/jevibe-check) - Bluesky の投稿と下書きにリアルタイムでトーンのラベルを付けます。
- [jevmeter](https://github.com/ChetasLua/jevmeter) - 任意の動画にライブのメーターを重ね、すべての文を 5 つの質問で採点し、16:9 の編集として描画し、討論 1 本分で約 2 セントです。
- [killmyidea](https://github.com/monteduro/killmyidea) - スタートアップのアイデアを書くと、Jev が kill、fix、ship のいずれかを答えます。
- [notra](https://github.com/usenotra/notra) - 仕事をコンテンツに変え、投稿する価値があるかどうかは Jev が判断します。
- [slidepilot](https://github.com/harshil1712/slidepilot) - Cloudflare Agents 上で動く Slidev 向けの、音声によるスライドの自動送りです。
- [should-ai-kill-us-all](https://github.com/hellogumbo/should-ai-kill-us-all) - 実際の見出しを使って、10 分ごとに Jev にその問いを投げます。
- [Privacy Facts](https://github.com/thenewpotato/privacy-facts) - プライバシーポリシーを栄養成分表示風のラベルに変え、平易な言葉の回答、Jev の confidence スコア、根拠となる条項の候補を示します。
- [jev-voice-control](https://github.com/chris-wozniczek/jev-voice-control) - 音声コマンドを Jev の型付き判断と macOS の操作に変えるメニューバー常駐の Swift アプリです。
- [jev-got](https://github.com/phureewat29/jev-got) - ストーリーモデルが各シーンを書き、Jev が 5 つの型付き質問に答えてヘッダー、サウンドトラック、アート、次のプロンプトを決めるゲーム・オブ・スローンズのロールプレイです。
- [typesafe-jev](https://github.com/gtaras7/typesafe-jev) - ローカルの履歴書スクリーニング用ワークベンチから始まる Jev の実験群で、それぞれに実測した結果が付いています。
- [super-jev](https://github.com/kevthetech143/super-jev) - 証拠、Jev の判定、許可された行動、検証済みの結果をつなぐ小さなハーネスです。
- [safer-with-jev](https://github.com/andrelandgraf/safer-with-jev) - Neon AI Gateway 向けの Neon Function プロキシで、前段に Jev のルーティングを置きます。
- [Sponsor Skip](https://github.com/trungdq88/youtube-sponsor-detection) - トランスクリプトやライブ音声からスポンサーの読み上げを見つけて飛ばす Chrome 拡張で、タイムスタンプはすべてコードが管理し、トランスクリプトモードでは 1 時間あたり 1 セント未満です。
- [jev-seo](https://github.com/AkashPriyadarshii/jev-seo) - DuckDuckGo の検索結果に対する SEO と GEO のチェックを行う Rust の CLI と MCP サーバーで、採点は Jev が行います。
- [jev.nvim](https://github.com/valentynkit/jev.nvim) - Neovim プラグインで、バッファに平易な言葉の質問を投げると Treesitter が関数単位に分割し、Jev がそれぞれを採点し、回答は確率順に quickfix に並びます。
- [jev-skip](https://github.com/valentynkit/jev-skip) - 字幕トラックを読み、イントロが終わる前にセグメントごとのスポンサー確率をシークバーに描くブラウザ拡張で、クラウドソースのデータベースは使わず、23 本の動画で SponsorBlock のスポンサー秒数の 77 パーセントを捉え、1 本あたり $0.0008 と報告しています。
- [openpoke-meets-jev](https://github.com/0xShin0221/openpoke-meets-jev) - OpenPoke のフォークで、メール選別、ツール呼び出しのガードレール、検索の再ランキングを Jev に移します。置き換えた Sonnet 呼び出しとの A/B と、インジェクションゲートへの攻撃実験を含みます。

## ゲーム・ロボティクス・シミュレーション

- [typesafe-mario](https://github.com/fhshaik/typesafe-mario) - 構造化されたエミュレータの状態からスーパーマリオブラザーズをプレイし、Jev が NES のコントローラー入力を直接選びます。
- [jev-drone](https://github.com/RomanSlack/jev-drone) - MuJoCo 上のカメラのみのドローンで、Jev が 2.5 Hz でループに入ります。
- [tsai-sc](https://github.com/phyous/tsai-sc) - オリジナルの StarCraft シェアウェア版をキーボードとマウスでプレイし、行動の確率を記録します。
- [tsai-civ2](https://github.com/phyous/tsai-civ2) - ブラウザ上の Civilization II で、全編を通すハーネスと行動確率のライブ表示を備えます。
- [heist-one](https://github.com/AbdelStark/heist-one) - Jev が衛兵の判断を担い、世界の管理は決定的なコードが行うステルスゲームです。
- [typesafe-snake](https://github.com/sorrycc/typesafe-snake) - 1 ティックにつき 1 回の Choice で、合法な手と事実はコード側で生成します。
- [jev-doom-agent](https://github.com/lukaske/jev-doom-agent) - 構造化された空間状態とライブの判断テレメトリを備えた、ブラウザネイティブな Doom エージェントです。
- [OneVOneJev](https://github.com/emrickgarrett/OneVOneJev) - Three.js による 1 対 1 のクイックスコープアリーナです。
- [JevPlaysPokemon](https://github.com/anxkhn/JevPlaysPokemon) - Showdown と実機の FireRed ROM を通した第 3 世代のポケモンです。
- [jev-askable-arm](https://github.com/TarunTomar122/jev-askable-arm) - シミュレートされた Franka アームに対する英語のゼロショットな目標指示で、Jev がハードコードされたプリミティブをつなげます。
- [quackd](https://github.com/rokbenko/quackd) - 7 種類の機体に対応した LLM 操縦ロボット向けのコマンドラインで、関節角度を一切書かずに呼び出しの中から選ぶ Jev のステッパーを任意で使えます。
- [snake-jev](https://github.com/siroccomask/snake-jev) - 並列の Jev の評価で操作するスネークで、1 ティックにつき API 呼び出しは 1 回です。
- [JevPilot](https://github.com/standardagents/jevpilot) - Three.js の運転シミュレータで、Jev がサンプリングされた経路からステアリングと速度を毎秒最大 4 回選び、[こちらで運転できます](https://jevpilot.standardagents.ai)。
- [live-jev](https://github.com/vinilana/live-jev) - ブラウザ上の見下ろし視点の車が 200 ms ごとに 4 つの型付き質問を送り、confidence でゲートされた上書きはコード側で行います。
- [jev-plays-pokemon-red](https://github.com/valentynkit/jev-plays-pokemon-red) - PyBoy 上のポケモン赤で、経路と計算はコードが担い、Jev は分岐でのみ選択し、戦闘の各ターンでひんしの予測を記録して RAM の内容に対する Brier スコアで採点します。

## 金融とトレーディング

- [jev-trader](https://github.com/jarrodwatts/jev-trader) - Monad のブロックごとに 1 回の取引判断を、Kuru の MON-USDC で、それぞれ約 300 ms で行います。
- [trade-jev](https://github.com/justinhe16/trade-jev) - NQ の板情報データ上で、買い、売り、保持を判断する Jev のトレーダーをバックテストします。
- [Jev-Trades](https://github.com/zadescoxp/Jev-Trades) - バックテスト機能を備えた暗号資産の取引ボットです。
- [jev-trade](https://github.com/aowang-ai/jev-trade) - Hyperliquid 上で稼働する Jev のトレーダーです。

## ベンチマーク・評価・較正

- [jev-benchmarks](https://github.com/AbdelStark/jev-benchmarks) - 型付き判断モデル向けの確率を考慮した評価で、較正、選択的リスク、レイテンシを再現可能な形で測ります。
- [jevcal](https://github.com/abhixhek/jevcal) - しきい値の当てずっぽうをやめ、LLM の教師モデルに対して較正、しきい値設定、ドリフト検査を行います。
- [jev-harness](https://github.com/AntonioCoppe/jev-harness) - confidence のゲート、シャドーモード、レシピ、評価を備え、同じ行フィルタの処理で Claude CLI の 48.9 秒に対し Jev は 1.3 秒と報告しています。
- [jev-rerank-bench](https://github.com/anessbelbati/jev-rerank-bench) - 14 のデータセットで Jev を Cohere Rerank、ZeroEntropy、チャットのベースラインと比較し、生のレスポンスも同梱しています。
- [jev-search-rerank-eval](https://github.com/zhuyansen/jev-search-rerank-eval) - Jev のリランクは埋め込み検索に勝てるのでしょうか。9,831 組の採点済みペアで、判定の循環によるバイアスも測定しています。
- [jev-sec-bench](https://github.com/Gaurav-Gosain/jev-sec-bench) - プロンプトインジェクションと脆弱なコードの検出に関するブラインドのベンチマークです。
- [jev-phishing-bench](https://github.com/anisselbd/jev-phishing-bench) - 2,000 通のフィッシングメールで Jev と Claude Haiku を比較し、精度、較正、レイテンシ、コストを測ります。
- [jev-spam-eval](https://github.com/bitnovus/jev-spam-eval) - Noul の質問によるゼロショットのスパムフィルタリングを TF-IDF のベースラインと比較します。
- [jev-agent-failure-benchmark](https://github.com/TokenTrim/jev-agent-failure-benchmark) - Who and When というエージェントの失敗要因特定ベンチマークで、Jev と強力な LLM を比較します。
- [jev-korean-benchmark](https://github.com/mahlernim/jev-korean-benchmark) - 韓国語の理解と医療テキストを、実行時間とコストの根拠付きで評価します。
- [jev-behavior-study](https://github.com/RINNECODER/jev-behavior-study) - jev-1.13.0 に対する統制されたプロンプト実験で、生の結果とオフラインでの検証が付いています。
- [jev-report](https://github.com/HackSing/jev-report) - 独立した中国語の調査レポートで、52 ページ、50 件の再現可能なテスト、143 行の追跡可能なデータを含みます。
- [jev-benchmark](https://github.com/wondertwins/jev-benchmark) - チェスと捕食者の識別という 2 つのベンチマークで、Jev の得意領域の内と外を 1 つずつ扱い、どちらも結果が付いています。
- [jev-dspy-lab](https://github.com/jmanhype/jev-dspy-lab) - DSPy における Jev の判断について、再現可能な較正と選択的リスクのベンチマークです。
- [jev-eval-agent](https://github.com/vinilana/jev-eval-agent) - 100 個のモックツールを持つパーソナルアシスタントのエージェントで、Jev でゲートしたエージェントが何ステップを要するかを測定します。
- [jev-synergy-screening](https://github.com/PistachioAIHQ/jev-synergy-screening) - Choice と Noul の質問を、抄録スクリーニングにおける ASReview SYNERGY の正解ラベルに照らして採点します。
- [jev-orderby-bench](https://github.com/yodablocks/jev-orderby-bench) - Jev の確率に対する ORDER BY が妥当かを測定し、事前登録されたゲートのもとでペアごとの逆転、人間の評点に対する Score の順序性、較正、言い回しの不変性を検査し、20 Newsgroups のトピックでは合格、Amazon ESCI の商品関連度では 6 条件中 4 つで不合格となり、DuckDB 拡張を通した 40 行のバッチ状態では、1 リクエスト 1 行なら通るランキングのゲートに落ちることを示しています。
- [cultivar](https://github.com/pinecone-io/cultivar) - Pinecone のスキル検証用 CLI で、LLM の採点者より約 30 倍安いと報告する Jev の採点バックエンドを備えます。
- [jev-eval by 4esv](https://github.com/4esv/jev-eval) - ラベル付きの 3 つのタスクで Jev と GPT-5.6 Terra を比較し、易しいタスクでは互角、77 分類のルーティングでは 6.7 ポイント低く、5 倍速く、41 倍から 50 倍安いという結果です。
- [jev-benchmark by themsquared](https://github.com/themsquared/jev-benchmark) - ツール呼び出しのリスク分類を実行ごとの分散付きで報告し、誤答はいずれも confidence が低めに出ていました。
- [jev-research-eval](https://github.com/jgridifier/jev-research-eval) - jev-ultrafast の特定コミットに固定した再現可能なハーネスで、ベースラインとストレスのスイートを備えます。
- [jev-playground by hegargarcia](https://github.com/hegargarcia/jev-playground) - 状態、合法な行動、測定可能な結果が明示されたゲームで、Jev と他のモデルを比較します。

## プレイグラウンドとデモ

- [typesafe-playground by TypeSafeAI](https://github.com/TypeSafeAI/typesafe-playground) - 110 のユースケース、ゲーム、モデルへの挑戦を編集可能なプロンプトと A/B 比較付きで提供する、ベンダーではなくコミュニティの組織によるもので、以前は BunsDev の下にありました。
- [typesafe-playground by kavehmz](https://github.com/kavehmz/typesafe-playground) - サポートのルーティングから、センサー入力が見える 3D 運転シミュレーションまで扱います。
- [jev-experiments](https://github.com/dabit3/jev-experiments) - Nader Dabit による小さな Jev 実験の寄せ集めです。
- [TypeSafe Typewriter](https://typesafe-demo.val.run/) - Val Town 上で、入力に合わせて 16 個の型付き判定が更新されます。
- [Yes / No](https://yesno.coderai.dev) - 質問すると yes、no、maybe のいずれかが返り、必要に応じてウェブ検索も行い、サインアップは不要です。
- [Jev Pac-Man](https://jev-pacman.ephraimduncan.com) - 迷路を JSON として渡し、分岐点ごとに Jev が曲がる方向を選びます。
- [Jev Tetris](https://jev-omega.vercel.app) - 穴の数、積み上げの高さ、凹凸から回転と列を選びます。
- [Hollow Creek](https://hollow-creek-sigma.vercel.app) - 会話する代わりに、ティックごとにあなたを判定する村の NPC たちです。
- [Crowdcheck](https://crowdcheck-ai.vercel.app/) - 公開する前に、10,000 体の合成ペルソナに対して投稿を試します。
- [Magic-8-Jev](https://github.com/willprout/magic-8-ball) - 質問すると 20 の回答から 1 回の選択で返答を決め、クリックから回答までのレイテンシも表示する[ライブデモ](https://willprout.github.io/magic-8-ball/)です。
- [typesafe-ai-playground by markjaquith](https://github.com/markjaquith/typesafe-ai-playground) - Jev まわりの実験のための Rust 製 CLI プレイグラウンドです。
- [jev-playground by wustep](https://github.com/wustep/jev-playground) - System One のモデルは、型付きの分類、採点、選択の判断だけで作曲を導けるのでしょうか。
- [typesafe-jev-workflow](https://github.com/GiesN/typesafe-jev-workflow) - モックのメールを Jev に送り、返ってきた型付きの Choice でルーティングする LangGraph のデモです。
- [jev-little-airways](https://github.com/lbotinelly/jev-little-airways) - Jev の能力を試す show-and-tell 向けの検証です。
- [jev-demos](https://github.com/bud-ro/jev-demos) - Jev が何を得意とするかを試すために作られたデモです。
- [Jev Classifier](https://jevclassifier.vercel.app) - 投稿を種類、品質、感情、トーンで仕分けするホスト済みのデモです。
- [Jev Guard demo](https://guard-jev.vercel.app) - ホスト済みのコメントモデレーションのプレイグラウンドです。
- [Companion](https://jev-demo.vercel.app) - 1 ターンあたり 9 つの型付き質問に答えて実行、確認、放棄を決めるホスト済みのロボットインターフェースで、生成テキストは使いません。
- [Jev System One](https://github.com/haseeb-heaven/jev-system-one) - OpenAI が回答し、Jev が別途、関連性、信頼性、品質を採点するターミナルインターフェースです。
- [jev-web-analyzer](https://github.com/replynodes/jev-web-analyzer) - SaaS のランディングページを Markdown に変換し、初回訪問者が何を理解できるかについて Jev に十個の限定された Choice の質問をして、創業者向けの分析として表示します。

## コマンドライン

- [jev-axi](https://github.com/shiftynick/jev-axi) - エージェントと人間のためのシェル動詞で、pick、rate、check、rank、triage、guard を提供します。
- [semdecide](https://github.com/sharziki/semdecide) - Unix のパイプラインと CI のための型付きの意味的判断です。
- [every](https://github.com/sufianetaouil/every) - コードベース内のすべての関数に yes/no の質問を投げる、パターンが質問である grep です。
- [typesafe-cli](https://github.com/y0usaf/typesafe-cli) - Noul、choice、score の回答をシェルから数値として得られます。
- [jev-shell-history](https://github.com/mrnugget/jev-shell-history) - Jev がランク付けする、fish 風の zsh 履歴補完です。
- [jgrep](https://github.com/keltokhy/jgrep) - 平易な英語の説明に当てはまる行を出力し、`tail -f` からのストリームにも支出上限のもとで対応し、SMS スパムではキーワード grep の F1 0.72 に対し 0.91 を報告しています。
- [jev-cli by jtsang4](https://github.com/jtsang4/jev-cli) - 型付きの質問を入力すると、構造化された JSON の回答が返ります。
- [jev-cli by tumf](https://github.com/tumf/jev-cli) - Choice、Score、Noul をラップする、依存関係なしの Python CLI です。
- [jevctl](https://github.com/Nasrallah-AL/jev-cli) - キーを OS のキーチェーンに保存する npm 製 CLI で、シェルから型付きの判定を得られます。

## コミュニティクライアント

- [jev-go](https://github.com/Gaurav-Gosain/jev-go) - 型付きの判定と確率を返す Go クライアントです。
- [typesafe-go](https://github.com/zhirschtritt/typesafe-go) - TypeSafe API 向けの Go らしい SDK です。
- [typesafe-ai](https://github.com/Twister915/typesafe-ai) - 非同期とブロッキングのバックエンド、そして観測可能なリトライを備えた Rust クライアントです。
- [typesafe-ai-rs](https://github.com/gilljon/typesafe-ai-rs) - 非同期とブロッキングに対応した独立系の Rust SDK です。
- [jev](https://github.com/dannote/jev) - OTP 向けに作られた Elixir クライアントで、GenServer から Jev に応答し、回答をパターンマッチできます。
- [typesafe-sdk](https://github.com/joshmn/typesafe-sdk) - Ruby クライアントです。
- [ruby_llm-typesafe](https://github.com/kieranklaassen/ruby_llm-typesafe) - RubyLLM 2 の構造化出力プロバイダとしての TypeSafe です。
- [laravel-typesafe-jev](https://github.com/Butochnikov/laravel-typesafe-jev) - 型付きのレスポンス、非同期リクエスト、テスト用のフェイクを備えた Laravel 連携です。
- [typesafe-sdk-java](https://github.com/Premo-Cloud/typesafe-sdk-java) - Java クライアントです。
- [typesafe-sdk-swift](https://github.com/alterhq/typesafe-sdk-swift) - Swift クライアントです。
- [TypeSafeAI.Net](https://github.com/Hawxy/TypeSafeAI.Net) - .NET の SDK です。
- [zio-typesafe-ai](https://github.com/jamesward/zio-typesafe-ai) - ZIO 上の Scala クライアントです。
- [jev-dsl](https://github.com/inanna-malick/jev-dsl) - 型付きのパケットと推論された回答型を備えた Haskell の DSL です。
- [advocaat](https://github.com/pithings/advocaat) - 自分のデータについて質問するための小さな TypeScript クライアントです。
- [jod](https://github.com/mateonunez/jod) - Jev の上に載せた Zod 風のスキーマで、状態をローカルで検証してから型付きの回答を射影します。
- [n8n-nodes-typesafe-ai](https://github.com/DomMonte/n8n-nodes-typesafe-ai) - yes/no、choice、score の質問に対応する n8n のコミュニティノードです。
- [jevclient](https://github.com/AboveColin/jevclient) - 非同期の Python クライアントで、確率と選択が返り、解析すべき散文はありません。
- [s1-rs](https://github.com/AbdelStark/s1-rs) - Rust の enum と struct を Choice、Score、Noul の質問に変え、コンパイル時に検査され confidence でゲートされた回答を返します。
- [typesafe-rs](https://github.com/AbdelStark/typesafe-rs) - レイテンシを最優先にした Rust クライアントで、crates.io で公開されています。
- [kunobi-jev](https://github.com/kunobi-ninja/kunobi-jev) - System One API 向けの Rust クライアントです。
- [jev-go by Stumble](https://github.com/Stumble/jev-go) - Jev 向けの Go クライアントです。
- [typesafe-ai-rails](https://github.com/GenieRobot/typesafe-ai-rails) - コミュニティの Ruby gem の上に構築された Rails 連携です。
- [typesafe_sdk by nshkrdotcom](https://github.com/nshkrdotcom/typesafe_sdk) - TypeScript の AI SDK の Elixir 移植で、TypeSafe プロバイダを備えます。
- [ruby_decision_model](https://github.com/obie/ruby_decision_model) - 判断モデル向けの Ruby クライアントで、OpenRouter と TypeSafe のプロバイダを 1 つのインターフェースの背後に置き、標準ライブラリのみで動きます。
- [zod-jev](https://github.com/jomatsu/zod-jev) - 意味的なルールを備えた Zod 4 のスキーマで、形状の検査は Zod に残し、意味の検査は 1 リクエストで Jev に送られ、Zod の issue として返ります。
- [typesafeai-dotnet-sdk](https://github.com/saibimajdi/typesafeai-dotnet-sdk) - 型付きの Noul、Choice、Score の質問に対応するコミュニティ製 .NET SDK です。
- [typesafe-sdk-go by Tangerg](https://github.com/Tangerg/typesafe-sdk-go) - サードパーティ依存のない Go SDK です。
- [swift-typesafe](https://github.com/ainame/swift-typesafe) - Python SDK の API に倣った Swift 6.4 の SDK で、Apple のプラットフォームと Linux に対応します。
- [typesafe-sdk-php](https://github.com/Butochnikov/typesafe-sdk-php) - 同期呼び出し、Guzzle の promise、PSR-3 ロギングに対応した PHP クライアントです。

## 記事と講演

### ローンチ関連記事

- [Introducing System One Models and Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) - ローンチ記事で、アーキテクチャ、RLCD、ベンチマーク、価格、FAQ を扱います。
- [Launch thread by Diogo Almeida](https://x.com/CompleteSkeptic/status/2099925682726002904) - RLCD で訓練された判断モデルはチャットより価値への近道だという創業者の主張です。
- [Hacker News launch thread](https://news.ycombinator.com/item?id=49717558) - ベンチマークに対する懐疑的な読みが集まっている場所です。
- [The Register](https://www.theregister.com/ai-and-ml/2026/09/16/typesafe-ai-debuts-model-for-machines-that-plays-doom/5296711) - ローンチの報道、Doom のデモ、$40M のシードラウンドを扱います。
- [Latent Space](https://www.latent.space/p/ainews-jev-a-system-one-model-that) - ローンチ当日のまとめです。
- [TypeSafe AI emerges from stealth with $40M](https://finance.yahoo.com/technology/ai/articles/typesafe-ai-emerges-stealth-40m-190000776.html) - 資金調達の発表です。
- [The Rundown](https://www.therundown.ai/news/typesafe-jev-ai-decisions-software) - 短いローンチの要約です。
- [DataCamp](https://www.datacamp.com/blog/system-one-models-jev) - プリミティブ、価格、ベンダーの評価についての第三者による解説です。
- [How does Jev work? RLCD and parallel inference](https://www.explainx.ai/blog/how-does-jev-work-rlcd-system-one-model-explained-2026) - 訓練手法について公開されている内容です。
- [TypeSafe Jev: the first decision-only model class](https://www.developersdigest.tech/blog/typesafe-jev-system-one-models-release-guide-2026) - リリース週の技術まとめで、API、評価、アダプタ、スキルを扱います。
- [TechCrunch](https://techcrunch.com/2026/09/18/a-new-kind-of-ai-model-from-a-chatgpt-inventor-is-thrilling-developers/) - 2 日後の時点の記事で、需要により API が一時停止したことと、フロンティアラボにはなりたくないという Almeida の発言を伝えます。
- [Forkast](https://forkast.news/typesafe-ais-jev-is-not-an-llm-and-that-may-be-the-point/) - ビジネス面の記事で、報じられた評価額と Every による速度とコストの数値を扱います。
### 第三者による計測

- [Testing Jev on public and private data](https://amankumar.ai/blogs/jev-measured) - 2 つの GPT モデルに対する 16,000 回の呼び出しで、勝てる場面、崩れる場面、しきい値の決め方を示します。
- [One judge call, or twelve dimension scores?](https://agentjournal.dev/blog/llm-judge-vs-feature-extraction/) - 3 つの分類タスクで、1 つの直接的な質問と、重みを当てはめた 12 の次元スコアを比較します。
- [Jev vs Mistral and Gemini for event validation](https://nearhere.events/blog/typesafe-jev-mistral-gemini-event-validation) - 地域のイベント情報を題材にした直接比較で、コストとレイテンシも示します。
- [Mini-Vibe Check](https://every.to/also-true-for-humans/mini-vibe-check-typesafe-s-jev-judged-everything-i-ve-written-in-0-7-seconds) - Every が 1 セント未満で、文章アーカイブに対し 1,709 件の判定を実行します。
- [TypeSafe Jev played chess](https://dev.to/maximsaplin/typesafe-jev-played-chess-and-landed-next-to-reasoning-models-28ga) - 合法手の Choice により、推論モデルに並ぶ位置に付けます。
- [Jev, Sorted](https://pearpages.com/blog/2026/09/16/jev-sorted-what-typesafes-system-one-model-actually-is-and-what-is-still-just-a-claim) - ローンチ時の主張のうち、一次情報を読んでも生き残るのはどれかを検証します。
- [Typed decisions, not chat](https://warmersun.com/jev/) - 公表された主張と、公開された証拠が裏付ける内容を切り分けます。
- [TypeSafeのJevを正しく驚く](https://zenn.dev/nwn/articles/824026c76116e0) - 日本語の記事で、Gemma 上でロジットの近道を再現し、Mario のハーネスで LLM と比較します。
- [TypeSafe Jev vs Claude Code: 4 models, 2 real jobs](https://primeline.cc/blog/typesafe-jev-pre-registered-test) - 約 9,750 回の呼び出しによる事前登録の検証で、質問の種類ごとの較正誤差、コミット分類では Jev が優勢、ナレッジベースへの仕分けでは劣勢、棄権がその差を埋めることを示します。
- [Jev, three days in](https://aiwithmike.substack.com/p/jev-three-days-in-what-is-known-what) - 分かっていること、推測されていること、何に向いているかを、独立した数値とともにまとめます。
### エッセイとスレッド

- [Building a harness with Jev](https://www.langchain.com/blog/building-a-harness-with-jev) - モデルのルーティングと、危険なツール呼び出しを型付きの判断でゲートすることについての LangChain の記事です。
- [Jev, from a developer's angle](https://flaviocopes.com/jev/) - トリアージ、RAG のフィルタリング、引用の検証、confidence のゲートを、コード付きで扱います。
- [Jev is the fish at the poker table](https://backnotprop.com/blog/jev-poker/) - 較正された非生成のモデルが何のためにあるのかについてのエッセイです。
- [Jev as a command safety reviewer](https://x.com/rauchg/status/2100307962262872105) - Jev がすべての fx コマンドをレビューすることについての Guillermo Rauch の記事です。
- [Jev Typewriter](https://x.com/stevekrouse/status/2100287368221659289) - Steve Krouse による 16 判定のデモと動画です。
- [He says he co-invented ChatGPT. His new AI will not write a word](https://dev.to/gabrielanhaia/he-says-he-co-invented-chatgpt-his-new-ai-jev-wont-write-a-word-e3c) - Vercel AI SDK 連携のひととおりの解説です。
- [Testing Jev for Pi extensions](https://reddit.com/r/PiCodingAgent/comments/1whsav6/anyone_else_testing_out_typesafe_ais_new_system/) - Jev をツール利用の安全レイヤーとして使うビルダーたちの記事です。
- [jev 同士に五目並べで対戦させた](https://zenn.dev/mizchi/articles/jev-plays-gomoku) - 日本語の記事で、Jev 同士の五目並べを、ソースと計測ログ付きで扱います。
- [Jev's Architecture Unmasked](https://archerhume.com/posts/jevs-architecture-unmasked/) - 10,000 回の呼び出しによる調査で、状態を共有し並列に分岐するアーキテクチャを再構成しており、上記の kev はこれを基に作られています。
- [OpenJev on Hacker News](https://news.ycombinator.com/item?id=49752041) - ロジットを直接読むことがそもそも新しいのかどうかを、長く論じています。
- [Open-sourced Jev architecture last year](https://news.ycombinator.com/item?id=49736660) - 非自己回帰な型付き判断に関する先行技術の主張と、実際の違いはゼロショットの汎用性だという反論です。
