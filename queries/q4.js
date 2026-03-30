// Q5: Nested workflow query
// Show approved applications that have contracts, including reviewer and contract details.

db.sublease_listings.aggregate([
  { $unwind: "$applications" },
  {
    $match: {
      "applications.application_status": "approved",
      "applications.contract": { $ne: null }
    }
  },
  {
    $project: {
      _id: 1,
      lease_id: 1,
      created_by_user_id: 1,
      application_id: "$applications.application_id",
      applicant_user_id: "$applications.applicant_user_id",
      application_status: "$applications.application_status",
      reviewer_user_id: "$applications.review.reviewer_user_id",
      review_decision: "$applications.review.decision",
      contract_id: "$applications.contract.contract_id",
      contract_status: "$applications.contract.contract_status",
      contract_start_date: "$applications.contract.start_date",
      contract_end_date: "$applications.contract.end_date"
    }
  }
]);