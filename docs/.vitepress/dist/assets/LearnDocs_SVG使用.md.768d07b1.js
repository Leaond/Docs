import{_ as s,o,c as a,Q as n}from"./chunks/framework.a7175731.js";const q=JSON.parse('{"title":"SVG","description":"","frontmatter":{},"headers":[],"relativePath":"LearnDocs/SVG使用.md","filePath":"LearnDocs/SVG使用.md"}'),l={name:"LearnDocs/SVG使用.md"},p=n(`<h1 id="svg" tabindex="-1">SVG <a class="header-anchor" href="#svg" aria-label="Permalink to &quot;SVG&quot;">​</a></h1><h2 id="通用属性" tabindex="-1">通用属性 <a class="header-anchor" href="#通用属性" aria-label="Permalink to &quot;通用属性&quot;">​</a></h2><pre><code>fill：定义矩形的填充颜色
stroke-width：定义边框宽度
stroke：定义矩形边框的颜色
fill-opacity：定义填充颜色的不透明度（0-1取值范围）
stroke-opacity：定义描边颜色的不透明度（0-1取值范围）
opacity：整个元素的不透明度
</code></pre><h2 id="rect" tabindex="-1">rect <a class="header-anchor" href="#rect" aria-label="Permalink to &quot;rect&quot;">​</a></h2><pre><code>width：定义矩形的宽度
height：定义矩形的高度
fill：定义矩形的填充颜色
stroke-width：定义矩形的边框宽度
stroke：定义矩形边框的颜色
x：定义矩形左边位置
y：定义矩形顶部位置
fill-opacity：定义填充颜色的不透明度（0-1取值范围）
stroke-opacity：定义描边颜色的不透明度（0-1取值范围）
opacity：整个元素的不透明度
rx：定义圆角X轴方向的半径长度
ry：定义圆角y轴方向的半径长度
</code></pre><h2 id="circle" tabindex="-1">circle <a class="header-anchor" href="#circle" aria-label="Permalink to &quot;circle&quot;">​</a></h2><pre><code>cx：定义圆形中心的X坐标
cy：定义圆形中心的y坐标
r：定义圆形的半径
</code></pre><h2 id="ellipse椭圆" tabindex="-1">ellipse椭圆 <a class="header-anchor" href="#ellipse椭圆" aria-label="Permalink to &quot;ellipse椭圆&quot;">​</a></h2><pre><code>cx：定义椭圆中心的X坐标
cy：定义椭圆中心的y坐标
rx：定义椭圆的水平半径
ry：定义椭圆的垂直半径
</code></pre><h2 id="线条-line" tabindex="-1">线条 line <a class="header-anchor" href="#线条-line" aria-label="Permalink to &quot;线条 line&quot;">​</a></h2><pre><code>x1：定义x轴上直线的起点坐标
y1：定义y轴上直线的起点坐标
x2：定义x轴上直线的末端坐标
y2：定义y轴上直线的末端坐标
</code></pre><h2 id="多线条-polyline" tabindex="-1">多线条 polyline <a class="header-anchor" href="#多线条-polyline" aria-label="Permalink to &quot;多线条 polyline&quot;">​</a></h2><pre><code>points：定义绘制折线所需的点，也就是两个以上的x和y的坐标对
</code></pre><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">svg</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">width</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;500&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">height</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;180&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        //绘制梯形</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">polyline</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">points</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;0,40 40,40 40,80 80,80 80,120 120,120 120,160&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fill</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;none&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">stroke</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;red&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">stroke-width</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;4&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">polyline</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">svg</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">svg</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">width</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;500&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">height</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;180&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        //绘制梯形</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">polyline</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">points</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;0,40 40,40 40,80 80,80 80,120 120,120 120,160&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fill</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;none&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">stroke</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;red&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">stroke-width</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;4&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">polyline</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">svg</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="多边形-polygon" tabindex="-1">多边形 polygon <a class="header-anchor" href="#多边形-polygon" aria-label="Permalink to &quot;多边形 polygon&quot;">​</a></h2><pre><code>points：定义多边形每个角的x和y的坐标，它的值至少要三对坐标
</code></pre><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">svg</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">width</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;500&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">height</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;210&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      //绘制一个五角星</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">polygon</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">points</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;100,10 40,198 198,78 10,78 160,198&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fill</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;lime&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">stroke</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;purple&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#B392F0;">stroke-width</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;5&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">polygon</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">svg</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">svg</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">width</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;500&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">height</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;210&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      //绘制一个五角星</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">polygon</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">points</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;100,10 40,198 198,78 10,78 160,198&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fill</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;lime&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">stroke</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;purple&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6F42C1;">stroke-width</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;5&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">polygon</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">svg</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="路径-path" tabindex="-1">路径 path <a class="header-anchor" href="#路径-path" aria-label="Permalink to &quot;路径 path&quot;">​</a></h2><pre><code>b:绘制路径的命令

    - M命令（moveto）定义绘制图形的起点坐标
   - L命令（lineto）用来绘制一条直线
   - q：绘制二次贝塞尔曲线
</code></pre><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//贝塞尔曲线</span></span>
<span class="line"><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">svg</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">width</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;450&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">height</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;400&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">g</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fill</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;none&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">d</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;M 100 350 l 150 -300&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">stroke</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;red&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">stroke-width</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;3&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">d</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;M 250 50 l 150 300&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">stroke</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;red&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">stroke-width</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;3&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">d</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;M 175 200 l 150 0&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">stroke</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;green&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">stroke-width</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;3&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">d</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;M 100 350 q 150 -300 300 0&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">stroke</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;blue&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">stroke-width</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;3&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#85E89D;">g</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;!-- g标签可以把元素包裹起来，在g标签上设置公共属性 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">g</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fill</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;black&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cx</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;100&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cy</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;350&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">r</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;3&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cx</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;250&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cy</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;50&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">r</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;3&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cx</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;400&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cy</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;350&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">r</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;3&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#85E89D;">g</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">g</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">font-size</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;20&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fill</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;black&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">text-anchor</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;middle&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">text</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">x</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;100&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">y</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;350&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dx</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;-30&quot;</span><span style="color:#E1E4E8;">&gt;A&lt;/</span><span style="color:#85E89D;">text</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">text</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">x</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;250&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">y</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;50&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dx</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;-10&quot;</span><span style="color:#E1E4E8;">&gt;B&lt;/</span><span style="color:#85E89D;">text</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">text</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">x</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;400&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">y</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;350&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dx</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;30&quot;</span><span style="color:#E1E4E8;">&gt;C&lt;/</span><span style="color:#85E89D;">text</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#85E89D;">g</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;/</span><span style="color:#85E89D;">svg</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//贝塞尔曲线</span></span>
<span class="line"><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">svg</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">width</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;450&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">height</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;400&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">g</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fill</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;none&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">path</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">d</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;M 100 350 l 150 -300&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">stroke</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;red&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">stroke-width</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;3&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">path</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">path</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">d</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;M 250 50 l 150 300&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">stroke</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;red&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">stroke-width</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;3&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">path</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">path</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">d</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;M 175 200 l 150 0&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">stroke</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;green&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">stroke-width</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;3&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">path</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">path</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">d</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;M 100 350 q 150 -300 300 0&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">stroke</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;blue&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">stroke-width</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;3&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">path</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#22863A;">g</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;!-- g标签可以把元素包裹起来，在g标签上设置公共属性 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">g</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fill</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;black&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">circle</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cx</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;100&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cy</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;350&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">r</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;3&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">circle</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">circle</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cx</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;250&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cy</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;50&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">r</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;3&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">circle</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">circle</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cx</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;400&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cy</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;350&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">r</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;3&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">circle</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#22863A;">g</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">g</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">font-size</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;20&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fill</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;black&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">text-anchor</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;middle&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">text</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">x</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;100&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">y</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;350&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dx</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;-30&quot;</span><span style="color:#24292E;">&gt;A&lt;/</span><span style="color:#22863A;">text</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">text</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">x</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;250&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">y</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;50&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dx</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;-10&quot;</span><span style="color:#24292E;">&gt;B&lt;/</span><span style="color:#22863A;">text</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">text</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">x</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;400&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">y</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;350&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dx</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;30&quot;</span><span style="color:#24292E;">&gt;C&lt;/</span><span style="color:#22863A;">text</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#22863A;">g</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   &lt;/</span><span style="color:#22863A;">svg</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="动画属性-transform" tabindex="-1">动画属性 transform <a class="header-anchor" href="#动画属性-transform" aria-label="Permalink to &quot;动画属性 transform&quot;">​</a></h2><pre><code>translate（平移）
scale（缩放）
rotate(旋转)
skew（倾斜）
</code></pre>`,22),t=[p];function e(c,r,y,E,F,i){return o(),a("div",null,t)}const g=s(l,[["render",e]]);export{q as __pageData,g as default};
