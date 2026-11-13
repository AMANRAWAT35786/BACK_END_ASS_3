const base = "http://localhost:5000/api/products";

const products = [
    { name: "Wireless Mouse", sku: "ELEC-MS-101", category: "Electronics", price: 599, quantity: 25, reorderLevel: 10, supplier: "Logitech India" },
    { name: "Bluetooth Speaker", sku: "ELEC-SP-102", category: "Electronics", price: 2499, quantity: 30, reorderLevel: 8, supplier: "boAt" },
    { name: "Smartphone", sku: "ELEC-PH-103", category: "Electronics", price: 15999, quantity: 3, reorderLevel: 5, supplier: "Samsung India" },
    { name: "Power Bank 20000mAh", sku: "ELEC-PB-104", category: "Electronics", price: 1299, quantity: 38, reorderLevel: 12, supplier: "Mi India" },
    { name: "Cotton T-Shirt", sku: "APRL-TS-201", category: "Apparel", price: 499, quantity: 50, reorderLevel: 15, supplier: "Allen Solly" },
    { name: "Denim Jacket", sku: "APRL-JK-202", category: "Apparel", price: 2299, quantity: 28, reorderLevel: 10, supplier: "Levis India" },
    { name: "Study Table", sku: "FURN-TB-812", category: "Furniture", price: 3999, quantity: 2, reorderLevel: 4, supplier: "IKEA India" },
    { name: "Office Chair", sku: "FURN-CH-813", category: "Furniture", price: 5499, quantity: 6, reorderLevel: 8, supplier: "Godrej Interio" },
    { name: "Bookshelf", sku: "FURN-BS-814", category: "Furniture", price: 3299, quantity: 14, reorderLevel: 5, supplier: "Durian" },
    { name: "Spiral Notebook Pack", sku: "STNY-NB-714", category: "Stationery", price: 180, quantity: 4, reorderLevel: 20, supplier: "Classmate" },
    { name: "Marker Set", sku: "STNY-MK-715", category: "Stationery", price: 250, quantity: 60, reorderLevel: 15, supplier: "Camlin" },
    { name: "Basmati Rice 5kg", sku: "GROC-RC-901", category: "Grocery", price: 650, quantity: 40, reorderLevel: 10, supplier: "India Gate" }
];

async function clearAll() {
    for (let i = 0; i < 20; i++) {
        const res = await fetch(base);
        const data = await res.json();
        if (!data.products || data.products.length === 0) return;
        for (const p of data.products) {
            await fetch(base + "/" + p._id, { method: "DELETE" });
        }
    }
}

async function seed() {
    await clearAll();
    for (const p of products) {
        const res = await fetch(base, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(p)
        });
        console.log(res.status, p.sku);
    }
}

seed();