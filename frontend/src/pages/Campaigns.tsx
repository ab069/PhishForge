import { useEffect, useState } from "react"; import { Plus, Play, MousePointer } from "lucide-react";
import { useAuthStore } from "../store/authStore"; import { useWebSocket } from "../hooks/useWebSocket";
const A = import.meta.env.VITE_API_URL || "http://localhost:8000";
export default function Campaigns() {
  const t = useAuthStore((s) => s.token)!;
  const [camps, setCamps] = useState<any[]>([]); const [show, setShow] = useState(false);
  const [nm, setNm] = useState(""); const [subj, setSubj] = useState(""); const [tpl, setTpl] = useState(""); const [sn, setSn] = useState(""); const [se, setSe] = useState(""); const [lp, setLp] = useState("");
  const [te, setTe] = useState(""); const [tn, setTn] = useState(""); const [td, setTd] = useState("");
  const { send } = useWebSocket();

  const fetchCamps = async () => {
    const r = await fetch(`${A}/api/campaigns`, { headers: { Authorization: `Bearer ${t}` } });
    const d = await r.json(); setCamps(Array.isArray(d) ? d : []);
  };
  useEffect(() => { fetchCamps(); }, [t]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${A}/api/campaigns`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` }, body: JSON.stringify({ name: nm, template: tpl, subject: subj, sender_name: sn, sender_email: se, landing_page: lp || null }) });
    setShow(false); setNm(""); setSubj(""); setTpl(""); setSn(""); setSe(""); fetchCamps();
  };

  const addTarget = async (cid: string) => {
    const params = new URLSearchParams({ email: te, name: tn }); if (td) params.set("department", td);
    await fetch(`${A}/api/campaigns/${cid}/targets?${params}`, { method: "POST", headers: { Authorization: `Bearer ${t}` } });
    setTe(""); setTn(""); setTd("");
  };

  const simClick = (cid: string, email: string) => send({ action: "simulate_click", campaign_id: cid, target_email: email });

  return (<div className="space-y-6">
    <div className="flex items-center justify-between"><h1 className="text-2xl font-bold text-white">Phishing Campaigns</h1>
      <button onClick={() => setShow(!show)} className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg transition-colors"><Plus className="w-4 h-4" /> New Campaign</button></div>

    {show && <form onSubmit={create} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm text-gray-400 mb-1">Campaign Name</label><input type="text" value={nm} onChange={(e) => setNm(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500" required /></div>
        <div><label className="block text-sm text-gray-400 mb-1">Subject</label><input type="text" value={subj} onChange={(e) => setSubj(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500" required /></div>
        <div><label className="block text-sm text-gray-400 mb-1">Sender Name</label><input type="text" value={sn} onChange={(e) => setSn(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500" required /></div>
        <div><label className="block text-sm text-gray-400 mb-1">Sender Email</label><input type="email" value={se} onChange={(e) => setSe(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500" required /></div>
        <div className="md:col-span-2"><label className="block text-sm text-gray-400 mb-1">Template (HTML or text)</label><textarea value={tpl} onChange={(e) => setTpl(e.target.value)} rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500 font-mono text-sm" required /></div>
        <div><label className="block text-sm text-gray-400 mb-1">Landing Page URL (optional)</label><input type="text" value={lp} onChange={(e) => setLp(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500" /></div>
      </div>
      <button type="submit" className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-2 rounded-lg transition-colors">Create Campaign</button>
    </form>}

    <div className="space-y-4">{camps.length === 0 ? <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center text-gray-500">No campaigns yet.</div> :
      camps.map((c) => (<div key={c.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div><h3 className="text-white font-semibold">{c.name}</h3>
            <p className="text-xs text-gray-500">{c.subject} | From: {c.sender_name} &lt;{c.sender_email}&gt;</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-400">
              <span>Sent: {c.sent_count}</span>
              <span>Clicks: {c.click_count}</span>
              <span className="text-red-400">Phished: {c.phish_count}</span>
            </div>
          </div>
          <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">{c.status}</span>
        </div>

        <div className="border-t border-gray-800 pt-4 mt-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Add Target</h4>
          <div className="flex gap-2 mb-3">
            <input type="email" placeholder="Email" value={te} onChange={(e) => setTe(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-pink-500" />
            <input type="text" placeholder="Name" value={tn} onChange={(e) => setTn(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-pink-500" />
            <input type="text" placeholder="Dept" value={td} onChange={(e) => setTd(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-pink-500" />
            <button onClick={() => addTarget(c.id)} className="bg-pink-600 hover:bg-pink-500 text-white px-3 py-1.5 rounded-lg text-sm transition-colors">Add</button>
          </div>
          <button onClick={() => simClick(c.id, te || "demo@example.com")} className="flex items-center gap-1 text-xs text-gray-400 hover:text-pink-400 transition-colors">
            <MousePointer className="w-3 h-3" /> Simulate Click
          </button>
        </div>
      </div>))
    }</div></div>);
}
