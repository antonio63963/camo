import { Request, Response } from 'express';
import tokenService from 'services/token.service';

class UserController {
  async current(req: Request, res: Response) {
    const token = req.headers.authorization.split(' ')[1];

    res.json({
      user: { isTeacher: token === 'teacher' ? true : false },
    })
    // const decodedToken = await tokenService.verifyAccessToken(token);

    // setTimeout(() => {
    //   res.json({
    //     user: {
    //       isTeacher: decodedToken.isTeacher,
    //     },
    //   });
    // }, 500);
  };
};

export default new UserController();
