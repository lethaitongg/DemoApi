# API Documentation

## Overview

Create Api for entity Setting.

## Endpoints

### GET /settings

Get All Settings

**Example Request (Get all settings):**

http://localhost:3000/settings?searchedColumn=name&keyword=e&orderedColumn=value&page=1&limit=2

**Parameters:**

- `searchedColumn`: The name of the column to search by.
- `keyword`: The keyword to search for in the specified column.
- `orderedColumn`: The name of the column to order by.
- `order`: The order direction (ASC or DESC) for the sorted column. Defaults to ASC.
- `page`: The current page number. Defaults to 1.
- `limit`:The number of settings to return per page. Defaults to 1.

**Response:**

```json
{
  "data": [
    {
      "name": "name",
      "value": "demo",
      "id": 1,
      "isDisabled": false,
      "createdAt": "2024-06-14T08:59:36.076Z",
      "updatedAt": "2024-06-14T08:59:36.076Z"
    },
    {
      "name": "hello",
      "value": "world",
      "id": 2,
      "isDisabled": false,
      "createdAt": "2024-06-14T08:59:53.190Z",
      "updatedAt": "2024-06-14T08:59:53.190Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 2,
    "count": 3,
    "totalPages": 2,
    "links": {
      "prev": null,
      "next": "http://localhost:3000/settings?searchedColumn=name&keyword=e&orderedColumn=&order=desc&page=2&limit=2"
    }
  }
}
```

---

### POST /settings

Create a new setting key value.

**Request Body:**

- `name`: The name of the setting.
- `value`: The value of the setting.

**Response:**

```json
{
  "name": "demo1",
  "value": "api1",
  "id": 3,
  "isDisabled": false,
  "createdAt": "2024-06-14T09:01:07.550Z",
  "updatedAt": "2024-06-14T09:01:07.550Z"
}
```
