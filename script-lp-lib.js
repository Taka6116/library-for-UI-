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
    activeTab: "readme"
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
    lpState.activeTab = 'readme';
    renderCards(); // highlight active card
    // Reset tabs
    var tabsEl = document.getElementById('lplTabs');
    if (tabsEl) {
      tabsEl.querySelectorAll('.lpl-tab').forEach(function(t){
        t.classList.toggle('active', t.dataset.tab === 'readme');
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
      var badgeHtml = '';
      if (item.hasPrompt)  badgeHtml += '<span class="lpl-badge has-prompt">⌥ Prompt</span>';
      if (item.hasPreview) badgeHtml += '<span class="lpl-badge has-preview">👁 Preview</span>';
      if (!item.hasPrompt && !item.hasPreview) badgeHtml += '<span class="lpl-badge no-content">準備中</span>';
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
    } else if (tab === 'usage') {
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
