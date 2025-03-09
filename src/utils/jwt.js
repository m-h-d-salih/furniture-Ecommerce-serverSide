import jwt from "jsonwebtoken"
export const generateToken=(userId)=>{
return jwt.sign({_id:userId},process.env.JWT_SECRET,{ expiresIn: '3d' });
}

export const generateAccessToken = (user) => {
  const payload = { id: user._id, email: user.email, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' }); 
};

export const generateRefreshToken = (user) => {
  const payload = { id: user._id };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' }); 
};

export const verifyToken = (token, secret) => {
  try {
    
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};