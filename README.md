# Checkout Service (NestJS)

This is a **NestJS**-based checkout service that supports multiple promotional campaigns including coupons, on-top promotions, and special campaigns.

## Features

- Apply multiple types of discounts (coupon, on-top, special campaign)
- Calculate item prices before and after discounts
- Clean separation of services
- Extensible campaign architecture

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/checkout-service.git
cd checkout-service
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run start:dev
```

### Environment Variables

Create a .env file (optional) to configure the server port:

```env
PORT=3000
```

## API Endpoints

### POST /checkout

Apply promotions and calculate totals.

Request Body:
```json
{
    "items" : [
        "itemId","itemId","itemId","itemId"
    ],
    "coupon": "YOURCOUPONCODE",
    "onTop" : "onTopId",
    "specialCampaign": "specialCampaignId"
}
```

You can import [`coupon-app.postman_collection.json`](./coupon-app.postman_collection.json) into Postman to test the API easily.

### Data Sources
• Items: /src/items/entities/items.json  
• Coupons: /src/campaigns/coupons/entities/coupons.json  
• On-Tops: /src/campaigns/on-tops/entities/on-tops.json  
• Special Campaigns: /src/campaigns/special-campaigns/entities/special-campaigns.json  
