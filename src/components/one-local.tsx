import * as React from "react"
import { MapPin, Navigation, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function OneLocal() {
  const [locationName, setLocationName] = React.useState<string>("አዲስ አበባ")
  const [loading, setLoading] = React.useState<boolean>(false)

  const localDeals = [
    { id: 1, title: "ቦሌ ማነኪያ ሬስቶራንት", deal: "20% Discount", dist: "0.5km" },
    { id: 2, title: "ካሳንቺስ ሱፐርማርኬት", deal: "Buy 1 Get 1", dist: "1.2km" },
    { id: 3, title: "ፒያሳ ካፌ", deal: "Free Macchiato", dist: "0.8km" },
    { id: 4, title: "መገናኛ ኤሌክትሮኒክስ", deal: "Flash Sale", dist: "2.5km" },
  ]

  const fetchCityName = async (lat?: number, lon?: number) => {
    try {
      // If we have coords, use them. If not, BigDataCloud defaults to IP-based location.
      const url = lat && lon 
        ? `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        : "https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en";
      
      const response = await fetch(url);
      const data = await response.json();
      setLocationName(data.locality || data.city || "አዲስ አበባ");
    } catch (e) {
      console.error("Lookup failed", e);
    } finally {
      setLoading(false);
    }
  };

  const detectLocation = () => {
    setLoading(true);
    
    // 1. Try GPS with a strict 5-second timeout
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchCityName(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        console.warn("GPS failed or timed out, falling back to IP...");
        fetchCityName(); // Fallback to IP-based lookup
      },
      { timeout: 5000, enableHighAccuracy: false }
    );
  };

  React.useEffect(() => {
    detectLocation();
  }, []);

  return (
    <div className="flex flex-col gap-4 pb-24 px-4">
      <div className="flex items-center justify-between bg-muted/50 p-3 rounded-xl mt-2 border border-border">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-red-600" />
          <span className="text-sm font-bold uppercase tracking-tight">
            {loading ? "በመፈለግ ላይ..." : locationName}
          </span>
        </div>
        <button 
          onClick={detectLocation}
          disabled={loading}
          className="bg-white px-3 py-1 rounded-lg shadow-sm text-[10px] font-bold flex items-center gap-1 active:scale-95 transition-transform"
        >
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Navigation className="h-3 w-3 text-blue-600" />}
          ቀይር
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        {['ምግብ', 'ሱቅ', 'ሳሎን', 'ሌሎች'].map((cat) => (
          <div key={cat} className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center text-xl shadow-sm">
              📍
            </div>
            <span className="text-[10px] font-bold">{cat}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2">
        {localDeals.map((item) => (
          <div key={item.id} className="rounded-xl border bg-card overflow-hidden shadow-sm">
            <div className="aspect-square bg-muted relative">
              <img 
                src={`https://picsum.photos/200/200?random=${item.id + 50}`} 
                className="object-cover w-full h-full" 
                alt="local"
              />
              <Badge className="absolute top-2 left-2 bg-black/70 backdrop-blur-md border-none text-[10px] font-bold text-white">
                {item.dist}
              </Badge>
            </div>
            <div className="p-2 space-y-1">
              <h4 className="text-xs font-bold truncate">{item.title}</h4>
              <p className="text-sm font-black text-red-600 leading-none">{item.deal}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[9px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full font-bold">Open</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
