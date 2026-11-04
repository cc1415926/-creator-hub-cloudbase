import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Bookmark, Clock3, Grid2X2, Heart, Images, Megaphone, Mic2, Search, SlidersHorizontal, Sparkles, Video, WandSparkles, X } from 'lucide-react'
import './styles.css'

const categories = ['全部工具', '常用工具', 'AI 绘图', '视频剪辑', '文案/提示词', '素材库', '配音', '运营数据', '办公协作', '设计资源', '去水印', '博主工具箱']
const FAVORITES_KEY = 'creator-hub-static-favorites-v1'
const RECENT_KEY = 'creator-hub-static-recent-v1'
const staticToolRows = [
  ['AI 绘图', '', 'NanoPhoto', 'https://nanophoto.ai/zh', '视频反推提示词'], ['AI 绘图', '', 'RunningHub', 'https://www.runninghub.cn/?utm_source=bingpinzhuan', 'AI 绘画工作流'], ['AI 绘图', '', 'AIGC 全模型', 'https://www.aigc.cn/#term-2494', '全模型集成网站'], ['AI 绘图', '', 'NextAICore', 'https://nextaicore.com/list/start', '全模型集成网站'],
  ['去水印', '', 'AnyToCopy', 'https://www.anytocopy.com/', '多平台视频文案提取、视频与图片去水印'], ['去水印', '', '去水印工具', 'https://dy.kukutool.com/', '多平台无水印视频、图片解析下载'], ['博主工具箱', '', '飞哥工具箱', 'https://feige177.com/', '博主工具箱'], ['博主工具箱', '', '亮琪创作室', 'https://www.liangqi.net/cut', '剪辑与创作资源导航'], ['博主工具箱', '', '视频收件箱下载', 'https://pan.baidu.com/s/1thMqJcR8L-oU0B-n3zaylg?pwd=34at', '百度网盘分享 · 提取码：34at'],
  ['素材库', '视频素材', 'mixkit', 'https://mixkit.co/', '免费无限量视频素材，无需署名或注册'], ['素材库', '视频素材', 'pexels', 'https://www.pexels.com/zh-cn/', '免费图片和视频素材'], ['素材库', '视频素材', 'pixabay', 'https://pixabay.com/zh/', '视频、插画、摄影等无版权素材'], ['素材库', '视频素材', '知鱼素材', 'https://sucai.zhiyu.art/', '视频、图片、音乐与音效素材'],
  ['素材库', '电影资源', '33台词', 'https://33tc.net/', '通过台词查找影片素材'], ['素材库', '电影资源', '电影港', 'https://www.dygangs.net/', '高清电影资源'], ['素材库', '电影资源', '茶杯狐', 'https://www.bnjxjd.com/', '电影、电视剧、综艺与动漫资源'], ['素材库', '电影资源', '预告片世界', 'https://www.6huo.com/', '电影官方高清预告片与片段'],
  ['素材库', '图片素材', 'CC0图片网', 'https://cc0.cn/', '免费可商用图片素材'], ['素材库', '图片素材', 'KissCC0', 'https://www.kisspng.net/', '高清图与插画素材'], ['素材库', '图片素材', 'Unsplash', 'https://unsplash.com/', '高质量摄影图片素材'],
  ['素材库', '音乐与音效', '歌曲宝', 'https://www.gequbao.com/', '高品质音乐搜索与下载'], ['素材库', '音乐与音效', '淘声网', 'https://www.tosound.com/', '声音素材、游戏音效与影视配乐'], ['素材库', '音乐与音效', '网易云解锁', 'http://tool.moxuangenet.com/tool/ncm/', '将网易云 ncm 转换为 mp3'], ['素材库', '音乐与音效', '音乐搜索', 'http://tool.moxuangenet.com/tool/syinyue/', '多站音乐搜索与下载'], ['素材库', '音乐与音效', '音乐转换', 'https://ncm.worthsee.com/', '音乐格式转换'],
  ['设计资源', '图标与贴纸', 'APP图标下载', 'https://c.subeiz.com/', '从 App Store 获取高清应用图标'], ['设计资源', '图标与贴纸', 'emoji表情', 'https://www.liangqi.net/emoji', '全部 Emoji 表情分类'], ['设计资源', '图标与贴纸', 'Iconfont', 'https://www.iconfont.cn/', '阿里巴巴矢量图标库'], ['设计资源', '色彩', '色彩库', 'https://www.liangqi.net/color', '专业调色板与渐变色方案'], ['设计资源', '字体', '100font', 'https://www.100font.com/', '免费商用字体'], ['设计资源', '字体', '搜字体', 'https://www.souziti.com/', '字体搜索、下载与截图识别'],
  ['配音', '', 'ElevenLabs', 'https://elevenlabs.io/app/home', 'AI 配音与语音生成'], ['配音', '', 'Minecho', 'https://minecho.com/app/tts', 'AI 文字转语音配音'], ['配音', '', 'SoundX', 'https://soundx.top/voiceclone#', 'AI 配音与声音克隆'],
  ['办公协作', '沟通与办公', '微信', 'https://pc.weixin.qq.com/', '微信 PC 版官方下载'], ['办公协作', '沟通与办公', 'WPS Office', 'https://www.wps.cn/product/wps-office/', '文档、表格与演示办公套件'], ['办公协作', '沟通与办公', '企业微信', 'https://work.weixin.qq.com/', '企业沟通与协作'], ['办公协作', '沟通与办公', '钉钉', 'https://www.dingtalk.com/', '团队沟通与协作'], ['办公协作', '沟通与办公', '飞书', 'https://www.feishu.cn/', '团队协作与文档'], ['办公协作', '沟通与办公', 'Obsidian', 'https://obsidian.md/download', '本地知识库与笔记'],
  ['办公协作', '云端与浏览器', '百度网盘', 'https://www.pan-baidu.com.cn/download.html', '文件同步与云端存储'], ['办公协作', '云端与浏览器', 'Google Chrome', 'https://www.google.com/chrome/', '网页浏览与账号同步'], ['办公协作', '云端与浏览器', '360安全浏览器', 'https://browser.360.cn/', '网页浏览器'], ['办公协作', '云端与浏览器', '夸克', 'https://pc.quark.cn/', '夸克电脑版浏览器'], ['办公协作', '云端与浏览器', 'Microsoft OneDrive', 'https://www.microsoft.com/microsoft-365/onedrive/download', '文件云同步'],
  ['办公协作', 'AI 工作台', 'Codex', 'https://openai.com/codex/', 'AI 编程与任务协作'], ['办公协作', 'AI 工作台', 'Claude', 'https://claude.ai/download', 'Claude Desktop 官方下载'], ['办公协作', 'AI 工作台', '豆包', 'https://www.doubao.com/', 'AI 对话与创作助手'], ['办公协作', 'AI 工作台', 'ima', 'https://ima.qq.com/', '腾讯 AI 知识管理与问答'], ['办公协作', 'AI 工作台', '千问', 'https://tongyi.aliyun.com/', '阿里 AI 助手'], ['办公协作', 'AI 工作台', 'DeepSeek Harness', 'https://www.deepseek.com/', 'DeepSeek AI 助手'], ['办公协作', 'AI 工作台', 'Grok Bot', 'https://grok.com/', 'Grok AI 助手'], ['办公协作', 'AI 工作台', 'Copilot', 'https://copilot.microsoft.com/', 'Microsoft AI 助手'], ['办公协作', 'AI 工作台', 'MiniMax Design', 'https://www.minimaxi.com/', 'MiniMax AI 创作工具'],
  ['办公协作', '创作与媒体', '剪映专业版', 'https://www.capcut.cn/download-guidance', '桌面视频剪辑'], ['办公协作', '创作与媒体', '汽水音乐', 'https://www.qishui.com/', '音乐播放与素材收听'], ['办公协作', '创作与媒体', 'K-Lite Codec Pack', 'https://codecguide.com/download_kl.htm', '视频编解码器安装包'], ['办公协作', '创作与媒体', '抖音开发者工具', 'https://developer.open-douyin.com/', '抖音小程序与小游戏开发'], ['办公协作', '创作与媒体', '微信开发者工具', 'https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html', '微信小程序开发'], ['办公协作', '创作与媒体', '小豆芽', 'https://www.newrank.cn/', '新媒体账号管理与运营'],
  ['办公协作', '网络与下载', '迅雷', 'https://www.xunlei.com/', '下载管理工具'], ['办公协作', '网络与下载', 'Infatica', 'https://infatica.io/', '网络代理服务'], ['办公协作', '网络与下载', 'IPdodo 互联', 'https://www.ipdodo.com/', '远程网络互联'], ['办公协作', '网络与下载', '爱加速', 'https://www.ajiasu.com/', '网络加速服务']
]

const categoryOverrides = {
  'NanoPhoto': ['文案/提示词', '提示词反推'], 'AIGC 全模型': ['文案/提示词', '全模型工作台'], 'NextAICore': ['文案/提示词', '全模型工作台'],
  'Codex': ['文案/提示词', 'AI 工作台'], 'Claude': ['文案/提示词', 'AI 工作台'], '豆包': ['文案/提示词', 'AI 工作台'], 'ima': ['文案/提示词', 'AI 工作台'], '千问': ['文案/提示词', 'AI 工作台'], 'DeepSeek Harness': ['文案/提示词', 'AI 工作台'], 'Grok Bot': ['文案/提示词', 'AI 工作台'], 'Copilot': ['文案/提示词', 'AI 工作台'], 'MiniMax Design': ['文案/提示词', 'AI 工作台'],
  '剪映专业版': ['视频剪辑', '剪辑软件'], 'K-Lite Codec Pack': ['视频剪辑', '视频工具'],
  '小豆芽': ['运营数据', '账号运营'], '抖音开发者工具': ['运营数据', '平台工具'], '微信开发者工具': ['运营数据', '平台工具'],
  '汽水音乐': ['素材库', '音乐与音效']
}

const staticTools = staticToolRows.map(([category, sub_category, name, url, description], index) => {
  const [nextCategory, nextSubCategory] = categoryOverrides[name] || [category, sub_category]
  return { id: String(index + 1), category: nextCategory, sub_category: nextSubCategory, name, url, description }
})

const categoryOrder = ['AI 绘图', '文案/提示词', '视频剪辑', '配音', '素材库', '设计资源', '运营数据', '博主工具箱', '去水印', '办公协作']
const categoryGroups = [
  { label: '快捷入口', items: [{ id: '全部工具', label: '全部工具', icon: Grid2X2 }, { id: '常用工具', label: '常用收藏', icon: Bookmark }, { id: '最近打开', label: '最近打开', icon: Clock3 }] },
  { label: '创作流程', items: [{ id: 'AI 绘图', label: 'AI 绘图', icon: WandSparkles }, { id: '文案/提示词', label: '文案 / 提示词', icon: Sparkles }, { id: '视频剪辑', label: '视频剪辑', icon: Video }, { id: '配音', label: '配音', icon: Mic2 }] },
  { label: '素材与设计', items: [{ id: '素材库', label: '素材库', icon: Images }, { id: '设计资源', label: '设计资源', icon: SlidersHorizontal }] },
  { label: '运营与协作', items: [{ id: '运营数据', label: '运营数据', icon: Megaphone }, { id: '博主工具箱', label: '博主工具箱', icon: Grid2X2 }, { id: '去水印', label: '去水印', icon: Video }, { id: '办公协作', label: '办公协作', icon: Bookmark }] }
]
const localLogos = {
  '微信': '/logos/wechat.png', 'WPS Office': '/logos/wps.png', '百度网盘': '/logos/baidu-pan.png', '视频收件箱下载': '/logos/baidu-pan.png', 'Google Chrome': '/logos/chrome.png', '360安全浏览器': '/logos/360.png', '夸克': '/logos/quark.png',
  'Codex': '/logos/openai.png', 'Claude': '/logos/claude.ico', '豆包': '/logos/doubao.png', '剪映专业版': '/logos/capcut.png', '汽水音乐': '/logos/qishui.png', 'K-Lite Codec Pack': '/logos/klite.png',
  'NanoPhoto': '/logos/nanophoto.ico', 'RunningHub': '/logos/runninghub.ico', 'AIGC 全模型': '/logos/aigc.ico', 'NextAICore': '/logos/nextaicore.ico', '亮琪创作室': '/logos/liangqi.ico', 'AnyToCopy': '/logos/anytocopy.ico', '去水印工具': '/logos/kuku.ico',
  'ima': '/logos/ima.png', '千问': '/logos/qwen.png', 'DeepSeek Harness': '/logos/deepseek.png', 'Grok Bot': '/logos/grok.png', 'Copilot': '/logos/copilot.png', 'MiniMax Design': '/logos/minimax.png',
  '企业微信': '/logos/wecom.png', '钉钉': '/logos/dingtalk.png', '飞书': '/logos/feishu.png', '微信开发者工具': '/logos/wechat-dev.ico', '小豆芽': '/logos/newrank.ico',
  'Obsidian': '/logos/obsidian.png', 'Microsoft OneDrive': '/logos/onedrive.png', '迅雷': '/logos/xunlei.ico', 'Infatica': '/logos/infatica.png', 'IPdodo 互联': '/logos/ipdodo.ico', '爱加速': '/logos/ajiasu.png',
  'mixkit': '/logos/mixkit.png', 'pexels': '/logos/pexels.png', 'pixabay': '/logos/pixabay.png', '知鱼素材': '/logos/zhiyu.png', '33台词': '/logos/33tc.png', '电影港': '/logos/dygangs.gif', '茶杯狐': '/logos/chabeihu.png', '预告片世界': '/logos/trailers.jpg',
  'CC0图片网': '/logos/cc0.png', 'KissCC0': '/logos/kisscc0.png', 'Unsplash': '/logos/unsplash.png', '歌曲宝': '/logos/gequbao.png', '淘声网': '/logos/tosound.ico', '网易云解锁': '/logos/ncm.png', '音乐搜索': '/logos/music-search.png', '音乐转换': '/logos/music-convert.png',
  'APP图标下载': '/logos/appicons.png', 'emoji表情': '/logos/emoji.webp', 'Iconfont': '/logos/iconfont.png', '色彩库': '/logos/color.png', '100font': '/logos/100font.ico', '搜字体': '/logos/souziti.png', 'ElevenLabs': '/logos/elevenlabs.ico', 'Minecho': '/logos/minecho.ico', 'SoundX': '/logos/soundx.ico',
  '抖音开发者工具': '/logos/douyin-dev.ico', '飞哥工具箱': '/logos/feige.ico'
}
const iconSources = tool => {
  const sources = [localLogos[tool.name]]
  try { sources.push(`${new URL(tool.url).origin}/favicon.ico`) } catch { /* use the text fallback */ }
  return sources.filter(Boolean)
}
const phone = value => { const digits = value.replace(/\D/g, ''); return digits.startsWith('86') && digits.length === 13 ? `+${digits}` : digits.length === 11 ? `+86${digits}` : value.trim() }

function ToolCard({ tool, favorite, onFavorite, onDelete, onCopy, onOpen, canManage, privateCard = false }) {
  const sources = iconSources(tool); const [iconIndex, setIconIndex] = useState(0)
  useEffect(() => setIconIndex(0), [tool.id, tool.name])
  const source = sources[iconIndex]
  return <article className="tool-card"><a className="tool-link" href={tool.url} target="_blank" rel="noreferrer" onClick={() => onOpen?.(tool)}><span className="tool-logo">{source ? <img src={source} alt="" onError={() => setIconIndex(index => index + 1)} /> : tool.name.slice(0, 2)}</span><span className="tool-copy"><strong>{tool.name}<ArrowUpRight size={14} /></strong><small>{tool.description || '打开工具'}</small><em>{tool.sub_category || tool.category}</em></span></a>
    {!privateCard && <button className={`icon-button favorite ${favorite ? 'is-favorite' : ''}`} onClick={() => onFavorite(tool)} title={favorite ? '取消收藏' : '收藏到常用工具'}><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /></button>}
    {privateCard && <button className="icon-button" onClick={() => onCopy(tool)} title="复制到公开工具库"><CopyPlus size={17} /></button>}
    {canManage && <button className="icon-button danger" onClick={() => onDelete(tool)} title={`删除 ${tool.name}`}><X size={16} /></button>}
  </article>
}

function AuthPanel({ close, signedIn }) {
  const [number, setNumber] = useState(''); const [code, setCode] = useState(''); const [request, setRequest] = useState(null); const [msg, setMsg] = useState(''); const [busy, setBusy] = useState(false)
  async function send(e) { e.preventDefault(); setBusy(true); setMsg(''); const { data, error } = await auth.signInWithOtp({ phone: phone(number) }); setBusy(false); if (error) return setMsg(error.message); setRequest(data); setMsg('验证码已发送。新手机号会自动创建成员账号。') }
  async function verify(e) { e.preventDefault(); setBusy(true); setMsg(''); const { data, error } = await request.verifyOtp({ token: code.trim() }); setBusy(false); if (error) return setMsg(error.message); if (data?.session) { signedIn(); close() } else setMsg('未建立登录会话，请重新发送验证码。') }
  return <div className="modal-backdrop"><section className="dialog auth-dialog"><button className="close" onClick={close}><X size={18} /></button><span className="dialog-kicker"><LockKeyhole size={15} /> 团队成员登录</span><h2>用手机号进入工作台</h2><p>首次验证会自动创建成员账号。</p>{!request ? <form onSubmit={send}><label>中国大陆手机号<input autoFocus inputMode="tel" value={number} onChange={e => setNumber(e.target.value)} placeholder="例如 13800000000" required /></label><button className="primary" disabled={busy}>{busy ? '发送中…' : '发送验证码'}</button></form> : <form onSubmit={verify}><label>短信验证码<input autoFocus inputMode="numeric" value={code} onChange={e => setCode(e.target.value)} required /></label><button className="primary" disabled={busy}>{busy ? '验证中…' : '验证并进入'}</button><button className="text-button" type="button" onClick={() => setRequest(null)}>更换手机号</button></form>}{msg && <div className="form-message">{msg}</div>}</section></div>
}

function EntryForm({ mode, initial, ownerUid, close, saved }) {
  const [form, setForm] = useState({ category: publicCategories.includes(initial?.category) ? initial.category : 'AI 绘图', name: initial?.name || '', url: initial?.url || '', description: initial?.description || '' }); const [msg, setMsg] = useState(''); const [busy, setBusy] = useState(false)
  const labels = { team: ['添加团队工具', '保存工具'], private: ['添加私人入口', '保存入口'], submission: ['推荐好工具', '提交审核'], copy: ['复制到公开工具库', '复制到工具库'] }[mode]
  async function submit(e) { e.preventDefault(); setBusy(true); setMsg(''); const table = mode === 'private' ? 'private_resources' : mode === 'submission' ? 'tool_submissions' : 'tools'; const payload = mode === 'private' ? { ...form, owner_uid: ownerUid, sort_order: 999 } : mode === 'submission' ? form : { ...form, sort_order: 999 }; const { error } = await db.from(table).insert(payload); setBusy(false); if (error) return setMsg(error.message); await saved(); close() }
  return <div className="modal-backdrop"><section className="dialog"><button className="close" onClick={close}><X size={18} /></button><span className="dialog-kicker"><FolderCog size={15} /> {mode === 'submission' ? '成员提议' : '管理员后台'}</span><h2>{labels[0]}</h2><p>{mode === 'submission' ? '提交后会由管理员审核；审核通过才会加入公开创作基地。' : '账号、密码、密保请放在独立密码管理器，不要写入本站。'}</p><form onSubmit={submit}><label>工具名称<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></label><label>访问链接<input type="url" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="https://" required /></label><label>公开分类<select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>{publicCategories.map(x => <option key={x}>{x}</option>)}</select></label><label>用途说明<input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></label><button className="primary" disabled={busy}>{busy ? '保存中…' : labels[1]}</button></form>{msg && <div className="form-message">{msg}</div>}</section></div>
}

function Cards({ list, favoriteSet, toggleFavorite, onOpen, admin, deleteFrom }) {
  return <div className="tool-grid">{list.map(x => <ToolCard key={x.id} tool={x} favorite={favoriteSet.has(x.id)} onFavorite={toggleFavorite} onOpen={onOpen} canManage={admin} onDelete={tool => deleteFrom('tools', tool)} />)}</div>
}

function OfficeCards({ list, favoriteSet, toggleFavorite, onOpen, admin, deleteFrom }) {
  const groups = list.reduce((all, item) => ({ ...all, [item.sub_category || '其他']: [...(all[item.sub_category || '其他'] || []), item] }), {})
  return <div className="office-groups">{Object.entries(groups).map(([name, items]) => <section key={name} className="office-group"><h3>{name}</h3><Cards list={items} favoriteSet={favoriteSet} toggleFavorite={toggleFavorite} onOpen={onOpen} admin={admin} deleteFrom={deleteFrom} /></section>)}</div>
}

function LegacyApp() {
  const [session, setSession] = useState(null), [tools, setTools] = useState([]), [privateRows, setPrivateRows] = useState([]), [favorites, setFavorites] = useState([]), [submissions, setSubmissions] = useState([]), [role, setRole] = useState(null), [active, setActive] = useState('全部工具'), [query, setQuery] = useState(''), [authOpen, setAuthOpen] = useState(false), [entry, setEntry] = useState(null), [notice, setNotice] = useState('')
  const uid = session?.user?.id || session?.user?.sub || session?.user?.uid; const admin = role === 'admin'; const favoriteSet = new Set(favorites.map(x => x.tool_id))
  async function refresh() { const { data } = await auth.getSession(); const current = data?.session || null; setSession(current); if (!current) { setTools([]); setPrivateRows([]); setFavorites([]); setSubmissions([]); setRole(null); return } const results = await Promise.all([db.from('tools').select('*').order('category').order('sort_order').order('id'), db.from('user_roles').select('role').eq('uid', current.user.id), db.from('tool_favorites').select('tool_id'), db.from('private_resources').select('*').order('category').order('sort_order').order('id'), db.from('tool_submissions').select('*').order('created_at', { ascending: false })]); const [toolResult, roleResult, favoriteResult, privateResult, submissionResult] = results; for (const result of results) if (result.error) setNotice(result.error.message); setTools(toolResult.data || []); setRole(roleResult.data?.[0]?.role || 'member'); setFavorites(favoriteResult.data || []); setPrivateRows(privateResult.data || []); setSubmissions(submissionResult.data || []) }
  useEffect(() => { refresh(); const { data } = auth.onAuthStateChange(() => refresh()); return () => data?.subscription?.unsubscribe?.() }, [])
  const visible = useMemo(() => tools.filter(x => (active === '全部工具' || (active === '常用工具' ? favoriteSet.has(x.id) : x.category === active)) && [x.name, x.description, x.category].join(' ').toLowerCase().includes(query.toLowerCase())), [tools, active, query, favorites])
  const grouped = useMemo(() => visible.reduce((all, x) => { const key = active === '常用工具' ? '常用工具' : x.category; return { ...all, [key]: [...(all[key] || []), x] } }, {}), [visible, active])
  async function toggleFavorite(tool) { const existing = favorites.find(x => x.tool_id === tool.id); const result = existing ? await db.from('tool_favorites').delete().eq('tool_id', tool.id) : await db.from('tool_favorites').insert({ tool_id: tool.id }); if (result.error) setNotice(result.error.message); else refresh() }
  async function deleteFrom(table, tool) { if (!window.confirm(`删除「${tool.name}」？`)) return; const { error } = await db.from(table).delete().eq('id', tool.id); if (error) setNotice(error.message); else refresh() }
  async function review(item, approve) { if (!window.confirm(approve ? `审核通过并公开「${item.name}」？` : `拒绝「${item.name}」？`)) return; if (approve) { const { data, error } = await db.from('tools').insert({ category: item.category, name: item.name, url: item.url, description: item.description, sort_order: 999 }).select(); if (error) return setNotice(error.message); const { error: updateError } = await db.from('tool_submissions').update({ status: 'approved', reviewed_by: uid, reviewed_at: new Date().toISOString(), approved_tool_id: data?.[0]?.id || null }).eq('id', item.id); if (updateError) return setNotice(updateError.message) } else { const { error } = await db.from('tool_submissions').update({ status: 'rejected', reviewed_by: uid, reviewed_at: new Date().toISOString() }).eq('id', item.id); if (error) return setNotice(error.message) } refresh() }
  const pending = submissions.filter(x => x.status === 'pending')
  return <><header className="topbar"><a className="brand" href="#top"><span className="brand-mark"><Sparkles size={19} /></span><span>创作基地</span></a><nav><a href="#tools">工具导航</a><a href="#private">私人板块</a></nav><div className="account">{session ? <><span className="member"><CircleUserRound size={17} /> 已登录</span><button className="subtle" onClick={() => setEntry({ mode: 'submission' })}><Send size={16} /> 推荐工具</button>{admin && <button className="subtle admin-button" onClick={() => setEntry({ mode: 'team' })}><Plus size={16} /> 管理工具</button>}<button className="subtle" onClick={() => auth.signOut()}><LogOut size={16} /> 退出</button></> : <button className="primary compact" onClick={() => setAuthOpen(true)}><LockKeyhole size={16} /> 手机号登录</button>}</div></header>
  <main id="top" className="shell"><section className="hero"><div><span className="eyebrow">TEAM CREATOR HUB</span><h1>把创作流程，<br />收进一张工作台。</h1><p>面向团队的 AI 内容工具导航。检索、分类、打开，在同一个入口完成。</p></div><div className="hero-note"><ShieldCheck size={20} /><span>成员登录后可收藏与推荐<br />仅管理员可维护目录</span></div><label className="searchbox"><Search size={20} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="搜索工具、用途或分类" /></label></section>
  {!session ? <section className="login-hint"><LockKeyhole size={18} /><span>登录后即可查看、收藏和推荐团队工具。</span><button className="text-button" onClick={() => setAuthOpen(true)}>立即登录 <ArrowUpRight size={15} /></button></section> : <div className="workspace" id="tools"><aside className="sidebar"><span className="side-title">工具分类</span>{categories.map(x => <button key={x} className={active === x ? 'active' : ''} onClick={() => setActive(x)}>{x}{x === '常用工具' && favorites.length ? ` · ${favorites.length}` : ''}</button>)}</aside><section className="catalog">{Object.keys(grouped).length ? Object.entries(grouped).map(([category, list]) => <div className="category" key={category}><header><span></span><h2>{category}</h2><small>{list.length} 个</small></header>{category === '办公协作' ? <OfficeCards list={list} favoriteSet={favoriteSet} toggleFavorite={toggleFavorite} admin={admin} deleteFrom={deleteFrom} /> : <Cards list={list} favoriteSet={favoriteSet} toggleFavorite={toggleFavorite} admin={admin} deleteFrom={deleteFrom} />}</div>) : <div className="empty"><Heart size={22} />{active === '常用工具' ? '还没有收藏工具，点击卡片右侧爱心即可加入。' : '没有找到匹配的工具'}</div>}</section></div>}
  <section id="private" className="private-zone"><div className="private-icon"><LockKeyhole size={20} /></div><div><span className="eyebrow">PRIVATE INDEX</span><h2>私人资源与账号入口</h2><p>仅管理员可见。账号密码不放在本站，请使用独立密码管理器。</p></div>{session && admin ? <span className="private-state"><Check size={16} /> 已解锁</span> : <span className="private-state">管理员专属</span>}</section>
  {session && admin && <><section className="private-catalog"><header className="private-heading"><div><span className="eyebrow">YOUR BOOKMARKS</span><h2>我的私人入口</h2></div><button className="subtle admin-button" onClick={() => setEntry({ mode: 'private' })}><Plus size={16} /> 添加私人入口</button></header>{privateRows.length ? <div className="tool-grid">{privateRows.map(x => <ToolCard key={x.id} tool={x} privateCard canManage onCopy={tool => setEntry({ mode: 'copy', initial: tool })} onDelete={tool => deleteFrom('private_resources', tool)} />)}</div> : <div className="empty"><FolderCog size={22} />还没有私人入口。</div>}</section>
  <section className="review-panel"><header className="private-heading"><div><span className="eyebrow">ADMIN REVIEW</span><h2>工具审核</h2></div><span className="review-count"><ClipboardList size={16} /> {pending.length} 待审核</span></header>{pending.length ? <div className="review-list">{pending.map(x => <article className="review-row" key={x.id}><div><strong>{x.name}</strong><a href={x.url} target="_blank" rel="noreferrer">打开链接 <ArrowUpRight size={13} /></a><p>{x.category} · {x.description || '暂无说明'}</p></div><div className="review-actions"><button className="subtle approve" onClick={() => review(x, true)}><CheckCircle2 size={16} /> 通过并公开</button><button className="subtle reject" onClick={() => review(x, false)}><XCircle size={16} /> 拒绝</button></div></article>)}</div> : <div className="empty"><CheckCircle2 size={22} />暂无待审核推荐。</div>}</section></>}
  {notice && <div className="toast">{notice}<button onClick={() => setNotice('')}><X size={15} /></button></div>}</main>{authOpen && <AuthPanel close={() => setAuthOpen(false)} signedIn={refresh} />}{entry && <EntryForm mode={entry.mode} initial={entry.initial} ownerUid={uid} close={() => setEntry(null)} saved={refresh} />}</>
}

function loadLocalList(key) {
  try { return JSON.parse(window.localStorage.getItem(key) || '[]') } catch { return [] }
}

function ToolGroups({ groups, favoriteSet, onFavorite, onOpen }) {
  return <>{groups.map(([category, list]) => {
    const subgroups = list.reduce((all, tool) => ({ ...all, [tool.sub_category || '推荐工具']: [...(all[tool.sub_category || '推荐工具'] || []), tool] }), {})
    return <section className="catalog-section" key={category}><header className="catalog-heading"><div><span className="section-kicker">{category}</span><h2>{category}</h2></div><small>{list.length} 个工具</small></header>{Object.entries(subgroups).map(([name, tools]) => <div className="tool-cluster" key={name}><h3>{name}</h3><Cards list={tools} favoriteSet={favoriteSet} toggleFavorite={onFavorite} onOpen={onOpen} /></div>)}</section>
  })}</>
}

function App() {
  const [active, setActive] = useState('全部工具'); const [query, setQuery] = useState(''); const [favorites, setFavorites] = useState(() => loadLocalList(FAVORITES_KEY)); const [recents, setRecents] = useState(() => loadLocalList(RECENT_KEY))
  useEffect(() => { window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { window.localStorage.setItem(RECENT_KEY, JSON.stringify(recents)) }, [recents])
  const favoriteSet = new Set(favorites); const recentSet = new Set(recents)
  const categoryCounts = useMemo(() => Object.fromEntries(categoryOrder.map(category => [category, staticTools.filter(tool => tool.category === category).length])), [])
  const visible = useMemo(() => {
    const words = query.trim().toLowerCase()
    const matching = staticTools.filter(tool => {
      const inView = active === '全部工具' || (active === '常用工具' ? favoriteSet.has(tool.id) : active === '最近打开' ? recentSet.has(tool.id) : tool.category === active)
      return inView && (!words || [tool.name, tool.description, tool.category, tool.sub_category].join(' ').toLowerCase().includes(words))
    })
    return active === '最近打开' ? [...matching].sort((a, b) => recents.indexOf(a.id) - recents.indexOf(b.id)) : matching
  }, [active, favorites, query, recents])
  const groups = useMemo(() => categoryOrder.map(category => [category, visible.filter(tool => tool.category === category)]).filter(([, list]) => list.length), [visible])
  const toggleFavorite = tool => setFavorites(current => current.includes(tool.id) ? current.filter(id => id !== tool.id) : [tool.id, ...current])
  const rememberOpen = tool => setRecents(current => [tool.id, ...current.filter(id => id !== tool.id)].slice(0, 12))
  const activeLabel = query ? '搜索结果' : active
  const navigationCount = id => id === '全部工具' ? staticTools.length : id === '常用工具' ? favorites.length : id === '最近打开' ? recents.length : categoryCounts[id] || 0
  return <><header className="topbar"><a className="brand" href="#top"><span className="brand-mark"><Sparkles size={19} /></span><span>创作基地</span></a><nav><a href="#tools">工具导航</a><a href="#about">使用说明</a></nav><div className="account"><span className="member">公开工作台 · {staticTools.length} 个入口</span></div></header>
    <main id="top" className="shell"><section className="hero hub-hero"><div className="hero-copy"><span className="eyebrow">CREATOR OPERATING DESK</span><h1>找工具，不必翻收藏夹。</h1><p>按创作流程整理，把检索、分类和常用入口收进同一张工作台。</p><div className="hero-stats"><span><b>{staticTools.length}</b> 个精选工具</span><span><b>{categoryOrder.length}</b> 个工作分区</span><span><b>{favorites.length}</b> 个本机收藏</span></div></div><div className="hero-note"><SlidersHorizontal size={20} /><span>先搜索，再按用途收窄<br />每张卡片都在新标签页打开</span></div><div className="search-area"><label className="searchbox"><Search size={20} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索工具、用途、素材类型或工作场景" />{query && <button type="button" className="clear-search" onClick={() => setQuery('')} aria-label="清空搜索"><X size={16} /></button>}</label><p>{query ? `正在搜索“${query}”` : '例如：视频素材、去水印、AI 配音、协作、字体'}</p></div></section>
      <section className="quick-filter" aria-label="快捷筛选"><span>快捷查看</span>{['AI 绘图', '文案/提示词', '视频剪辑', '配音', '素材库', '运营数据'].map(category => <button key={category} className={active === category ? 'active' : ''} onClick={() => setActive(category)}>{category}<b>{categoryCounts[category]}</b></button>)}</section>
      <div className="workspace" id="tools"><aside className="sidebar"><span className="side-title">工作流导航</span>{categoryGroups.map(group => <div className="nav-group" key={group.label}><span>{group.label}</span>{group.items.map(item => { const Icon = item.icon; return <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => setActive(item.id)}><Icon size={15} /><i>{item.label}</i><b>{navigationCount(item.id)}</b></button> })}</div>)}</aside><section className="catalog" id="catalog"><header className="catalog-toolbar"><div><span className="section-kicker">{query ? 'GLOBAL SEARCH' : 'TOOL LIBRARY'}</span><h2>{activeLabel}</h2><p>{visible.length ? `已找到 ${visible.length} 个可直接打开的工具` : '调整关键词或筛选条件，继续查找。'}</p></div>{(query || active !== '全部工具') && <button className="reset-filter" onClick={() => { setActive('全部工具'); setQuery('') }}>重置查看</button>}</header>{groups.length ? <ToolGroups groups={groups} favoriteSet={favoriteSet} onFavorite={toggleFavorite} onOpen={rememberOpen} /> : <div className="empty curated-empty"><Search size={24} /><strong>{active === '常用工具' ? '还没有收藏工具' : active === '最近打开' ? '还没有打开记录' : '没有找到匹配工具'}</strong><span>{active === '常用工具' ? '点击任意工具卡右侧的爱心，即可固定到这里。' : active === '最近打开' ? '打开一张工具卡后，它会显示在这里。' : '试试更短的关键词，或重置筛选。'}</span></div>}</section></div>
      <section id="about" className="private-zone workspace-note"><div className="private-icon"><Bookmark size={20} /></div><div><span className="eyebrow">HOW IT WORKS</span><h2>收藏和最近打开，仅保存在你的浏览器</h2><p>公开链接可直接分享给同事；本站不收集账号或个人数据。需要找工具时，先用全局搜索，再按工作流筛选。</p></div><span className="private-state">静态公开版</span></section>
    </main></>
}

createRoot(document.getElementById('root')).render(<App />)
