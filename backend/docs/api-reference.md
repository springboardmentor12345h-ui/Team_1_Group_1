# College Events Hub Backend API Documentation

Base URL: `http://localhost:5000`

## Authentication

Protected endpoints require this header:

- `Authorization: Bearer <JWT_TOKEN>`
- `Content-Type: application/json` for endpoints with request body

Roles in this system:
- `student`
- `college_admin`
- `super_admin`

---

## 1) Auth APIs

### POST `/api/auth/register`
- **Method:** `POST`
- **Auth required:** No
- **Headers:** `Content-Type: application/json`
- **Query params:** None
- **Request body:**
```json
{
  "name": "Jane Student",
  "email": "jane@example.edu",
  "password": "pass1234",
  "college": "MIT",
  "role": "student"
}
```
- **Success response (201):**
```json
{
  "message": "User registered successfully",
  "token": "<jwt>",
  "user": {
    "id": "65f1abc1234def5678900aaa",
    "name": "Jane Student",
    "email": "jane@example.edu",
    "college": "MIT",
    "role": "student"
  }
}
```
- **Status codes:**
  - `201` registered
  - `400` missing fields / duplicate email

---

### POST `/api/auth/login`
- **Method:** `POST`
- **Auth required:** No
- **Headers:** `Content-Type: application/json`
- **Query params:** None
- **Request body:**
```json
{
  "email": "jane@example.edu",
  "password": "pass1234"
}
```
- **Success response (200):**
```json
{
  "message": "Login successful",
  "token": "<jwt>",
  "user": {
    "id": "65f1abc1234def5678900aaa",
    "name": "Jane Student",
    "email": "jane@example.edu",
    "college": "MIT",
    "role": "student"
  }
}
```
- **Status codes:**
  - `200` success
  - `400` missing credentials
  - `401` invalid credentials

---

### GET `/api/auth/me`
- **Method:** `GET`
- **Auth required:** Yes (any logged-in user)
- **Headers:** `Authorization: Bearer <token>`
- **Query params:** None
- **Request body:** None
- **Success response (200):**
```json
{
  "id": "65f1abc1234def5678900aaa",
  "name": "Jane Student",
  "email": "jane@example.edu",
  "college": "MIT",
  "role": "student"
}
```
- **Status codes:**
  - `200` success
  - `401` token missing/invalid
  - `404` user not found

---

## 2) Event APIs

### GET `/api/events`
- **Method:** `GET`
- **Auth required:** No
- **Headers:** None
- **Query params:** None
- **Request body:** None
- **Success response (200):**
```json
[
  {
    "_id": "65f2a1b2c3d4e5f67890abcd",
    "college_id": "MIT-001",
    "title": "AI Hackathon 2026",
    "description": "24-hour hackathon focused on AI for education.",
    "category": "hackathon",
    "location": "Main Auditorium",
    "start_date": "2026-03-20T09:00:00.000Z",
    "end_date": "2026-03-21T18:00:00.000Z",
    "created_at": "2026-02-01T07:00:00.000Z",
    "createdBy": {
      "_id": "65f19991234def5678900bbb",
      "name": "Admin User",
      "email": "admin@example.edu",
      "college": "MIT"
    },
    "createdAt": "2026-02-01T07:00:00.000Z",
    "updatedAt": "2026-02-01T07:00:00.000Z"
  }
]
```
- **Status codes:** `200`

---

### GET `/api/events/{id}`
- **Method:** `GET`
- **Auth required:** No
- **Headers:** None
- **Path params:** `id` (event ObjectId)
- **Query params:** None
- **Request body:** None
- **Success response (200):** Event object (same shape as above)
- **Status codes:**
  - `200` success
  - `404` event not found

---

### POST `/api/events`
- **Method:** `POST`
- **Auth required:** Yes (`college_admin` or `super_admin`)
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Query params:** None
- **Request body:**
```json
{
  "college_id": "MIT-001",
  "title": "AI Hackathon 2026",
  "description": "24-hour hackathon focused on AI for education.",
  "category": "hackathon",
  "location": "Main Auditorium",
  "start_date": "2026-03-20T09:00:00.000Z",
  "end_date": "2026-03-21T18:00:00.000Z"
}
```
- **Success response (201):**
```json
{
  "message": "Event created successfully",
  "event": {
    "_id": "65f2a1b2c3d4e5f67890abcd",
    "college_id": "MIT-001",
    "title": "AI Hackathon 2026",
    "description": "24-hour hackathon focused on AI for education.",
    "category": "hackathon",
    "location": "Main Auditorium",
    "start_date": "2026-03-20T09:00:00.000Z",
    "end_date": "2026-03-21T18:00:00.000Z",
    "createdBy": "65f19991234def5678900bbb"
  }
}
```
- **Status codes:**
  - `201` created
  - `400` missing fields / validation errors
  - `401` token missing/invalid
  - `403` insufficient role

---

### PUT `/api/events/{id}`
- **Method:** `PUT`
- **Auth required:** Yes (`college_admin` or `super_admin`; owner check for non-super admin)
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Path params:** `id` (event ObjectId)
- **Query params:** None
- **Request body:** partial event fields (any updatable fields)
```json
{
  "location": "Innovation Center",
  "end_date": "2026-03-21T20:00:00.000Z"
}
```
- **Success response (200):**
```json
{
  "message": "Event updated successfully",
  "event": {
    "_id": "65f2a1b2c3d4e5f67890abcd",
    "location": "Innovation Center",
    "end_date": "2026-03-21T20:00:00.000Z"
  }
}
```
- **Status codes:**
  - `200` updated
  - `401` token missing/invalid
  - `403` insufficient role / not event owner
  - `404` event not found

---

### DELETE `/api/events/{id}`
- **Method:** `DELETE`
- **Auth required:** Yes (`college_admin` or `super_admin`; owner check for non-super admin)
- **Headers:** `Authorization: Bearer <token>`
- **Path params:** `id` (event ObjectId)
- **Query params:** None
- **Request body:** None
- **Success response (200):**
```json
{
  "message": "Event deleted successfully"
}
```
- **Status codes:**
  - `200` deleted
  - `401` token missing/invalid
  - `403` insufficient role / not owner
  - `404` event not found

---

## 3) Registration APIs

### POST `/api/registrations`
- **Method:** `POST`
- **Auth required:** Yes (`student`)
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Query params:** None
- **Request body:**
```json
{
  "event_id": "65f2a1b2c3d4e5f67890abcd"
}
```
- **Success response (201):**
```json
{
  "message": "Registration submitted and pending approval",
  "registration": {
    "_id": "65f3b1c2d3e4f5a67890abcd",
    "event_id": "65f2a1b2c3d4e5f67890abcd",
    "user_id": "65f1abc1234def5678900aaa",
    "status": "pending",
    "timestamp": "2026-03-01T08:00:00.000Z"
  }
}
```
- **Status codes:**
  - `201` created
  - `400` missing event_id / duplicate registration
  - `401` token missing/invalid
  - `403` insufficient role
  - `404` event not found

---

### GET `/api/registrations/my`
- **Method:** `GET`
- **Auth required:** Yes (`student`)
- **Headers:** `Authorization: Bearer <token>`
- **Query params:** None
- **Request body:** None
- **Success response (200):**
```json
[
  {
    "_id": "65f3b1c2d3e4f5a67890abcd",
    "event_id": {
      "_id": "65f2a1b2c3d4e5f67890abcd",
      "title": "AI Hackathon 2026"
    },
    "user_id": "65f1abc1234def5678900aaa",
    "status": "pending",
    "timestamp": "2026-03-01T08:00:00.000Z"
  }
]
```
- **Status codes:**
  - `200` success
  - `401` token missing/invalid
  - `403` insufficient role

---

### GET `/api/registrations/event/{eventId}`
- **Method:** `GET`
- **Auth required:** Yes (`college_admin` or `super_admin`)
- **Headers:** `Authorization: Bearer <token>`
- **Path params:** `eventId` (event ObjectId)
- **Query params:** None
- **Request body:** None
- **Success response (200):**
```json
[
  {
    "_id": "65f3b1c2d3e4f5a67890abcd",
    "event_id": "65f2a1b2c3d4e5f67890abcd",
    "user_id": {
      "_id": "65f1abc1234def5678900aaa",
      "name": "Jane Student",
      "email": "jane@example.edu",
      "college": "MIT"
    },
    "status": "pending",
    "timestamp": "2026-03-01T08:00:00.000Z"
  }
]
```
- **Status codes:**
  - `200` success
  - `401` token missing/invalid
  - `403` insufficient role

---

### PUT `/api/registrations/{id}/approve`
- **Method:** `PUT`
- **Auth required:** Yes (`college_admin` or `super_admin`)
- **Headers:** `Authorization: Bearer <token>`
- **Path params:** `id` (registration ObjectId)
- **Query params:** None
- **Request body:** None
- **Success response (200):**
```json
{
  "message": "Registration approved",
  "registration": {
    "_id": "65f3b1c2d3e4f5a67890abcd",
    "status": "approved"
  }
}
```
- **Status codes:**
  - `200` approved
  - `401` token missing/invalid
  - `403` insufficient role
  - `404` registration not found

---

### PUT `/api/registrations/{id}/reject`
- **Method:** `PUT`
- **Auth required:** Yes (`college_admin` or `super_admin`)
- **Headers:** `Authorization: Bearer <token>`
- **Path params:** `id` (registration ObjectId)
- **Query params:** None
- **Request body:** None
- **Success response (200):**
```json
{
  "message": "Registration rejected",
  "registration": {
    "_id": "65f3b1c2d3e4f5a67890abcd",
    "status": "rejected"
  }
}
```
- **Status codes:**
  - `200` rejected
  - `401` token missing/invalid
  - `403` insufficient role
  - `404` registration not found

---

## 4) Feedback APIs

### POST `/api/feedback`
- **Method:** `POST`
- **Auth required:** Yes (`student`)
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Query params:** None
- **Request body:**
```json
{
  "event_id": "65f2a1b2c3d4e5f67890abcd",
  "rating": 5,
  "comments": "Great organization and sessions."
}
```
- **Success response (201):**
```json
{
  "message": "Feedback submitted successfully",
  "feedback": {
    "_id": "65f4c1d2e3f4a5b67890abcd",
    "event_id": "65f2a1b2c3d4e5f67890abcd",
    "user_id": "65f1abc1234def5678900aaa",
    "rating": 5,
    "comments": "Great organization and sessions.",
    "timestamp": "2026-03-22T10:00:00.000Z"
  }
}
```
- **Status codes:**
  - `201` created
  - `400` missing fields
  - `401` token missing/invalid
  - `403` insufficient role
  - `404` event not found

---

### GET `/api/feedback/my`
- **Method:** `GET`
- **Auth required:** Yes (`student`)
- **Headers:** `Authorization: Bearer <token>`
- **Query params:** None
- **Request body:** None
- **Success response (200):**
```json
[
  {
    "_id": "65f4c1d2e3f4a5b67890abcd",
    "event_id": {
      "_id": "65f2a1b2c3d4e5f67890abcd",
      "title": "AI Hackathon 2026",
      "category": "hackathon",
      "start_date": "2026-03-20T09:00:00.000Z",
      "end_date": "2026-03-21T18:00:00.000Z"
    },
    "user_id": "65f1abc1234def5678900aaa",
    "rating": 5,
    "comments": "Great organization and sessions.",
    "timestamp": "2026-03-22T10:00:00.000Z"
  }
]
```
- **Status codes:**
  - `200` success
  - `401` token missing/invalid
  - `403` insufficient role

---

### GET `/api/feedback/event/{eventId}`
- **Method:** `GET`
- **Auth required:** Yes (`college_admin` or `super_admin`)
- **Headers:** `Authorization: Bearer <token>`
- **Path params:** `eventId` (event ObjectId)
- **Query params:** None
- **Request body:** None
- **Success response (200):**
```json
[
  {
    "_id": "65f4c1d2e3f4a5b67890abcd",
    "event_id": "65f2a1b2c3d4e5f67890abcd",
    "user_id": {
      "_id": "65f1abc1234def5678900aaa",
      "name": "Jane Student",
      "email": "jane@example.edu",
      "college": "MIT"
    },
    "rating": 5,
    "comments": "Great organization and sessions.",
    "timestamp": "2026-03-22T10:00:00.000Z"
  }
]
```
- **Status codes:**
  - `200` success
  - `401` token missing/invalid
  - `403` insufficient role

---

### GET `/api/feedback/event/{eventId}/average`
- **Method:** `GET`
- **Auth required:** Yes (`college_admin` or `super_admin`)
- **Headers:** `Authorization: Bearer <token>`
- **Path params:** `eventId` (event ObjectId)
- **Query params:** None
- **Request body:** None
- **Success response (200):**
```json
{
  "event_id": "65f2a1b2c3d4e5f67890abcd",
  "averageRating": 4.5,
  "totalFeedback": 12
}
```
- **Status codes:**
  - `200` success
  - `401` token missing/invalid
  - `403` insufficient role
  - `404` no feedback exists for event

---

## 5) Admin Logs APIs

### GET `/api/admin-logs`
- **Method:** `GET`
- **Auth required:** Yes (`super_admin` only)
- **Headers:** `Authorization: Bearer <token>`
- **Query params:** None
- **Request body:** None
- **Success response (200):**
```json
[
  {
    "_id": "65f5d1e2f3a4b5c67890abcd",
    "action": "Created event: AI Hackathon 2026",
    "user_id": {
      "_id": "65f19991234def5678900bbb",
      "name": "Admin User",
      "email": "admin@example.edu",
      "role": "college_admin"
    },
    "timestamp": "2026-02-01T07:05:00.000Z"
  }
]
```
- **Status codes:**
  - `200` success
  - `401` token missing/invalid
  - `403` insufficient role

---

### GET `/api/admin-logs/me`
- **Method:** `GET`
- **Auth required:** Yes (`college_admin` or `super_admin`)
- **Headers:** `Authorization: Bearer <token>`
- **Query params:** None
- **Request body:** None
- **Success response (200):** Array of admin log objects
- **Status codes:**
  - `200` success
  - `401` token missing/invalid
  - `403` insufficient role

---

### GET `/api/admin-logs/user/{userId}`
- **Method:** `GET`
- **Auth required:** Yes (`super_admin` only)
- **Headers:** `Authorization: Bearer <token>`
- **Path params:** `userId` (admin user ObjectId)
- **Query params:** None
- **Request body:** None
- **Success response (200):** Array of admin log objects
- **Status codes:**
  - `200` success
  - `401` token missing/invalid
  - `403` insufficient role

---

### POST `/api/admin-logs`
- **Method:** `POST`
- **Auth required:** Yes (`college_admin` or `super_admin`)
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Query params:** None
- **Request body:**
```json
{
  "action": "Approved extra seats for event AI Hackathon 2026"
}
```
- **Success response (201):**
```json
{
  "message": "Admin log created",
  "log": {
    "_id": "65f5d1e2f3a4b5c67890abce",
    "action": "Approved extra seats for event AI Hackathon 2026",
    "user_id": "65f19991234def5678900bbb",
    "timestamp": "2026-02-01T07:15:00.000Z"
  }
}
```
- **Status codes:**
  - `201` created
  - `400` missing action
  - `401` token missing/invalid
  - `403` insufficient role

---

## Error Response Format

Most handled failures return:

```json
{
  "message": "<error description>"
}
```

Common errors:
- `401` token issues (`Not authorized, token missing` / `Not authorized, invalid token`)
- `403` RBAC issues (`Access denied: insufficient role`)
- `404` missing resource (e.g., event, registration, feedback aggregation)

