(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{132:function(s,n,a){var p=a(136);"string"==typeof p&&(p=[[s.i,p,""]]),p.locals&&(s.exports=p.locals);(0,a(36).default)("7f4f6bf1",p,!0,{})},134:function(s,n){s.exports='<section><h1>開発が止まっていたflow-to-typescriptを動かした話</h1>\n<p><a href="https://adventar.org/calendars/2972">We Are JavaScripters!【執筆初心者歓迎】 Advent Calendar 2018</a> 2日目の記事です。</p>\n<p>jsの記事はさして読んで嬉しい記事をかけないのですが、初心者歓迎とのことなので書かせていただきます！</p>\n<p>今回はReact/Flow製アプリを<a href="https://github.com/bcherny/flow-to-typescript"><code>bcherny/flow-to-typescript</code></a>を使ってReact/TypeScriptに変換できるのか試して見ました。<br>\nFlowからTSへ移行する際のモチペーションや進める上でのTIPS等はPIXTAさんの<a href="https://texta.pixta.jp/entry/2018/06/07/120000">Flow から TypeScript に移行しました</a>が詳しいので、こちらを参照される事をオススメしますw<br>\n今回は上記記事にも出てくる<a href="https://github.com/bcherny/flow-to-typescript"><code>bcherny/flow-to-typescript</code></a>を実際に使って見たらどんなもんかと思い、試してみたログになります。</p>\n<h2>TL;DR</h2>\n<ul>\n<li>動けばok程度であれば自動ツールを使うことで変換できることが確認できた。</li>\n<li>TypeScriptのエラー等正しく取り除くためにはペインも多いので、業務で実行するにはROI悪めな印象を受けた。</li>\n<li>アウトプットはこちら<a href="https://github.com/sizer/mobx-flow-example">sizer/mobx-flow-example</a>。</li>\n</ul>\n<p>やったことは</p>\n<ul>\n<li>flow-to-typescriptを動くようにする</li>\n<li>TSコンパイラとWebpackの設定を書く</li>\n<li>TypeScriptが.tsxじゃないとJSX変換できないので変換する</li>\n</ul>\n<p>です。</p>\n<h2>変換するアプリケーション</h2>\n<p>githubで「react flow」などのキーワードで検索をして程よい規模のリポジトリを見つけたので下記を変換することに決定。</p>\n<p><a href="https://github.com/karlem/mobx-flow-example">karlem/mobx-flow-example</a></p>\n<p>\bToDoアプリケーションですね。Forkして作業リポジトリを作る</p>\n<h3>作業リポジトリ(TypeScript)</h3>\n<p><a href="https://github.com/sizer/mobx-flow-example">https://github.com/sizer/mobx-flow-example</a></p>\n<h2>flow-to-typescriptを動くようにする</h2>\n<p>とりあえず<code>README.md</code>に書いてあるままに</p>\n<p><code>flow2ts.js</code></p>\n<pre><code class="language-js"><span class="hljs-keyword">const</span> f2ts = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'flow-to-typescript\'</span>)\n<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'fs\'</span>)\n\n<span class="hljs-keyword">let</span> path = <span class="hljs-string">\'src/index.js\'</span>\n<span class="hljs-keyword">let</span> file = fs.readFileSync(path, <span class="hljs-string">\'utf-8\'</span>)\n\nf2ts.compile(file, path).then(<span class="hljs-function"><span class="hljs-params">ts</span> =&gt;</span>\n  fs.writeFileSync(<span class="hljs-string">\'src/index.ts\'</span>, ts)\n)\n</code></pre>\n<p>実行。</p>\n<pre><code class="language-js">&gt; <span class="hljs-keyword">const</span> f2ts = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'flow-to-typescript\'</span>)\n{ <span class="hljs-attr">Error</span>: Cannot find <span class="hljs-built_in">module</span> <span class="hljs-string">\'flow-to-typescript\'</span>\n    at <span class="hljs-built_in">Function</span>.Module._resolveFilename (internal/modules/cjs/loader.js:<span class="hljs-number">587</span>:<span class="hljs-number">15</span>)\n    at <span class="hljs-built_in">Function</span>.Module._load (internal/modules/cjs/loader.js:<span class="hljs-number">513</span>:<span class="hljs-number">25</span>)\n    at Module.require (internal/modules/cjs/loader.js:<span class="hljs-number">643</span>:<span class="hljs-number">17</span>)\n    at <span class="hljs-built_in">require</span> (internal/modules/cjs/helpers.js:<span class="hljs-number">22</span>:<span class="hljs-number">18</span>) code: <span class="hljs-string">\'MODULE_NOT_FOUND\'</span> }\n</code></pre>\n<p>動かない、まじか笑</p>\n<p><a href="https://github.com/bcherny/flow-to-typescript/issues/1">Continued development / support #1</a></p>\n<p>どうやら開発が止まっているようですねw<br>\n(この辺でPIXTAさんの記事を知りましたw)</p>\n<p>こちらもForkして動くところまで持って行きました。</p>\n<p><a href="https://github.com/bcherny/flow-to-typescript/compare/master...sizer:develop?expand=1">diffはこちら</a></p>\n<ul>\n<li>古<code>@bable/babylon</code>を使っていたので、現在利用されている<code>@babel/parser</code>に移行</li>\n<li>TypeScriptが古かったので最新化</li>\n</ul>\n<p>しました。</p>\n<h3>改めて</h3>\n<p><code>flow2ts.js</code></p>\n<pre><code class="language-js"><span class="hljs-keyword">const</span> flow2typescript = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'./flow-to-typescript/dist/src\'</span>)\n<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'fs\'</span>)\n<span class="hljs-keyword">const</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'glob\'</span>)\n<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'path\'</span>)\n\n<span class="hljs-keyword">const</span> convertJS2TS = <span class="hljs-function"><span class="hljs-params">path</span> =&gt;</span> path.replace(<span class="hljs-string">\'\\.js\'</span>, <span class="hljs-string">\'\\.ts\'</span>).replace(<span class="hljs-string">\'src\'</span>, <span class="hljs-string">\'ts\'</span>)\n\n<span class="hljs-keyword">const</span> compile2TS = <span class="hljs-function">(<span class="hljs-params">file</span>) =&gt;</span> (\n  flow2typescript.compile(\n    fs.readFileSync(file, <span class="hljs-string">\'utf-8\'</span>),\n    file,\n  ).then(<span class="hljs-function"><span class="hljs-params">ts</span> =&gt;</span> {\n    fs.promises.mkdir(path.dirname(convertJS2TS(file)), { <span class="hljs-attr">recursive</span>: <span class="hljs-literal">true</span> })\n    <span class="hljs-keyword">return</span> ts\n  }).then(<span class="hljs-function"><span class="hljs-params">ts</span> =&gt;</span> {\n    fs.writeFileSync(convertJS2TS(file), ts)\n  })\n)\n\n<span class="hljs-keyword">let</span> pattern = <span class="hljs-string">\'src/**/*.js*\'</span>\n\nglob(pattern, (_, files) =&gt; { files.forEach(<span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> compile2TS(file)) } )\n</code></pre>\n<p>Forkした方のブランチを相対パス指定することで解決。</p>\n<p>無事、.js -&gt; .ts変換できました。</p>\n<h2>TSコンパイラとWebpackの設定を書く</h2>\n<p><a href="https://github.com/sizer/mobx-flow-example/commit/b028e633c78842bdcc84d0303da733ce24d73774"><code>commitはこちら</code></a></p>\n<ul>\n<li>mobx-flow-example\n<ul>\n<li>src\n<ul>\n<li>ここにFlow製の元ファイル</li>\n</ul>\n</li>\n<li>ts\n<ul>\n<li>こちらに変換した.tsファイルを吐き出す。</li>\n</ul>\n</li>\n<li>dist\n<ul>\n<li>Webpackの成果物はこちら</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n<p>こんな感じでビルドして行きます。</p>\n<h2>TypeScriptが.tsxじゃないとJSX変換できないので変換する</h2>\n<p>これ、ハマりました。</p>\n<p>公式にも書いてあるのですが、</p>\n<blockquote>\n<p>In order to use JSX you must do two things.</p>\n<ol>\n<li>Name your files with a .tsx extension</li>\n<li>Enable the jsx option</li>\n</ol>\n<p><a href="https://www.typescriptlang.org/docs/handbook/jsx.html">https://www.typescriptlang.org/docs/handbook/jsx.html</a></p>\n</blockquote>\n<p>TypeScriptはJSXを変換する際は、拡張子が.tsxじゃないといけないのですね、、、</p>\n<p><code>tsconfig.json</code>に<code>&quot;jsx&quot;: &quot;react&quot;</code>って書いたらイケるのかと思いきや、壊れた.jsファイルとしばらく格闘することになりました :sob:</p>\n<p>こちらはやむなく手動で.js-&gt;.jsxに変換。</p>\n<p><a href="https://github.com/sizer/mobx-flow-example/commit/a6c287838302f705cf8fcd17bfc12d54b429b734">commit</a></p>\n<p>ここまでやってアプリ自体は動くところまできました。</p>\n<p><code>yarn run build</code> で <code>dist/index.html</code> にアプリが吐き出される事を確認。</p>\n<h2>やってみて</h2>\n<p>検証がてらやってみましたが、業務でやる内容ではないなーという気はしましたw<br>\n手間がかかる割に、成果物の質が低いのでw</p>\n<p><a href="https://texta.pixta.jp/entry/2018/06/07/120000">PIXTAさんの記事</a>にも書いてありますが、.jsと.ts共存できる環境作って、徐々にFlow製のアプリをTypeScriptに変換するのが吉かな、という印象でした。</p>\n<p>以上です。パケットの無駄遣い失礼w</p>\n</section>\n'},135:function(s,n,a){"use strict";var p=a(132);a.n(p).a},136:function(s,n,a){(s.exports=a(35)(!1)).push([s.i,"\n.container{min-height:100vh;display:flex;margin:30px\n}",""])},139:function(s,n,a){"use strict";a.r(n);var p=a(134),l=a.n(p),t={components:{},computed:{c20181202:function(){return l.a}}},e=(a(135),a(18)),c=Object(e.a)(t,function(){var s=this.$createElement,n=this._self._c||s;return n("section",{staticClass:"container"},[n("div",{domProps:{innerHTML:this._s(this.c20181202)}})])},[],!1,null,null,null);c.options.__file="20181202.vue";n.default=c.exports}}]);