export const errorHandler = (err, req, res, next) => {
    switch (true) {
      case err?.error?.isJoi:
        const joiMessage = err.error?.details?.[0]?.message || 'Validation error';
        return res.status(400).json({ message: joiMessage });
  
      case !!err.statusCode:
        return res.status(err.statusCode).json({ message: err.message });
  
      case err.name === 'CastError':
        return res.status(400).json({ message: 'Invalid ID format' });
  
      case err.name === 'TokenExpiredError':
        return res.status(401).json({ message: 'Unauthorized: Your token has expired. Login again.' });
  
      case err.name === 'JsonWebTokenError':
        return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
  
      case err.code === 11000:
        const keyName = Object.keys(err.keyValue ?? {})[0];
        return res.status(409).json({ message: `Given ${keyName} already exists` });
  
      default:
        return res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
  };
  
  