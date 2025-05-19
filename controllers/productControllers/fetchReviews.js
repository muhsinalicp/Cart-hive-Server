import Review from "../../models/Review.js";

const fetchReviews = async (req, res) => {
  try {
    const id = req.params.id;
    const reviews = await Review.find({ productId: id })
      .populate("userId")
      .sort({ createdAt: -1 });

    const data = reviews.map((review) => ({
      _id: review._id,
      rating: review.rating,
      review: review.review,
      username: review.userId.username,
      postedAt: review.createdAt,
    }));

    return res.json({
      status: "success",
      message: "Reviews fetched successfully",
      data,
    });
  } catch (error) {
    console.log("error occured in /fetchReviews route :", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
};

export default fetchReviews;
