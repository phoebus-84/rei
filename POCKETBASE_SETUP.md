# PocketBase Setup Instructions

## Collections to Create

Create these collections in PocketBase Admin Panel (`http://localhost:8090/_/`)

### 1. Properties Collection

**Name:** `properties`

**Fields:**
| Field Name | Type | Options | Notes |
|---|---|---|---|
| title | Text | Required | e.g., "Seaside Villa" |
| slug | Text | Required, Unique | URL-friendly (e.g., "seaside-villa-cork") |
| description | RichEditor/Text | - | Full property description |
| price | Number | Required | Property price in EUR |
| status | Select | for_sale, for_rent, sold, rented | Default: for_sale |
| property_type | Select | house, apartment, commercial, land | - |
| address | Text | Required | Street address |
| city | Text | Required | City name |
| bedrooms | Number | - | Count of bedrooms |
| bathrooms | Number | - | Count of bathrooms |
| area_sqm | Number | - | Area in square meters |
| images | File | Max 10 files, images only | Property photos |
| agent | Relation | Single, users collection, type='agent' | Agent responsible |
| amenities | JSON | - | Array like ["Wifi", "Pool", "Garage"] |
| featured | Bool | Default: false | For homepage carousel |

**API Rules:**
- View: `status != 'empty'` (Public, shows non-empty properties)
- Create: `@request.auth.id != '' && (@request.auth.type = 'agent' || @request.auth.type = 'admin')` (Agents/Admins only)
- Update: `@request.auth.id != '' && (@request.auth.id = owner || @request.auth.type = 'admin')` (Owner or admin)
- Delete: `@request.auth.id != '' && @request.auth.type = 'admin'` (Admin only)

---

### 2. Users Collection (Extend Auth)

**Name:** `users` (Note: PocketBase has a default auth collection; extend it)

**Additional Fields:**
| Field Name | Type | Options | Notes |
|---|---|---|---|
| name | Text | - | User's full name |
| avatar | File | Images only | Profile picture |
| type | Select | customer, agent, admin | Default: customer |
| phone | Text | - | Contact phone |
| saved_properties | Relation | Many, properties collection | User's saved homes |

**API Rules:**
- View: `@request.auth.id != '' || public_profile = true` (Auth users or public profiles)
- Create: `@request.auth.id = ''` (Public registration only)
- Update: `@request.auth.id = id` (Users can only edit themselves)

---

### 3. Inquiries Collection

**Name:** `inquiries`

**Fields:**
| Field Name | Type | Options | Notes |
|---|---|---|---|
| property | Relation | Single, properties | The property inquired about |
| customer_name | Text | Required | Inquirer's name |
| customer_email | Email | Required | Inquirer's email |
| customer_phone | Text | - | Inquirer's phone |
| message | Text | - | Inquiry message |
| status | Select | new, read, responded | Default: new |

**API Rules:**
- View: `@request.auth.id != '' && (@request.auth.type = 'agent' || @request.auth.type = 'admin')` (Agents/Admins only)
- Create: `@request.auth.id = ''` (Public - anyone can submit)
- Update: `@request.auth.id != '' && @request.auth.type = 'admin'` (Admin only)

---

## Setup Steps

### Option 1: Manual Setup (Admin Panel)

1. **Start PocketBase:**
   ```bash
   pocketbase serve
   ```

2. **Go to Admin Panel:**
   - Open `http://localhost:8090/_/`
   - Login with admin credentials (set during first run)

3. **Create Collections:**
   - Click "Create Collection"
   - Add fields as shown above
   - Set API rules for each collection
   - Save and verify

### Option 2: Programmatic Setup (JavaScript)

After installing PocketBase SDK:
```bash
npm install pocketbase
```

Use the client to create collections:
```javascript
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8090');
// Login as admin first, then create collections via API
```

---

## Environment Variables

Create a `.env.local` file:

```
VITE_PB_URL=http://localhost:8090
VITE_PB_ADMIN_EMAIL=admin@example.com
VITE_PB_ADMIN_PASSWORD=your_secure_password
```

---

## Verification

After setup, verify in Admin Panel:
- [ ] `properties` collection exists with all fields
- [ ] `users` collection has extended fields
- [ ] `inquiries` collection exists with correct fields
- [ ] API rules are set for each collection
- [ ] Create a test property to verify file uploads work

---

## Sample Data

To add test properties:

```json
{
  "title": "Seaside Villa",
  "slug": "seaside-villa-cork",
  "description": "Beautiful seaside villa with ocean view",
  "price": 450000,
  "status": "for_sale",
  "property_type": "house",
  "address": "Cliff Road, Cork",
  "city": "Cork",
  "bedrooms": 4,
  "bathrooms": 3,
  "area_sqm": 250,
  "amenities": ["Ocean View", "Pool", "Garage", "Wifi"],
  "featured": true
}
```

Use PocketBase admin panel or the client SDK to insert sample data.
