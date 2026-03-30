// Q1: Aggregation query
// Count how many applications each sublease listing has.

db.sublease_listings.aggregate([
  {
    $project: {
      _id: 1,
      listing_status: 1,
      listing_price: 1,
      application_count: { $size: "$applications" }
    }
  },
  {
    $sort: { application_count: -1 }
  }
]);