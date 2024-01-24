const asyncHandler = (handleAsync) => {
    return (req,res,next) => {
        Promise.resolve(handleAsync(req,res,next)).catch((error) => next(error))
    }
}

export default asyncHandler