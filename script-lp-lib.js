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
    '* { box-sizing: border-box; margin: 0; padding: 0; }',
    'body { font-family: system-ui,-apple-system,"Hiragino Kaku Gothic ProN","Noto Sans JP",sans-serif;',
    '  background:#eef2f7; color:#1a2b3c; line-height:1; }',
    '.wrap { max-width:800px; margin:0 auto; padding:48px 32px; }',
    '.btn-p { display:inline-flex;align-items:center;gap:6px;padding:11px 22px;border-radius:8px;',
    '  font-size:13px;font-weight:700;background:#1a4c8e;color:#fff;text-decoration:none;',
    '  box-shadow:0 4px 14px rgba(26,76,142,.3); cursor:pointer; }',
    '.btn-s { display:inline-flex;align-items:center;gap:6px;padding:10px 20px;border-radius:8px;',
    '  font-size:13px;font-weight:600;border:1.5px solid rgba(26,76,142,.28);color:#1a4c8e;',
    '  text-decoration:none; cursor:pointer; }',
    '.card { background:#fff;border-radius:12px;box-shadow:0 4px 20px rgba(26,76,142,.08);padding:22px; }',
    'h2.ttl { font-size:1.75rem;font-weight:800;line-height:1.35;color:#1a2b3c;letter-spacing:-.4px; }',
    '.sub { font-size:14px;color:#4a5568;line-height:1.8;margin-top:10px; }',
    '.badge { display:inline-flex;align-items:center;padding:3px 12px;border-radius:20px;',
    '  font-size:11px;font-weight:700; }',
    '.teal { color:#00b894; } .navy { color:#1a4c8e; } .gold { color:#f5a623; }',
    '.tag { display:inline-block;padding:2px 9px;border-radius:4px;font-size:11px;font-weight:600; }',
    '.sec-white { background:#fff; } .sec-base { background:#eef2f7; }'
  ].join('\n');

  var LP_HTML_PREVIEWS = {};

  LP_HTML_PREVIEWS['lp-hero-nts-purpose-guide-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '\n.hero{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;}\n.hero-badge{background:rgba(26,76,142,.08);color:#1a4c8e;margin-bottom:14px;}\n.hero-h1{font-size:2rem;font-weight:800;line-height:1.3;color:#1a2b3c;margin-bottom:12px;}\n.hero-h1 em{color:#00b894;font-style:normal;}\n.hero-body{font-size:14px;color:#4a5568;line-height:1.8;margin-bottom:20px;}\n.hero-btns{display:flex;gap:10px;flex-wrap:wrap;}\n.purpose-cards{display:flex;flex-direction:column;gap:10px;}\n.pc{display:flex;align-items:center;gap:12px;background:#fff;border-radius:12px;padding:14px 16px;box-shadow:0 4px 20px rgba(26,76,142,.07);cursor:pointer;border:1px solid rgba(26,76,142,.06);transition:transform .15s;}\n.pc:hover{transform:translateX(4px);}\n.pc-ico{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}\n.pc-name{font-size:12px;font-weight:700;color:#1a2b3c;}\n.pc-sub{font-size:11px;color:#4a5568;margin-top:2px;}\n.pc-arr{margin-left:auto;color:#94a3b8;font-size:16px;}\n@media(max-width:600px){.hero{grid-template-columns:1fr;}}</style></head><body><div class="wrap"><div class="hero"><div><span class="badge hero-badge">🏭 建設業・運送業 特化</span><h1 class="hero-h1">補助金で、<br><em>経営を動かす</em>。</h1><p class="hero-body">設備投資・人材育成・DX——A社が、補助金活用の戦略立案から採択後の効果検証まで伴走します。</p><div class="hero-btns"><a class="btn-p">無料相談を予約する ›</a><a class="btn-s">補助金を診断する</a></div></div><div class="purpose-cards"><div class="pc"><div class="pc-ico" style="background:#EEF6FF">🔍</div><div><div class="pc-name">補助金を調べたい</div><div class="pc-sub">対象制度を一覧で確認する</div></div><span class="pc-arr">›</span></div><div class="pc"><div class="pc-ico" style="background:#E8F9F4">✓</div><div><div class="pc-name">自社が対象か確認したい</div><div class="pc-sub">簡易診断（60秒）で確認する</div></div><span class="pc-arr">›</span></div><div class="pc"><div class="pc-ico" style="background:#FFF4E8">💬</div><div><div class="pc-name">まず相談したい</div><div class="pc-sub">無料相談を予約する</div></div><span class="pc-arr">›</span></div><div class="pc"><div class="pc-ico" style="background:#F0F0FF">📋</div><div><div class="pc-name">事例・実績を見たい</div><div class="pc-sub">採択事例を確認する</div></div><span class="pc-arr">›</span></div></div></div></div></body></html>';

  LP_HTML_PREVIEWS['lp-filter-nts-guide-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '\n.filter-wrap{background:#fff;border-radius:14px;box-shadow:0 4px 20px rgba(26,76,142,.08);padding:20px;margin-bottom:24px;}\n.filter-top{display:flex;align-items:center;gap:10px;margin-bottom:14px;}\n.search-box{flex:1;padding:9px 14px;border:1.5px solid rgba(26,76,142,.15);border-radius:8px;font-size:13px;color:#1a2b3c;background:#f8fafc;outline:none;}\n.sort-box{padding:9px 12px;border:1.5px solid rgba(26,76,142,.15);border-radius:8px;font-size:12px;color:#4a5568;background:#f8fafc;}\n.chip-row{display:flex;gap:6px;flex-wrap:wrap;}\n.chip{padding:5px 12px;border-radius:20px;font-size:11px;font-weight:600;border:1px solid rgba(26,76,142,.15);color:#4a5568;cursor:pointer;background:#f8fafc;}\n.chip.active{background:#1a4c8e;color:#fff;border-color:#1a4c8e;}\n.result-meta{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}\n.result-cnt{font-size:12px;font-weight:600;color:#4a5568;}\n.card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}\n.acard{background:#fff;border-radius:10px;border:1px solid rgba(26,76,142,.08);padding:14px;}\n.acard-tag{font-size:10px;font-weight:700;color:#1a4c8e;margin-bottom:6px;}\n.acard-ttl{font-size:12px;font-weight:700;color:#1a2b3c;line-height:1.45;margin-bottom:6px;}\n.acard-meta{font-size:10px;color:#94a3b8;}\n.acard-amt{display:inline-block;font-size:11px;font-weight:700;color:#00b894;margin-top:6px;}\n@media(max-width:600px){.card-grid{grid-template-columns:1fr;}}</style></head><body><div class="wrap"><div class="filter-wrap"><div class="filter-top"><input class="search-box" placeholder="補助金名・業種・キーワードで検索..." value=""><select class="sort-box"><option>締切順</option><option>金額順</option></select></div><div class="chip-row"><span class="chip active">すべて</span><span class="chip">建設業</span><span class="chip">運送業</span><span class="chip">DX化</span><span class="chip">設備投資</span><span class="chip">人材育成</span><span class="chip">事業承継</span></div></div><div class="result-meta"><span class="result-cnt">47件の補助金が見つかりました</span><span style="font-size:11px;color:#94a3b8">最終更新: 2025年6月</span></div><div class="card-grid"><div class="acard"><div class="acard-tag">設備投資</div><div class="acard-ttl">ものづくり補助金（一般型）</div><div class="acard-meta">対象: 製造業・建設業ほか</div><div class="acard-amt">最大 1,250万円</div></div><div class="acard"><div class="acard-tag">DX化</div><div class="acard-ttl">IT導入補助金 2025</div><div class="acard-meta">対象: 全業種</div><div class="acard-amt">最大 450万円</div></div><div class="acard"><div class="acard-tag">人材育成</div><div class="acard-ttl">人材開発支援助成金</div><div class="acard-meta">対象: 全業種</div><div class="acard-amt">経費の最大75%</div></div></div></div></body></html>';

  LP_HTML_PREVIEWS['lp-cardgrid-nts-guide-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '\n.sec-hd{text-align:center;margin-bottom:32px;}\n.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}\n.gcard{background:#fff;border-radius:12px;box-shadow:0 4px 20px rgba(26,76,142,.07);overflow:hidden;border:1px solid rgba(26,76,142,.06);}\n.gcard-img{height:80px;display:flex;align-items:center;justify-content:center;font-size:28px;}\n.gcard-body{padding:16px;}\n.gcard-tags{display:flex;gap:4px;margin-bottom:8px;}\n.gtag{padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;background:rgba(26,76,142,.08);color:#1a4c8e;}\n.gcard-ttl{font-size:13px;font-weight:700;color:#1a2b3c;line-height:1.45;margin-bottom:6px;}\n.gcard-desc{font-size:11px;color:#4a5568;line-height:1.6;margin-bottom:10px;}\n.gcard-meta{display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid #f0f4f8;}\n.gcard-amt{font-size:12px;font-weight:700;color:#00b894;}\n.gcard-link{font-size:11px;font-weight:700;color:#1a4c8e;}\n@media(max-width:600px){.grid{grid-template-columns:1fr;}}</style></head><body><div class="wrap"><div class="sec-hd"><span class="badge" style="background:rgba(26,76,142,.08);color:#1a4c8e;margin-bottom:10px;">補助金ガイド</span><h2 class="ttl">活用できる補助金を探す</h2><p class="sub">A社が対応する制度の一覧です。業種・投資内容から最適な制度を見つけましょう。</p></div><div class="grid"><div class="gcard"><div class="gcard-img" style="background:#EEF6FF">🏗️</div><div class="gcard-body"><div class="gcard-tags"><span class="gtag">建設業</span><span class="gtag">設備</span></div><div class="gcard-ttl">ものづくり補助金（一般型）</div><div class="gcard-desc">建設機械・測量機器の更新から DX化まで幅広く対応する中小企業向け補助金。</div><div class="gcard-meta"><span class="gcard-amt">最大 1,250万円</span><span class="gcard-link">詳しく見る →</span></div></div></div><div class="gcard"><div class="gcard-img" style="background:#E8F9F4">🚚</div><div class="gcard-body"><div class="gcard-tags"><span class="gtag">運送業</span><span class="gtag">省力化</span></div><div class="gcard-ttl">省力化投資補助金</div><div class="gcard-desc">ドライバー不足に対応するための自動化・省力化機器の導入を支援する補助金。</div><div class="gcard-meta"><span class="gcard-amt">最大 1,500万円</span><span class="gcard-link">詳しく見る →</span></div></div></div><div class="gcard"><div class="gcard-img" style="background:#FFF4E8">💻</div><div class="gcard-body"><div class="gcard-tags"><span class="gtag">DX化</span><span class="gtag">全業種</span></div><div class="gcard-ttl">IT導入補助金 2025</div><div class="gcard-desc">業務効率化・デジタル化のためのソフトウェア・システム導入を支援します。</div><div class="gcard-meta"><span class="gcard-amt">最大 450万円</span><span class="gcard-link">詳しく見る →</span></div></div></div></div></div></body></html>';

  LP_HTML_PREVIEWS['lp-hero-subsidy-detail-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '\n.hero{display:grid;grid-template-columns:1.1fr 0.9fr;gap:32px;align-items:start;}\n.status-bar{display:flex;align-items:center;gap:8px;margin-bottom:14px;}\n.status-dot{width:8px;height:8px;border-radius:50%;background:#00b894;}\n.status-txt{font-size:11px;font-weight:700;color:#00b894;}\n.deadline-badge{font-size:11px;font-weight:600;color:#f5a623;background:rgba(245,166,35,.1);padding:3px 10px;border-radius:20px;}\n.hero-h1{font-size:1.6rem;font-weight:800;line-height:1.35;color:#1a2b3c;margin-bottom:10px;}\n.hero-body{font-size:13px;color:#4a5568;line-height:1.8;margin-bottom:18px;}\n.hero-btns{display:flex;gap:10px;}\n.metrics{background:#fff;border-radius:14px;box-shadow:0 6px 28px rgba(26,76,142,.1);padding:20px;}\n.metrics-ttl{font-size:11px;font-weight:700;color:#4a5568;text-transform:uppercase;letter-spacing:.5px;margin-bottom:14px;}\n.metric-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;}\n.metric{padding:12px;background:#f8fafc;border-radius:8px;border:1px solid rgba(26,76,142,.07);}\n.metric-lbl{font-size:10px;color:#94a3b8;font-weight:600;margin-bottom:4px;}\n.metric-val{font-size:15px;font-weight:800;color:#1a2b3c;}\n.metric-val.accent{color:#1a4c8e;}\n@media(max-width:600px){.hero{grid-template-columns:1fr;}}</style></head><body><div class="wrap"><div class="hero"><div><div class="status-bar"><span class="status-dot"></span><span class="status-txt">公募中</span><span class="deadline-badge">⏰ 締切: 2025年12月19日</span></div><h1 class="hero-h1">ものづくり補助金<br>（省力化・デジタル枠）</h1><p class="hero-body">建設業・運送業の設備更新・自動化投資を支援。A社が制度要件の整理から採択後の効果検証まで伴走します。</p><div class="hero-btns"><a class="btn-p">無料相談を予約する ›</a><a class="btn-s">診断する</a></div></div><div class="metrics"><div class="metrics-ttl">制度の概要</div><div class="metric-row"><div class="metric"><div class="metric-lbl">補助率</div><div class="metric-val accent">1/2〜2/3</div></div><div class="metric"><div class="metric-lbl">補助上限</div><div class="metric-val">1,250万円</div></div><div class="metric"><div class="metric-lbl">対象業種</div><div class="metric-val" style="font-size:12px">製造・建設・運送ほか</div></div><div class="metric"><div class="metric-lbl">採択率（参考）</div><div class="metric-val accent">約40〜50%</div></div></div></div></div></div></body></html>';

  LP_HTML_PREVIEWS['lp-summary-grid-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '\n.sec-hd{text-align:center;margin-bottom:32px;}\n.sgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}\n.scard{background:#fff;border-radius:12px;box-shadow:0 4px 20px rgba(26,76,142,.07);padding:20px;display:flex;gap:14px;align-items:flex-start;}\n.scard-ico{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}\n.scard-ttl{font-size:14px;font-weight:700;color:#1a2b3c;margin-bottom:6px;}\n.scard-body{font-size:12px;color:#4a5568;line-height:1.7;}\n@media(max-width:600px){.sgrid{grid-template-columns:1fr;}}</style></head><body><div class="wrap"><div class="sec-hd"><span class="badge" style="background:rgba(0,184,148,.1);color:#00b894;margin-bottom:10px;">A社のサービス</span><h2 class="ttl">3秒で理解する<br>A社の補助金支援</h2></div><div class="sgrid"><div class="scard"><div class="scard-ico" style="background:#EEF6FF">🔍</div><div><div class="scard-ttl">対象制度を特定する</div><div class="scard-body">事業内容・投資予定をもとに、使える可能性の高い補助金を絞り込みます。</div></div></div><div class="scard"><div class="scard-ico" style="background:#E8F9F4">📊</div><div><div class="scard-ttl">採択率を高める支援</div><div class="scard-body">事業計画の整理・差別化ポイントの明確化で、採択可能性を高めます。</div></div></div><div class="scard"><div class="scard-ico" style="background:#FFF4E8">🤝</div><div><div class="scard-ttl">採択後も伴走</div><div class="scard-body">採択後の実績報告・効果検証まで、申請で終わらない伴走支援を提供します。</div></div></div><div class="scard"><div class="scard-ico" style="background:#F0F0FF">💰</div><div><div class="scard-ttl">着手金のみで開始</div><div class="scard-body">着手金15万円のみ。採択されなければコンサルフィーは発生しません。</div></div></div></div></div></body></html>';

  LP_HTML_PREVIEWS['lp-diagnosis-check-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '\n.diag-wrap{background:#fff;border-radius:14px;box-shadow:0 6px 28px rgba(26,76,142,.09);padding:28px;max-width:560px;margin:0 auto;}\n.diag-hd{text-align:center;margin-bottom:24px;}\n.diag-ttl{font-size:1.2rem;font-weight:800;color:#1a2b3c;margin-bottom:6px;}\n.diag-sub{font-size:12px;color:#4a5568;}\n.check-list{list-style:none;padding:0;margin:0 0 20px;display:flex;flex-direction:column;gap:8px;}\n.check-item{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;border:1.5px solid rgba(26,76,142,.1);cursor:pointer;transition:all .15s;}\n.check-item:hover{border-color:#1a4c8e;background:rgba(26,76,142,.03);}\n.check-item.checked{border-color:#00b894;background:rgba(0,184,148,.05);}\n.cb{width:18px;height:18px;border-radius:5px;border:1.5px solid rgba(26,76,142,.25);display:flex;align-items:center;justify-content:center;flex-shrink:0;}\n.check-item.checked .cb{background:#00b894;border-color:#00b894;color:#fff;font-size:10px;font-weight:900;}\n.check-txt{font-size:13px;font-weight:600;color:#1a2b3c;}\n.diag-note{font-size:10px;color:#94a3b8;text-align:center;margin-top:10px;}</style></head><body><div class="wrap" style="background:#eef2f7;min-height:100vh;display:flex;align-items:center;"><div class="diag-wrap"><div class="diag-hd"><div class="badge" style="background:rgba(26,76,142,.08);color:#1a4c8e;margin-bottom:10px;">60秒で分かる</div><div class="diag-ttl">自社が補助金の対象か確認する</div><div class="diag-sub">当てはまる項目を選んでください（複数選択可）</div></div><ul class="check-list"><li class="check-item checked"><div class="cb">✓</div><span class="check-txt">設備投資・機械の更新を検討している</span></li><li class="check-item"><div class="cb"></div><span class="check-txt">人材採用・育成に課題がある</span></li><li class="check-item checked"><div class="cb">✓</div><span class="check-txt">DX化・省力化を進めたい</span></li><li class="check-item"><div class="cb"></div><span class="check-txt">事業承継・組織体制の強化を考えている</span></li><li class="check-item"><div class="cb"></div><span class="check-txt">競合との差別化・新規事業を検討している</span></li></ul><button class="btn-p" style="width:100%;justify-content:center;font-size:14px;padding:13px;">対象補助金を確認する（無料）›</button><p class="diag-note">※ 診断結果は可能性の確認であり、採択を保証するものではありません</p></div></div></body></html>';

  LP_HTML_PREVIEWS['lp-usecase-before-after-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '\n.sec-hd{text-align:center;margin-bottom:28px;}\n.ba-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;}\n.ba-card{border-radius:12px;padding:20px;}\n.ba-before{background:#fff5f5;border:1.5px solid rgba(239,68,68,.15);}\n.ba-after{background:#f0fdf9;border:1.5px solid rgba(0,184,148,.2);}\n.ba-label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.8px;margin-bottom:12px;}\n.ba-before .ba-label{color:#dc2626;}\n.ba-after .ba-label{color:#00b894;}\n.ba-items{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:7px;}\n.ba-item{display:flex;gap:8px;align-items:flex-start;font-size:12px;color:#4a5568;line-height:1.5;}\n.ba-ico{flex-shrink:0;font-size:12px;margin-top:1px;}\n.arrow-row{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:20px;}\n.arrow-ico{font-size:24px;}\n.arrow-txt{font-size:13px;font-weight:700;color:#1a4c8e;text-align:center;}\n@media(max-width:600px){.ba-grid{grid-template-columns:1fr;}}</style></head><body><div class="wrap"><div class="sec-hd"><span class="badge" style="background:rgba(26,76,142,.08);color:#1a4c8e;margin-bottom:10px;">Before / After</span><h2 class="ttl">補助金活用で<br>何が変わるのか</h2></div><div class="ba-grid"><div class="ba-card ba-before"><div class="ba-label">✕ 導入前の課題</div><ul class="ba-items"><li class="ba-item"><span class="ba-ico">😓</span>古い機械・車両を使い続けている</li><li class="ba-item"><span class="ba-ico">😓</span>設備投資に踏み切れない</li><li class="ba-item"><span class="ba-ico">😓</span>人手不足が解消されない</li><li class="ba-item"><span class="ba-ico">😓</span>競合との差が広がっている</li></ul></div><div class="ba-card ba-after"><div class="ba-label">✓ A社の支援後</div><ul class="ba-items"><li class="ba-item"><span class="ba-ico">✅</span>補助金で先行投資が実現</li><li class="ba-item"><span class="ba-ico">✅</span>自動化・省力化で生産性向上</li><li class="ba-item"><span class="ba-ico">✅</span>採用力・定着率の改善</li><li class="ba-item"><span class="ba-ico">✅</span>事業の競争力が向上</li></ul></div></div><div class="arrow-row"><div class="arrow-ico">💡</div><div class="arrow-txt">課題の根本を動かすには、<br>設備・体制への投資が必要です</div></div><div style="text-align:center"><a class="btn-p">どんな補助金が使えるか確認する ›</a></div></div></body></html>';

  LP_HTML_PREVIEWS['lp-flow-consultation-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '\n.sec-hd{text-align:center;margin-bottom:32px;}\n.flow-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px;position:relative;}\n.flow-grid::before{content:"";position:absolute;top:28px;left:calc(12.5% + 14px);right:calc(12.5% + 14px);height:2px;background:linear-gradient(90deg,#1a4c8e,#00b894);z-index:0;}\n.step{text-align:center;position:relative;z-index:1;}\n.step-num{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#1a4c8e,#1368d8);color:#fff;font-size:14px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;box-shadow:0 4px 12px rgba(26,76,142,.3);}\n.step-ttl{font-size:12px;font-weight:700;color:#1a2b3c;margin-bottom:5px;line-height:1.4;}\n.step-sub{font-size:10px;color:#4a5568;line-height:1.5;}\n.flow-note{background:#fff;border-radius:10px;padding:14px 16px;font-size:12px;color:#4a5568;text-align:center;border:1px solid rgba(26,76,142,.07);}\n@media(max-width:600px){.flow-grid{grid-template-columns:1fr 1fr;}.flow-grid::before{display:none;}}</style></head><body><div class="wrap"><div class="sec-hd"><span class="badge" style="background:rgba(26,76,142,.08);color:#1a4c8e;margin-bottom:10px;">申請フロー</span><h2 class="ttl">申請が、ゴールではありません。</h2><p class="sub">A社は採択後の実績報告・効果検証まで伴走します。</p></div><div class="flow-grid"><div class="step"><div class="step-num">1</div><div class="step-ttl">無料相談</div><div class="step-sub">事業内容・投資予定を整理します</div></div><div class="step"><div class="step-num">2</div><div class="step-ttl">制度・計画の整理</div><div class="step-sub">対象制度を特定し事業計画を整理</div></div><div class="step"><div class="step-num">3</div><div class="step-ttl">申請・採択支援</div><div class="step-sub">申請書の作成・提出をサポート</div></div><div class="step"><div class="step-num">4</div><div class="step-ttl">採択後の伴走</div><div class="step-sub">実績報告・効果検証まで支援</div></div></div><div class="flow-note">※ 申請書類の作成・提出が必要な場合は、提携行政書士法人等をご案内します</div></div></body></html>';

  LP_HTML_PREVIEWS['lp-faq-legal-safe-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '\n.sec-hd{text-align:center;margin-bottom:28px;}\n.faq-list{display:flex;flex-direction:column;gap:8px;}\n.faq-item{background:#fff;border-radius:12px;border:1px solid rgba(26,76,142,.07);overflow:hidden;}\n.faq-q{display:flex;align-items:center;gap:10px;padding:16px 18px;cursor:pointer;}\n.faq-q-ico{font-size:13px;font-weight:800;color:#1a4c8e;flex-shrink:0;}\n.faq-q-txt{font-size:13px;font-weight:700;color:#1a2b3c;flex:1;line-height:1.4;}\n.faq-arr{color:#94a3b8;transition:transform .2s;flex-shrink:0;}\n.faq-item.open .faq-arr{transform:rotate(180deg);}\n.faq-a{padding:0 18px 16px 40px;font-size:12px;color:#4a5568;line-height:1.8;border-top:1px solid rgba(26,76,142,.06);margin-top:0;padding-top:12px;display:none;}\n.faq-item.open .faq-a{display:block;}</style><script>document.addEventListener("click",function(e){var q=e.target.closest(".faq-q");if(!q)return;q.closest(".faq-item").classList.toggle("open");});</script></head><body><div class="wrap"><div class="sec-hd"><span class="badge" style="background:rgba(26,76,142,.08);color:#1a4c8e;margin-bottom:10px;">よくあるご質問</span><h2 class="ttl">よくあるご質問</h2></div><div class="faq-list"><div class="faq-item open"><div class="faq-q"><span class="faq-q-ico">Q.</span><span class="faq-q-txt">A社が補助金申請を代行してくれますか？</span><span class="faq-arr">▼</span></div><div class="faq-a">A社は、補助金情報の整理、対象制度の確認、事業計画・投資内容の整理など、申請前の準備支援を行います。官公署に提出する書類の作成・提出等、行政書士法により資格者が行うべき業務については、提携行政書士法人等が対応します。</div></div><div class="faq-item"><div class="faq-q"><span class="faq-q-ico">Q.</span><span class="faq-q-txt">相談すれば必ず採択されますか？</span><span class="faq-arr">▼</span></div><div class="faq-a">いいえ。補助金の採択は各制度の審査により決定されるため、採択を保証するものではありません。</div></div><div class="faq-item"><div class="faq-q"><span class="faq-q-ico">Q.</span><span class="faq-q-txt">費用はいつ発生しますか？</span><span class="faq-arr">▼</span></div><div class="faq-a">着手金15万円のみ最初にいただきます。その後は採択時・実績報告完了時・1年後の効果検証時の3回、それぞれ補助額の5%をいただきます。採択されなかった場合、コンサルティングフィーは発生しません。</div></div><div class="faq-item"><div class="faq-q"><span class="faq-q-ico">Q.</span><span class="faq-q-txt">建設業・運送業以外でも相談できますか？</span><span class="faq-arr">▼</span></div><div class="faq-a">はい、対応可能です。ただし建設業・運送業については業界特有の課題と補助金制度の知見が特に深く、よりきめ細かいご提案ができます。</div></div></div></div></body></html>';

  LP_HTML_PREVIEWS['lp-cta-companion-support-001'] = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + _BASE_CSS + '\nbody{background:linear-gradient(135deg,#1a4c8e 0%,#0f4a8f 48%,#1368d8 100%);min-height:100vh;}\n.wrap{padding:56px 32px;text-align:center;}\n.cta-ttl{font-size:1.8rem;font-weight:800;color:#fff;margin-bottom:10px;letter-spacing:-.5px;}\n.cta-sub{font-size:14px;color:rgba(255,255,255,.8);line-height:1.8;margin-bottom:32px;max-width:500px;margin-left:auto;margin-right:auto;}\n.cta-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;max-width:600px;margin:0 auto 24px;}\n.cta-card{background:rgba(255,255,255,.97);border-radius:14px;padding:20px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px;box-shadow:0 8px 32px rgba(0,0,0,.12);}\n.cta-card-ico{width:48px;height:48px;border-radius:50%;background:#EEF6FF;display:flex;align-items:center;justify-content:center;font-size:22px;}\n.cta-card-ttl{font-size:14px;font-weight:700;color:#1a2b3c;}\n.cta-card-body{font-size:11px;color:#4a5568;line-height:1.6;}\n.cta-card-btn{padding:8px 18px;background:#1a4c8e;color:#fff;border-radius:20px;font-size:12px;font-weight:700;margin-top:4px;}\n.cta-note{font-size:11px;color:rgba(255,255,255,.55);}\n@media(max-width:600px){.cta-grid{grid-template-columns:1fr;}}</style></head><body><div class="wrap"><h2 class="cta-ttl">まず、話を聞かせてください。</h2><p class="cta-sub">補助金のことを相談したい。自社が対象かどうか知りたい。それだけで構いません。</p><div class="cta-grid"><div class="cta-card"><div class="cta-card-ico">✉️</div><div class="cta-card-ttl">無料相談</div><div class="cta-card-body">経営課題と補助金の可能性について、まずお話しします。</div><div class="cta-card-btn">相談を予約する ›</div></div><div class="cta-card"><div class="cta-card-ico">🔍</div><div class="cta-card-ttl">補助金診断</div><div class="cta-card-body">会社名・URLを入力するだけで、使える可能性のある補助金をご案内します。</div><div class="cta-card-btn">無料で診断する ›</div></div><div class="cta-card"><div class="cta-card-ico">🤝</div><div class="cta-card-ttl">提携について</div><div class="cta-card-body">税理士・士業・ベンダーの方はパートナープログラムをご覧ください。</div><div class="cta-card-btn">提携ページへ ›</div></div><div class="cta-card"><div class="cta-card-ico">📚</div><div class="cta-card-ttl">補助金情報</div><div class="cta-card-body">現在公募中の補助金一覧を確認できます。</div><div class="cta-card-btn">補助金を検索する ›</div></div></div><p class="cta-note">補助金の活用や制度の整理について、お気軽にご相談ください。</p></div></body></html>';

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
    lpState.activeTab = LP_HTML_PREVIEWS[item.id] ? 'preview' : 'readme';
    renderCards(); // highlight active card
    // Reset tabs
    var tabsEl = document.getElementById('lplTabs');
    var defaultTab = LP_HTML_PREVIEWS[item.id] ? 'preview' : 'readme';
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
      var hasHtml = !!LP_HTML_PREVIEWS[item.id];
      var badgeHtml = '';
      if (item.hasPrompt)          badgeHtml += '<span class="lpl-badge has-prompt">⌥ Prompt</span>';
      if (item.hasPreview||hasHtml) badgeHtml += '<span class="lpl-badge has-preview">👁 Preview</span>';
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
      var previewHtml = LP_HTML_PREVIEWS[item.id];
      if (!previewHtml) {
        bodyEl.innerHTML = '<div class="lpl-no-content"><div class="lpl-no-icon">👁</div>プレビューはまだ用意されていません</div>';
      } else {
        bodyEl.style.padding = '0';
        bodyEl.style.overflow = 'hidden';
        bodyEl.style.display = 'flex';
        bodyEl.style.flexDirection = 'column';
        bodyEl.innerHTML = '<iframe class="lpl-preview-frame" sandbox="allow-scripts allow-same-origin" style="flex:1;width:100%;border:none;"></iframe>';
        var iframe = bodyEl.querySelector('.lpl-preview-frame');
        var blob = new Blob([previewHtml], { type: 'text/html; charset=utf-8' });
        iframe.src = URL.createObjectURL(blob);
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
