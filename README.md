# SubletSync - MongoDB

CS3200 Project 2 - Adarsh Yhenishetty

## Overview

This is Project 2 for CS3200, where the relational database from Project 1 (SQLite) was converted into a document-based database using MongoDB. The system models a subleasing platform that manages properties, leases, tenants, and sublease listings.

The core functionality remains the same - tenants create sublease listings, applicants apply, and landlords review and approve applications - but the data model is redesigned to take advantage of MongoDB’s embedded document structure.

The full business requirements and UML conceptual model from Project 1 are included in the repository.


## Demo Video

`youtube-vid.txt`


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


## Supporting Docs

- UML Class Diagram: `docs/CS3200_Project2_UMLClassDiagram.png`
- MongoDB ERD: `docs/CS3200_Project2_MongoERD.png`
- Business Requirements: `docs/CS3200_Project2_BusinessReqDoc.pdf`


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

### Optional (Using CLI)

```bash
mongoimport --db subletsync_mongo --collection users --file data/users.json --jsonArray
mongoimport --db subletsync_mongo --collection properties --file data/properties.json --jsonArray
mongoimport --db subletsync_mongo --collection sublease_listings --file data/sublease_listings.json --jsonArray
```

## Verify Data Import

Run the following command to confirm that your data was imported correctly:

```bash
mongosh subletsync_mongo --eval "
  print('Users:', db.users.countDocuments());
  print('Properties:', db.properties.countDocuments());
  print('Listings:', db.sublease_listings.countDocuments());
"
```

## Queries

Five queries are implemented in the `queries/` folder demonstrating different MongoDB capabilities.

| Query | What it does | MongoDB feature used |
|------|-------------|----------------------|
| q1.js | Counts number of applications per listing | Aggregation ($project, $size, $sort) |
| q2.js | Finds open listings based on price/date conditions | Complex search ($and, $or) |
| q3.js | Counts applications submitted by a specific user | Aggregation ($unwind, $match, $count) |
| q4.js | Updates an application status and adds a review | updateOne with positional $ operator |
| q5.js | Retrieves approved applications with contract details | Aggregation ($unwind, $project) |


## Tools Used

- MongoDB - NoSQL document database
- MongoDB Compass - GUI for database management
- MongoDB Query Language (MQL) - querying and aggregation
- Lucidchart - data modeling diagrams
- VS Code - development environment

## AI Usage

- ChatGPT - used for generating realistic test data

Example prompt used:

``` id="2q2q2v"
Generate realistic MongoDB JSON seed data for a subleasing platform.

Requirements:
- Create users with roles such as tenant, landlord, and applicant
- Create properties with nested units, leases, and tenants
- Create sublease listings with embedded applications
- Each application should optionally include a review and contract
- Use consistent IDs across collections (user_id, property_id, etc.)
- Include realistic names, emails, prices, and dates
- Ensure relationships between data are logically valid
```

## Files
- data/       JSON seed data
- queries/    MongoDB query scripts
- diagrams/   UML and ERD diagrams
- docs/       Project requirements and schema outline

## Conclusion
This project demonstrates the transition from relational database design to a MongoDB document-based model. It highlights the use of embedding, denormalization, and aggregation queries to efficiently model and query a real-world subleasing system.