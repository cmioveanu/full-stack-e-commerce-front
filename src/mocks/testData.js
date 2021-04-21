export const products = [
    {
        id: 3,
        name: "The Utah",
        unit_price: "49.99",
        description: `Elegant silver sunglasses with a wooden frame and polycarbonate lenses. 
        The sunglasses have polarised and anti-reflective lenses.`,
        type: "sunglasses"
    },
    {
        id: 4,
        name: "The Idaho",
        unit_price: "39.99",
        description: `Stylish sunglasses with a dark wooden frame. 
        Lenses come polarised with anti-reflective and anti-glare coatings.`,
        type: "sunglasses"
    },
    {
        id: 1,
        name: "The Geneva",
        unit_price: "79.99",
        description: `Classy vintage wooden watch with a timeless design, 
        perfect for both smart and casual wear. The watch features 3 subdials.`,
        type: "watches"
    },
    {
        id: 2,
        name: "The Scandinavia",
        unit_price: "99.99",
        description: `The wildest watch in our collection. The dial features vintage nordic 
        symbols for true viking lovers. A light-colored wooden strap completes the timeless design.`,
        type: "watches"
    }
];


export const watch = {
    watches_id: 1,
    product_id: 1,
    watches_colour: "dark brown, silver and bronze",
    movement: "japanese 2035 majoy quartz",
    waterproof: "yes, 3bar",
    stopwatch: true,
    date: true,
    band_material: "wood",
    dial_material: "hardlex",
    dial_diameter: "44mm",
    case_shape: "round",
    clasp_type: "folding clasp with safety",
    band_links: "adjustable",
    band_length: "22cm",
    band_width: "23mm"
};


export const orders = [
    [
        {
            "order_id": 28,
            "product_id": 1,
            "quantity": 5,
            "created_at": "2021-01-13T15:45:38.684Z",
            "status": "Paid",
            "name": "The Geneva",
            "unit_price": "79.99",
            "totalOrderAmount": "699.92"
        },
        {
            "order_id": 28,
            "product_id": 2,
            "quantity": 3,
            "created_at": "2021-01-13T15:45:38.684Z",
            "status": "Paid",
            "name": "The Scandinavia",
            "unit_price": "99.99"
        }
    ],
    [
        {
            "order_id": 27,
            "product_id": 1,
            "quantity": 1,
            "created_at": "2021-01-13T15:42:59.628Z",
            "status": "Paid",
            "name": "The Geneva",
            "unit_price": "79.99",
            "totalOrderAmount": "279.97"
        }, {
            "order_id": 27,
            "product_id": 2,
            "quantity": 2,
            "created_at": "2021-01-13T15:42:59.628Z",
            "status": "Paid",
            "name": "The Scandinavia",
            "unit_price": "99.99"
        }
    ]
];