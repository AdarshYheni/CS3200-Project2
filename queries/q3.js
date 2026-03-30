// Q3: Count documents for a specific user
// Count how many applications were submitted by user_004.

db.sublease_listings.aggregate([
  { $unwind: "$applications" },
  { $match: { "applications.applicant_user_id": "user_004" } },
  { $count: "application_count" }
]);