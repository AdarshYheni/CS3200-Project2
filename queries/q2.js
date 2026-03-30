// Q2: Complex search query
// Find open listings where the price is <= 1300 OR the available_from date is on/before 2026-06-01.

db.sublease_listings.find({
  $and: [
    { listing_status: "open" },
    {
      $or: [
        { listing_price: { $lte: 1300 } },
        { available_from: { $lte: new Date("2026-06-01T00:00:00Z") } }
      ]
    }
  ]
});