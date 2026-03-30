// Q4: Update query
// Update an embedded application by application_id.
// Change app_001 from pending to rejected and add a review object.

db.sublease_listings.updateOne(
  { "applications.application_id": "app_001" },
  {
    $set: {
      "applications.$.application_status": "rejected",
      "applications.$.review": {
        "review_id": "review_003",
        "reviewer_user_id": "user_010",
        "reviewed_at": new Date("2026-03-25T15:00:00Z"),
        "decision": "rejected",
        "review_notes": "Application was reviewed and rejected due to listing preference."
      }
    }
  }
);