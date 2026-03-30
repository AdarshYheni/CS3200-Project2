# SubletSync - MongoDB

CS3200 Project 2 - Adarsh Yhenishetty

## Overview

This is Project 2 for CS3200, where the relational database from Project 1 (SQLite) was converted into a document-based database using MongoDB. The system models a subleasing platform that manages properties, leases, tenants, and sublease listings.

The core functionality remains the same - tenants create sublease listings, applicants apply, and landlords review and approve applications - but the data model is redesigned to take advantage of MongoDB’s embedded document structure.

The full business requirements and UML conceptual model from Project 1 are included in the repository.


## Demo Video

(Add your video link here)


## How the Collections Were Designed

This project uses 3 main collections. The central collection is `sublease_listings`, which represents the workflow of subleasing.

Applications, reviews, and contracts are embedded directly inside listings because they belong strictly to a listing and do not exist independently.

The `properties` collection contains hierarchical housing data, where units, leases, and tenants are embedded since they are tightly coupled.

The `users` collection is separate because users exist independently and are referenced across multiple parts of the system.

| Collection | What it holds |
|-----------|--------------|
| `users` | User profiles (tenants, landlords, applicants, reviewers) |
| `properties` | Properties with embedded units, leases, and tenants |
| `sublease_listings` | Listings with embedded applications, reviews, and contracts |

Some fields (like property_id and unit_id in listings) are duplicated to improve query performance. This avoids the need for joins at the cost of minor redundancy, which is acceptable for this use case.


## Diagrams

- UML Class Diagram: `diagrams/UML_Class_Diagram.png`
- MongoDB ERD: `diagrams/Mongo_ERD.png`


## How to Set Up the Database

MongoDB must be installed and running locally.

### Step 1: Create Database

Database name:
subletsync_mongo


Create collections:
- users
- properties
- sublease_listings


### Step 2: Import Data

Using MongoDB Compass:

1. Open each collection
2. Click **Add Data → Import JSON**
3. Import files:
    - data/users.json
    - data/properties.json
    - data/sublease_listings.json