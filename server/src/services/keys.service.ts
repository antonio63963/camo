import path from 'path';
import { promises as FS } from 'fs';

const privateKeyPath = process.env.PRIVATE_KEY_PATH || path.resolve('keys/priv.key');
const publicKeyPath = process.env.PUBLIC_KEY_PATH || path.resolve('keys/pub.key');

class KeysService {
  private privKey: string = null;
  private pubKey: string = null;

  getPrivateKey = async () => {
    if(!this.privKey) {
      this.privKey =  await FS.readFile(privateKeyPath, 'utf8');
    };
    return this.privKey;
  };

  getPublicKey = async (): Promise<string> => {
    if(!this.pubKey) {
      this.pubKey =  await FS.readFile(publicKeyPath, 'utf8');
    };
    return this.pubKey;
  };
};

export default new KeysService();