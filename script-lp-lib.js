/* =====================================================================
   script-lp-lib.js — LP Library Panel
   ===================================================================== */
(function () {
  'use strict';

  /* ─── Data ────────────────────────────────────────────────────────── */
  var LP_ITEMS = [
    {
      id: "lp-hero-nts-purpose-guide-001",
      name: "目的別ガイド Hero",
      type: "section", category: "lp/hero", status: "draft", rank: 1,
      source: "A社 (B2B LP)",
      bestFor: ["B2B LP", "補助金", "士業", "目的分岐あり"],
      avoidFor: ["単一商品LP", "エンタメ", "EC"],
      hasPreview: true, hasPrompt: true,
      qa: { responsive: "required", accessibility: "required", legalCopy: "not_applicable" },
      readme: "# 目的別ガイド Hero\n\n**品質:** ドラフト\n**ID:** `lp-hero-nts-purpose-guide-001`\n\n## 概要\n目的別に複数の選択肢を見せながら、ユーザーを一覧・診断・相談へ誘導するB2B向けHero。\n\n## 使うべき場面\n- 補助金、士業、B2B SaaS、業務支援など、ユーザーの目的が複数に分かれるLP\n- いきなり問い合わせではなく、まず「自分に合うカテゴリ」を選ばせたいページ\n- サービス一覧・記事一覧の上部\n\n## 使わない場面\n- 単一商品の購入LP\n- 1つのCTAだけを強く押したいページ\n- エンタメ系や感情訴求が主役のページ\n\n## 実装メモ\n- 左側に価値訴求、右側に目的カードを置く2カラム構成\n- モバイルでは1カラムにし、コピー → CTA → 目的カードの順\n- カードの目的タグは案件に合わせて必ず置き換える",
      prompt: "# Cursor Prompt\n\n**目的:** 目的別ガイド Hero をファーストビューとして導入してください。\n\n**実装方針:**\n- Next.js / Tailwind なら HTML構造をReactコンポーネント化\n- Button、Card、Badge は既存UI基盤があればそれを使用\n- shadcn/ui 導入済みなら Button/Badge を優先利用\n\n**変更してよいこと:**\n- 見出し、リード文、CTA文言\n- 目的カードのカテゴリ\n- 色トークン、余白、画像\n\n**変更してはいけないこと:**\n- 左コピー・CTA・右目的カードの役割分担\n- モバイルでコピーより先に装飾ビジュアルを出すこと\n- CTAが2つある場合のprimary/secondary優先順位\n\n**完了条件:**\n- 375px / 768px / 1024px / 1440px で確認\n- CTAが視認できる\n- 目的カードがタップ可能に見える",
      checks: "## チェックリスト\n\n- [ ] 375px でHero内に横スクロールが出ない\n- [ ] 右側カードがモバイルで読みやすい順に並ぶ\n- [ ] Primary CTA が1つだけ明確\n- [ ] 目的カードのラベルが案件に合っている\n- [ ] 背景装飾がコピーの可読性を邪魔しない\n- [ ] `aria-labelledby` または適切な見出し構造がある"
    },
    {
      id: "lp-filter-nts-guide-001",
      name: "絞り込みフィルター パネル",
      type: "section", category: "lp/filter-search", status: "draft", rank: 2,
      source: "A社 (B2B LP)",
      bestFor: ["一覧LP", "記事インデックス", "補助金カタログ", "動画ライブラリ"],
      avoidFor: ["コンテンツ数が少ない", "単一CTA LP"],
      hasPreview: true, hasPrompt: true,
      qa: { responsive: "required", accessibility: "required", legalCopy: "not_applicable" },
      readme: "# 絞り込みフィルター パネル\n\n**品質:** ドラフト\n**ID:** `lp-filter-nts-guide-001`\n\n## 概要\n一覧LPの上部に置く検索・絞り込みパネル。補助金一覧・記事一覧・動画一覧・サービス一覧に転用しやすい。\n\n## 使うべき場面\n- 4件以上のコンテンツやサービスを一覧で見せる\n- ユーザーが目的や条件で絞り込む必要がある\n- 検索欄・ソート・タグフィルタをまとめたい\n\n## 使わない場面\n- コンテンツ数が少ない\n- CTAを1つに集中させたい\n- 絞り込み機能を実装する予定がない\n\n## 実装メモ\n- 検索欄・ソート・カテゴリタグ・情報タグを分ける\n- フィルタがダミーの場合は将来のデータ構造も決める",
      prompt: "# Cursor Prompt\n\n**目的:** 一覧LPに絞り込みフィルターパネルを導入し、ユーザーが目的別にコンテンツを探せる導線を作ってください。\n\n**実装方針:**\n- フィルタ対象データ配列がある場合は、タグと検索欄を実際の絞り込みに接続\n- 未接続の場合は `data-filter` 属性や将来のprops名を明示\n\n**変更してよいこと:**\n- タグ名、件数、ソート項目\n- 検索 placeholder\n\n**変更してはいけないこと:**\n- 検索・ソート・タグ群の視覚的な役割分担\n\n**完了条件:**\n- タグが折り返しても美しく収まる\n- キーボード操作でフォーカスできる",
      checks: "## チェックリスト\n\n- [ ] 375px でタグが横にはみ出さない\n- [ ] 検索欄に label または aria-label がある\n- [ ] active状態が色だけに依存していない\n- [ ] タグの件数と一覧件数が矛盾しない\n- [ ] ダミーUIなら未接続の範囲が明記されている"
    },
    {
      id: "lp-cardgrid-nts-guide-001",
      name: "ガイド カードグリッド",
      type: "section", category: "lp/card-grid", status: "draft", rank: 3,
      source: "A社 (B2B LP)",
      bestFor: ["サービス/記事カタログ", "専門LP カード"],
      avoidFor: ["1件だけを強く見せたい", "EC 商品画像主役"],
      hasPreview: true, hasPrompt: true,
      qa: { responsive: "required", accessibility: "required", legalCopy: "not_applicable" },
      readme: "# ガイド カードグリッド\n\n**品質:** ドラフト\n\n## 概要\n専門LP・記事・サービス・動画などのカードを一覧表示するグリッド。タグ・要点・メタ情報・CTAを1枚にまとめる。\n\n## 使うべき場面\n- 一覧から詳細ページへ送る\n- 複数サービスを比較させる\n- コンテンツごとにタグやメタ情報がある\n\n## 実装メモ\n- データ配列から生成する形にすると再利用しやすい\n- カード内のCTAはすべて同じ文言にせず遷移先の行動に合わせる",
      prompt: "# Cursor Prompt\n\n**目的:** ガイドカードグリッドを一覧セクションとして導入してください。\n\n**実装方針:**\n- カード情報は配列化\n- React なら `items.map(...)` で生成し、カード構造を重複させない\n- 画像がない場合も崩れないサムネイル代替を用意\n\n**完了条件:**\n- 3件・6件・9件で破綻しない\n- カード高さの差が極端にならない",
      checks: "## チェックリスト\n\n- [ ] カードがデータ配列から生成されている\n- [ ] 見出しが長くてもカードが壊れない\n- [ ] 画像/サムネイルに aspect-ratio がある\n- [ ] CTAがリンクとして認識できる"
    },
    {
      id: "lp-hero-subsidy-detail-001",
      name: "詳細指標付き Hero",
      type: "section", category: "lp/hero", status: "draft", rank: 4,
      source: "A社 (B2B LP)",
      bestFor: ["個別サービスLP", "補助金詳細", "高単価B2B"],
      avoidFor: ["指標が未確定", "法務確認前の数値"],
      hasPreview: true, hasPrompt: true,
      qa: { responsive: "required", accessibility: "required", legalCopy: "check_required" },
      readme: "# 詳細指標付き Hero\n\n**品質:** ドラフト\n\n## 概要\n個別サービス・制度・高単価商材の詳細LPに使うHero。左に訴求、右に主要指標ボードを置き、信頼と具体性を同時に出す。\n\n## 使うべき場面\n- 補助金・助成金・士業・B2Bコンサル・SaaS詳細ページ\n- 金額・期限・対象・ステータスなどの定量情報が重要\n\n## 注意\n補助金・金融・医療・法務系では、保証に見える表現を避ける。「可能性」「確認」「相談時に整理」へ寄せる。",
      prompt: "# Cursor Prompt\n\n**目的:** 個別詳細ページのFVとして詳細指標付きHeroを導入してください。\n\n**実装方針:**\n- 右側の指標ボードは数値や条件が未確定なら「要確認」「相談時に確認」など安全な表現に\n- 保証・代行・採択確約に見える表現は避ける\n\n**完了条件:**\n- 指標の根拠または未確定ラベルがある\n- モバイルでもCTAが見える",
      checks: "## チェックリスト\n\n- [ ] 数値・期限・対象条件に根拠または未確定ラベルがある\n- [ ] 保証表現・代行表現・過度な成果断定がない\n- [ ] 右側ボードがモバイルで自然に下へ回る\n- [ ] CTAが2つある場合 primary/secondary が明確"
    },
    {
      id: "lp-summary-grid-001",
      name: "3秒理解 サマリーグリッド",
      type: "section", category: "lp/summary", status: "draft", rank: 5,
      source: "A社 (B2B LP)",
      bestFor: ["複雑なオファーのまとめ", "B2B", "補助金概要"],
      avoidFor: ["短いLP", "Hero だけで十分"],
      hasPreview: true, hasPrompt: true,
      qa: { responsive: "required", accessibility: "required", legalCopy: "check_required" },
      readme: "# 3秒理解 サマリーグリッド\n\n**品質:** ドラフト\n\n## 概要\n複雑な制度やサービスの要点を、3秒で把握できるカードグリッドにするセクション。\n\n## 使うべき場面\n- ページ本文が長い\n- ユーザーが最初に知りたい論点が複数ある\n- Hero直後に理解を補強したい",
      prompt: "# Cursor Prompt\n\n**目的:** Hero直後にサマリーグリッドを導入し、複雑なサービスの要点を短時間で理解できるようにしてください。\n\n**実装方針:**\n- カードは3-4枚を基本\n- 各カードは「ユーザーが知りたいこと」を見出しに、説明文は2行程度に\n\n**完了条件:**\n- 見出しだけでページ価値が伝わる\n- カードがモバイルで縦に自然に並ぶ",
      checks: "## チェックリスト\n\n- [ ] カード数は3-4枚\n- [ ] 各カードの役割が重複していない\n- [ ] 見出しがユーザー視点\n- [ ] 説明文が長すぎない"
    },
    {
      id: "lp-diagnosis-check-001",
      name: "簡易診断 チェックパネル",
      type: "section", category: "lp/diagnosis", status: "draft", rank: 6,
      source: "A社 (B2B LP)",
      bestFor: ["リード資格確認", "補助金対象確認", "B2Bファネル"],
      avoidFor: ["診断が法務上危険"],
      hasPreview: true, hasPrompt: true,
      qa: { responsive: "required", accessibility: "required", legalCopy: "check_required" },
      readme: "# 簡易診断 チェックパネル\n\n**品質:** ドラフト\n\n## 概要\nチェック項目を選ぶと、相談前の対象可能性や確認論点を整理できる診断セクション。\n\n## 注意\n診断結果は保証ではなく「簡易確認」「相談時に確認する論点」として扱う。",
      prompt: "# Cursor Prompt\n\n**目的:** CV前の低摩擦導線として簡易診断チェックパネルを導入してください。\n\n**実装方針:**\n- チェック項目は3-5個に絞る\n- 結果文は「可能性」「確認」「相談時に整理」など安全な表現に\n- React なら状態管理はローカルstateで十分\n\n**完了条件:**\n- checkbox をキーボードで操作できる\n- 免責注記が表示されている",
      checks: "## チェックリスト\n\n- [ ] checkbox に label が紐づいている\n- [ ] キーボードで操作できる\n- [ ] 結果表示が保証表現になっていない\n- [ ] 免責注記がある\n- [ ] CTAが診断結果の近くにある"
    },
    {
      id: "lp-usecase-before-after-001",
      name: "Before/After 効果比較",
      type: "section", category: "lp/usecase", status: "draft", rank: 7,
      source: "A社 (B2B LP)",
      bestFor: ["変化ストーリー", "課題→解決提示"],
      avoidFor: ["事実のみの規制ページ"],
      hasPreview: true, hasPrompt: true,
      qa: { responsive: "required", accessibility: "required", legalCopy: "check_required" },
      readme: "# Before/After 効果比較\n\n**品質:** ドラフト\n\n## 概要\n導入前の課題と導入後の未来を並べて、サービス価値を直感的に伝えるセクション。\n\n## 使うべき場面\n- 現状課題と改善後の差分を見せたい\n- 無形サービスの価値を具体化したい",
      prompt: "# Cursor Prompt\n\n**目的:** Before/After 比較セクションを導入し、サービス利用後の変化を理解できるようにしてください。\n\n**実装方針:**\n- Before は現在の摩擦、After は到達状態として書く\n- 成果を保証する表現ではなく、改善方向や期待できる状態として書く\n\n**完了条件:**\n- Before/After の対比が1対1で対応\n- モバイルで Before → After の順に読める",
      checks: "## チェックリスト\n\n- [ ] Before と After が対応している\n- [ ] 成果保証の表現がない\n- [ ] モバイルで読み順が自然\n- [ ] 箇条書きが長すぎない"
    },
    {
      id: "lp-flow-consultation-001",
      name: "相談フロー ステップ",
      type: "section", category: "lp/flow", status: "draft", rank: 8,
      source: "A社 (B2B LP)",
      bestFor: ["相談LP", "オンボーディング", "サービスプロセス説明"],
      avoidFor: ["セルフサーブ決済"],
      hasPreview: true, hasPrompt: true,
      qa: { responsive: "required", accessibility: "required", legalCopy: "check_required" },
      readme: "# 相談フロー ステップ\n\n**品質:** ドラフト\n\n## 概要\n相談・導入・確認・支援などの流れをステップ表示するセクション。\n\n## 使うべき場面\n- 問い合わせ前の不安を下げたい\n- サービス提供プロセスを透明化したい",
      prompt: "# Cursor Prompt\n\n**目的:** 相談フローステップを導入し、問い合わせ後の流れを分かりやすくしてください。\n\n**実装方針:**\n- 4-5ステップを基本\n- 各ステップは「何をするか」と「ユーザーが準備するもの」を分けて書く\n\n**完了条件:**\n- 相談前の不安が減る説明\n- モバイルでステップが読みやすい",
      checks: "## チェックリスト\n\n- [ ] ステップ順が実務と一致\n- [ ] 各ステップの説明が短い\n- [ ] モバイルでカード間の余白が十分\n- [ ] CTA前に置く場合、不安解消の役割を果たしている"
    },
    {
      id: "lp-faq-legal-safe-001",
      name: "法務配慮 FAQ アコーディオン",
      type: "section", category: "lp/faq", status: "draft", rank: 9,
      source: "A社 (B2B LP)",
      bestFor: ["規制業界", "補助金・金融・医療", "士業LP"],
      avoidFor: ["法務確認前の回答"],
      hasPreview: true, hasPrompt: true,
      qa: { responsive: "required", accessibility: "required", legalCopy: "check_required" },
      readme: "# 法務配慮 FAQ アコーディオン\n\n**品質:** ドラフト\n\n## 概要\n法務・コンプライアンス配慮が必要なLPで使うFAQアコーディオン。断定を避け、確認論点として回答する。\n\n## 使うべき場面\n- 補助金・士業・金融・医療・契約・規制領域\n- 問い合わせ前の不安を解消したい",
      prompt: "# Cursor Prompt\n\n**目的:** 法務配慮FAQアコーディオンを導入し、問い合わせ前の不安を安全な表現で解消してください。\n\n**実装方針:**\n- Radix Accordion または shadcn Accordion が導入済みならそれを使う\n- 未導入なら button で開閉し `aria-expanded` を正しく付ける\n- 回答文は断定ではなく「確認できます」「相談時に整理します」へ寄せる\n\n**完了条件:**\n- キーボードで開閉できる\n- 法務リスクのある断定がない",
      checks: "## チェックリスト\n\n- [ ] FAQ項目が実際の問い合わせ不安に対応\n- [ ] 回答が保証表現になっていない\n- [ ] button で開閉している\n- [ ] `aria-expanded` がある\n- [ ] キーボード操作できる"
    },
    {
      id: "lp-cta-companion-support-001",
      name: "伴走支援 CTA セクション",
      type: "section", category: "lp/cta", status: "draft", rank: 10,
      source: "A社 (B2B LP)",
      bestFor: ["継続支援提案", "顧問・伴走サービス", "LTV向上"],
      avoidFor: ["単発EC", "支援範囲未定"],
      hasPreview: true, hasPrompt: true,
      qa: { responsive: "required", accessibility: "required", legalCopy: "check_required" },
      readme: "# 伴走支援 CTA セクション\n\n**品質:** ドラフト\n\n## 概要\n単発の申請・問い合わせで終わらせず、採択後や導入後の伴走支援へつなげる大型CTAセクション。\n\n## 使うべき場面\n- 継続支援・顧問・伴走・導入後サポートを提案したい\n- サービス単価やLTVを上げたい",
      prompt: "# Cursor Prompt\n\n**目的:** 伴走支援CTAを導入し、単発CVではなく継続支援への期待を作ってください。\n\n**実装方針:**\n- 左側に旧来の課題、右側に伴走支援のロードマップを置く\n- 継続支援の範囲を誇張しない\n\n**完了条件:**\n- 継続支援の価値が1セクションで伝わる\n- CTAが自然に押せる位置にある",
      checks: "## チェックリスト\n\n- [ ] 継続支援の実体と文言が一致\n- [ ] 成果保証に見える表現がない\n- [ ] ロードマップがモバイルで読める\n- [ ] CTAが下部に自然に配置されている"
    },
    {
      id: "lp-hero-video-library-001",
      name: "動画ライブラリ Hero",
      type: "section", category: "lp/hero", status: "candidate", rank: 11,
      source: "A社 (B2B LP)",
      bestFor: ["動画ライブラリLP", "コンテンツハブ"],
      avoidFor: [],
      hasPreview: false, hasPrompt: false,
      qa: {},
      readme: "# 動画ライブラリ Hero\n\n**品質:** 候補\n\n動画ライブラリLPのファーストビューとして使うHero。\n\n※ README・プロンプト未整備",
      prompt: "※ プロンプト未整備",
      checks: "※ チェックリスト未整備"
    },
    {
      id: "lp-video-queue-ticker-001",
      name: "次の動画 ティッカー",
      type: "section", category: "lp/content-strip", status: "candidate", rank: 12,
      source: "A社 (B2B LP)",
      bestFor: ["動画キュー", "コンテンツストリップ"],
      avoidFor: [],
      hasPreview: false, hasPrompt: false,
      qa: {},
      readme: "# 次の動画 ティッカー\n\n**品質:** 候補\n\n動画一覧LPでの「次の動画」表示帯。\n\n※ README未整備",
      prompt: "※ プロンプト未整備",
      checks: "※ チェックリスト未整備"
    },
    {
      id: "lp-video-card-grid-001",
      name: "動画カード グリッド",
      type: "section", category: "lp/card-grid", status: "candidate", rank: 13,
      source: "A社 (B2B LP)",
      bestFor: ["動画一覧", "サムネイルグリッド"],
      avoidFor: [],
      hasPreview: false, hasPrompt: false,
      qa: {},
      readme: "# 動画カード グリッド\n\n**品質:** 候補\n\n動画LPのカードグリッド。\n\n※ README未整備",
      prompt: "※ プロンプト未整備",
      checks: "※ チェックリスト未整備"
    },
    {
      id: "lp-side-category-panel-001",
      name: "サイドカテゴリ パネル",
      type: "section", category: "lp/sidebar", status: "candidate", rank: 14,
      source: "A社 (B2B LP)",
      bestFor: ["カテゴリナビ", "サイドバーフィルター"],
      avoidFor: [],
      hasPreview: false, hasPrompt: false,
      qa: {},
      readme: "# サイドカテゴリ パネル\n\n**品質:** 候補\n\n一覧LPのサイドバーカテゴリナビゲーション。\n\n※ README未整備",
      prompt: "※ プロンプト未整備",
      checks: "※ チェックリスト未整備"
    },
    {
      id: "lp-top-news-ticker-001",
      name: "ニュース ティッカーストリップ",
      type: "section", category: "lp/news-strip", status: "candidate", rank: 15,
      source: "A社 (B2B LP)",
      bestFor: ["お知らせ", "トップバナー"],
      avoidFor: [],
      hasPreview: false, hasPrompt: false,
      qa: {},
      readme: "# ニュース ティッカーストリップ\n\n**品質:** 候補\n\nLP上部の速報・お知らせ表示帯。\n\n※ README未整備",
      prompt: "※ プロンプト未整備",
      checks: "※ チェックリスト未整備"
    },
    {
      id: "lp-service-reorder-fv-001",
      name: "サービス再構成 Hero",
      type: "section", category: "lp/hero", status: "candidate", rank: 16,
      source: "A社 (B2B LP)",
      bestFor: ["トップページ再構成", "サービスメニュー型Hero"],
      avoidFor: [],
      hasPreview: false, hasPrompt: false,
      qa: {},
      readme: "# サービス再構成 Hero\n\n**品質:** 候補\n\nサービス一覧を並べ替えてトップとして整理するHero。\n\n※ README未整備",
      prompt: "※ プロンプト未整備",
      checks: "※ チェックリスト未整備"
    },
    {
      id: "lp-industry-specific-section-001",
      name: "業種別 セクション",
      type: "section", category: "lp/segmentation", status: "candidate", rank: 17,
      source: "A社 (B2B LP)",
      bestFor: ["業種セグメンテーション", "ペルソナ別LP"],
      avoidFor: [],
      hasPreview: false, hasPrompt: false,
      qa: {},
      readme: "# 業種別 セクション\n\n**品質:** 候補\n\n業種・ペルソナによって訴求を切り替えるセクション。\n\n※ README未整備",
      prompt: "※ プロンプト未整備",
      checks: "※ チェックリスト未整備"
    },
    {
      id: "lp-profile-expand-section-001",
      name: "専門家プロフィール 展開",
      type: "section", category: "lp/trust", status: "candidate", rank: 18,
      source: "A社 (B2B LP)",
      bestFor: ["信頼構築", "コンサル紹介"],
      avoidFor: [],
      hasPreview: false, hasPrompt: false,
      qa: {},
      readme: "# 専門家プロフィール 展開\n\n**品質:** 候補\n\n専門家・コンサルタントのプロフィールを展開するセクション。\n\n※ README未整備",
      prompt: "※ プロンプト未整備",
      checks: "※ チェックリスト未整備"
    },
    {
      id: "dashboard-kpi-strip-001",
      name: "ダッシュボード KPIストリップ",
      type: "section", category: "dashboard/kpi", status: "candidate", rank: 19,
      source: "A社 (Dashboard)",
      bestFor: ["ダッシュボード", "KPIサマリー", "指標ストリップ"],
      avoidFor: [],
      hasPreview: false, hasPrompt: false,
      qa: {},
      readme: "# ダッシュボード KPIストリップ\n\n**品質:** 候補\n\nダッシュボード上部のKPI一覧ストリップ。\n\n※ README未整備",
      prompt: "※ プロンプト未整備",
      checks: "※ チェックリスト未整備"
    },
    {
      id: "dashboard-action-card-001",
      name: "AI提案 アクションカード",
      type: "section", category: "dashboard/ai-action", status: "candidate", rank: 20,
      source: "A社 (Dashboard)",
      bestFor: ["AIレコメンデーション", "アクションカード", "ダッシュボードウィジェット"],
      avoidFor: [],
      hasPreview: false, hasPrompt: false,
      qa: {},
      readme: "# AI提案 アクションカード\n\n**品質:** 候補\n\nAIがレコメンドするアクションを表示するダッシュボードカード。\n\n※ README未整備",
      prompt: "※ プロンプト未整備",
      checks: "※ チェックリスト未整備"
    }
  ];

  /* ─── HTML Previews (standalone iframe content) ──────────────────── */
  var _BASE_CSS = [
    '@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Noto+Sans+JP:wght@400;500;700;800&display=swap");',
    ':root{--bg-base:#eef2f7;--bg-white:#fff;--text-primary:#1a2b3c;--text-secondary:#4a5568;--text-muted:#718096;',
    '  --accent-teal:#00b894;--accent-navy:#1a4c8e;--accent-gold:#f5a623;',
    '  --border-subtle:#d1dce8;--border-card:rgba(26,76,142,.15);',
    '  --grad-primary:linear-gradient(135deg,#0b4ea2 0%,#1368d8 100%);',
    '  --grad-section:linear-gradient(180deg,#f8fbff 0%,#eef7ff 100%);',
    '  --grad-surface:linear-gradient(135deg,#fff 0%,#f3f9ff 100%);',
    '  --grad-cta:linear-gradient(135deg,#1a4c8e 0%,#0f4a8f 48%,#1368d8 100%);',
    '  --grad-accent:linear-gradient(90deg,#1d4ed8 0%,#22d3ee 100%);}',
    '*{box-sizing:border-box;margin:0;padding:0;}',
    'body{font-family:"Noto Sans JP","Hiragino Kaku Gothic ProN",sans-serif;background:var(--bg-base);color:var(--text-primary);line-height:1.7;-webkit-font-smoothing:antialiased;}',
    'h1,h2,h3,h4{font-family:"Poppins","Noto Sans JP",sans-serif;}',
    '.sec{padding:64px 24px;}.sec-white{background:#fff;}.sec-grad{background:var(--grad-section);}.sec-cta{background:var(--grad-cta);}',
    '.inner{max-width:900px;margin:0 auto;}',
    '.nts-card{background:var(--grad-surface);border-radius:16px;box-shadow:0 14px 36px rgba(15,76,129,.08);position:relative;overflow:hidden;}',
    '.nts-card::before{content:"";position:absolute;left:16px;right:16px;top:0;height:3px;border-radius:999px;background:var(--grad-accent);opacity:.55;pointer-events:none;}',
    '.nts-btn{display:inline-flex;align-items:center;gap:8px;background:var(--grad-primary);color:#fff;padding:14px 28px;border-radius:4px;font-size:15px;font-weight:500;text-decoration:none;cursor:pointer;border:none;font-family:inherit;transition:transform .15s;}',
    '.nts-btn:hover{transform:translateY(-1px);}',
    '.nts-btn-teal{background:#00b894;}',
    '.nts-input{width:100%;padding:11px 14px;border:1.5px solid var(--border-subtle);border-radius:8px;font-size:14px;font-family:inherit;color:var(--text-primary);background:#fff;outline:none;}',
    '.nts-label{display:block;font-size:13px;font-weight:700;color:var(--text-primary);margin-bottom:6px;}',
    '.nts-pill{display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 14px;border-radius:999px;border:1px solid rgba(26,76,142,.12);background:#fff;box-shadow:0 4px 20px rgba(26,76,142,.06);font-size:12px;font-weight:700;color:var(--text-primary);white-space:nowrap;}',
    '.dot{width:6px;height:6px;border-radius:50%;background:#00b894;flex-shrink:0;}'
  ].join('\n');

  var LP_HTML_PREVIEWS = {};

  /* 1. Main hero — dark photo-bg hero, exact NTS copy + partner strip */
  LP_HTML_PREVIEWS['lp-hero-nts-purpose-guide-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + 'body{background:#0f2027;}.hw{min-height:100vh;display:flex;flex-direction:column;}.hm{flex:1;position:relative;overflow:hidden;background:linear-gradient(135deg,#0f2027 0%,#1c3a4a 55%,#2c5364 100%);min-height:400px;}.ho{position:absolute;inset:0;background:radial-gradient(ellipse 70% 90% at 75% 50%,rgba(44,83,100,.5) 0%,transparent 65%);pointer-events:none;}.hc{position:relative;z-index:2;max-width:640px;padding:80px 40px 56px;}.he{font-size:13px;font-weight:500;color:rgba(255,255,255,.88);margin-bottom:20px;letter-spacing:.02em;}.hh1{font-size:clamp(20px,2.6vw,32px);font-weight:800;color:#fff;line-height:1.65;margin-bottom:24px;}.hs{font-size:13px;font-weight:500;color:rgba(255,255,255,.88);margin-bottom:20px;}.hstrip{background:#fff;border-top:1px solid rgba(209,220,232,.4);padding:12px 20px;}.badges{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}.dot{width:6px;height:6px;border-radius:50%;background:#00b894;flex-shrink:0;}</style></head><body><div class="hw"><div class="hm"><div class="ho"></div><div class="hc"><p class="he">あなたの経営課題、補助金で動かせるかもしれません</p><h1 class="hh1"><span style="display:block">人手不足、設備の老朽化、事業承継</span><span style="display:block">あなたの経営課題に使える補助金があるか、1分で分かります。</span></h1><p class="hs">会社名を入力するだけで対象制度がわかります</p><a class="nts-btn nts-btn-teal" href="#">対象の補助金を確認する <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></div></div><div class="hstrip"><div class="badges"><div class="nts-pill"><span class="dot"></span>ものづくり補助金</div><div class="nts-pill"><span class="dot"></span>IT導入補助金</div><div class="nts-pill"><span class="dot"></span>事業再構築補助金</div><div class="nts-pill"><span class="dot"></span>小規模事業者持続化補助金</div><div class="nts-pill"><span class="dot"></span>省力化投資補助金</div><div class="nts-pill"><span class="dot"></span>事業承継・引継ぎ補助金</div><div class="nts-pill"><span class="dot"></span>人材開発支援助成金</div><div class="nts-pill"><span class="dot"></span>キャリアアップ助成金</div></div></div></div></body></html>';

  /* 2. Filter panel — subsidies list search + tag chips + card grid */
  LP_HTML_PREVIEWS['lp-filter-nts-guide-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '.page{max-width:900px;margin:0 auto;padding:40px 24px;}.ttl{font-size:clamp(22px,3vw,32px);font-weight:800;color:var(--text-primary);margin-bottom:8px;}.sub{font-size:15px;color:var(--text-secondary);line-height:1.7;margin-bottom:28px;}.fbar{background:#fff;border-radius:14px;box-shadow:0 6px 24px rgba(26,76,142,.07);padding:20px;margin-bottom:24px;}.ftop{display:flex;gap:10px;margin-bottom:14px;align-items:center;}.srch{flex:1;padding:11px 14px;border:1.5px solid var(--border-subtle);border-radius:8px;font-size:14px;font-family:inherit;color:var(--text-primary);background:#f8fafc;outline:none;}.srt{padding:11px 12px;border:1.5px solid var(--border-subtle);border-radius:8px;font-size:13px;font-family:inherit;color:var(--text-secondary);background:#f8fafc;}.chips{display:flex;gap:6px;flex-wrap:wrap;}.chip{padding:5px 13px;border-radius:20px;font-size:12px;font-weight:600;border:1px solid var(--border-subtle);color:var(--text-secondary);cursor:pointer;background:#f8fafc;white-space:nowrap;}.chip.on{background:var(--accent-navy);color:#fff;border-color:var(--accent-navy);}.meta{display:flex;justify-content:space-between;margin-bottom:16px;font-size:12px;}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}.sc{background:#fff;border-radius:12px;border:1px solid rgba(26,76,142,.08);padding:16px;box-shadow:0 4px 16px rgba(26,76,142,.05);}.sc-tag{font-size:10px;font-weight:800;color:var(--accent-navy);letter-spacing:.05em;margin-bottom:8px;}.sc-name{font-size:13px;font-weight:700;color:var(--text-primary);line-height:1.45;margin-bottom:10px;}.sc-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid rgba(26,76,142,.06);}.sc-amt{font-size:13px;font-weight:800;color:var(--accent-teal);}.sc-link{font-size:11px;font-weight:700;color:var(--accent-navy);}@media(max-width:640px){.grid{grid-template-columns:1fr;}}</style></head><body><div class="page"><h1 class="ttl">補助金を探す</h1><p class="sub">業種・テーマ・キーワードで絞り込めます。</p><div class="fbar"><div class="ftop"><input class="srch" placeholder="補助金名・業種・キーワードで検索..."><select class="srt"><option>締切順</option><option>補助金額順</option><option>補助率順</option></select></div><div class="chips"><span class="chip on">すべて</span><span class="chip">建設業</span><span class="chip">運送業</span><span class="chip">製造業</span><span class="chip">DX化</span><span class="chip">設備投資</span><span class="chip">人材育成</span><span class="chip">事業承継</span></div></div><div class="meta"><span style="color:var(--text-secondary);font-weight:600">47件の補助金</span><span style="color:var(--text-muted)">最終更新：2025年6月</span></div><div class="grid"><div class="sc"><div class="sc-tag">設備投資 / 省力化</div><div class="sc-name">ものづくり補助金（一般型）</div><div class="sc-bottom"><span class="sc-amt">最大 1,250万円</span><span class="sc-link">詳細 →</span></div></div><div class="sc"><div class="sc-tag">DX化 / 全業種</div><div class="sc-name">IT導入補助金 2025</div><div class="sc-bottom"><span class="sc-amt">最大 450万円</span><span class="sc-link">詳細 →</span></div></div><div class="sc"><div class="sc-tag">省力化 / 中小企業</div><div class="sc-name">中小企業省力化投資補助金</div><div class="sc-bottom"><span class="sc-amt">最大 1,500万円</span><span class="sc-link">詳細 →</span></div></div><div class="sc"><div class="sc-tag">人材育成 / 全業種</div><div class="sc-name">人材開発支援助成金</div><div class="sc-bottom"><span class="sc-amt">経費の最大75%</span><span class="sc-link">詳細 →</span></div></div><div class="sc"><div class="sc-tag">事業転換 / 中小企業</div><div class="sc-name">事業再構築補助金</div><div class="sc-bottom"><span class="sc-amt">最大 7,000万円</span><span class="sc-link">詳細 →</span></div></div><div class="sc"><div class="sc-tag">省エネ / 製造業</div><div class="sc-name">省エネ補助金（先進的省エネ）</div><div class="sc-bottom"><span class="sc-amt">最大 15億円</span><span class="sc-link">詳細 →</span></div></div></div></div></body></html>';

  /* 3. Awareness — 3-column problem cards from AwarenessSection.tsx */
  LP_HTML_PREVIEWS['lp-cardgrid-nts-guide-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '.sec{padding:64px 24px;background:#fff;}.inner{max-width:900px;margin:0 auto;}.hd{text-align:center;margin-bottom:48px;}.hd h2{font-size:clamp(24px,3.5vw,36px);font-weight:800;color:var(--text-primary);line-height:1.4;margin-bottom:16px;}.hd p{font-size:16px;color:var(--text-secondary);line-height:1.8;}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}.card-top{height:160px;display:flex;align-items:center;justify-content:center;font-size:52px;}.card-body{padding:28px 28px 32px;}.card-label{font-size:12px;font-weight:800;letter-spacing:.1em;margin-bottom:10px;}.card-h3{font-size:22px;font-weight:800;color:var(--text-primary);line-height:1.4;margin-bottom:16px;white-space:pre-line;}.card-p{font-size:14px;color:var(--text-secondary);line-height:1.85;}@media(max-width:680px){.grid{grid-template-columns:1fr;}}</style></head><body><div class="sec"><div class="inner"><div class="hd"><h2>あなたの経営課題<br>補助金で動かせるかもしれません</h2><p>設備投資・人材育成・DX——多くの課題に、活用できる制度があります。</p></div><div class="grid"><div class="nts-card"><div class="card-top" style="background:#EEF6FF">👷</div><div class="card-body"><p class="card-label" style="color:var(--accent-teal)">止まらない現場の課題</p><h3 class="card-h3">「人手不足が、<br>止まらない」</h3><p class="card-p">職人やドライバーが集まらない。育てる前に辞めていく。この問題を根本から動かすには、設備投資や体制づくりへの踏み込みが必要です。</p></div></div><div class="nts-card"><div class="card-top" style="background:#E8F9F4">🏗️</div><div class="card-body"><p class="card-label" style="color:var(--accent-navy)">先送りにしている決断</p><h3 class="card-h3">「設備の更新を、<br>先送りにしている」</h3><p class="card-p">古い機械や車両を使い続けている。でも投資に踏み切れない。補助金という選択肢を知らないまま、機会を逃している会社が多くあります。</p></div></div><div class="nts-card"><div class="card-top" style="background:#FFF4E8">🤔</div><div class="card-body"><p class="card-label" style="color:var(--accent-gold)">ひとりで抱える経営判断</p><h3 class="card-h3">「次の一手を、<br>一人で考えている」</h3><p class="card-p">事業承継、組織の将来、競合との差——重要な意思決定を、誰かと一緒に考えられる環境がない。それが、多くの経営者の本音です。</p></div></div></div></div></div></body></html>';

  /* 4. Subsidy check form — check page layout, exact form fields */
  LP_HTML_PREVIEWS['lp-hero-subsidy-detail-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '.page{min-height:100vh;background:var(--bg-base);padding:80px 24px 48px;}.inner{max-width:680px;margin:0 auto;}.intro{margin-bottom:32px;}.intro h1{font-size:clamp(22px,3vw,32px);font-weight:800;color:var(--text-primary);line-height:1.4;margin-bottom:12px;}.intro p{font-size:15px;color:var(--text-secondary);line-height:1.75;}.form-card{background:var(--grad-surface);border-radius:16px;box-shadow:0 14px 36px rgba(15,76,129,.08);padding:32px;position:relative;overflow:hidden;}.form-card::before{content:"";position:absolute;left:16px;right:16px;top:0;height:3px;border-radius:999px;background:var(--grad-accent);opacity:.55;}.fc-ttl{font-size:18px;font-weight:800;color:var(--text-primary);margin-bottom:6px;}.fc-sub{font-size:13px;color:var(--text-secondary);line-height:1.6;margin-bottom:24px;}.fgroup{margin-bottom:20px;}.req{color:#ef4444;margin-left:2px;}.hint{font-size:11px;color:var(--text-muted);margin-top:4px;margin-bottom:6px;}.nts-select{width:100%;padding:11px 14px;border:1.5px solid var(--border-subtle);border-radius:8px;font-size:14px;font-family:inherit;color:var(--text-primary);background:#fff;outline:none;appearance:none;}.btn-full{display:flex;width:100%;padding:16px;border-radius:8px;justify-content:center;font-size:16px;font-weight:700;margin-top:8px;}</style></head><body><div class="page"><div class="inner"><div class="intro"><h1>対象補助金が把握できます</h1><p>個人の氏名・連絡先は不要です。会社名・業種・所在地で照合します。事業内容・従業員数・公式サイトURLを任意で入れると、御社に合った制度を見つけやすくなります。</p></div><div class="form-card"><h2 class="fc-ttl">会社情報を入力</h2><p class="fc-sub">会社名・業種・所在地（都道府県）が必須です。法人の正式な特定は行わず、入力内容をもとに対象制度のイメージを表示します。</p><div class="fgroup"><label class="nts-label">会社名<span class="req">*</span></label><input class="nts-input" type="text" placeholder="例：株式会社○○"></div><div class="fgroup"><label class="nts-label">業種<span class="req">*</span></label><select class="nts-select"><option value="">選択してください</option><option>建設業</option><option>運送・物流業</option><option>製造業</option><option>飲食業</option><option>宿泊業</option><option>IT・情報通信業</option></select></div><div class="fgroup"><label class="nts-label">所在地（都道府県）<span class="req">*</span></label><p class="hint">地域限定の補助金を正しく判定するために使用します。</p><select class="nts-select"><option value="">選択してください</option><option>東京都</option><option>大阪府</option><option>愛知県</option><option>北海道</option></select></div><div class="fgroup"><label class="nts-label">従業員数（任意）</label><p class="hint">小規模事業者・中小企業向け制度の判定に使えます。</p><select class="nts-select"><option value="">選択しない</option><option>1〜5人</option><option>6〜20人</option><option>21〜50人</option><option>51〜100人</option><option>101〜300人</option></select></div><div class="fgroup"><label class="nts-label">公式サイトURL（任意）</label><input class="nts-input" type="url" placeholder="https://example.co.jp"></div><a class="nts-btn btn-full nts-btn-teal">対象補助金を照合する →</a></div></div></div></body></html>';

  /* 5. Benefit / fee structure — BenefitSection.tsx */
  LP_HTML_PREVIEWS['lp-summary-grid-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '.sec{padding:64px 24px;background:linear-gradient(180deg,#f8fbff 0%,#eef7ff 100%);}.inner{max-width:900px;margin:0 auto;}.hd{text-align:center;margin-bottom:48px;}.hd h2{font-size:clamp(22px,3vw,34px);font-weight:800;color:var(--text-primary);line-height:1.4;margin-bottom:16px;}.hd p{font-size:16px;color:var(--text-secondary);line-height:1.8;max-width:640px;margin:0 auto;}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}.card-ico{height:120px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:12px;font-size:64px;}.nts-card{padding:0;}.card-body{padding:28px 28px 32px;text-align:center;}.card-ttl{font-size:16px;font-weight:800;color:var(--text-primary);margin-bottom:16px;line-height:1.3;min-height:3rem;}.card-num{background:rgba(0,184,148,.06);border-radius:10px;padding:12px 16px;margin-bottom:14px;display:flex;align-items:baseline;justify-content:center;gap:6px;}.num-main{font-size:24px;font-weight:800;color:var(--accent-teal);}.num-sub{font-size:13px;color:var(--text-secondary);}.card-p{font-size:14px;color:var(--text-secondary);line-height:1.85;}@media(max-width:680px){.grid{grid-template-columns:1fr;}}</style></head><body><div class="sec"><div class="inner"><div class="hd"><h2>段階的なコンサルティングフィーで、<br>最後まで責任を共有します。</h2><p>「採択された瞬間に全額請求」ではありません。1年間の成果を見届けながら、3つのタイミングでお支払いいただく構造です。</p></div><div class="grid"><div class="nts-card"><div class="card-ico">💼</div><div class="card-body"><h3 class="card-ttl">着手金</h3><div class="card-num"><span class="num-main">150,000円</span></div><p class="card-p">ご契約後、補助金活用戦略の設計に入る時点でいただく費用です。初回ヒアリングは無料。方針が固まりご契約いただいた段階でお支払いいただきます。</p></div></div><div class="nts-card"><div class="card-ico">🏆</div><div class="card-body"><h3 class="card-ttl">コンサルティングフィー（採択時）</h3><div class="card-num"><span class="num-main">5%</span><span class="num-sub">（補助額）</span></div><p class="card-p">採択が決まった時点でいただきます。結果が出て初めて発生するフィーです。</p></div></div><div class="nts-card"><div class="card-ico">📊</div><div class="card-body"><h3 class="card-ttl">コンサルティングフィー（報告完了・1年後）</h3><div class="card-num"><span class="num-main">5% × 2回</span><span class="num-sub">（補助額）</span></div><p class="card-p">実績報告・精算完了時と、1年後の効果検証時にそれぞれ5%。最後まで関わり続けるからこそ、この設計です。</p></div></div></div></div></div></body></html>';

  /* 6. Diagnosis check — interactive check-list panel */
  LP_HTML_PREVIEWS['lp-diagnosis-check-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '.page{min-height:100vh;background:var(--bg-base);display:flex;align-items:center;padding:40px 24px;}.card{background:var(--grad-surface);border-radius:16px;box-shadow:0 14px 36px rgba(15,76,129,.08);padding:32px;max-width:560px;width:100%;margin:0 auto;position:relative;overflow:hidden;}.card::before{content:"";position:absolute;left:16px;right:16px;top:0;height:3px;border-radius:999px;background:var(--grad-accent);opacity:.55;}.badge{display:inline-flex;padding:4px 14px;border-radius:20px;background:rgba(26,76,142,.08);color:var(--accent-navy);font-size:12px;font-weight:700;margin-bottom:14px;}.card h2{font-size:20px;font-weight:800;color:var(--text-primary);margin-bottom:8px;}.card-sub{font-size:13px;color:var(--text-secondary);margin-bottom:24px;}.list{display:flex;flex-direction:column;gap:10px;margin-bottom:24px;}.item{display:flex;align-items:center;gap:12px;padding:13px 16px;border-radius:10px;border:1.5px solid rgba(26,76,142,.1);cursor:pointer;transition:all .15s;background:#fff;}.item.on{border-color:var(--accent-teal);background:rgba(0,184,148,.05);}.cb{width:20px;height:20px;border-radius:5px;border:1.5px solid rgba(26,76,142,.25);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:11px;font-weight:900;}.item.on .cb{background:var(--accent-teal);border-color:var(--accent-teal);color:#fff;}.item-txt{font-size:14px;font-weight:600;color:var(--text-primary);}.note{font-size:11px;color:var(--text-muted);text-align:center;margin-top:10px;}</style><script>document.addEventListener("click",function(e){var it=e.target.closest(".item");if(!it)return;it.classList.toggle("on");var cb=it.querySelector(".cb");if(it.classList.contains("on")){cb.textContent="✓";}else{cb.textContent="";};});</script></head><body><div class="page"><div class="card"><span class="badge">60秒で分かる</span><h2>自社が補助金の対象か確認する</h2><p class="card-sub">当てはまる項目をクリックしてください（複数選択可）</p><div class="list"><div class="item on"><div class="cb">✓</div><span class="item-txt">設備投資・機械の更新を検討している</span></div><div class="item"><div class="cb"></div><span class="item-txt">人材採用・育成に課題がある</span></div><div class="item on"><div class="cb">✓</div><span class="item-txt">DX化・省力化を進めたい</span></div><div class="item"><div class="cb"></div><span class="item-txt">事業承継・組織体制の強化を考えている</span></div><div class="item"><div class="cb"></div><span class="item-txt">競合との差別化・新規事業を検討している</span></div></div><a class="nts-btn nts-btn-teal" style="width:100%;justify-content:center;font-size:15px;padding:16px;">対象補助金を確認する（無料）→</a><p class="note">※ 診断結果は可能性の確認であり、採択を保証するものではありません</p></div></div></body></html>';

  /* 7. Case study before/after — SubsidyCaseStudySection data */
  LP_HTML_PREVIEWS['lp-usecase-before-after-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '.sec{padding:64px 24px;background:var(--grad-section);}.inner{max-width:900px;margin:0 auto;}.hd{text-align:center;margin-bottom:40px;}.hd h2{font-size:clamp(22px,3vw,34px);font-weight:800;color:var(--text-primary);line-height:1.4;margin-bottom:12px;}.hd p{font-size:15px;color:var(--text-secondary);line-height:1.7;}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}.case{background:var(--grad-surface);border-radius:16px;box-shadow:0 14px 36px rgba(15,76,129,.08);position:relative;overflow:hidden;}.case::before{content:"";position:absolute;left:16px;right:16px;top:0;height:3px;border-radius:999px;background:var(--grad-accent);opacity:.55;pointer-events:none;}.ci{height:90px;display:flex;align-items:center;justify-content:center;font-size:40px;}.cb2{padding:18px 18px 20px;}.ind{font-size:11px;font-weight:800;color:var(--accent-navy);letter-spacing:.1em;margin-bottom:4px;}.sname{font-size:13px;font-weight:700;color:var(--text-primary);margin-bottom:12px;line-height:1.4;}.row{display:flex;justify-content:space-between;padding:8px 0;border-top:1px solid rgba(26,76,142,.08);}.rl{font-size:11px;color:var(--text-muted);}.rv{font-size:12px;font-weight:700;color:var(--text-primary);}.res{margin-top:10px;background:rgba(0,184,148,.08);border-radius:8px;padding:8px 12px;text-align:center;font-size:13px;font-weight:800;color:var(--accent-teal);}@media(max-width:680px){.grid{grid-template-columns:1fr;}}</style></head><body><div class="sec"><div class="inner"><div class="hd"><h2>A社の採択事例</h2><p>実際に補助金を活用した企業の成果をご紹介します。</p></div><div class="grid"><div class="case"><div class="ci" style="background:#EEF6FF">🏨</div><div class="cb2"><p class="ind">宿泊業</p><p class="sname">新事業進出補助金</p><div class="row"><span class="rl">投資額</span><span class="rv">8,120万円</span></div><div class="row"><span class="rl">補助率</span><span class="rv">1/2</span></div><div class="row"><span class="rl">補助額</span><span class="rv">4,000万円</span></div><div class="res">売上 22% 増</div></div></div><div class="case"><div class="ci" style="background:#FFF4E8">🚜</div><div class="cb2"><p class="ind">建設業</p><p class="sname">省力化投資補助金</p><div class="row"><span class="rl">投資額</span><span class="rv">7,510万円</span></div><div class="row"><span class="rl">補助率</span><span class="rv">1/2</span></div><div class="row"><span class="rl">補助額</span><span class="rv">3,000万円</span></div><div class="res">掘削作業時間を 1/5 に短縮</div></div></div><div class="case"><div class="ci" style="background:#E8F9F4">🍜</div><div class="cb2"><p class="ind">飲食業</p><p class="sname">事業再構築補助金</p><div class="row"><span class="rl">投資額</span><span class="rv">6,000万円</span></div><div class="row"><span class="rl">補助率</span><span class="rv">2/3</span></div><div class="row"><span class="rl">補助額</span><span class="rv">4,000万円</span></div><div class="res">売上 33% 増</div></div></div></div></div></div></body></html>';

  /* 8. How it works — HowItWorksSection.tsx 3-step dark card */
  LP_HTML_PREVIEWS['lp-flow-consultation-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '.sec{padding:64px 24px;background:var(--grad-section);}.inner{max-width:900px;margin:0 auto;}.hd{text-align:center;margin-bottom:40px;}.hd h2{font-size:clamp(22px,3vw,32px);font-weight:800;color:var(--text-primary);line-height:1.4;}.shell{background:linear-gradient(135deg,#0b1e3d 0%,#0d2a5e 60%,#0b4ea2 100%);border-radius:20px;padding:40px 32px;box-shadow:0 18px 48px rgba(11,30,61,.35);}.steps{display:flex;align-items:stretch;gap:0;}.step{flex:1;padding:0 20px;position:relative;}.step:not(:last-child)::after{content:"›";position:absolute;right:-10px;top:50%;transform:translateY(-50%);font-size:28px;color:rgba(255,255,255,.25);z-index:1;}.snum{font-size:72px;font-weight:800;color:rgba(255,255,255,.1);line-height:1;margin-bottom:4px;font-family:"Poppins",sans-serif;}.sico{font-size:28px;margin-bottom:12px;display:block;}.sttl{font-size:17px;font-weight:800;color:#fff;margin-bottom:8px;}.sbody{font-size:13px;color:rgba(255,255,255,.72);line-height:1.7;}@media(max-width:680px){.steps{flex-direction:column;}.step:not(:last-child)::after{content:"↓";right:50%;top:auto;bottom:-16px;transform:translateX(50%);}}</style></head><body><div class="sec"><div class="inner"><div class="hd"><h2>ご利用の流れ</h2></div><div class="shell"><div class="steps"><div class="step"><div class="snum">1</div><span class="sico">🔍</span><h3 class="sttl">補助金を照会する</h3><p class="sbody">企業名と業種を入力するだけ。対象となる可能性のある補助金を即時確認できます。</p></div><div class="step"><div class="snum">2</div><span class="sico">💬</span><h3 class="sttl">専門家に相談する</h3><p class="sbody">照会結果をもとに、担当者が無料でご相談に対応します。申請要件や必要書類もわかりやすくご説明します。</p></div><div class="step"><div class="snum">3</div><span class="sico">📋</span><h3 class="sttl">申請をサポート</h3><p class="sbody">申請前の情報整理から採択後の実績報告まで、一貫して伴走します。</p></div></div></div></div></div></body></html>';

  /* 9. FAQ — FaqSection.tsx exact Q&As with working accordion */
  LP_HTML_PREVIEWS['lp-faq-legal-safe-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '.sec{padding:64px 24px;background:#fff;}.inner{max-width:800px;margin:0 auto;}.hd{text-align:center;margin-bottom:40px;}.hd h2{font-size:clamp(24px,3.5vw,36px);font-weight:800;color:var(--text-primary);line-height:1.4;}.list{display:flex;flex-direction:column;gap:10px;}.item{background:#fff;border-radius:12px;border:1px solid rgba(26,76,142,.08);overflow:hidden;box-shadow:0 4px 20px rgba(26,76,142,.05);}.qrow{display:flex;align-items:center;gap:12px;padding:18px 20px;cursor:pointer;}.qlbl{font-size:14px;font-weight:800;color:var(--accent-navy);flex-shrink:0;}.qtxt{font-size:14px;font-weight:700;color:var(--text-primary);flex:1;line-height:1.45;}.qarr{color:var(--text-muted);transition:transform .2s;flex-shrink:0;font-size:14px;}.item.open .qarr{transform:rotate(180deg);}.ans{display:none;padding:0 20px 18px 46px;font-size:14px;color:var(--text-secondary);line-height:1.8;border-top:1px solid rgba(26,76,142,.06);padding-top:14px;}.item.open .ans{display:block;}</style><script>document.addEventListener("click",function(e){var q=e.target.closest(".qrow");if(!q)return;q.closest(".item").classList.toggle("open");});</script></head><body><div class="sec"><div class="inner"><div class="hd"><h2>よくあるご質問</h2></div><div class="list"><div class="item open"><div class="qrow"><span class="qlbl">Q</span><span class="qtxt">A社が補助金申請を代行してくれますか？</span><span class="qarr">▼</span></div><div class="ans">A社は、補助金情報の整理、対象制度の確認、事業計画・投資内容の整理など、申請前の準備支援を行います。官公署に提出する申請書類の作成・提出等、行政書士法その他法令により資格者が行うべき業務については、必要に応じて提携行政書士法人等が対応します。</div></div><div class="item"><div class="qrow"><span class="qlbl">Q</span><span class="qtxt">相談すれば必ず採択されますか？</span><span class="qarr">▼</span></div><div class="ans">いいえ。補助金の採択は各制度の審査により決定されるため、採択を保証するものではありません。A社では、制度要件や事業内容を整理し、申請に向けた準備を支援します。</div></div><div class="item"><div class="qrow"><span class="qlbl">Q</span><span class="qtxt">無料相談では何を確認できますか？</span><span class="qarr">▼</span></div><div class="ans">事業内容、投資予定、対象地域、業種、補助対象経費などをもとに、活用できる可能性のある補助金や申請前に整理すべきポイントを確認できます。</div></div><div class="item"><div class="qrow"><span class="qlbl">Q</span><span class="qtxt">費用はいつ発生しますか？</span><span class="qarr">▼</span></div><div class="ans">着手金15万円のみ最初にいただきます。その後は採択時・実績報告完了時・1年後の効果検証時の3回、それぞれ補助額の5%をコンサルティングフィーとしていただきます。採択されなかった場合、コンサルティングフィーは発生しません。</div></div><div class="item"><div class="qrow"><span class="qlbl">Q</span><span class="qtxt">建設業・運送業以外でも相談できますか？</span><span class="qarr">▼</span></div><div class="ans">はい、対応可能です。ただし建設業・運送業については業界特有の課題と補助金制度の知見が特に深く、よりきめ細かいご提案ができます。</div></div></div></div></div></body></html>';

  /* 10. Final CTA — FinalCtaSection.tsx dark gradient + 4 white cards */
  LP_HTML_PREVIEWS['lp-cta-companion-support-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '.sec{padding:80px 24px;background:var(--grad-cta);}.inner{max-width:900px;margin:0 auto;text-align:center;}.hd h2{font-size:clamp(24px,3.5vw,36px);font-weight:800;color:#fff;line-height:1.4;margin-bottom:16px;}.hd p{font-size:16px;color:rgba(255,255,255,.82);line-height:1.75;margin-bottom:48px;max-width:560px;margin-left:auto;margin-right:auto;}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px;}.card{background:rgba(255,255,255,.97);border-radius:16px;padding:24px 20px;display:flex;flex-direction:column;align-items:center;gap:12px;box-shadow:0 8px 32px rgba(0,0,0,.14);}.ico{width:52px;height:52px;border-radius:50%;background:#EEF6FF;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}.cttl{font-size:15px;font-weight:800;color:var(--text-primary);}.cbody{font-size:12px;color:var(--text-secondary);line-height:1.65;text-align:center;flex:1;}.cbtn{padding:9px 20px;background:var(--accent-navy);color:#fff;border-radius:20px;font-size:12px;font-weight:700;text-decoration:none;margin-top:4px;white-space:nowrap;}.foot{font-size:12px;color:rgba(255,255,255,.55);}@media(max-width:680px){.grid{grid-template-columns:repeat(2,1fr);}}</style></head><body><div class="sec"><div class="inner"><div class="hd"><h2>まず、話を聞かせてください。</h2><p>補助金のことを相談したい。自社が対象かどうか知りたい。それだけで構いません。</p></div><div class="grid"><div class="card"><div class="ico">✉️</div><p class="cttl">無料相談</p><p class="cbody">経営課題と補助金の可能性について、まずお話しします。</p><a class="cbtn" href="#">相談を予約する ›</a></div><div class="card"><div class="ico">🔍</div><p class="cttl">補助金診断</p><p class="cbody">会社名・URLを入力するだけで、使える可能性のある補助金をご案内します。</p><a class="cbtn" href="#">無料で診断する ›</a></div><div class="card"><div class="ico">🤝</div><p class="cttl">提携について</p><p class="cbody">税理士・士業・ベンダーの方は、パートナープログラムをご覧ください。</p><a class="cbtn" href="#">提携ページへ ›</a></div><div class="card"><div class="ico">📚</div><p class="cttl">補助金情報</p><p class="cbody">現在公募中の補助金一覧を確認できます。</p><a class="cbtn" href="#">補助金を検索する ›</a></div></div><p class="foot">補助金の活用や制度の整理について、お気軽にご相談ください。</p></div></div></body></html>';

  /* ─── Live preview URLs ─────────────────────────────────────────────── */
  var LP_LIVE_URLS = {
    'lp-hero-nts-purpose-guide-001':    'https://subsidy-consulting-nts.vercel.app/',
    'lp-filter-nts-guide-001':          'https://subsidy-consulting-nts.vercel.app/',
    'lp-cardgrid-nts-guide-001':        'https://subsidy-consulting-nts.vercel.app/',
    'lp-hero-subsidy-detail-001':       'https://subsidy-consulting-nts.vercel.app/check',
    'lp-summary-grid-001':              'https://subsidy-consulting-nts.vercel.app/',
    'lp-diagnosis-check-001':           'https://subsidy-consulting-nts.vercel.app/check',
    'lp-usecase-before-after-001':      'https://subsidy-consulting-nts.vercel.app/',
    'lp-flow-consultation-001':         'https://subsidy-consulting-nts.vercel.app/',
    'lp-faq-legal-safe-001':            'https://subsidy-consulting-nts.vercel.app/',
    'lp-cta-companion-support-001':     'https://subsidy-consulting-nts.vercel.app/',
    'lp-hero-video-library-001':        'https://subsidy-consulting-nts.vercel.app/',
    'lp-video-queue-ticker-001':        'https://subsidy-consulting-nts.vercel.app/',
    'lp-video-card-grid-001':           'https://subsidy-consulting-nts.vercel.app/',
    'lp-side-category-panel-001':       'https://subsidy-consulting-nts.vercel.app/',
    'lp-top-news-ticker-001':           'https://subsidy-consulting-nts.vercel.app/',
    'lp-service-reorder-fv-001':        'https://subsidy-consulting-nts.vercel.app/',
    'lp-industry-specific-section-001': 'https://subsidy-consulting-nts.vercel.app/partner',
    'lp-profile-expand-section-001':    'https://subsidy-consulting-nts.vercel.app/partner'
  };

  /* ─── Config ────────────────────────────────────────────────────────── */
  var LP_CAT_LABELS = {
    "all": "すべて",
    "lp/hero": "Hero",
    "lp/filter-search": "フィルター",
    "lp/card-grid": "カードグリッド",
    "lp/diagnosis": "診断",
    "lp/summary": "サマリー",
    "lp/usecase": "ユースケース",
    "lp/flow": "フロー",
    "lp/faq": "FAQ",
    "lp/cta": "CTA",
    "lp/content-strip": "コンテンツ帯",
    "lp/sidebar": "サイドバー",
    "lp/news-strip": "ニュース帯",
    "lp/segmentation": "セグメント",
    "lp/trust": "トラスト",
    "dashboard/kpi": "KPI",
    "dashboard/ai-action": "AI Action"
  };

  var LP_STATUS_LABELS = {
    draft: "ドラフト", candidate: "候補", reviewed: "レビュー済",
    approved: "承認済", deprecated: "非推奨", all: "すべて"
  };

  // Unique categories present in data
  function getCategories() {
    var seen = {};
    LP_ITEMS.forEach(function(it){ seen[it.category] = true; });
    return ['all'].concat(Object.keys(seen));
  }

  // Unique statuses present in data
  function getStatuses() {
    var seen = {};
    LP_ITEMS.forEach(function(it){ seen[it.status] = true; });
    return ['all'].concat(Object.keys(seen));
  }

  /* ─── State ────────────────────────────────────────────────────────── */
  var lpState = {
    open: false,
    filterCat: "all",
    filterStatus: "all",
    search: "",
    activeItem: null,
    activeTab: "readme",
    theme: "light"
  };

  /* ─── DOM refs ────────────────────────────────────────────────────── */
  var panel, overlay, searchEl, resultsEl, detailPanel;

  /* ─── Init ────────────────────────────────────────────────────────── */
  function init() {
    panel    = document.getElementById('lpLibPanel');
    overlay  = document.getElementById('lpLibOverlay');
    searchEl = document.getElementById('lpLibSearch');
    resultsEl = document.getElementById('lpLibResults');
    detailPanel = document.getElementById('lpLibDetail');

    if (!panel) return;

    // Open button in header
    var openBtn = document.getElementById('lpLibBtn');
    if (openBtn) openBtn.addEventListener('click', openPanel);

    // Close panel
    var closeBtn = document.getElementById('lpLibClose');
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    if (overlay) overlay.addEventListener('click', closePanel);

    // Close detail panel
    var detailClose = document.getElementById('lpLibDetailClose');
    if (detailClose) detailClose.addEventListener('click', closeDetail);

    // Search input
    if (searchEl) {
      var searchTimer;
      searchEl.addEventListener('input', function () {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function() {
          lpState.search = searchEl.value.trim();
          renderCards();
          renderSidebar();
        }, 120);
      });
    }

    // Global keyboard
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (lpState.activeItem) { closeDetail(); }
        else if (lpState.open) { closePanel(); }
      }
    });

    // Tab clicks (inside static HTML tab list)
    var tabsEl = document.getElementById('lplTabs');
    if (tabsEl) {
      tabsEl.addEventListener('click', function (e) {
        var tab = e.target.closest('.lpl-tab');
        if (!tab) return;
        lpState.activeTab = tab.dataset.tab;
        // Update active class
        tabsEl.querySelectorAll('.lpl-tab').forEach(function(t){
          t.classList.toggle('active', t.dataset.tab === lpState.activeTab);
        });
        renderDetailBody();
      });
    }

    // Card clicks (delegated from results)
    if (resultsEl) {
      resultsEl.addEventListener('click', function (e) {
        var card = e.target.closest('[data-lp-id]');
        if (!card) return;
        var id = card.dataset.lpId;
        var item = LP_ITEMS.find(function (i) { return i.id === id; });
        if (item) openDetail(item);
      });
    }

    // Filter chips — category
    var catsEl = document.getElementById('lpLibCats');
    if (catsEl) {
      catsEl.addEventListener('click', function (e) {
        var chip = e.target.closest('[data-lp-cat]');
        if (!chip) return;
        lpState.filterCat = chip.dataset.lpCat;
        renderFilters();
        renderCards();
        renderSidebar();
      });
    }

    // Filter chips — status
    var stEl = document.getElementById('lpLibStatuses');
    if (stEl) {
      stEl.addEventListener('click', function (e) {
        var chip = e.target.closest('[data-lp-st]');
        if (!chip) return;
        lpState.filterStatus = chip.dataset.lpSt;
        renderFilters();
        renderCards();
        renderSidebar();
      });
    }

    // Copy button (delegated from detail body)
    var detailBody = document.getElementById('lplDetailBody');
    if (detailBody) {
      detailBody.addEventListener('click', function (e) {
        var copyBtn = e.target.closest('.lpl-copy-btn');
        if (!copyBtn) return;
        var pre = copyBtn.closest('.lpl-prompt-block').querySelector('.lpl-prompt-code');
        if (!pre) return;
        var txt = pre.textContent;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(txt).then(function() {
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            setTimeout(function(){ copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied'); }, 2000);
          });
        } else {
          // fallback
          var ta = document.createElement('textarea');
          ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select();
          document.execCommand('copy'); document.body.removeChild(ta);
          copyBtn.textContent = 'Copied!';
          setTimeout(function(){ copyBtn.textContent = 'Copy'; }, 2000);
        }
      });
    }

    // Sidebar link clicks
    var sbEl = document.getElementById('lpLibSidebar');
    if (sbEl) {
      sbEl.addEventListener('click', function (e) {
        var link = e.target.closest('[data-lp-sb-cat]');
        if (!link) return;
        lpState.filterCat = link.dataset.lpSbCat;
        renderFilters();
        renderCards();
        renderSidebar();
      });
    }

    // Theme toggle
    var themeToggle = document.getElementById('lpLibThemeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        var isDark = document.documentElement.classList.toggle('lpl-dark');
        lpState.theme = isDark ? 'dark' : 'light';
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        themeToggle.title = isDark ? 'ライトモードに切替' : 'ダークモードに切替';
      });
    }
  }

  /* ─── Open / Close panel ──────────────────────────────────────────── */
  function openPanel() {
    lpState.open = true;
    lpState.activeItem = null;
    lpState.search = '';
    if (searchEl) searchEl.value = '';
    panel.classList.add('lpl-visible');
    overlay.classList.add('lpl-visible');
    document.body.style.overflow = 'hidden';
    renderFilters();
    renderSidebar();
    renderCards();
    if (searchEl) { setTimeout(function(){ searchEl.focus(); }, 80); }
  }

  function closePanel() {
    lpState.open = false;
    closeDetail();
    panel.classList.remove('lpl-visible');
    overlay.classList.remove('lpl-visible');
    document.body.style.overflow = '';
  }

  /* ─── Open / Close detail ─────────────────────────────────────────── */
  function openDetail(item) {
    lpState.activeItem = item;
    lpState.activeTab = (LP_LIVE_URLS[item.id] || LP_HTML_PREVIEWS[item.id]) ? 'preview' : 'readme';
    renderCards(); // highlight active card
    // Reset tabs
    var tabsEl = document.getElementById('lplTabs');
    var defaultTab = (LP_LIVE_URLS[item.id] || LP_HTML_PREVIEWS[item.id]) ? 'preview' : 'readme';
    if (tabsEl) {
      tabsEl.querySelectorAll('.lpl-tab').forEach(function(t){
        t.classList.toggle('active', t.dataset.tab === defaultTab);
      });
    }
    renderDetailHeader();
    renderDetailBody();
    if (detailPanel) {
      detailPanel.classList.add('lpl-detail-open');
      var body = document.getElementById('lplDetailBody');
      if (body) body.scrollTop = 0;
    }
  }

  function closeDetail() {
    lpState.activeItem = null;
    if (detailPanel) detailPanel.classList.remove('lpl-detail-open');
    renderCards(); // remove active highlight
  }

  /* ─── Render filters ──────────────────────────────────────────────── */
  function renderFilters() {
    var catEl = document.getElementById('lpLibCats');
    var stEl  = document.getElementById('lpLibStatuses');

    // Category counts
    var counts = {};
    LP_ITEMS.forEach(function(it){ counts[it.category] = (counts[it.category]||0)+1; });

    if (catEl) {
      var cats = getCategories();
      catEl.innerHTML = cats.map(function(cat){
        var active = lpState.filterCat === cat;
        var count = cat === 'all' ? LP_ITEMS.length : (counts[cat]||0);
        var label = LP_CAT_LABELS[cat] || cat;
        return '<button class="lpl-chip' + (active?' active':'') + '" data-lp-cat="' + cat + '">' +
          label + ' <span style="opacity:.55;font-size:9px">' + count + '</span>' +
        '</button>';
      }).join('');
    }

    // Status counts
    var stCounts = {};
    LP_ITEMS.forEach(function(it){ stCounts[it.status] = (stCounts[it.status]||0)+1; });

    if (stEl) {
      var sts = getStatuses();
      stEl.innerHTML = sts.map(function(st){
        var active = lpState.filterStatus === st;
        var count = st === 'all' ? LP_ITEMS.length : (stCounts[st]||0);
        var label = LP_STATUS_LABELS[st] || st;
        return '<button class="lpl-chip' + (active?' active':'') + '" data-lp-st="' + st + '">' +
          label + ' <span style="opacity:.55;font-size:9px">' + count + '</span>' +
        '</button>';
      }).join('');
    }
  }

  /* ─── Render sidebar ──────────────────────────────────────────────── */
  function renderSidebar() {
    var sbEl = document.getElementById('lpLibSidebar');
    if (!sbEl) return;

    var counts = {};
    LP_ITEMS.forEach(function(it){ counts[it.category] = (counts[it.category]||0)+1; });

    // Group: lp vs dashboard
    var lpCats  = Object.keys(counts).filter(function(c){ return c.startsWith('lp/'); });
    var dbCats  = Object.keys(counts).filter(function(c){ return c.startsWith('dashboard/'); });

    function linkHtml(cat) {
      var active = lpState.filterCat === cat;
      return '<div class="lpl-sb-link' + (active?' active':'') + '" data-lp-sb-cat="' + cat + '">' +
        (LP_CAT_LABELS[cat]||cat) +
        '<span class="lpl-sb-count">' + (counts[cat]||0) + '</span>' +
      '</div>';
    }

    var html = '';
    html += '<div class="lpl-sb-section">';
    html += '<div class="lpl-sb-title">すべて</div>';
    html += '<div class="lpl-sb-link' + (lpState.filterCat==='all'?' active':'') + '" data-lp-sb-cat="all">全セクション <span class="lpl-sb-count">' + LP_ITEMS.length + '</span></div>';
    html += '</div>';

    if (lpCats.length) {
      html += '<div class="lpl-sb-section"><div class="lpl-sb-title">LP セクション</div>';
      lpCats.forEach(function(c){ html += linkHtml(c); });
      html += '</div>';
    }
    if (dbCats.length) {
      html += '<div class="lpl-sb-section"><div class="lpl-sb-title">ダッシュボード</div>';
      dbCats.forEach(function(c){ html += linkHtml(c); });
      html += '</div>';
    }
    sbEl.innerHTML = html;
  }

  /* ─── Render cards ────────────────────────────────────────────────── */
  function renderCards() {
    if (!resultsEl) return;
    var q = lpState.search.toLowerCase();
    var filtered = LP_ITEMS.filter(function (item) {
      if (lpState.filterCat !== 'all' && item.category !== lpState.filterCat) return false;
      if (lpState.filterStatus !== 'all' && item.status !== lpState.filterStatus) return false;
      if (q) {
        var haystack = [item.name, item.category, item.source].concat(item.bestFor).join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    var countEl = document.getElementById('lpLibCount');
    if (countEl) countEl.textContent = filtered.length + ' / ' + LP_ITEMS.length + ' 件';

    if (filtered.length === 0) {
      resultsEl.innerHTML = '<div class="lpl-empty"><div class="lpl-empty-icon">🔍</div><div class="lpl-empty-text">該当するセクションが見つかりません</div></div>';
      return;
    }

    resultsEl.innerHTML = filtered.map(function (item) {
      var isActive = lpState.activeItem && lpState.activeItem.id === item.id;
      var stLabel = LP_STATUS_LABELS[item.status] || item.status;
      var bestForStr = item.bestFor.slice(0, 3).map(function(b){
        return '<span class="lpl-tag">' + escHtml(b) + '</span>';
      }).join('');
      var hasHtml = !!(LP_HTML_PREVIEWS[item.id] || LP_LIVE_URLS[item.id]);
      var badgeHtml = '';
      if (item.hasPrompt)           badgeHtml += '<span class="lpl-badge has-prompt">⌥ Prompt</span>';
      if (item.hasPreview || hasHtml) badgeHtml += '<span class="lpl-badge has-preview">👁 Preview</span>';
      if (!item.hasPrompt && !item.hasPreview && !hasHtml) badgeHtml += '<span class="lpl-badge no-content">準備中</span>';
      var legalWarn = (item.qa && item.qa.legalCopy === 'check_required')
        ? '<span class="lpl-badge" style="background:rgba(251,191,36,.1);color:#fbbf24;border-color:rgba(251,191,36,.2)">⚠ 法務確認</span>' : '';

      return '<article class="lpl-card' + (isActive?' lpl-card-active':'') + '" data-lp-id="' + item.id + '">' +
        '<div class="lpl-card-top">' +
          '<div class="lpl-card-title">' + escHtml(item.name) + '</div>' +
          '<span class="lpl-card-source">' + escHtml(item.source) + '</span>' +
        '</div>' +
        '<div class="lpl-card-meta">' +
          '<span class="lpl-status ' + item.status + '">' + stLabel + '</span>' +
          '<span class="lpl-cat-tag">' + (LP_CAT_LABELS[item.category]||item.category) + '</span>' +
          '<span class="lpl-rank">#' + item.rank + '</span>' +
        '</div>' +
        (item.bestFor.length ? '<div class="lpl-card-bestfor">' + bestForStr + '</div>' : '') +
        '<div class="lpl-card-badges">' + badgeHtml + legalWarn + '</div>' +
      '</article>';
    }).join('');
  }

  /* ─── Detail header ───────────────────────────────────────────────── */
  function renderDetailHeader() {
    var nameEl = document.getElementById('lplDetailName');
    var metaEl = document.getElementById('lplDetailMeta');
    if (!lpState.activeItem) return;
    var item = lpState.activeItem;
    if (nameEl) nameEl.textContent = item.name;
    if (metaEl) {
      var stLabel = LP_STATUS_LABELS[item.status] || item.status;
      var legal = (item.qa && item.qa.legalCopy === 'check_required')
        ? '<span class="lpl-badge" style="background:rgba(251,191,36,.1);color:#fbbf24;border-color:rgba(251,191,36,.2);margin-left:4px">⚠ 法務確認</span>' : '';
      metaEl.innerHTML =
        '<span class="lpl-status ' + item.status + '">' + stLabel + '</span>' +
        '<span class="lpl-cat-tag" style="margin-left:6px">' + (LP_CAT_LABELS[item.category]||item.category) + '</span>' +
        '<span style="font-size:10px;color:rgba(255,255,255,.3);margin-left:6px">' + escHtml(item.source) + ' · #' + item.rank + '</span>' +
        legal;
    }
  }

  /* ─── Detail body (tab content) ───────────────────────────────────── */
  function renderDetailBody() {
    var bodyEl = document.getElementById('lplDetailBody');
    if (!bodyEl || !lpState.activeItem) return;
    var item = lpState.activeItem;
    var tab  = lpState.activeTab;

    // Reset body styles (preview tab sets inline styles)
    bodyEl.style.padding = '';
    bodyEl.style.overflow = '';
    bodyEl.style.display = '';
    bodyEl.style.flexDirection = '';

    if (tab === 'readme') {
      bodyEl.innerHTML = renderMarkdown(item.readme);
    } else if (tab === 'prompt') {
      if (!item.hasPrompt || item.prompt === '※ プロンプト未整備') {
        bodyEl.innerHTML = '<div class="lpl-no-content"><div class="lpl-no-icon">📝</div>プロンプトはまだ未整備です</div>';
      } else {
        bodyEl.innerHTML =
          '<div class="lpl-prompt-block">' +
            '<div class="lpl-prompt-top">' +
              '<span class="lpl-prompt-lang">Cursor / Claude Prompt</span>' +
              '<button class="lpl-copy-btn">Copy</button>' +
            '</div>' +
            '<pre class="lpl-prompt-code">' + escHtml(item.prompt) + '</pre>' +
          '</div>';
      }
    } else if (tab === 'checks') {
      if (!item.hasPrompt || item.checks === '※ チェックリスト未整備') {
        bodyEl.innerHTML = '<div class="lpl-no-content"><div class="lpl-no-icon">✅</div>チェックリストはまだ未整備です</div>';
      } else {
        bodyEl.innerHTML = renderChecklist(item.checks);
      }
    } else if (tab === 'preview') {
      var liveUrl     = LP_LIVE_URLS[item.id];
      var previewHtml = LP_HTML_PREVIEWS[item.id];
      if (!previewHtml && !liveUrl) {
        bodyEl.innerHTML = '<div class="lpl-no-content"><div class="lpl-no-icon">👁</div>プレビューはまだ用意されていません</div>';
      } else {
        bodyEl.style.padding = '0';
        bodyEl.style.overflow = 'hidden';
        bodyEl.style.display = 'flex';
        bodyEl.style.flexDirection = 'column';
        var barHtml = '<div class="lpl-preview-bar"><span class="lpl-preview-url-txt">📐 セクション プレビュー</span>';
        if (liveUrl) {
          barHtml += '<a class="lpl-preview-open-btn" href="' + escHtml(liveUrl) + '" target="_blank" rel="noopener noreferrer">実際のページを開く ↗</a>';
        }
        barHtml += '</div><iframe class="lpl-preview-frame" id="lplPreviewIframe" sandbox="allow-scripts allow-same-origin"></iframe>';
        bodyEl.innerHTML = barHtml;
        var pframe = document.getElementById('lplPreviewIframe');
        if (pframe) {
          if (previewHtml) {
            var blob = new Blob([previewHtml], { type: 'text/html; charset=utf-8' });
            pframe.src = URL.createObjectURL(blob);
          } else {
            pframe.removeAttribute('sandbox');
            pframe.src = liveUrl;
          }
        }
      }
    } else if (tab === 'usage') {
      bodyEl.style.padding = '';
      bodyEl.style.overflow = '';
      bodyEl.style.display = '';
      bodyEl.style.flexDirection = '';
      bodyEl.innerHTML = renderUsage(item);
    }
  }

  /* ─── Markdown renderer (simple) ─────────────────────────────────── */
  function renderMarkdown(md) {
    if (!md) return '';
    var lines = md.split('\n');
    var html = '<div class="lpl-md">';
    lines.forEach(function(line) {
      if (line.startsWith('# ')) {
        html += '<h1>' + escHtml(line.slice(2)) + '</h1>';
      } else if (line.startsWith('## ')) {
        html += '<h2>' + escHtml(line.slice(3)) + '</h2>';
      } else if (line.startsWith('### ')) {
        html += '<h3>' + escHtml(line.slice(4)) + '</h3>';
      } else if (line.startsWith('- ')) {
        html += '<ul><li>' + renderInline(line.slice(2)) + '</li></ul>';
      } else if (line.startsWith('**') && line.endsWith('**')) {
        html += '<p><strong>' + escHtml(line.slice(2, -2)) + '</strong></p>';
      } else if (line === '---' || line === '***') {
        html += '<hr>';
      } else if (line.trim() === '') {
        // skip blank
      } else {
        html += '<p>' + renderInline(line) + '</p>';
      }
    });
    html += '</div>';
    // Merge adjacent <ul> blocks
    html = html.replace(/<\/ul>\s*<ul>/g, '');
    return html;
  }

  function renderInline(str) {
    return escHtml(str)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
  }

  /* ─── Checklist renderer ──────────────────────────────────────────── */
  function renderChecklist(md) {
    if (!md) return '';
    var lines = md.split('\n');
    var html = '<div class="lpl-md">';
    var inList = false;
    lines.forEach(function(line) {
      if (line.startsWith('## ')) {
        if (inList) { html += '</ul>'; inList = false; }
        html += '<h2>' + escHtml(line.slice(3)) + '</h2>';
      } else if (line.match(/^- \[ \]/)) {
        if (!inList) { html += '<ul class="lpl-checklist">'; inList = true; }
        html += '<li><span class="lpl-check-box"></span>' + renderInline(line.slice(6)) + '</li>';
      } else if (line.match(/^- \[x\]/i)) {
        if (!inList) { html += '<ul class="lpl-checklist">'; inList = true; }
        html += '<li><span class="lpl-check-box lpl-check-done">✓</span>' + renderInline(line.slice(7)) + '</li>';
      } else if (line.trim() && !line.startsWith('-')) {
        if (inList) { html += '</ul>'; inList = false; }
        html += '<p>' + renderInline(line) + '</p>';
      }
    });
    if (inList) html += '</ul>';
    html += '</div>';
    return html;
  }

  /* ─── Usage tab ───────────────────────────────────────────────────── */
  function renderUsage(item) {
    var html = '<div class="lpl-usage-grid">';
    html += '<div class="lpl-usage-col best"><div class="lpl-usage-col-title">✓ 使うべき場面</div><ul>';
    if (item.bestFor && item.bestFor.length) {
      item.bestFor.forEach(function(b){ html += '<li>' + escHtml(b) + '</li>'; });
    } else { html += '<li style="color:rgba(255,255,255,.25)">—</li>'; }
    html += '</ul></div>';
    html += '<div class="lpl-usage-col avoid"><div class="lpl-usage-col-title">✕ 避ける場面</div><ul>';
    if (item.avoidFor && item.avoidFor.length) {
      item.avoidFor.forEach(function(a){ html += '<li>' + escHtml(a) + '</li>'; });
    } else { html += '<li style="color:rgba(255,255,255,.25)">—</li>'; }
    html += '</ul></div>';
    html += '</div>';

    // QA grid
    if (item.qa && Object.keys(item.qa).length) {
      html += '<div class="lpl-section-h" style="margin-top:20px">QA / 品質チェック</div>';
      html += '<div class="lpl-qa-grid">';
      var qaLabels = { responsive: 'レスポンシブ', accessibility: 'アクセシビリティ', legalCopy: '法的文言' };
      Object.keys(item.qa).forEach(function(k){
        var val = item.qa[k];
        var valLabel = val === 'required' ? '必須' : val === 'check_required' ? '確認要' : val === 'not_applicable' ? 'N/A' : val;
        html += '<div class="lpl-qa-item"><div class="lpl-qa-label">' + (qaLabels[k]||k) + '</div><div class="lpl-qa-value ' + val + '">' + valLabel + '</div></div>';
      });
      html += '</div>';
    }
    return html;
  }

  /* ─── HTML escape ─────────────────────────────────────────────────── */
  function escHtml(str) {
    return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ─── Active card style ───────────────────────────────────────────── */
  // Add missing CSS for active card
  (function(){
    var s = document.createElement('style');
    s.textContent = '.lpl-card-active{border-color:rgba(139,92,246,.55)!important;background:rgba(109,40,217,.14)!important;}';
    document.head.appendChild(s);
  })();

  /* ─── Boot ────────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
