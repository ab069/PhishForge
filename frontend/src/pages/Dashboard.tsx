import { useEffect, useState } from "react"; import { Activity, Send, Users, AlertTriangle } from "lucide-react";
import { useAuthStore } from "../store/authStore"; import { usePhishStore } from "../store/phishStore"; import { useWebSocket } from "../hooks/useWebSocket";
const A = import.meta.env.VITE_API_URL || "http://localhost:8000";
export default function Dashboard() {
  const t = useAuthStore((s) => s.token); const phishes = usePhishStore((s) => s.phishes); const [stats, setStats] = useState({ campaigns: 0, targets: 0, phished: 0 }); useWebSocket();
  useEffect(() => {
    if (!t) return; fetch(`${A}/api/campaigns/stats`, { headers: { Authorization: `Bearer ${t}` } }).then((r) => r.json()).then(setStats).catch(() => {});
  }, [t]);
  return (<div className="space-y-8"><h1 className="text-2xl font-bold text-white">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6"><div className="flex items-center justify-between"><div><p className="text-gray-400 text-sm">Campaigns</p><p className="text-3xl font-bold text-white mt-1">{stats.campaigns}</p></div><Send className="w-10 h-10 text-pink-400/50" /></div></div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6"><div className="flex items-center justify-between"><div><p className="text-gray-400 text-sm">Targets</p><p className="text-3xl font-bold text-white mt-1">{stats.targets}</p></div><Users className="w-10 h-10 text-blue-400/50" /></div></div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6"><div className="flex items-center justify-between"><div><p className="text-gray-400 text-sm">Phished</p><p className="text-3xl font-bold text-white mt-1">{stats.phished}</p></div><AlertTriangle className="w-10 h-10 text-red-400/50" /></div></div>
    </div>
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Live Phish Feed</h2>
      {phishes.length === 0 ? <p className="text-gray-500 text-sm">No phishes recorded yet. Launch a campaign and simulate clicks.</p> :
      <div className="space-y-3">{phishes.slice(0, 10).map((p, i) => (<div key={i} className="bg-gray-950 border border-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between"><span className="text-sm font-medium text-white">{p.target_email}</span><span className="text-xs text-red-400 bg-red-900/30 px-2 py-0.5 rounded border border-red-800">phished</span></div>
        <p className="text-xs text-gray-500 mt-1">Campaign: {p.campaign_id}</p>
        <p className="text-xs text-gray-600">{new Date(p.timestamp).toLocaleString()}</p>
      </div>))}</div>}
    </div></div>);
}
