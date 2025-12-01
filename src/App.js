import React, { useState, useEffect } from 'react';

// --- 内置 SVG 图标组件 (零依赖，防止加载错误) ---
const IconWrapper = ({ children, size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {children}
  </svg>
);

const Icons = {
  CheckCircle2: (props) => (
    <IconWrapper {...props}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></IconWrapper>
  ),
  TrendingDown: (props) => (
    <IconWrapper {...props}><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></IconWrapper>
  ),
  Dumbbell: (props) => (
    <IconWrapper {...props}><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></IconWrapper>
  ),
  Utensils: (props) => (
    <IconWrapper {...props}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></IconWrapper>
  ),
  Pill: (props) => (
    <IconWrapper {...props}><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></IconWrapper>
  ),
  Flame: (props) => (
    <IconWrapper {...props}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-2.246-2.246-3-7-1.38 2.222-2.316 3.667-2.73 4.333-1.076 1.73-1.27 3.493-1.27 4.667 0 2.38 1.95 4.5 4.5 4.5s4.5-2.12 4.5-4.5c0-1.174-.194-2.937-1.27-4.667-.414-.666-1.35-2.11-2.73-4.333"/></IconWrapper>
  ),
  Activity: (props) => (
    <IconWrapper {...props}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></IconWrapper>
  ),
  Info: (props) => (
    <IconWrapper {...props}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></IconWrapper>
  ),
  Droplets: (props) => (
    <IconWrapper {...props}><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.8-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></IconWrapper>
  ),
  RotateCcw: (props) => (
    <IconWrapper {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></IconWrapper>
  ),
  Coffee: (props) => (
    <IconWrapper {...props}><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></IconWrapper>
  ),
  Moon: (props) => (
    <IconWrapper {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></IconWrapper>
  ),
  Sun: (props) => (
    <IconWrapper {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></IconWrapper>
  ),
  Apple: (props) => (
    <IconWrapper {...props}><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></IconWrapper>
  )
};

// --- 针对您的情况定制的静态计划数据 ---
const PLAN_INFO = {
  diet: [
    { title: "早餐 (8:00)", content: "2个水煮蛋 + 1片全麦面包 + 黑咖啡 (消除晨起水肿)", icon: <Icons.Coffee size={20} /> },
    { title: "午餐 (12:30)", content: "拳头大米饭 + 200g 牛肉/鸡胸 + 深色蔬菜", icon: <Icons.Sun size={20} /> },
    { title: "下午加餐 (16:00)", content: "1个苹果 或 10粒巴旦木 (稳定血糖，防暴食)", icon: <Icons.Apple size={20} /> },
    { title: "晚餐 (19:00)", content: "【关键】去主食。鸡腿肉/鱼肉 + 黄瓜/番茄", icon: <Icons.Moon size={20} /> },
    { title: "铁律", content: "每天2.5L水；禁酒；禁糖。晚餐后不再进食。", icon: <Icons.Droplets size={20} /> }
  ],
  exercise: [
    { title: "周一/周四 (下肢+臀)", content: "深蹲 4组x15次\n箭步蹲 3组x12次 (改善腿型)\n臀桥 4组x20次 (针对臀围)", icon: "🏋️" },
    { title: "周二/周五 (全身燃脂)", content: "快走/慢跑 40分钟 (心率135左右)\n平板支撑 4组x45秒 (收紧核心)", icon: "🏃" },
    { title: "周三/周六 (恢复)", content: "拉伸放松 20分钟，重点拉伸大腿前侧", icon: "🧘" },
    { title: "周日 (休息)", content: "彻底休息，睡足8小时", icon: "🛌" }
  ],
  supplements: [
    { title: "基础", content: "男士综合维生素 (早餐后)", icon: <Icons.Pill size={20} /> },
    { title: "减脂辅助", content: "鱼油 (午餐后，抗炎/护心)\n左旋肉碱 (运动前30分钟)", icon: "⚡" }
  ]
};

const QUOTES = [
  "自律给你自由。",
  "你流的每一滴汗，都是脂肪在哭泣。",
  "39岁是黄金年龄，找回你的状态。",
  "只要开始，永远不晚。",
  "不要假装努力，结果不会陪你演戏。",
  "每天进步 1%，30天后你将焕然一新。",
  "管住嘴，迈开腿，剩下的交给时间。",
  "想想你穿上衬衫没有肚子的样子。",
  "坚持比爆发更重要。",
  "没有什么比健康的身体更值钱。"
];

// --- 组件部分 ---

const ProgressBar = ({ current, target, start }) => {
  const totalToLose = start - target;
  const currentLost = start - current;
  const percentage = Math.min(Math.max((currentLost / totalToLose) * 100, 0), 100);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 relative overflow-hidden">
      <div className="flex justify-between items-end mb-2 relative z-10">
        <div>
          <p className="text-sm text-slate-500 font-medium">当前体重</p>
          <p className="text-3xl font-bold text-slate-800">{current} <span className="text-sm font-normal text-slate-400">kg</span></p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500 font-medium">目标 (12月)</p>
          <p className="text-xl font-semibold text-emerald-600">{target} <span className="text-xs text-emerald-400">kg</span></p>
        </div>
      </div>
      <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-slate-400 mt-2 text-center">
        已减掉 <span className="font-bold text-slate-600">{(start - current).toFixed(1)}</span> kg，还差 <span className="font-bold text-emerald-600">{(current - target).toFixed(1)}</span> kg
      </p>
    </div>
  );
};

const TaskItem = ({ label, subLabel, icon: Icon, completed, onToggle, category }) => {
  let colorClass = "text-slate-600";
  let bgClass = "bg-slate-50";
  
  if (category === 'diet') { colorClass = "text-orange-500"; bgClass = "bg-orange-50"; }
  if (category === 'exercise') { colorClass = "text-blue-500"; bgClass = "bg-blue-50"; }
  if (category === 'supplement') { colorClass = "text-purple-500"; bgClass = "bg-purple-50"; }

  return (
    <div 
      onClick={onToggle}
      className={`flex items-center p-3 rounded-xl mb-3 cursor-pointer transition-all active:scale-95 border ${completed ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-100 hover:border-slate-200'}`}
    >
      <div className={`p-2 rounded-full mr-3 flex items-center justify-center ${completed ? 'bg-emerald-100 text-emerald-600' : bgClass + ' ' + colorClass}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <h4 className={`font-medium text-sm ${completed ? 'text-emerald-800 line-through' : 'text-slate-800'}`}>{label}</h4>
        {subLabel && <p className="text-xs text-slate-400">{subLabel}</p>}
      </div>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-200'}`}>
        {completed && <Icons.CheckCircle2 size={14} className="text-white" />}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors ${active ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
  >
    <Icon size={20} className={`mb-1 ${active ? 'fill-current' : ''}`} strokeWidth={active ? 2.5 : 2} />
    {label}
  </button>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('today');
  
  // 核心数据状态
  const [currentWeight, setCurrentWeight] = useState(85.0);
  const [startWeight, setStartWeight] = useState(85.0);
  const [targetWeight] = useState(82.5); // 减重5斤=2.5kg
  const [quote, setQuote] = useState("");
  const [weightHistory, setWeightHistory] = useState([]);
  
  // 任务状态
  const [todayTasks, setTodayTasks] = useState({
    water: false, breakfast: false, lunch: false, dinner: false,
    noSugar: false, exercise: false, vitamin: false, fishOil: false
  });

  // --- 关键修复：确保 Tailwind CSS 被加载 ---
  useEffect(() => {
    // 检查 window 对象上是否有 tailwind 变量
    // 如果没有，或者 styles 没生效，手动注入 CDN
    const checkAndInjectTailwind = () => {
      const existingScript = document.querySelector('script[src*="tailwindcss"]');
      if (!window.tailwind && !existingScript) {
        console.log("Injecting Tailwind CSS...");
        const script = document.createElement('script');
        script.src = "https://cdn.tailwindcss.com";
        document.head.appendChild(script);
      }
    };
    checkAndInjectTailwind();
  }, []);

  // --- 初始化加载逻辑 ---
  useEffect(() => {
    // 1. 设置每日金句
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    setQuote(QUOTES[dayOfYear % QUOTES.length]);

    // 2. 从 LocalStorage 加载数据
    const loadData = () => {
      const today = new Date().toISOString().split('T')[0];
      
      // 加载今日任务
      const savedTasks = localStorage.getItem(`tasks_${today}`);
      if (savedTasks) {
        setTodayTasks(JSON.parse(savedTasks));
      }

      // 加载体重历史
      const savedHistory = localStorage.getItem('weight_history');
      if (savedHistory) {
        const history = JSON.parse(savedHistory);
        setWeightHistory(history);
        if (history.length > 0) {
          setCurrentWeight(history[0].weight);
          // 找最早的体重作为初始体重
          const earliest = history[history.length - 1];
          if (earliest) setStartWeight(earliest.weight);
        }
      } else {
        // 如果完全没有记录，初始化
        setWeightHistory([{ date: today, weight: 85.0 }]);
      }
    };
    loadData();
  }, []);

  // --- 交互逻辑 ---

  const toggleTask = (key) => {
    const newTasks = { ...todayTasks, [key]: !todayTasks[key] };
    setTodayTasks(newTasks);
    
    // 保存到 LocalStorage (使用日期作为 key)
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`tasks_${today}`, JSON.stringify(newTasks));
  };

  const handleAddWeight = (e) => {
    e.preventDefault();
    const val = parseFloat(e.target.elements.weightInput.value);
    if (!val) return;

    const today = new Date().toISOString().split('T')[0];
    const newEntry = { date: today, weight: val };
    
    // 更新历史记录（去重：如果今天已有记录，覆盖它）
    const newHistory = [newEntry, ...weightHistory.filter(h => h.date !== today)];
    // 按日期降序排序 (最新的在前面)
    newHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

    setWeightHistory(newHistory);
    setCurrentWeight(val);
    
    // 保存
    localStorage.setItem('weight_history', JSON.stringify(newHistory));
    e.target.reset();
  };

  const resetData = () => {
    if(window.confirm("确定要清除所有本地数据重来吗？这将无法恢复。")) {
      localStorage.clear();
      window.location.reload();
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      {/* Header */}
      <div className="bg-emerald-600 px-6 pt-12 pb-20 text-white rounded-b-[2.5rem] shadow-lg relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">12月减脂冲刺</h1>
            <p className="text-emerald-100 text-sm opacity-90">离目标还有 {(currentWeight - targetWeight).toFixed(1)} kg</p>
          </div>
          <button 
            onClick={resetData} 
            className="bg-emerald-500/50 p-2 rounded-full hover:bg-emerald-500 transition-colors"
            title="重置数据"
          >
            <Icons.RotateCcw size={20} className="text-emerald-50" />
          </button>
        </div>
        
        {/* Quote Card */}
        <div className="bg-emerald-700/50 backdrop-blur-sm p-4 rounded-xl border border-emerald-500/30">
          <p className="text-sm font-medium italic text-emerald-50">"{quote}"</p>
        </div>
      </div>

      <div className="px-5 -mt-14 relative z-20">
        
        {activeTab === 'today' && (
          <div className="animate-fade-in-up">
            <ProgressBar current={currentWeight} target={targetWeight} start={startWeight} />

            <div className="mt-2">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">饮食挑战</h3>
              <TaskItem label="早餐达标" subLabel="鸡蛋 + 全麦 + 黑咖啡" icon={Icons.Utensils} category="diet" completed={todayTasks.breakfast} onToggle={() => toggleTask('breakfast')} />
              <TaskItem label="午餐控碳" subLabel="拳头米饭 + 200g肉 + 菜" icon={Icons.Utensils} category="diet" completed={todayTasks.lunch} onToggle={() => toggleTask('lunch')} />
              <TaskItem label="晚餐断碳" subLabel="仅吃肉和蔬菜，不吃主食" icon={Icons.Utensils} category="diet" completed={todayTasks.dinner} onToggle={() => toggleTask('dinner')} />
              <TaskItem label="喝水 2.5L" subLabel="已完成目标" icon={Icons.Droplets} category="diet" completed={todayTasks.water} onToggle={() => toggleTask('water')} />
              <TaskItem label="0 糖摄入" subLabel="未吃甜食/饮料" icon={Icons.CheckCircle2} category="diet" completed={todayTasks.noSugar} onToggle={() => toggleTask('noSugar')} />

              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 mt-6 ml-1">运动 & 补剂</h3>
              <TaskItem label="今日运动" subLabel="查看「计划」Tab" icon={Icons.Dumbbell} category="exercise" completed={todayTasks.exercise} onToggle={() => toggleTask('exercise')} />
              <TaskItem label="综合维生素" subLabel="早餐后服用" icon={Icons.Pill} category="supplement" completed={todayTasks.vitamin} onToggle={() => toggleTask('vitamin')} />
               <TaskItem label="深海鱼油" subLabel="午餐后服用 (抗炎)" icon={Icons.Pill} category="supplement" completed={todayTasks.fishOil} onToggle={() => toggleTask('fishOil')} />
            </div>
            <div className="h-10"></div>
          </div>
        )}

        {activeTab === 'plan' && (
           <div className="animate-fade-in-up space-y-6 pt-6">
             {/* 饮食卡片 */}
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><Icons.Utensils size={20}/></div>
                  <h3 className="font-bold text-lg text-slate-800">12月饮食原则</h3>
                </div>
                <div className="space-y-4">
                  {PLAN_INFO.diet.map((item, idx) => (
                    <div key={idx} className="flex gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                      <span className="text-xl text-slate-400 mt-1">{item.icon}</span>
                      <div>
                        <div className="font-semibold text-slate-700 text-sm">{item.title}</div>
                        <div className="text-slate-500 text-sm leading-relaxed">{item.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             {/* 运动卡片 */}
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Icons.Dumbbell size={20}/></div>
                  <h3 className="font-bold text-lg text-slate-800">针对性运动 (腿臀/核心)</h3>
                </div>
                <p className="text-xs text-blue-500 bg-blue-50 p-2 rounded mb-4">目标：提高下肢代谢，收紧腹部</p>
                <div className="space-y-4">
                  {PLAN_INFO.exercise.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                       <span className="text-xl mt-1">{item.icon}</span>
                       <div className="bg-slate-50 p-3 rounded-xl flex-1">
                          <div className="font-semibold text-slate-700 text-sm mb-1">{item.title}</div>
                          <div className="text-slate-500 text-xs whitespace-pre-line leading-relaxed">{item.content}</div>
                       </div>
                    </div>
                  ))}
                </div>
             </div>

             {/* 补剂卡片 */}
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Icons.Pill size={20}/></div>
                  <h3 className="font-bold text-lg text-slate-800">补剂方案</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                   {PLAN_INFO.supplements.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg">
                        <span className="text-lg text-slate-400">{item.icon}</span>
                        <div>
                          <span className="font-medium text-sm text-slate-700 block">{item.title}</span>
                          <span className="text-xs text-slate-500">{item.content}</span>
                        </div>
                      </div>
                   ))}
                </div>
             </div>
             <div className="h-10"></div>
           </div>
        )}

        {activeTab === 'stats' && (
          <div className="animate-fade-in-up pt-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                <Icons.Activity className="text-emerald-500"/>
                记录今日体重
              </h3>
              <form onSubmit={handleAddWeight} className="flex gap-2">
                <input type="number" step="0.1" name="weightInput" placeholder="例如: 84.5" className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 text-lg font-medium" />
                <button type="submit" className="bg-emerald-600 text-white px-6 rounded-xl font-medium hover:bg-emerald-700 active:scale-95 transition-all">保存</button>
              </form>
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-slate-800 mb-3 ml-1">历史记录</h3>
              <div className="space-y-2">
                {weightHistory.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    暂无数据，快记录第一笔吧！
                  </div>
                ) : (
                  weightHistory.map((record) => (
                    <div key={record.date} className="bg-white p-4 rounded-xl shadow-sm border border-slate-50 flex justify-between items-center">
                      <span className="text-slate-500 text-sm font-medium">{record.date}</span>
                      <span className="font-bold text-slate-800 text-lg">{record.weight} <small className="text-xs font-normal text-slate-400">kg</small></span>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="h-10"></div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 pb-6 pt-2 flex justify-between items-center z-50 max-w-md mx-auto">
        <TabButton active={activeTab === 'today'} onClick={() => setActiveTab('today')} icon={Icons.CheckCircle2} label="今日打卡" />
        <TabButton active={activeTab === 'plan'} onClick={() => setActiveTab('plan')} icon={Icons.Info} label="计划详情" />
        <TabButton active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={Icons.TrendingDown} label="体重记录" />
      </div>
    </div>
  );
};

export default App;