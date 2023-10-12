import{_ as s,o as e,c as a,Q as n}from"./chunks/framework.a7175731.js";const h=JSON.parse('{"title":"路由","description":"","frontmatter":{},"headers":[],"relativePath":"toolsdocs/路由.md","filePath":"toolsdocs/路由.md"}'),l={name:"toolsdocs/路由.md"},p=n(`<h1 id="路由" tabindex="-1">路由 <a class="header-anchor" href="#路由" aria-label="Permalink to &quot;路由&quot;">​</a></h1><pre><code>VitePress使用的是基于文件的路由，所以生成的HTML页面是从MarkDown文件的目录结构映射而来的。
</code></pre><p>下面是官网提供的一个例子： 比如有一个如下目录结构的项目：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">.</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ guide</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ getting-started.md</span></span>
<span class="line"><span style="color:#e1e4e8;">│  └─ index.md</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ index.md</span></span>
<span class="line"><span style="color:#e1e4e8;">└─ prologue.md</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">.</span></span>
<span class="line"><span style="color:#24292e;">├─ guide</span></span>
<span class="line"><span style="color:#24292e;">│  ├─ getting-started.md</span></span>
<span class="line"><span style="color:#24292e;">│  └─ index.md</span></span>
<span class="line"><span style="color:#24292e;">├─ index.md</span></span>
<span class="line"><span style="color:#24292e;">└─ prologue.md</span></span></code></pre></div><p>那么生成的HTML的路由会是下面的样子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">index.md                  --&gt;  /index.html (accessible as /)</span></span>
<span class="line"><span style="color:#e1e4e8;">prologue.md               --&gt;  /prologue.html</span></span>
<span class="line"><span style="color:#e1e4e8;">guide/index.md            --&gt;  /guide/index.html (accessible as /guide/)</span></span>
<span class="line"><span style="color:#e1e4e8;">guide/getting-started.md  --&gt;  /guide/getting-started.html</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">index.md                  --&gt;  /index.html (accessible as /)</span></span>
<span class="line"><span style="color:#24292e;">prologue.md               --&gt;  /prologue.html</span></span>
<span class="line"><span style="color:#24292e;">guide/index.md            --&gt;  /guide/index.html (accessible as /guide/)</span></span>
<span class="line"><span style="color:#24292e;">guide/getting-started.md  --&gt;  /guide/getting-started.html</span></span></code></pre></div>`,6),t=[p];function o(c,i,d,r,g,m){return e(),a("div",null,t)}const _=s(l,[["render",o]]);export{h as __pageData,_ as default};
