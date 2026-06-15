import { useEffect, useRef, useState } from "react";
import properties from "./data/properties.json";
import siteContent from "./data/site-content.json";

const MARQUEE_ITEMS = siteContent.marqueeItems;
const COMPARISON_ROWS = siteContent.comparisonRows;

interface Property {
  id: string;
  tag: string;
  tagClass: string;
  name: string;
  location: string;
  price: string;
  priceSub: string;
  yieldVal: string;
  yieldLabel: string;
  specVal: string;
  specLabel: string;
  images: string[];
  financial: { label: string; value: string; highlight?: boolean }[];
  specs: { label: string; value: string }[];
  highlights: string[];
}

const PROPERTIES: Property[] = properties as Property[];

function PropertyRow({ prop }: { prop: Property }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`prop-row${open ? " open" : ""}`} onClick={() => setOpen(!open)}>
      <div className="prop-summary">
        <div>
          <span className={`prop-tag ${prop.tagClass}`}>{prop.tag}</span>
          <div className="prop-name">{prop.name}</div>
          <div className="prop-loc">{prop.location}</div>
        </div>
        <div>
          <div className="prop-price">{prop.price}</div>
          <div className="prop-price-sub">{prop.priceSub}</div>
        </div>
        <div>
          <div className="prop-yield">{prop.yieldVal}</div>
          <div className="prop-yield-label">{prop.yieldLabel}</div>
        </div>
        <div>
          <div className="prop-spec-val">{prop.specVal}</div>
          <div className="prop-spec-label">{prop.specLabel}</div>
        </div>
        <button
          className="prop-toggle"
          onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
          aria-label={open ? "收起" : "展开"}
        >＋</button>
      </div>
      <div className="prop-detail">
        <div className="prop-img-strip">
          {prop.images.map((src, i) => (
            <img key={i} src={src} alt={prop.name} className="prop-img" loading="lazy" />
          ))}
        </div>
        <div className="prop-detail-cols">
          <div className="detail-col">
            <h4>财务数据</h4>
            {prop.financial.map((f, i) => (
              <div className="detail-line" key={i}>
                <span>{f.label}</span>
                <span style={f.highlight ? { color: "var(--gold)", fontWeight: 500 } : {}}>{f.value}</span>
              </div>
            ))}
          </div>
          <div className="detail-col">
            <h4>物业规格</h4>
            {prop.specs.map((s, i) => (
              <div className="detail-line" key={i}>
                <span>{s.label}</span>
                <span>{s.value}</span>
              </div>
            ))}
          </div>
          <div className="detail-col">
            <h4>投资亮点</h4>
            {prop.highlights.map((h, i) => (
              <div className="highlight-line" key={i}>{h}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* NAV */}
      <nav ref={navRef} className={`site-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo">TOKYO PROPERTIES</div>
        <div className="nav-right">
          <span className="nav-link" onClick={() => scrollTo("categories")}>投资品类</span>
          <span className="nav-link" onClick={() => scrollTo("properties")}>精选物业</span>
          <span className="nav-link" onClick={() => scrollTo("compare")}>数据对比</span>
          <a href="https://wa.me/6589675668" className="nav-cta" target="_blank" rel="noopener noreferrer">
            联系顾问
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-body">
          <div className="hero-kicker">新加坡投资者专属 · Japan Premium Real Estate</div>
          <h1 className="hero-h1">
            INVEST<br />IN<br /><em>Tokyo</em>
          </h1>
          <div className="hero-bottom">
            <p className="hero-desc">
              东京·川崎永久产权 · 年化回报3.2%–6.4%<br />
              全中文一站式服务，为新加坡投资者打造的日本不动产精选组合
            </p>
            <div className="hero-stats">
              <div>
                <div className="hs-val">6.4%</div>
                <div className="hs-label">最高年化回报</div>
              </div>
              <div>
                <div className="hs-val">S$669</div>
                <div className="hs-label">月租起</div>
              </div>
              <div>
                <div className="hs-val">11</div>
                <div className="hs-label">精选物业</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item: string, i: number) => (
            <span className="m-item" key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="wrap" id="categories">
        <div className="cat-header">
          <div>
            <div className="eyebrow">五大投资品类</div>
            <h2 className="display">INVESTMENT<br /><em>Categories</em></h2>
          </div>
          <p className="lead" style={{ marginTop: 0 }}>
            从低门槛住宅公寓到商业店铺整栋，五大品类覆盖不同风险偏好与资金规模，精准匹配您的投资目标。
          </p>
        </div>
        <div className="cat-grid cat-grid-5">
          <div className="cat-card">
            <div className="cat-num">01</div>
            <div className="cat-name">住宅投资公寓</div>
            <div className="cat-meta">稳定现金流 · 入门首选</div>
            <div className="cat-for">稳健长期投资者<br />永久产权、出租率高</div>
            <div className="cat-rate">4.85%</div>
            <div className="cat-rate-label">年化回报率</div>
            <div className="cat-foot" />
          </div>
          <div className="cat-card">
            <div className="cat-num">02</div>
            <div className="cat-name">一户建 / 独栋住宅</div>
            <div className="cat-meta">自住 + 长期保值</div>
            <div className="cat-for">家庭自住、留学家庭<br />资产传承者</div>
            <div className="cat-rate" style={{ fontSize: "1.1rem", lineHeight: 1.5 }}>3.5–4.5%</div>
            <div className="cat-rate-label">出租参考回报率</div>
            <div className="cat-foot" />
          </div>
          <div className="cat-card">
            <div className="cat-num">03</div>
            <div className="cat-name">高端塔楼公寓</div>
            <div className="cat-meta">高端配置 · 地标物业</div>
            <div className="cat-for">高净值人群<br />品质自住者</div>
            <div className="cat-rate">3.2–3.5%</div>
            <div className="cat-rate-label">年化回报率</div>
            <div className="cat-foot" />
          </div>
          <div className="cat-card">
            <div className="cat-num">04</div>
            <div className="cat-name">整栋商办 / 收租楼</div>
            <div className="cat-meta">多元高现金流</div>
            <div className="cat-for">企业投资者<br />高净值机构</div>
            <div className="cat-rate" style={{ fontSize: "1.1rem", lineHeight: 1.5 }}>4.23–4.5%</div>
            <div className="cat-rate-label">年化回报率</div>
            <div className="cat-foot" />
          </div>
          <div className="cat-card">
            <div className="cat-num">05</div>
            <div className="cat-name">商业店铺 / 事务所</div>
            <div className="cat-meta">高净回报 · 带租约即收</div>
            <div className="cat-for">现金流优先投资者<br />商业资产配置</div>
            <div className="cat-rate" style={{ fontSize: "1.1rem", lineHeight: 1.5 }}>5.0–6.4%</div>
            <div className="cat-rate-label">年化毛回报率</div>
            <div className="cat-foot" />
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section className="wrap bg-stone" id="properties">
        <div className="prop-intro">
          <div>
            <div className="eyebrow">重点投资案例</div>
            <h2 className="display">FEATURED<br /><em>Properties</em></h2>
            <p className="lead">十一套精选物业，全程新币标价。汇率基准：1日元 = 0.0088新币。点击任意房源查看完整投资数据。</p>
          </div>
        </div>
        <div className="props-list">
          {PROPERTIES.map((prop) => (
            <PropertyRow key={prop.id} prop={prop} />
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="wrap" id="compare">
        <div className="eyebrow">收益最高五大物业</div>
        <h2 className="display">INVESTMENT<br /><em>Overview</em></h2>
        <p className="lead">按净回报率排列的前五名物业横向对比，依据实际汇率（1JPY = 0.0088 SGD）换算，帮助您找到最高效的切入点。</p>
        <table className="compare-table">
          <thead>
            <tr>
              <th>建筑类型</th>
              <th>建筑年份</th>
              <th>核心面积</th>
              <th>地段层级</th>
              <th>月租区间（新币）</th>
              <th>年化回报率</th>
              <th>投资定位</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row: Record<string, string>, i: number) => (
              <tr key={i}>
                <td>
                  <div className="td-type">{row.type}</div>
                  <div><span className={`compare-tag ${row.tagClass}`}>{row.tagLabel}</span></div>
                </td>
                <td>{row.year}</td>
                <td>{row.area}</td>
                <td>{row.district}</td>
                <td style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{row.rent}</td>
                <td className="td-rate">{row.rate}</td>
                <td style={{ color: "var(--muted)", fontSize: "0.78rem" }}>{row.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* SERVICE */}
      <section className="wrap-sm bg-stone" id="service">
        <div className="eyebrow">一站式全流程</div>
        <h2 className="display">HOW WE<br /><em>Serve You</em></h2>
        <p className="lead">从线上看房到过户签约，全程中文专员陪伴，解决海外投资的每一道壁垒。</p>
        <div className="service-grid">
          <div className="svc">
            <div className="svc-n">01</div>
            <div className="svc-title">海外看房</div>
            <div className="svc-desc">线上实景看房，高清视频带看，足不出户了解每套物业细节。</div>
          </div>
          <div className="svc">
            <div className="svc-n">02</div>
            <div className="svc-title">中文专员</div>
            <div className="svc-desc">全流程中文咨询，专业顾问一对一服务，零语言障碍。</div>
          </div>
          <div className="svc">
            <div className="svc-n">03</div>
            <div className="svc-title">贷款 &amp; 税务</div>
            <div className="svc-desc">融资咨询、税务合规规划，最大化您的投资净收益。</div>
          </div>
          <div className="svc">
            <div className="svc-n">04</div>
            <div className="svc-title">出租托管</div>
            <div className="svc-desc">物业代运营、收租管理，坐享被动现金流，省心省力。</div>
          </div>
          <div className="svc">
            <div className="svc-n">05</div>
            <div className="svc-title">过户签约</div>
            <div className="svc-desc">全程陪同办理，解决海外投资壁垒，安全完成资产交割。</div>
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="wrap-sm">
        <div className="eyebrow">投资总结</div>
        <h2 className="display">WHY<br /><em>Tokyo?</em></h2>
        <div className="sum-grid">
          <div className="sum-card">
            <div className="sum-icon">I.</div>
            <div className="sum-title">收益分层，精准匹配</div>
            <div className="sum-body">
              商业店铺/事务所净回报最高 <strong>5.2%</strong>，毛回报达 <strong>6.4%</strong>；住宅公寓 <strong>4.85%</strong>，入门稳健；整栋物业 <strong>4.23%–4.5%</strong>，满租稳定现金流；高端塔楼 <strong>3.2%–3.5%</strong>，品质资产传承。
              <br /><br />
              收益与资产体量、风险偏好精准对应，11套物业覆盖全谱系。
            </div>
          </div>
          <div className="sum-card">
            <div className="sum-icon">II.</div>
            <div className="sum-title">日本市场核心优势</div>
            <div className="sum-body">
              <strong>永久产权</strong>，资产完整归属；租赁市场成熟，<strong>空置率极低</strong>；法制健全，租约保障双方权益。
              <br /><br />
              东京核心地段资产<strong>长期抗通胀</strong>保值。
            </div>
          </div>
          <div className="sum-card">
            <div className="sum-icon">III.</div>
            <div className="sum-title">新加坡投资者最佳切入</div>
            <div className="sum-body">
              <strong>S$125,000起</strong>可入市，无ABSD限制，汇率对冲优势显著；
              <br /><br />
              中长期可配置高端或整栋物业，实现<strong>资产国际化多元配置</strong>。
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wrap bg-black" id="contact">
        <div className="cta-wrap">
          <div>
            <div className="eyebrow" style={{ color: "var(--gold-pale)" }}>立即开始</div>
            <div className="cta-h">READY TO<br />INVEST IN<br /><em>Tokyo?</em></div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "1.5rem", maxWidth: 340, lineHeight: 1.85 }}>
              获取专属投资方案，我们的中文顾问将在24小时内与您联系。
            </p>
          </div>
          <div className="cta-card">
            <div className="cta-label">专属顾问</div>
            <div className="cta-name">YanLiang</div>
            <div className="cta-row">
              <span className="cta-row-key">WhatsApp</span>
              <a href="https://wa.me/6589675668" target="_blank" rel="noopener noreferrer">+65 8967 5668</a>
            </div>
            <div className="cta-row">
              <span className="cta-row-key">语言</span>
              <span>中文 · English</span>
            </div>
            <div className="cta-btns">
              <a href="https://wa.me/6589675668" className="btn btn-fill" target="_blank" rel="noopener noreferrer">
                WhatsApp 立即咨询
              </a>
              <a href="#properties" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); scrollTo("properties"); }}>
                浏览所有房源 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">TOKYO PROPERTIES</div>
        <div>汇率换算基准：1日元 = 0.0088新币（SGD） · © 2025 · 本页数据仅供参考，实际以合同为准</div>
      </footer>
    </>
  );
}
