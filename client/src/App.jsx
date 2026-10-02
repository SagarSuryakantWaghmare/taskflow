import React from 'react';

// শপ ও ডিলস কম্পোনেন্ট (একই ফাইলের ভেতরে রাখা হলো যাতে মোবাইলে কোনো ঝামেলা না হয়)
const ShopDeals = () => {
  const products = [
    {
      id: 1,
      title: 'Trending Smart Watch Series 9',
      category: 'Gadgets',
      price: '৳ ২,৫০ম',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      affiliateLink: 'https://www.daraz.com.bd/your-affiliate-link-1',
    },
    {
      id: 2,
      title: 'Wireless Bluetooth Earbuds',
      category: 'Electronics',
      price: '৳ ১,২০০',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      affiliateLink: 'https://www.daraz.com.bd/your-affiliate-link-2',
    },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h2 style={{ color: '#333', fontSize: '22px' }}>🔥 TaskFlow Hot Deals & Offers</h2>
        <p style={{ color: '#666', fontSize: '13px' }}>ভিডিও প্রিভিউ দেখে আপনার পছন্দের পণ্যটি লুফে নিন!</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {products.map((item) => (
          <div key={item.id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', padding: '15px' }}>
            <div style={{ position: 'relative', width: '100%', height: '150px', background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
              <video 
                src={item.videoUrl} 
                controls 
                autoPlay 
                muted 
                loop 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ marginTop: '12px' }}>
              <span style={{ fontSize: '11px', color: '#ff5722', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.category}</span>
              <h3 style={{ fontSize: '15px', color: '#222', margin: '5px 0' }}>{item.title}</h3>
              <p style={{ fontSize: '15px', fontWeight: '600', color: '#00897b', marginBottom: '12px' }}>{item.price}</p>
              
              <a 
                href={item.affiliateLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ display: 'block', width: '100%', padding: '10px 0', backgroundColor: '#ff6f00', color: '#fff', textAlign: 'center', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}
              >
                Order Now (Daraz)
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// মূল App কম্পোনেন্ট
function App() {
  return (
    <div>
      <ShopDeals />
    </div>
  );
}

export default App;
