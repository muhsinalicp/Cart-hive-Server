import Product from "../../models/Product.js";
import Review from "../../models/Review.js";
const postReview = async (req, res) => {
  try {
    const { productId, rating, review } = req.body;
    const { _id } = req.user;

    if (!rating || !review) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields are required" });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ status: "error", message: "Rating must be between 1 and 5" });
    }

    if (review.length < 10) {
      return res.status(400).json({
        status: "error",
        message: "Review must be at least 10 characters",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    let totalRating = product.rating + Number(rating);
    // console.log("avgRating:", avgRating);
    let totalReviews = product.numReviews + 1;
    // console.log("totalReviews:", totalReviews);
    let avgRating = (totalRating / totalReviews).toFixed(1);
    // console.log("avgRating:", avgRating);

    await Product.findByIdAndUpdate(productId, {
      rating: totalRating,
      numReviews: totalReviews,
      avgRating: avgRating,
    });

    const newReview = {
      productId,
      rating: Number(rating),
      review,
      userId: _id,
    };

    await Review.create(newReview);

    return res.json({
      status: "success",
      message: "Review posted successfully",
    });
  } catch (error) {
    console.log("error occured in /postReview route :", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
};

export default postReview;
