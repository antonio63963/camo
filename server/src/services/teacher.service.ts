import TeacherModel from "models/teacher";

class TeacherService {
  async checkIsTeacher(userId: string): Promise<boolean> {
    return !!await TeacherModel.findOne({userId});
  };
};

export default new TeacherService();