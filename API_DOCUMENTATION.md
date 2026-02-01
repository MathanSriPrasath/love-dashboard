# 🌐 Love Dashboard - API Documentation

Complete API reference for the Love Dashboard backend.

**Base URL**: `http://localhost:8080/api`

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Couple Management](#couple-management)
3. [Love Letters](#love-letters)
4. [Memories](#memories)
5. [Important Dates](#important-dates)
6. [Error Handling](#error-handling)

---

## 🔐 Authentication

### Login

Authenticate using anniversary date and birth dates.

**Endpoint**: `POST /api/auth/login`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "anniversaryDate": "2020-02-14",
  "herDateOfBirth": "1995-05-20",
  "hisDateOfBirth": "1993-08-15"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Authentication successful",
  "coupleId": 1
}
```

**Failure Response** (200 OK):
```json
{
  "success": false,
  "message": "Invalid credentials. Please check the dates and try again.",
  "coupleId": null
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "anniversaryDate": "2020-02-14",
    "herDateOfBirth": "1995-05-20",
    "hisDateOfBirth": "1993-08-15"
  }'
```

---

## 💑 Couple Management

### Get Couple Details

Retrieve complete information about a couple.

**Endpoint**: `GET /api/couple/{id}`

**Path Parameters**:
- `id` (Long): The couple ID returned from login

**Success Response** (200 OK):
```json
{
  "id": 1,
  "anniversaryDate": "2020-02-14",
  "herName": "Sarah",
  "herDateOfBirth": "1995-05-20",
  "herBio": "A beautiful soul who loves reading, painting, and long walks on the beach.",
  "herFavoriteQuote": "Love is not about how many days...",
  "hisName": "John",
  "hisDateOfBirth": "1993-08-15",
  "hisBio": "A passionate photographer who enjoys hiking...",
  "hisFavoriteQuote": "In all the world, there is no heart for me like yours.",
  "couplePhotoUrl": "https://example.com/photos/couple.jpg"
}
```

**Error Response** (500 Internal Server Error):
```json
{
  "message": "Couple not found with id: 1"
}
```

**cURL Example**:
```bash
curl http://localhost:8080/api/couple/1
```

---

## 💌 Love Letters

### Get All Love Letters

Retrieve all love letters for a couple, ordered by date (most recent first).

**Endpoint**: `GET /api/love-letters/couple/{coupleId}`

**Path Parameters**:
- `coupleId` (Long): The couple ID

**Success Response** (200 OK):
```json
[
  {
    "id": 1,
    "title": "Our First Date",
    "content": "I still remember the way you smiled when we first met...",
    "author": "John",
    "letterDate": "2020-02-14"
  },
  {
    "id": 2,
    "title": "Happy Anniversary!",
    "content": "Three years together and every day feels like a blessing...",
    "author": "Sarah",
    "letterDate": "2023-02-14"
  }
]
```

**Empty Response** (200 OK):
```json
[]
```

**cURL Example**:
```bash
curl http://localhost:8080/api/love-letters/couple/1
```

---

## 📸 Memories

### Get All Memories

Retrieve all memories for a couple, ordered by date (most recent first).

**Endpoint**: `GET /api/memories/couple/{coupleId}`

**Path Parameters**:
- `coupleId` (Long): The couple ID

**Success Response** (200 OK):
```json
[
  {
    "id": 1,
    "title": "Paris Trip 2021",
    "description": "Our magical week in Paris. We visited the Eiffel Tower...",
    "memoryDate": "2021-06-15",
    "imageUrl": "https://example.com/photos/paris.jpg",
    "location": "Paris, France",
    "tags": "vacation,europe,romantic"
  },
  {
    "id": 2,
    "title": "Hiking in Yosemite",
    "description": "An adventurous day hiking through beautiful trails...",
    "memoryDate": "2022-07-20",
    "imageUrl": "https://example.com/photos/yosemite.jpg",
    "location": "Yosemite National Park",
    "tags": "hiking,nature,adventure"
  }
]
```

**Empty Response** (200 OK):
```json
[]
```

**cURL Example**:
```bash
curl http://localhost:8080/api/memories/couple/1
```

---

## 📅 Important Dates

### Get All Important Dates

Retrieve all important dates for a couple, ordered by date (earliest first).

**Endpoint**: `GET /api/important-dates/couple/{coupleId}`

**Path Parameters**:
- `coupleId` (Long): The couple ID

**Success Response** (200 OK):
```json
[
  {
    "id": 1,
    "title": "Our Anniversary",
    "description": "The day we officially became a couple",
    "eventDate": "2020-02-14",
    "category": "anniversary",
    "isRecurring": true
  },
  {
    "id": 2,
    "title": "Sarah's Birthday",
    "description": "Her special day!",
    "eventDate": "1995-05-20",
    "category": "birthday",
    "isRecurring": true
  },
  {
    "id": 3,
    "title": "Trip to Italy",
    "description": "Our planned vacation to Rome and Venice",
    "eventDate": "2024-09-10",
    "category": "special",
    "isRecurring": false
  }
]
```

**Category Types**:
- `birthday` - Birthday events
- `anniversary` - Anniversary dates
- `special` - Special occasions
- `holiday` - Holiday celebrations
- Custom categories (any string)

**Empty Response** (200 OK):
```json
[]
```

**cURL Example**:
```bash
curl http://localhost:8080/api/important-dates/couple/1
```

---

## ⚠️ Error Handling

### Common Error Responses

**400 Bad Request** - Invalid input
```json
{
  "message": "Validation failed",
  "errors": [
    "anniversaryDate: must not be null"
  ]
}
```

**404 Not Found** - Resource not found
```json
{
  "message": "Couple not found with id: 999"
}
```

**500 Internal Server Error** - Server error
```json
{
  "message": "An unexpected error occurred"
}
```

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request succeeded |
| 400 | Bad Request | Invalid input data |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server-side error |

---

## 📊 Data Formats

### Date Format
All dates use ISO 8601 format: `YYYY-MM-DD`

**Examples**:
- `2024-02-14`
- `1995-05-20`
- `2020-01-01`

### Boolean Values
- `true` or `false` (lowercase)

### Null Values
- Fields can be `null` if not provided
- Empty strings are different from `null`

---

## 🔄 CORS Configuration

The API allows requests from:
- `http://localhost:3000` (React frontend)

**Allowed Methods**:
- GET
- POST
- PUT
- DELETE
- OPTIONS

**Allowed Headers**: All (`*`)

---

## 🧪 Testing with Postman

### Import Collection

Create a new Postman collection with these requests:

**1. Login**
- Method: POST
- URL: `http://localhost:8080/api/auth/login`
- Body (JSON):
```json
{
  "anniversaryDate": "2020-02-14",
  "herDateOfBirth": "1995-05-20",
  "hisDateOfBirth": "1993-08-15"
}
```

**2. Get Couple**
- Method: GET
- URL: `http://localhost:8080/api/couple/1`

**3. Get Love Letters**
- Method: GET
- URL: `http://localhost:8080/api/love-letters/couple/1`

**4. Get Memories**
- Method: GET
- URL: `http://localhost:8080/api/memories/couple/1`

**5. Get Important Dates**
- Method: GET
- URL: `http://localhost:8080/api/important-dates/couple/1`

---

## 📝 Example Integration (JavaScript)

```javascript
// Login
async function login(anniversaryDate, herDOB, hisDOB) {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      anniversaryDate,
      herDateOfBirth: herDOB,
      hisDateOfBirth: hisDOB
    })
  });
  return await response.json();
}

// Get couple details
async function getCouple(coupleId) {
  const response = await fetch(`http://localhost:8080/api/couple/${coupleId}`);
  return await response.json();
}

// Get love letters
async function getLoveLetters(coupleId) {
  const response = await fetch(`http://localhost:8080/api/love-letters/couple/${coupleId}`);
  return await response.json();
}

// Usage
const authResult = await login('2020-02-14', '1995-05-20', '1993-08-15');
if (authResult.success) {
  const couple = await getCouple(authResult.coupleId);
  const letters = await getLoveLetters(authResult.coupleId);
  console.log(couple, letters);
}
```

---

## 🔍 Database Query Examples

### View all data for a couple

```sql
-- Get couple info
SELECT * FROM couples WHERE id = 1;

-- Get love letters
SELECT * FROM love_letters WHERE couple_id = 1 ORDER BY letter_date DESC;

-- Get memories
SELECT * FROM memories WHERE couple_id = 1 ORDER BY memory_date DESC;

-- Get important dates
SELECT * FROM important_dates WHERE couple_id = 1 ORDER BY event_date ASC;
```

---

## 🎯 Rate Limiting

Currently, there is **no rate limiting** implemented.

For production, consider adding:
- Request throttling
- API key authentication
- Session management

---

## 📞 Support

For issues or questions:
1. Check the main [README.md](README.md)
2. Review [SETUP_GUIDE.md](SETUP_GUIDE.md)
3. Check backend logs in the terminal

---

**API Version**: 1.0.0  
**Last Updated**: February 2026  
**Base URL**: http://localhost:8080/api

