const Review =require ("../models/Review")
exports.getReview =async (req,res)=>{
    try {
        const reviews =await Review.find().populate("product_id user_id");
        res.status(200).json({
            msg:"Get review with success homie",
            data:reviews,
        })
    } catch (error){
        res.status(500).send(error.message);
    }
};

exports.addReview= async (req, res)=>{
    try {
        const {user_id, product_id,comment,rating}=req.body;
        const new_review = new Review ({
            user_id,
            product_id,
            comment,
            rating,
        });
        const saved_review = await new_review.save();
        res.status(201).send({
            msg:"create with success",
            data: saved_review,
        })
    } catch (error){
        res.status(500).send(error.message)
    }
}

exports.deleteReview = async (req, res) => {
    try {
      const reviewId = req.params.id;
      const deletedReview = await Review.findByIdAndDelete(reviewId);
      
      if (deletedReview) {
        res.status(200).json({ message: 'Review deleted successfully' });
      } else {
        res.status(404).json({ error: 'Review not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };