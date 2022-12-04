
class ServiceUtils {
  createDoc(doc: {[index: string]: any}, data: {[index: string]: any}) {
    Object.keys(data).forEach((key:string) => (doc[key] = data[key]));
  }
};

export default new ServiceUtils();